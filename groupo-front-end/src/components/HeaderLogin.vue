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
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <i class="fas fa-handshake"></i>
            </li>
            <li class="nav-item active">
              <p><strong>Bienvenus sur votre réseau social</strong></p>
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
#disconnect {
  cursor: pointer;
}
input[type="submit"] {
  font-family: "Font Awesome 5 Free";
  font-size: 1em;
  font-weight: 700;
}
</style>