<template>
  <div>
    <div class="flex-container">
      <div class="flex">
        <h3>{{ character.name }}</h3>

        <h5>Description:</h5>
        <p>{{ character.description }}</p>

        <h5>Appearing in comics:</h5>
        <ul v-for="comicName in comicsWhereCharacterAppears">
          <li>{{ comicName }}</li>
        </ul>
      </div>

      <div class="flex2">
        <img :src="url" class="char-img" />
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
		heroes.loadCharacter(+this.$route.params.id).then((loadedCharacter) => {
			if (!loadedCharacter) return
			console.log("CharacterPreview -> mounted -> loadedCharacter", loadedCharacter)

			const thumbnail = loadedCharacter.thumbnail
			if (!thumbnail) return
			const { path, extension } = thumbnail
      console.log({path, extension})

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

		comics.items.forEach((item) => {
			if (!item) return

			this.comicsWhereCharacterAppears.push(item.name!)
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
