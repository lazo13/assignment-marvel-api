<template>
  <div>
    <div class="flex-container">
      <div class="flex">
        <h3>{{ comic.title }}</h3>

        <h5>Description:</h5>
        <p>{{ comic.description }}</p>

        <h5>Characters appearing:</h5>
        <ul v-for="characterName in charactersAppearingInComic">
          <li>{{ characterName }}</li>
        </ul>
      </div>

      <div class="flex2">
        <img :src="url" class="char-img" />
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

  createImageUrl(path: string | undefined, extension: string | undefined): string {
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
<style>
.flex-container {
  margin: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex {
  flex: 50%;
  text-align: right;
}

.flex2 {
  flex: 50%;
}

.char-img {
  width: 50%;
  border-radius: 10px;
}

.btn-back {
  width: 200px;
  padding: 15px;
  border-radius: 25px;
  background-color: transparent;
  font-size: 20px;
  margin-bottom: 100px;
  cursor: pointer;
}
</style>
