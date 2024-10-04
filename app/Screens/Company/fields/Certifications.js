import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCertificate, getCertificates } from "@/services/api";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { useToast } from "react-native-toast-notifications";
import { useFormik } from "formik";
import * as Yup from "yup";

const CerItem = ({ item }) => {
  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="certificate"
            size={40}
            color="#747a1a"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.cerName}>{item.cerName}</Text>
          <Text style={styles.cerDesc}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const Certifications = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
    select: (data) => data?.data,
  });

  const mutation = useMutation({
    mutationFn: addCertificate,
    onSuccess: (response) => {
      if (response.statusCode === 1) {
        setShowModal(false);
        formik.resetForm();
        toast.show("Added Successfully", { type: "success" });
        queryClient.invalidateQueries(["certificates"]);
      } else {
        console.log(response);
      }
    },
  });

  const closeModal = () => {
    setShowModal(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      cerName: "",
      description: "",
    },
    validationSchema: Yup.object({
      cerName: Yup.string().required("Enter Certificate name"),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });
  return (
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <FontAwesome name="plus" size={15} color={theme.colors.white} />
        <Text style={styles.addButtonText}>New Certifications</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={CerItem}
      />
      <Modal visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Certificate</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    formik.touched.cerName && formik.errors.cerName
                      ? "red"
                      : "#ccc",
                },
              ]}
              placeholder="Certificate Name"
              value={formik.values.dptName}
              onChangeText={formik.handleChange("cerName")}
              onBlur={formik.handleBlur("cerName")}
            />
            {formik.touched.cerName && formik.errors.cerName && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                {formik.errors.cerName}
              </Text>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    formik.touched.description && formik.errors.description
                      ? "red"
                      : "#ccc",
                },
              ]}
              placeholder="Description"
              value={formik.values.description}
              onChangeText={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                {formik.errors.description}
              </Text>
            )}
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[
                styles.modalButtons,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
            >
              <Text
                style={styles.modalButtonText}
                onPress={formik.handleSubmit}
              >
                Add Certificate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButtons,
                { backgroundColor: theme.colors.danger },
              ]}
              onPress={closeModal}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Certifications;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  iconContainer: {
    padding: 8,
    backgroundColor: "#eff59a",
    borderRadius: 40,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  cerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cerDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
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
