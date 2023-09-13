import { defineStore } from 'pinia';
import { ref } from 'vue';

const apiKey = "02708c4929ad93aa5e68f8ee7bfa4445&query=";
const baseUrl = "https://api.themoviedb.org/3/trending/movie/week";
const options = {
	method: 'GET',
	headers:
	{
		accept: 'application/json',
	}
};

export const useLastMovieStore = defineStore("lastMovies", () =>
{
	const movies = ref([]);

	const getMovies = async () =>
	{
		try
		{
			const url = `${baseUrl}?api_key=${apiKey}`;
			const res = await fetch(url, options);
			const data = await res.json();
			movies.value = data.results;
		}
		catch (error)
		{
			console.error("Error fetching movies:", error);
		}
	};

	return {
		getMovies,
		movies
	};
});
