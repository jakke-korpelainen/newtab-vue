<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #000;
  color: #fff;
  height: calc(100vh - 140px);
  margin: 60px 40px 80px 40px;
}
h1,h2,h3,h4 {
  font-family: 'Montserrat', Arial, sans-serif;
}
h2 {
  font-size: 72px;
}
h3 {
  font-size: 16px;
}
</style>
