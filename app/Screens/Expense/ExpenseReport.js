import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getExpenseData } from "@/services/api";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { theme } from "@/constants/theme";

const ExpenseCard = ({ item, onApprove, onReject, onDetails }) => {
  const status = item.status;
  return (
    <View style={styles.cardContainer}>
      {/* Expense Info */}
      <View style={styles.cardHeader}>
        <View style={styles.userContainer}>
          <View style={styles.userIcon}>
            <FontAwesome name="user-circle-o" size={40} color="#4F8EF7" />
          </View>
          <Text style={styles.expenseTitle}>
            {item.appliedBy.fName} {item.appliedBy.lName}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={onDetails}>
            <AntDesign
              name="infocirlceo"
              size={20}
              color={theme.colors.nutral}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.expenseSubtitle}>
          Project: {item.project.projectName}
        </Text>
        <Text style={styles.expenseDate}>
          Applied on: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.expenseAmount}>Amount: ₹{item.totalAmount}</Text>
        {item.status === 0 ? (
          <View style={[styles.status]}>
            <MaterialIcons name="pending-actions" size={24} color="orange" />
            <Text style={{ color: "orange" }}>Pending</Text>
          </View>
        ) : item.status === 1 ? (
          <View style={styles.status}>
            <MaterialIcons name="check-circle" size={24} color="green" />
            <Text style={{ color: "green" }}>Approved</Text>
          </View>
        ) : (
          <View style={styles.status}>
            <MaterialIcons name="cancel" size={24} color="red" />
            <Text style={{ color: "red" }}>Declined</Text>
          </View>
        )}
      </View>
      {status === 0 && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => onApprove(item._id)}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.declineButton]}
            onPress={() => onReject(item._id)}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const ExpenseReport = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenseData,
    select: (data) => data.data,
  });

  const handleApprove = () => {};
  const handleReject = () => {};

  const showDetails = (item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ExpenseCard
            item={item}
            onApprove={handleApprove}
            onReject={handleReject}
            onDetails={() => {
              showDetails(item);
            }}
          />
        )}
      />
      <Modal visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Details:</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {currentItem?.appliedBy.fName} {currentItem?.appliedBy.lName}
              </Text>
            </View>
            <Text>Expenses:</Text>
            <ScrollView>
              {currentItem !== null &&
                currentItem?.expenceList.length > 0 &&
                currentItem.expenceList.map((expense, index) => (
                  <View key={index} style={styles.expense}>
                    <View style={styles.expenseDesc}>
                      <Text style={{ fontSize: 20 }}>
                        {expense.descriptions}
                      </Text>
                      <Text>{expense.date}</Text>
                    </View>

                    {expense ? (
                      <Text style={{ fontSize: 18 }}>₹ {expense.amount}</Text>
                    ) : (
                      <Text style={{ marginLeft: 10 }}>No data available</Text>
                    )}
                  </View>
                ))}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
                marginHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>Total Amount :</Text>
              <Text style={{ fontSize: 18 }}>₹ {currentItem?.totalAmount}</Text>
            </View>
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[
                styles.modalButtons,
                { backgroundColor: theme.colors.success },
              ]}
            >
              <Text style={styles.modalButtonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButtons,
                { backgroundColor: theme.colors.danger },
              ]}
            >
              <Text style={styles.modalButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExpenseReport;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 4,
    flexDirection: "column",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userIcon: {},
  expenseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardContent: {
    marginVertical: 10,
  },
  expenseSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  expenseDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expenseAmount: {
    fontSize: 16,
    color: "#000",
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    // marginHorizontal: 8,
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
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButtons: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: theme.colors.white,
    textAlign: "center",
    fontWeight: "600",
  },
  expense: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    // paddingVertical: 16,
  },
  expenseDesc: {
    flex: 1,
    justifyContent: "space-between",
    gap: 10,
  },
});
