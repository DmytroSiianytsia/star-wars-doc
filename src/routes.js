const routes = [
  {
    path: "/",
    component: () => import("./components/Content.vue"),
  },
  {
    path: "/login",
    component: () => import("./components/Login.vue"),
  },
  {
    path: "/signup",
    component: () => import("./components/Signup.vue"),
  },
]

export default routes
