import { StyledModal, StyledModalBackground } from "./Modal.style";
import ReactDOM from "react-dom";

export default function Modal({ children }: React.PropsWithChildren) {
  const modalPortal = document.getElementById("edit-modal");
  if (!modalPortal) return null;

  return ReactDOM.createPortal(
    <StyledModalBackground>
      <StyledModal>{children}</StyledModal>
    </StyledModalBackground>,
    modalPortal
  );
}
