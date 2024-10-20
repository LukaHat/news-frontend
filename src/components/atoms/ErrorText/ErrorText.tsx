import React from "react";
import { StyledErrorText } from "./ErrorText.style";

export default function ErrorText({ children }: React.PropsWithChildren) {
  return <StyledErrorText>{children}</StyledErrorText>;
}
