<template>
	<div class="lastMovies">
		Последние фильмы
		<p>{{ lastMoviesComputed }}</p>
	</div>
</template>

<script setup>
import { useLastMovies } from "../stores/LastMovieStore";
import { notify } from "@kyvg/vue3-notification";
import { computed } from "vue";

const lastMovies = useLastMovies();
const lastMoviesComputed = computed(async () =>
{

	const movieId = 2;
	await lastMovies.getMovies(movieId);
	return lastMovies.movies;
});
</script>
