import MovieCard from "@/app/components/MovieCard";
import { db } from "@/lib/db";
import { movies } from "@/lib/schema";
import { sql } from "drizzle-orm";
import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const page = async ({ params: { slug } }: Props) => {
  const [_searchmethod, _query] = slug;
  const query = decodeURIComponent(_query);
  console.log(_searchmethod);
  console.log(query);
  const search = "%" + query + "%";
  console.log(search);
  //   const result = await db.execute(
  //     sql`select '*' from movies where name like ${search}`
  //   );
  //   console.log(result[0]);
  const p2 = db
    .select()
    .from(movies)
    .where(sql`lower(${movies.name}) like ${sql.placeholder("name")}`)
    .prepare("p2");
  const result = await p2.execute({ name: `${search}` });

  console.log(result.length);
  console.log(result[0]);
  return (
    <div className="bg-blue-600">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center">
        {result.map((link, index) => {
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
  );
};

export default page;
