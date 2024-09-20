import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getAllEmployees } from "../../../services/api";
import { theme } from "@/constants/theme";
import { Entypo, FontAwesome } from "@expo/vector-icons";

function EmployeeCard({ employee, index }) {
  const img_url = employee.profilePicEnabled
    ? "https://api.gbsit.co.in/static/" +
      employee.fileDir +
      "/" +
      employee.profilePicFileName +
      ""
    : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png";

  var str_name;
  if (employee.mName) {
    str_name = employee.fName + " " + employee.mName + " " + employee.lName;
  } else {
    str_name = employee.fName + " " + employee.lName;
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.card}>
      <Image
        source={{
          uri: img_url
            ? img_url
            : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png",
        }}
        style={styles.image}
      />
      <View
        style={{
          width: StyleSheet.hairlineWidth,
          backgroundColor: theme.colors.nutral,
          marginRight: 10,
          marginVertical: 15,
        }}
      />
      <View>
        <View style={styles.row}>
          <FontAwesome name="user" size={20} color="gray" />
          <Text style={styles.name}>{str_name}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="briefcase" size={18} color="gray" />
          <Text style={styles.nrmltext}>{employee.email}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="phone" size={20} color="gray" />
          <Text style={styles.nrmltext}>{employee.userMobileNo}</Text>
        </View>
      </View>
      <View style={{ position: "absolute", right: 10, top: 15 }}>
        <Entypo name="dots-three-vertical" size={15} color="black" />
      </View>
    </TouchableOpacity>
  );
}

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllEmployees();
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large"/>
      ) : (
        <FlatList
          data={employees}
          renderItem={({ item, index }) => (
            <EmployeeCard employee={item} index={index} />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap:10,paddingHorizontal:12,paddingTop:10,paddingBottom:20}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
    textTransform: "capitalize",
    color: theme.colors.gray,
  },
  nrmltext: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
    color: theme.colors.nutral,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
});
