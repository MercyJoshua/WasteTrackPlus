import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddHotspot from './screens/add-hotspot';
import Home from './screens/home';
import HotspotList from './screens/hotspot-list';
import Intro from './screens/intro';
import Splash from './screens/splash-screen';
import RegisterBin from './screens/register-bin';

export type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  Home: undefined;
  'Add Hotspot': undefined;
  'Hotspot List': undefined;
  'RegisterBin': undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add Hotspot" component={AddHotspot} />
        <Stack.Screen name="Hotspot List" component={HotspotList} />
        <Stack.Screen name="RegisterBin" component={RegisterBin} options={{ headerShown: true, title: 'Register Bin' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
