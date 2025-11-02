import { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    TextInput,
    Modal,
    ScrollView,
} from "react-native";
import { styles } from "../../style/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";
import UserService from "../../service/UserService";
import FirebaseService from "../../service/firebaseService";

const CustomerManagementScreen = ({ onTabPress, onBack }) => {
    const [customerList, setCustomerList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [historyModalVisible, setHistoryModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [studentBookings, setStudentBookings] = useState([]);

    // ✅ Lấy danh sách học viên từ node "users"
    useEffect(() => {
        const unsubscribe = UserService.listenToUsers((users) => {
            const customers = users.filter(
                (u) => u.role === "student" || u.role === "customer"
            );
            setCustomerList(customers);
        });

        return () => unsubscribe();
    }, []);

    // ✅ Lọc danh sách học viên
    const filteredCustomers = customerList.filter((customer) => {
        const matchesSearch =
            customer.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            customer.phone?.includes(searchText) ||
            customer.address?.toLowerCase().includes(searchText.toLowerCase());

        const matchesStatus =
            filterStatus === "all" || customer.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // ✅ Mở / khóa tài khoản
    const handleToggleStatus = (customerId, currentStatus) => {
        const newStatus = currentStatus === "active" ? "blocked" : "active";
        const action = newStatus === "blocked" ? "khóa" : "mở khóa";

        UserService.updateUser(customerId, { status: newStatus })
            .then(() => alert(`Đã ${action} tài khoản thành công!`))
            .catch(() => alert("Không thể cập nhật trạng thái người dùng."));
    };

    // ✅ Xem lịch sử học (từ studentBookings)
    const handleViewHistory = async (customer) => {
        try {
            const bookings = await FirebaseService.readAll("studentBookings");
            if (!bookings || bookings.length === 0) {
                alert("Không có dữ liệu buổi học nào.");
                return;
            }

            const studentSessions = bookings.filter(
                (b) =>
                    b.studentId === customer.id ||
                    b.student?.toLowerCase() === customer.name?.toLowerCase()
            );

            if (!studentSessions || studentSessions.length === 0) {
                alert(`${customer.name} chưa có buổi học nào.`);
            } else {
                setSelectedCustomer(customer);
                setStudentBookings(studentSessions);
                setHistoryModalVisible(true);
            }
        } catch (err) {
            console.error("Lỗi khi tải lịch sử học:", err);
            alert("Không thể tải lịch sử buổi học.");
        }
    };

    // ✅ Hiển thị từng học viên
    const renderCustomer = ({ item }) => (
        <View style={styles.userCard}>
            <View style={styles.userCardHeader}>
                <Text style={styles.userAvatar}>👤</Text>
                <View style={styles.userInfo}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.userName}>{item.name}</Text>
                        <View
                            style={[
                                styles.statusBadge,
                                {
                                    backgroundColor:
                                        item.status === "active" ? "#d1fae5" : "#fee2e2",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    {
                                        color: item.status === "active" ? "#065f46" : "#dc2626",
                                    },
                                ]}
                            >
                                {item.status === "active" ? "Hoạt động" : "Đã khóa"}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.userPhone}>
                        <Text style={{ fontWeight: "bold" }}>SĐT: </Text>
                        {item.phone || "N/A"}
                    </Text>

                    <Text style={styles.userPhone}>
                        <Text style={{ fontWeight: "bold" }}>Email: </Text>
                        {item.email || "N/A"}
                    </Text>

                    <Text style={styles.userPhone}>
                        <Text style={{ fontWeight: "bold" }}>Địa chỉ: </Text>
                        {item.address || item.area || "N/A"}
                    </Text>

                    <Text style={styles.userPhone}>
                        <Text style={{ fontWeight: "bold" }}>Tham gia: </Text>
                        {item.joinDate || "N/A"}
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
                            backgroundColor:
                                item.status === "active" ? "#ef4444" : "#10b981",
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
            {/* Header */}
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

            {/* Ô tìm kiếm */}
            <View style={[styles.searchContainer, { padding: 5 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm theo tên, SĐT, khu vực..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* Bộ lọc trạng thái */}
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

            {/* Danh sách học viên */}
            <FlatList
                data={filteredCustomers}
                renderItem={renderCustomer}
                keyExtractor={(item, index) =>
                    item.id?.toString() || index.toString()
                }
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />

            {/* Modal lịch sử học */}
            <Modal
                visible={historyModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setHistoryModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            width: "100%",
                            maxHeight: "80%",
                            padding: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginBottom: 10,
                                textAlign: "center",
                            }}
                        >
                            Lịch sử học của {selectedCustomer?.name}
                        </Text>

                        <ScrollView>
                            {studentBookings.map((s, i) => (
                                <View
                                    key={i}
                                    style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#eee",
                                        paddingVertical: 10,
                                    }}
                                >
                                    <Text>
                                        <Text style={{ fontWeight: "bold" }}>Gia sư: </Text>
                                        {s.tutor || "N/A"}
                                    </Text>
                                    <Text>
                                        <Text style={{ fontWeight: "bold" }}>Môn học: </Text>
                                        {s.subject || "N/A"}
                                    </Text>
                                    <Text>
                                        <Text style={{ fontWeight: "bold" }}>Địa điểm: </Text>
                                        {s.address || "N/A"}
                                    </Text>
                                    <Text>
                                        <Text style={{ fontWeight: "bold" }}>Trạng thái: </Text>
                                        {s.status || "N/A"}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            onPress={() => setHistoryModalVisible(false)}
                            style={{
                                marginTop: 15,
                                backgroundColor: "#2563eb",
                                borderRadius: 8,
                                paddingVertical: 10,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            >
                                Đóng
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <AdminBottomNav onTabPress={onTabPress} activeTab="customerManagement" />
        </SafeAreaView>
    );
};

export default CustomerManagementScreen;
