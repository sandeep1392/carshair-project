import React from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';
import { Card } from 'react-native-paper';

const CarComponent = (props) => {
  const { car } = props;
  return (
    <Card style={styles.cardCss}>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://picsum.photos/id/${car.id}/200/300`,
          }}
          style={styles.logo}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{car.car}</Text>
          <Text>{car.car_model}</Text>
          <Text>{car.car_color}</Text>
          <Text>{car.price}</Text>
        </View>
        {car.availability ? <Button title="Avail"></Button> : null}
      </View>
    </Card>
  );
};

export default CarComponent;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
  },
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  cardCss: {
    margin: 5,
    borderRadius: 10,
  },
});
