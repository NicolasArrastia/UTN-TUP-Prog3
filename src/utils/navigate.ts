export enum ROUTES {
  LOGIN = "/src/pages/auth/login/login.html",
  ADMIN_HOME = "/src/pages/admin/adminHome/adminHome.html",
  HOME = "/src/pages/store/home/home.html",
}

export const navigate = (route: ROUTES) => {
  window.location.href = route;
};
