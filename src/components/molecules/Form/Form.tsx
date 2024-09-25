import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export default function Form({
  children,
  ...props
}: React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLFormElement>>) {
  return <StyledForm {...props}>{children}</StyledForm>;
}
