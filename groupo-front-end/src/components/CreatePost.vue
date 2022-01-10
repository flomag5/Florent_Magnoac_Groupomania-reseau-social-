
<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="post.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <input
          class="form-control"
          id="content"
          required
          v-model="post.content"
          name="content"
        />
      </div>

      <button @click="savePost" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPost">Add</button>
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
        id: null,
        title: "",
        content: "",
        image: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    savePost() {
      var data = {
        title: this.post.title,
        content: this.post.content,
        image: this.post.image,
      };

      PostDataService.create(data)
        .then((response) => {
          this.post.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPost() {
      this.submitted = false;
      this.post = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>