import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Caption } from "react-native-paper";

import defualtStyles from "../config/styles";

function AppProfileCard({ image, name, email }) {
  return (
    <View style={styles.container}>
      {/** image */}
      <Image source={{ uri: image }} style={styles.image} />
      {/** details */}
      <View style={styles.detailsContainer}>
        {/** name */}
        <Text style={styles.name}>{name}</Text>
        {/** email */}
        <Caption style={styles.email}>{email}</Caption>
      </View>
    </View>
  );
}

export default AppProfileCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: defualtStyles.colors.white,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  detailsContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
  },
  email: {
    fontSize: 14,
  },
});
