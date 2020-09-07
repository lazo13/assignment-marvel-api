<template>
	<div class="cards">
		<div class="card" v-for="character in allCharacters" :key="character.id" @click="goToDetails(character.id)">
					<h3>{{ character.name }}</h3>
					<img :src="`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`"/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Characters extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/main.css">
</style>
