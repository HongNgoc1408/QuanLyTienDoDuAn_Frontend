import { Route } from "react-router-dom";
import DocPage from "../pages/DocPage/DocPage";
import EmployeePage from "../pages/EmployeePage/EmployeePage";
import HomePage from "../pages/HomePage/HomePage";
import InformationPage from "../pages/InformationPage/InformationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import AddProfile from "../pages/ProfilePage/AddProfile/AddProfile";
import EditProfile from "../pages/ProfilePage/EditProfile/EditProfile";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AddProgressPage from "../pages/ProgressPage/AddProgressPage/AddProgressPage";
import EditProgressPage from "../pages/ProgressPage/EditProgressPage/EditProgressPage";
import ProgressPage from "../pages/ProgressPage/ProgressPage";
import AddUser from "../pages/UserPage/AddUser/AddUser";
import EditUserPage from "../pages/UserPage/EditUserPage/EditUserPage";
import UserPage from "../pages/UserPage/UserPage";

// Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
const isLoggedIn = () => !!localStorage.getItem("user");

// Component để bảo vệ các route cần đăng nhập
const ProtectedRoute = ({ path, page: Page, ...rest }) => {
  return (
    <Route
      path={path}
      element={isLoggedIn() ? <Page /> : <LoginPage />}
      {...rest}
    />
  );
};

const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/home", element: <ProtectedRoute path="/home" page={HomePage} /> },
  {
    path: "/employee",
    element: <ProtectedRoute path="/employee" page={EmployeePage} />,
  },
  {
    path: "/infor",
    element: <ProtectedRoute path="/infor" page={InformationPage} />,
  },
  { path: "/user", element: <ProtectedRoute path="/user" page={UserPage} /> },
  {
    path: "/user/add",
    element: <ProtectedRoute path="/user/add" page={AddUser} />,
  },
  {
    path: "/user/edit/:id",
    element: <ProtectedRoute path="/user/edit/:id" page={EditUserPage} />,
  },
  {
    path: "/progress",
    element: <ProtectedRoute path="/progress" page={ProgressPage} />,
  },
  {
    path: "/progress/add",
    element: <ProtectedRoute path="/progress/add" page={AddProgressPage} />,
  },
  {
    path: "/progress/edit/:id",
    element: (
      <ProtectedRoute path="/progress/edit/:id" page={EditProgressPage} />
    ),
  },
  {
    path: "/profile",
    element: <ProtectedRoute path="/profile" page={ProfilePage} />,
  },
  {
    path: "/profile/add",
    element: <ProtectedRoute path="/profile/add" page={AddProfile} />,
  },
  {
    path: "/profile/edit/:id",
    element: <ProtectedRoute path="/profile/edit/:id" page={EditProfile} />,
  },
  { path: "/docs", element: <ProtectedRoute path="/docs" page={DocPage} /> },
  { path: "*", element: <NotFoundPage /> },
];

export { routes };
