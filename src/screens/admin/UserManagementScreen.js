import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Alert,
    TextInput,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { styles } from "../../style/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";
import EditUserModal from "../../components/EditUserModal";
import userService from "../../service/UserService";

const UserManagementScreen = ({ onTabPress, onBack }) => {
    const [userList, setUserList] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [loading, setLoading] = useState(true);

    const [editingUser, setEditingUser] = useState(null);
    const [isEditModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const users = await userService.getAllUsers();
            setUserList(users || []);
        } catch (error) {
            console.error("❌ Error reading all users:", error);
            Alert.alert("Lỗi", "Không thể tải danh sách người dùng.");
        } finally {
            setLoading(false);
        }
    };

    const isCustomerRole = (role) => role === "customer" || role === "student";

    useEffect(() => {
        const filtered = userList.filter((user) => {
            const matchesSearch =
                user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                user.phone?.includes(searchText);

            let matchesRole = false;
            if (filterRole === "all") matchesRole = true;
            else if (filterRole === "customer") matchesRole = isCustomerRole(user.role);
            else matchesRole = user.role === filterRole;

            return matchesSearch && matchesRole;
        });
        setFilteredUsers(filtered);
    }, [userList, searchText, filterRole]);

    const handleEditUser = (user) => {
        setEditingUser(user);
        setEditModalVisible(true);
    };

    const handleDeleteUser = (userId) => {
        Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa người dùng này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: async () => {
                    await userService.deleteUser(userId);
                    fetchUsers();
                    Alert.alert("Đã xóa", "Người dùng đã được xóa.");
                },
            },
        ]);
    };

    const handleSaveUser = async (updatedUser) => {
        await userService.updateUser(updatedUser.id, updatedUser);
        setEditModalVisible(false);
        setEditingUser(null);
        fetchUsers();
        Alert.alert("Thành công", "Đã cập nhật thông tin người dùng.");
    };

    const getRoleStyle = (role) => {
        switch (role) {
            case "admin": return [styles.userRole, styles.adminRole];
            case "tutor": return [styles.userRole, styles.workerRole];
            case "customer":
            case "student": return [styles.userRole, styles.customerRole];
            default: return styles.userRole;
        }
    };

    const getRoleText = (role) => {
        switch (role) {
            case "admin": return "Quản trị viên";
            case "tutor": return "Gia sư";
            case "customer":
            case "student": return "Khách hàng";
            default: return role;
        }
    };

    const renderUser = ({ item }) => (
        <View style={styles.userCard}>
            <View style={styles.userCardHeader}>
                <Text style={styles.userAvatar}>
                    {item.role === "admin" ? "👨‍💼" : item.role === "tutor" ? "👨‍🏫" : "👤"}
                </Text>
                <View style={styles.userInfo}>
                    {/* Tên + role cùng hàng */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text style={getRoleStyle(item.role)}>{getRoleText(item.role)}</Text>
                    </View>
                    <Text style={styles.userPhone}>📞 {item.phone}</Text>
                    <Text style={styles.userPhone}>✉️ {item.email}</Text>
                    {item.specialty && <Text style={styles.userPhone}>📘 {item.specialty}</Text>}
                </View>
            </View>

            <View style={styles.userActions}>
                <TouchableOpacity style={styles.editUserButton} onPress={() => handleEditUser(item)}>
                    <Text style={styles.editUserButtonText}>Chỉnh sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.deleteUserButton,
                        item.role === "admin" && { backgroundColor: "#ccc" }
                    ]}
                    onPress={() => item.role !== "admin" && handleDeleteUser(item.id)}
                    disabled={item.role === "admin"}
                >
                    <Text style={styles.deleteUserButtonText}>
                        {item.role === "admin" ? "Không thể xóa" : "Xóa"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const roleCounts = userList.reduce((acc, user) => {
        if (isCustomerRole(user.role)) acc.customer = (acc.customer || 0) + 1;
        else acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
    }, { all: userList.length });

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.screenHeader}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={[styles.backButton, { fontSize: 25 }]}>←</Text>
                </TouchableOpacity>
                <Text
                    pointerEvents="none"
                    style={[styles.screenTitle, { position: "absolute", left: 0, right: 0, textAlign: "center" }]}
                >
                    Quản lý người dùng
                </Text>
            </View>

            {/* Search */}
            <View style={[styles.searchContainer, { padding: 5 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* Filter */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
                contentContainerStyle={styles.filterContainer}
            >
                {["all", "admin", "customer", "tutor"].map((role, index) => (
                    <TouchableOpacity
                        key={`${role}-${index}`}
                        style={[styles.filterChip, filterRole === role && styles.activeFilterChip]}
                        onPress={() => setFilterRole(role)}
                    >
                        <Text style={[styles.filterText, filterRole === role && styles.activeFilterText]}>
                            {role === "all" ? `Tất cả (${roleCounts.all})` : `${getRoleText(role)} (${roleCounts[role] || 0})`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* User List */}
            {loading ? (
                <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredUsers}
                    renderItem={renderUser}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Edit Modal */}
            <EditUserModal
                visible={isEditModalVisible}
                user={editingUser}
                onClose={() => setEditModalVisible(false)}
                onSave={handleSaveUser}
                disablePhoneEdit={true}
            />

            {/* Bottom Nav */}
            <AdminBottomNav onTabPress={onTabPress} activeTab="userManagement" />
        </SafeAreaView>
    );
};

export default UserManagementScreen;
