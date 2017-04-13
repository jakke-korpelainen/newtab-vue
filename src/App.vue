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
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  height: 100%;
}
small {
  font-size: 60%;
  margin-left: .2em;
}
h1,h2,h3,h4 {
  font-family: 'Montserrat', Arial, sans-serif;
}
h2 {
  font-family: 'Inconsalata', monospace;
  font-size: 72px;
}
h3 {
  font-size: 16px;
  letter-spacing: 3px;
}
</style>
