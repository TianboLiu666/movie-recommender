// import { prisma } from "@/lib/db";
import { db } from "@/lib/db";
import React from "react";
import { movies } from "@/lib/schema";
import MovieCard from "./MovieCard";
import { sql } from "drizzle-orm";

type Props = {};

const Movies = async (props: Props) => {
  //   const movies = await db.query('SELECT poster_link FROM movies LIMIT 20')
  // const movies = await db.query.movies.findMany({
  //     with: {
  //       posts: true
  //     },
  //   });
  //   const ran = Math.floor(Math.random() * 10);

  const result = await db
    .select({ poster_link: movies.poster_link, id: movies.id })
    .from(movies)
    .orderBy(sql`RANDOM()`)
    .limit(20);
  //   const result = await db.execute(
  //     sql.raw(`select * from movies ORDER BY RANDOM() LIMIT 20`)
  //   );
  //   const result = await db
  //     .selectDistinct({ poster_link: movies.poster_link, id: movies.id })
  //     .from(movies)
  //     .limit(20);

  console.log(typeof result[0]);
  return (
    <div className="">
      <h1 className="self-center text-center sm:text-6xl">movies</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center">
        {result.map((link, index) => {
          return (
            <MovieCard
              poster_link={link?.poster_link!}
              id={link.id}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
