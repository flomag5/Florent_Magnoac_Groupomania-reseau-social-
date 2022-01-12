import { createWebHistory, createRouter } from "vue-router";




const routes = [
    /*{
        path: '/',
        name: 'Home',
        component: () => import("../views/Home.vue"),
        meta: {
            title: "Groupomania : Bienvenus"
        }
    },*/
    {
        path: '/',
        name: 'Login',
        component: () => import("../views/Login.vue"),
        meta: {
            title: "Groupomania : Connexion"
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import("../views/Profile.vue"),
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
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: () => import("../views/NotFound.vue"),
        meta: {
            title: "404 : Not Found"
        }
    },
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