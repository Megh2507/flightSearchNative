import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flight Price Tracker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    padding: 30,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Navbar;
