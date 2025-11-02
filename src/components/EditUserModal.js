import React, { useState, useEffect } from "react"
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { styles as globalStyles } from "@style/styles"

const EditUserModal = ({ visible, user, onClose, onSave }) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("customer")

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setPhone(user.phone || "")
      setEmail(user.email || "")
      setRole(user.role || "customer")
    }
  }, [user])

  const handleSave = () => {
    if (!name || !phone || !email) {
      alert("Vui lòng điền đầy đủ thông tin")
      return
    }
    onSave({ ...user, name, phone, email, role })
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modal}>
          <Text style={modalStyles.title}>Chỉnh sửa người dùng</Text>
          <TextInput
            style={modalStyles.input}
            placeholder="Tên"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={modalStyles.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={modalStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={modalStyles.cancelButton}>
              <Text style={modalStyles.cancelText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={modalStyles.saveButton}>
              <Text style={modalStyles.saveText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "85%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelButton: {
    padding: 10,
    marginRight: 10,
  },
  cancelText: {
    color: "#999",
  },
  saveButton: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
})

export default EditUserModal
