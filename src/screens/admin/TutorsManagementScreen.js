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
} from "react-native";
import { styles } from "../../style/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";
import TutorService from "../../service/tutorService";

const TutorsManagementScreen = ({ onTabPress, onBack }) => {
    const [tutorList, setTutorList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTutors();
    }, []);

    const fetchTutors = async () => {
        setLoading(true);
        try {
            const tutors = (await TutorService.getAllTutors()) || [];

            const normalizedTutors = tutors.map((t) => ({
                ...t,
                status:
                    t.status === "active"
                        ? "active"
                        : t.status === "blocked"
                            ? "blocked"
                            : "pending",
            }));

            setTutorList(normalizedTutors);
        } catch (err) {
            console.error("Error fetching tutors:", err);
            setTutorList([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredTutors = tutorList.filter((tutors) => {
        const matchesSearch =
            tutors.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            tutors.phone?.includes(searchText) ||
            tutors.specialty?.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus =
            filterStatus === "all" || tutors.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleApproveTutor = (tutorId) => {
        Alert.alert("Duyệt hồ sơ", "Bạn có chắc muốn duyệt hồ sơ này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Duyệt",
                onPress: async () => {
                    await TutorService.updateTutor(tutorId, { status: "active" });
                    fetchTutors();
                    Alert.alert("Thành công", "Đã duyệt hồ sơ.");
                },
            },
        ]);
    };

    const handleToggleStatus = (tutorId, currentStatus) => {
        if (currentStatus === "pending") return;

        const newStatus = currentStatus === "active" ? "blocked" : "active";
        const action = newStatus === "blocked" ? "khóa" : "mở khóa";

        Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} tài khoản này?`, [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xác nhận",
                onPress: async () => {
                    await TutorService.updateTutor(tutorId, { status: newStatus });
                    fetchTutors();
                    Alert.alert("Thành công", `Đã ${action} tài khoản.`);
                },
            },
        ]);
    };

    const handleViewDetails = (tutor) => {
        Alert.alert(
            "Chi tiết gia sư",
            `Tên: ${tutor.name}\nChuyên môn: ${tutor.specialty}\nĐánh giá: ${tutor.rating}/5\nBuổi học hoàn thành: ${tutor.reviews}\nChứng chỉ: ${tutor.experience || "N/A"}`
        );
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "active":
                return { backgroundColor: "#d1fae5", color: "#065f46" };
            case "pending":
                return { backgroundColor: "#fef3c7", color: "#92400e" };
            case "blocked":
                return { backgroundColor: "#fee2e2", color: "#dc2626" };
            default:
                return { backgroundColor: "#f3f4f6", color: "#6b7280" };
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "active":
                return "Hoạt động";
            case "pending":
                return "Chờ duyệt";
            case "blocked":
                return "Đã khóa";
            case "all":
                return "Tất cả";
            default:
                return status;
        }
    };

    const renderTutor = ({ item }) => {
        const statusStyle = getStatusStyle(item.status);

        return (
            <View style={styles.userCard}>
                <View style={styles.userCardHeader}>
                    <Text style={styles.userAvatar}>👨‍🏫</Text>

                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <View
                                style={[
                                    styles.statusBadge,
                                    { backgroundColor: statusStyle.backgroundColor },
                                ]}
                            >
                                <Text style={[styles.statusText, { color: statusStyle.color }]}>
                                    {getStatusText(item.status)}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.userPhone}>
                            <Text style={{ fontWeight: "bold" }}>SĐT:</Text> {item.phone || "N/A"}
                        </Text>
                        <Text style={styles.userPhone}>
                            <Text style={{ fontWeight: "bold" }}>Email:</Text> {item.email || "N/A"}
                        </Text>
                        <Text style={styles.userPhone}>
                            <Text style={{ fontWeight: "bold" }}>Chuyên môn:</Text> {item.specialty || "N/A"}
                        </Text>
                        <Text style={styles.userPhone}>
                            <Text style={{ fontWeight: "bold" }}>Đánh giá:</Text> {item.rating}/5 ({item.reviews} buổi học)
                        </Text>
                    </View>
                </View>

                <View style={styles.userActions}>
                    <TouchableOpacity
                        style={styles.editUserButton}
                        onPress={() => handleViewDetails(item)}
                    >
                        <Text style={styles.editUserButtonText}>Chi tiết</Text>
                    </TouchableOpacity>
                    {item.status === "pending" ? (
                        <TouchableOpacity
                            style={[styles.deleteUserButton, { backgroundColor: "#10b981" }]}
                            onPress={() => handleApproveTutor(item.id)}
                        >
                            <Text style={styles.deleteUserButtonText}>Duyệt</Text>
                        </TouchableOpacity>
                    ) : (
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
                    )}
                </View>
            </View>
        );
    };

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
                    Quản lý gia sư
                </Text>
            </View>

            <View style={[styles.searchContainer, { padding: 5 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm theo tên, SĐT, chuyên môn..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <View style={styles.filterContainer}>
                {["all", "pending", "active"].map((status) => (
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
                            {getStatusText(status)} (
                            {tutorList.filter((w) =>
                                status === "all" ? true : w.status === status
                            ).length}
                            )
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredTutors}
                    renderItem={renderTutor}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <AdminBottomNav onTabPress={onTabPress} activeTab="tutorManagement" />
        </SafeAreaView>
    );
};

export default TutorsManagementScreen;
