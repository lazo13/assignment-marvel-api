<template>
  <div>
    <div class="flex-container">
      <div class="flex2">
        <img :src="url" class="char-img" />
      </div>

      <div class="flex">
        <h1>{{ character.name }}</h1>

        <h3>Description:</h3>
        <p>
          {{ character.description ? character.description : 'No description added.' }}
        </p>

        <h3>Appearing in comics:</h3>
        <ul class="no-bullets" v-for="comicName in comicsWhereCharacterAppears">
          <li>{{ comicName }}</li>
        </ul>
      </div>
    </div>
    <router-link to="/">
      <button type="button" class="btn-back">Back</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import heroes from '@/store/module/heroes'
import { ComicList } from '@/store/models'

@Component
export default class CharacterPreview extends Vue {
  comicsWhereCharacterAppears: string[] = []
  url: string = ''

  mounted() {
    heroes.loadCharacter(+this.$route.params.id).then(loadedCharacter => {
      if (!loadedCharacter) return

      const thumbnail = loadedCharacter.thumbnail
      if (!thumbnail) return
      const { path, extension } = thumbnail

      this.url = this.createImageUrl(path, extension)
      this.getComicsWhereCharacterAppears(loadedCharacter.comics)
    })
  }

  get character() {
    return heroes.character
  }

  createImageUrl(path: string | undefined, extension: string | undefined): string {
    if (!path) return ''

    return `${path}/standard_xlarge.${extension}`
  }

  getComicsWhereCharacterAppears(comics: ComicList | undefined) {
    if (!comics || !comics.items) return

    this.comicsWhereCharacterAppears = []

    comics.items.forEach(item => {
      if (!item) return

      this.comicsWhereCharacterAppears.push(item.name!)
    })
  }
}
</script>
<style scoped src="@/assets/main.css">
h1 {
  font-size: 2.3rem
}
</style>
