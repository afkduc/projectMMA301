import { useEffect, useState } from "react";
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
import SubjectService from "../../service/subjectService";

const SubjectManagementScreen = ({ onTabPress, onBack }) => {
    const [subjectList, setSubjectList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        const unsubscribe = SubjectService.listenToSubjects(setSubjectList);
        return unsubscribe;
    }, []);

    const filteredSubjects = subjectList.filter((subject) => {
        const name = typeof subject.name === "string" ? subject.name : "";
        const description =
            typeof subject.description === "string" ? subject.description : "";
        const search = typeof searchText === "string" ? searchText.toLowerCase() : "";

        const matchesSearch =
            name.toLowerCase().includes(search) ||
            description.toLowerCase().includes(search);

        const matchesStatus =
            filterStatus === "all" || subject.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const handleToggleStatus = async (subjectId, currentStatus) => {
        const newStatus = currentStatus === "active" ? "inactive" : "active";
        const action = newStatus === "inactive" ? "tắt" : "bật";

        Alert.alert("Xác nhận", `Bạn có chắc muốn ${action} môn học này?`, [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xác nhận",
                onPress: async () => {
                    try {
                        await SubjectService.updateSubject(subjectId, { status: newStatus });
                        Alert.alert("Thành công", `Đã ${action} môn học`);
                    } catch (error) {
                        console.error(error);
                        Alert.alert("Lỗi", "Không thể cập nhật trạng thái môn học");
                    }
                },
            },
        ]);
    };

    const handleEditSubject = (subject) => {
        Alert.alert("Chỉnh sửa môn học", `Chỉnh sửa: ${subject.name}`, [
            { text: "Hủy", style: "cancel" },
            { text: "Sửa mô tả", onPress: () => handleEditDescription(subject) },
        ]);
    };

    const handleEditDescription = (subject) => {
        Alert.prompt(
            "Cập nhật mô tả",
            `Mô tả hiện tại: ${subject.description}`,
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Cập nhật",
                    onPress: async (newDescription) => {
                        if (newDescription) {
                            try {
                                await SubjectService.updateSubject(subject.id, {
                                    description: newDescription,
                                });
                                Alert.alert("Thành công", "Đã cập nhật mô tả môn học");
                            } catch (error) {
                                console.error(error);
                                Alert.alert("Lỗi", "Không thể cập nhật mô tả môn học");
                            }
                        }
                    },
                },
            ],
            "plain-text",
            subject.description
        );
    };

    const handleAddSubject = () => {
        Alert.prompt(
            "Thêm môn học mới",
            "Nhập tên môn học",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Tiếp tục",
                    onPress: (name) => {
                        if (!name) return;

                        Alert.prompt(
                            "Nhập mô tả",
                            "Mô tả môn học",
                            [
                                { text: "Hủy", style: "cancel" },
                                {
                                    text: "Thêm",
                                    onPress: async (description) => {
                                        try {
                                            const newSubject = {
                                                name,
                                                description: description || "",
                                                icon: "📘",
                                                color: "#fbbf24",
                                                status: "active",
                                            };
                                            await SubjectService.createSubject(newSubject);
                                            Alert.alert("Thành công", "Đã thêm môn học mới");
                                        } catch (error) {
                                            console.error(error);
                                            Alert.alert("Lỗi", "Không thể thêm môn học mới");
                                        }
                                    },
                                },
                            ],
                            "plain-text"
                        );
                    },
                },
            ],
            "plain-text"
        );
    };

    const renderSubject = ({ item }) => (
        <View style={styles.serviceManagementCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                    style={[
                        styles.serviceIconContainer,
                        { backgroundColor: item.color + "20" },
                    ]}
                >
                    <Text style={styles.serviceManagementIcon}>{item.icon || "📘"}</Text>
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                    {/* Tên môn học + trạng thái */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.serviceName}>{item.name || ""}</Text>
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
                                {item.status === "active" ? "Hoạt động" : "Tạm dừng"}
                            </Text>
                        </View>
                    </View>

                    {/* Mô tả môn học */}
                    <View style={{ marginTop: 8 }}>
                        <Text style={[styles.serviceDescription, { marginLeft: 0 }]}>
                            {item.description || ""}
                        </Text>
                    </View>

                    {/* Nút chỉnh sửa / bật tắt */}
                    <View style={[styles.serviceActions, { marginTop: 10 }]}>
                        <TouchableOpacity
                            style={styles.editServiceButton}
                            onPress={() => handleEditSubject(item)}
                        >
                            <Text style={styles.editServiceButtonText}>Chỉnh sửa</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.toggleServiceButton,
                                {
                                    backgroundColor:
                                        item.status === "active" ? "#ef4444" : "#10b981",
                                },
                            ]}
                            onPress={() => handleToggleStatus(item.id, item.status)}
                        >
                            <Text style={styles.toggleServiceButtonText}>
                                {item.status === "active" ? "Tắt" : "Bật"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                        { position: "absolute", left: 0, right: 0, textAlign: "center" },
                    ]}
                >
                    Quản lý môn học
                </Text>
                <TouchableOpacity onPress={handleAddSubject}>
                    <Text style={styles.filterButton}>➕</Text>
                </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={[styles.searchContainer, { padding: 5 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm môn học..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* Filter */}
            <View style={styles.filterContainer}>
                {["all", "active", "inactive"].map((status) => (
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
                                ? `Tất cả (${subjectList.length})`
                                : `${status === "active" ? "Hoạt động" : "Tạm dừng"} (${subjectList.filter((s) => s.status === status).length
                                })`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredSubjects}
                renderItem={renderSubject}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />

            <AdminBottomNav onTabPress={onTabPress} activeTab="subjectManagement" />
        </SafeAreaView>
    );
};

export default SubjectManagementScreen;
