<template>
	<div v-if="isTabsShow" class="tabs tabs--mobile">
		<button class="tabs__close" @click="tabsClose">X</button>
		<button
			:class="['btn', { btn_green: movieStore.activeTab === 1 }]"
			@click="setTab(1) , tabsClose()"
		>
			Закладки
		</button>
		<button
			:class="['btn', { btn_green: movieStore.activeTab === 2 }]"
			@click="setTab(2) ,tabsClose()"
		>
			Просмотренные фильмы
		</button>
		<button
			:class="['btn', { btn_green: movieStore.activeTab === 3 }]"
			@click="setTab(3) ,tabsClose()"
		>
			Поиск
		</button>
		<button
			:class="['btn', { btn_green: movieStore.activeTab === 4 }]"
			@click="setTab(4) ,tabsClose()"
		>
			Последние фильмы
		</button>
		<button
			:class="['btn', { btn_green: movieStore.activeTab === 5 }]"
			@click="setTab(5) ,tabsClose()"
		>
			Галерея
		</button>
		<button
			class="btn"
			@click="clear()"
		>
			Очистить историю
		</button>
	</div>
	<header class="header">
		<img src="/logo.svg" alt="logo" class="header-logo" />
		<button @click="tabsOpen" class="tabs__open" >Меню</button>
		<div class="tabs tabs--desktop">
			<button
				:class="['btn', { btn_green: movieStore.activeTab === 1 }]"
				@click="setTab(1)"
			>
				Закладки
			</button>
			<button
				:class="['btn', { btn_green: movieStore.activeTab === 2 }]"
				@click="setTab(2)"
			>
				Просмотренные фильмы
			</button>
			<button
				:class="['btn', { btn_green: movieStore.activeTab === 3 }]"
				@click="setTab(3)"
			>
				Поиск
			</button>
			<button
				:class="['btn', { btn_green: movieStore.activeTab === 4 }]"
				@click="setTab(4)"
			>
				Последние фильмы
			</button>
			<button
				:class="['btn', { btn_green: movieStore.activeTab === 5 }]"
				@click="setTab(5)"
			>
				Галерея
			</button>
			<button
				class="btn"
				@click="clear()"
			>
				Очистить историю
			</button>
		</div>
	</header>
	<main class="main">
		<div class="movies" v-if="movieStore.activeTab === 1">
			<h3>Все фильмы ({{ movieStore.totalCountMovies }})</h3>
			<Movie
				v-for="movie of movieStore.movies"
				:key="movie.id"
				:movie="movie"
			/>
		</div>
		<div class="movies" v-if="movieStore.activeTab === 2">
			<div>
				<h3>Просмотренные фильмы ({{ movieStore.watchedMovies.length }})</h3>
				<Movie
					v-for="movie of movieStore.watchedMovies"
					:key="movie.id"
					:movie="movie" />
				</div>
			</div>
			<div class="search" v-if="movieStore.activeTab === 3">
				<Search />
			</div>
			<div v-if="movieStore.activeTab === 4">
				<LastMovie/>
			</div>
			<div v-if="movieStore.activeTab === 5">
				<Gallery/>
			</div>
		<notifications />
	</main>
</template>

<script setup>
	import Search from "./components/Search.vue";
	import Gallery from "./components/Gallery.vue";
	import Movie from "./components/Movie.vue";
	import LastMovie from "./components/LastMovie.vue";
	import { useMovieStore } from "./stores/MovieStore";
	import { useLastMovieStore } from "./stores/LastMovieStore";
	import { notify } from "@kyvg/vue3-notification";
	import { ref } from 'vue';
	const setTab = (id) =>
	{
		movieStore.setActiveTab(id);
	};

	const isTabsShow = ref(false);

	function tabsClose()
	{
		isTabsShow.value = false;
	}

	function tabsOpen()
	{
		isTabsShow.value = true;
	}

	function clear ()
	{
		localStorage.clear();
		location.href = location.href;
		notify({
			title : "Очищен",
			type: 'success'
		});
	}
	const movieStore = useMovieStore();
	const lastMovieStore = useLastMovieStore();
</script>

<style lang="scss">
	body { overflow-x: hidden; }

	.header
	{
		display: flex;
		align-items: center;
		padding: 20px 5px;
		flex-wrap:wrap;
		position:sticky;
		top:0;
		background:#fff;
		width:100%;
		margin-bottom:50px;

		@media(min-width: 992px) { padding: 20px; }
	}

	.header-logo
	{
		max-width: 50px;
		margin-right: 10px;
	}

	.container
	{
		max-width: 700px;
		margin: 0 auto;
	}

	.btn
	{
		border: none;
		width: auto;
		padding: 10px 20px;
		font-size: 14px;
		margin: 0 10px;
		border-radius: 10px;
		cursor: pointer;
		background: #efefef;
	}

	.btn:hover { opacity: 0.7; }

	.btn_green { background: #37df5c; }

	.tabs
	{
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 30px;
		margin-left:auto;
		margin-right:50px;
		padding-top: 80px;
		&--desktop
		{
			display: none;
			padding-top: 0;
			@media(min-width: 992px){ display: flex; }
		}

		&--mobile
		{
			background: #fff;
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 10;
			display: block;
			@media(min-width: 992px) { display: none; }
		}

		& .btn
		{
			max-height: 80px;
			width: 97%;
			margin-bottom: 50px;

			&:hover{ background: #37df5c; }
			@media(min-width: 992px)
			{
				width: auto;
				max-height: auto;
				padding: 20px;
				margin-bottom: 0;
			}
		}
	}

	.tabs__close
	{
		background: none;
		border: none;
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 20px;
		cursor: pointer;
	}

	.tabs__open
	{
		background: #37df5c;
		border: none;
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 20px;
		padding: 10px;
		cursor: pointer;

		@media(min-width: 992px){ display: none; }
	}

	.vue-notification
	{
		margin: 15px 0 0 5px;
		padding: 10px;
		font-size: 12px;
		color: black;
		background: #37df5c;
		border-left: 5px solid black;

		&.success
		{
			background: #68cd86;
			border-left-color: #42a85f;
		}

		&.warn
		{
			background: #ffb648;
			border-left-color: #f48a06;
		}

		&.error
		{
			background: #e54d42;
			border-left-color: #b82e24;
			color:#fff;
		}
	}
</style>