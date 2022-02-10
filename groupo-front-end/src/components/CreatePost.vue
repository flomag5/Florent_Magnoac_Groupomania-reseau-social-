<template>
  <div class="card gedf-card">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="posts-tab"
            data-toggle="tab"
            href="#posts"
            role="tab"
            aria-controls="posts"
            aria-selected="true"
            >Créer une publication</a
          >
        </li>
      </ul>
    </div>

    <div class="card-body">
      <div class="tab-content" id="myTabContent">
        <form
          method="POST"
          @submit.prevent="createPost"
          enctype="multipart/form-data"
        >
          <div
            class="tab-pane fade show active"
            id="posts"
            role="tabpanel"
            aria-labelledby="posts-tab"
          >
            <label class="sr-only" for="message">post</label>
            <textarea
              class="form-control"
              id="message"
              rows="1"
              placeholder="Titre de la publication"
              v-model="title"
              required
            ></textarea>
            <textarea
              class="form-control"
              id="message"
              rows="3"
              placeholder="A quoi pensez-vous?"
              v-model="content"
              required
            ></textarea>

            <div class="file">
              <div id="preview" v-if="preview">
                <img :src="preview" :alt="preview" />
              </div>
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  accept="image/*"
                  name="image"
                  ref="image"
                  v-on:change="uploadFile"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> Choose a file… </span>
                </span>
              </label>
            </div>
            <div class="btn-toolbar justify-content-between">
              <div class="btn-group">
                <button type="submit" class="btn btn-primary">Partager</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-post",
  data() {
    return {
      title: "",
      content: "",
      image: "",
      userId: "",
      preview: null,
    };
  },
  methods: {
    createPost() {
      let user = JSON.parse(localStorage.getItem("user"));
      //const fileField = document.querySelector('input[type="file"]');
      //const token = JSON.parse(localStorage.getItem("userToken"));

      //  if (this.image === "" && this.title != "" && this.content != "") {
      const data = new FormData();
      /* if (this.image !== "") {
        data.append("image", fileField.files[0]);
      }*/
      data.append("title", this.title);
      data.append("content", this.content);
      data.append("userId", user.userId);

      console.log("data", data);
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          authorization: `Bearer ${user.token}`,
        },
        body: data,
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          //this.$router.push("/posts");
        })
        .catch(alert);
      /*  } else if (this.title != "" && this.content != "") {
        let data = new FormData();
        data.append("image", fileField.files[0]);
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("userId", user.userId);
        fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: {
            authorization: `Bearer ${user.token}`,
          },
          body: data,
        })
          .then((response) => response.json())
          .then(() => {
            this.$router.push("/posts");
          })
          .catch(alert);
      }*/
    },
    uploadFile(e) {
      if (e.target.files) {
        let reader = new FileReader();
        reader.onload = (event) => {
          this.preview = event.target.result;
          this.image = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    },
  },
};
//import PostDataService from "../services/PostDataService";
//import axios from "axios";
/*
export default {
  name: "create-post",
  data() {
    return {
      title: "",
      content: "",
      image: "",
      preview: null,
    };
  },
  methods: {
    uploadFile(event) {
      this.image = event.target.files[0];
    },
    createPost() {
      const Id = JSON.parse(localStorage.getItem("userId"));
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("image", this.image);
      formData.append("userId", Id);

      axios
        .post("http://localhost:3000/api/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
  },
};

    submitForm: function () {
      const newPost = new FormData();
      newPost.append("title", this.title);
      newPost.append("content", this.content);
      newPost.append("image", this.file, this.file.filename);

      PostDataService.createPost(newPost).then(() => {
       // this.$router.go();
      });
      return true;
    },
  },
};*/
</script>

<style lang="scss" scoped>
.h7 {
  font-size: 0.8rem;
}
.gedf-wrapper {
  margin-top: 0.97rem;
}
#preview {
  overflow: hidden;
  max-width: 20%;
}
@media (min-width: 992px) {
  .gedf-main {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  .gedf-card {
    margin-top: 2.77rem;
    margin-bottom: 2.77rem;
  }
}
@media screen and (max-width: 512px) {
  .card {
    width: 85%;
    margin: auto;
  }
}
/**Reset Bootstrap*/
.dropdown-toggle::after {
  content: none;
  display: none;
}
</style>