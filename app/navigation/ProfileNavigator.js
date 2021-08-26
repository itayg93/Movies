import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import ProfileScreen from "../screens/ProfileScreen";
import WatchingListScreen from "../screens/WatchingListScreen";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.WATCHING_LIST}
        component={WatchingListScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
