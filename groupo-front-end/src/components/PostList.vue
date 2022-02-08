
<template>
  <div class="container_feed">
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <div class="col-md-7">
      <div class="social-feed-box">
        <div class="social-avatar">
          <router-link :to="'/profile'"
            ><a href="#" class="pull-left" aria-label="lien vers mon profil">
              <img
                alt="Avatar utilisateur"
                :src="userAvatar"
                aria-label="avatar utilisateur"
              /> </a
          ></router-link>
        </div>
        <form class="d-flex">
          <input
            @click="createPost()"
            class="form-control me-2"
            type="create"
            placeholder="Quoi de neuf "
            aria-label="Publier un post"
          />
        </form>
      </div>
      <div class="social-feed-box" v-for="post in posts" :key="post.id">
        <div class="pull-right social-action dropdown">
          <button
            data-toggle="dropdown"
            v-if="post.userId === logId || isAdmin === 1"
            class="dropdown-toggle btn-white"
            aria-label="post option"
          >
            <i class="fa fa-angle-down"></i>
          </button>
          <ul class="dropdown-menu m-t-xs">
            <li><a @click="modifyPost(post.id)" href="#">Modifier</a></li>
            <li><a @click="deletePost(post.id)" href="#">Supprimer</a></li>
          </ul>
        </div>
        <div class="social-avatar">
          <router-link :to="`/profile/${post.userId}`"
            ><a class="pull-left" aria-label="Lien profil depuis l'avatar">
              <img alt="Avatar utilisateur" :src="post.user.avatar" /> </a
          ></router-link>
          <div class="media-body">
            <router-link :to="`/profile/${post.userId}`"
              ><a href="#" id="post-user" aria-label="Lien profil depuis le nom"
                ><strong>
                  {{ post.user.lastName }} {{ post.user.firstName }}</strong
                >
              </a></router-link
            >
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
            name="image"
            alt="photo du post"
            class="img-responsive"
          />
          <div class="btn-group">
            <Like
              v-if="post.id"
              :postId="post.id"
              :userId="post.userId"
              :likesArray="post.like"
            />
            <button
              class="btn btn-white btn-xs"
              @click="likePost"
              aria-label="j'aime ce post"
            ></button>

            <i class="fa fa-comments"></i>
            {{ post.comment.length }} Commentaires
          </div>
        </div>
        <div class="social-footer">
          <div
            class="social-comment"
            v-for="comment in post.comment"
            v-bind:key="comment.id"
            :postId="post.id"
          >
            <a href="#" class="pull-left">
              <img alt="Avatar utilisateur" :src="comment.user.avatar" />
            </a>
            <div class="media-body">
              <a
                href="#"
                id="comment-user"
                aria-label="Lien vers profil utilisateur"
                ><strong
                  >{{ comment.user.firstName }}
                  {{ comment.user.lastName }}</strong
                ></a
              ><br />

              <p>{{ comment.content }}</p>
              <p>
                -
                <small class="text" id="comment-date"
                  >{{ dateFormat(comment.date) }}
                  {{ hourFormat(comment.createdAt) }}</small
                >
              </p>
            </div>
          </div>
          <div class="social-comment">
            <a href="" class="pull-left">
              <img alt="Avatar utilisateur" :src="post.user.avatar" />
            </a>
            <div class="media-body">
              <router-link
                :to="'/posts/' + post.id"
                aria-label="lien vers ce post"
              >
                <input
                  class="form-control"
                  aria-label="Commenter la publication"
                  v-model="newComment"
                  :postId="post.id"
                  v-on:keyup.enter="createComment"
                  placeholder="Ecrivez un commentaire public..."
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";
import Like from "../components/Like.vue";
//import axios from "axios";
//import { mapState } from "vuex";

export default {
  name: "AllPosts",
  components: {
    Like,
  },
  props: {
    userId: Number,
  },
  data() {
    return {
      posts: [],
      comments: [],
      newComment: null,
      user: {},
      postId: "",
      likes: [],
      userAvatar: "",
      logId: "",
      isAdmin: "",
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
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.userAvatar = user.avatar;
    this.UserMe();
  },

  methods: {
    UserMe() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.logId = user.userId;
      this.isAdmin = user.isAdmin;
      console.log(this.logId, "LLLLLLLLLLLLLLLLLLLLLLLLog");
      console.log(this.isAdmin, "Admmmmmmmmmmmmin");
    },

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

    createPost() {
      this.$router.push("/createpost");
    },
    modifyPost(id) {
      this.$router.push(`/modifyPost/${id}`);
    },

    deletePost(postId) {
      let user = JSON.parse(localStorage.getItem("user"));

      if (confirm("Voulez-vous vraiment supprimer le post") === true) {
        fetch(`http://localhost:3000/api/posts/${JSON.stringify(postId)}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => response.json())
          .then(() => {
            alert("La suppression du post est bien prise en compte");
            this.$router.go();
          })
          .catch(alert);
      }
    },
  },
};
</script>

<style>
body {
  margin-top: 35px;
}

#comment-date {
  color: #575558;
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
.social-comment {
  border-bottom: 1px solid lightgray;
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
#post-user {
  color: #115d8d;
  font-size: 1rem;
}
#comment-user {
  color: #115d8d;
}

@media screen and (max-width: 512px) {
  .social-feed-box {
    max-width: 340px;
    margin: auto;
    padding: 15px;
    border: 1px solid #e7eaec;
    background: #fff;
    margin-bottom: 15px;
  }
}
</style>