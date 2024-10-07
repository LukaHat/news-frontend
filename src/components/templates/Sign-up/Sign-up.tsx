import { Form } from "../../molecules/Form";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorText } from "../../atoms/ErrorText";
import { registerUser } from "../../../api/auth";
import { useAuth } from "../../hooks/useAuth";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  nickname: z
    .string()
    .max(15, { message: "Nickname cannot exceed 15 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(2, { message: "Password too short" })
    .max(10, { message: "Password too long" }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUp() {
  const { addToken } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await registerUser({
        email: data.email,
        password: data.password,
        fullName: `${data.firstName} ${data.lastName}`,
        alias: data.nickname,
        role: "admin",
      });
      return res;
    },
    onSuccess: (data) => {
      if (data?.token) addToken(data.token);
      navigate("/");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>First name</Label>
      <Input {...register("firstName")} placeholder="Enter your first name" />
      {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}

      <Label>Last name</Label>
      <Input {...register("lastName")} placeholder="Enter your last name" />
      {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}

      <Label>Nickname</Label>
      <Input {...register("nickname")} placeholder="Enter your nickname" />
      {errors.nickname && <ErrorText>{errors.nickname.message}</ErrorText>}

      <Label>Email</Label>
      <Input {...register("email")} placeholder="Enter your email" />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <Label>Password</Label>
      <Input
        {...register("password")}
        placeholder="Enter your password"
        type="password"
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

      <Button>Register</Button>
    </Form>
  );
}
