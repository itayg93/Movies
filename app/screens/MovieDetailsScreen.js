import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import { Title, Divider } from "react-native-paper";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import AuthContext from "../auth/context";
import Constants from "../api/Constants";
import moviesApi from "../api/movies";
import firebaseApi from "../api/firebase";
import AppScreen from "../components/AppScreen";

function MovieDetailsScreen({ navigation, route }) {
  const movie = route.params;

  const { user } = useContext(AuthContext);

  const [youtubeVideoId, setYoutubeVideoId] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Title numberOfLines={1}>{movie.title}</Title>,
      headerRight: () => (
        <TouchableOpacity onPress={handleAddingToWatchingList}>
          <Icon style={{ marginRight: 10 }} name="playlist-plus" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    loadYoutubeVideoId();
  }, []);

  const loadYoutubeVideoId = async () => {
    const response = await moviesApi.getMovieTrailerById(movie.id);

    // error
    if (!response.ok) return;

    // success
    if (response.data.results.length !== 0) {
      setYoutubeVideoId(response.data.results[0].key);
    }
  };

  const handleAddingToWatchingList = async () => {
    try {
      await firebaseApi.addMovieToWatchingList(user.uid.toString(), {
        id: movie.id,
        name: movie.title,
        timestamp: Date.now(),
      });
      Alert.alert(
        "Success",
        "The movie successfully added to your watching list."
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppScreen>
      {/** trailer */}
      <WebView
        source={{
          uri: `${Constants.YOUTUBE_VIDEO_BASE_URL}${youtubeVideoId}${Constants.YOUTUBE_VIDEO_URL_PARMS}`,
        }}
      />

      {/** details */}
      <View style={styles.detailsContainer}>
        {/** rating */}
        <Text style={styles.text}>Rating: {movie.vote_average}</Text>
        <Divider style={styles.divider} />
        {/** description */}
        <Text style={styles.text}>Description: {movie.overview}</Text>
        <Divider style={styles.divider} />
        {/** release */}
        <Text style={styles.text}>Release: {movie.release_date}</Text>
      </View>
    </AppScreen>
  );
}

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  divider: {
    marginVertical: 5,
  },
});
