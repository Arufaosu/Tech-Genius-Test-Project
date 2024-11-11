import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter()
  .query("getUser", {
    input: z.string(),
    async resolve({ input, ctx }) {
      return ctx.prisma.user.findUnique({ where: { id: input } });
    },
  });
