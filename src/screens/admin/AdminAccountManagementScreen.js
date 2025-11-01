import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    TextInput,
} from "react-native";
import { styles } from "../../style/styles";
import { users } from "../../data/mockData";
import { AdminBottomNav } from "../../components/BottomNavigation";

const AdminAccountManagementScreen = ({ onTabPress, onBack }) => {
    const [adminList, setAdminList] = useState(
        users.filter((user) => user.role === "admin")
    );
    const [searchText, setSearchText] = useState("");

    const filteredAdmins = adminList.filter(
        (admin) =>
            admin.name.toLowerCase().includes(searchText.toLowerCase()) ||
            admin.phone.includes(searchText) ||
            admin.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderAdmin = ({ item }) => (
        <View style={styles.adminAccountCard}>
            <View style={styles.adminAccountHeader}>
                <Text style={styles.adminAccountAvatar}>👨‍💼</Text>
                <View style={styles.adminAccountInfo}>
                    <Text style={styles.adminAccountName}>{item.name}</Text>
                    <Text style={styles.adminAccountPhone}>📞 {item.phone}</Text>
                    <Text style={styles.adminAccountEmail}>✉️ {item.email}</Text>
                    <Text style={styles.adminAccountRole}>🔑 Admin</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.screenHeader}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={styles.backButton}>← Quay lại</Text>
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

            <FlatList
                data={filteredAdmins}
                renderItem={renderAdmin}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />

            <AdminBottomNav
                onTabPress={onTabPress}
                activeTab="adminAccountManagement"
            />
        </SafeAreaView>
    );
};

export default AdminAccountManagementScreen;
