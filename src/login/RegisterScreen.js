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
  Modal,
  FlatList,
} from "react-native"
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
    subjects: [],
    experience: "",
    certificate: "",
    address: "",
    customSubject: "",
  })

  const [loading, setLoading] = useState(false)

  // Modal hiển thị khu vực & môn học
  const [modalAreaVisible, setModalAreaVisible] = useState(false)
  const [modalSubjectVisible, setModalSubjectVisible] = useState(false)

  // Tìm kiếm trong modal
  const [searchArea, setSearchArea] = useState("")
  const [searchSubject, setSearchSubject] = useState("")

  // Danh sách môn học
  const subjectItems = [
    "Toán học",
    "Tiếng Anh",
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Tin học",
    "Ngữ văn",
    "Lịch sử",
    "Địa lý",
  ]

  // Danh sách khu vực Hà Nội
  const areaItems = [
    "Ba Đình",
    "Hoàn Kiếm",
    "Đống Đa",
    "Hai Bà Trưng",
    "Cầu Giấy",
    "Thanh Xuân",
    "Hoàng Mai",
    "Long Biên",
    "Tây Hồ",
    "Nam Từ Liêm",
    "Bắc Từ Liêm",
    "Hà Đông",
    "Thanh Trì",
    "Gia Lâm",
    "Đông Anh",
    "Sóc Sơn",
    "Hoài Đức",
    "Đan Phượng",
    "Thường Tín",
    "Phú Xuyên",
    "Ứng Hòa",
    "Mỹ Đức",
    "Phúc Thọ",
    "Ba Vì",
    "Chương Mỹ",
    "Thanh Oai",
    "Quốc Oai",
    "Thạch Thất",
    "Mê Linh",
    "Sơn Tây (thị xã)",
    "Khác (ngoài Hà Nội)",
  ]

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const { name, phone, email, password, confirmPassword, role, subjects, experience } = formData

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

    if (role === "tutor" && (!subjects.length || !experience.trim())) {
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
        const tutorData = {
          userId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          specialty: formData.subjects.join(", "),
          subjects: formData.subjects,
          experience: formData.experience,
          certificate: formData.certificate,
          address: formData.address || "Hà Nội",
          status: "pending",
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
          ? "Tài khoản gia sư đang chờ phê duyệt."
          : "Tài khoản đã được tạo. Bạn có thể đăng nhập ngay.",
        [{ text: "OK", onPress: onRegister }]
      )
    } catch (error) {
      console.error("Registration error:", error)
      Alert.alert("Lỗi", "Đăng ký thất bại. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  // Lọc danh sách tìm kiếm
  const filteredAreas = areaItems.filter((a) =>
    a.toLowerCase().includes(searchArea.toLowerCase())
  )
  const filteredSubjects = subjectItems.filter((s) =>
    s.toLowerCase().includes(searchSubject.toLowerCase())
  )

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
            {/* ====== Loại tài khoản ====== */}
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Loại tài khoản</Text>
              <View style={styles.roleButtons}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    formData.role === "customer" && styles.activeRoleButton,
                  ]}
                  onPress={() => updateFormData("role", "customer")}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      formData.role === "customer" && styles.activeRoleButtonText,
                    ]}
                  >
                    👤 Khách hàng
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    formData.role === "tutor" && styles.activeRoleButton,
                  ]}
                  onPress={() => updateFormData("role", "tutor")}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      formData.role === "tutor" && styles.activeRoleButtonText,
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
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(value) => updateFormData("phone", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData("confirmPassword", value)}
            />

            {/* ====== Khu vực ====== */}
            <TouchableOpacity
              style={[styles.input, { justifyContent: "center" }]}
              onPress={() => setModalAreaVisible(true)}
            >
              <Text style={{ color: formData.address ? "#000" : "#999" }}>
                {formData.address || "Chọn khu vực..."}
              </Text>
            </TouchableOpacity>

            {/* ====== Modal chọn khu vực ====== */}
            <Modal
              visible={modalAreaVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalAreaVisible(false)}
            >
              <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.3)" }}>
                <View style={{ backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "60%" }}>
                  <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center", marginVertical: 10 }}>
                    Chọn khu vực
                  </Text>
                  <TextInput
                    style={{
                      marginHorizontal: 15,
                      marginBottom: 10,
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      height: 40,
                    }}
                    placeholder="Tìm khu vực..."
                    value={searchArea}
                    onChangeText={setSearchArea}
                  />
                  <FlatList
                    data={filteredAreas}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{ paddingVertical: 12, alignItems: "center", borderBottomColor: "#eee", borderBottomWidth: 1 }}
                        onPress={() => {
                          updateFormData("address", item)
                          setModalAreaVisible(false)
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>

            {/* ====== Nếu là gia sư ====== */}
            {formData.role === "tutor" && (
              <View style={styles.tutorFieldsContainer}>
                <Text style={styles.tutorFieldsTitle}>Thông tin gia sư</Text>

                {/* ====== Môn học ====== */}
                <TouchableOpacity
                  style={[styles.input, { justifyContent: "center" }]}
                  onPress={() => setModalSubjectVisible(true)}
                >
                  <Text style={{ color: formData.subjects.length ? "#000" : "#999" }}>
                    {formData.subjects.length
                      ? `Đã chọn: ${formData.subjects.join(", ")}`
                      : "Chọn môn giảng dạy..."}
                  </Text>
                </TouchableOpacity>

                {/* ====== Modal chọn môn học ====== */}
                <Modal
                  visible={modalSubjectVisible}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={() => setModalSubjectVisible(false)}
                >
                  <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <View style={{ backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "65%" }}>
                      <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center", marginVertical: 10 }}>
                        Chọn môn học
                      </Text>
                      <TextInput
                        style={{
                          marginHorizontal: 15,
                          marginBottom: 10,
                          borderColor: "#ccc",
                          borderWidth: 1,
                          borderRadius: 8,
                          paddingHorizontal: 10,
                          height: 40,
                        }}
                        placeholder="Tìm môn học..."
                        value={searchSubject}
                        onChangeText={setSearchSubject}
                      />
                      <FlatList
                        data={filteredSubjects}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => {
                          const selected = formData.subjects.includes(item)
                          return (
                            <TouchableOpacity
                              style={{
                                paddingVertical: 12,
                                alignItems: "center",
                                borderBottomColor: "#eee",
                                borderBottomWidth: 1,
                                backgroundColor: selected ? "#E0F7FA" : "white",
                              }}
                              onPress={() => {
                                let newSelection
                                if (selected) {
                                  newSelection = formData.subjects.filter((s) => s !== item)
                                } else {
                                  newSelection = [...formData.subjects, item]
                                }
                                updateFormData("subjects", newSelection)
                              }}
                            >
                              <Text style={{ fontSize: 16 }}>
                                {selected ? "✅ " : ""}{item}
                              </Text>
                            </TouchableOpacity>
                          )
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#007AFF",
                          margin: 15,
                          borderRadius: 10,
                          paddingVertical: 12,
                          alignItems: "center",
                        }}
                        onPress={() => setModalSubjectVisible(false)}
                      >
                        <Text style={{ color: "white", fontWeight: "600" }}>Xong</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <TextInput
                  style={styles.input}
                  placeholder="Kinh nghiệm (VD: 3 năm dạy học)"
                  value={formData.experience}
                  onChangeText={(value) => updateFormData("experience", value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Chứng chỉ (tùy chọn)"
                  value={formData.certificate}
                  onChangeText={(value) => updateFormData("certificate", value)}
                />
              </View>
            )}

            {/* ====== Đăng ký ====== */}
            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Đăng ký</Text>}
            </TouchableOpacity>

            {/* ====== Quay lại ====== */}
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
