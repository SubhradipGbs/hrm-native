import { NavigationContainer } from "@react-navigation/native";
import MainLayout from "./MainLayout/MainLayout";
import "react-native-reanimated";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/app/Screens/Auth/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ToastProvider placement='bottom' duration={2000}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer independent={true}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="home" component={MainLayout} options={{}} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </ToastProvider>
  );
}
