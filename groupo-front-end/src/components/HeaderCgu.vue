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
              :to="'/login'"
              aria-label="Lien vers login"
              title="Retour login"
            >
              <li id="link-condition" class="link-back">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="icon-arrow"
                >
                  <path
                    d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z"
                  />
                </svg>
              </li>
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
}
.fas {
  color: black;
  font-size: 25px;
}
#link-condition {
  display: inline-flex;
  margin-left: 100px;
}

#disconnect {
  cursor: pointer;
}
.icon-arrow {
  width: 20px;
}
@media screen and (max-width: 782px) {
  #link-condition {
    margin-left: auto;
  }
}
</style>