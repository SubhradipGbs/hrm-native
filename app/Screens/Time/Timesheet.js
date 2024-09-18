import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { getProjectsAll } from "../../../services/api";
import Dropdown from "./Dropdown";
import { Ionicons } from "@expo/vector-icons";
import { mainStyle } from "@/app/styles";

const Timesheet = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [timesheetData, setTimesheetData] = useState({
    project: "",
    task: "",
    login: "",
    logout: "",
    description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjectsAll();
      const data = response.data;
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setTimesheetData({ ...timesheetData, [name]: value });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <DatePicker
        mode="calendar"
        selected={selectedDate}
        onDateChange={handleDateSelect}
        style={{ flex: 1 }}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={mainStyle.modalContainer}>
          <View style={mainStyle.modalBody}>
            {/* Modal Header */}
            <View style={mainStyle.modalHeader}>
              <Text style={mainStyle.modalTitle}>Add Timesheet</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <View>
              <Text style={mainStyle.modalLabel}>Date:</Text>
              <TextInput
                value={selectedDate}
                editable={false}
                style={mainStyle.modalInput}
              />

              <Text style={mainStyle.modalLabel}>Day:</Text>
              <TextInput
                value={
                  selectedDate
                    ? new Date(selectedDate).toDateString().split(" ")[0]
                    : ""
                }
                editable={false}
                style={mainStyle.modalInput}
              />

              <Text style={mainStyle.modalLabel}>Project:</Text>
              <Dropdown
                data={projects.map((project) => ({
                  label: project.projectName,
                  value: project.projectCode,
                }))}
                value={timesheetData.project}
                onChange={(value) => handleInputChange("project", value)}
              />

              <Text style={mainStyle.modalLabel}>Task:</Text>
              <TextInput
                value={timesheetData.task}
                onChangeText={(value) => handleInputChange("task", value)}
                placeholder="Task"
                style={mainStyle.modalInput}
              />

              <View style={mainStyle.modalTimeContainer}>
                <View>
                  <Text style={mainStyle.modalLabel}>Login:</Text>
                  <TextInput
                    value={timesheetData.login}
                    onChangeText={(value) => handleInputChange("login", value)}
                    placeholder="--:--"
                    style={mainStyle.modalTimeInput}
                    keyboardType="number-pad"
                  />
                </View>

                <View>
                  <Text style={mainStyle.modalLabel}>Logout:</Text>
                  <TextInput
                    value={timesheetData.logout}
                    onChangeText={(value) => handleInputChange("logout", value)}
                    placeholder="--:--"
                    style={mainStyle.modalTimeInput}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <Text style={mainStyle.modalLabel}>Description:</Text>
              <TextInput
                value={timesheetData.description}
                onChangeText={(value) =>
                  handleInputChange("description", value)
                }
                multiline
                numberOfLines={4}
                style={mainStyle.modalTextArea}
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={closeModal}
              style={mainStyle.modalButton}
            >
              <Text style={mainStyle.modalButtonText}>Save</Text>
            </TouchableOpacity>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalInput: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
  modalTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTimeInput: {
    width: "48%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  modalTextArea: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    height: 80,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Timesheet;
