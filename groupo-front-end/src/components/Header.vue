<template>
  <header class="navbar fixed-top navbar-expand-lg navbar-light">
    <div class="topbar">
      <a href="http://localhost:8080/home">
        <img
          class="topbar-logo"
          id="logo"
          src="../assets/icon-left-font-monochrome-black.png"
          alt="logo de Groupomania"
        />
      </a>
    </div>
    <nav class="topbar-nav">
      <a class="home-logo"
        ><router-link
          to="/login"
          class="navbar-brand"
          aria-current="page"
          href="#"
          ><i class="fas fa-home"></i></router-link
      ></a>
      <a
        ><router-link to="/profile" class="nav-link"
          ><img
            id="user_profile_pic"
            src="https://bootdey.com/img/Content/avatar/avatar6.png"
            alt="accés profil utilisateur" /></router-link
      ></a>
      <router-link to="/login" class="navbar-brand">
        <a href="#" alt="Se déconnecter"><i class="fas fa-sign-out-alt"></i></a>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
#user_profile_pic {
  width: 5%;
  align-items: center;
}
.fas {
  font-size: 30px;
}
.fas .fa-sign-out-alt {
  position: right;
}
.navbar {
  background: #d1515a;
  width: auto;
  margin: 0;

  color: white;
}

.topbar a {
  text-decoration: none;
}

a {
  color: inherit;
}

.topbar-logo {
  display: block;
  text-align: center;
  width: 20%;
  line-height: 54px;
  padding: 12px 0;
  border-radius: 50px;
}
.topbar-nav {
  text-align: center;
  padding-bottom: 16px;
}

.topbar-nav a {
  display: inline;
  margin-right: 0 12px;
  transition: color 0.3s;
}

.topbar-nav a:hover {
  text-decoration: none;
  color: #163466;
}

@media only screen and (min-width: 520px) {
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    padding: 0 20px;
  }
  .topbar-logo,
  .topbar-nav {
    padding: 0;
  }
  .topbar-nav a {
    margin: 0 30px;
  }
}
</style>