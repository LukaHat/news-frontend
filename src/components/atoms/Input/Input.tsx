import React from "react";
import { Input as StyledInput } from "./Input.style";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return <StyledInput {...props} ref={ref} />;
});

export default Input;
