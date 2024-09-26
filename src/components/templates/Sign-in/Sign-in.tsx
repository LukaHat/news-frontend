import { Form } from "../../molecules/Form";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ErrorText } from "../../atoms/ErrorText";
import { RedirectText } from "../../atoms/RedirectText";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email adress" }),
  password: z
    .string()
    .min(2, { message: "Password too short" })
    .max(15, { message: "Password too long" }),
});

type FormData = z.infer<typeof formSchema>;

interface SignInProps {
  redirectFn: (isLoginPage: boolean) => void;
}

export default function SignIn({ redirectFn }: SignInProps) {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    mutation.mutate({
      ...data,
    });
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/");
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
        <RedirectText onClick={() => redirectFn(false)}>Sign-in</RedirectText>
      </p>
    </>
  );
}
