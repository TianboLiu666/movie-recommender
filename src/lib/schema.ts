import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { vector } from "pgvector/drizzle-orm";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  movie_id: integer("movie_id"),
  name: text("name"),
  url: text("url"),
  poster_link: text("poster_link"),
  genres: text("genres"),
  actors: text("actors"),
  director: text("director"),
  description: text("description"),
  date_published: timestamp("date_published"),
  keywords: text("keywords"),
  plot: text("plot"),
  wiki_page: text("wiki_page"),
  tfidf_embedding: vector("embedding", { dimensions: 13849 }),
});
