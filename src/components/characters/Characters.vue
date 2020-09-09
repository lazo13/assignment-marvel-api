<template>
  <div>
    <div class="cards">
      <div
        class="card"
        v-for="(character, i) in characters"
        :key="'character.id' + i"
        @click="goToDetails(character.id)"
      >
        <h3>{{ character.name }}</h3>
        <img :src="`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`" />
      </div>
    </div>
    <form v-if="hasMore" @submit.prevent="onLoadMore">
      <button class="btn-back">Load More</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import heroes from '@/store/module/heroes'

@Component
export default class Characters extends Vue {

  get searchTerm() {
    return heroes.searchTerm
  }

  get pageNumber() {
    return heroes.pageNumber
  }

  get characters() {
    return heroes.characters
  }

  get hasMore() {
    return heroes.hasMore
  }

  goToDetails(characterId: string) {
    this.$router.push({ name: 'character', params: { id: characterId } })
  }

  onLoadMore() {
    heroes.searchCharacters({ name: this.searchTerm, page: this.pageNumber + 1})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/main.css"></style>
