import { z } from "zod";
import { procedure, router } from "../../trpc";

// Define a Zod schema
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export const userRouter = router({
  createUser: procedure
    .input(userSchema)  // Use Zod schema for input validation
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: input,
      });
    }),
});
