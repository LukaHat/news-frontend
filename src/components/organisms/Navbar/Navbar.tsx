import styled from "styled-components";
import { Button } from "../../atoms/Button";
import { themeColors } from "../../../theme/colors";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const StyledNavbar = styled.nav`
  height: 8dvh;
  width: 100dvw;
  background-color: ${themeColors.primary.elementaryBlue};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Navbar() {
  const { setToken } = useAuth();

  return (
    <StyledNavbar>
      <NavLink to="/">News</NavLink>
      <Button onClick={() => setToken("")}>Logout</Button>
      <Button>New Post</Button>
    </StyledNavbar>
  );
}
