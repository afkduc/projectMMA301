import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { styles } from "@style/styles"
import UserService from "@service/UserService"
import tutorService from "@service/tutorService"

const RegisterScreen = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    serviceId: [],
    experience: "",
    certificate: "",
    address: "",
    customSubject: "",
  })

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // Danh sách môn học tĩnh (không cần lấy từ Firebase)
  const subjectItems = [
    { label: "Toán học", value: "toan" },
    { label: "Tiếng Anh", value: "tieng_anh" },
    { label: "Vật lý", value: "vat_ly" },
    { label: "Hóa học", value: "hoa_hoc" },
    { label: "Sinh học", value: "sinh_hoc" },
    { label: "Tin học", value: "tin_hoc" },
    { label: "Ngữ văn", value: "ngu_van" },
    { label: "Lịch sử", value: "lich_su" },
    { label: "Địa lý", value: "dia_ly" },
  ]

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const { name, phone, email, password, confirmPassword, role, serviceId, experience } = formData

    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin")
      return false
    }

    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/
    if (!phoneRegex.test(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ")
      return false
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp")
      return false
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự")
      return false
    }

    if (role === "tutor" && (!serviceId.length || !experience.trim())) {
      Alert.alert("Lỗi", "Vui lòng chọn ít nhất một môn học và nhập kinh nghiệm")
      return false
    }

    return true
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)

      const phoneExists = await UserService.phoneExists(formData.phone)
      if (phoneExists) {
        Alert.alert("Lỗi", "Số điện thoại đã được sử dụng")
        return
      }

      const emailExists = await UserService.emailExists(formData.email)
      if (emailExists) {
        Alert.alert("Lỗi", "Email đã được sử dụng")
        return
      }

      const userData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.role === "tutor" ? "pending" : "active",
        joinDate: new Date().toISOString().split("T")[0],
        address: formData.address || "Hà Nội",
        avatar: formData.role === "tutor" ? "👨‍🏫" : "👤",
      }

      const userId = await UserService.createUser(userData)

      if (formData.role === "tutor") {
        const selectedSubjects = subjectItems
          .filter((s) => formData.serviceId.includes(s.value))
          .map((s) => s.label)
          .join(", ")

        const specialty = formData.customSubject
          ? `${selectedSubjects}, ${formData.customSubject}`
          : selectedSubjects

        const tutorData = {
          userId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          specialty,
          serviceId: formData.serviceId,
          experience: formData.experience,
          certificate: formData.certificate,
          address: formData.address || "Hà Nội",
          status: "false",
          rating: 0,
          completedOrders: 0,
          price: "Thỏa thuận",
          avatar: "👨‍🏫",
          reviews: 0,
        }

        await tutorService.createTutor(tutorData)
      }

      Alert.alert(
        "Đăng ký thành công!",
        formData.role === "tutor"
          ? "Tài khoản gia sư đã được tạo và đang chờ phê duyệt từ admin."
          : "Tài khoản đã được tạo thành công. Bạn có thể đăng nhập ngay.",
        [{ text: "OK", onPress: onRegister }]
      )
    } catch (error) {
      console.error("Registration error:", error)
      Alert.alert("Lỗi", "Đăng ký thất bại. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>📝</Text>
            <Text style={styles.title}>Đăng ký tài khoản</Text>
            <Text style={styles.subtitle}>Tạo tài khoản mới để sử dụng dịch vụ</Text>
          </View>

          <View style={styles.form}>
  {/* ====== Chọn loại tài khoản ====== */}
  <View style={styles.roleContainer}>
    <Text style={styles.roleLabel}>Loại tài khoản</Text>
    <View style={styles.roleButtons}>
      <TouchableOpacity
        style={[
          styles.roleButton,
          formData.role === "customer" && styles.activeRoleButton
        ]}
        onPress={() => updateFormData("role", "customer")}
      >
        <Text
          style={[
            styles.roleButtonText,
            formData.role === "customer" && styles.activeRoleButtonText
          ]}
        >
          👤 Khách hàng
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.roleButton,
          formData.role === "tutor" && styles.activeRoleButton
        ]}
        onPress={() => updateFormData("role", "tutor")}
      >
        <Text
          style={[
            styles.roleButtonText,
            formData.role === "tutor" && styles.activeRoleButtonText
          ]}
        >
          🎓 Gia sư
        </Text>
      </TouchableOpacity>
    </View>
  </View>

            {/* ====== Thông tin cơ bản ====== */}
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              value={formData.name}
              onChangeText={(value) => updateFormData("name", value)}
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={formData.phone}
              onChangeText={(value) => updateFormData("phone", value)}
              keyboardType="phone-pad"
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
              secureTextEntry
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData("confirmPassword", value)}
              secureTextEntry
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              placeholder="Khu vực (VD: Hà Đông, Hà Nội)"
              value={formData.address}
              onChangeText={(value) => updateFormData("address", value)}
              editable={!loading}
            />

            {/* ====== Phần thông tin gia sư ====== */}
            {formData.role === "tutor" && (
              <View style={styles.tutorFieldsContainer}>
                <Text style={styles.tutorFieldsTitle}>Thông tin gia sư</Text>

                <Text style={styles.multiSelectLabel}>Chọn môn giảng dạy</Text>
                <DropDownPicker
                  open={open}
                  value={formData.serviceId}
                  items={subjectItems}
                  setOpen={setOpen}
                  setValue={(callback) => {
                    const selected = callback(formData.serviceId)
                    updateFormData("serviceId", selected)
                  }}
                  multiple={true}
                  searchable={true}
                  placeholder="Chọn một hoặc nhiều môn học..."
                  mode="BADGE"
                  badgeDotColors={["#007AFF", "#FF9500", "#4CD964"]}
                  style={{ marginTop: 10, borderColor: "#ccc", borderRadius: 8, zIndex: 1000 }}
                  dropDownContainerStyle={{ borderColor: "#ccc" }}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Hoặc nhập môn học khác (tùy chọn)"
                  value={formData.customSubject}
                  onChangeText={(value) => updateFormData("customSubject", value)}
                  editable={!loading}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Kinh nghiệm (VD: 3 năm dạy học)"
                  value={formData.experience}
                  onChangeText={(value) => updateFormData("experience", value)}
                  editable={!loading}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Chứng chỉ (tùy chọn)"
                  value={formData.certificate}
                  onChangeText={(value) => updateFormData("certificate", value)}
                  editable={!loading}
                />
              </View>
            )}

            {/* ====== Nút Đăng ký ====== */}
            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Đăng ký</Text>}
            </TouchableOpacity>

            {/* ====== Quay lại đăng nhập ====== */}
            <TouchableOpacity style={styles.registerButton} onPress={onBackToLogin}>
              <Text style={styles.registerButtonText}>← Đã có tài khoản? Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen
