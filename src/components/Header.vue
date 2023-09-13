<template>
	<header class="header">
		<img src="/logo.svg" alt="logo" class="header-logo" />
		<h2></h2>
		<div class="tabs">
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
</template>

<script setup>
	import { useMovieStore } from "./stores/MovieStore";
	import { useLastMovieStore } from "./stores/LastMovieStore";
	import { notify } from "@kyvg/vue3-notification";

	const setTab = (id) =>
	{
		movieStore.setActiveTab(id);
	};

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