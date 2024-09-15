import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageLeave from "@/app/Screens/Leave/ManageLeave";
import Home from ".";

const Stack = createNativeStackNavigator();

const MyStack = ({ route }) => {
  const { item } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        initialParams={{ item }}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="/manageleave" component={ManageLeave} options={{title:'Manage Leave'}}/>
    </Stack.Navigator>
  );
};

export default MyStack;
