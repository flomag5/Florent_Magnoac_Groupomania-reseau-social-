<template>
  <nav
    id="navbar"
    class="navbar fixed-top navbar-expand-lg navbar-light"
    style="background-color: #d1515a"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="http://localhost:8080/home">
        <img id="logo" src="../assets/icon.png" alt="logo de Groupomania" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/login"
              class="navbar-brand"
              aria-current="page"
              href="#"
              ><img id="logo_home" src="../assets/home2.png" alt="Icone maison"
            /></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link"
              ><img
                id="user_profile_pic"
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt="user"
                class="profile-photo-md pull-left"
            /></router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Rechercher sur Groupo"
            aria-label="Search"
          />
          <button
            id="search"
            class="btn btn-outline-success"
            color="blue"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
#logo {
  width: 45px;
}
#logo_home {
  width: 35px;
}
#logo_home {
  align-items: center;
  width: 20%;
  padding-top: 3px;
}
#user_profile_pic {
  width: 14%;
  align-items: center;
}
</style>