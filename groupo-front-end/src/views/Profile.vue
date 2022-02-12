<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <div v-if="userProfile" id="userProfile">
      <div class="modify">
        <button @click.prevent="toggleProfile" aria-label="modifier le profil">
          <i class="fas fa-cog"></i> Modifier profil
        </button>
      </div>
      <div class="profileContainer">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          alt="photo utilisateur"
          class="profile"
          aria-label="mon avatar"
        />{{ user.avatar }}
        <img />
      </div>
      <button @click.prevent="toggleProfile" aria-label="changer de photo">
        <i class="fas fa-camera"></i> Changer la photo de profil
      </button>
      <p>
        Prénom: <span>{{ user.firstName }}</span>
      </p>
      <p>
        Nom: <span>{{ user.lastName }}</span>
      </p>
      <div class="form-row">
        <button @click="logout()" class="log_button" aria-label="déconnexion">
          Déconnexion
        </button>
        <button
          @click="logout()"
          id="log_button_small"
          title="logout"
          aria-label="logout"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
    <UpdateUser
      v-if="updateUser"
      :user="user"
      @toggle-profile="toggleProfile"
    />
  </div>
</template>


<script>
//import { mapState } from "vuex";
//import UserDataService from "../services/UserDataService";
import UpdateUser from "../components/updateUser";

export default {
  name: "profile",
  components: {
    UpdateUser,
  },
  data() {
    return {
      userProfile: true,
      updateUser: false,
      user: {},
    };
  },

  // Récupération du profil de l'utilisateur avant la création de la page
  beforeCreate() {
    let user = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:3000/api/user/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.user = data;
      })
      .catch((error) => {
        error;
      });
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },

    toggleProfile() {
      this.userProfile = !this.userProfile;
      this.updateUser = !this.UpdateUser;
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
  margin: auto;
  margin-top: 2rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
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
#log_button_small {
  display: none;
}

@media screen and (max-width: 512px) {
  .card {
    width: 100%;
  }
  .log_button {
    display: none;
  }
  #log_button_small {
    display: flex;
    background-color: #d1515a;
    padding: 4px 20px;
  }
}
</style>
