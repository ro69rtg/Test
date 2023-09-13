<template>
<div
	v-for="movie of lastMovies.movies"
	:key="movie.id"
	:movie="movie"
	class="movie container"
	>
		<img
			:src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
			:alt="movie.original_title"
			class="movie-img"
		/>
		<p>{{ movie.title }}</p>
		<p>{{ movie.release_date }}</p>


			<div class="movie-buttons" >
				<button
					class="btn btn_green"
					@click="searchStore.addToUserMovies(movie)">
					Добавить
				</button>
			</div>
</div>
</template>

<script setup>
import { useMovieStore } from "../stores/MovieStore";
import { useLastMovieStore } from "../stores/LastMovieStore";
import { useSearchStore } from "../stores/SearchStore";
import { notify } from "@kyvg/vue3-notification";
import { computed, onBeforeMount } from "vue";

const movieStore = useMovieStore();
const searchStore = useSearchStore();

const deleteMovie = (movie) =>
{
	movieStore.deleteMovie(movie.id);
	notify({
		title:'Фильм удален',
		text: movie.original_title,
		type: 'error'
	})
}

const wathedFunc = (movie) =>
{
	movieStore.toggleWatched(movie.id);
	notify({
		title: "Добавлен в просмотренные",
		text: movie.original_title,
		type: 'success'
	});
};

const unwathedFunc = (movie) =>
{
	movieStore.toggleWatched(movie.id);
	notify({
		title: "Удален из просмотренных",
		text: movie.original_title,
		type: 'success'
	});
};

const lastMovies = useLastMovieStore();

onBeforeMount(() => {
	lastMovies.getMovies();
});

const lastMoviesComputed = computed(() => {
	return lastMovies.movies;
});
</script>

<style lang="scss" scoped>
.movie
{
	display: grid;
	grid-template-columns: 1fr;
	column-gap: 30px;
	margin-bottom: 20px;
	border: 2px solid #efefef;
	padding: 10px;
	border-radius: 10px;
	@media(min-width: 992px)
	{
		grid-template-columns: 200px 1fr;
	}
}

.movie-accept { margin-right: 10px; }

.movie-img
{
	width: 200px;
	height: 200px;
	object-fit: cover;
	border-radius: 50%;
}

.movie-name
{
	display: flex;
	align-items: center;
	font-size: 20px;
	margin-bottom: 20px;
}

.movie-overview
{
	display: block;
	margin-bottom: 20px;
}

.movie-buttons
{
	display: flex;
	align-items: center;
	justify-content: center;
}

.movie-buttons-watched
{
	color: #fff;
	background: #1eb4c3;
}

.movie-buttons-watched__icon
{
	width: 15px;
	margin-left: 10px;
}

.movie-buttons-delete
{
	color: #fff;
	background: #ff2a2a;
}
</style>
