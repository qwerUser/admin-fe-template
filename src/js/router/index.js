import VueRouter from "vue-router";
import Login from "../pages/login.vue";
const constRouteList = [];
const router = new VueRouter({
  routes: [{ path: "/", component: Login }, ...constRouteList],
  mode: "hash"
});

router.beforeEach((to, from, next) => {
  const store = require('../store').default;
  if(!store.state.app.isSignIn && to.path!=='/'){
    router.replace('/');
    next();
    return;
  }
  next();
});

export default router;
