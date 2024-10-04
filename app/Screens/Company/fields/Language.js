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
import { addLanguage, getLanguageData } from "@/services/api";
import {
  FontAwesome,
  Ionicons,
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
          <Ionicons
            name="language"
            size={40}
            color="#564469"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.language}>{item.language}</Text>
          <Text style={styles.cerDesc}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const Language = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguageData,
    select: (data) => data?.data,
  });

  const mutation = useMutation({
    mutationFn: addLanguage,
    onSuccess: (response) => {
      if (response.statusCode === 1) {
        setShowModal(false);
        formik.resetForm();
        toast.show("Added Successfully", { type: "success" });
        queryClient.invalidateQueries(["languages"]);
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
      language: "",
      description: "",
    },
    validationSchema: Yup.object({
      language: Yup.string().required("Enter Language"),
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
        <Text style={styles.addButtonText}>New Language</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={CerItem}
      />
      <Modal visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Language</Text>
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
                    formik.touched.language && formik.errors.language
                      ? "red"
                      : "#ccc",
                },
              ]}
              placeholder="Language Name"
              value={formik.values.dptName}
              onChangeText={formik.handleChange("language")}
              onBlur={formik.handleBlur("language")}
            />
            {formik.touched.language && formik.errors.language && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                {formik.errors.language}
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
                Add Language
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

export default Language;

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
    backgroundColor: "#E5D9F2",
    borderRadius: 40,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  language: {
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
