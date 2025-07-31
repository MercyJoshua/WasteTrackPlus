import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHotspots, Hotspot } from '../utils/storage';

export default function HotspotList({ navigation }: any) {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [counts, setCounts] = useState<{ [location: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHotspots();
      setHotspots(data);

      // Count how many times each location appears
      const countMap: { [loc: string]: number } = {};
      data.forEach(h => {
        countMap[h.location] = (countMap[h.location] || 0) + 1;
      });
      setCounts(countMap);
    };

    fetchData();
  }, []);

  const markAsAddressed = async (id: string) => {
    const updated = hotspots.map(h =>
      h.id === id ? { ...h, status: 'addressed' } : h
    );
    setHotspots(updated);
    await AsyncStorage.setItem('HOTSPOTS', JSON.stringify(updated));
  };

  const renderHotspot = ({ item }: { item: Hotspot }) => (
    <View style={styles.card}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> : null}
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.loc}>📍 Location: {item.location}</Text>
      <Text style={styles.count}>🔁 Reported: {counts[item.location] || 1} time(s)</Text>

      <Text style={[styles.status, item.status === 'addressed' ? styles.addressed : styles.unaddressed]}>
        {item.status === 'addressed' ? '✅ Addressed' : '🟠 Unaddressed'}
      </Text>

      {item.status !== 'addressed' && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => markAsAddressed(item.id)}
        >
          <Text style={styles.btnText}>Mark as Addressed</Text>
        </TouchableOpacity>
      )}

     {item.status !== 'addressed' && (
  <TouchableOpacity
    style={styles.assignButton}
    onPress={() =>
      navigation.navigate('RegisterBin', {
        preFilledLocation: item.location,
      })
    }
  >
    <Text style={styles.btnText}>Assign Bin</Text>
  </TouchableOpacity>
)}

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reported Hotspots</Text>
      {hotspots.length > 0 ? (
        <FlatList
          data={hotspots}
          keyExtractor={(item) => item.id}
          renderItem={renderHotspot}
        />
      ) : (
        <Text style={styles.empty}>No hotspots reported yet.</Text>
      )}
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
    color: '#062621',
    textAlign: 'center'
  },
  empty: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginTop: 50
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8
  },
  desc: {
    fontSize: 16,
    fontWeight: '600',
    color: '#062621',
    marginTop: 5
  },
  loc: {
    fontSize: 14,
    color: '#333',
    marginTop: 5
  },
  count: {
    fontSize: 13,
    color: '#666',
    marginTop: 2
  },
  status: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  addressed: {
    backgroundColor: '#d4f4c5',
    color: '#205c1e'
  },
  unaddressed: {
    backgroundColor: '#fde2d9',
    color: '#8a2e0f'
  },
  actionButton: {
    backgroundColor: '#f78361',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center'
  },
  assignButton: {
    backgroundColor: '#00A676',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
