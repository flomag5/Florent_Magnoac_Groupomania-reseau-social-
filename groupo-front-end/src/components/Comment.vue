<template>
  <div class="card gedf-card">
    <div class="social-avatar">
      <a href="#" class="pull-left">
        <img alt="Avatar utilisateur" :src="user.avatar" />
      </a>
      <div class="media-body">
        <form @submit.prevent="modifyComment">
          <div id="text">
            <label for="textarea">Modifier votre commentaire</label>
            <textarea
              class="form-control"
              name="textarea"
              rows="2"
              v-model="comment.content"
            ></textarea>
          </div>
          <div id="modify" class="btn-group">
            <input type="submit" value="modifier" class="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "modify-comment",
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
  /**récupération du commentaire à modifier */
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    const commentId = this.$route.params.id;
    /* récupération du commentaire ciblé selon id */
    fetch(`http://localhost:3000/api/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.comment = data;
      })
      .catch((error) => {
        error;
      });
  },
  data() {
    return {
      user: {},
      comment: {},
      newComment: {
        id: "",
        userId: "",
        postId: "",
        content: "",
      },
      avatar: "",
      logId: "",
      isAdmin: "",
    };
  },
  methods: {
    // ----- USER EN COURS DE SESSION ----- //
    UserMe() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.logId = user.userId;
      this.isAdmin = user.isAdmin;
    },

    // ----- MODIFICATION DU COMMENTAIRE ----- //
    modifyComment() {
      let user = JSON.parse(localStorage.getItem("user"));
      let postId = this.comment.postId;
      let data = {
        content: this.comment.content,
      };

      if (confirm("êtes vous sûr de vouloir modifier votre commentaire ?")) {
        const commentId = this.$route.params.id;
        axios
          .put(`http://localhost:3000/api/comment/${commentId}`, data, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(data),
          })
          .then(() => {
            router.push({ path: `/posts/${postId}` });
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped>
body {
  margin-top: 30px;
}
#modify {
  margin-top: 15px;
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
.social-avatar {
  padding: 15px 15px 0 15px;
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
@media screen and (max-width: 512px) {
  .card {
    width: 100%;
  }
}
</style>