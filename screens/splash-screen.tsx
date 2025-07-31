import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Intro'>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

export default function Splash({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Intro');
    }, 2500); // 2.5 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Animatable.Text 
        animation="fadeInDown" 
        duration={1500} 
        style={styles.logo}
      >
        WasteTrack+
      </Animatable.Text>

      <Animatable.Text 
        animation="fadeInUp" 
        duration={1500} 
        delay={300} 
        style={styles.subtitle}
      >
        Smart Waste & Sanitation Tracking
      </Animatable.Text>

      <ActivityIndicator size="large" color="#efecd9" style={{ marginTop: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#062621',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#efecd9',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#efecd9',
    marginTop: 10,
    opacity: 0.9,
  },
});
