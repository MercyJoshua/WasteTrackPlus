import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { VictoryLine } from 'victory-native';

type BinDetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  location: { lat: number; lng: number };
  fillHistory: number[];
  meta: {
    locationText: string;
    description?: string;
    currentFill: number;
  };
};

export default function BinDetailsModal({
  visible,
  onClose,
  location,
  fillHistory,
  meta,
}: BinDetailsModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Bin Details</Text>

          {/* Location + Fill Info */}
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{meta.locationText}</Text>

          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{meta.description || 'No description provided'}</Text>

          <Text style={styles.label}>Current Fill Level:</Text>
          <Text style={[styles.value, {
            color:
              meta.currentFill < 60 ? '#28a745' :
              meta.currentFill < 90 ? '#ff9800' :
              '#d32f2f'
          }]}>
            {meta.currentFill}%
          </Text>

          {/* Map */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude: location.lat, longitude: location.lng }} />
          </MapView>

          {/* Chart */}
          <Text style={styles.label}>Fill Level History:</Text>
        {/*   <VictoryLine
            data={fillHistory.map((y, x) => ({ x, y }))}
            style={{ data: { stroke: "#062621" } }}
            interpolation="natural"
          /> */}

          {/* Close */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { width: '90%', backgroundColor: '#efecd9', borderRadius: 10, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#062621', marginBottom: 10 },
  label: { fontWeight: 'bold', color: '#062621', marginTop: 10 },
  value: { marginBottom: 5, color: '#062621' },
  map: { height: 180, borderRadius: 10, marginTop: 10 },
  closeButton: { marginTop: 20, backgroundColor: '#062621', padding: 12, borderRadius: 8, alignItems: 'center' },
  closeText: { color: '#efecd9', fontWeight: 'bold' },
});
