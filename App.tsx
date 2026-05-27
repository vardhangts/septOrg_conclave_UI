import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import EventLandingScreen from './src/screens/EventLandingScreen';
import { colors } from './src/styles/theme';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <EventLandingScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
