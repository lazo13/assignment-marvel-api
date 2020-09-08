<template>
  <div>
    <search-form :rootView="'comics'"></search-form>
    <div></div>
    <Comics />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Comics from '@/components/comics/Comics.vue'
import SearchForm from '@/components/SearchForm.vue'

@Component({
  components: {
    Comics,
    SearchForm
  }
})
export default class ComicsView extends Vue {}
</script>
