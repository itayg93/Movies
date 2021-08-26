import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Caption } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";

import defaultStyles from "../config/styles";

const AppWatchingListItem = ({ name, timestamp, renderRightActions }) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.detailsContainer}>
        {/** name */}
        <Text>{name}</Text>
        {/** timestamp */}
        <Caption>Added: {new Date(timestamp).toDateString()}</Caption>
      </View>
    </Swipeable>
  );
};

export default AppWatchingListItem;

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 10,
    backgroundColor: defaultStyles.colors.white,
  },
});
