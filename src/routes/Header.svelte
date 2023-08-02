<script lang="ts">
	import { base } from "$app/paths";
</script>

<header>
	<h1 class="title"><a href="{base}/">Tiny Forest</a></h1>
	<nav class="link-list">
		<a class="link" href="{base}/">Home</a>
		<a class="link" href="{base}/about">About</a>
	</nav>
</header>

<style>
	header {
		display: flex;
	}

	h1.title {
		margin: 5px;
		color: #1e90ff;
		text-transform: uppercase;
		font-size: 2.4em;
		font-weight: 100;
	}

	h1.title > a {
		text-decoration: none;
	}

	.link-list {
		position: absolute;
		top: 30px;
		right: 30px;
		float: right;
	}

	.link-list > .link {
		font-size: 1.2em;
		text-decoration: none;
		margin: 10px;
	}
</style>
