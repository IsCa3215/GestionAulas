import React from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useStore from "../store/userStore";
import ProfileScreen from './ProfileScreen';
import { Button, Card } from 'react-native-paper';
import eventStore from '../store/eventStore';
import { EventScreen } from './EventScreen';

const Tab = createBottomTabNavigator();


export const MainScreen: React.FC = () => {
  const { loading, error } = useStore();
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
        <Text>{`Error: ${error}`}</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Eventos" component={EventScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const HomeScreen: React.FC = () => {
  const { user } = useStore();
  const { userEvents } = eventStore();
  return (
    <ScrollView style={{ flex: 1 }}>
      {user ? (
        <Text style={{fontSize: 30, textAlign: 'center', marginTop: 10,padding:30, borderWidth: 7,borderStyle: 'solid', borderRadius: 60, marginLeft: 10, marginRight: 10, fontFamily: 'Cochin'}}>{`Bienvenid@, ${user.name || ''}`}</Text>
      ) : (
        <Text>Logeate</Text>
      )}
      {userEvents.map((event, index) => (
        <Card key={index} style={{ margin: 10 }}>
          <Card.Title title={event.title} subtitle={event.grade} style={{ backgroundColor: 'grey', borderTopLeftRadius: 14, borderTopRightRadius: 14}}></Card.Title>
          <Text style={{fontSize: 18, padding: 10}}>{event.description}</Text>
          <Card.Cover source={{ uri: `${event.image}`}}></Card.Cover>
        </Card>
      ))}

    </ScrollView>
  );
};
