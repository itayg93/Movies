import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

function AppScreen({ children, style }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

export default AppScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
