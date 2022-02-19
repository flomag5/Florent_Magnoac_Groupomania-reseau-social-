<template>
  <div class="container">
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <div class="social-feed-box" :key="post.id">
      <!-- Actions sur le post -->
      <div class="pull-right social-action dropdown">
        <button
          data-toggle="dropdown"
          class="dropdown-toggle btn-white"
          aria-label="accés aux options"
          v-if="post.userId === logId || isAdmin === true"
        >
          <i class="fa fa-angle-down"></i>
        </button>
        <ul class="dropdown-menu m-t-xs">
          <li>
            <button
              v-if="post.userId === logId"
              @click="modifyPost()"
              href="#"
              aria-label="modifier le post"
            >
              Modifier
            </button>
          </li>
          <li>
            <button
              @click="deletePost()"
              v-if="post.userId === logId || isAdmin === true"
              href="#"
              aria-label="supprimer le post"
            >
              Supprimer
            </button>
          </li>
        </ul>
      </div>
      <!-- Contenu du post -->
      <div class="social-avatar">
        <router-link :to="`/profile/${post.userId}`">
          <a
            href="#"
            class="pull-left"
            aria-label="Lien profil depuis l'avatar"
          >
            <img alt="Avatar utilisateur" :src="post.user.avatar" /> </a
        ></router-link>
        <div class="media-body">
          <router-link :to="`/profile/${post.userId}`"
            ><a href="#" id="post-user" aria-label="Lien profil depuis le nom">
              <strong>
                {{ post.user.lastName }} {{ post.user.firstName }}
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
        <h1 class="post-title">
          {{ post.title }}
        </h1>
        <p>{{ post.content }}</p>
        <img
          v-if="post.image"
          :src="post.image"
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
            @click="getComments()"
            v-if="post.comment.length === 0"
          >
            <i class="fa fa-comments">&nbsp; 0</i> Commentaire
          </button>
          <button class="btn btn-white btn-xs" @click="getComments()" v-else>
            <i class="fa fa-comments">&nbsp; {{ post.comment.length }}</i>
            Commentaires
          </button>
        </div>
      </div>

      <!-- Commentaires du post -->
      <div class="social-footer">
        <div
          class="social-comment"
          v-bind:key="index"
          v-for="(comment, index) in comments"
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
                <button @click="deleteComment(index)">
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
            <input
              class="form-control"
              aria-label="commenter le post"
              v-model="newComment"
              v-on:keyup.enter="createComment()"
              placeholder="Ecrivez un commentaire..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import PostDataService from "../services/PostDataService";
import Like from "../components/Like.vue";

export default {
  name: "Onepost",
  components: {
    Like,
  },
  props: {
    userId: Number,
    //isAdmin: Boolean,
  },
  data() {
    return {
      id_param: this.$route.params.id,
      post: {
        title: "",
        content: "",
        image: "",
        userId: "",
        user: {},
      },
      comments: [],
      user: {},
      newComment: null,
      likes: [],
      logId: "",
      isAdmin: "",
      avatar: "",
    };
  },
  // ----- RECUPERATION DE LA PUBLICATION CIBLE ----- //
  created() {
    let id = this.$route.params.id;
    PostDataService.getOnePost(id)
      .then((response) => {
        this.post = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  beforeCreate() {
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

    // ----- COMMENTAIRES -----//
    // Récupération des commentaires
    getComments() {
      let postId = this.$route.params.id;
      let user = JSON.parse(localStorage.getItem("user"));
      fetch(`http://localhost:3000/api/comment/${postId}/all`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => (this.comments = data))
        .catch(alert);
    },

    // Publier un commentaire
    createComment() {
      const user = JSON.parse(localStorage.getItem("user"));

      let data = {
        content: this.newComment,
        postId: this.id_param,
        userId: user.userId,
      };
      fetch(`http://localhost:3000/api/posts/${this.id_param}/comment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          this.$router.go();
        })
        .catch(alert);
    },

    // Supprimer un commentaire
    deleteComment(index) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (confirm("Voulez-vous vraiment supprimer ce commentaire") === true) {
        fetch(`http://localhost:3000/api/comment/${this.comments[index].id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        })
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

    // ----- PUBLICATIONS ----- //

    // Supprimer un post
    deletePost() {
      let user = JSON.parse(localStorage.getItem("user"));
      let postId = this.$route.params.id;
      if (confirm("Voulez-vous vraiment supprimer le post") === true) {
        fetch(`http://localhost:3000/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => response.json())
          .then(() => {
            alert("La suppression du post est bien prise en compte");
            this.$router.push("/posts");
          })
          .catch(alert);
      }
    },

    // Envoi vers modification du Post
    modifyPost() {
      this.$router.push(`/modifyPost/${this.id_param}`);
    },
  },
  mounted() {
    this.UserMe();
    this.getComments();
  },
};
</script>

<style>
body {
  margin-top: 30px;
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
  width: 520px;
  padding: 15px;
  border: 1px solid #e7eaec;
  background: #fff;
  margin-top: 10px;
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
.comment-user {
  color: #115d8d;
}

@media screen and (max-width: 512px) {
  .social-feed-box {
    width: 100%;
    padding: 15px;
    border: 1px solid #e7eaec;
    background: #fff;
    margin-bottom: 15px;
  }
}
</style>