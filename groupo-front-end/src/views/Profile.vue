<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <div v-if="userProfile" id="userProfile">
      <div class="modify">
        <button @click.prevent="toggleProfile">
          <i class="fas fa-cog"></i> Modifier profil
        </button>
      </div>
      <div class="profileContainer">
        <img :src="user.avatar" alt="photo utilisateur" class="profile" />{{
          user.avartar
        }}
        <img />
      </div>
      <button @click.prevent="toggleProfile">
        <i class="fas fa-camera"></i> Changer la photo de profil
      </button>
      <p>
        Prénom: <span>{{ user.firstName }}</span>
      </p>
      <p>
        Nom: <span>{{ user.lastName }}</span>
      </p>
      <div class="form-row">
        <button @click="logout()" class="log_button">Déconnexion</button>
      </div>
    </div>
  </div>
</template>


<script>
//import { mapState } from "vuex";
//import UserDataService from "../services/UserDataService";
//import UpdateUser from "../components/UpdateUser";

export default {
  name: "profile",
  components: {
    //UpdateUser,
  },
  data() {
    return {
      userProfile: true,

      user: {},
    };
  },
  beforeCreate() {
    fetch(`http://localhost:3000/api/user/${localStorage.getItem("user.id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.avatar = `http://localhost:3000/images/${data.avatar}`;
        this.user = data;
      })
      .catch((error) => {
        error;
      });
  },
  /*
  mounted() {
    this.getInfoUser();
  },*/
  /*
  computed: {
    ...mapState({
      user: "userData",
    }),
  },*/
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    /* getInfoUser() {
      UserDataService.getOneUser()
        .then((user) => {
          this.user = user.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },*/
    toggleProfile() {
      this.userProfile = !this.userProfile;
      this.UpdateUser = !this.UpdateUser;
    },
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
