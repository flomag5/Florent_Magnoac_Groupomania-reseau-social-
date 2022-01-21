<template>
  <header class="navbar fixed-top navbar-expand-lg navbar-light">
    <div class="topbar">
      <a href="http://localhost:8080/home">
        <img
          class="topbar-logo"
          id="logo"
          src="../assets/icon-left-font-monochrome-black-recut.png"
          alt="logo de Groupomania"
        />
      </a>
    </div>
    <nav class="topbar-nav">
      <a class="navbar-brand"
        ><router-link
          to="/posts"
          class="home-logo-md pull-left"
          aria-current="page"
          href="#"
          ><i class="fas fa-home"></i></router-link
      ></a>
      <a
        ><router-link to="/profile" class="navbar-brand"
          ><img
            id="user_profile_pic"
            src="https://bootdey.com/img/Content/avatar/avatar6.png"
            alt="accés profil utilisateur"
          />
        </router-link>
      </a>
      <router-link to="/login" class="navbar-brand">
        <a href="#" alt="Se déconnecter" class="profile-photo-md pull-right"
          ><i class="fas fa-sign-out-alt"></i
        ></a>
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
.navbar {
  background: #d1515a;
  width: auto;
  margin: 0;
  color: white;
  max-height: 100px;
}

.topbar a {
  text-decoration: none;
}

a {
  color: inherit;
}

.topbar-logo {
  display: inline;
  text-align: center;
  width: 35%;
  padding: 12px 0;
}
.topbar-nav {
  text-align: center;
  align-items: center;
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

#user_profile_pic {
  width: 7%;
}
.fas {
  font-size: 25px;
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
  .topbar-logo {
    width: 25%;
    padding: 12px 0;
  }

  .fas {
    font-size: 28px;
    margin-top: 8px;
  }

  #user_profile_pic {
    width: 5%;
  }
}
</style>