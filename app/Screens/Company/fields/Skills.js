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
import { useMutation, useQuery } from "@tanstack/react-query";
import { addSkill, getSkills } from "@/services/api";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { useToast } from "react-native-toast-notifications";
import { useFormik } from "formik";
import * as Yup from "yup";

const skillItem = ({ item }) => {
  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="briefcase-variant"
            size={40}
            color="#4c77af"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.skillName}>{item.skillName}</Text>
          <Text style={styles.skillId}>ID: {item.skillId}</Text>
        </View>
      </View>
    </View>
  );
};

const Skills = () => {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
    select: (data) => data?.data,
  });

  const mutation = useMutation({
    mutationFn: addSkill,
    onSuccess: (response) => {
      if (response.statusCode === 1) {
        setShowModal(false);
        formik.resetForm();
        toast.show("Added Successfully", { type: "success" });
      }else{
        console.log(response);
      }
    },
  });

  const closeModal=()=>{
    setShowModal(false);
    formik.resetForm();
  }

  const formik = useFormik({
    initialValues: {
      skillId: "",
      skillName: "",
      description: "",
    },
    validationSchema: Yup.object({
      skillId: Yup.string().required("Enter skill code"),
      skillName: Yup.string().required("Enter skill name"),
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
        <Text style={styles.addButtonText}>New Skills</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={skillItem}
      />
      <Modal visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Skill</Text>
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
                    formik.touched.skillId && formik.errors.skillId
                      ? "red"
                      : "#ccc",
                },
              ]}
              placeholder="Skill Code"
              value={formik.values.skillId}
              onChangeText={formik.handleChange("skillId")}
              onBlur={formik.handleBlur("skillId")}
            />
            {formik.touched.skillId && formik.errors.skillId && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                {formik.errors.skillId}
              </Text>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    formik.touched.skillName && formik.errors.skillName
                      ? "red"
                      : "#ccc",
                },
              ]}
              placeholder="Skill Name"
              value={formik.values.dptName}
              onChangeText={formik.handleChange("skillName")}
              onBlur={formik.handleBlur("skillName")}
            />
            {formik.touched.skillName && formik.errors.skillName && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                {formik.errors.skillName}
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
              <Text style={styles.modalButtonText} onPress={formik.handleSubmit}>Add Skill</Text>
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

export default Skills;

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
    backgroundColor: "#C8E2F7",
    borderRadius: 40,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  skillName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  skillId: {
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
