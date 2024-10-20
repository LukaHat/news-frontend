import React from "react";
import { StyledInput } from "./Input.style";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return <StyledInput {...props} ref={ref} />;
});

Input.displayName = "Input";

export default Input;
