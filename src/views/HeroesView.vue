<template>
  <div>
    <search-form :rootView="'characters'"></search-form>
    <div v-if="loading">LOADING</div>
    <Characters v-else />
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
  get loading() {
    return heroes.loading
  }
}
</script>
