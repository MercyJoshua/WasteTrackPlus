import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveBin } from '../utils/storage';
import uuid from 'react-native-uuid';

// Optional route param: route.params?.preFilledLocation
export default function RegisterBin({ navigation, route }: any) {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (route?.params?.preFilledLocation) {
      setLocation(route.params.preFilledLocation);
    }
  }, [route]);

  const handleSubmit = async () => {
    if (!location.trim()) {
      Alert.alert('Error', 'Location is required');
      return;
    }

    try {
      const newBin = {
        id: uuid.v4().toString(),
        location,
        description,
        fillLevel: Math.floor(Math.random() * 40),
      };

      await saveBin(newBin);

      Alert.alert('Success', 'Bin registered!', [
        {
          text: 'OK',
          onPress: () => {
            setLocation('');
            setDescription('');
            navigation.goBack();
          },
        },
      ]);
    } catch (err) {
      console.error('Error during submission:', err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register New Bin</Text>
      <TextInput
        placeholder="Location"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        editable={!route?.params?.preFilledLocation} // lock field if prefilled
      />
      <TextInput
        placeholder="Description (optional)"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Register Bin" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
  },
});
