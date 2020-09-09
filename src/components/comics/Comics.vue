<template>
  <div>
    <div class="cards">
      <div
        class="card"
        v-for="(comic, i) in comics"
        :key="'comic.id' + i"
        @click="goToDetails(comic.id)"
      >
        <h3>{{ comic.title }}</h3>
        <img :src="`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`" />
      </div>
    </div>
    <form v-if="hasMore" @submit.prevent="onLoadMore">
      <button class="btn-back">Load More</button>
    </form>
  </div>
</template>

<script lang="ts">
import comics from '@/store/module/comics'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Comics extends Vue {
  // pageNumber: number = 1

  get searchTerm() {
    return comics.searchTerm
  }

  get pageNumber() {
    return comics.pageNumber
  }

  get comics() {
    return comics.comics
  }

  get hasMore() {
    return comics.hasMore
  }

  goToDetails(comicId: string) {
    this.$router.push({ name: 'comic', params: { id: comicId } })
  }

  onLoadMore() {
    comics.searchComics({ title: this.searchTerm, page: this.pageNumber+1 })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/main.css"></style>
