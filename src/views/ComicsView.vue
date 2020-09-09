<template>
  <div>
    <search-form :rootView="'comics'" @searched="handleSearch"></search-form>
    <h1 v-if="loading">LOADING...</h1>
    <h1 v-else-if="!loading && comics.length < 1 && isSearchFormTriggered">No data found.</h1>
    <Comics v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Comics from '@/components/comics/Comics.vue'
import SearchForm from '@/components/SearchForm.vue'
import comics from '@/store/module/comics'

@Component({
  components: {
    Comics,
    SearchForm
  }
})
export default class ComicsView extends Vue {
  isSearchFormTriggered: boolean = false
  
  // initially don't show 'No data found.'
  handleSearch(value:boolean) {
    this.isSearchFormTriggered = value
  }
  
  get loading() {
    return comics.loading
  }

  get comics() {
    return comics.comics
  }

}
</script>
