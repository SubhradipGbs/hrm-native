import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawerComponent = (props) => {

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
          <Text style={styles.profileName}>Subhradip Nath</Text>
          <Text style={styles.designation}>Junior Software Developer</Text>
        </View>
        <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: "#fff", marginHorizontal: 15, marginBottom: 10 }} />
        <DrawerItemList {...props} />
        {/* <DrawerItem  label="Logout" onPress={()=>router.push('/app/index')} activeBackgroundColor={theme.colors.white} inactiveTintColor={theme.colors.white} activeTintColor={theme.colors.black}/> */}
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
