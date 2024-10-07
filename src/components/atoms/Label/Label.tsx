import React from "react";
import { Label as StyledLabel } from "./Label.style";

export default function Label({
  children,
  ...props
}: React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLLabelElement>>) {
  return <StyledLabel {...props}>{children}</StyledLabel>;
}
