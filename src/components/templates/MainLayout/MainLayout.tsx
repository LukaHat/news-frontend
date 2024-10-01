import { Outlet } from "react-router-dom";
import { Navbar } from "../../organisms/Navbar";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
