import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Reportes from '../views/Reportes.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect:  '/reportes'
    },
    {
        path: '/reportes',
        name: 'Home',
        component: Reportes
    },
    {
        path: '/usuarios',
        name: 'Usuarios',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios.vue')
    },
    {
        path: '/configuracion',
        name: 'Configuracion',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Configuracion.vue')
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
