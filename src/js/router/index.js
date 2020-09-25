import VueRouter from "vue-router";
import Login from "../pages/login.vue";
const constRouteList = [];

const files = require.context('../pages',true,/(.vue)$/);
files.keys().forEach(key => {
  constRouteList.push({
    path:key.slice(1).split('.')[0],
    component:files(key).default
  })
});
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
