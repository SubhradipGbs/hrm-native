import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getcompanyData,
  geteducationData,
  getLanguageData,
} from "../../../services/api";

const Masters = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [getEducation, setEducation] = useState([]);
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "departments", icon: "building" },
    { key: "skills", icon: "briefcase" },
    { key: "education", icon: "graduation-cap" },
    { key: "certifications", icon: "certificate" },
    { key: "languages", icon: "language" },
  ]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setName("");
    setID("");
  };
  const handleSubmit = () => {
    closeModal();
  };
  const [getDepartment, setDepartment] = useState([]);
  useEffect(() => {
    const fetchcompanyData = async () => {
      try {
        const response = await getcompanyData();
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchcompanyData();
  }, []);


  useEffect(() => {
    const fetcheducationData = async () => {
      try {
        const response = await geteducationData();
        setEducation(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetcheducationData();
  }, []);

  const [getLanguage, setLanguage] = useState([]);

  useEffect(() => {
    const fetchLanguageData = async () => {
      try {
        const response = await getLanguageData();
        console.log(response.data);
        // setLanguage(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchLanguageData();
  }, []);

  const EducationCard = ({ education }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{education.eduName}</Text>
      <Text style={styles.name}>{education.description}</Text>
    </View>
  );

  const LanguageCard = ({ language }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{language.language}</Text>
      <Text style={styles.name}>{language.description}</Text>
    </View>
  );

  const DepartmentCard = ({ department, onEdit, onDelete }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{department.dptName}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onEdit(department)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onDelete(department._id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderScene = SceneMap({
    departments: () => (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.NameContainer}>
            <Text style={styles.NameText}>Departments</Text>
          </View>
          <Button title="Add Departments" onPress={openModal} />
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Department</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ID"
                  value={id}
                  onChangeText={setID}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Submit" onPress={handleSubmit} />
                  <Button title="Close" onPress={closeModal} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {getDepartment.map((department) => (
          <DepartmentCard
            key={department._id}
            department={department}
            onEdit={(dept) => console.log(`Edit ${dept.name}`)}
            onDelete={(id) => console.log(`Delete department with id ${id}`)}
          />
        ))}
      </View>
    ),
    skills: () => (
      <View style={styles.scene}>
        <Text>Skills Tab</Text>
      </View>
    ),
    education: () => (
      <View style={styles.container}>
        {getEducation.map((education) => (
          <EducationCard key={education._id} education={education} />
        ))}
      </View>
    ),
    certifications: () => (
      <View style={styles.scene}>
        <Text>Certifications Tab</Text>
      </View>
    ),
    languages: () => (
      <View style={styles.container}>
        {getLanguage.map((language) => (
          <LanguageCard key={language._id} language={language} />
        ))}
      </View>
    ),
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor="white"
      inactiveColor="gray"
      style={styles.tabBar}
      renderIcon={({ route, focused }) => (
        <Icon name={route.icon} size={18} color={focused ? "white" : "gray"} />
      )}
      indicatorStyle={{ backgroundColor: "transparent" }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    backgroundColor: "#13294B",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#FFCE56",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#007aff",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  NameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  NameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Masters;
