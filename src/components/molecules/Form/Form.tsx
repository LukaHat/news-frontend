import React from "react";
import styled from "styled-components";
import { flexContainerColumn } from "../../../styles/utils/mixins";
import { spacings } from "../../../theme/spacings";

const StyledForm = styled.form`
  ${flexContainerColumn};
  gap: ${spacings.gaps.sm};
`;

export default function Form({
  children,
  ...props
}: React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLFormElement>>) {
  return <StyledForm {...props}>{children}</StyledForm>;
}
