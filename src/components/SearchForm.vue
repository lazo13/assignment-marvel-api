<template>
  <div class="search-character__form">
    <form @submit.prevent="handleSearch()">
      <div class="ui action input">
        <input
          v-model="name"
          :placeholder="rootView === 'characters' ? 'Character Name' : 'Comic Name'"
          type="text"
          required
        />

        <button class="ui icon blue button">
          <i class="search icon"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import comics from '@/store/module/comics'
import heroes from '@/store/module/heroes'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
type rootView = 'characters' | 'comics'

@Component
export default class SearchForm extends Vue {
  @Prop() readonly rootView!: rootView

  @Emit('searched')
  searched(value: boolean) {}

  name: string = this.rootView === 'characters' ? heroes.searchTerm : comics.searchTerm;
  page: number = this.rootView === 'characters' ? heroes.pageNumber : comics.pageNumber;

  handleSearch() {
    this.searched(true)

    if (this.rootView === 'characters') {
      heroes.searchCharacters(this.name)
    } else {
      comics.clearComics()
      comics.searchComics({ title: this.name, page: this.page })
    }
  }
}
</script>

<style>
.ui.input {
  font-size: 1.5em;
}
</style>
