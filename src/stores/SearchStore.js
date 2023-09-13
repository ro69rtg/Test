import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";

const url =
	"https:api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";

export const useSearchStore = defineStore("searchStore", () =>
{
	const loader = ref(false);
	const movies = ref([]);

	const getMovies = async (search) =>
	{
		if(search.length === 0)
		{
			notify({
				text: 'Пустое',
				type: 'error'
			});
			return false;
		}
		else
		{
			loader.value = true;
			const res = await fetch(`${url}${search}`);
			const data = await res.json();
			movies.value = data.results;
			loader.value = false;
		}
	};

	const addToUserMovies = (object) =>
	{
		const movieStore = useMovieStore();
		for(let i = 0;i < movieStore.movies.length; i++)
		{
			if(movieStore.movies[i].original_title === object.original_title
				&& movieStore.movies[i].release_date === object.release_date)
			{
				notify({
					title: "Уже есть",
					type: 'warn'
				});
				return false;
			}
		}
		movieStore.movies.push({ ...object, isWatched: false });
		const lastMovie = movieStore.movies[movieStore.movies.length - 1];
		notify({
			title: "Добавлен фильм",
			type: 'success',
			text: lastMovie.original_title
		});
		return true;
	};

	return {
		loader,
		movies,
		getMovies,
		addToUserMovies,
	};
});
