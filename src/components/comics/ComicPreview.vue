<template>
  <div>
    <div class="flex-container">
      <div class="flex2">
        <img :src="url" class="char-img" />
      </div>

      <div class="flex">
        <h1>{{ comic.title }}</h1>

        <h3>Description:</h3>
        <p>
          {{ comic.description ? comic.description : 'No description added.' }}
        </p>

        <h3>Characters appearing:</h3>
        <ul class="no-bullets"v-for="characterName in charactersAppearingInComic">
          <li>{{ characterName }}</li>
        </ul>
      </div>
    </div>
    <router-link to="/comics">
      <button type="button" class="btn-back">Back</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { CharacterList } from '@/store/models'
import comics from '@/store/module/comics'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ComicPreview extends Vue {
  charactersAppearingInComic: string[] = []
  url: string = ''

  mounted() {
    comics.loadComic(+this.$route.params.id).then(loadedComic => {
      if (!loadedComic) return

      const thumbnail = loadedComic.thumbnail
      if (!thumbnail) return
      const { path, extension } = thumbnail

      this.url = this.createImageUrl(path, extension)
      this.getCharactersAppearingInComic(loadedComic.characters)
    })
  }

  get comic() {
    return comics.comic
  }

  createImageUrl(path: string | undefined,extension: string | undefined): string {
    if (!path) return ''

    return `${path}/standard_xlarge.${extension}`
  }

  getCharactersAppearingInComic(characters: CharacterList | undefined) {
    if (!characters || !characters.items) return

    this.charactersAppearingInComic = []

    characters.items.forEach(item => {
      if (!item) return

      this.charactersAppearingInComic.push(item.name!)
    })
  }
}
</script>
<style scoped src="@/assets/main.css">
h1 {
  font-size: 2.3rem
}
</style>
