<template>
  <div>
    <div class="social-footer">
      <div class="social-comment" v-for="comment in comments" :key="comment.id">
        <a href="#" class="pull-left">
          <img
            :alt="comment.user.avatar"
            :src="'http://localhost:3000/images/' + comment.user.avatar"
            class="avatar"
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
    </div>
    <div class="social-comment">
      <a href="#" class="pull-left">
        <img alt="Avatar utilisateur" src="user.id" />
      </a>
      <div class="media-body">
        <input
          class="form-control"
          name="comment"
          v-model="newComment"
          v-on:keyup.enter="createComment"
          v-show="!editComment"
          placeholder="Ecrivez un commentaire public..."
        />
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "Comments",
  props: {
    comments: Array,
    isAdmin: Boolean,
    userId: Number,
    postId: Number,
  },
  data() {
    return {
      newComment: null,
      updateComment: null,
      editComment: false,
      errMsg: null,
    };
  },
  methods: {
    /* fonction pour créer un nouveau commentaire */
    createComment() {
      let postId = JSON.stringify(this.postId);
      if (!this.newComment) {
        this.errMsg =
          "Erreur => vous devez remplir le champ <commentaire> pour créer un nouveau commentaire!";
        return;
      }
      const data = {
        content: this.newComment,
        userId: JSON.stringify(this.userId),
        postId: JSON.stringify(this.postId),
      };
      fetch(
        `http://localhost:3000/api/posts/${JSON.stringify(postId)}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          mode: "cors",
          body: JSON.stringify(data),
        }
      )
        .then((res) => res.json())
        .then((data) => this.$emit("created", data.id))
        .catch((error) => {
          console.error(error);
        });
      this.newComment = "";
    },
    /* on vérifie le statut de l'user connecté */
    auth(commentUserId) {
      if (this.isAdmin) {
        return true;
      }
      if (this.userId !== commentUserId) {
        return false;
      }
      return true;
    },
    /* pour afficher/cacher la section commentaire de ce post */
    toggleComment(commentId, cancel) {
      if (cancel) {
        console.log("hello");
      }
      if (this.editComment == commentId) {
        commentId = null;
      }
      this.editComment = commentId;
    },
    /* pour supprimer le commentaire */
    deleteComment(commentId) {
      if (confirm("êtes vous sûr de vouloir supprimer ce commentaire ?")) {
        fetch(
          `http://localhost:3000/api/comment/${JSON.stringify(commentId)}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ).catch((error) => console.log(error));
        this.$emit("deleted", commentId);
      }
    },
    /* pour modifier le commentaire */
    modifyComment(commentId) {
      const data = {
        text: this.$refs.modify.value,
      };
      fetch(`http://localhost:3000/api/comment/${JSON.stringify(commentId)}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => console.log(error));
      this.$emit("modified", commentId, data.text);
      this.toggleComment(commentId);
    },
  },
  /* on indique les emitters (ici l'ajout et la suppression) */
  emits: ["created", "deleted", "modified"],
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