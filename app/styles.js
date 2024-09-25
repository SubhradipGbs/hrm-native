import { StyleSheet } from "react-native";

export const mainStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  modalBody: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Adds depth to the modal
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333333",
  },
  modalInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#dddddd",
    marginBottom: 15,
    fontSize: 16,
    color: "#333333",
  },
  modalTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalTimeInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#dddddd",
    width: 140,
    fontSize: 16,
    color: "#333333",
  },
  modalTextArea: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#dddddd",
    marginBottom: 15,
    fontSize: 16,
    color: "#333333",
    textAlignVertical: "top",
  },
  modalButton: {
    backgroundColor: "#007BFF", // Blue button for emphasis
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
