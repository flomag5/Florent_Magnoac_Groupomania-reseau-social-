     <template>
  <div class="social-footer">
    <div
      class="social-comment"
      v-bind:key="index"
      v-for="(comment, index) in comments"
    >
      <a href="#" class="pull-left">
        <img alt="Avatar utilisateur" :src="comment.user.avatar" />
      </a>
      <div class="pull-right social-action dropdown">
        <button data-toggle="dropdown">
          <i class="fas fa-ellipsis-h"></i>
        </button>
        <ul class="dropdown-menu m-t-xs">
          <li>
            <a @click="toggleComment(comment.id)" href="#"
              ><i class="far fa-edit modify"></i> modifier</a
            >
          </li>
          <li>
            <a @click="deleteComment(index)" href="#"
              ><i class="far fa-trash-alt delete"></i> supprimer</a
            >
          </li>
        </ul>
      </div>
      <div class="media-body">
        <a href="#">{{ comment.user.firstName }} {{ comment.user.lastName }}</a
        ><br />
        <p v-show="!editComment" class="text">{{ comment.content }}</p>
        <p>
          <br />
          <small class="text-muted"
            >{{ dateFormat(comment.date) }}
            {{ hourFormat(comment.createdAt) }}</small
          >
        </p>
      </div>
      <div
        class="media-body"
        v-if="editComment"
        @submit.prevent="modifyComment(comment.id)"
      >
        <input
          name="updateComment"
          ref="modify"
          :value="comment.content"
          class="form-control"
        />
        <input
          type="submit"
          value="Je modifie!"
          class="btn"
          v-on:keyup.enter="modifyComment(comment.id)"
        />
      </div>
    </div>

    <div class="social-comment">
      <a href="#" class="pull-left">
        <img alt="Avatar utilisateur" src="post.user.avatar" />
      </a>
      <div class="pull-right social-action dropdown">
        <button data-toggle="dropdown">
          <i class="fas fa-ellipsis-h"></i>
        </button>
        <ul class="dropdown-menu m-t-xs">
          <li>
            <a @click="modifyComment" href="#"
              ><i class="far fa-edit modify"></i> modifier</a
            >
          </li>
          <li>
            <a @click="deleteComment(index)" href="#"
              ><i class="far fa-trash-alt delete"></i> supprimer</a
            >
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
      updateComment: null,
      editComment: false,
      errMsg: null,
      user: {},
    };
  },
  methods: {
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
          `http://localhost:3000/api/comments/${JSON.stringify(commentId)}`,
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
        content: this.$refs.modify.value,
      };
      fetch(`http://localhost:3000/api/comments/${JSON.stringify(commentId)}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => console.log(error));
      this.$emit("modified", commentId, data.content);
      this.toggleComment(commentId);
    },
  },
  /* on indique les emitters (ici l'ajout et la suppression) */
  emits: ["deleted", "modified"],
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