import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import routes from "./routes";
import ProfileNavigator from "./ProfileNavigator";
import MoviesNavigator from "./MoviesNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.MOVIES_NAVIGATOR}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={routes.PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.MOVIES_NAVIGATOR}
        component={MoviesNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="movie-open" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
