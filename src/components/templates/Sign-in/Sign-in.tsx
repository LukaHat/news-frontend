import styled from "styled-components";

import { Form } from "../../molecules/Form";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../../../api/auth";

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.p`
  color: var(--color-error);
`;

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(15),
});

type FormData = z.infer<typeof formSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: FormData) => {
    const res = await login(data);
    console.log(res);
  };

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
