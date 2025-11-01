import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Image,
} from 'react-native';
import { styles } from '../../style/styles';
import ServiceService from '../../service/serviceService';

const TutorEditProfileScreen = ({ visible, onClose, onSave, userInfo }) => {
  const [formData, setFormData] = useState({
    avatar: userInfo?.avatar || '👩‍🏫',
    name: userInfo?.name || 'Gia sư Minh Tuấn',
    phone: userInfo?.phone || '0901234567',
    email: userInfo?.email || 'minhtuan@email.com',
    specialty: userInfo?.specialty || 'Gia sư Toán/Anh',
    serviceId:
      Array.isArray(userInfo?.serviceId) && userInfo?.serviceId.length > 0
        ? userInfo.serviceId.map((id) => String(id))
        : [],
    experience: userInfo?.experience || '5',
    description:
      userInfo?.description ||
      'Gia sư tận tâm, 5 năm kinh nghiệm dạy kèm THCS/THPT. Phương pháp dễ hiểu, tập trung nền tảng và kỹ năng làm bài.',
    price: userInfo?.price || '150000',
    address: userInfo?.address || 'Quận 7, TP.HCM',
    skills: userInfo?.skills || [
      'Soạn giáo án cá nhân hóa',
      'Ôn thi giữa kỳ/cuối kỳ',
      'Luyện đề bám sát',
    ],
  });

  const [errors, setErrors] = useState({});
  const [newSkill, setNewSkill] = useState('');
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    if (visible) {
      ServiceService.getAllServices()
        .then((data) => {
          setAllServices(data);
        })
        .catch(console.error);
    }
  }, [visible]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!formData.serviceId.length) {
      newErrors.serviceId = 'Vui lòng chọn ít nhất 1 môn dạy';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Vui lòng nhập học phí theo giờ';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Học phí không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      Alert.alert('Thành công', 'Đã cập nhật thông tin gia sư');
      onClose();
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <Modal visible={visible} animationType='slide' transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { maxHeight: '95%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Chỉnh sửa hồ sơ gia sư</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalForm}
            showsVerticalScrollIndicator={false}
          >
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              {formData.avatar && formData.avatar.startsWith('http') ? (
                <Image
                  source={{ uri: formData.avatar }}
                  style={styles.avatarImage}
                />
              ) : (
                <Text style={styles.editProfileAvatar}>
                  {formData.avatar || '👩‍🏫'}
                </Text>
              )}
              <TouchableOpacity style={styles.changeAvatarButton}>
                <Text style={styles.changeAvatarButtonText}>
                  Đổi ảnh đại diện
                </Text>
              </TouchableOpacity>
            </View>

            {/* Basic Information */}
            <View style={styles.workerFormSection}>
              <Text style={styles.workerFormSectionTitle}>
                Thông tin cơ bản
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Họ và tên *</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    errors.name && styles.formInputError,
                  ]}
                  placeholder='Nhập họ tên'
                  value={formData.name}
                  onChangeText={(text) => {
                    setFormData({ ...formData, name: text });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Số điện thoại *</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    errors.phone && styles.formInputError,
                  ]}
                  placeholder='Nhập số điện thoại'
                  value={formData.phone}
                  onChangeText={(text) => {
                    setFormData({ ...formData, phone: text });
                    if (errors.phone) setErrors({ ...errors, phone: null });
                  }}
                  keyboardType='phone-pad'
                />
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email *</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    errors.email && styles.formInputError,
                  ]}
                  placeholder='Nhập email'
                  value={formData.email}
                  onChangeText={(text) => {
                    setFormData({ ...formData, email: text });
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
            </View>

            {/* Professional Information */}
            <View style={styles.workerFormSection}>
              <Text style={styles.workerFormSectionTitle}>
                Thông tin giảng dạy
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Môn dạy *</Text>

                <View style={styles.checkboxList}>
                  {allServices.map((service) => {
                    const isChecked = formData.serviceId.includes(
                      String(service.id)
                    );
                    return (
                      <TouchableOpacity
                        key={service.id}
                        style={styles.checkboxItem}
                        onPress={() => {
                          const serviceIdStr = String(service.id);
                          const updated = isChecked
                            ? formData.serviceId.filter(
                                (id) => id !== serviceIdStr
                              )
                            : [...formData.serviceId, serviceIdStr];
                          setFormData({ ...formData, serviceId: updated });
                        }}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            isChecked && styles.checkboxChecked,
                          ]}
                        >
                          {isChecked && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={styles.checkboxLabel}>{service.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {errors.serviceId && (
                  <Text style={styles.errorText}>{errors.serviceId}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Kinh nghiệm (năm) *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder='Số năm kinh nghiệm dạy kèm'
                  value={formData.experience}
                  onChangeText={(text) =>
                    setFormData({ ...formData, experience: text })
                  }
                  keyboardType='numeric'
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Học phí (VND/giờ) *</Text>
                <TextInput
                  style={[
                    styles.formInput,
                    errors.price && styles.formInputError,
                  ]}
                  placeholder='VD: 150000'
                  value={formData.price}
                  onChangeText={(text) => {
                    setFormData({ ...formData, price: text });
                    if (errors.price) setErrors({ ...errors, price: null });
                  }}
                  keyboardType='numeric'
                />
                {errors.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Giới thiệu / mô tả</Text>
                <TextInput
                  style={[styles.formInput, styles.textArea]}
                  placeholder='Phương pháp giảng dạy, kết quả học viên, chứng chỉ...'
                  value={formData.description}
                  onChangeText={(text) =>
                    setFormData({ ...formData, description: text })
                  }
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Khu vực dạy</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder='VD: Quận 7, TP.HCM'
                  value={formData.address}
                  onChangeText={(text) =>
                    setFormData({ ...formData, address: text })
                  }
                />
              </View>
            </View>

            {/* Skills Section */}
            <View style={styles.workerFormSection}>
              <Text style={styles.workerFormSectionTitle}>
                Kỹ năng giảng dạy
              </Text>

              <View style={styles.skillsContainer}>
                {formData.skills.map((skill, index) => (
                  <View key={index} style={styles.skillChip}>
                    <Text style={styles.skillChipText}>{skill}</Text>
                    <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
                      <Text style={styles.skillRemoveButton}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <View style={styles.addSkillContainer}>
                <TextInput
                  style={[styles.formInput, { flex: 1, marginRight: 10 }]}
                  placeholder='Thêm kỹ năng (VD: Giao bài & phản hồi nhanh)'
                  value={newSkill}
                  onChangeText={setNewSkill}
                />
                <TouchableOpacity
                  style={styles.addSkillButton}
                  onPress={handleAddSkill}
                >
                  <Text style={styles.addSkillButtonText}>Thêm</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TutorEditProfileScreen;
