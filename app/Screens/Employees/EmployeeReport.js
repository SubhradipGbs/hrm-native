import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/FontAwesome";
import { getEmployeeDetails } from "../../../services/api";
import Papa from 'papaparse';
import { shareAsync } from "expo-sharing";

const EmployeeReport = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmployeeDetails();
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = data.filter((item) =>
      `${item.fName} ${item.lName}`.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDownloadAll = () => {
    const downloadData = filteredData;
  };

  const flattenData = (data) => {
    return data.map((item) => ({
      employee_code: item.ceId,
      first_name: item.fName,
      middle_name: item.mName,
      last_name: item.lName,
      department: item.department?.dptName,
      designation: item.designation,
      nationality: item.nationality,
      dob: item.dob,
      gender: item.gender,
      marital_status: item.maritalStatus,
      mobile_number: item.userMobileNo,
      email: item.email,
      aadhaar_number: item.aaddharNo,
      pan_no: item.panNo,
      bank_name: item.bankName,
      ifsc_code: item.ifscCode,
      account_no: item.bnkacuntNo,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const save = (uri)=>{
    shareAsync(uri);
  }
  const handleDownload = async () => {
    try {
      const flatData = flattenData(filteredData);
      const csv = Papa.unparse(flatData);
      const fileUri = FileSystem.documentDirectory + "employees.csv";
      await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
      save(fileUri);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const renderItem = ({ item }) => (
    <>
      <View style={styles.card}>
        <Text style={styles.title}>Name: {`${item.fName} ${item.lName}`}</Text>
        <View style={styles.dobContainer}>
          <Icon name="id-card" size={18} color="#666" style={styles.dobIcon} />
          <Text style={styles.dobText}>Mobile No:</Text>
          <Text>{item.userMobileNo}</Text>
        </View>
        <View style={styles.dobContainer}>
          <Icon name="envelope" size={18} color="#666" style={styles.dobIcon} />
          <Text style={styles.dobText}>Email:</Text>
          <Text>{item.email}</Text>
        </View>
        <View style={styles.dobContainer}>
          <Icon
            name="birthday-cake"
            size={18}
            color="#666"
            style={styles.dobIcon}
          />
          <Text style={styles.dobText}>Date of Birth:</Text>
          <Text>{formatDate(item.dob)}</Text>
        </View>

        <View style={styles.dobContainer}>
          <Icon name="id-card" size={18} color="#666" style={styles.dobIcon} />
          <Text style={styles.dobText}>PAN No:</Text>
          <Text>{item.panNo}</Text>
        </View>
        <View style={styles.dobContainer}>
          <Icon name="id-card" size={18} color="#666" style={styles.dobIcon} />
          <Text style={styles.dobText}>Aadhaar No:</Text>
          <Text>{item.aaddharNo || "N/A"}</Text>
        </View>
        {/* <Text>{`${item.parmanentAddress}`}</Text>
                {item.parmanentAddress.map((field, fieldIndex) => (
                    <Text>{`${field.address} ${field.city}`}</Text>
                ))}  */}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
      <TouchableOpacity
        onPress={handleDownload}
        style={styles.downloadAllButton}
      >
        <Text style={styles.downloadAllButtonText}>Download All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  downloadAllButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  downloadAllButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  emailLabel: {
    fontWeight: "bold",
  },
  emailAddress: {
    color: "blue",
  },
  dobContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  dobIcon: {
    marginRight: 8,
  },
  dobText: {
    // color: 'green',
    fontWeight: "bold",
  },
});

export default EmployeeReport;
