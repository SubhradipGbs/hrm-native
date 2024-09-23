import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchProjectData, fetchProjectDetails } from "../../../services/api";
import { theme } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";

const Projects = () => {
  const [getdata, setData] = useState([]);
  const [getProjectdata, setProjectdata] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProjectData();
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = getdata.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchQuery, getdata]);

  const fetchProject = async (projectId) => {
    try {
      const response = await fetchProjectDetails(projectId);
      setProjectdata(response.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const toggleModal = (project) => {
    if (project) {
      fetchProject(project._id);
      setSelectedProject(project);
    }
    setModalVisible(!modalVisible);
  };

  const ProjectCard = ({ item, toggleModal }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => toggleModal(item)}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{item.projectName}</Text>

            <View style={styles.infoRow}>
              <FontAwesome name="code" size={16} color={theme.colors.gray} />
              <Text style={styles.cardText}>
                Project Code: {item.projectCode}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="building" size={16} color={theme.colors.gray} />
              <Text style={styles.cardText}>
                Department: {item.departments.dptName}
              </Text>
            </View>
          </View>

          <Icon name="chevron-right" size={28} color="#4F8EF7" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />
      {/* {filteredData.length === 0 ? (
        <Text style={styles.emptyText}>No projects found</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => toggleModal(item)}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>{item.projectName}</Text>
                  <Text style={styles.cardText}>
                    Project Code: {item.projectCode}
                  </Text>
                  <Text style={styles.cardText}>
                    Department: {item.departments.dptName}
                  </Text>
                </View>
                <Icon name="chevron-right" size={24} color="#333" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )} */}

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item._id}
        renderItem={ProjectCard}
        contentContainerStyle={{ gap: 10 }}
      />

      <Modal
        visible={modalVisible}
        onRequestClose={toggleModal}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {getProjectdata ? (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {getProjectdata.projectName}
                  </Text>
                  <TouchableOpacity onPress={toggleModal}>
                    <Icon name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.modalBody}>
                  {getProjectdata.departments ? (
                    <View>
                      <Text style={styles.sectionTitle}>
                        Department ID: {getProjectdata.departments.dptId}
                      </Text>
                      <Text style={styles.sectionTitle}>
                        Department Name: {getProjectdata.departments.dptName}
                      </Text>
                    </View>
                  ) : (
                    <Text>No department data available</Text>
                  )}
                  <Text style={styles.sectionTitle}>Assigned Users:</Text>
                  {getProjectdata.assignUsers.length > 0 ? (
                    getProjectdata.assignUsers.map((user, index) => (
                      <View key={index} style={styles.userRow}>
                        <Icon name="account" size={20} color="#333" />
                        {user ? (
                          <Text style={styles.userName}>
                            {" "}
                            {user.fName} {user.lName}
                          </Text>
                        ) : (
                          <Text style={{ marginLeft: 10 }}>
                            No user data available
                          </Text>
                        )}
                      </View>
                    ))
                  ) : (
                    <Text>No assigned users found</Text>
                  )}
                </ScrollView>
              </>
            ) : (
              <Text>No project details available</Text>
            )}
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: theme.colors.white,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardDetails: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    // padding: 16,
    // width: '80%',
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 16,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  modalBody: {
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 16,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    paddingVertical: 16,
  },
  userName: {
    marginLeft: 8,
    color: "#333",
  },
});

export default Projects;
