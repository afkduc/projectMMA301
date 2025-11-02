import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../../style/additional";
import { CustomerBottomNav } from "../../components/BottomNavigation";
import userService from "../../service/UserService";
import { getCurrentUserId } from "../../utils/auth";

const PersonalInfoScreen = ({ onTabPress, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const genderOptions = ["Nam", "Nữ", "Khác"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = await getCurrentUserId();
        setUserId(uid);

        const userData = await userService.getUserById(uid);
        if (userData) {
          setPersonalInfo(userData);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateInfo = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await userService.updateUser(userId, personalInfo);
      setIsEditing(false);
      Alert.alert("Thành công", "Thông tin đã được cập nhật.");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      Alert.alert("Lỗi", "Không thể lưu thay đổi.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading || !personalInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ padding: 20 }}>Đang tải thông tin...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Thông tin cá nhân</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButton}>{isEditing ? "Hủy" : "Sửa"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.personalInfoContent}>
        <View style={styles.personalInfoAvatar}>
          <Text style={styles.avatarIcon}>👤</Text>
          <Text style={styles.personalInfoName}>{personalInfo.name}</Text>
          <View style={styles.membershipBadge}>
            <Text style={styles.membershipText}>THÀNH VIÊN VIP</Text>
          </View>
          <Text style={styles.memberSinceText}>
            Thành viên từ {personalInfo.memberSince || "2024"}
          </Text>
        </View>

        {/* Basic Info */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          {[
            { label: "Họ tên", field: "name" },
            {
              label: "Số điện thoại",
              field: "phone",
              keyboardType: "phone-pad",
            },
            { label: "Email", field: "email", keyboardType: "email-address" },
            {
              label: "Ngày sinh",
              field: "dateOfBirth",
              placeholder: "DD/MM/YYYY",
            },
          ].map(({ label, field, keyboardType, placeholder }) => (
            <View key={field} style={styles.personalInfoRow}>
              <Text style={styles.personalInfoLabel}>{label}</Text>
              {isEditing ? (
                <TextInput
                  style={styles.personalInfoInput}
                  value={personalInfo[field]}
                  onChangeText={(text) => updateInfo(field, text)}
                  keyboardType={keyboardType}
                  placeholder={placeholder}
                />
              ) : (
                <Text style={styles.personalInfoValue}>
                  {personalInfo[field]}
                </Text>
              )}
            </View>
          ))}

          {/* Gender */}
          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Giới tính</Text>
            {isEditing ? (
              <View style={styles.genderSelector}>
                {genderOptions.map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderOption,
                      personalInfo.gender === gender &&
                        styles.selectedGenderOption,
                    ]}
                    onPress={() => updateInfo("gender", gender)}
                  >
                    <Text
                      style={[
                        styles.genderOptionText,
                        personalInfo.gender === gender &&
                          styles.selectedGenderOptionText,
                      ]}
                    >
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.personalInfoValue}>
                {personalInfo.gender}
              </Text>
            )}
          </View>
        </View>

        {/* Address Info */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Địa chỉ</Text>
          <View style={styles.personalInfoRow}>
            <Text style={styles.personalInfoLabel}>Địa chỉ hiện tại</Text>
            {isEditing ? (
              <TextInput
                style={[styles.personalInfoInput, styles.personalInfoTextArea]}
                value={personalInfo.address}
                onChangeText={(text) => updateInfo("address", text)}
                multiline
              />
            ) : (
              <Text style={styles.personalInfoValue}>
                {personalInfo.address}
              </Text>
            )}
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Liên hệ khẩn cấp</Text>
          {[
            { label: "Tên người liên hệ", field: "emergencyName" },
            {
              label: "Số điện thoại",
              field: "emergencyContact",
              keyboardType: "phone-pad",
            },
          ].map(({ label, field, keyboardType }) => (
            <View key={field} style={styles.personalInfoRow}>
              <Text style={styles.personalInfoLabel}>{label}</Text>
              {isEditing ? (
                <TextInput
                  style={styles.personalInfoInput}
                  value={personalInfo[field]}
                  onChangeText={(text) => updateInfo(field, text)}
                  keyboardType={keyboardType}
                />
              ) : (
                <Text style={styles.personalInfoValue}>
                  {personalInfo[field]}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Save / Cancel Buttons */}
        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelEditButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelEditButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveEditButton}
              onPress={handleSave}
            >
              <Text style={styles.saveEditButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
