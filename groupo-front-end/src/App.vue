<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
  

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logo {
  width: 80px;
}
body {
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}
</style>
