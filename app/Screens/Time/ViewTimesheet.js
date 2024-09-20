import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Button,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { getTimesheetData } from "../../../services/api";
import { theme } from "@/constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';

const ViewTimesheet = () => {
  const [timesheet, setTimesheet] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchProject, setSearchProject] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowdate] = useState(false);
  const [dateString, setDateString] = useState("");

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      console.log(currentDate);
      setDate(currentDate);
      if (Platform.OS === "android") {
        setShowdate((prev) => !prev);
        setDateString(currentDate.toDateString());
      }
    } else {
      setShowdate((prev) => !prev);
    }
  };

  useEffect(() => {
    const fetchTimesheetData = async () => {
      try {
        const response = await getTimesheetData();
        setTimesheet(response.data);
        setFilteredData(response.data);
        setProjects(
          Array.from(
            new Set(response.data.map((item) => item.projectId.projectName))
          )
        );
        console.log(projects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTimesheetData();
  }, []);

  const renderTimesheetItem = ({ item }) => {
    const name = `${item.empId.fName} ${item.empId.lName}`;
    const entrytime = moment(item.enterTime).format("HH:mm:ss");
    const exitTime = moment(item.exitTime).format("HH:mm:ss");
    const formattedDate = moment(item.dateString).format("DD-MM-YYYY");

    return (
      <View style={styles.timesheetItem}>
        <View style={styles.headerContainer}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.taskContainer}>
            <Ionicons name="clipboard-outline" size={20} color="#666" />
            <Text style={styles.task}>
              {item.description || "No task description provided"}
            </Text>
          </View>
          <View style={styles.project}>
            <Ionicons name="briefcase-outline" size={20} color="#666" />
            <Text
              style={styles.projectName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.projectId.projectName}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.timeItem}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.time}>Entry Time: {entrytime}</Text>
            </View>
            <View style={styles.timeItem}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.time}>Exit Time: {exitTime}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Timesheet</Text>
          <View>
            {isFiltered ? (
              <TouchableOpacity
                style={[
                  styles.clearFilterButton,
                  { backgroundColor: theme.colors.danger },
                ]}
              >
                <MaterialCommunityIcons
                  name="filter-off"
                  size={15}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.clearFilterButton,
                  { backgroundColor: theme.colors.success },
                ]}
                onPress={() => setOpenFilter(true)}
              >
                <MaterialCommunityIcons
                  name="filter"
                  size={15}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            )}
          </View>
          <Modal visible={openFilter} animationType="slide" transparent>
            <View style={styles.pickerMainContainer}>
              <View style={styles.pickerContainer}>
                <View style={styles.pickerHeader}>
                  <Text style={{ fontSize: 15 }}>Filter</Text>
                  <Pressable onPress={() => setOpenFilter(false)}>
                    <MaterialCommunityIcons
                      name="close"
                      size={20}
                      color={theme.colors.black}
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    borderWidth:1,
                    marginTop:20,
                    backgroundColor: "#f9f9f9",
                    justifyContent: "center",
                  }}
                >
                  <Picker
                    selectedValue={searchProject}
                    onValueChange={(itemValue) => setSearchProject(itemValue)}
                    // style={styles.picker}
                  >
                    <Picker.Item label="Select a project" value="" />
                    {projects.map((project) => (
                      <Picker.Item
                        key={project}
                        label={project}
                        value={project}
                      />
                    ))}
                  </Picker>
                </View>
                <View>
                  <Pressable onPress={() => setShowdate((prev) => !prev)}>
                    <TextInput
                      value={dateString}
                      editable={false}
                      placeholder="select date"
                      style={styles.dateInput}
                    />
                  </Pressable>
                  {showDate && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="spinner"
                      onChange={onChange}
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={styles.pickerButton}
                  onPress={() => {
                    setDateString("");
                    setOpenFilter(false);
                  }}
                >
                  <Text style={styles.pickerButtonText}>Apply Filter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  clearFilterButton: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pickerMainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    justifyContent: "center",
    marginTop: 50,
    marginHorizontal: 16,
  },
  pickerHeader: {
    width: "100%",
    borderBottomWidth: 1,
    // padding: 15,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  pickerButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  dateInput: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default ViewTimesheet;
