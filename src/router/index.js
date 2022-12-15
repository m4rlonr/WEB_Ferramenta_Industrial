import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/carga",
    name: "carga",
    component: () => import("../views/CargaView.vue"),
  },
  {
    path: "/material",
    name: "material",
    component: () => import("../views/MaterialView.vue"),
  },
  {
    path: "/pdf",
    name: "pdf",
    component: () => import("../views/Impressao.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
