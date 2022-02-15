<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-dark fixed-top"
      role="navigation"
    >
      <div class="container">
        <img
          src="../assets/icon-left-font-monochrome-black-recut.png"
          alt="Logo Groupomania"
        />
        <!--Responsive menu-->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive-out"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive-out">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <i class="fas fa-handshake"></i>
            </li>
            <li class="nav-item active">
              <p><strong>Bienvenus sur votre réseau social</strong></p>
            </li>
            <router-link
              class="nav-link"
              :to="'/cgu'"
              aria-label="Lien vers les cgu"
              title="Conditions utilisations"
            >
              <li id="link-condition">
                <i class="fas fa-file-contract"></i>
                <p class="link">CGU</p>
              </li>
              <li></li>
            </router-link>
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
};
</script>

<style scoped>
.navbar {
  background-color: #d1515a;
}

header img {
  width: 200px;
}
li {
  margin-right: 10px;
}
p {
  color: black;
  margin-left: 10px;
}
.fas {
  color: black;
  font-size: 25px;
}
#link-condition {
  display: inline-flex;
  justify-self: flex-end;
  margin-left: 100px;
  margin-top: -28px;
}
.link {
  color: black;
}
#disconnect {
  cursor: pointer;
}
input[type="submit"] {
  font-family: "Font Awesome 5 Free";
  font-size: 1em;
  font-weight: 700;
}
@media screen and (max-width: 782px) {
  #link-condition {
    display: inline-flex;
    margin-left: 30px;
  }
}
</style>