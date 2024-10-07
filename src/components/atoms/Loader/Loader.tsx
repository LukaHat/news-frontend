import { Loader as StyledLoader } from "./Loader.style";
import loaderIcon from "../../../assets/images/iconmonstr-loading-5.svg";

export default function Loader() {
  return (
    <StyledLoader>
      <img src={loaderIcon} alt="loading icon" />
    </StyledLoader>
  );
}
