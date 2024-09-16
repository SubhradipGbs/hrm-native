import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerComponent from "../components/CustomDrawerComponent";
import MyStack from "../MyStack/MyStack";
import { theme } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const MainLayout = ({route,navigation}) => {
  const {menuItems}=route.params;

  

  useEffect(()=>{
    navigation.addListener('beforeRemove',(e)=>{

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Logout',
        'You sure want to logout?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Logout',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    })
  },[])

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerComponent}
      headerStyle={{ backgroundColor: "#000" }}
      screenOptions={{
        headerStyle: { backgroundColor: `${theme.colors.black}` },
        headerTintColor: theme.colors.white,
        drawerActiveBackgroundColor: theme.colors.white,
        drawerActiveTintColor: theme.colors.black,
        drawerInactiveTintColor: theme.colors.white,
        // drawerLabelStyle: { marginLeft: -20 },
        // drawerHideStatusBarOnOpen:true,
        drawerStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      {menuItems.map((item) => (
        <Drawer.Screen
          key={item._id}
          name={item.name}
          component={item.child.length > 0 ? MyStack : MyScreen}
          //   component={MyScreen}
          initialParams={{ item }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default MainLayout;

const MyScreen = () => {
  return (
    <View>
      <Text>My Screen</Text>
    </View>
  );
};
