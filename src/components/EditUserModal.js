import React, { useState, useEffect } from "react"
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native"

const EditUserModal = ({ visible, user, onClose, onSave, disablePhoneEdit = false }) => {
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

    const updatedUser = { ...user, name, email, role }
    updatedUser.phone = disablePhoneEdit ? user.phone : phone
    onSave(updatedUser)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modal}>
              <Text style={styles.title}>Chỉnh sửa người dùng</Text>

              <TextInput
                style={styles.input}
                placeholder="Tên"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={[
                  styles.input,
                  disablePhoneEdit && { backgroundColor: "#f3f4f6", color: "#555" },
                ]}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                editable={!disablePhoneEdit}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                  <Text style={styles.saveText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
    textAlign: "center",
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
