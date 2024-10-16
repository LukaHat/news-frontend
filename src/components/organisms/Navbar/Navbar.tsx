import styled from "styled-components";
import { Button } from "../../atoms/Button";
import { themeColors } from "../../../theme/colors";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../lib/hooks/useAuth";
import {
  flexContainer,
  flexContainerColumn,
} from "../../../styles/utils/mixins";
import { typography } from "../../../theme/typography";
import menuIcon from "../../../assets/images/mobile-menu.svg";
import { colors } from "../../../theme/colors/colors";
import { useState } from "react";
import { mediaQueries } from "../../../theme/mediaQueries";
import { spacings } from "../../../theme/spacings";

const StyledNavbar = styled.nav`
  height: 8vh;
  width: 100%;
  background-color: ${themeColors.primary.elementaryBlue};
  ${flexContainer}
  justify-content: space-between;
  font-family: ${typography.baseFonts.primary.mainFont};
  color: ${themeColors.primary.elementaryWhite};
  .mobile-menu {
    display: flex;

    .link-list {
      background-color: ${colors.primary.elementaryBlue};
      position: absolute;
      width: 30vw;
      top: 7.5vh;
      left: 70vw;
    }

    .closed {
      display: none;
    }

    .open {
      ${flexContainerColumn}
      gap: ${spacings.gaps.sm};
    }

    button {
      color: ${colors.primary.elementaryWhite};

      img {
        width: 3rem;
        height: 3rem;
      }
    }
  }
  a {
    ${typography.headings.lg};
    color: inherit;
    text-decoration: none;
    padding-left: ${spacings.paddings.sm};
  }
  .menu {
    display: none;
  }

  ${mediaQueries.xs} {
    .menu {
      ${flexContainer}
      justify-content: space-between;
      margin-right: ${spacings.margins.md};
    }

    .mobile-menu {
      display: none;
    }
  }
`;

interface NavbarProps {
  openModal: () => void;
}

export default function Navbar({ openModal }: NavbarProps) {
  const { removeToken } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <StyledNavbar>
      <NavLink to="/">News</NavLink>
      <div className="menu">
        <Button
          onClick={() => {
            removeToken();
          }}
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            openModal();
          }}
        >
          New Post
        </Button>
      </div>
      <div className="mobile-menu">
        <Button onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}>
          <img src={menuIcon} alt="mobile-menu" />
        </Button>
        <ul className={`link-list ${isMobileMenuOpen ? "open" : "closed"}`}>
          <li>
            <Button
              onClick={() => {
                setIsMobileMenuOpen((isOpen) => !isOpen);
                removeToken();
              }}
            >
              Logout
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                setIsMobileMenuOpen((isOpen) => !isOpen);
                openModal();
              }}
            >
              New Post
            </Button>
          </li>
        </ul>
      </div>
    </StyledNavbar>
  );
}
