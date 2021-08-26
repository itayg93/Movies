import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import MoviesFeedScreen from "../screens/MoviesFeedScreen";
import MoviesDetailsScreen from "../screens/MovieDetailsScreen";

const Stack = createStackNavigator();

const MoviesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.MOVIES_FEED}
        component={MoviesFeedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.MOVIE_DETAILS}
        component={MoviesDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default MoviesNavigator;
