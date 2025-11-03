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
    const [infoModal, setInfoModal] = useState({ visible: false, message: "" });

    // ✅ Load danh sách học viên từ node "users"
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
            (customer.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                customer.phone?.includes(searchText) ||
                customer.address?.toLowerCase().includes(searchText.toLowerCase())) ??
            false;

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

    // ✅ Xem lịch sử học (ghép thông tin từ tutorSessions + users)
    const handleViewHistory = async (customer) => {
        try {
            const [sessions, users] = await Promise.all([
                FirebaseService.readAll("tutorSessions"),
                FirebaseService.readAll("users"),
            ]);

            if (!sessions || Object.keys(sessions).length === 0) {
                alert("Không có dữ liệu buổi học nào.");
                return;
            }

            const allSessions = Object.values(sessions);
            const allUsers = Object.values(users || {});

            // 🔍 Lọc buổi học theo khách hàng
            const customerSessions = allSessions.filter(
                (s) =>
                    s.customerId === customer.id ||
                    s.customer?.toLowerCase() === customer.name?.toLowerCase()
            );

            if (customerSessions.length === 0) {
                setInfoModal({ visible: true, message: `${customer.name} chưa có buổi học nào.` });
                return;
            }

            // 🔄 Dịch trạng thái sang tiếng Việt
            const translateStatus = (status) => {
                switch ((status || "").toLowerCase()) {
                    case "pending":
                        return "Đang chờ xác nhận";
                    case "accepted":
                        return "Đã chấp nhận";
                    case "rejected":
                        return "Từ chối";
                    case "completed":
                        return "Hoàn thành";
                    case "cancelled":
                        return "Đã hủy";
                    default:
                        return "Không xác định";
                }
            };

            // 🔗 Ghép thông tin tutor + customer
            const sessionsWithDetails = customerSessions.map((s) => {
                const tutorInfo = allUsers.find((u) => u.id === s.tutorId) || {};
                const customerInfo = allUsers.find((u) => u.id === s.customerId) || {};

                return {
                    ...s,
                    tutorName: tutorInfo.name || s.tutor || "Chưa rõ",
                    tutorSubject:
                        tutorInfo.subject ||
                        (Array.isArray(tutorInfo.serviceId)
                            ? tutorInfo.serviceId.join(", ")
                            : s.service || s.subject || "Không rõ"),
                    customerName: customerInfo.name || s.customer || "Không rõ",
                    statusVi: translateStatus(s.status),
                };
            });

            setSelectedCustomer(customer);
            setStudentBookings(sessionsWithDetails);
            setHistoryModalVisible(true);
        } catch (err) {
            console.error("❌ Lỗi khi tải lịch sử học:", err);
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
                                : `${status === "active" ? "Hoạt động" : "Đã khóa"
                                } (${customerList.filter((c) => c.status === status).length
                                })`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Danh sách học viên */}
            <FlatList
                data={filteredCustomers}
                renderItem={renderCustomer}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
                                        backgroundColor: "#f9fafb",
                                        borderRadius: 12,
                                        padding: 12,
                                        marginVertical: 6,
                                        shadowColor: "#000",
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3,
                                    }}
                                >
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}
                                    >
                                        Gia sư: {s.tutorName}
                                    </Text>

                                    <View style={{ marginTop: 6, gap: 4 }}>
                                        <Text>
                                            <Text style={{ fontWeight: "bold" }}>Môn học: </Text>
                                            {s.tutorSubject}
                                        </Text>
                                        <Text>
                                            <Text style={{ fontWeight: "bold" }}>Thời gian: </Text>
                                            {s.date} | {s.time}
                                        </Text>
                                        <Text>
                                            <Text style={{ fontWeight: "bold" }}>Trạng thái: </Text>
                                            {s.statusVi}
                                        </Text>
                                    </View>
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

            {/* Modal thông báo */}
            <Modal
                visible={infoModal.visible}
                transparent
                animationType="fade"
                onRequestClose={() => setInfoModal({ visible: false, message: "" })}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            padding: 20,
                            width: "80%",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                marginBottom: 20,
                            }}
                        >
                            {infoModal.message}
                        </Text>

                        <TouchableOpacity
                            onPress={() => setInfoModal({ visible: false, message: "" })}
                            style={{
                                backgroundColor: "#2563eb",
                                paddingVertical: 10,
                                paddingHorizontal: 30,
                                borderRadius: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                OK
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
