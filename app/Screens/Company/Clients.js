import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {getClients} from '../../../services/api';
import { Entypo, FontAwesome } from "@expo/vector-icons";

const Clients = () => {
  const [clientsData, setClientsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newClient, setNewClient] = useState({
    clientCode: "",
    clientName: "",
    clientAddress: "",
    clientEmailId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClients();
        setClientsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setNewClient({
      clientCode: "",
      clientName: "",
      clientAddress: "",
      clientEmailId: "",
    });
  };

  const handleInputChange = (name, value) => {
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = async () => {
    try {
      const response = await addClient(newClient);
      setClientsData([...clientsData, response.data]);
      handleModalClose();
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.companyItem}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Icon name="account-group" size={25} color="#333" />
          <Text style={styles.clientName}>{item.clientName}</Text>
        </View>
        <Text style={styles.clientCode}>{item.clientCode}</Text>
      </View>
      <View style={styles.addressContainer}>
        <FontAwesome name="map-marker" size={18} color="gray" />
        <Text style={styles.clientAddress}>{item.clientAddress}</Text>
      </View>
      <View style={styles.addressContainer}>
        <Entypo name="email" color="gray" />
        <Text style={styles.clientEmail}>{item.clientEmailId}</Text>
      </View>
      <Text style={styles.projectsTitle}>Projects:</Text>
      {item.projects.map((project) => (
        <Text key={project._id} style={styles.projectName}>
          - {project.projectName}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleModalOpen}>
        <Icon name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add New Client</Text>
      </TouchableOpacity>
      <FlatList
        data={clientsData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Client</Text>
            <TouchableOpacity onPress={handleModalClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              style={styles.input}
              placeholder="Client Code"
              onChangeText={(text) => handleInputChange("clientCode", text)}
              value={newClient.clientCode}
            />
            <TextInput
              style={styles.input}
              placeholder="Client Name"
              onChangeText={(text) => handleInputChange("clientName", text)}
              value={newClient.clientName}
            />
            <TextInput
              style={styles.input}
              placeholder="Client Address"
              onChangeText={(text) => handleInputChange("clientAddress", text)}
              value={newClient.clientAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Client Email ID"
              onChangeText={(text) => handleInputChange("clientEmailId", text)}
              value={newClient.clientEmailId}
            />
          </View>
          <View style={styles.modalFooter}>
            <Button title="Add Client" onPress={handleAddClient} color="#333" />
            <Button title="Cancel" onPress={handleModalClose} color="#333" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E3163",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  companyItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  clientCode: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  clientAddress: {
    fontSize: 16,
    color: "gray",
    marginBottom: 4,
  },
  clientEmail: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
  },
  projectsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop:10,
    marginBottom: 4,
    marginLeft: 5,
  },
  projectName: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalBody: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    gap: 10,
    marginLeft: 5,
  },
});

export default Clients;
