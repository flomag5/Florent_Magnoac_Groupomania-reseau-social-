<template>
  <!--Footer-->
  <div class="containerfooter">
    <footer class="page-footer font-small special-color-dark pt-2">
      <div class="container">
        <div id="foot" class="footer-copyright text-center py-2">
          <a id="link" href="#">Conditions Générales </a>
          <a id="link" href="#">Confidentialité </a>
          © 2022 Copyright:
          <a id="link" href="https://groupomania.com/">Groupomania</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
.containerfooter {
  bottom: 0px;
  width: 100%;
  height: 50px;
  left: 0;
  position: fixed;
}
footer {
  background-color: #d1515a;
  color: black;

  @media screen and (min-width: 320px) and (max-width: 830px) {
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
#link {
  color: black;
  padding: 0 20px;
}

#foot {
  color: #fff;
}
</style>