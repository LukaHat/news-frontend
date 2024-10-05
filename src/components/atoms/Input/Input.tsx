import { Input as StyledInput } from "./Input.style";
import React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return <StyledInput {...props} ref={ref} />;
});

export default Input;
