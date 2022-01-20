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
          @submit.prevent="submitForm"
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
              v-model="post.title"
              required
            ></textarea>
            <textarea
              class="form-control"
              id="message"
              rows="3"
              placeholder="A quoi pensez-vous?"
              v-model="post.content"
              required
            ></textarea>

            <div class="file">
              <label class="file-label">
                <b-form-file
                  v-model="post.image"
                  accept="image/*"
                  plain
                  required
                ></b-form-file>
                <input class="file-input" type="file" name="resume" />
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
import PostDataService from "../services/PostDataService";

export default {
  name: "create-post",
  data() {
    return {
      post: {
        title: "",
        content: "",
        image: "",
      },
    };
  },
  methods: {
    submitForm: function (event) {
      const newPost = new FormData();
      console.log(event.target);
      newPost.append("title", this.post.title);
      newPost.append("content", this.post.content);
      console.log(this.post.image);
      newPost.append("image", this.post.image, this.post.image.filename);

      PostDataService.createPost(newPost).then(() => {
        this.$router.go();
      });
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.h7 {
  font-size: 0.8rem;
}
.gedf-wrapper {
  margin-top: 0.97rem;
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
/**Reset Bootstrap*/
.dropdown-toggle::after {
  content: none;
  display: none;
}
</style>