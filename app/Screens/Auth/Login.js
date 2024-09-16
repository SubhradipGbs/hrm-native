import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { login, setToken, getUserDetails, getSideMenu } from '../../../services/api';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("admingbs@gbsit.co.in");
  const [password, setPassword] = useState("Admin1$");

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      if (response.statusCode === 1) {
        const token_value = response.data.access_token;
        const user_id = response.data.userId;
        setToken(token_value);
        await AsyncStorage.setItem("token", "Bearer " + token_value);
        await AsyncStorage.setItem("assignUser", user_id);
        const username = await getUserDetails(user_id);
        await AsyncStorage.setItem("userdetails", JSON.stringify(username?.data));
        const menuItems = await getSideMenu();
        navigation.navigate("home", { menuItems: menuItems.data });
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />

      <Text style={styles.welcomeText}>Welcome to myHRM</Text>
      {/* <Text style={styles.title}>Login</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        backgroundColor={"rgba(255, 255, 255, 0.5)"}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  //   backgroundImage: {
  //     flex: 1,
  //     resizeMode: 'cover',
  //     width: '100%',
  //     height: '100%',
  //     justifyContent: 'center',
  //   },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#ffff",
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
