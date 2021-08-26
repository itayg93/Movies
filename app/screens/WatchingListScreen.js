import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Divider } from "react-native-paper";

import firebaseApi from "../api/firebase";
import AuthContext from "../auth/context";
import AppScreen from "../components/AppScreen";
import AppWatchingListItem from "../components/AppWatchingListItem";
import AppWatchingListItemDeleteAction from "../components/AppWatchingListItemDeleteAction";

function WatchingListScreen() {
  const { user } = useContext(AuthContext);
  const [watchingList, setWatchingList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWatchingList();
  }, []);

  const loadWatchingList = async () => {
    try {
      setLoading(true);
      const querySnapshot = await firebaseApi.getWatchingList(
        user.uid.toString()
      );
      setLoading(false);

      setWatchingList(querySnapshot.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMovieFromWatchingList = async (movieId) => {
    // delete from the list
    setWatchingList(watchingList.filter((m) => m.id != movieId));
    // delete from the db
    try {
      await firebaseApi.deleteMovieFromWatchingList(
        user.uid.toString(),
        movieId.toString()
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppScreen style={styles.container}>
      <FlatList
        data={watchingList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AppWatchingListItem
            name={item.data().name}
            timestamp={item.data().timestamp}
            renderRightActions={() => (
              <AppWatchingListItemDeleteAction
                onPress={() =>
                  handleDeleteMovieFromWatchingList(item.data().id)
                }
              />
            )}
          />
        )}
        ItemSeparatorComponent={Divider}
      />
    </AppScreen>
  );
}

export default WatchingListScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});
