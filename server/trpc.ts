import { initTRPC } from "@trpc/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create tRPC context
export const createContext = () => ({
  prisma,
});

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const procedure = t.procedure;
