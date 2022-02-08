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
            <li id="link-condition">
              <i class="fas fa-file-contract"></i>
            </li>
            <li><a class="link" href="#">Conditions Générales</a></li>
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
  margin-left: 40px;
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
</style>