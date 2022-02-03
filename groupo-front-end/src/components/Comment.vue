<template>
  <div>
    <!-- pour créer un nouveau commentaire -->
    <div class="social-comment">
      <a href="" class="pull-left">
        <img alt="Avatar utilisateur" src="post.user.avatar" />
      </a>
      <div class="media-body">
        <!--     <router-link :to="'/posts/' + post.id"> -->
        <form>
          <textarea
            class="border rounded p-2 mb-2 text-color bg-white"
            type="text"
            name="comment"
            id="comment"
            required="required"
            v-model="newComment.content"
            v-on:keyup.enter="createComment"
            placeholder="Commentaire"
          ></textarea>
        </form>

        <!--   </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",

  data() {
    return {
      newComment: {
        id: "",
        userId: "",
        postId: "",
        content: "",
      },
    };
  },
  methods: {
    createComment(postId) {
      const user = JSON.parse(localStorage.getItem("user"));
      this.newComment.userId = user.userId;
      this.newComment.postId = postId;
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append("Authorization", user.token);
      const myInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(this.newComment),
      };
      //console.log(this.newComment);
      fetch(`http://localhost:3000/api/posts/${this.post.id}/comment`, myInit)
        .then((result) => {
          result
            .json()
            .then((data) => {
              window.location.reload(true);
              if (data.error) {
                console.log(data);
                return;
              }
              console.log(result + "Un commentaire a été créé");
            })
            .catch((error) => {
              console.log(error + "Aucun commentaire n'a été créé");
            });
        })
        .catch((error) => {
          console.log(error + "La création de commentaire ne fonctionne pas");
        });
    },
  },
};
</script>

<style scoped>
#commentsContainer {
  margin: auto;
  border-radius: 4px;
  overflow-wrap: break-word;
}
.comment {
  border-bottom: 1px solid rgb(0 0 0 / 10%);
  margin: 2rem;
  border-radius: 4px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.commentUsername {
  display: flex;
  justify-content: space-between;
  vertical-align: center;
  width: 90%;
  padding-left: 16px;
}
.commentText {
  margin: 1rem 0 1rem 0;
}
.profileContainer {
  margin: auto;
  max-width: 48px;
  max-height: 48px;
  height: 48px;
  width: 48px;
  min-height: 48px;
  min-width: 48px;
  border-radius: 50%;
  overflow: hidden;
}
.profile {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
input {
  margin-top: 1.8rem;
  width: 100%;
  padding: 10px;
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  border-style: none;
  border-radius: 4px;
  outline: none;
}
.optionsBtn {
  display: flex;
}
button {
  background: none;
  border-style: none;
  outline: none;
  margin-left: 1rem;
  display: flex;
}
.btn {
  width: 30%;
}
.btn:hover {
  box-shadow: 2px 2px 8px 5px #00000033;
}
.btn:active {
  transform: scale(0.98);
}
i {
  margin-right: 3px;
}
@media screen and (max-width: 992px) {
  .header {
    flex-wrap: wrap;
    justify-content: space-around;
    line-height: 2rem;
  }
  .profileContainer {
    margin: 0;
  }
  .commentUsername {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-left: 0;
  }
  .optionsBtn {
    width: 100%;
    justify-content: space-between;
  }
  .commentText {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding: 0.5rem;
  }
  .btn {
    width: 100%;
  }
}
</style>