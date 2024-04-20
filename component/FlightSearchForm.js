import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";

const FlightSearchForm = ({ onSearch }) => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [tab, setTab] = useState("oneWay");
  const [dateTab, setDateTab] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearch = () => {
    const searchParams = {
      departure,
      destination,
      returnDate: tab === "return" ? returnDate : "",
      departDate: tab === "return" ? departDate : "",
      priceRange,
    };

    onSearch(searchParams);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const timezoneOffsetInMs = selectedDate.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(
        selectedDate.getTime() - timezoneOffsetInMs
      );
      if (dateTab === "depart") {
        setDepartDate(adjustedDate.toISOString().split("T")[0]);
      } else if (dateTab === "return") {
        setReturnDate(adjustedDate.toISOString().split("T")[0]);
      }
    }
  };

  const showDatepicker = (tab) => {
    setDateTab(tab);
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {/* Tab buttons */}
        <TouchableOpacity
          style={tab === "oneWay" ? styles.tabButtonActive : styles.tabButton}
          onPress={() => {
            setTab("oneWay");
            setDeparture("");
            setDestination("");
            setReturnDate("");
            setDepartDate("");
            setPriceRange([0, 1000]);
            const searchParams = {
              departure: "",
              destination: "",
              returnDate: "",
              departDate: "",
              priceRange: [0, 1000],
            };

            onSearch(searchParams);
          }}
        >
          <Text style={styles.tabText}>One Way</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tab === "return" ? styles.tabButtonActive : styles.tabButton}
          onPress={() => {
            setTab("return");
            setDeparture("");
              setDestination("");
              setReturnDate("");
              setDepartDate("");
              setPriceRange([0, 1000]);
              const searchParams = {
                departure:"",
                destination:"",
                returnDate: "",
                departDate: "",
                priceRange:[0, 1000],
              };
          
              onSearch(searchParams);
          }}
        >
          <Text style={styles.tabText}>Deaprt/Return</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="From"
          value={departure}
          onChangeText={(text) => setDeparture(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="To"
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
        {tab === "return" && (
          <TouchableOpacity onPress={() => showDatepicker("depart")}>
            <TextInput
              style={styles.input}
              placeholder="Depart Date"
              value={departDate}
              editable={false}
            />
          </TouchableOpacity>
        )}
        {tab === "return" && (
          <TouchableOpacity onPress={() => showDatepicker("return")}>
            <TextInput
              style={styles.input}
              placeholder="Return Date"
              value={returnDate}
              editable={false}
            />
          </TouchableOpacity>
        )}
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Price Range:</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1000}
            step={10}
            value={priceRange[1]}
            onValueChange={(value) => setPriceRange([0, value])}
          />
          <Text>${priceRange[1]}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  tabButtonActive: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  tabText: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderLabel: {
    marginRight: 10,
  },
  slider: {
    flex: 1,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 40,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FlightSearchForm;
