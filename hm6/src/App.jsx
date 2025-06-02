import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CountriesProvider } from "./context/CountriesContext";
import { AuthProvider } from "./context/AuthContext";
import Menu from "./components/Menu";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Countries = lazy(() => import("./pages/Countries"));
const Country = lazy(() => import("./pages/Country"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <AuthProvider>
      <CountriesProvider>
        <BrowserRouter>
          <Menu />
          <Suspense fallback={<div>Завантаження...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/countries" element={<Countries />} />
              <Route path="/countries/:name" element={<Country />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CountriesProvider>
    </AuthProvider>
  );
}

export default App;
