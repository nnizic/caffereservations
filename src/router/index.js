import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/gallery",
    name: "gallery",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/GalleryView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignupView.vue"),
  },
  {
    path: "/admingallery",
    name: "admingallery",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/AdminGalleryView.vue"),
  },
  {
    path: "/reservations",
    name: "reservations",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/ReservationView.vue"),
  },
  {
    path: "/userdashboard",
    name: "userdashboard",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/UserDashboardView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
