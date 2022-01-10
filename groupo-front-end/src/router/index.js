import { createWebHistory, createRouter } from "vue-router";

import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: "Groupomania : Bienvenus"
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            title: "Groupomania : Mon profil"
        }
    },
    {
        path: "/posts",
        name: "Allposts",
        component: () => import("../components/PostList")
    },
    {
        path: "/posts/:id",
        name: "Onepost",
        component: () => import("../components/Post")
    },
    {
        path: "/createPost",
        name: "add",
        component: () => import("../components/CreatePost")
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to, from) => {
    console.log(from, to);
    document.title = to.meta.title;
});

export default router;