import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import BinOverview from '../components/bin-overview';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({ navigation }: Props) {
  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={styles.title}>WasteTrack+</Text>
      
      <BinOverview navigation={navigation} />

      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Add Hotspot')}
        >
          <Text style={styles.buttonText}>Add Hotspot</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Hotspot List')}
        >
          <Text style={styles.buttonText}>View Hotspots</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20, 
    backgroundColor: '#efecd9'
  },
  title: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20,
    color: '#062621'
  },
  buttons: { 
    marginTop: 30, 
    width: '100%', 
    alignItems: 'center' 
  },
  button: { 
    backgroundColor: '#062621',
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 8, 
    marginVertical: 10, 
    width: '80%',
    alignItems: 'center'
  },
  buttonText: { 
    color: '#efecd9', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});
