import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "../../style/additional";
import { TutorBottomNav } from "../../components/BottomNavigation";
import TutorService from "../../service/tutorService";
import { getCurrentUserId } from "../../utils/auth";

const TutorAreaScreen = ({ onTabPress, onBack }) => {
  const [selectedRadius, setSelectedRadius] = useState("5"); // km
  const [selectedAreas, setSelectedAreas] = useState(["caugiay", "thanhxuan", "dongda"]);
  const [saving, setSaving] = useState(false);

  const radiusOptions = ["3", "5", "10", "15"];

  // Kho dữ liệu khu vực (đơn vị km số)
  const areas = useMemo(
    () => [
      { id: "caugiay",    name: "Cầu Giấy",   district: "Trung tâm", distanceKm: 2 },
      { id: "thanhxuan",  name: "Thanh Xuân", district: "Trung tâm", distanceKm: 3 },
      { id: "dongda",     name: "Đống Đa",    district: "Trung tâm", distanceKm: 5 },
      { id: "bactuliem",  name: "Bắc Từ Liêm",district: "Phía Bắc",  distanceKm: 8 },
      { id: "mydinh",     name: "Mỹ Đình",    district: "Trung tâm", distanceKm: 5 },
      { id: "longbien",   name: "Long Biên",  district: "Phía Đông", distanceKm: 12 },
      { id: "thanhtri",   name: "Thanh Trì",  district: "Phía Tây",  distanceKm: 15 },
      { id: "tayho",      name: "Tây Hồ",     district: "Phía Đông", distanceKm: 6 },
    ],
    []
  );

  const currentRadius = Number(selectedRadius);
  const isAreaAvailable = (area) => area.distanceKm <= currentRadius;

  const toggleArea = (areaId) => {
    const area = areas.find((a) => a.id === areaId);
    if (!area) return;

    if (!isAreaAvailable(area)) {
      Alert.alert(
        "Thông báo",
        `Khu vực ${area.name} cách ${area.distanceKm}km, vượt quá bán kính ${currentRadius}km hiện tại`
      );
      return;
    }

    setSelectedAreas((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    );
  };

  const selectAllAreas = () => {
    const availableAreas = areas
      .filter((a) => isAreaAvailable(a))
      .map((a) => a.id);
    setSelectedAreas(availableAreas);
  };

  const clearAllAreas = () => setSelectedAreas([]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const uid = await getCurrentUserId();
      if (!uid) {
        Alert.alert("Lỗi", "Không xác định được người dùng hiện tại.");
        return;
      }

      const tutor = await TutorService.getTutorByUserId(uid);
      if (!tutor?.id) {
        Alert.alert("Lỗi", "Không tìm thấy hồ sơ gia sư.");
        return;
      }

      await TutorService.updateTutor(tutor.id, {
        radiusKm: currentRadius,
        areas: selectedAreas,
      });

      Alert.alert("Thành công", "Đã lưu khu vực & bán kính hoạt động.");

      // 🔙 QUAY LẠI MÀN TRƯỚC NGAY SAU KHI LƯU
      if (onBack) onBack();
    } catch (e) {
      Alert.alert("Lỗi", "Không thể lưu thay đổi. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Khu vực dạy</Text>
        <TouchableOpacity onPress={handleSave} disabled={saving}>
          <Text style={[styles.saveButton, saving && { opacity: 0.6 }]}>
            {saving ? "Đang lưu..." : "Lưu"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.areaContent}>
        {/* Thống kê */}
        <View style={styles.areaStatsSection}>
          <Text style={styles.sectionTitle}>Thống kê khu vực</Text>
          <View style={styles.areaStatsGrid}>
            <View style={styles.areaStatCard}>
              <Text style={styles.areaStatNumber}>{selectedAreas.length}</Text>
              <Text style={styles.areaStatLabel}>Khu vực đã chọn</Text>
            </View>
            <View style={styles.areaStatCard}>
              <Text style={styles.areaStatNumber}>24</Text>
              <Text style={styles.areaStatLabel}>Lớp tuần này</Text>
            </View>
            <View style={styles.areaStatCard}>
              <Text style={styles.areaStatNumber}>85%</Text>
              <Text style={styles.areaStatLabel}>Tỷ lệ nhận lớp</Text>
            </View>
          </View>
        </View>

        {/* Bán kính */}
        <View style={styles.areaSection}>
          <Text style={styles.sectionTitle}>Bán kính hoạt động</Text>
          <Text style={styles.sectionSubtitle}>
            Chọn bán kính tối đa bạn sẵn sàng di chuyển để nhận lớp
          </Text>
          <View style={styles.radiusSelector}>
            <Text style={styles.radiusLabel}>Bán kính (km)</Text>
            <View style={styles.radiusButtons}>
              {radiusOptions.map((radius) => (
                <TouchableOpacity
                  key={radius}
                  style={[
                    styles.radiusButton,
                    selectedRadius === radius && styles.selectedRadiusButton,
                  ]}
                  onPress={() => setSelectedRadius(radius)}
                >
                  <Text
                    style={[
                      styles.radiusButtonText,
                      selectedRadius === radius && styles.selectedRadiusButtonText,
                    ]}
                  >
                    {radius}km
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Thao tác nhanh */}
        <View style={styles.areaSection}>
          <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
          <View style={styles.quickAreaActions}>
            <TouchableOpacity style={styles.quickAreaButton} onPress={selectAllAreas}>
              <Text style={styles.quickAreaButtonIcon}>✅</Text>
              <Text style={styles.quickAreaButtonText}>Chọn tất cả</Text>
              <Text style={styles.quickAreaButtonSubtext}>Theo bán kính hiện tại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAreaButton} onPress={clearAllAreas}>
              <Text style={styles.quickAreaButtonIcon}>❌</Text>
              <Text style={styles.quickAreaButtonText}>Bỏ chọn tất cả</Text>
              <Text style={styles.quickAreaButtonSubtext}>Xóa lựa chọn</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lưới khu vực */}
        <View style={styles.areaSection}>
          <Text style={styles.sectionTitle}>Chọn khu vực</Text>
          <Text style={styles.sectionSubtitle}>
            Chỉ các khu vực trong bán kính {currentRadius}km là khả dụng.
          </Text>

          <View style={styles.areasGrid}>
            {areas.map((area) => {
              const available = isAreaAvailable(area);
              const selected = selectedAreas.includes(area.id);

              return (
                <TouchableOpacity
                  key={area.id}
                  style={[
                    styles.areaCard,
                    selected && styles.selectedAreaCard,
                    !available && styles.disabledAreaCard,
                  ]}
                  onPress={() => toggleArea(area.id)}
                >
                  <View style={styles.areaCardHeader}>
                    <Text
                      style={[
                        styles.areaCardName,
                        selected && styles.selectedAreaCardName,
                      ]}
                    >
                      {area.name}
                    </Text>
                    {selected && <Text style={styles.areaCardCheck}>✓</Text>}
                  </View>

                  <Text
                    style={[
                      styles.areaCardDistrict,
                      selected && styles.selectedAreaCardDistrict,
                    ]}
                  >
                    {area.district}
                  </Text>

                  <Text
                    style={[
                      styles.areaCardDistance,
                      selected && styles.selectedAreaCardDistance,
                    ]}
                  >
                    Cách {area.distanceKm}km
                  </Text>

                  {!available && (
                    <Text style={styles.areaCardDisabled}>
                      Không khả dụng ({currentRadius}km)
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.areaSection}>
          <View style={styles.areaTips}>
            <Text style={styles.areaTipsTitle}>💡 Mẹo tối ưu khu vực</Text>
            <Text style={styles.areaTipsText}>
              • Chọn nhiều khu vực gần nhau để tăng cơ hội nhận lớp{"\n"}• Ưu tiên các
              khu vực đông dân{"\n"}• Điều chỉnh theo lịch học riêng
            </Text>
          </View>
        </View>
      </ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  );
};

export default TutorAreaScreen;
