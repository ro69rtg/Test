<template>
	<form class="container search-form" @submit.prevent="searchStore.getMovies(searchMovie)">
		<input
			type="text"
			class="search-input"
			placeholder="Введите название"
			v-model="searchMovie"
		/>
		<button
			type="submit"
			class="search-btn"
		>
			Поиск
		</button>
	</form>
	<Loader v-if="searchStore.loader" />
	<div v-else>
		<Movie
			v-for="movie of searchStore.movies"
			:key="movie.id"
			:movie="movie"
			:is-search="true" />
	</div>
</template>

<script setup>
import Loader from "../components/Loader.vue";
import Movie from "../components/Movie.vue";
import { ref } from "vue";
import { useSearchStore } from "../stores/SearchStore";

const searchStore = useSearchStore();
const searchMovie = ref("");
</script>

<style lang="scss" scoped>
.search-form
{
	display:flex;
}
.search-btn
{
	height:40px;
	width:50px;
	border: 1px solid #e7e7e7;
	border-radius: 10px;
	cursor: pointer;
}
.search-input
{
	border: 1px solid #e7e7e7;
	width: 100%;
	height: 40px;
	padding: 0 10px;
	margin-bottom: 20px;
	border-radius: 10px;
	margin-right: 10px;
}
</style>
