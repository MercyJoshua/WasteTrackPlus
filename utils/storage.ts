import AsyncStorage from '@react-native-async-storage/async-storage';


export type Hotspot = {
  id: string;
  description: string;
  location: string;
  image: string;
  status?: string ; 
  
};

export type Bin = {
  id: string;
  location: string;
  description?: string;
  fillLevel: number;
};

const HOTSPOT_KEY = 'HOTSPOTS';
const BIN_KEY = 'BINS';

// Hotspot Functions
export const saveHotspot = async (hotspot: Hotspot): Promise<void> => {
  try {
    const existing = await AsyncStorage.getItem(HOTSPOT_KEY);
    const hotspots: Hotspot[] = existing ? JSON.parse(existing) : [];
    hotspots.push({ ...hotspot, status: hotspot.status ?? 'unaddressed' });
    await AsyncStorage.setItem(HOTSPOT_KEY, JSON.stringify(hotspots));
  } catch (err) {
    console.error('Error saving hotspot:', err);
  }
};


export const getHotspots = async (): Promise<Hotspot[]> => {
  try {
    const data = await AsyncStorage.getItem(HOTSPOT_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error getting hotspots:', err);
    return [];
  }
};

export const clearHotspots = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HOTSPOT_KEY);
  } catch (err) {
    console.error('Error clearing hotspots:', err);
  }
};

// Bin Functions
export const saveBin = async (bin: Bin): Promise<void> => {
  try {
    const existing = await AsyncStorage.getItem(BIN_KEY);
    const bins: Bin[] = existing ? JSON.parse(existing) : [];
    bins.push(bin);
    await AsyncStorage.setItem(BIN_KEY, JSON.stringify(bins));
  } catch (err) {
    console.error('Error saving bin:', err);
  }
};

export const getBins = async (): Promise<Bin[]> => {
  try {
    const data = await AsyncStorage.getItem(BIN_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error getting bins:', err);
    return [];
  }
};

export const clearBins = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(BIN_KEY);
  } catch (err) {
    console.error('Error clearing bins:', err);
  }
};
