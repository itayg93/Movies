import clientApi from "./client";

import Config from "react-native-config";

const getMoviesByCategory = (category, page) =>
  clientApi.get(
    `/3/movie/${category}?api_key=${Config.TMDB_API_KEY}&language=en-US&page=${page}`
  );

const getMovieTrailerById = (id) =>
  clientApi.get(
    `/3/movie/${id}/videos?api_key=${Config.TMDB_API_KEY}&language=en-US`
  );

export default {
  getMoviesByCategory,
  getMovieTrailerById,
};
