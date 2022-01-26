
<template>
  <div class="container_feed">
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <div class="col-md-7">
      <div class="social-feed-box">
        <a href="" class="pull-left">
          <img
            alt="Avatar utilisateur"
            src="'http://localhost:3000/images/' + user.avatar"
          />
        </a>
        <form class="d-flex">
          <input
            @click="createPost()"
            class="form-control me-2"
            type="create"
            placeholder="Quoi de neuf"
            aria-label="Publier un post"
          />
        </form>
      </div>
      <div class="social-feed-box" v-for="post in posts" :key="post.id">
        <div class="pull-right social-action dropdown">
          <button data-toggle="dropdown" class="dropdown-toggle btn-white">
            <i class="fa fa-angle-down"></i>
          </button>
          <ul class="dropdown-menu m-t-xs">
            <li><a @click="modifyPost()" href="#">Modifier</a></li>
            <li><a href="#">Supprimer</a></li>
          </ul>
        </div>
        <div class="social-avatar">
          <a href="" class="pull-left">
            <img alt="Avatar utilisateur" :src="post.user.avatar" />
          </a>
          <div class="media-body">
            <a href="#"> {{ post.user.lastName }} {{ post.user.firstName }} </a>
            <small class="text-muted"
              >Publié le {{ dateFormat(post.date) }} à
              {{ hourFormat(post.date) }}</small
            >
          </div>
        </div>
        <div class="social-body">
          <router-link :to="'/posts/' + post.id"
            ><h1>
              {{ post.title }}
            </h1></router-link
          >
          <p>{{ post.content }}</p>
          <img
            v-if="post.image"
            :src="post.image"
            alt="photo du post"
            class="img-responsive"
          />
          <div class="btn-group">
            <button class="btn btn-white btn-xs" @click="likePost">
              <i class="fa fa-thumbs-up"></i>{{ post.likes }} Like this!
            </button>
            <button class="btn btn-white btn-xs" @click="addComment">
              <i class="fa fa-comments"></i> Comment
            </button>
          </div>
        </div>
        <div class="social-footer">
          <div
            class="social-comment"
            v-for="comment in post.comments"
            :key="comment.id"
          >
            <a href="" class="pull-left">
              <img
                alt="Avatar utilisateur"
                :src="'http://localhost:3000/images/' + user.avatar"
              />
            </a>
            <div class="media-body">
              <a href="#"
                >{{ comment.user.firstName }} {{ comment.user.lastName }}</a
              >
              {{ comment.content }}
              <br />
              -
              <small class="text-muted">{{ dateFormat(comment.date) }}</small>
            </div>
          </div>
          <div class="social-comment">
            <a href="" class="pull-left">
              <img alt="Avatar utilisateur" src="comment.user.avatar" />
            </a>
            <div class="media-body">
              <input
                class="form-control"
                v-on:keyup.enter="createComment()"
                placeholder="Ecrivez un commentaire public..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

//import { mapState } from "vuex";

export default {
  name: "AllPosts",
  components: {},
  data() {
    return {
      posts: [],
      comments: [],
      likes: Number,
    };
  },
  created() {
    PostDataService.getAllPosts()
      .then((response) => {
        this.posts = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    dateFormat(createdDate) {
      const date = new Date(createdDate);
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return date.toLocaleDateString("fr-FR", options);
    },
    hourFormat(createdHour) {
      const hour = new Date(createdHour);
      const options = { hour: "numeric", minute: "numeric", second: "numeric" };
      return hour.toLocaleTimeString("fr-FR", options);
    },

    async fetchComments(postId) {
      if (postId == null) {
        return;
      }
      const resComments = await fetch(
        `http://localhost:3000/api/comment/${JSON.stringify(postId)}`
      );
      const dataComments = await resComments.json();
      dataComments.reverse();
      this.comments = dataComments;
      return dataComments;
    },

    createPost() {
      this.$router.push("/createpost");
    },
    modifyPost(id) {
      this.$router.push(`/modifyPost/${id}`);
    },

    async createComment(post) {
      this.$router.push("/posts/" + post.id + "/comment");
    },
  },
};
</script>

<style>
body {
  margin-top: 35px;
}
.social-feed-separated .social-feed-box {
  margin-left: 62px;
}
.social-feed-separated .social-avatar {
  float: left;
  padding: 0;
}
.social-feed-separated .social-avatar img {
  width: 52px;
  height: 52px;
  border: 1px solid #e7eaec;
}
.social-feed-separated .social-feed-box .social-avatar {
  padding: 15px 15px 0 15px;
  float: none;
}
.social-feed-box {
  width: 500px; /* taille des box */
  padding: 15px;
  border: 1px solid #e7eaec;
  background: #fff;
  margin-bottom: 15px;
}
.article .social-feed-box {
  margin-bottom: 0;
  border-bottom: none;
}
.article .social-feed-box:last-child {
  margin-bottom: 0;
  border-bottom: 1px solid #e7eaec;
}
.article .social-feed-box p {
  font-size: 13px;
  line-height: 18px;
}
.social-action {
  margin: 15px;
}
.social-avatar {
  padding: 15px 15px 0 15px;
}
.social-comment .social-comment {
  margin-left: 45px;
}
.social-avatar img {
  height: 40px;
  width: 40px;
  margin-right: 10px;
}
.social-avatar .media-body a {
  font-size: 14px;
  display: block;
}
.social-body {
  padding: 15px;
}
.social-body img {
  margin-bottom: 10px;
}
.social-footer {
  border-top: 1px solid #e7eaec;
  padding: 10px 15px;
  background: #f9f9f9;
}
.social-footer .social-comment img {
  width: 32px;
  margin-right: 10px;
}
.social-comment:first-child {
  margin-top: 0;
}
.social-comment {
  margin-top: 15px;
}
.social-comment textarea {
  font-size: 12px;
}

.form-control,
.single-line {
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #e5e6e7;
  border-radius: 1px;
  color: inherit;
  display: block;
  padding: 6px 12px;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  width: 100%;
  font-size: 14px;
}

.ibox {
  clear: both;
  margin-bottom: 25px;
  margin-top: 0;
  padding: 0;
}
.ibox.collapsed .ibox-content {
  display: none;
}
.ibox.collapsed .fa.fa-chevron-up:before {
  content: "\f078";
}
.ibox.collapsed .fa.fa-chevron-down:before {
  content: "\f077";
}
.ibox:after,
.ibox:before {
  display: table;
}
.ibox-title {
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background-color: #ffffff;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 3px 0 0;
  color: inherit;
  margin-bottom: 0;
  padding: 14px 15px 7px;
  min-height: 48px;
}
.ibox-content {
  background-color: #ffffff;
  color: inherit;
  padding: 15px 20px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
}
.ibox-footer {
  color: inherit;
  border-top: 1px solid #e7eaec;
  font-size: 90%;
  background: #ffffff;
  padding: 10px 15px;
}
</style>