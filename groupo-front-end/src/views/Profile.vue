<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <p>{{ user.firstName }} {{ user.lastName }}</p>
    <img :src="user.avatar" alt="photo de l'utilisateur" />
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import UserDataService from "../services/UserDataService";

export default {
  name: "Profile",
  data() {
    return {
      user: [],
    };
  },
  mounted() {
    this.getInfoUser();
  },
  /*mounted: function () {
    if (this.$store.state.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserData");
  },*/

  computed: {
    ...mapState({
      user: "userData",
    }),
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    getInfoUser() {
      UserDataService.getOneUser("38")
        .then((user) => {
          this.user = user.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>