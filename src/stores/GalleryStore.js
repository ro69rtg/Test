import { defineStore } from 'pinia';
import { ref } from 'vue';
import Loader from "../components/Loader.vue";
import { notify } from "@kyvg/vue3-notification";

const loader = ref(false);

const apiKey = "02708c4929ad93aa5e68f8ee7bfa4445&query=";
const baseUrl = "https://api.themoviedb.org/3/movie/";

export const useGalleryStore = defineStore("gallery", () =>
{
	const gallery = ref([]);
	const startId = 33;

	const getGallery = async () =>
	{
		try
		{
			loader.value = true;
			const url = `${baseUrl}${startId}/images?api_key=${apiKey}`;
			const res = await fetch(url);
			const data = await res.json();
			gallery.value = data.posters;
			loader.value = false;
		}
		catch (error)
		{
			console.error("Error fetching gallery:", error);
		}
	};

	const getGalleryById = async (id) =>
	{
		try
		{
			loader.value = true;
			const url = `${baseUrl}${id}/images?api_key=${apiKey}`;
			const res = await fetch(url);
			const data = await res.json();
			if(res.status === 200)
			{
				gallery.value = data.posters;
				console.log(gallery.value);
				loader.value = false;
				notify({
					title:'Вывожу',
					type: 'success'
				});
			}
			else
			{
				notify({
					title:'Такого нет',
					text: 'введите другое число',
					type: 'error'
				});
			}

		}
		catch (error)
		{
			console.error("Error fetching gallery:", error);
		}
	};

	return {
		getGallery,
		getGalleryById, // Expose the new action
		gallery,
		loader
	};
});
