import { Outlet } from "react-router-dom";
import { Navbar } from "../../organisms/Navbar";
import { EditModal } from "../../organisms/EditModal";
import { useModal } from "../../../context/ModalContext";

export default function MainLayout() {
  const { isModalOpen } = useModal();

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
        {isModalOpen && <EditModal />}
      </main>
    </div>
  );
}
