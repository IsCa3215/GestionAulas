import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useStore from "../store/userStore";
import SesionScreen from './SesionScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainScreen: React.FC = () => {
  const { user, loading, error } = useStore();
  console.log('User:', user); 
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{`Errol: ${error}`}</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const HomeScreen: React.FC = () => {
  const { user } = useStore();
  return (
    <View style={{ flex: 1}}>
      {user ? (
        <Text>{`Bienvenid@, ${user.name || ''}`}</Text> // Muestra el nombre del usuario o un texto por defecto
      ) : (
        <Text>Logeate</Text>
      )}
    </View>
  );
};
