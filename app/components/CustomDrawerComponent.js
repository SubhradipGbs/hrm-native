import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { theme } from "@/constants/theme";
import { Feather, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerComponent = (props) => {
  const [user, setUser] = useState(null);
  const {navigation}=props;
  console.log(navigation);

  const logout=()=>{
    AsyncStorage.clear();
    navigation.navigate("login")
  }

  useEffect(() => {
    AsyncStorage.getItem("userdetails").then((value) =>
      setUser(JSON.parse(value))
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={require("../../assets/images/profile.png")}
            />
          </View>
          <Text style={styles.profileName}>
            {user?.fName} {user?.lName}
          </Text>
          <Text style={styles.designation}>{user?.designation}</Text>
        </View>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: "#fff",
            marginHorizontal: 15,
            marginBottom: 10,
          }}
        />
        <DrawerItemList {...props} />
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: "#fff",
            marginHorizontal: 15,
            marginBottom: 10,
          }}
        />
        <DrawerItem
          label="Logout"
          onPress={logout}
          activeBackgroundColor={theme.colors.white}
          inactiveTintColor="#C7253E"
          activeTintColor={theme.colors.black}
          icon={({ color }) => (
            <Feather name="log-out" size={24} color={color} />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    height: 150,
    backgroundColor: "#000",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    resizeMode: "contain",
  },
  profileName: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    color: "#fff",
  },
  designation: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 10,
    color: "#fff",
  },
});

export default CustomDrawerComponent;
