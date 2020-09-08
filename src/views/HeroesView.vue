<template>
  <div>
    <search-form :rootView="'characters'"></search-form>
    <div></div>
    <Characters />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Characters from '@/components/characters/Characters.vue'
import SearchForm from '@/components/SearchForm.vue'

@Component({
  components: {
    Characters,
    SearchForm
  }
})
export default class HeroesView extends Vue {}
</script>
