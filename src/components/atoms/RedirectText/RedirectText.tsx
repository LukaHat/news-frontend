import React from "react";
import { RedirectText as StyledRedirectText } from "./RedirectText.style";

interface RedirectTextProps extends React.PropsWithChildren {
  onClick: () => void;
}

export default function RedirectText({ children, onClick }: RedirectTextProps) {
  return <StyledRedirectText onClick={onClick}>{children}</StyledRedirectText>;
}
