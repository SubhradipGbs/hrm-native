import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getCompanyBranch } from "../../../services/api";
import { theme } from "@/constants/theme";

const Company = () => {
  const [companyData, setcompanyData] = useState([]);
  useEffect(() => {
    const fetchcompanyData = async () => {
      try {
        const response = await getCompanyBranch();
        setcompanyData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchcompanyData();
  }, []);

  const renderItem = ({ item }) => {
    function getRandomPastelColor() {
      const r = Math.floor((Math.random() * 100) + 80);
      const g = Math.floor((Math.random() * 100) + 50);
      const b = Math.floor((Math.random() * 100));
  
      const toHex = (value) => value.toString(16).padStart(2, "0");
  
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    const color = getRandomPastelColor();
    return (
      <View style={[styles.companyItem,{backgroundColor:color}]}>
        <View style={styles.headerContainer}>
          <View style={styles.officeNameContainer}>
            <Icon name="business" size={20} color="#fff" />
            <Text style={styles.officeNameText}>{item.officeName}</Text>
          </View>
          <Text style={styles.officeCodeText}>{item.officeCode}</Text>
        </View>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <View style={styles.addressContainer}>
          <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
            <Icon name="location-on" size={15} color="#000"/>
            <Text style={styles.addressText}>{item.address}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
            <Icon name="language" size={15} color="#000"/>
            <Text style={styles.countryText}>{item.country}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.backgroundImage}>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add New Branch</Text>
      </TouchableOpacity>
      <FlatList
        data={companyData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 10,
          paddingTop:5,
          paddingBottom:20
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  companyItem: {
    gap: 10,
    padding: 10,
    // borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    // backgroundColor: theme.colors.white,
    // marginBottom: 10,
    marginHorizontal: 5,
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  officeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  officeNameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color:theme.colors.white
  },
  officeCodeText: {
    fontSize: 16,
    color: theme.colors.black,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 8,
    color:theme.colors.white,
    textTransform:'capitalize',
    fontWeight:'700'
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressText: {
    fontSize: 14,
    color: theme.colors.black,
  },
  countryText: {
    fontSize: 14,
    color: theme.colors.black,
  },
  addButton:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  addButtonText:{
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  }
});

export default Company;
