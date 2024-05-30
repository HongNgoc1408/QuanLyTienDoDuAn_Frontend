import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import AddProfile from "../pages/ProfilePage/AddProfile/AddProfile";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ProgressPage from "../pages/ProgressPage/ProgressPage";
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
    path: "/progress",
    name: "ProgressPage",
    page: ProgressPage,
    isShowHeader: true,
  },
  {
    path: "/profile",
    name: "Profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/add-profile",
    name: "AddProfile",
    page: AddProfile,
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
