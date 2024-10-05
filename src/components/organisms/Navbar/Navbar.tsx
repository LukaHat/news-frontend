import styled from "styled-components";
import { Button } from "../../atoms/Button";
import { themeColors } from "../../../theme/colors";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { appFonts } from "../../../theme/fonts";
import { useModal } from "../../../context/ModalContext";

const StyledNavbar = styled.nav`
  height: 8vh;
  width: 100%;
  background-color: ${themeColors.primary.elementaryBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${appFonts.primary.mainFont};
  color: ${themeColors.primary.elementaryWhite};
  a {
    font-size: 2rem;
    color: inherit;
    text-decoration: none;
    padding-left: 1rem;
  }
  div {
    display: flex;
    justify-content: space-between;
    margin-right: 2rem;
  }
`;

export default function Navbar() {
  const { addToken } = useAuth();
  const { openModal } = useModal();

  return (
    <StyledNavbar>
      <NavLink to="/">News</NavLink>
      <div>
        <Button onClick={() => addToken("")}>Logout</Button>
        <Button onClick={openModal}>New Post</Button>
      </div>
    </StyledNavbar>
  );
}
