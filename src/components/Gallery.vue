<template>
	<div class="gallery">
		<h1 class="gallery__row-title">Галерея</h1>
		<h3 class="gallery__row-description">
			Введите рандомную цифру фильма и покажется галерея :
		</h3>
		<div class="gallery__row">
			<form class="gallery__form" @submit.prevent="sendId()">
				<input
					type="number"
					v-model="id"
					class="gallery__row-input"
				>
				<button type="submit" class="gallery__row-btn">Поиск</button>

				<span class="gallery__row-count"> номер: {{ id }}</span>
			</form>
		</div>
		<Loader v-if="galleryStore.loader" />
		<div v-else class="gallery__wrapper">
			<div
				class="gallery__block"
				v-for="gallery of galleryStore.gallery"
				:key="gallery.id"
				:style="{ width: getRandomBlockSize(), height: getRandomBlockSize()}"
			>
				<img
					:src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${gallery.file_path}`"
					class="gallery__block-img"
			/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useGalleryStore } from '../stores/GalleryStore'
	import { onBeforeMount, ref, onMounted } from 'vue';
	import Loader from "../components/Loader.vue";
	import getRandomCount from "../helpers/randomCount"

	const galleryStore = useGalleryStore();
	const id = ref();

	const sendId = async function()
	{
		await galleryStore.getGalleryById(id.value);
		updateGalleryBlocksSize();
	};

	const getRandomBlockSize = () =>
	{
		const randomCount = getRandomCount();
		return `${randomCount}px`;
	};

	const updateGalleryBlocksSize = () =>
	{
		const blocks = document.querySelectorAll(".gallery__block");
		blocks.forEach((block) =>
		{
			block.style.width = getRandomBlockSize();
			block.style.height = getRandomBlockSize();
		});
	};

	onBeforeMount(() =>
	{
		galleryStore.getGallery();
	});

	onMounted(() =>
	{
		updateGalleryBlocksSize();
	});
</script>

<style lang="scss">
	.gallery__row-title
	{
		margin-bottom: 10px;
		display:block;
	}

	.gallery__row
	{
		display: flex;
		margin-bottom: 20px;
	}

	.gallery__row-input
	{
		width: 300px;
		padding: 10px;
	}

	.gallery__row-count
	{
		margin-left: 100px;
	}

	.gallery__row-btn
	{
		width: 50px;
		height: 40px;
	}

	.gallery__form
	{
		display: flex;
		align-items: center;
		width: 100%;
		flex-wrap: wrap;
		gap: 25px;
		@media(min-width: 992px){ gap:0; }
	}

	.gallery__wrapper
	{
		display: flex;
		flex-wrap: wrap;
	}

	.gallery__block
	{
		margin-bottom:20px;
		border:1px solid gray;
		margin-right: 20px;
	}

	.gallery__block-img
	{
		object-fit:cover;
		width:100%;
		height:100%;
	}
</style>