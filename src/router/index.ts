import About from "@/views/About.vue";
import Results from "@/views/Results.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Results",
    component: Results,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
