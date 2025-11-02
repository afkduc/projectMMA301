import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    TextInput,
    Switch,
} from "react-native";
import { styles } from "../../style/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";

const SystemSettingsScreen = ({ onTabPress, onBack }) => {
    const [appName, setAppName] = useState("Thợ Gần Tôi");
    const [contactEmail, setContactEmail] = useState("support@thogantoi.com");
    const [contactPhone, setContactPhone] = useState("1900-1234");
    const [pushNotifications, setPushNotifications] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    const handleUpdateAppInfo = () => {
        Alert.alert("Cập nhật thông tin app", "Đã cập nhật thông tin ứng dụng");
    };

    const handleSendNotification = () => {
        Alert.prompt(
            "Gửi thông báo",
            "Nhập nội dung thông báo:",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Gửi",
                    onPress: (message) => {
                        if (message) {
                            Alert.alert(
                                "Thành công",
                                "Đã gửi thông báo đến tất cả người dùng"
                            );
                        }
                    },
                },
            ],
            "plain-text",
            "Thông báo từ hệ thống..."
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenHeader}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={styles.backButton}>← Quay lại</Text>
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Cài đặt hệ thống</Text>
                <TouchableOpacity>
                    <Text style={styles.filterButton}>⚙️</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.settingsContent}
                showsVerticalScrollIndicator={false}
            >
                {/* App Information */}
                <View style={styles.settingsSection}>
                    <Text style={styles.settingsSectionTitle}>Thông tin ứng dụng</Text>

                    <View style={styles.settingsItem}>
                        <Text style={styles.settingsLabel}>Tên ứng dụng</Text>
                        <TextInput
                            style={styles.settingsInput}
                            value={appName}
                            onChangeText={setAppName}
                            placeholder="Tên ứng dụng"
                        />
                    </View>

                    <View style={styles.settingsItem}>
                        <Text style={styles.settingsLabel}>Email hỗ trợ</Text>
                        <TextInput
                            style={styles.settingsInput}
                            value={contactEmail}
                            onChangeText={setContactEmail}
                            placeholder="Email hỗ trợ"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.settingsItem}>
                        <Text style={styles.settingsLabel}>Hotline</Text>
                        <TextInput
                            style={styles.settingsInput}
                            value={contactPhone}
                            onChangeText={setContactPhone}
                            placeholder="Số điện thoại hỗ trợ"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={handleUpdateAppInfo}
                    >
                        <Text style={styles.settingsButtonText}>Cập nhật thông tin</Text>
                    </TouchableOpacity>
                </View>

                {/* System Settings */}
                <View style={styles.settingsSection}>
                    <Text style={styles.settingsSectionTitle}>Cài đặt hệ thống</Text>

                    <View style={styles.settingsToggleItem}>
                        <View style={styles.settingsToggleInfo}>
                            <Text style={styles.settingsToggleTitle}>Thông báo đẩy</Text>
                            <Text style={styles.settingsToggleSubtitle}>
                                Cho phép gửi thông báo đến người dùng
                            </Text>
                        </View>
                        <Switch
                            value={pushNotifications}
                            onValueChange={setPushNotifications}
                            trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                            thumbColor={pushNotifications ? "#ffffff" : "#f3f4f6"}
                        />
                    </View>

                    <View style={styles.settingsToggleItem}>
                        <View style={styles.settingsToggleInfo}>
                            <Text style={styles.settingsToggleTitle}>Chế độ bảo trì</Text>
                            <Text style={styles.settingsToggleSubtitle}>
                                Tạm dừng hoạt động của ứng dụng
                            </Text>
                        </View>
                        <Switch
                            value={maintenanceMode}
                            onValueChange={setMaintenanceMode}
                            trackColor={{ false: "#e5e7eb", true: "#ef4444" }}
                            thumbColor={maintenanceMode ? "#ffffff" : "#f3f4f6"}
                        />
                    </View>
                </View>

                {/* Notifications */}
                <View style={styles.settingsSection}>
                    <Text style={styles.settingsSectionTitle}>Thông báo</Text>

                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={handleSendNotification}
                    >
                        <Text style={styles.settingsButtonText}>
                            📢 Gửi thông báo tới tất cả
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <AdminBottomNav onTabPress={onTabPress} activeTab="systemSettings" />
        </SafeAreaView>
    );
};

export default SystemSettingsScreen;
