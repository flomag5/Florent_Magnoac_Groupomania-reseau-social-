
<template>
  <main>
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
                  :src="user.avatar"
                  aria-label="avatar utilisateur" /></a
            ></router-link>
          </div>
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
            <button
              data-toggle="dropdown"
              v-if="post.userId === logId || isAdmin === true"
              class="dropdown-toggle btn-white"
              aria-label="post option"
            >
              <i class="fa fa-angle-down"></i>
            </button>
            <ul class="dropdown-menu m-t-xs">
              <li v-if="post.userId === logId">
                <button @click="modifyPost(post.id)">
                  <i class="far fa-edit modify"></i>Modifier
                </button>
              </li>
              <li v-if="post.userId === logId || isAdmin === true">
                <button @click="deletePost(post.id)">
                  <i class="far fa-trash-alt delete"></i>Supprimer
                </button>
              </li>
            </ul>
          </div>
          <div class="social-avatar">
            <router-link :to="`/profile/${post.userId}`"
              ><a class="pull-left" aria-label="Lien profil depuis l'avatar">
                <img alt="Avatar utilisateur" :src="post.user.avatar" /> </a
            ></router-link>
            <div class="media-body">
              <router-link :to="`/profile/${post.userId}`"
                ><a
                  href="#"
                  class="post-user-name"
                  aria-label="Lien profil depuis le nom"
                  ><strong>
                    {{ post.user.firstName }} {{ post.user.lastName }}
                  </strong>
                </a></router-link
              >
              <small class="text-muted"
                >Publié le {{ dateFormat(post.date) }} à
                {{ hourFormat(post.date) }}</small
              >
            </div>
          </div>
          <div class="social-body">
            <router-link :to="'/posts/' + post.id" class="post-title-link"
              ><h1 class="post-title">
                {{ post.title }}
              </h1></router-link
            >
            <p class="post-content">{{ post.content }}</p>
            <img
              v-if="post.image"
              :src="post.image"
              name="image"
              alt="photo du post"
              class="img-responsive"
            />
            <div class="btn-group">
              <!-- Instance Like component -->
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
              <span
                class="btn btn-white btn-xs"
                v-if="post.comment.length === 0"
              >
                <i class="fa fa-comments">&nbsp; 0</i>
                Commentaire
              </span>
              <span
                class="btn btn-white btn-xs"
                v-else-if="post.comment.length === 1"
              >
                <i class="fa fa-comments">&nbsp; 1</i>
                Commentaire
              </span>
              <span class="btn btn-white btn-xs" v-else>
                <i class="fa fa-comments">&nbsp; {{ post.comment.length }}</i>
                Commentaires
              </span>
            </div>
          </div>
          <!-- Commentaires du post -->
          <div class="social-footer">
            <div
              class="social-comment"
              v-for="comment in post.comment"
              v-bind:key="comment.id"
              :postId="post.id"
            >
              <router-link :to="`/profile/${comment.userId}`" class="pull-left">
                <img alt="Avatar utilisateur" :src="comment.user.avatar" />
              </router-link>
              <div class="pull-right social-action dropdown">
                <button
                  data-toggle="dropdown"
                  v-if="comment.userId === logId || isAdmin === true"
                  text="action sur commentaire"
                  aria-label="modifier commentaire"
                >
                  <i class="fas fa-ellipsis-h"></i>
                </button>
                <ul class="dropdown-menu m-t-xs">
                  <li v-if="comment.userId === logId">
                    <button @click="modifyComment(comment.id)">
                      <i class="far fa-edit modify"></i> modifier
                    </button>
                  </li>
                  <li v-if="comment.userId === logId || isAdmin === true">
                    <button @click="deleteComment(comment.id)">
                      <i class="far fa-trash-alt delete"></i> supprimer
                    </button>
                  </li>
                </ul>
              </div>
              <div class="media-body">
                <router-link :to="`/profile/${comment.userId}`"
                  ><strong class="comment-user"
                    >{{ comment.user.firstName }}
                    {{ comment.user.lastName }}</strong
                  ></router-link
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
              <router-link :to="`/profile`" class="pull-left">
                <img alt="Avatar utilisateur" :src="user.avatar" />
              </router-link>
              <div class="media-body">
                <router-link
                  :to="'/posts/' + post.id"
                  aria-label="lien vers ce post"
                >
                  <a class="comment-link" alt="Commenter la publication"
                    ><p>voulez-vous commenter cela...</p></a
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PostDataService from "../services/PostDataService";
import Like from "../components/Like.vue";

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
      comment: {},
      newComment: null,
      user: {},
      postId: "",
      likes: [],
      logId: "",
      isAdmin: "",
    };
  },

  // ----- RECUPERATION DE TOUTES LES PUBLICATIONS ----- //
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
    fetch(`http://localhost:3000/api/user/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.user = data;
      })
      .catch((error) => {
        error;
      });
    this.UserMe();
  },

  methods: {
    // ----- USER EN COURS DE SESSION ----- //
    UserMe() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.logId = user.userId;
      this.isAdmin = user.isAdmin;
    },

    // ----- DATE ET HEURE ----- //
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

    // ----- ACTIONS SUR LES PUBLICATIONS ----- //
    // Vers création de publication
    createPost() {
      this.$router.push("/createpost");
    },

    // Vers modification de publication
    modifyPost(id) {
      this.$router.push(`/modifyPost/${id}`);
    },

    // ----- SUPPRESSION DU POST ----- //
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

    // ----- SUPPRESSION DU COMMENTAIRE ----- //
    deleteComment(commentId) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (confirm("êtes vous sûr de vouloir supprimer ce commentaire ?")) {
        fetch(
          `http://localhost:3000/api/comment/${JSON.stringify(commentId)}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
          .then((response) => response.json())
          .then(() => {
            alert("La suppression du commentaire est bien prise en compte");
            this.$router.go();
          })
          .catch(alert);
      }
    },

    // Modifier un commentaire
    modifyComment(id) {
      this.$router.push(`/modifyComment/${id}`);
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
  color: #4d5b64;
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
.post-user-name {
  color: #115d8d;
  font-size: 1rem;
}
.comment-user {
  color: #115d8d;
}
.post-title {
  color: #005d8f;
}
.comment-link {
  color: #005d8f;
}
.post-content {
  color: black;
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