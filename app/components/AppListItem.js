import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import defualtStyles from "../config/styles";

function AppListItem({ icon, label, onPress }) {
  return (
    <TouchableHighlight
      underlayColor={defualtStyles.colors.lightGrey}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View style={styles.iconAndLabelContainer}>
          {/** icon */}
          <View style={styles.iconContainer}>
            <Icon name={icon} size={20} color={defualtStyles.colors.white} />
          </View>
          {/** label */}
          <Text>{label}</Text>
        </View>
        {/** chevron right */}
        <Icon name="chevron-right" size={25} />
      </View>
    </TouchableHighlight>
  );
}

export default AppListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: defualtStyles.colors.white,
  },
  iconAndLabelContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10,
    width: 40,
    height: 40,
    backgroundColor: defualtStyles.colors.mediumGrey,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
