import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signin from "@/components/User/Signin";
import store from './store.js';
import Details from "./views/Details.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/UsersManager",
      name: "UsersManager",
      // route level code-splitting
      // this generates a separate chunk (UsersManager.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "UsersManager" */ "./views/UsersManager.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/Details",
      name: "details",
      component: () =>
        import("./views/Details.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    }
  ]
});
export default router
