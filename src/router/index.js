import { createRouter, createWebHashHistory } from "vue-router"

//配置信息中需要的页面的相关消息

const routes = [
    {
        path: "/login",
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: "/register",
        component: () => import('../views/RegisterView.vue'),
    },
    {
        path: "/",
        component: () => import('../views/IndexView.vue'),
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to, from, next) => {

    const roles = to.meta.roles;

    if (!roles) {
        return next()
    }
    const role = localStorage.getItem('role', '')

    if (roles.includes(role)) {
        return next()
    }

    next('/')
})

export default router;



