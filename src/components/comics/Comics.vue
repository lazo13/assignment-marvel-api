<template>
  <div>
    <div class="cards">
      <div
        class="card"
        v-for="comic in comics"
        :key="comic.id"
        @click="goToDetails(comic.id)"
      >
        <h3>{{ comic.title }}</h3>
        <img :src="`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`"/>
      </div>
    </div>
    <form v-if="hasMore" @submit.prevent="onLoadMore">
      <button>Load More</button>
    </form>
  </div>
</template>

<script lang="ts">
import comics from '@/store/module/comics'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Comics extends Vue {
  created() {
    // comics.getComics()
  }

  get pageNumber() {
    return comics.pageNumber
  }

  get searchTerm() {
    return comics.searchTerm
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
    comics.fetchMoreComics(this.searchTerm, this.pageNumber+1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/main.css"></style>
