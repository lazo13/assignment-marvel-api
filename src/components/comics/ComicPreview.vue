<template>
	<div>
		<div class="flex-container">
			<div class="flex">
				<h3>{{ comic.title }}</h3>

				<h5>Description:</h5>
				<p>{{ comic.description }}</p>

				<h5>Characters appearing:</h5>
				<ul v-for="characterName in charactersAppearing">
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
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class ComicPreview extends Vue {
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
