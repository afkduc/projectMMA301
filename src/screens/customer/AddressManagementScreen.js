import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../../style/styles";
import { CustomerBottomNav } from "../../components/BottomNavigation";
import addressService from "../../service/addressService";
import { getCurrentUserId } from "../../utils/auth";

const AddressManagementScreen = ({ onTabPress, onBack }) => {
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  
  const [formData, setFormData] = useState({ title: "", address: "", phone: "" });

  useEffect(() => {
    const listenToAddresses = async () => {
      try {
        const id = await getCurrentUserId();
        setUserId(id);
        const unsubscribe = addressService.listenToAddressesByUserId(id, setAddresses);
        cleanupRef.current = unsubscribe;
      } catch (error) {
        console.error("❌ Error setting up address listener:", error);
      }
    };

    const cleanupRef = { current: null };
    listenToAddresses();

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  const handleAddAddress = () => {
    setFormData({ title: "", address: "", phone: "" });
    setEditingAddress(null);
    setShowAddModal(true);
  };

  const handleEditAddress = (address) => {
    setFormData({ title: address.title, address: address.address, phone: address.phone });
    setEditingAddress(address);
    setShowAddModal(true);
  };

  const handleSaveAddress = async () => {
    const { title, address, phone } = formData;
    if (!title || !address || !phone) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!userId) {
      Alert.alert("Lỗi", "Không xác định được người dùng");
      return;
    }

    try {
      if (editingAddress) {
        await addressService.updateAddress(editingAddress.id, { title, address, phone });
        Alert.alert("Thành công", "Đã cập nhật địa chỉ");
      } else {
        await addressService.createAddress({
          userId,
          title,
          address,
          phone,
          isDefault: false,
        });
        Alert.alert("Thành công", "Đã thêm địa chỉ mới");
      }
      setShowAddModal(false);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu địa chỉ");
    }
  };

  const handleDeleteAddress = (id) => {
    if (!userId) {
      Alert.alert("Lỗi", "Không xác định được người dùng");
      return;
    }

    Alert.alert("Xác nhận xóa", "Bạn có chắc muốn xóa địa chỉ này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await addressService.deleteAddress(id);
            Alert.alert("Thành công", "Đã xóa địa chỉ");
          } catch (error) {
            Alert.alert("Lỗi", "Không thể xóa địa chỉ");
          }
        },
      },
    ]);
  };

  const handleSetDefault = async (id) => {
    if (!userId) {
      Alert.alert("Lỗi", "Không xác định được người dùng");
      return;
    }

    try {
      await addressService.setDefaultAddress(userId, id);
      Alert.alert("Thành công", "Đã đặt làm địa chỉ mặc định");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật mặc định");
    }
  };

  const renderAddress = ({ item }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.addressTitleContainer}>
          <Text style={styles.addressTitle}>{item.title}</Text>
          {item.isDefault && <Text style={styles.defaultBadge}>Mặc định</Text>}
        </View>
        <TouchableOpacity onPress={() => handleEditAddress(item)}>
          <Text style={styles.editAddressButton}>Sửa</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.addressText}>{item.address}</Text>
      <Text style={styles.addressPhone}>📞 {item.phone}</Text>
      <View style={styles.addressActions}>
        {!item.isDefault && (
          <TouchableOpacity style={styles.setDefaultButton} onPress={() => handleSetDefault(item.id)}>
            <Text style={styles.setDefaultButtonText}>Đặt mặc định</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deleteAddressButton} onPress={() => handleDeleteAddress(item.id)}>
          <Text style={styles.deleteAddressButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Địa chỉ của tôi</Text>
        <TouchableOpacity onPress={handleAddAddress}>
          <Text style={styles.filterButton}>➕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.addressList}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal thêm/sửa địa chỉ */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
              </Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Tên địa chỉ</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="VD: Nhà riêng, Văn phòng..."
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Địa chỉ chi tiết</Text>
                <TextInput
                  style={[styles.formInput, styles.textArea]}
                  placeholder="Nhập địa chỉ đầy đủ..."
                  value={formData.address}
                  onChangeText={(text) => setFormData({ ...formData, address: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Số điện thoại</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Số điện thoại liên hệ"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddModal(false)}>
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
                  <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default AddressManagementScreen;
