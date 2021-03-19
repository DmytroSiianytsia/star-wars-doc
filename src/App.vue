<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"

export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
}
</script>

<style lang="scss">
@font-face {
  font-family: "HelveticaRegular";
  font-style: normal;
  font-weight: 400;
  src: local("HelveticaRegular"),
    url("~@/assets/fonts/HelveticaRegular/HelveticaRegular.woff") format("woff"),
    url("~@/assets/fonts/HelveticaRegular/HelveticaRegular.ttf") format("ttf"),
    url("~@/assets/fonts/HelveticaRegular/HelveticaRegular.eot") format("eot");
}

@font-face {
  font-family: "HelveticaThin";
  font-style: normal;
  font-weight: 300;
  src: local("HelveticaThin"),
    url("~@/assets/fonts/HelveticaThin/HelveticaThin.woff") format("woff"),
    url("~@/assets/fonts/HelveticaThin/HelveticaThin.ttf") format("ttf"),
    url("~@/assets/fonts/HelveticaThin/HelveticaThin.eot") format("eot");
}

body {
  margin: 0;
}
#app {
  font-family: "HelveticaRegular", sans-serif;
  font-size: 14px;
}

.wrapper {
  max-width: 1232px;
  margin: 0 auto;
  padding: 0 10px;
}
</style>
