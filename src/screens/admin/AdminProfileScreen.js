import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, ActivityIndicator } from "react-native";
import { styles } from "../../style/styles";
import { adminMenuItems } from "../../data/mockData";
import { AdminBottomNav } from "../../components/BottomNavigation";
import FirebaseService from "../../service/firebaseService";
import EditProfileScreen from "./EditProfileScreen";
import userService from "../../service/UserService";
import { getCurrentUserId } from "../../utils/auth";
import TutorSessionsService from "../../service/TutorSessionsService";

const AdminProfileScreen = ({ onTabPress, onLogout, onMenuPress }) => {
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTutors: 0,
        totalBookings: 0,
    });

    // Lấy thông tin admin
    const fetchUserInfo = async () => {
        setLoading(true);
        try {
            const userId = await getCurrentUserId();
            const userData = await userService.getUserById(userId);
            if (userData) setUserInfo({ ...userData, id: userId });
        } catch (error) {
            console.error("Error fetching user info:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    // Lấy thống kê tổng quan
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [users, tutors, bookings] = await Promise.all([
                    FirebaseService.readAll("users"),
                    FirebaseService.readAll("tutors"),
                    FirebaseService.readAll("tutorSessions"),
                ]);

                setStats({
                    totalUsers: users.length,
                    totalTutors: tutors.length,
                    totalBookings: bookings.length,
                });
            } catch (error) {
                console.error("Error fetching admin stats:", error);
            }
        };

        fetchStats();
    }, []);

    const handleMenuPress = (screen) => {
        if (screen && onMenuPress) onMenuPress(screen);
        else Alert.alert("Thông báo", "Chức năng đang được phát triển");
    };

    const handleLogout = () => {
        Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
            { text: "Hủy", style: "cancel" },
            { text: "Đăng xuất", style: "destructive", onPress: onLogout },
        ]);
    };

    const handleSaveProfile = async (newUserInfo) => {
        try {
            await userService.updateUser(newUserInfo.id, newUserInfo);
            setUserInfo(newUserInfo);
            setShowEditProfile(false);
            Alert.alert("Thành công", "Đã lưu thông tin cá nhân.");
        } catch (error) {
            Alert.alert("Lỗi", "Không thể lưu thông tin. Vui lòng thử lại.");
            console.error(error);
        }
    };

    if (loading || !userInfo) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 50 }} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileAvatar}>👨‍💼</Text>
                        <View>
                            <Text style={styles.userName}>{userInfo.name}</Text>
                            <Text style={styles.userPhone}>{userInfo.phone}</Text>
                            <Text style={styles.userPhone}>{userInfo.email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => setShowEditProfile(true)}>
                        <Text style={styles.editButtonText}>Sửa</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{stats.totalUsers}</Text>
                        <Text style={styles.statLabel}>Người dùng</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{stats.totalTutors}</Text>
                        <Text style={styles.statLabel}>Gia sư</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{stats.totalBookings}</Text>
                        <Text style={styles.statLabel}>Buổi học</Text>
                    </View>
                </View>

                {/* Menu */}
                <View style={styles.menuContainer}>
                    {adminMenuItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item.screen)}>
                            <View style={styles.menuLeft}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                            </View>
                            <Text style={styles.menuArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                </TouchableOpacity>
            </ScrollView>

            <EditProfileScreen
                visible={showEditProfile}
                onClose={() => setShowEditProfile(false)}
                onSave={handleSaveProfile}
                userInfo={userInfo}
            />

            <AdminBottomNav onTabPress={onTabPress} activeTab="adminProfile" />
        </SafeAreaView>
    );
};

export default AdminProfileScreen;
