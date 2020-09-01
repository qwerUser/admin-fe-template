import VueRouter from 'vue-router';
import Login from '../pages/login.vue'; 
const constRouteList = []
const router = new VueRouter({
    routes:[
        {path:'/',component:Login},
        ...constRouteList
    ],
    mode: 'hash'
});

router.beforeEach((to, from, next) => {
  next()
});

export default router;