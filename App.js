import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CarComponent from './CarComponent';
import Dropdown from './DropDown';

function CarShair() {
  const [carData, setCarData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [inputData, setInputData] = useState('');
  const [allColor, setAllColor] = useState([]);
  const [allModel, setAllModel] = useState([]);
  const [allYear, setAllYear] = useState([]);
  const [carUrl, setCarUrl] = useState('https://myfakeapi.com/api/cars/');
  const [selectedColor, setSelectedColor] = useState(undefined);
  const [selectedYear, setSelectedYear] = useState(undefined);
  const [selectedModel, setSelectedModel] = useState(undefined);

  const fetchCar = useCallback(async (fetchCar) => {
    try {
      const data = await fetch(fetchCar);
      let { cars, Cars } = await data.json();
      if (!cars) {
        cars = Cars;
      }
      if (fetchCar == 'https://myfakeapi.com/api/cars/') {
        const allColor = cars.map((car) => {
          return { label: car.car_color, value: car.car_color };
        });
        const allModel = cars.map((car) => {
          return { label: car.car_model, value: car.car_model };
        });
        const allYear = cars.map((car) => {
          return { label: car.car_model_year, value: car.car_model_year };
        });
        setAllColor(allColor);
        setAllModel(allModel);
        setAllYear(allYear);
      }
      setCarData(cars);
      setFilterData(cars);
    } catch (e) {
      alert('Api Failed');
    }
  }, []);

  useEffect(() => {
    fetchCar(carUrl);
  }, [carUrl, fetchCar]);

  const FilterData = () => {
    let filterData = [...carData];
    filterData = filterData.filter((car) =>
      car.car.toLowerCase().includes(inputData.toLowerCase())
    );
    setFilterData(filterData);
  };

  const renderItem = (item) => {
    return <CarComponent car={item.item} />;
  };

  const filterCarByDropDown = (data, filterType) => {
    switch (filterType) {
      case 'Modal':
        setSelectedModel(data);
        setCarUrl(`https://myfakeapi.com/api/cars/model/${data.value}`);
        setSelectedColor(undefined);
        setSelectedYear(undefined);
        break;
      case 'Color':
        setSelectedYear(undefined);
        setSelectedModel(undefined);
        setSelectedColor(data);
        setCarUrl(`https://myfakeapi.com/api/cars/color/${data.value}`);
        break;
      case 'Year':
        setSelectedYear(data);
        setSelectedColor(undefined);
        setSelectedModel(undefined);
        setCarUrl(`https://myfakeapi.com/api/cars/year/${data.value}`);
        break;
    }
  };

  const clearFilter = () => {
    setCarUrl('https://myfakeapi.com/api/cars/');
    setSelectedYear(undefined);
    setSelectedColor(undefined);
    setSelectedModel(undefined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={inputData}
          onChangeText={setInputData}
          placeholder="Search car"
          placeholderTextColor="gray"
        />
        <Button title="Search" onPress={FilterData}></Button>
      </View>
      <View style={styles.drowDownWrapper}>
        <Dropdown
          label="Select Color"
          data={allColor}
          onSelect={(data) => filterCarByDropDown(data, 'Color')}
          selected={selectedColor}
          setSelected={setSelectedColor}
        />
        <Dropdown
          label="Select Modal"
          data={allModel}
          onSelect={(data) => filterCarByDropDown(data, 'Modal')}
          selected={selectedModel}
          setSelected={setSelectedModel}
        />
        <Dropdown
          label="Select Year"
          data={allYear}
          onSelect={(data) => filterCarByDropDown(data, 'Year')}
          selected={selectedYear}
          setSelected={setSelectedYear}
        />
      </View>
      <Button title="Clear Filter" onPress={clearFilter}></Button>
      <FlatList
        data={filterData}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    borderRadius: 10,
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drowDownWrapper: {
    margin: 10,
    flexDirection: 'row',
  },
});

export default CarShair;
