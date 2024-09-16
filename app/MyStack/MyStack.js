import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageLeave from "@/app/Screens/Leave/ManageLeave";
import Home from ".";
import NewLayout from "./NewLayout";
import LeaveType from '@/app/Screens/Leave/LeaveType';
import Employees from '@/app/Screens/Employees/Employees';
import EmployeeReport from '@/app/Screens/Employees/EmployeeReport';



const Stack = createNativeStackNavigator();

const MyStack = ({ route }) => {
  const { item } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={NewLayout}
        initialParams={{ item }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/manageleave"
        component={ManageLeave}
        options={{ title: "Manage Leave" }}
      />
      <Stack.Screen
        name="/leavetype"
        component={LeaveType}
        options={{ title: "Leave Types" }}
      />
      <Stack.Screen
        name="/employee"
        component={Employees}
        options={{ title: "Employees" }}
      />
      <Stack.Screen
        name="/emp-report"
        component={EmployeeReport}
        options={{ title: "Employee Report" }}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
