import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { styles } from "../../style/styles";

const EditProfileScreen = ({ visible, onClose, onSave, userInfo }) => {
    const [formData, setFormData] = useState({
        id: userInfo?.id,
        name: userInfo?.name || "",
        phone: userInfo?.phone || "",
        email: userInfo?.email || "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (userInfo) {
            setFormData({
                id: userInfo.id,
                name: userInfo?.name || "",
                phone: userInfo?.phone || "",
                email: userInfo?.email || "",
            });
            setErrors({});
        }
    }, [userInfo, visible]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";

        if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
        else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, "")))
            newErrors.phone = "Số điện thoại không hợp lệ";

        if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Email không hợp lệ";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)", // overlay tối
                }}
            >
                <View
                    style={[
                        styles.modalContent,
                        { width: "90%", maxHeight: "80%", borderRadius: 20, backgroundColor: "#fff", overflow: "hidden" },
                    ]}
                >
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.modalCloseButton}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Form */}
                    <ScrollView
                        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Name */}
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Họ và tên *</Text>
                            <TextInput
                                style={[styles.formInput, errors.name && styles.formInputError]}
                                placeholder="Nhập họ tên"
                                value={formData.name}
                                onChangeText={(text) => {
                                    setFormData({ ...formData, name: text });
                                    if (errors.name) setErrors({ ...errors, name: null });
                                }}
                            />
                            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                        </View>

                        {/* Phone */}
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Số điện thoại *</Text>
                            <TextInput
                                style={[styles.formInput, errors.phone && styles.formInputError]}
                                placeholder="Nhập số điện thoại"
                                value={formData.phone}
                                onChangeText={(text) => {
                                    setFormData({ ...formData, phone: text });
                                    if (errors.phone) setErrors({ ...errors, phone: null });
                                }}
                                keyboardType="phone-pad"
                            />
                            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                        </View>

                        {/* Email */}
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Email *</Text>
                            <TextInput
                                style={[styles.formInput, errors.email && styles.formInputError]}
                                placeholder="Nhập email"
                                value={formData.email}
                                onChangeText={(text) => {
                                    setFormData({ ...formData, email: text });
                                    if (errors.email) setErrors({ ...errors, email: null });
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        </View>

                        {/* Buttons */}
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default EditProfileScreen;
