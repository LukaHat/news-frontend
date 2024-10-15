import React from "react";
import { Button as StyledButton } from "./Button.style";

export default function Button({
  children,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
