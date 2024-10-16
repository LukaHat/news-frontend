import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { login } from "../../api/auth";
import { Button } from "../../components/atoms/Button";
import { ErrorText } from "../../components/atoms/ErrorText";
import { Input } from "../../components/atoms/Input";
import { Label } from "../../components/atoms/Label";
import { Form } from "../../components/molecules/Form";
import { useAuth } from "../../lib/hooks/useAuth";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email adress" }),
  password: z
    .string()
    .min(2, { message: "Password too short" })
    .max(15, { message: "Password too long" }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignIn() {
  const { addToken, addUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      ...data,
    });
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.token && data.user) {
        addToken(data.token);
        addUser(data.user);
      }
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Button>Sign in</Button>
      </Form>

      <p>
        New here?
        <Link to="/auth/sign-up">Sign-up</Link>
      </p>
    </>
  );
}
