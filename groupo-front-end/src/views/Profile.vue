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
      user: {},
    };
  },
  /*mounted() {
    this.getInfoUser();
  },*/
  mounted() {
    this.getInfoUser(this.$route.params.id, (err, user) => {
      if (err) {
        this.error = err.toString();
      } else {
        this.user = user.data;
      }
    });
  },

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
      UserDataService.getOneUser()
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