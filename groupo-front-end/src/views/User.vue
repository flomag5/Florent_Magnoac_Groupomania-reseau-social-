<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <div v-if="userProfile" id="userProfile">
      <div class="profileContainer">
        <img :src="user.avatar" alt="photo utilisateur" class="profile" />{{
          user.avatar
        }}
        />
      </div>
      <p>
        Prénom: <span>{{ user.firstName }}</span>
      </p>
      <p>
        Nom: <span>{{ user.lastName }}</span>
      </p>
    </div>
    <button
      v-if="user.id === logId || isAdmin === true"
      @click.prevent="deleteUser"
      class="delete"
      aria-label="supprimer cet utilisateur"
    >
      <i class="far fa-trash-alt delete"></i>
    </button>
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
      logId: "",
      isAdmin: "",
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
  methods: {
    UserMe() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.logId = user.userId;
      this.isAdmin = user.isAdmin;
      console.log(this.logId, "LLLLLLLLLLLLLLLLLLLLLLLLog");
      console.log(this.isAdmin, "Admmmmmmmmmmmmin");
    },

    deleteUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      let userId = this.$route.params.id;
      if (confirm("êtes vous sûr de vouloir supprimer ce compte ?")) {
        fetch(`http://localhost:3000/api/user/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then(this.$router.push({ path: "/users" }))
          .catch((error) => {
            error;
          });
      }
    },
  },
  mounted() {
    this.UserMe();
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
  background: #d1515a;
  margin: 1rem;
  border-radius: 25px;
  padding: 2px auto;
  font-size: 0.94rem;
  width: 12%;
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
