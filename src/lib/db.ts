import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
const env = process.env.NODE_ENV;
const primaClient = env === "production" ? new PrismaClient() : new PrismaClient({ log: ["query", "info", "warn", "error"] });
export const db = globalThis.prisma || primaClient;
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
