import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    TextInput,
    ActivityIndicator,
    Alert,
} from "react-native";
import { styles } from "../../style/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";
import FirebaseService from "../../service/firebaseService"; // service đọc từ firebase

const AdminAccountManagementScreen = ({ onTabPress, onBack }) => {
    const [adminList, setAdminList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const users = await FirebaseService.readAll("users"); // đọc tất cả users
            // Lọc chỉ lấy admin
            const admins = users.filter((user) => user.role === "admin");
            setAdminList(admins);
        } catch (error) {
            console.error("❌ Error fetching admins:", error);
            Alert.alert("Lỗi", "Không thể tải danh sách admin.");
        } finally {
            setLoading(false);
        }
    };

    const filteredAdmins = adminList.filter(
        (admin) =>
            admin.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            admin.phone?.includes(searchText) ||
            admin.email?.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderAdmin = ({ item }) => (
        <View style={styles.adminAccountCard}>
            <View style={styles.adminAccountHeader}>
                <Text style={styles.adminAccountAvatar}>👨‍💼</Text>
                <View style={styles.adminAccountInfo}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={styles.adminAccountName}>{item.name}</Text>
                    </View>
                    <Text style={styles.adminAccountPhone}>
                        <Text style={{ fontWeight: "bold" }}>SDT: </Text>
                        {item.phone}
                    </Text>
                    <Text style={styles.adminAccountEmail}>
                        <Text style={{ fontWeight: "bold" }}>Email: </Text>
                        {item.email}
                    </Text>
                    <Text style={styles.adminAccountRole}>
                        <Text style={{ fontWeight: "bold" }}>Role: </Text>
                        {item.role}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenHeader}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={[styles.backButton, { fontSize: 25 }]}>←</Text>
                </TouchableOpacity>
                <Text
                    pointerEvents="none"
                    style={[
                        styles.screenTitle,
                        {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                        },
                    ]}
                >
                    Tài khoản admin
                </Text>
            </View>

            {/* Search */}
            <View style={[styles.searchContainer, { padding: 5 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm admin..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredAdmins}
                    renderItem={renderAdmin}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <AdminBottomNav
                onTabPress={onTabPress}
                activeTab="adminAccountManagement"
            />
        </SafeAreaView>
    );
};

export default AdminAccountManagementScreen;
