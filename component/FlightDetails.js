import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FlightDetails = ({ flights }) => {
  const renderItem = ({ item }) => (
    <View style={styles.flightCard}>
      <Text>{item.from} to {item.to}</Text>
      <Text>Departure: {item.departureDate}</Text>
      {item.returnDate && <Text>Return: {item.returnDate}</Text>}
      <Text>Price: ${item.price}</Text>
    </View>
  );

  return (
    <FlatList
      data={flights}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      nestedScrollEnabled={true} // Enable nested scrolling
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom:10
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
    borderColor: '#ccc', // Grayish color
    borderWidth: 1, // Border width
  },
});

export default FlightDetails;
