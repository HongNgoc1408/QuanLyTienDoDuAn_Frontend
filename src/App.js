import React, { Fragment } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import LoginPage from "./pages/LoginPage/LoginPage";
import { routes } from "./router";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* Đường dẫn '/' chuyển hướng đến '/login' */}
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            const isProtected = route.path !== "/login";
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  isProtected ? (
                    <ProtectedRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </ProtectedRoute>
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
          <Route path="/login" element={<LoginPage />} />{" "}
          {/* Thêm Route cho trang Login */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
