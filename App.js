import React, { useState } from 'react';
import { View ,ScrollView} from 'react-native';
// import Navbar from './component/Navbar';
import FlightSearchForm from './component/FlightSearchForm';
import FlightDetails from './component/FlightDetails';
import flightData from './Data/flightData';
import Navbar from './component/Navbar';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchParams) => {
    const filteredFlights = flightData.filter((flight) => {
      // Implement filtering logic based on search parameters
      // For example:
      return (
        flight.from.toLowerCase() === searchParams.departure.toLowerCase().trim() &&
        flight.to.toLowerCase() === searchParams.destination.toLowerCase().trim() &&
        (searchParams.returnDate === "" || new Date(flight.returnDate) <= new Date(searchParams.returnDate)) &&
        (searchParams.departDate === "" || new Date(flight.departureDate) >= new Date(searchParams.departDate)) &&
        // Add other filtering conditions as needed
        flight.price >= searchParams.priceRange[0] &&
        flight.price <= searchParams.priceRange[1]
      );
    });

    setSearchResults(filteredFlights);
  };

  return (
    <View style={{ flex: 1,marginBottom:10 }}>
      <Navbar />
      <FlightSearchForm onSearch={handleSearch} />
      <FlightDetails flights={searchResults} />
    </View>
  );
};

export default App;
