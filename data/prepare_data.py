# Before running the
# We use the following two datasets from Kaggle:
# 48,000+ movies dataset (https://www.kaggle.com/datasets/yashgupta24/48000-movies-dataset)
# Wikipedia Movie Plots (https://www.kaggle.com/datasets/jrobischon/wikipedia-movie-plots)

import os
from tqdm import tqdm
import time

import pandas as pd
from openai import OpenAI  # !pip install openai
import psycopg  # !pip install "psycopg[binary]"


year_after = 1970  # take the movie data from this year forward
save_embedding = True # Save the vectors or not ?
filename = os.path.join(os.path.dirname(__file__), "movies.csv") # if save, where to save

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"] # 
DATABASE_URL = os.environ["DATABASE_URL"]

client = OpenAI()

moviesfile = os.path

# Read movies data
movies = pd.read_csv(
    os.path.join(os.path.dirname(__file__), "final_data.csv"),
    parse_dates=["DatePublished"],
)
movies = movies[movies["DatePublished"].dt.year.fillna(0).astype(int) > year_after]
movies["year"] = movies["DatePublished"].dt.year.fillna(0).astype("int64")


# Read plot data
plot = pd.read_csv(
    os.path.join(os.path.dirname(__file__), "wiki_movie_plots_deduped.csv")
)
plot = plot[plot["Release Year"] > year_after]
plot.duplicated(subset=["Title", "Release Year", "Plot"]).max()
plot = plot.drop_duplicates(subset=["Title", "Release Year", "Plot"])
plot = plot.drop_duplicates(subset=["Title", "Release Year"])

plot.rename(columns={"Title": "Name", "Release Year": "year"}, inplace=True)
plot = plot[["Name", "year", "Plot", "Wiki Page"]]


# Merge two dataframes
inner_merge = movies.merge(plot, on=["Name", "year"])


def getEmbedding(text: str):
    data = client.embeddings.create(input=text, model="text-embedding-ada-002")
    return data.data[0].embedding


# Creat a new empty column
inner_merge["embedding"] = ""

# OpenAI API
print("Starting embedding.....")
t0 = time.time()
for index, row in tqdm(inner_merge.iterrows()):
    text = str(row["Plot"]) + str(row["Description"])
    em = getEmbedding(text)
    inner_merge["embedding"][index] = em
t1 = time.time()
print(f"Finished embedding. total time use {t1-t0}")

if save_embedding:
    inner_merge.to_csv(filename)
    print(f"Saved data into {filename}")

print("Starting storing data.....")
t2 = time.time()
with psycopg.connect(DATABASE_URL) as conn:
    conn.execute("CREATE EXTENSION if not exists vector")
    # conn.execute("DROP TABLE if exists movies")

    conn.execute(
        """
        CREATE TABLE if not exists movies (
            id serial PRIMARY KEY,
            movie_id integer,
            name text,
            url text,
            poster_link text,
            genres text,
            actors text,
            director text,
            description text,
            date_published timestamp,
            keywords text,
            plot text,
            wiki_page text,
            embedding vector(1536))
        """
    )

    conn.commit()

with psycopg.connect(DATABASE_URL) as conn:
    for i in range(len(inner_merge)):
        item = inner_merge.iloc[i]

        movie_object = {
            "movie_id": int(item["id"]),
            "name": str(item["Name"]).lower(),
            "url": str(item["url"]),
            "poster_link": str(item["PosterLink"]),
            "genres": str(item["Genres"]),
            "actors": str(item["Actors"]).lower(),
            "director": str(item["Director"]).lower(),
            "description": str(item["Description"]),
            "date_published": str(item["DatePublished"]),
            "keywords": str(item["Keywords"]),
            "plot": str(item["Plot"]),
            "wiki_page": str(item["Wiki Page"]),
            "embedding": str(item["embedding"]),
        }
        conn.execute(
            "INSERT INTO movies (movie_id, name, url, poster_link, genres, actors, director, description, date_published, keywords, plot, wiki_page, embedding) \
                                      VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            tuple(movie_object.values()),
        )

    conn.commit()
t3 = time.time()
print(f"Finished data storage. total time use {t3-t2}")
