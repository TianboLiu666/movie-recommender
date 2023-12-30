import MovieCard from "@/app/components/MovieCard";
import { db } from "@/lib/db";
import { movies } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { cosineDistance } from "pgvector/drizzle-orm";
import React from "react";

type Props = {
  params: {
    id: number;
  };
};

const movieDetail = async ({ params: { id } }: Props) => {
  const _movie = await db.select().from(movies).where(eq(movies.id, id));
  const movie = _movie[0];
  const date = movie.date_published?.toDateString();

  const similar_moives = await db
    .select()
    .from(movies)
    .orderBy(cosineDistance(movies.tfidf_embedding, movie.tfidf_embedding))
    .limit(20);
//   console.log(similar_moives);
  return (
    <div className="bg-blue-500 min-h-screen overflow-auto">
      <Link href={"/"} className="relative m-4 py-2">
        <button className="border bg-slate-300 m-3 border-white rounded-md w-1/6">
          Go Back
        </button>
      </Link>
      <div className="items-center">
        <div className="flex flex-row">
          <Image
            src={movie.poster_link || ""}
            className="object-contain rounded-t-lg"
            width="500"
            height="500"
            alt="Image"
          ></Image>
          <div className="flex flex-col ml-6 mt-3 text-xl font-semibold">
            <h2>{movie.name}</h2>
            <p className="text-green-800">Director: {movie.director}</p>
            <p className="text-green-800">Actor: {movie.actors}</p>
            <p className="text-green-800">Data Published: {date}</p>
            <p className="text-green-800">Genres: {movie.genres}</p>
            <p className="text-green-800">Key Words: {movie.keywords}</p>
            <p className="text-green-800">IMDB: {movie.url}</p>
            <p className="text-green-800">WIKI: {movie.wiki_page}</p>
            <p className="text-green-800">Description: {movie.description}</p>
            <p className="text-green-800">Plot: {movie.plot}</p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-6">
          <h1 className="text-3xl font-semibold">Similar Movies</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center">
            {similar_moives.map((link, index) => {
              return (
                <MovieCard
                  poster_link={link.poster_link!}
                  id={link.id}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default movieDetail;
