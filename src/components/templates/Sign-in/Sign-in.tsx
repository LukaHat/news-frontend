import styled from "styled-components";

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

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ErrorText = styled.p`
  color: var(--color-error);
`;

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email adress" }),
  password: z
    .string()
    .min(2, { message: "Password too short" })
    .max(15, { message: "Password too long" }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignIn() {
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
    <StyledWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Email</Label>
        <Input {...register("email")} placeholder="email" />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        <Label>Password</Label>
        <Input {...register("password")} placeholder="password" />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        <Button>Sign in</Button>
      </Form>
    </StyledWrapper>
  );
}
