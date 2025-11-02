import { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Alert,
    TextInput,
} from "react-native";
import { styles } from "../../style/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";
import UserService from "../../service/UserService";
import OrderService from "../../service/orderService";

const CustomerManagementScreen = ({ onTabPress, onBack }) => {
    const [customerList, setCustomerList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        const unsubscribe = UserService.listenToUsers((users) => {
            const customers = users.filter((u) => u.role === "student" || u.role === "customer");
            setCustomerList(customers);
        });

        return () => unsubscribe();
    }, []);

    const filteredCustomers = customerList.filter((customer) => {
        const matchesSearch =
            customer.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            customer.phone?.includes(searchText) ||
            customer.address?.toLowerCase().includes(searchText.toLowerCase());

        const matchesStatus =
            filterStatus === "all" || customer.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const handleToggleStatus = (customerId, currentStatus) => {
        const newStatus = currentStatus === "active" ? "blocked" : "active";
        const action = newStatus === "blocked" ? "khóa" : "mở khóa";

        Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} tài khoản này?`, [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xác nhận",
                onPress: async () => {
                    try {
                        await UserService.updateUser(customerId, { status: newStatus });
                        Alert.alert("Thành công", `Đã ${action} tài khoản`);
                    } catch (error) {
                        Alert.alert("Lỗi", "Không thể cập nhật trạng thái người dùng.");
                    }
                },
            },
        ]);
    };

    const handleViewHistory = async (customer) => {
        try {
            const orders = await OrderService.getOrdersByCustomer(customer.id);
            if (!orders || orders.length === 0) {
                Alert.alert(
                    "Thông báo",
                    `${customer.name} chưa có lịch sử đặt dịch vụ.`
                );
            } else {
                const list = orders
                    .map(
                        (o, i) =>
                            `${i + 1}. ${o.service || "Dịch vụ"} - ${o.status || "Trạng thái"
                            } - ${o.date || "N/A"}`
                    )
                    .join("\n");
                Alert.alert(`Lịch sử của ${customer.name}`, list);
            }
        } catch (err) {
            console.log("Lỗi khi tải lịch sử đơn hàng:", err);
            Alert.alert("Lỗi", "Không thể tải lịch sử đơn hàng.");
        }
    };

    const renderCustomer = ({ item }) => (
        <View style={styles.userCard}>
            <View style={styles.userCardHeader}>
                <Text style={styles.userAvatar}>👤</Text>
                <View style={styles.userInfo}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <View
                            style={[
                                styles.statusBadge,
                                { backgroundColor: item.status === 'active' ? '#d1fae5' : '#fee2e2' },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: item.status === 'active' ? '#065f46' : '#dc2626' },
                                ]}
                            >
                                {item.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.userPhone}>
                        <Text style={{ fontWeight: 'bold' }}>SDT: </Text>
                        {item.phone || 'N/A'}
                    </Text>

                    <Text style={styles.userPhone}>
                        <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                        {item.email || 'N/A'}
                    </Text>

                    <Text style={styles.userPhone}>
                        <Text style={{ fontWeight: 'bold' }}>Địa chỉ: </Text>
                        {item.address || item.area || 'N/A'}
                    </Text>

                    <Text style={styles.userPhone}>
                        <Text style={{ fontWeight: 'bold' }}>Tham gia: </Text>
                        {item.joinDate || 'N/A'}
                    </Text>

                </View>

            </View>

            <View style={styles.userActions}>
                <TouchableOpacity
                    style={styles.editUserButton}
                    onPress={() => handleViewHistory(item)}
                >
                    <Text style={styles.editUserButtonText}>Lịch sử</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.deleteUserButton,
                        {
                            backgroundColor: item.status === "active" ? "#ef4444" : "#10b981",
                        },
                    ]}
                    onPress={() => handleToggleStatus(item.id, item.status)}
                >
                    <Text style={styles.deleteUserButtonText}>
                        {item.status === "active" ? "Khóa" : "Mở khóa"}
                    </Text>
                </TouchableOpacity>
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
                    Quản lý khách hàng
                </Text>
            </View>

            <View style={[styles.searchContainer, { padding: 5 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm theo tên, SĐT, khu vực..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <View style={styles.filterContainer}>
                {["all", "active", "blocked"].map((status) => (
                    <TouchableOpacity
                        key={status}
                        style={[
                            styles.filterChip,
                            filterStatus === status && styles.activeFilterChip,
                        ]}
                        onPress={() => setFilterStatus(status)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filterStatus === status && styles.activeFilterText,
                            ]}
                        >
                            {status === "all"
                                ? `Tất cả (${customerList.length})`
                                : `${status === "active" ? "Hoạt động" : "Đã khóa"} (${customerList.filter((c) => c.status === status).length
                                })`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredCustomers}
                renderItem={renderCustomer}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />


            <AdminBottomNav onTabPress={onTabPress} activeTab="customerManagement" />
        </SafeAreaView>
    );
};

export default CustomerManagementScreen;
