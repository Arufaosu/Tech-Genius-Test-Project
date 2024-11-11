import { procedure, router } from "../../trpc";
import { userSchema } from "../../../schemas/userSchema";

export const userRouter = router({
  // A mutation for creating a new user, with Zod validation
  createUser: procedure
    .input(userSchema)  // Use the shared schema here for validation
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: input,
      });
    }),

  // Example query to get a user by ID
  getUser: procedure
    .input(z.string())  // ID validation (string)
    .query(async ({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input },
      });
    }),
});
