import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { Searchbar, Chip } from "react-native-paper";

// api
import moviesApi from "../api/movies";
import searchApi from "../api/search";

// navigation
import routes from "../navigation/routes";

// components
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppScreen from "../components/AppScreen";
import AppCard from "../components/AppCard";

const chipCategories = [
  { name: "Now Playing", value: "now_playing", selected: true },
  { name: "Top Rated", value: "top_rated", selected: false },
  { name: "Upcoming", value: "upcoming", selected: false },
];

function MoviesFeedScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  // category
  const [prevCategory, setPrevCategory] = useState({});
  const [currCategory, setCurrCategory] = useState(chipCategories[0]);

  // movies
  const [prevMoviesFeed, setPrevMoviesFeed] = useState([]);
  const [currmoviesFeed, setCurrMoviesFeed] = useState([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // if the user enter query
    if (searchQuery !== "") {
      setCurrMoviesFeed([]);
      loadMoviesFeed(searchApi.getMoviesByName, searchQuery);
    } else {
      loadMoviesFeed(moviesApi.getMoviesByCategory, currCategory.value, page);
    }
  }, [currCategory, searchQuery, page]);

  const loadMoviesFeed = async (apiCall, categoryOrQuery, page) => {
    setLoading(true);
    let response = await apiCall(categoryOrQuery, page);
    setLoading(false);

    // error
    if (!response.ok) return setError(true);

    // success
    setError(false);
    // if prev movies feed is not empty, and we not in search - concat the response
    if (prevMoviesFeed.length > 0 && searchQuery === "") {
      const m = prevMoviesFeed.concat(response.data.results);
      setCurrMoviesFeed(m);
    } else {
      setCurrMoviesFeed(response.data.results);
    }
  };

  const handleCategorySelection = (newCategory) => {
    if (newCategory === currCategory) return;
    // set prev, and curr movies feed to empty array
    setPrevMoviesFeed([]);
    setCurrMoviesFeed([]);
    // set prev to curr, and unmark it
    const prev = currCategory;
    prev.selected = false;
    setPrevCategory(prev);
    // set curr to the new selection, and mark it
    newCategory.selected = true;
    setCurrCategory(newCategory);
    // set page to 1
    setPage(1);
  };

  const handleScrollingToTheEnd = () => {
    // when scrolling in the search result - no need to change page in the end
    if (searchQuery !== "") return;
    // limit to 3 pages
    if (page === 3) return;
    // set prev movies feed
    setPrevMoviesFeed(currmoviesFeed);
    setPage(page + 1);
  };

  return (
    <AppScreen style={styles.container}>
      {error ? (
        <>
          <Text>Could'nt retrive the data.</Text>
        </>
      ) : (
        <>
          {/** search */}
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search"
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
            />
          </View>

          {/** chips */}
          <View style={styles.chipsContainer}>
            {chipCategories.map((c, index) => (
              <Chip
                key={index}
                style={styles.chip}
                selected={c.selected}
                onPress={() => handleCategorySelection(c)}
              >
                {c.name}
              </Chip>
            ))}
          </View>

          {/** loading animation */}
          <AppActivityIndicator visible={loading} />

          {/** movies */}
          <View style={styles.moviesContainer}>
            <FlatList
              data={currmoviesFeed}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <AppCard
                  image={item.poster_path}
                  title={item.title}
                  description={item.overview}
                  onPress={() =>
                    navigation.navigate(routes.MOVIE_DETAILS, item)
                  }
                />
              )}
              onEndReachedThreshold={1}
              onEndReached={({ distanceFromEnd }) => {
                // to stop the bug of 2 pages skip
                if (distanceFromEnd < 0) return;
                handleScrollingToTheEnd();
              }}
            />
          </View>
        </>
      )}
    </AppScreen>
  );
}

export default MoviesFeedScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  searchContainer: {
    marginBottom: 10,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 5,
  },
  moviesContainer: {
    flex: 1,
    marginTop: 10,
  },
});
