<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Heroes</router-link> |
      <router-link to="/comics">Comics</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {Vue, Component } from 'vue-property-decorator'
import SearchForm from '@/components/SearchForm.vue'

@Component({
  components: {
    SearchForm
  }
})
export default class App extends Vue{}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
