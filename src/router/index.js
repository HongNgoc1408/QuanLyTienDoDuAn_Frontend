import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ProgressPage from "../pages/ProgressPage/ProgressPage";
import AddUser from "../pages/UserPage/AddUser/AddUser";
import UserPage from "../pages/UserPage/UserPage";

const routes = [
  {
    path: "/",
    name: "HomePage",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/user",
    name: "UserPage",
    page: UserPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/user/add",
    name: "AddUserPage",
    page: AddUser,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/progress",
    name: "ProgressPage",
    page: ProgressPage,
    isShowHeader: true,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "*",
    name: "NotFoundPage",
    page: NotFoundPage,
  },
];

export { routes };
