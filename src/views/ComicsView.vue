<template>
  <div>
    <search-form :rootView="'comics'"></search-form>
    <div v-if="loading" >LOADING</div>
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
  get loading() {
    return comics.loading
  }
}
</script>
