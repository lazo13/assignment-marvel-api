<template>
  <div class="search-character__form">
    <form @submit.prevent="handleSearch()">
      <div class="ui action input">
        <input
          v-model="name"
          placeholder="Character Name"
          type="text"
          required
        />

        <button class="ui icon pink button">
          <i class="search icon"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import comics from '@/store/module/comics'
import heroes from '@/store/module/heroes'
import { Component, Prop, Vue } from 'vue-property-decorator'
type rootView = 'characters' | 'comics'

@Component
export default class SearchForm extends Vue {
  @Prop() readonly rootView!: rootView
  name: string = ''

  handleSearch() {
    if (this.rootView === 'characters') {
      heroes.searchCharacters(this.name)
    }
    else {
      comics.searchComics(this.name)
    }
    this.name = ''
  }
}
</script>

<style></style>
