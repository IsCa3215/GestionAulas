import { StyleSheet, View, StatusBar, TextInput, Button, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from "react";
import useStore from "../store/userStore";
import { MainScreen } from "./MainScreen";
import { joinEvent, loginUser } from "../services/connection";
import RegisterScreen from "./RegisterScreen";
import { UserEntity, UserEntityLogin } from "../entities/userEntity";

const Stack = createNativeStackNavigator();

const LoginComponent = ({ navigation }: { navigation: NativeStackNavigationProp<any> }) => {
  const { loginUserStore, user, loading} = useStore();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#005D8C" barStyle="light-content" />
      <Icon name="rocket" size={40} color="#FFFFFF" style={styles.icon} />
      <Text style={styles.texto}>Bienvenido</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Correo Electrónico"
        placeholderTextColor="#A7C7D7" 
        onChangeText={setEmail} 
        value={email} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        placeholderTextColor="#A7C7D7" 
        onChangeText={setPassword} 
        value={password} 
        secureTextEntry
      />
      <Button 
        title="Iniciar sesión" 
        color="#005D8C"
        onPress={async () => {
          const entity: UserEntityLogin = {
            email: email,
            password: password
          }
          const result = await loginUserStore(entity);

          if (result) {
            const tal = await joinEvent(1, result);
            console.log(tal);
            navigation.navigate('Main');
          }
        }} 
      />
      <View style={styles.footer}>
        <Button 
          title="Registrarse" 
          color="#000"
          onPress={() => navigation.navigate('Register')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F4FF", 
    padding: 20,
  },
  icon: {
    marginBottom: 30,
  },
  texto: {
    fontSize: 36, 
    fontWeight: "bold", 
    color: "#005D8C", 
    marginBottom: 20,
  },
  input: {
    width: "100%", 
    height: 50,
    borderWidth: 1,
    borderColor: "#005D8C", 
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20, 
    backgroundColor: "#FFFFFF", 
    fontSize: 16,
  },
  button: {
    backgroundColor: "#005D8C", 
    borderRadius: 800,
    borderWidth: 10,
    width: "100%", 
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, 
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center", 
    marginTop: 20,
  },
});

const SesionScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SesionScreen;
