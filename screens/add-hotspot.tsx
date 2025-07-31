import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { saveHotspot } from '../utils/storage';
import uuid from 'react-native-uuid';  

export default function AddHotspot({ navigation }: any) {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!description || !location) {
      Alert.alert('Error', 'Please provide description and location');
      return;
    }

    try {
      const id = uuid.v4().toString();  // ✅ fixed UUID generation
    await saveHotspot({ id, description, location, image: image || '', status: 'unaddressed' });

      Alert.alert('Success', 'Hotspot submitted!');
      setDescription('');
      setLocation('');
      setImage(null);
      navigation.navigate('Hotspot List');
    } catch (error) {
      console.error('Error during submission:', error);
      Alert.alert('Error', 'Failed to submit hotspot');
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={styles.title}>Report Waste Hotspot</Text>

      {/* ✅ Encouragement Message */}
      <Text style={styles.infoText}>
        Thank you for helping keep our community clean! Your report helps fight illegal dumping and improve sanitation.
      </Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📸 Capture Photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TextInput
        style={styles.input}
        placeholder="Describe the hotspot..."
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Location..."
        placeholderTextColor="#666"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#efecd9' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10,
    textAlign: 'center',
    color: '#062621'
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444'
  },
  image: { 
    width: '100%', 
    height: 200, 
    marginVertical: 10, 
    borderRadius: 8 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginVertical: 10, 
    borderRadius: 8, 
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#062621',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15
  },
  buttonText: {
    color: '#efecd9',
    fontSize: 16,
    fontWeight: 'bold'
  },
  submitButton: {
    backgroundColor: '#00A676',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
