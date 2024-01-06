import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
// for migrations
// const migrationClient = postgres("postgresql://tianboliu:qwer@localhost:5433/tianboliu", { max: 1 });
// migrate(drizzle(migrationClient))
// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);
// const queryClient = postgres("postgresql://tianboliu:qwer@localhost:5433/tianboliu");
export const db = drizzle(queryClient);

// const { Client} = require('pg')

// export let db = new Client({
//     connectionString: process.env.DATABASE_URL
// })
// ___________-----------________---------_____---------
// import {neon, neonConfig} from '@neondatabase/serverless'
// import { drizzle } from 'drizzle-orm/neon-http'

// neonConfig.fetchConnectionCache = true

// if(!process.env.DATABASE_URL) {
//     throw new Error('database url not found')
// }

// const sql = neon(process.env.DATABASE_URL)

// export const db = drizzle(sql)

// ___________-----------________---------_____---------

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV === "development") global.prisma = prisma;

// export default prisma;

// import { PrismaClient } from "@prisma/client";
// import "server-only";

// declare global {
//   // eslint-disable-next-line no-var, no-unused-vars
//   var cachedPrisma: PrismaClient;
// }

// export let prisma: PrismaClient;
// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.cachedPrisma) {
//     global.cachedPrisma = new PrismaClient();
//   }
//   prisma = global.cachedPrisma;
// }
