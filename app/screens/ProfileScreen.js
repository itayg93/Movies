import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import auth from "@react-native-firebase/auth";

import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import AppScreen from "../components/AppScreen";
import AppProfileCard from "../components/AppProfileCard";
import AppListItem from "../components/AppListItem";

function ProfileScreen({ navigation }) {
  const {
    user: { displayName, email, photoURL },
  } = useContext(AuthContext);

  const handleLogout = () => {
    try {
      auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppScreen style={styles.container}>
      {/** profile */}
      <AppProfileCard image={photoURL} name={displayName} email={email} />

      {/** menu */}
      <View style={styles.menuContainer}>
        {/** watching list */}
        <AppListItem
          icon="format-list-bulleted"
          label="Watching List"
          onPress={() => navigation.navigate(routes.WATCHING_LIST)}
        />

        <Divider />

        {/** logout */}
        <AppListItem icon="logout" label="Logout" onPress={handleLogout} />
      </View>
    </AppScreen>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  menuContainer: {
    marginTop: 20,
  },
});
