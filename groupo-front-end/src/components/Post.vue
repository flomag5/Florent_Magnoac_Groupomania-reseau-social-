<template>
  <div class="container">
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <div class="social-feed-box" :key="post.id">
      <div class="pull-right social-action dropdown">
        <button data-toggle="dropdown" class="dropdown-toggle btn-white">
          <i class="fa fa-angle-down"></i>
        </button>
        <ul class="dropdown-menu m-t-xs">
          <li>
            ><a @click="modifyPost()" href="#">Modifier</a>
            >
          </li>
          <li>
            <a @click="deletePost()" href="#">Supprimer</a>
          </li>
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
          <Like :postId="post.id" :userId="userId" />
          <!--<button class="btn btn-white btn-xs" @click="likePost()">
            <i class="fa fa-thumbs-up"></i>{{ post.likes }} Like this!
          </button>-->
          <button class="btn btn-white btn-xs" @click="toggleComments(post.id)">
            <i class="fa fa-comments"></i> Comment
          </button>
        </div>
      </div>
      <div class="social-footer">
        <div
          class="social-comment"
          v-for="comment in comments"
          :key="comment.postId"
        >
          <a href="#" class="pull-left">
            <img alt="Avatar utilisateur" src="comment.user.avatar" />
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
          <a href="#" class="pull-left">
            <img alt="Avatar utilisateur" src="user.id" />
          </a>
          <div class="pull-right social-action dropdown">
            <button data-toggle="dropdown">
              <i class="fas fa-ellipsis-h"></i>
            </button>
            <ul class="dropdown-menu m-t-xs">
              <li>
                <a @click="modifyComment()" href="#">Modifier</a>
              </li>
              <li>
                <a @click="deleteComment()" href="#">Supprimer</a>
              </li>
            </ul>
          </div>
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
  },
  data() {
    return {
      id_param: this.$route.params.id,
      post: {
        title: "",
        content: "",
        image: "",
        user: {},
      },
      comments: [],
      like: [],
    };
  },
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

    // -- COMMENTS
    getComments() {
      let user = JSON.parse(localStorage.getItem("user"));
      fetch(`http://localhost:3000/api/posts/${this.id_param}/comment`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => (this.comments = data))
        .catch(alert);
    },

    createComment() {
      const user = JSON.parse(localStorage.getItem("user"));

      let data = {
        content: this.content,
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

    // -- POST
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

    modifyPost() {
      this.$router.push(`/modifyPost/${this.id_param}`);
    },
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
  width: 370px;
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