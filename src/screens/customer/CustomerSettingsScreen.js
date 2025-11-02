import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../../style/additional";
import { CustomerBottomNav } from "../../components/BottomNavigation";

const CustomerSettingsScreen = ({ onTabPress, onBack }) => {
  const [settings, setSettings] = useState({
    // Cài đặt thông báo
    bookingNotifications: true,
    tutorNotifications: true,
    reminderNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,

    // Cài đặt quyền riêng tư
    shareLocation: true,
    allowReviews: true,
    showProfile: true,
    dataCollection: false,

    // Cài đặt gợi ý dịch vụ
    preferredTime: "morning", // morning, afternoon, evening, flexible
    maxDistance: "10", // km
    priceRange: "medium", // low, medium, high, any
    autoBooking: false,
  });

  const timePreferences = [
    { id: "morning", label: "Buổi sáng", time: "6:00 - 12:00" },
    { id: "afternoon", label: "Buổi chiều", time: "12:00 - 18:00" },
    { id: "evening", label: "Buổi tối", time: "18:00 - 22:00" },
    { id: "flexible", label: "Linh hoạt", time: "Bất kỳ lúc nào" },
  ];

  const distanceOptions = ["3", "5", "10", "15", "20"];

  const priceRanges = [
    { id: "low", label: "Giá thấp", range: "< 100k/buổi" },
    { id: "medium", label: "Trung bình", range: "100k - 300k/buổi" },
    { id: "high", label: "Cao cấp", range: "> 300k/buổi" },
    { id: "any", label: "Bất kỳ", range: "Không giới hạn" },
  ];

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          // TODO: Gọi hàm logout thực tế
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Xóa tài khoản",
      "Hành động này không thể hoàn tác. Mọi thông tin tài khoản, lịch học và đánh giá sẽ bị xóa vĩnh viễn.",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            // TODO: Gọi API xóa tài khoản
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Cài đặt</Text>
        <View />
      </View>

      <ScrollView style={styles.settingsContent}>
        {/* Thông báo */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Thông báo</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Thông báo đặt lịch</Text>
                <Text style={styles.settingSubtitle}>
                  Cập nhật trạng thái buổi học hoặc lịch học mới
                </Text>
              </View>
              <Switch
                value={settings.bookingNotifications}
                onValueChange={(v) => updateSetting("bookingNotifications", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.bookingNotifications ? "#fff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Thông báo gia sư</Text>
                <Text style={styles.settingSubtitle}>
                  Khi có gia sư mới hoặc đề xuất phù hợp
                </Text>
              </View>
              <Switch
                value={settings.tutorNotifications}
                onValueChange={(v) => updateSetting("tutorNotifications", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.tutorNotifications ? "#fff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Nhắc nhở học</Text>
                <Text style={styles.settingSubtitle}>
                  Nhắc giờ học và thanh toán
                </Text>
              </View>
              <Switch
                value={settings.reminderNotifications}
                onValueChange={(v) => updateSetting("reminderNotifications", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.reminderNotifications ? "#fff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Âm thanh</Text>
                <Text style={styles.settingSubtitle}>
                  Phát âm thanh khi có thông báo
                </Text>
              </View>
              <Switch
                value={settings.soundEnabled}
                onValueChange={(v) => updateSetting("soundEnabled", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.soundEnabled ? "#fff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Rung thông báo</Text>
                <Text style={styles.settingSubtitle}>Rung khi có tin mới</Text>
              </View>
              <Switch
                value={settings.vibrationEnabled}
                onValueChange={(v) => updateSetting("vibrationEnabled", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.vibrationEnabled ? "#fff" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* Quyền riêng tư */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Quyền riêng tư</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Chia sẻ vị trí</Text>
                <Text style={styles.settingSubtitle}>
                  Giúp đề xuất gia sư gần bạn hơn
                </Text>
              </View>
              <Switch
                value={settings.shareLocation}
                onValueChange={(v) => updateSetting("shareLocation", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.shareLocation ? "#fff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Cho phép đánh giá</Text>
                <Text style={styles.settingSubtitle}>
                  Gia sư có thể xem phản hồi của bạn
                </Text>
              </View>
              <Switch
                value={settings.allowReviews}
                onValueChange={(v) => updateSetting("allowReviews", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.allowReviews ? "#fff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Hiển thị hồ sơ</Text>
                <Text style={styles.settingSubtitle}>
                  Gia sư có thể xem thông tin cơ bản của bạn
                </Text>
              </View>
              <Switch
                value={settings.showProfile}
                onValueChange={(v) => updateSetting("showProfile", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.showProfile ? "#fff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Thu thập dữ liệu</Text>
                <Text style={styles.settingSubtitle}>
                  Giúp cải thiện chất lượng ứng dụng
                </Text>
              </View>
              <Switch
                value={settings.dataCollection}
                onValueChange={(v) => updateSetting("dataCollection", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.dataCollection ? "#fff" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* Tùy chọn dịch vụ */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Tùy chọn học tập</Text>

          <View style={styles.settingsGroup}>
            <Text style={styles.settingTitle}>Thời gian học ưa thích</Text>
            <View style={styles.timePreferenceSelector}>
              {timePreferences.map((time) => (
                <TouchableOpacity
                  key={time.id}
                  style={[
                    styles.timePreferenceOption,
                    settings.preferredTime === time.id &&
                      styles.selectedTimePreference,
                  ]}
                  onPress={() => updateSetting("preferredTime", time.id)}
                >
                  <View style={styles.timePreferenceInfo}>
                    <Text
                      style={[
                        styles.timePreferenceLabel,
                        settings.preferredTime === time.id &&
                          styles.selectedTimePreferenceLabel,
                      ]}
                    >
                      {time.label}
                    </Text>
                    <Text style={styles.timePreferenceTime}>{time.time}</Text>
                  </View>
                  {settings.preferredTime === time.id && (
                    <Text style={styles.timePreferenceCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingsGroup}>
            <Text style={styles.settingTitle}>Khoảng cách tối đa (km)</Text>
            <View style={styles.distanceSelector}>
              {distanceOptions.map((distance) => (
                <TouchableOpacity
                  key={distance}
                  style={[
                    styles.distanceButton,
                    settings.maxDistance === distance &&
                      styles.selectedDistance,
                  ]}
                  onPress={() => updateSetting("maxDistance", distance)}
                >
                  <Text
                    style={[
                      styles.distanceText,
                      settings.maxDistance === distance &&
                        styles.selectedDistanceText,
                    ]}
                  >
                    {distance}km
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingsGroup}>
            <Text style={styles.settingTitle}>Mức giá ưa thích</Text>
            <View style={styles.priceRangeSelector}>
              {priceRanges.map((price) => (
                <TouchableOpacity
                  key={price.id}
                  style={[
                    styles.priceRangeOption,
                    settings.priceRange === price.id &&
                      styles.selectedPriceRange,
                  ]}
                  onPress={() => updateSetting("priceRange", price.id)}
                >
                  <View style={styles.priceRangeInfo}>
                    <Text
                      style={[
                        styles.priceRangeLabel,
                        settings.priceRange === price.id &&
                          styles.selectedPriceRangeLabel,
                      ]}
                    >
                      {price.label}
                    </Text>
                    <Text style={styles.priceRangeRange}>{price.range}</Text>
                  </View>
                  {settings.priceRange === price.id && (
                    <Text style={styles.priceRangeCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Tự động gợi ý gia sư</Text>
                <Text style={styles.settingSubtitle}>
                  Hệ thống tự đề xuất gia sư phù hợp nhất
                </Text>
              </View>
              <Switch
                value={settings.autoBooking}
                onValueChange={(v) => updateSetting("autoBooking", v)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.autoBooking ? "#fff" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* Ứng dụng */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Ứng dụng</Text>

          <TouchableOpacity style={styles.settingActionItem}>
            <Text style={styles.settingActionText}>Ngôn ngữ</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.settingValue}>Tiếng Việt</Text>
              <Text style={styles.settingActionArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingActionItem}>
            <Text style={styles.settingActionText}>Điều khoản sử dụng</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingActionItem}>
            <Text style={styles.settingActionText}>Chính sách bảo mật</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingActionItem}>
            <Text style={styles.settingActionText}>Liên hệ hỗ trợ</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.appInfoContainer}>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Phiên bản ứng dụng</Text>
              <Text style={styles.appInfoValue}>1.0.0</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Cập nhật cuối</Text>
              <TouchableOpacity>
                <Text style={styles.appInfoAction}>Kiểm tra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tài khoản */}
        <View style={styles.settingsSection}>
          <TouchableOpacity
            style={styles.settingActionItem}
            onPress={handleLogout}
          >
            <Text style={styles.settingActionText}>Đăng xuất</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingActionItem}
            onPress={handleDeleteAccount}
          >
            <Text style={[styles.settingActionText, styles.dangerText]}>
              Xóa tài khoản
            </Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default CustomerSettingsScreen;
