import { View, Text, StyleSheet, Touchable, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { theme } from "@/constants/theme";
import { addLeaveType, fetchLeaveType } from "@/services/api";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";

const LeaveType = () => {
  const [leaves, setLeaves] = useState([]);
  const queryClient=useQueryClient();
  const toast=useToast();
  const [modalShown,setModalShown]=useState(false);
  const [newLeaveType, setNewLeaveType] = useState({
    leaveTypeName: "",
    shortName: "",
  });

  const {isLoading,error,data}=useQuery({
    queryKey:['leaveType'],
    queryFn:fetchLeaveType,
    select:(data)=> data.data
  })

  const mutation =useMutation({
    mutationFn:addLeaveType,
    onSuccess:()=>{
      queryClient.invalidateQueries(['leaveType']);
      setModalShown(false);
      toast.show('Successfully added',{type:'success'});
    },
  })
  
  const handleInputChange = (name, value) => {
    setNewLeaveType({ ...newLeaveType, [name]: value });
  };


  const handleSubmit=()=>{
    if(!!newLeaveType.leaveTypeName && !!newLeaveType.leaveTypeName){
      mutation.mutate(newLeaveType);
    }else{
      toast.show("Enter values",{type:'success'})
    }
  }

  const LeaveCard = ({ item }) => (
    <View style={styles.card}>
      <FontAwesome name="play" size={20} color={theme.colors.lightGray}/>
      <Text style={[styles.name,{textTransform:'uppercase'}]}>{item.shortName}</Text>
      <AntDesign name="arrowright" size={24} color="black" />
      <Text style={styles.name}>{item.leaveTypeName}</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={()=>setModalShown(true)}>
          <Ionicons name="add" size={25} color={theme.colors.white}/>
          <Text style={styles.addText}>Add Leave Type</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={LeaveCard}
        keyExtractor={(item) => item._id}
      />
      <Modal visible={modalShown} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Leave Type</Text>
            <TouchableOpacity onPress={()=>setModalShown(false)}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TextInput
              style={styles.input}
              placeholder="Leave Type"
              onChangeText={(text) => handleInputChange("leaveTypeName", text)}
              value={newLeaveType.leaveTypeName}
            />
            <TextInput
              style={styles.input}
              placeholder="Short Name"
              onChangeText={(text) => handleInputChange("shortName", text)}
              value={newLeaveType.shortName}
            />
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={[styles.modalButtons,{backgroundColor:theme.colors.primary}]} onPress={handleSubmit}>
              <Text style={styles.modalButtonText}>Add Type</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButtons,{backgroundColor:theme.colors.danger}]}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LeaveType;

const styles = StyleSheet.create({
  card: {
    flexDirection:'row',
    gap:16,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    paddingHorizontal:16,
    paddingVertical:20,
    marginVertical: 5,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  name:{
    fontSize:15,
    fontWeight:'600'
  },
  addButton:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    backgroundColor:theme.colors.primary,
    paddingHorizontal:16,
    paddingVertical:12,
    marginHorizontal:16,
    marginVertical:10,
    borderRadius:10,
    elevation: 3,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addText:{
    color:theme.colors.white,
    fontSize:15,
    fontWeight:'700',
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  modalButtons:{
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  modalButtonText:{
    color: theme.colors.white,
    textAlign: "center",
    fontWeight: "600",
  }
});
