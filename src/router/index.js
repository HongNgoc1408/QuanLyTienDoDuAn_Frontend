import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import AddProfile from "../pages/ProfilePage/AddProfile/AddProfile";
import EditProfile from "../pages/ProfilePage/EditProfile/EditProfile";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AddProgressPage from "../pages/ProgressPage/AddProgressPage/AddProgressPage";
import EditProgressPage from "../pages/ProgressPage/EditProgressPage/EditProgressPage";
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
    path: "/progress/add",
    name: "AddProgressPage",
    page: AddProgressPage,
    isShowHeader: true,
  },
  {
    path: "/progress/edit/:id",
    name: "EditProgressPage",
    page: EditProgressPage,
    isShowHeader: true,
  },
  {
    path: "/profile",
    name: "Profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/profile/add",
    name: "AddProfile",
    page: AddProfile,
    isShowHeader: true,
  },
  {
    path: "/profile/edit/:id",
    name: "EditProfile",
    page: EditProfile,
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
    path: "*",
    name: "NotFoundPage",
    page: NotFoundPage,
  },
];

export { routes };
