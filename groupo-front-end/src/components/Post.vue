<template>
  <div class="container">
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <div class="row">
      <div class="col-md-8">
        <div class="post-content">
          <img
            src="post.image"
            alt="post-image"
            class="img-responsive post-image"
          />
          <div class="post-container">
            <img
              src="user.avatar"
              alt="user"
              class="profile-photo-md pull-left"
            />
            <div class="post-detail">
              <div class="user-info">
                <h5>
                  <a href="timeline.html" class="profile-link"
                    >{{ user.firstName }} {{ user.lastName }}</a
                  >
                </h5>
                <p class="text-muted">
                  {{ dateFormat(post.date) }} à {{ hourFormat(post.date) }}
                </p>
              </div>
              <div class="reaction">
                <a class="btn text-green"
                  ><i class="fa fa-thumbs-up"></i>{{ post.likes }}</a
                >
              </div>
              <div class="line-divider"></div>
              <div class="post-text">
                <p>
                  {{ post.content }}
                  <i class="em em-anguished"></i>
                  <i class="em em-anguished"></i>
                  <i class="em em-anguished"></i>
                </p>
              </div>
              <div class="line-divider"></div>
              <div class="post-comment">
                <img
                  src="user.avatar"
                  alt="avatar utilisateur"
                  class="profile-photo-sm"
                />
                <p>
                  <a href="timeline.html" class="profile-link"
                    >{{ firstName }} {{ lastName }} </a
                  ><i class="em em-laughing"></i> {{ post.comment }}
                </p>
              </div>
              <div class="post-comment">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                  class="profile-photo-sm"
                />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ecrivez un commentaire public"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "Onepost",

  data() {
    return {
      currentPost: null,
      post: [],
    };
  },
  methods: {
    getPost(id) {
      PostDataService.get(id)
        .then((response) => {
          this.currentPost = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
  },
};
</script>

<style>
body {
  margin-top: 20px;
}

.post-content {
  background: #f8f8f8;
  border-radius: 4px;
  width: 100%;
  border: 1px solid #f1f2f2;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
}

.post-content img.post-image,
video.post-video,
.google-maps {
  width: 100%;
  height: auto;
}

.post-content .google-maps .map {
  height: 300px;
}

.post-content .post-container {
  padding: 20px;
}

.post-content .post-container .post-detail {
  margin-left: 65px;
  position: relative;
}

.post-content .post-container .post-detail .post-text {
  line-height: 24px;
  margin: 0;
}

.post-content .post-container .post-detail .reaction {
  position: absolute;
  right: 0;
  top: 0;
}

.post-content .post-container .post-detail .post-comment {
  display: inline-flex;
  margin: 10px auto;
  width: 100%;
}

.post-content .post-container .post-detail .post-comment img.profile-photo-sm {
  margin-right: 10px;
}

.post-content .post-container .post-detail .post-comment .form-control {
  height: 30px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  margin: 7px 0;
  min-width: 0;
}

img.profile-photo-md {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

img.profile-photo-sm {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.text-green {
  color: #8dc63f;
}

.text-red {
  color: #ef4136;
}

.following {
  color: #8dc63f;
  font-size: 12px;
  margin-left: 20px;
}
</style>