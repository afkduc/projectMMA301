import { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Alert,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { styles } from "../../style/styles";
import { AdminBottomNav } from "../../components/BottomNavigation";
import SubjectService from "../../service/subjectService";

const SubjectManagementScreen = ({ onTabPress, onBack }) => {
    const [subjectList, setSubjectList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Popup thêm / sửa
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState("");
    const [newSubjectDescription, setNewSubjectDescription] = useState("");
    const [editingSubject, setEditingSubject] = useState(null);

    useEffect(() => {
        const unsubscribe = SubjectService.listenToSubjects(setSubjectList);
        return unsubscribe;
    }, []);

    // --- Bộ lọc tìm kiếm ---
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

    // --- Bật / tắt trạng thái ---
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

    // --- Mở popup chỉnh sửa ---
    const handleEditSubject = (subject) => {
        setEditingSubject(subject);
        setNewSubjectName(subject.name);
        setNewSubjectDescription(subject.description);
        setShowEditModal(true);
    };

    const handleSaveEditedSubject = async () => {
        if (!editingSubject) return;
        try {
            await SubjectService.updateSubject(editingSubject.id, {
                name: newSubjectName.trim(),
                description: newSubjectDescription.trim(),
            });
            Alert.alert("Thành công", "Đã cập nhật môn học");
            setShowEditModal(false);
        } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", "Không thể cập nhật môn học");
        }
    };

    // --- Thêm mới môn học ---
    const handleOpenAddModal = () => {
        setNewSubjectName("");
        setNewSubjectDescription("");
        setShowAddModal(true);
    };

    const handleSaveNewSubject = async () => {
        if (!newSubjectName.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên môn học");
            return;
        }

        try {
            const newSubject = {
                name: newSubjectName.trim(),
                description: newSubjectDescription.trim() || "",
                icon: "📘",
                color: "#fbbf24",
                status: "active",
            };

            await SubjectService.createSubject(newSubject);
            Alert.alert("Thành công", "Đã thêm môn học mới");
            setShowAddModal(false);
        } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", "Không thể thêm môn học mới");
        }
    };

    // --- Giao diện từng môn học ---
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
                <TouchableOpacity onPress={handleOpenAddModal}>
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
                                : `${status === "active" ? "Hoạt động" : "Tạm dừng"
                                } (${subjectList.filter((s) => s.status === status).length})`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Danh sách môn học */}
            <FlatList
                data={filteredSubjects}
                renderItem={renderSubject}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />

            {/* ✅ Modal thêm môn học */}
            <Modal
                animationType="slide"
                transparent
                visible={showAddModal}
                onRequestClose={() => setShowAddModal(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={modalStyles.overlay}
                >
                    <View style={modalStyles.container}>
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 10 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Text style={modalStyles.title}>Thêm môn học mới</Text>

                            <Text style={modalStyles.label}>Tên môn học</Text>
                            <TextInput
                                value={newSubjectName}
                                onChangeText={setNewSubjectName}
                                placeholder="Nhập tên môn học"
                                style={modalStyles.input}
                            />

                            <Text style={modalStyles.label}>Mô tả</Text>
                            <TextInput
                                value={newSubjectDescription}
                                onChangeText={setNewSubjectDescription}
                                placeholder="Nhập mô tả môn học"
                                multiline
                                style={[modalStyles.input, { height: 80, textAlignVertical: "top" }]}
                            />

                            <View style={modalStyles.actions}>
                                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                                    <Text style={modalStyles.cancel}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={modalStyles.saveButton}
                                    onPress={handleSaveNewSubject}
                                >
                                    <Text style={modalStyles.saveText}>Thêm</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* ✅ Modal chỉnh sửa môn học */}
            <Modal
                animationType="slide"
                transparent
                visible={showEditModal}
                onRequestClose={() => setShowEditModal(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={modalStyles.overlay}
                >
                    <View style={modalStyles.container}>
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 10 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Text style={modalStyles.title}>Chỉnh sửa môn học</Text>

                            <Text style={modalStyles.label}>Tên môn học</Text>
                            <TextInput
                                value={newSubjectName}
                                onChangeText={setNewSubjectName}
                                style={modalStyles.input}
                            />

                            <Text style={modalStyles.label}>Mô tả</Text>
                            <TextInput
                                value={newSubjectDescription}
                                onChangeText={setNewSubjectDescription}
                                multiline
                                style={[modalStyles.input, { height: 80, textAlignVertical: "top" }]}
                            />

                            <View style={modalStyles.actions}>
                                <TouchableOpacity onPress={() => setShowEditModal(false)}>
                                    <Text style={modalStyles.cancel}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={modalStyles.saveButton}
                                    onPress={handleSaveEditedSubject}
                                >
                                    <Text style={modalStyles.saveText}>Lưu</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            <AdminBottomNav onTabPress={onTabPress} activeTab="subjectManagement" />
        </SafeAreaView>
    );
};

export default SubjectManagementScreen;

const modalStyles = {
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent", // bỏ nền xám mờ
        paddingHorizontal: 20,
    },
    container: {
        width: "100%",
        maxWidth: 380,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 10,
    },
    cancel: {
        color: "#555",
        marginRight: 15,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#10b981",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    saveText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
};


