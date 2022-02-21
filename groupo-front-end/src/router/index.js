//--- Définition des routes pour chaque "components" ---//

import { createWebHistory, createRouter } from "vue-router";
import store from '../store/index.js'


const routes = [
    {
        path: '/cgu',
        name: 'Cgu',
        component: () => import("../views/Cgu.vue"),
        meta: {
            title: "Groupomania : Conditions générales"
        }
    },

    {
        path: '/',
        alias: '/login',
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
            title: "Groupomania : Mon Profil"
        }
    },
    {
        path: '/profile/:id',
        name: 'profile-user',
        component: () => import("../views/User.vue"),
        meta: {
            title: "Groupomania : Profil Ami"
        }
    },
    {
        path: '/users',
        name: 'Users',
        component: () => import("../views/Users.vue"),
        meta: {
            title: "Groupomania : Utilisateurs"
        }
    },
    {
        path: "/posts",
        name: "AllPosts",
        component: () => import("../components/PostList"),
        meta: {
            title: "Groupomania : Actualités"
        }
    },
    {
        path: "/posts/:id",
        name: "Onepost",
        component: () => import("../components/Post"),
        meta: {
            title: "Groupomania : Ce post"
        }
    },
    {
        path: "/createPost",
        name: "create-post",
        component: () => import("../components/CreatePost"),
        meta: {
            title: "Groupomania : Publier"
        }
    },
    {
        path: "/modifyPost/:id",
        name: "modify-post",
        component: () => import("../components/ModifyPost.vue"),
        meta: {
            title: "Groupomania : Modifier la publication"
        }
    },
    {
        path: "/modifyComment/:id",
        name: "modify-comment",
        component: () => import("../components/Comment.vue"),
        meta: {
            title: "Groupomania : Modifier le commentaire"
        }
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
router.beforeEach((to, from, next) => {
    const userLog = store.state.userLog;
    if ((to.name !== 'Login' && !userLog) && (to.name !== 'Cgu')) next({ alias: 'Login' })
    else next()
})

router.afterEach((to, from) => {
    console.log(from, to);
    document.title = to.meta.title;
});

export default router;