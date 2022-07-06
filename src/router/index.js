import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store/index.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    beforeEnter: (to, from, next) => { // 路由守卫
      if (store.state.isLogin || store.state.token || sessionStorage.getItem('token')) {
        next();
      } else {
        next('/login');
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/InfoUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局守卫(用来判断进入到登录以及个人中心页面时,不展示全局的底部组件)
router.beforeEach((to, from) => {
  if (to.path == '/login' || to.path == '/infoUser') {
    store.state.isFooterMusic = false;
  } else {
    store.state.isFooterMusic = true;
  }
});

export default router