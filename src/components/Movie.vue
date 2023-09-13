<template>
	<div class="movie container">
		<img
			:src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
			:alt="movie.original_title"
			class="movie-img"
		/>
		<div>
			<div class="movie-name">
				{{ movie.original_title }} ({{ movie.release_date }})
			</div>
			<span class="movie-overview">{{ movie.overview }}</span>
			<div class="movie-buttons" v-if="!isSearch">
				<button
					v-if="!movie.isWatched"
					class="btn movie-buttons-watched"
					@click="wathedFunc(movie)">
					<span>Просмотрено</span>
				</button>
				<button
					v-color=" 'orange' "
					v-if="movie.isWatched && movieStore.activeTab === 2"
					class="btn movie-buttons-watched"
					@click="unwathedFunc(movie)">
					<span>Удалить из просмотрено</span>
				</button>
				<button
					class="isWathed"
					type="disable"
					v-if="movie.isWatched && movieStore.activeTab === 1"
				>Просмотренно</button>
				<button
					class="btn movie-buttons-delete"
					@click="deleteMovie(movie)">
					Удалить
				</button>
			</div>
			<div class="movie-buttons" v-else>
				<button
					class="btn btn_green"
					@click="searchStore.addToUserMovies(movie)">
					Добавить
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useMovieStore } from "../stores/MovieStore";
	import { useSearchStore } from "../stores/SearchStore";
	import { notify } from "@kyvg/vue3-notification";

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

	const props = defineProps({
		movie:
		{
			type: Object,
			required: true,
			default: () => {},
		},
		isSearch:
		{
			type: Boolean,
			required: false,
			default: false,
		},
	});
</script>

<style lang="scss" scoped>
	.movie
	{
		display: grid;
		grid-template-columns:1fr;
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

	.isWathed
	{
		border: none;
		width: auto;
		padding: 10px 20px;
		font-size: 14px;
		margin: 0 10px;
		border-radius: 10px;
		cursor: pointer;
		background:#37df5c;
		color:#000;
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