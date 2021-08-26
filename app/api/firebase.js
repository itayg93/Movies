import firestore from "@react-native-firebase/firestore";

const USERS_DATA = "USERS_DATA";
const WATCHING_LIST = "WATCHING_LIST";

// add movie
const addMovieToWatchingList = (userId, movie) => {
  return firestore()
    .collection(USERS_DATA)
    .doc(userId)
    .collection(WATCHING_LIST)
    .doc(movie.id.toString())
    .set(movie);
};

// delete movie
const deleteMovieFromWatchingList = (userId, movieId) => {
  return firestore()
    .collection(USERS_DATA)
    .doc(userId)
    .collection(WATCHING_LIST)
    .doc(movieId)
    .delete();
};

// get all movies
const getWatchingList = (userId) => {
  return firestore()
    .collection(USERS_DATA)
    .doc(userId)
    .collection(WATCHING_LIST)
    .orderBy("timestamp")
    .get();
};

export default {
  addMovieToWatchingList,
  deleteMovieFromWatchingList,
  getWatchingList,
};
