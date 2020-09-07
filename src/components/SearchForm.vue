<template>
  <div class="search-character__form">
    <form @submit.prevent="handleSearch()">

      <div class="ui action input">
        <input v-model="name"
          placeholder="Character Name"
          type="text"
          required />

          <button class="ui icon pink button">
            <i class="search icon"></i>
          </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SearchForm extends Vue {
  name: string = ''

}
</script>

<style>

</style>