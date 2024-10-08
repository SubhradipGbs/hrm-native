import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageLeave from "@/app/Screens/Leave/ManageLeave";
import NewLayout from "./NewLayout";
import LeaveType from "@/app/Screens/Leave/LeaveType";
import Employees from "@/app/Screens/Employees/Employees";
import EmployeeReport from "@/app/Screens/Employees/EmployeeReport";
import Clients from "@/app/Screens/Company/Clients";
import Company from "@/app/Screens/Company/Company";
import Masters from "@/app/Screens/Company/Masters";
import Projects from "@/app/Screens/Time/Projects";
import Timesheet from "@/app/Screens/Time/Timesheet";
import ViewTimesheet from "@/app/Screens/Time/ViewTimesheet";
import ExpenseReport from "@/app/Screens/Expense/ExpenseReport";

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
      <Stack.Screen
        name="/clients"
        component={Clients}
        options={{ title: "Clients" }}
      />
      <Stack.Screen
        name="/company"
        component={Company}
        options={{ title: "Company Structure" }}
      />
      <Stack.Screen
        name="/masters"
        component={Masters}
        options={{ title: "Masters", headerShown:false }}
      />
      <Stack.Screen
        name="/projects"
        component={Projects}
        options={{ title: "Projects" }}
      />
      <Stack.Screen
        name="/timesheet"
        component={Timesheet}
        options={{ title: "Projects" }}
      />
      <Stack.Screen
        name="/view-timesheet"
        component={ViewTimesheet}
        options={{ title: "Projects" }}
      />
      <Stack.Screen
        name="/expense-report"
        component={ExpenseReport}
        options={{ title: "Expense" }}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
