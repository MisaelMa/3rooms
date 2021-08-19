import store from '@/store';
import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Reportes from '../views/Reportes.vue'

Vue.use(VueRouter)


const ifNotAuthenticated = (to: any, from: any, next: any) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/');
};

const ifAuthenticated = (to: any, from: any, next: any) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/login');
};

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/reportes',
        beforeEnter: ifAuthenticated
    },
    {
        path: '/reportes',
        name: 'Home',
        component: Reportes,
        beforeEnter: ifAuthenticated
    },
    {
        path: '/usuarios',
        name: 'Usuarios',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios.vue'),
        beforeEnter: ifAuthenticated
    },
    {
        path: '/configuracion',
        name: 'Configuracion',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Configuracion.vue'),
        beforeEnter: ifAuthenticated
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
        beforeEnter: ifNotAuthenticated,
    }
]

const router = new VueRouter({
    routes
})

export default router
