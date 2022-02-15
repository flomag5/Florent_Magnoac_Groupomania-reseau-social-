<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-dark fixed-top"
      role="navigation"
    >
      <div class="container">
        <router-link
          :to="'/posts'"
          aria-label="Lien vers le fil d'actualité"
          class="navbar-brand"
        >
          <img
            src="../assets/icon-left-font-monochrome-black-recut.png"
            alt="Logo Groupomania"
        /></router-link>

        <!--Responsive menu-->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link
                class="nav-link"
                :to="'/posts'"
                aria-label="Lien vers les publications"
                title="Accueil"
              >
                <i class="fas fa-home"></i>
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="'/createpost'"
                aria-label="Lien vers la page de création de message"
                title="Publier"
              >
                <i class="fas fa-pen-square"></i
              ></router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="'/users'"
                aria-label="Lien vers la liste des utilisateurs"
                ><i
                  class="fas fa-users"
                  title="utilisateurs"
                  alt="tous les utilisateurs"
                ></i>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="'/profile'"
                aria-label="Lien vers la page du profil utilisateur"
                title="Mon profil"
              >
                <i class="fas fa-user"></i
              ></router-link>
            </li>

            <li class="nav-item">
              <div
                id="disconnect"
                class="nav-link"
                title="Se déconnecter"
                @click="disconnect"
              >
                <i class="fas fa-sign-out-alt"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>


<script>
export default {
  name: "Header",
  data() {
    return {
      user: {
        userId: "",
        id: this.$route.params.id,
      },
    };
  },

  methods: {
    /** Affichage de l'id de l'utilisateur dans l'url du profil utilisateur */
    userProfile() {
      const storage = JSON.parse(localStorage.getItem("user"));
      const headers = new Headers();
      headers.append("Authorization", storage.token);
      const myInit = {
        method: "GET",
        headers: headers,
      };
      fetch("http://localhost:3000/api/user/" + storage.userId, myInit)
        .then((response) => {
          response.json().then((user) => {
            this.user = user;
          });
        })
        .catch((error) => {
          console.log(
            error + "L'URL vers le profil utilisateur ne s'affiche pas"
          );
        });
    },
    /** Déconnection de l'utilisateur */
    disconnect() {
      localStorage.clear();
      setTimeout(() => {
        this.$router.push({ path: "/login" });
        console.log("L'utilisateur s'est déconnecté");
      }, 600);
    },
  },
  mounted() {
    this.userProfile();
  },
};
</script>

<style scoped>
.navbar {
  background-color: #d1515a;
}
header img {
  width: 200px;
}
.fas {
  color: black;
  font-size: 25px;
  margin-right: 10px;
}
#disconnect {
  cursor: pointer;
}
input[type="submit"] {
  font-family: "Font Awesome 5 Free";
  font-size: 1em;
  font-weight: 700;
}
.nav-subtext {
  font-size: 20px;
}
</style>