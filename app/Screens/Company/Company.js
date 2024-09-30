import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { addCompanyBranch, getCompanyBranch } from "../../../services/api";
import { theme } from "@/constants/theme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FontAwesome } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "react-native-toast-notifications";

const Company = () => {
  const toast = useToast();
  const [modalShown, setModalShown] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["company"],
    queryFn: getCompanyBranch,
    select: (data) => data.data,
  });

  const mutation = useMutation({
    mutationFn: addCompanyBranch,
    onSuccess: (response) => {
      if (response.statusCode === 1) {
        console.log(response);
        queryClient.invalidateQueries(["company"]);
        setModalShown(false);
        toast.show("Successfully added", { type: "success" });
      }else{
        setModalShown(false);
        toast.show(response.message,{type:'error'})
      }
    },
  });

  const modalClose = () => {
    setModalShown(false);
    branchFormik.resetForm();
  };

  const branchFormik = useFormik({
    initialValues: {
      officeName: "",
      description: "",
      officeCode: "",
      address: "",
      country: "",
    },
    validationSchema: Yup.object({
      officeName: Yup.string().required("Enter office name"),
      description: Yup.string().required("Enter office description"),
      officeCode: Yup.string().required("Enter office code"),
      address: Yup.string().required("Enter location"),
      country: Yup.string().required("Enter country"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const renderItem = ({ item }) => {
    function getRandomPastelColor() {
      const r = Math.floor(Math.random() * 100 + 80);
      const g = Math.floor(Math.random() * 100 + 50);
      const b = Math.floor(Math.random() * 100);

      const toHex = (value) => value.toString(16).padStart(2, "0");

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    const color = getRandomPastelColor();
    return (
      <View style={[styles.companyItem, { backgroundColor: color }]}>
        <View style={styles.headerContainer}>
          <View style={styles.officeNameContainer}>
            <Icon name="business" size={20} color="#fff" />
            <Text style={styles.officeNameText}>{item.officeName}</Text>
          </View>
          <Text style={styles.officeCodeText}>{item.officeCode}</Text>
        </View>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <View style={styles.addressContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Icon name="location-on" size={15} color="#000" />
            <Text style={styles.addressText}>{item.address}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Icon name="language" size={15} color="#000" />
            <Text style={styles.countryText}>{item.country}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.backgroundImage}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalShown(true)}
      >
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>New Branch</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 10,
          paddingTop: 5,
          paddingBottom: 20,
        }}
      />
      <Modal visible={modalShown} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Branch</Text>
            <TouchableOpacity onPress={modalClose}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: `${
                    branchFormik.touched.officeName &&
                    branchFormik.errors.officeName
                      ? "red"
                      : "#ccc"
                  }`,
                },
              ]}
              placeholder="Office Name"
              value={branchFormik.values.officeName}
              onChangeText={branchFormik.handleChange("officeName")}
              onBlur={branchFormik.handleBlur("officeName")}
            />
            {branchFormik.touched.officeName &&
              branchFormik.errors.officeName && (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  {branchFormik.errors.officeName}
                </Text>
              )}

            <TextInput
              style={[
                styles.input,
                {
                  borderColor: `${
                    branchFormik.touched.officeCode &&
                    branchFormik.errors.officeCode
                      ? "red"
                      : "#ccc"
                  }`,
                },
              ]}
              placeholder="Office Code"
              value={branchFormik.values.officeCode}
              onChangeText={branchFormik.handleChange("officeCode")}
              onBlur={branchFormik.handleBlur("officeCode")}
            />
            {branchFormik.touched.officeCode &&
              branchFormik.errors.officeCode && (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  {branchFormik.errors.officeCode}
                </Text>
              )}

            <TextInput
              style={[
                styles.input,
                {
                  borderColor: `${
                    branchFormik.touched.address && branchFormik.errors.address
                      ? "red"
                      : "#ccc"
                  }`,
                },
              ]}
              placeholder="Location"
              value={branchFormik.values.address}
              onChangeText={branchFormik.handleChange("address")}
              onBlur={branchFormik.handleBlur("address")}
            />
            {branchFormik.touched.address && branchFormik.errors.address && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                {branchFormik.errors.address}
              </Text>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  borderColor: `${
                    branchFormik.touched.country && branchFormik.errors.country
                      ? "red"
                      : "#ccc"
                  }`,
                },
              ]}
              placeholder="Country"
              value={branchFormik.values.country}
              onChangeText={branchFormik.handleChange("country")}
              onBlur={branchFormik.handleBlur("country")}
            />
            {branchFormik.touched.country && branchFormik.errors.country && (
              <Text style={{ color: "red", marginLeft: 5 }}>
                {branchFormik.errors.country}
              </Text>
            )}

            <TextInput
              style={[
                styles.input,
                {
                  borderColor: `${
                    branchFormik.touched.description &&
                    branchFormik.errors.description
                      ? "red"
                      : "#ccc"
                  }`,
                },
              ]}
              placeholder="Description"
              value={branchFormik.values.description}
              onChangeText={branchFormik.handleChange("description")}
              onBlur={branchFormik.handleBlur("description")}
            />
            {branchFormik.touched.description &&
              branchFormik.errors.description && (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  {branchFormik.errors.description}
                </Text>
              )}
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[
                styles.modalButtons,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={branchFormik.handleSubmit}
            >
              <Text style={styles.modalButtonText}>Add Branch</Text>
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  companyItem: {
    gap: 10,
    padding: 10,
    // borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    // backgroundColor: theme.colors.white,
    // marginBottom: 10,
    marginHorizontal: 5,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  officeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  officeNameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: theme.colors.white,
  },
  officeCodeText: {
    fontSize: 16,
    color: theme.colors.black,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 8,
    color: theme.colors.white,
    textTransform: "capitalize",
    fontWeight: "700",
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressText: {
    fontSize: 14,
    color: theme.colors.black,
  },
  countryText: {
    fontSize: 14,
    color: theme.colors.black,
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

export default Company;
