<template>
  <div>
    <Comics />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Comics from "@/components/comics/Comics.vue"

@Component({
	components: {
		Comics
	},
})
export default class ComicsView extends Vue {}
</script>
