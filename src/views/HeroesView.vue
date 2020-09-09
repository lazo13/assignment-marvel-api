<template>
  <div>
    <search-form :rootView="'characters'" @searched="handleSearch"></search-form>
    <Characters />
    <h1 v-if="loading">LOADING...</h1>
    <h1 v-else-if="!loading && characters.length < 1 && isSearchFormTriggered">No data found.</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Characters from '@/components/characters/Characters.vue'
import SearchForm from '@/components/SearchForm.vue'
import heroes from '@/store/module/heroes'

@Component({
  components: {
    Characters,
    SearchForm
  }
})
export default class HeroesView extends Vue {
  isSearchFormTriggered: boolean = false

  // initially don't show 'No data found.'
  handleSearch(value:boolean) {
    this.isSearchFormTriggered = value
  }

  get loading() {
    return heroes.loading
  }

  get characters() {
    return heroes.characters
  }

}
</script>
