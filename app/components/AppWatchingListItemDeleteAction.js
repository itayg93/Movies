import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import defaultStyles from "../config/styles";

const AppWatchingListItemDeleteAction = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon name="trash-can" size={35} color={defaultStyles.colors.white} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppWatchingListItemDeleteAction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.danger,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
