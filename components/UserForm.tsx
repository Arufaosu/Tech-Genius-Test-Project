import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import { z } from "zod";
import { trpc } from "../utils/trpc"; // Assuming you've set up trpc hooks in utils

type UserFormData = z.infer<typeof userSchema>;

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const createUser = trpc.user.createUser.useMutation();

  const onSubmit = (data: UserFormData) => {
    createUser.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}
      
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
