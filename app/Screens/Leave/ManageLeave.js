import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getLeaveStatus } from "../../../services/api";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

const ManageLeave = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [sortBy, setSortBy] = useState("employee");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await getLeaveStatus();
        setLeaveData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Display an error message to the user
        Alert.alert("Error", "Failed to fetch leave data");
      }
    };
    fetchLeaveData();
  }, []);

  const sortedData = leaveData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  const handleSort = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.sortContainer}>
        <Button
          title="Sort by Employee"
          onPress={() => handleSort("employee")}
        />
        <Button title="Sort by Status" onPress={() => handleSort("status")} />
      </View> */}
      <FlatList
        data={sortedData}
        renderItem={({ item }) => <LeaveItem item={item} />}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

const LeaveItem = ({ item }) => {
  const name = `${item.appliedBy.fName} ${item.appliedBy.lName}`;
  let statusText, statusColor, statusIcon;

  switch (item.status) {
    case -1:
      statusText = "Rejected";
      statusColor = "#E57373";
      statusIcon = "close";
      break;
    case 0:
      statusText = "Pending";
      statusColor = "#FFB74D";
      statusIcon = "hourglass-empty";
      break;
    case 1:
      statusText = "Approved";
      statusColor = "#81C784";
      statusIcon = "check-circle";
      break;
    default:
      statusText = "Unknown";
      statusColor = "#BDBDBD";
      statusIcon = "help-outline";
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FontAwesome name="user-circle-o" size={40} color="#4F8EF7" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.leaveType}>{item.leaveType}</Text>
        </View>
        <MaterialIcons
          name={statusIcon}
          size={24}
          color={statusColor}
          style={styles.statusIcon}
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.dateText}>
          <MaterialIcons name="event" size={18} color="#333" /> {item.startDate}- {item.endDate}
        </Text>
        <Text style={styles.daysText}>{item.leaveDays>1 ? `${item.leaveDays} Days`:`${item.leaveDays} Day`}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      {item.status === 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleApprove(item.id)}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.declineButton]}
            onPress={() => handleReject(item.id)}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const handleApprove = (id) => {
};

const handleReject = (id) => {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: 20,
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: theme.colors.black, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textTransform: "capitalize",
  },
  leaveType: {
    fontSize: 14,
    color: "#888",
  },
  statusIcon: {
    marginLeft: 10,
  },
  details: {
    marginVertical: 10,
  },
  dateText: {
    flexDirection: "row",
    alignItems:'center',
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    verticalAlign:'middle'
  },
  daysText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#777",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  declineButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default ManageLeave;
