import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from "react-native"
import { styles } from "../../style/styles"
import userService from "../../service/UserService"


const EditProfileScreen = ({ visible, onClose, onSave, userInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  })
  const [errors, setErrors] = useState({})
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        phone: userInfo.phone || "",
        email: userInfo.email || "",
        address: userInfo.address || "",
        dateOfBirth: userInfo.dateOfBirth || "",
        gender: userInfo.gender || "Nam",
      })
    }
  }, [userInfo])

  const formatDateIfNeeded = (text) => {
    if (/^\d{8}$/.test(text)) {
      const day = text.slice(0, 2)
      const month = text.slice(2, 4)
      const year = text.slice(4)
      return `${day}/${month}/${year}`
    }
    return text
  }

  const validateForm = async () => {
    const newErrors = {}
    const trimmedPhone = formData.phone.replace(/\s/g, "")
    const trimmedEmail = formData.email.trim()
    const trimmedName = formData.name.trim()

    if (!trimmedName) newErrors.name = "Vui lòng nhập họ tên"

    if (!trimmedPhone) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^\d{10}$/.test(trimmedPhone)) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    } else if (trimmedPhone !== userInfo?.phone) {
      const exists = await userService.phoneExists(trimmedPhone)
      if (exists) newErrors.phone = "Số điện thoại đã được sử dụng"
    }

    if (!trimmedEmail) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Email không hợp lệ"
    } else if (trimmedEmail !== userInfo?.email) {
      const exists = await userService.emailExists(trimmedEmail)
      if (exists) newErrors.email = "Email đã được sử dụng"
    }

    if (formData.dateOfBirth.trim()) {
      const dobRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/
      if (!dobRegex.test(formData.dateOfBirth)) {
        newErrors.dateOfBirth = "Định dạng ngày sinh không hợp lệ (dd/mm/yyyy)"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (checking) return
    setChecking(true)

    const isValid = await validateForm()
    if (isValid) {
      onSave(formData)
      onClose()
    }

    setChecking(false)
  }

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender })
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { maxHeight: "90%" }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
            <View style={styles.avatarSection}>
              <Text style={styles.editProfileAvatar}>👤</Text>
              <TouchableOpacity style={styles.changeAvatarButton}>
                <Text style={styles.changeAvatarButtonText}>Đổi ảnh đại diện</Text>
              </TouchableOpacity>
            </View>

            {/* Name */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Họ và tên *</Text>
              <TextInput
                style={[styles.formInput, errors.name && styles.formInputError]}
                placeholder="Nhập họ tên"
                value={formData.name}
                onChangeText={(text) => {
                  setFormData({ ...formData, name: text })
                  if (errors.name) setErrors({ ...errors, name: null })
                }}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Phone */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Số điện thoại *</Text>
              <TextInput
                style={[styles.formInput, errors.phone && styles.formInputError]}
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChangeText={(text) => {
                  setFormData({ ...formData, phone: text })
                  if (errors.phone) setErrors({ ...errors, phone: null })
                }}
                keyboardType="phone-pad"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            {/* Email */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email *</Text>
              <TextInput
                style={[styles.formInput, errors.email && styles.formInputError]}
                placeholder="Nhập email"
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text })
                  if (errors.email) setErrors({ ...errors, email: null })
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Date of Birth */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Ngày sinh</Text>
              <TextInput
                style={[styles.formInput, errors.dateOfBirth && styles.formInputError]}
                placeholder="Nhập ngày sinh (vd: 20072003)"
                value={formData.dateOfBirth}
                onChangeText={(text) => {
                  const formatted = formatDateIfNeeded(text)
                  setFormData({ ...formData, dateOfBirth: formatted })
                  if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: null })
                }}
                keyboardType="numeric"
              />
              {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
            </View>

            {/* Gender */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Giới tính</Text>
              <View style={styles.genderContainer}>
                {["Nam", "Nữ", "Khác"].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderButton,
                      formData.gender === gender && styles.selectedGenderButton,
                    ]}
                    onPress={() => handleGenderSelect(gender)}
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        formData.gender === gender && styles.selectedGenderButtonText,
                      ]}
                    >
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Address */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Địa chỉ</Text>
              <TextInput
                style={[styles.formInput, styles.textArea]}
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>
                  {checking ? "Đang lưu..." : "Lưu thay đổi"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default EditProfileScreen
