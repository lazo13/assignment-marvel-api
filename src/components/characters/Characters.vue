<template>
  <div class="cards">
    <div
      class="card"
      v-for="character in characters"
      :key="character.id"
      @click="goToDetails(character.id)"
    >
      <h3>{{ character.name }}</h3>
      <img
        :src="
          `${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import heroes from '@/store/module/heroes'

@Component
export default class Characters extends Vue {
  created() {
    heroes.getCharacters()
  }

  get characters() {
    return heroes.characters
  }

  goToDetails(characterId: string) {
    this.$router.push({ name: 'character', params: { id: characterId } })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/main.css"></style>
