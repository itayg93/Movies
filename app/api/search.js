import clientApi from "./client";

import Config from "react-native-config";

const getMoviesByName = (searchQuery) =>
  clientApi.get(
    `/3/search/movie?api_key=${Config.TMDB_API_KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`
  );

export default {
  getMoviesByName,
};
