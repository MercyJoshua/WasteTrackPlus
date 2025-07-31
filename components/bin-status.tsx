import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BinStatus() {
  const [fillLevel, setFillLevel] = useState<number>(0);
  const location = 'Community Bin - Zone A'; // You can make this dynamic later

  useEffect(() => {
    const interval = setInterval(() => {
      setFillLevel((prev) => (prev < 100 ? prev + 10 : 0));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getFillColor = () => {
    if (fillLevel <= 60) return '#22c053'; 
    if (fillLevel <= 85) return '#ff914d'; 
    return '#ff3131'; 
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: getFillColor() }]}>Smart Bin Status</Text>
      <Text style={styles.location}>{location}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.fill, { width: `${fillLevel}%`, backgroundColor: getFillColor() }]} />
      </View>
      <Text style={[styles.level, { color: getFillColor() }]}>Fill Level: {fillLevel}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#efecd9',
    borderRadius: 10,
    marginTop: 20,
  },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  location: { fontSize: 14, color: '#444', marginBottom: 10 },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  fill: {
    height: '100%',
    borderRadius: 10,
  },
  level: { fontSize: 16, fontWeight: '600' },
});
