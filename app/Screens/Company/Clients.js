import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { addClient, getClients } from "../../../services/api";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { theme } from "@/constants/theme";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "react-native-toast-notifications";

const Clients = () => {
  const toast = useToast()
  const [clientsData, setClientsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  

  const { data } = useQuery({
    queryFn: getClients,
    queryKey: ["clients"],
    select: (data) => data.data,
  });

  const mutation=useMutation({
    mutationKey:['clients'],
    mutationFn:addClient,
    onSuccess:(response)=>{
      if(response.statusCode === 1){
        setModalVisible(false);
        formik.resetForm();
        toast.show(response.message,{type:'success'});
      }else{
        setModalVisible(false);
        formik.resetForm();
        toast.show(response.message,{type:'error'});
      }
    }
  })

  const formik = useFormik({
    initialValues: {
      clientCode: "",
      clientName: "",
      clientAddress: "",
      clientEmailId: "",
    },
    validationSchema: Yup.object({
      clientCode: Yup.string().required("Enter client code"),
      clientName: Yup.string().required("Enter client name"),
      clientAddress: Yup.string().required("Enter client location"),
      clientEmailId: Yup.string()
        .required("Enter client email")
        .email("Enter valid email"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const handleModalOpen = () => {
    setModalVisible(true);
    formik.resetForm();
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.clientCode}>Code: {item.clientCode}</Text>
        <Text style={styles.clientName}>{item.clientName}</Text>
      </View>
      <Text style={styles.clientAddress}>Location: {item.clientAddress}</Text>
      <Text style={styles.clientEmail}>Email: {item.clientEmailId}</Text>
      <Text style={styles.projectHeader}>Projects:</Text>
      <FlatList
        data={item.projects}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.projectContainer}>
            <Text style={styles.projectCode}>{item.projectCode}</Text>
            <Text style={styles.projectName}>{item.projectName}</Text>
          </View>
        )}
        ListEmptyComponent={()=>(
          <View style={styles.projectContainer}>
            <Text style={styles.projectName}>No projects</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleModalOpen}>
        <Icon name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add New Client</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Client</Text>
            <TouchableOpacity onPress={handleModalClose}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              style={[styles.input,{borderColor:`${formik.touched.clientCode && formik.errors.clientCode ? 'red':'#ccc'}`}]}
              placeholder="Client Code"
              value={formik.values.clientCode}
              onChangeText={formik.handleChange("clientCode")}
              onBlur={formik.handleBlur("clientCode")}
            />
            {formik.touched.clientCode && formik.errors.clientCode && <Text style={{color:'red',marginLeft:5}}>{formik.errors.clientCode}</Text>}
            <TextInput
              style={[styles.input,{borderColor:`${formik.touched.clientName && formik.errors.clientName ? 'red':'#ccc'}`}]}
              placeholder="Client Name"
              value={formik.values.clientName}
              onChangeText={formik.handleChange("clientName")}
              onBlur={formik.handleBlur("clientName")}
            />
            {formik.touched.clientName && formik.errors.clientName && <Text style={{color:'red',marginLeft:5}}>{formik.errors.clientName}</Text>}

            <TextInput
              style={[styles.input,{borderColor:`${formik.touched.clientAddress && formik.errors.clientAddress?'red':'#ccc'}`}]}
              placeholder="Client Address"
              value={formik.values.clientAddress}
              onChangeText={formik.handleChange("clientAddress")}
              onBlur={formik.handleBlur("clientAddress")}
            />
            {formik.touched.clientAddress && formik.errors.clientAddress && <Text style={{color:'red',marginLeft:5}}>{formik.errors.clientAddress}</Text>}

            <TextInput
              style={[styles.input,{borderColor:`${formik.touched.clientEmailId && formik.errors.clientEmailId ? 'red':'#ccc'}`}]}
              placeholder="Client Email ID"
              value={formik.values.clientEmailId}
              onChangeText={formik.handleChange("clientEmailId")}
              onBlur={formik.handleBlur("clientEmailId")}
            />
            {formik.touched.clientEmailId && formik.errors.clientEmailId && <Text style={{color:'red',marginLeft:5}}>{formik.errors.clientEmailId}</Text>}

          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[
                styles.modalButtons,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={formik.handleSubmit}
            >
              <Text style={styles.modalButtonText}>Add Client</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButtons,
                { backgroundColor: theme.colors.danger },
              ]}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E3163",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  clientCode: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clientAddress: {
    alignItems:'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  clientEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    alignItems:'center',
  },
  projectHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  projectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  projectCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  projectName: {
    fontSize: 14,
    color: '#666',
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
    justifyContent: "flex-end",
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
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    gap: 10,
    marginLeft: 5,
  },
});

export default Clients;
