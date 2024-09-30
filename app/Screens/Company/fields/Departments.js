import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  addDepartment,
  editDepartment,
  deleteDepartment,
  getcompanyData,
} from "@/services/api";
import { theme } from "@/constants/theme";
import { useToast } from "react-native-toast-notifications";
import { useFormik } from "formik";
import * as Yup from "yup";

const DepartmentCard = ({ item, onEdit, onDelete }) => (
  <View style={styles.cardContainer}>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons
        name="office-building"
        size={40}
        color="#4CAF50"
      />
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.departmentName}>{item.dptName}</Text>
      <Text style={styles.departmentId}>ID: {item.dptId}</Text>
    </View>
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => onEdit(item)}>
        <AntDesign
          name="edit"
          size={24}
          color="#4CAF50"
          style={styles.actionIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item._id)}>
        <AntDesign
          name="delete"
          size={24}
          color="#f44336"
          style={styles.actionIcon}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const Departments = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: getcompanyData,
    select: (data) => data.data,
  });

  const mutation = useMutation({
    mutationFn: (data) => (isEdit ? editDepartment(data) : addDepartment(data)),
    onSuccess: (response) => {
      if (response.statusCode === 1) {
        queryClient.invalidateQueries(["departments"]);
        setShowModal(false);
        setIsEdit(false);
        toast.show(`${isEdit ? "Updated" : "Added"} successfully`, {
          type: "success",
        });
      } else {
        setShowModal(false);
        toast.show(response.message, { type: "error" });
      }
    },
    onError: (error) => {
      setShowModal(false);
      toast.show(error.message, { type: "error" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (data)=>deleteDepartment(data),
    onSuccess: (resp) => {
      queryClient.invalidateQueries(["departments"]);
      toast.show("Deleted successfully", { type: "success" });
    },
    onError: (error) => {
      console.error(error);
      toast.show(error.message, { type: "error" });
    },
  });

  const formik = useFormik({
    initialValues: {
      dptId: "",
      dptName: "",
    },
    validationSchema: Yup.object({
      dptId: Yup.string().required("Enter department Id"),
      dptName: Yup.string().required("Enter department name"),
    }),
    onSubmit: (values) => {
      const formData = { ...values, _id: selectedDepartment?._id };
      mutation.mutate(formData);
    },
    enableReinitialize: true,
  });

  const openModal = (department = null) => {
    if (department) {
      setIsEdit(true);
      setSelectedDepartment(department);
      formik.setValues({
        dptId: department.dptId,
        dptName: department.dptName,
      });
    } else {
      setIsEdit(false);
      setSelectedDepartment(null);
      formik.resetForm();
    }
    setShowModal(true);
  };

  const modalClose = () => {
    setShowModal(false);
    setIsEdit(false);
  };

  const handleEdit = (department) => {
    openModal(department);
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Department", `Are you sure you want to delete?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteMutation.mutate(id);
        },
      },
    ]);
  };

  return (
    <View>
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <FontAwesome name="plus" size={15} color={theme.colors.white} />
        <Text style={styles.addButtonText}>New Department</Text>
      </TouchableOpacity>

      <FlatList
        data={departments}
        renderItem={({ item }) => (
          <DepartmentCard
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item._id}
      />

      <Modal visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {isEdit ? "Edit Department" : "Add New Department"}
            </Text>
            <TouchableOpacity onPress={modalClose}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    formik.touched.dptId && formik.errors.dptId
                      ? "red"
                      : "#ccc",
                },
              ]}
              placeholder="Department Code"
              value={formik.values.dptId}
              onChangeText={formik.handleChange("dptId")}
              onBlur={formik.handleBlur("dptId")}
            />
            {formik.touched.dptId && formik.errors.dptId && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                {formik.errors.dptId}
              </Text>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    formik.touched.dptName && formik.errors.dptName
                      ? "red"
                      : "#ccc",
                },
              ]}
              placeholder="Department Name"
              value={formik.values.dptName}
              onChangeText={formik.handleChange("dptName")}
              onBlur={formik.handleBlur("dptName")}
            />
            {formik.touched.dptName && formik.errors.dptName && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                {formik.errors.dptName}
              </Text>
            )}
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[
                styles.modalButtons,
                {
                  backgroundColor: `${
                    !isEdit ? theme.colors.primary : theme.colors.success
                  }`,
                },
              ]}
              onPress={formik.handleSubmit}
            >
              <Text style={styles.modalButtonText}>
                {isEdit ? "Update" : "Add Department"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButtons,
                { backgroundColor: theme.colors.danger },
              ]}
              onPress={modalClose}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Departments;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 4, // Subtle shadow for better card elevation on mobile
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  iconContainer: {
    padding: 8, // Add padding around the icon for a balanced look
    backgroundColor: "#E8F5E9", // Light green background to enhance the department icon
    borderRadius: 40, // Rounded background to match icon size
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  departmentName: {
    fontSize: 18, // Larger font size for better readability
    fontWeight: "bold",
    color: "#333",
  },
  departmentId: {
    fontSize: 14, // Slightly larger and more readable font size
    color: "#666",
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionIcon: {
    marginLeft: 20, // Spacing between the action buttons
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
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
    // borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 16,
    backgroundColor: "#fff",
    color: "#333",
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
});
