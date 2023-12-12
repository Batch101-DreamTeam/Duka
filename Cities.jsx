import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const citiesData = [
  { id: '1', name: 'Moroni' },
  { id: '2', name: 'Mutsamudu' },
  { id: '3', name: 'Fomboni' },
  { id: '4', name: 'Iconi' },
  { id: '5', name: 'Itsandra' },
  { id: '6', name: 'Malé' },
  { id: '7', name: 'Ouellah' },
  { id: '8', name: 'Sima' },
];

const CitiesList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={citiesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CitiesList;
