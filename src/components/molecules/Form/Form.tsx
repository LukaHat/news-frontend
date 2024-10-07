import React from "react";
import styled from "styled-components";
import { flexContainerColumn } from "../../../styles/utils/mixins";

const StyledForm = styled.form`
  ${flexContainerColumn};
  gap: 0.4rem;
`;

export default function Form({
  children,
  ...props
}: React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLFormElement>>) {
  return <StyledForm {...props}>{children}</StyledForm>;
}
