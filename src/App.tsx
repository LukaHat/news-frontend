import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/pages/Homepage/Homepage";
import Auth from "./components/pages/Sing-in/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sing-in" element={<Auth />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
