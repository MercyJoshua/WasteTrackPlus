import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import BinDetailsModal from './bin-detail-modal';
import { getBins, Bin as StoredBin } from '../utils/storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

type Bin = StoredBin & {
  coords: { lat: number; lng: number };
};

export default function BinOverview({ navigation }: Props) {
  const [bins, setBins] = useState<Bin[]>([]);
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const overflowedBins = useRef(new Set<string>());
  const animations = useRef<Animated.Value[]>([]).current;

  const loadBins = async () => {
    const stored = await getBins();
    const withCoords: Bin[] = stored.map((b, idx) => ({
      ...b,
      coords: { lat: 37.78 + idx * 0.001, lng: -122.43 + idx * 0.001 },
    }));

  

    // Reset animation values
    animations.length = 0;
    withCoords.forEach(() => animations.push(new Animated.Value(1)));

    setBins(withCoords);
  };

  // Load on first mount
  useEffect(() => {
    loadBins();
  }, []);

  // Reload on focus
  useFocusEffect(
    React.useCallback(() => {
      loadBins();
    }, [])
  );

  // Simulate fill level changes
  useEffect(() => {
    const interval = setInterval(() => {
      setBins((prevBins) =>
        prevBins.map((bin) => {
          let newLevel = bin.fillLevel + Math.floor(Math.random() * 10);
          if (newLevel > 100) newLevel = 100;
          if (newLevel < 95) overflowedBins.current.delete(bin.id);
          return { ...bin, fillLevel: newLevel };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Start animation for overflowing bins
  useEffect(() => {
    bins.forEach((bin, index) => {
      if (bin.fillLevel >= 95 && !overflowedBins.current.has(bin.id)) {
        overflowedBins.current.add(bin.id);
        Animated.loop(
          Animated.sequence([
            Animated.timing(animations[index], {
              toValue: 1.1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(animations[index], {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }
    });
  }, [bins]);

  const getFillColor = (level: number) => {
    if (level < 60) return '#28a745';
    if (level < 90) return '#ff9800';
    return '#d32f2f';
  };

  const openBinDetails = (bin: Bin) => {
    console.log('Opening bin details for:', bin.location);
    setSelectedBin(bin);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Bins</Text>

      <FlatList
        data={bins}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openBinDetails(item)}>
            <Animated.View
              style={[
                styles.card,
                {
                  borderLeftColor: getFillColor(item.fillLevel),
                  transform: [{ scale: animations[index] || new Animated.Value(1) }],
                },
              ]}
            >
              <Text style={styles.location}>{item.location}</Text>
              <Text style={{ color: getFillColor(item.fillLevel), fontWeight: 'bold' }}>
                Fill Level: {item.fillLevel}%{item.fillLevel >= 100 ? ' (Overflow!)' : ''}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      />

      {/* Register Bin Button */}
      <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('RegisterBin')}>
        <Text style={styles.registerBtnText}>+ Register New Bin</Text>
      </TouchableOpacity>

      {selectedBin && (
        <BinDetailsModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  location={selectedBin.coords}
  fillHistory={[30, 45, 60, 70, selectedBin.fillLevel]}
  meta={{
    locationText: selectedBin.location,
    description: selectedBin.description,
    currentFill: selectedBin.fillLevel,
  }}
/>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', padding: 10, backgroundColor: '#fff', borderRadius: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#062621' },
  card: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#efecd9',
    borderRadius: 6,
    borderLeftWidth: 6,
  },
  location: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  registerBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#0b8457',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  registerBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
