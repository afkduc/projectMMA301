import { useState } from "react";
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

const TutorAreaScreen = ({ onTabPress, onBack }) => {
  const [selectedRadius, setSelectedRadius] = useState("5");
  const [selectedAreas, setSelectedAreas] = useState([
    "quan1",
    "quan3",
    "quan7",
  ]);

  const radiusOptions = ["3", "5", "10", "15"];

  const areas = [
    {
      id: "quan1",
      name: "Quận 1",
      district: "Trung tâm",
      distance: "2km",
      available: true,
    },
    {
      id: "quan3",
      name: "Quận 3",
      district: "Trung tâm",
      distance: "3km",
      available: true,
    },
    {
      id: "quan5",
      name: "Quận 5",
      district: "Trung tâm",
      distance: "4km",
      available: true,
    },
    {
      id: "quan7",
      name: "Quận 7",
      district: "Phía Nam",
      distance: "8km",
      available: true,
    },
    {
      id: "quan10",
      name: "Quận 10",
      district: "Trung tâm",
      distance: "5km",
      available: true,
    },
    {
      id: "binhtan",
      name: "Bình Tân",
      district: "Phía Tây",
      distance: "12km",
      available: false,
    },
    {
      id: "thuducv",
      name: "Thủ Đức",
      district: "Phía Đông",
      distance: "15km",
      available: true,
    },
    {
      id: "binhthanh",
      name: "Bình Thạnh",
      district: "Phía Đông",
      distance: "6km",
      available: true,
    },
  ];

  const toggleArea = (areaId) => {
    const area = areas.find((a) => a.id === areaId);
    if (!area.available) {
      Alert.alert("Thông báo", "Khu vực này hiện không khả dụng");
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
      .filter((area) => area.available)
      .map((area) => area.id);
    setSelectedAreas(availableAreas);
  };

  const clearAllAreas = () => {
    setSelectedAreas([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Khu vực dạy</Text>
        <TouchableOpacity>
          <Text style={styles.saveButton}>Lưu</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.areaContent}>
        {/* Statistics */}
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

        {/* Radius Selection */}
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
                      selectedRadius === radius &&
                        styles.selectedRadiusButtonText,
                    ]}
                  >
                    {radius}km
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.areaSection}>
          <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
          <View style={styles.quickAreaActions}>
            <TouchableOpacity
              style={styles.quickAreaButton}
              onPress={selectAllAreas}
            >
              <Text style={styles.quickAreaButtonIcon}>✅</Text>
              <Text style={styles.quickAreaButtonText}>Chọn tất cả</Text>
              <Text style={styles.quickAreaButtonSubtext}>Khu vực khả dụng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAreaButton}
              onPress={clearAllAreas}
            >
              <Text style={styles.quickAreaButtonIcon}>❌</Text>
              <Text style={styles.quickAreaButtonText}>Bỏ chọn tất cả</Text>
              <Text style={styles.quickAreaButtonSubtext}>Xóa lựa chọn</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Areas Grid */}
        <View style={styles.areaSection}>
          <Text style={styles.sectionTitle}>Chọn khu vực</Text>
          <Text style={styles.sectionSubtitle}>
            Chọn các khu vực bạn muốn nhận lớp. Khu vực càng nhiều, cơ hội nhận lớp càng cao.
          </Text>
          <View style={styles.areasGrid}>
            {areas.map((area) => (
              <TouchableOpacity
                key={area.id}
                style={[
                  styles.areaCard,
                  selectedAreas.includes(area.id) && styles.selectedAreaCard,
                  !area.available && styles.disabledAreaCard,
                ]}
                onPress={() => toggleArea(area.id)}
              >
                <View style={styles.areaCardHeader}>
                  <Text
                    style={[
                      styles.areaCardName,
                      selectedAreas.includes(area.id) &&
                        styles.selectedAreaCardName,
                    ]}
                  >
                    {area.name}
                  </Text>
                  {selectedAreas.includes(area.id) && (
                    <Text style={styles.areaCardCheck}>✓</Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.areaCardDistrict,
                    selectedAreas.includes(area.id) &&
                      styles.selectedAreaCardDistrict,
                  ]}
                >
                  {area.district}
                </Text>
                <Text
                  style={[
                    styles.areaCardDistance,
                    selectedAreas.includes(area.id) &&
                      styles.selectedAreaCardDistance,
                  ]}
                >
                  Cách {area.distance}
                </Text>
                {!area.available && (
                  <Text style={styles.areaCardDisabled}>Không khả dụng</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.areaSection}>
          <View style={styles.areaTips}>
            <Text style={styles.areaTipsTitle}>💡 Mẹo tối ưu khu vực</Text>
            <Text style={styles.areaTipsText}>
              • Chọn nhiều khu vực gần nhau để tăng cơ hội nhận lớp{"\n"}• Ưu tiên các khu vực đông dân{"\n"}• Điều chỉnh theo lịch học riêng
            </Text>
          </View>
        </View>
      </ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  );
};

export default TutorAreaScreen;
