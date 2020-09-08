<template>
  <div class="cards">
    <div
      class="card"
      v-for="comic in comics"
      :key="comic.id"
      @click="goToDetails(comic.id)"
    >
      <h3>{{ comic.title }}</h3>
      <img
        :src="
          `${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import comics from '@/store/module/comics'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Comics extends Vue {
  created() {
    comics.getComics()
  }

  get comics() {
    return comics.comics
  }

  goToDetails(comicId: string) {
    this.$router.push({ name: 'comic', params: { id: comicId } })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/main.css"></style>
