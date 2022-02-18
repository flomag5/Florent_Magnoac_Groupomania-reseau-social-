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
                <!-- <span class="sr-only">(current)</span>-->
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
              <div class="social-avatar">
                <router-link
                  class="nav-link"
                  :to="'/profile'"
                  aria-label="Lien vers la page du profil utilisateur"
                  title="Mon profil"
                >
                  <img
                    id="my-avatar"
                    alt="Avatar utilisateur"
                    :src="user.avatar"
                    aria-label="avatar utilisateur"
                  />
                  <!--<i class="fas fa-user"></i
              >--></router-link
                >
              </div>
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
        logId: "",
        isAdmin: "",
      },
    };
  },
  /** Récupération Data du User en cours de session */
  mounted() {
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
    this.UserMe();
  },
  methods: {
    /** User en cours de session */
    UserMe() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.logId = user.userId;
      this.isAdmin = user.isAdmin;
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

.nav-subtext {
  font-size: 20px;
}
.social-feed-separated .social-feed-box {
  margin-left: 62px;
}
.social-feed-separated .social-avatar {
  float: left;
  padding: 0;
}
.social-feed-separated .social-avatar img {
  width: 52px;
  height: 52px;
  border: 1px solid #e7eaec;
}
.social-feed-separated .social-feed-box .social-avatar {
  float: none;
}
.social-feed-box {
  width: 500px; /* taille des box */
  padding: 15px;
  border: 1px solid #e7eaec;
  background: #fff;
  margin-bottom: 15px;
}
.article .social-feed-box {
  margin-bottom: 0;
  border-bottom: none;
}
.article .social-feed-box:last-child {
  margin-bottom: 0;
  border-bottom: 1px solid #e7eaec;
}
.article .social-feed-box p {
  font-size: 13px;
  line-height: 18px;
}
.social-action {
  margin: 15px;
}
.social-avatar {
  padding: 0;
}
.social-comment {
  border-bottom: 1px solid lightgray;
}
.social-comment .social-comment {
  margin-left: 45px;
}
.social-avatar img {
  height: 27px;
  width: 27px;
  margin-right: 10px;
}
.social-avatar .media-body a {
  font-size: 14px;
  display: block;
}
.social-body {
  padding: 15px;
}
.social-body img {
  margin-bottom: 10px;
}
.social-footer {
  border-top: 1px solid #e7eaec;
  padding: 10px 15px;
  background: #f9f9f9;
}
.social-footer .social-comment img {
  width: 32px;
  margin-right: 10px;
}
.social-comment:first-child {
  margin-top: 0;
}
.social-comment {
  margin-top: 15px;
}
.social-comment textarea {
  font-size: 12px;
}

.form-control,
.single-line {
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #e5e6e7;
  border-radius: 1px;
  color: #4d5b64;
  display: block;
  padding: 6px 12px;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  width: 100%;
  font-size: 14px;
}

.ibox {
  clear: both;
  margin-bottom: 25px;
  margin-top: 0;
  padding: 0;
}
.ibox.collapsed .ibox-content {
  display: none;
}
.ibox.collapsed .fa.fa-chevron-up:before {
  content: "\f078";
}
.ibox.collapsed .fa.fa-chevron-down:before {
  content: "\f077";
}
.ibox:after,
.ibox:before {
  display: table;
}
.ibox-title {
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background-color: #ffffff;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 3px 0 0;
  color: inherit;
  margin-bottom: 0;
  padding: 14px 15px 7px;
  min-height: 48px;
}
.ibox-content {
  background-color: #ffffff;
  color: inherit;
  padding: 15px 20px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
}
.ibox-footer {
  color: inherit;
  border-top: 1px solid #e7eaec;
  font-size: 90%;
  background: #ffffff;
  padding: 10px 15px;
}

@media screen and (max-width: 512px) {
  .social-feed-box {
    max-width: 340px;
    margin: auto;
    padding: 15px;
    border: 1px solid #e7eaec;
    background: #fff;
    margin-bottom: 15px;
  }
}
</style>