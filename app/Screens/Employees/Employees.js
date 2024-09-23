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

const EmployeeCard = ({ employee }) => {
  const img_url = employee.profilePicEnabled
    ? `https://api.gbsit.co.in/static/${employee.fileDir}/${employee.profilePicFileName}`
    : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png";

  const str_name = employee.mName
    ? `${employee.fName} ${employee.mName} ${employee.lName}`
    : `${employee.fName} ${employee.lName}`;

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: img_url }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.name}>{str_name}</Text>
          <Text style={styles.position}>{employee?.ceId || "Employee"}</Text>
        </View>
        <TouchableOpacity style={styles.menuIcon}>
          <Entypo name="dots-three-vertical" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <FontAwesome name="envelope" size={16} color="gray" />
          <Text style={styles.infoText}>{employee.email}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="phone" size={16} color="gray" />
          <Text style={styles.infoText}>{employee.userMobileNo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4F8EF7',
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  position: {
    fontSize: 14,
    color: '#888',
    textTransform:'uppercase'
  },
  infoContainer: {
    marginTop: 10,
    marginLeft:5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    marginLeft: 10,
  },
  menuIcon: {
    padding: 10,
  },
});
