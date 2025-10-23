import { useState, useEffect } from "react"
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
import { styles } from "@style/styles"
import UserService from "@service/UserService"
import tutorService from "@service/tutorService"
import ServiceService from "@service/serviceService";

const RegisterScreen = ({ onRegister, onBackToLogin }) => {
  // Khởi tạo state formData để lưu dữ liệu nhập từ người dùng
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer", 
    serviceId: [],   // Danh sách chuyên môn (nếu là gia sư)
    experience: "",
    certificate: "",
    address: "",
  })

  const [services, setServices] = useState([]) // Lưu danh sách dịch vụ/chuyên môn
  const [loading, setLoading] = useState(false) // Hiển thị loading khi đăng ký

  // Lấy danh sách dịch vụ từ server khi component load lần đầu
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const allServices = await ServiceService.getActiveServices()
        setServices(allServices)
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }
    fetchServices()
  }, [])

  // Cập nhật dữ liệu form khi người dùng nhập
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Hàm kiểm tra dữ liệu nhập
  const validateForm = () => {
    const { name, phone, email, password, confirmPassword, role, serviceId, experience } = formData

    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin")
      return false
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/
    if (!phoneRegex.test(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ")
      return false
    }

    // Kiểm tra định dạng email
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

    // Nếu là gia sư, cần chọn chuyên môn và nhập kinh nghiệm
    if (role === "tutor" && (!serviceId.length || !experience.trim())) {
      Alert.alert("Lỗi", "Vui lòng chọn ít nhất một chuyên môn và nhập kinh nghiệm")
      return false
    }

    return true
  }

  // Hàm xử lý đăng ký
  const handleRegister = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)

      // Kiểm tra số điện thoại đã tồn tại chưa
      const phoneExists = await UserService.phoneExists(formData.phone)
      if (phoneExists) {
        Alert.alert("Lỗi", "Số điện thoại đã được sử dụng")
        return
      }

      // Kiểm tra email đã tồn tại chưa
      const emailExists = await UserService.emailExists(formData.email)
      if (emailExists) {
        Alert.alert("Lỗi", "Email đã được sử dụng")
        return
      }

      // Tạo dữ liệu user
      const userData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.role === "tutor" ? "pending" : "active", // Gia sư cần admin duyệt
        joinDate: new Date().toISOString().split("T")[0],
        address: formData.address || "Hà Nội",
        avatar: formData.role === "tutor" ? "👨‍🔧" : "👤",
      }

      const userId = await UserService.createUser(userData)

      // Nếu là gia sư, tạo thêm thông tin chuyên môn
      if (formData.role === "tutor") {
        const selectedServiceNames = services
          .filter((s) => formData.serviceId.includes(s.id))
          .map((s) => s.name)
          .join(", ")

        const tutorData = {
          userId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          specialty: selectedServiceNames || "Không rõ",
          serviceId: formData.serviceId,
          experience: formData.experience,
          certificate: formData.certificate,
          address: formData.address || "Hà Nội",
          status: "false", // chờ duyệt
          rating: 0,
          completedOrders: 0,
          price: "Thỏa thuận",
          avatar: "👨‍🔧",
          reviews: 0,
        }

        await tutorService.createTutor(tutorData)
      }

      // Thông báo đăng ký thành công
      Alert.alert(
        "Đăng ký thành công!",
        formData.role === "rutor"
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

  // Chọn/bỏ chọn chuyên môn
  const toggleService = (serviceId) => {
    const isSelected = formData.serviceId.includes(serviceId)
    const updatedServiceIds = isSelected
      ? formData.serviceId.filter((id) => id !== serviceId)
      : [...formData.serviceId, serviceId]
    updateFormData("serviceId", updatedServiceIds)
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
            {/* Chọn loại tài khoản: khách hàng hoặc gia sư */}
            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>Loại tài khoản</Text>
              <View style={styles.roleButtons}>
                <TouchableOpacity
                  style={[styles.roleButton, formData.role === "customer" && styles.activeRoleButton]}
                  onPress={() => updateFormData("role", "customer")}
                >
                  <Text style={[styles.roleButtonText, formData.role === "customer" && styles.activeRoleButtonText]}>
                    👤 Khách hàng
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.roleButton, formData.role === "tutor" && styles.activeRoleButton]}
                  onPress={() => updateFormData("role", "tutor")}
                >
                  <Text style={[styles.roleButtonText, formData.role === "tutor" && styles.activeRoleButtonText]}>
                  🎓 Gia sư
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Input thông tin cá nhân */}
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
              placeholder="Khu vực (VD: Hà Đông , Hà Nội)"
              value={formData.address}
              onChangeText={(value) => updateFormData("address", value)}
              editable={!loading}
            />

            {/* Nếu chọn gia sư, hiển thị thêm thông tin chuyên môn */}
            {formData.role === "tutor" && (
              <View style={styles.tutorFieldsContainer}>
                <Text style={styles.tutorFieldsTitle}>Thông tin gia sư</Text>

                {/* Chọn chuyên môn */}
                <View style={styles.multiSelectContainer}>
                  <Text style={styles.multiSelectLabel}>Chọn chuyên môn</Text>
                  {services.map((service) => {
                    const isSelected = formData.serviceId.includes(service.id)
                    return (
                      <TouchableOpacity
                        key={service.id}
                        style={[
                          styles.serviceItem,
                          isSelected && styles.serviceItemSelected,
                        ]}
                        onPress={() => toggleService(service.id)}
                        disabled={loading}
                      >
                        <Text style={isSelected ? styles.serviceTextSelected : styles.serviceText}>
                          {isSelected ? "✅ " : "☑️ "} {service.name}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>

                {/* Nhập kinh nghiệm và chứng chỉ */}
                <TextInput
                  style={styles.input}
                  placeholder="Kinh nghiệm (VD: 5 năm kinh nghiệm)"
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

                {/* Lưu ý cho gia sư */}
                <View style={styles.tutorNote}>
                  <Text style={styles.tutorNoteText}>
                    📝 Lưu ý: Tài khoản gia sư sẽ được admin xem xét và phê duyệt trước khi có thể sử dụng.
                  </Text>
                </View>
              </View>
            )}

            {/* Nút đăng ký */}
            <TouchableOpacity
              style={[styles.loginButton, loading && { opacity: 0.7 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Đăng ký</Text>}
            </TouchableOpacity>

            {/* Chuyển sang màn hình đăng nhập */}
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
