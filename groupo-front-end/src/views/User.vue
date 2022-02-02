<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <div v-if="userProfile" id="userProfile">
      <div class="profileContainer">
        <img :src="user.avatar" alt="photo utilisateur" class="profile" />{{
          user.avatar
        }}
        <img />
      </div>
      <p>
        Prénom: <span>{{ user.firstName }}</span>
      </p>
      <p>
        Nom: <span>{{ user.lastName }}</span>
      </p>
    </div>
  </div>
</template>


<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user",
  components: {},
  data() {
    return {
      userProfile: true,
      user: {},
    };
  },
  created() {
    let id = this.$route.params.id;
    UserDataService.getOneUser(id)
      .then((response) => {
        this.user = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.card {
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
}
.profileContainer {
  margin: auto;
  width: 78px;
  height: 78px;
  min-width: 64px;
  min-height: 64px;
  border-radius: 50%;
  overflow: hidden;
}
.log_button {
  background-color: #d1515a;
  border-radius: 25px;
  width: 30%;
  padding: 4px 0;
}
button {
  background: #ffd7d7;
  margin: 1rem;

  border-radius: 25px;
  padding: 3px auto;
  font-size: 0.94rem;
}

/*#showProfile {
  max-width: 60%;
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  margin: auto;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}*/
.modify {
  text-align: right;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.info {
  margin: auto;
  line-height: 2rem;
}
span {
  font-style: italic;
  font-weight: 500;
}
@media screen and (max-width: 992px) {
  #showProfile {
    max-width: 100%;
  }
}
</style>
