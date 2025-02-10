import { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList } from "react-native";
import { registerUser } from "../services/connection";
 
const RegisterScreen: React.FC = () => {
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [edad, setEdad] = useState('');

  const modulos = [
    {label: 'FPB', value: '1'},
    {label: 'ESO', value: '2'},
    {label: 'Bachiller', value: '3'},
  ]
  const cursos = [
    {label: '1º', value: '1'},
    {label: '2º', value: '2'},
    {label: '3º', value: '3'},
    {label: '4º', value: '4'},
  ]


  return (
    <SafeAreaView>
      <View>
        <Text >Crear Cuenta</Text>e

        <TextInput
          placeholder="Username"
          value={UserName}
          onChangeText={setUserName}
        />

        <TextInput
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          value={Password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Edad"
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
          maxLength={2}
        />
        


        <TouchableOpacity  >
          <Text >Registrarse</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default RegisterScreen;