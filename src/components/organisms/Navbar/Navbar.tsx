import styled from "styled-components";
import { Button } from "../../atoms/Button";
import { themeColors } from "../../../theme/colors";
import { NavLink } from "react-router-dom";
import { appFonts } from "../../../theme/fonts";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";

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
  const { removeToken } = useAuth();
  const { openModal, setEditData } = useModal();

  return (
    <StyledNavbar>
      <NavLink to="/">News</NavLink>
      <div>
        <Button
          onClick={() => {
            removeToken();
          }}
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            setEditData(null);
            openModal();
          }}
        >
          New Post
        </Button>
      </div>
    </StyledNavbar>
  );
}
