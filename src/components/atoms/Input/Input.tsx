import { Input as StyledInput } from "./Input.style";

export default function Input({
  ...props
}: React.HtmlHTMLAttributes<HTMLInputElement>) {
  return <StyledInput {...props} />;
}
