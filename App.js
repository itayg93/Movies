import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

import AuthContext from "./app/auth/context";
import AppNavigator from "./app/navigation/AppNavigator";
import LoginScreen from "./app/screens/LoginScreen";

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // on unmount
    return subscriber;
  }, []);

  // handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <AuthContext.Provider value={{ user }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
