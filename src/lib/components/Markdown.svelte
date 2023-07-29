<script lang="ts">
	import {set_options, toHTML} from "./markdown";
	set_options();

	export let content: string;
</script>

<div>
	<span>{@html toHTML(content)}</span>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
	@import url("https://unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/atom-one-dark.min.css");

	:global(pre) {
		padding: 30px;
		margin: 10px;
		overflow-x: scroll;
		background-color: var(--code-background-color, "#202020");
	}

	:global(pre > code) {
		font-size: var(--code-font-size, 15px);
		font-family: "Roboto Mono", monospace;
	}
</style>
