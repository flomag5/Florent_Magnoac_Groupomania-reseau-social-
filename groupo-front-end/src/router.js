import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/posts",
            name: "Allposts",
            component: () => import("./components/PostList")
        },
        {
            path: "/posts/:id",
            name: "Onepost",
            component: () => import("./components/Post")
        },
        {
            path: "/createPost",
            name: "add",
            component: () => import("./components/CreatePost")
        }
    ]
});