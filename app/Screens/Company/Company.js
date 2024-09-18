import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getCompanyBranch } from '../../../services/api';


const Company = () => {
  const [companyData, setcompanyData] = useState([]);
  useEffect(() => {
    const fetchcompanyData = async () => {
      try {
        const response = await getCompanyBranch();
        setcompanyData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    fetchcompanyData();
  }, []);


  const renderItem = ({ item }) => {
    return (

      <View style={styles.companyItem}>
        <View style={styles.headerContainer}>
          <View style={styles.officeNameContainer}>
            <Icon name="business" size={20} color="#333" />
            <Text style={styles.officeNameText}>{item.officeName}</Text>
          </View>
          <Text style={styles.officeCodeText}>{item.officeCode}</Text>
        </View>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{item.address}</Text>
          <Text style={styles.countryText}>{item.country}</Text>
        </View>
      </View>

    );
  };

  return (
    <View style={styles.backgroundImage}>
      <FlatList
        data={companyData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyItem: {
    backgroundColor: '#FFCE56',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  officeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  officeNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  officeCodeText: {
    fontSize: 16,
    color: 'gray',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressText: {
    fontSize: 14,
    color: 'gray',
  },
  countryText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Company;