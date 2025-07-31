import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type IntroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: IntroScreenNavigationProp;
};

export default function Intro({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Welcome to WasteTrack+
      </Animatable.Text>

      <Animatable.Text animation="fadeInUp" delay={300} style={styles.subtitle}>
        Monitor waste bins, report illegal dumps, and improve sanitation in your community.
      </Animatable.Text>

      <Animatable.View animation="bounceIn" delay={800}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Home')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animatable.View>
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
  title: { fontSize: 30, fontWeight: 'bold', color: '#062621', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#062621', marginBottom: 30 },
  button: { 
    backgroundColor: '#062621', 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 8 
  },
  buttonText: { 
    color: '#efecd9', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});
