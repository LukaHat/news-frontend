import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/pages/Homepage/Homepage";
import Auth from "./components/pages/Auth/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/templates/ProtectedRoute";
import { NewsDetail } from "./components/pages/NewsDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/detail/:id"
              element={
                <ProtectedRoute>
                  <NewsDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
