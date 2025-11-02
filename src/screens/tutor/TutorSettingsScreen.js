import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { styles } from "../../style/additional";
import { TutorBottomNav } from "../../components/BottomNavigation";

const TutorSettingsScreen = ({ onTabPress, onBack }) => {
  const [settings, setSettings] = useState({
    // Notification settings
    orderNotifications: true,     // thông báo lớp mới
    messageNotifications: true,   // tin nhắn từ phụ huynh/học viên
    promotionNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true,

    // Privacy settings
    showPhoneNumber: true,
    showEmail: false,
    allowReviews: true,
    shareLocation: true,

    // Teaching settings
    workingMode: "auto", // auto, manual
    maxOrdersPerDay: "10",
    autoAcceptOrders: false,
    workingHours: "flexible", // flexible, fixed
  });

  const [workingModes] = useState([
    { id: "auto", label: "Tự động", description: "Hệ thống tự động đề xuất lớp phù hợp" },
    { id: "manual", label: "Thủ công", description: "Bạn chủ động chọn lớp muốn dạy" },
  ]);

  const orderLimits = ["5", "10", "15", "20", "Không giới hạn"];

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: () => {
        // Handle logout
      }},
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Xóa tài khoản",
      "Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", style: "destructive", onPress: () => {
          // Handle account deletion
        }},
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
        {/* Notification Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Thông báo</Text>
          <View style={styles.settingsGroup}>
            <View className={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Thông báo lớp mới</Text>
                <Text style={styles.settingSubtitle}>Nhận thông báo khi có lớp phù hợp</Text>
              </View>
              <Switch
                value={settings.orderNotifications}
                onValueChange={(value) => updateSetting("orderNotifications", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.orderNotifications ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Thông báo tin nhắn</Text>
                <Text style={styles.settingSubtitle}>Tin nhắn từ phụ huynh/học viên</Text>
              </View>
              <Switch
                value={settings.messageNotifications}
                onValueChange={(value) => updateSetting("messageNotifications", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.messageNotifications ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Thông báo khuyến mãi</Text>
                <Text style={styles.settingSubtitle}>Ưu đãi và chương trình mới</Text>
              </View>
              <Switch
                value={settings.promotionNotifications}
                onValueChange={(value) => updateSetting("promotionNotifications", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.promotionNotifications ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Âm thanh</Text>
                <Text style={styles.settingSubtitle}>Phát âm thanh khi có thông báo</Text>
              </View>
              <Switch
                value={settings.soundEnabled}
                onValueChange={(value) => updateSetting("soundEnabled", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.soundEnabled ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Rung</Text>
                <Text style={styles.settingSubtitle}>Rung khi có thông báo</Text>
              </View>
              <Switch
                value={settings.vibrationEnabled}
                onValueChange={(value) => updateSetting("vibrationEnabled", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.vibrationEnabled ? "#ffffff" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Quyền riêng tư</Text>
          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Hiển thị số điện thoại</Text>
                <Text style={styles.settingSubtitle}>Cho phép phụ huynh/học viên xem số</Text>
              </View>
              <Switch
                value={settings.showPhoneNumber}
                onValueChange={(value) => updateSetting("showPhoneNumber", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.showPhoneNumber ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Hiển thị email</Text>
                <Text style={styles.settingSubtitle}>Cho phép phụ huynh/học viên xem email</Text>
              </View>
              <Switch
                value={settings.showEmail}
                onValueChange={(value) => updateSetting("showEmail", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.showEmail ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Cho phép đánh giá</Text>
                <Text style={styles.settingSubtitle}>Phụ huynh/học viên có thể đánh giá</Text>
              </View>
              <Switch
                value={settings.allowReviews}
                onValueChange={(value) => updateSetting("allowReviews", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.allowReviews ? "#ffffff" : "#f3f4f6"}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Chia sẻ vị trí</Text>
                <Text style={styles.settingSubtitle}>Giúp phụ huynh tìm gia sư gần bạn</Text>
              </View>
              <Switch
                value={settings.shareLocation}
                onValueChange={(value) => updateSetting("shareLocation", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.shareLocation ? "#ffffff" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* Teaching Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Cài đặt dạy học</Text>

          <View style={styles.settingsGroup}>
            <Text style={styles.settingTitle}>Chế độ nhận lớp</Text>
            <View style={styles.workingModeSelector}>
              {workingModes.map((mode) => (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.workingModeOption,
                    settings.workingMode === mode.id && styles.selectedWorkingMode,
                  ]}
                  onPress={() => updateSetting("workingMode", mode.id)}
                >
                  <View style={styles.workingModeInfo}>
                    <Text
                      style={[
                        styles.workingModeLabel,
                        settings.workingMode === mode.id && styles.selectedWorkingModeLabel,
                      ]}
                    >
                      {mode.label}
                    </Text>
                    <Text style={styles.workingModeDesc}>{mode.description}</Text>
                  </View>
                  {settings.workingMode === mode.id && <Text style={styles.workingModeCheck}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingsGroup}>
            <Text style={styles.settingTitle}>Giới hạn lớp/ngày</Text>
            <View style={styles.orderLimitSelector}>
              {orderLimits.map((limit) => (
                <TouchableOpacity
                  key={limit}
                  style={[
                    styles.orderLimitButton,
                    settings.maxOrdersPerDay === limit && styles.selectedOrderLimit,
                  ]}
                  onPress={() => updateSetting("maxOrdersPerDay", limit)}
                >
                  <Text
                    style={[
                      styles.orderLimitText,
                      settings.maxOrdersPerDay === limit && styles.selectedOrderLimitText,
                    ]}
                  >
                    {limit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingsGroup}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Tự động nhận lớp</Text>
                <Text style={styles.settingSubtitle}>Tự động chấp nhận lớp phù hợp</Text>
              </View>
              <Switch
                value={settings.autoAcceptOrders}
                onValueChange={(value) => updateSetting("autoAcceptOrders", value)}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={settings.autoAcceptOrders ? "#ffffff" : "#f3f4f6"}
              />
            </View>
          </View>
        </View>

        {/* App Settings */}
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
              <Text style={styles.appInfoValue}>1.2.3</Text>
            </View>
            <View style={styles.appInfoItem}>
              <Text style={styles.appInfoLabel}>Cập nhật cuối</Text>
              <TouchableOpacity>
                <Text style={styles.appInfoAction}>Kiểm tra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingActionItem} onPress={handleLogout}>
            <Text style={styles.settingActionText}>Đăng xuất</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingActionItem} onPress={handleDeleteAccount}>
            <Text style={[styles.settingActionText, styles.dangerText]}>Xóa tài khoản</Text>
            <Text style={styles.settingActionArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  );
};

export default TutorSettingsScreen;
