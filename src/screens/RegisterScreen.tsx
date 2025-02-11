import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { UserEntity } from '../entities/userEntity';
import useStore from '../store/userStore';
import SesionScreen from './SesionScreen';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Modal } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const RegisterComponent = ({ navigation }: { navigation: NativeStackNavigationProp<any> }) => {
  const { registerUser } = useStore();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 0};
  const [formData, setFormData] = useState<UserEntity>({
    name: '',
    age: 0,
    email: '',
    token: '',
    course: '',
    grade: '',
    module: '',
    events: []
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          value={formData.age.toString()}
          onChangeText={(text) => setFormData({...formData, age: parseInt(text) || 0})}
          keyboardType="numeric"
          placeholder="Enter your age"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          placeholder="Enter your email"
        />

        <Text style={styles.label}>contraseña</Text>
        <TextInput
          style={styles.input}
          value={formData.token}
          onChangeText={(text) => setFormData({...formData, token: text})}
          placeholder="Introduce tu contraseña"
        />

        <Text style={styles.label}>Curso</Text>
        <TextInput
          style={styles.input}
          value={formData.course}
          onChangeText={(text) => setFormData({...formData, course: text})}
          keyboardType='numeric'
          placeholder="En que curso te encuentra?"
        />

        <Text style={styles.label}>Modulo</Text>
        <TextInput
          style={styles.input}
          value={formData.grade}
          onChangeText={(text) => setFormData({...formData, grade: text})}
          placeholder="que módulo estás cursando"
        />

        <Text style={styles.label}>instituto</Text>
        <TextInput
          style={styles.input}
          value={formData.module}
          onChangeText={(text) => setFormData({...formData, module: text})}
          placeholder="instituto"
        />

        <TouchableOpacity style={styles.button} onPress={async () => {
          const reg = await registerUser(formData);
          if (reg) {
            navigation.navigate('Login');
          } else  {
            showModal();
          }
        }}>
          <Text style={styles.buttonText}>Register</Text>
          
        </TouchableOpacity>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text style={{fontSize: 30}}>El correo ya existe</Text>
        </Modal>
      </View>
    </ScrollView>
  );
};

const RegisterScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={RegisterComponent} />
      <Stack.Screen name="Login" component={SesionScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
