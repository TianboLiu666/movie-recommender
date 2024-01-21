# Movie Recommendation

This is a movie search and recommendation engine using Next.js for an enhanced user experience.
- Embedded movie summaries and plots from Kaggle using the OpenAI API.
- Store movie informations and embeddings to a vector Database.  I will use Neon database with PostgreSQL database extension PGvector.
- Title and content search functionalities are realized using kNN with cosine similarit

### Prepare the data
Dependencies:
```
pip install openai pandas psycopg
```

- [openai](https://openai.com) for embedding movie descriptions and plot
- [pandas](https://pandas.pydata.org/) To clean the downloaded movie data(csv would also work)
- [psycopg](https://www.psycopg.org/) for data storage and its extension PGVector(other vector database also ok)

### Sink data into database.  Run

```
python data/prepare_data.py
```


## Start the Next.js Application

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.