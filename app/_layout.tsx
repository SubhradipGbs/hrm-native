import { NavigationContainer } from "@react-navigation/native";
import MainLayout from "./MainLayout/MainLayout";
import "react-native-reanimated";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '@/app/Screens/Auth/Login'

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={MainLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
