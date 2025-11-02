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
import paymentService from "../../service/paymentService";
import { getCurrentUserId } from "../../utils/auth";

const PaymentMethodScreen = ({ onTabPress, onBack }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState("card");
  const [formData, setFormData] = useState({
    title: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let unsubscribe;
    const fetchPayments = async () => {
      const id = await getCurrentUserId();
      setUserId(id); // Lưu userId để sử dụng ở nơi khác

      unsubscribe = paymentService.listenToPaymentsByUserId(id, async (methods) => {
        let newMethods = [...methods];

        const hasCash = newMethods.some((m) => m.type === "cash");
        if (!hasCash) {
          const cashPayment = {
            userId: id,
            type: "cash",
            title: "Tiền mặt",
            number: "Thanh toán khi hoàn thành",
            isDefault: newMethods.length === 0,
          };
          const newCashId = await paymentService.createPayment(cashPayment);
          newMethods.push({ ...cashPayment, id: newCashId });
        }

        const hasDefault = newMethods.some((m) => m.isDefault);
        if (!hasDefault) {
          const cash = newMethods.find((m) => m.type === "cash");
          if (cash) {
            await paymentService.setDefaultPayment(id, cash.id);
            newMethods = newMethods.map((m) => ({
              ...m,
              isDefault: m.id === cash.id,
            }));
          }
        }

        setPaymentMethods(newMethods);
      });
    };

    fetchPayments();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleAddPayment = () => {
    setFormData({ title: "", number: "", expiry: "", cvv: "" });
    setSelectedType("card");
    setShowAddModal(true);
  };

  const handleSavePayment = async () => {
    if (!formData.title || !formData.number) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newPayment = {
      userId,
      type: selectedType,
      title: formData.title,
      number:
        selectedType === "card"
          ? `**** **** **** ${formData.number.slice(-4)}`
          : formData.number,
      expiry: formData.expiry,
      isDefault: false,
    };

    await paymentService.createPayment(newPayment);
    setShowAddModal(false);
    Alert.alert("Thành công", "Đã thêm phương thức thanh toán");
  };

  const handleDeletePayment = async (id, type) => {
    if (type === "cash") {
      Alert.alert("Không thể xóa", "Không thể xóa phương thức tiền mặt mặc định.");
      return;
    }

    Alert.alert("Xác nhận", "Bạn có muốn xóa phương thức này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await paymentService.deletePayment(id);
        },
      },
    ]);
  };

  const handleSetDefault = async (id) => {
    await paymentService.setDefaultPayment(userId, id);
  };

  const getPaymentIcon = (type) => {
    switch (type) {
      case "card":
        return "💳";
      case "momo":
        return "📱";
      case "zalopay":
        return "💰";
      case "banking":
        return "🏦";
      case "cash":
        return "💵";
      default:
        return "💳";
    }
  };

  const renderPayment = ({ item }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentIcon}>{getPaymentIcon(item.type)}</Text>
          <View style={styles.paymentDetails}>
            <View style={styles.paymentTitleContainer}>
              <Text style={styles.paymentTitle}>{item.title}</Text>
              {item.isDefault && <Text style={styles.defaultBadge}>Mặc định</Text>}
            </View>
            <Text style={styles.paymentNumber}>{item.number}</Text>
            {item.expiry && <Text style={styles.paymentExpiry}>Hết hạn: {item.expiry}</Text>}
          </View>
        </View>
        {item.type !== "cash" && (
          <TouchableOpacity onPress={() => handleDeletePayment(item.id, item.type)}>
            <Text style={styles.deletePaymentButton}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
      {!item.isDefault && (
        <TouchableOpacity
          style={styles.setDefaultPaymentButton}
          onPress={() => handleSetDefault(item.id)}
        >
          <Text style={styles.setDefaultPaymentButtonText}>Đặt làm mặc định</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const paymentTypes = [
    { id: "card", name: "Thẻ tín dụng", icon: "💳" },
    { id: "momo", name: "Ví MoMo", icon: "📱" },
    { id: "zalopay", name: "ZaloPay", icon: "💰" },
    { id: "banking", name: "Internet Banking", icon: "🏦" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Phương thức thanh toán</Text>
        <TouchableOpacity onPress={handleAddPayment}>
          <Text style={styles.filterButton}>➕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={paymentMethods}
        renderItem={renderPayment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.paymentList}
      />

      {/* Modal thêm mới */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Thêm phương thức thanh toán</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Loại thanh toán</Text>
                <View style={styles.paymentTypeContainer}>
                  {paymentTypes.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.paymentTypeButton,
                        selectedType === type.id && styles.selectedPaymentType,
                      ]}
                      onPress={() => setSelectedType(type.id)}
                    >
                      <Text style={styles.paymentTypeIcon}>{type.icon}</Text>
                      <Text
                        style={[
                          styles.paymentTypeName,
                          selectedType === type.id && styles.selectedPaymentTypeName,
                        ]}
                      >
                        {type.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Tên hiển thị</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="VD: Thẻ Visa chính"
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                />
              </View>

              {selectedType === "card" ? (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Số thẻ</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="1234 5678 9012 3456"
                      value={formData.number}
                      onChangeText={(text) => setFormData({ ...formData, number: text })}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.formRow}>
                    <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                      <Text style={styles.formLabel}>Hết hạn</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChangeText={(text) => setFormData({ ...formData, expiry: text })}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}>
                      <Text style={styles.formLabel}>CVV</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="123"
                        secureTextEntry
                        keyboardType="numeric"
                        value={formData.cvv}
                        onChangeText={(text) => setFormData({ ...formData, cvv: text })}
                      />
                    </View>
                  </View>
                </>
              ) : (
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>
                    {selectedType === "momo" || selectedType === "zalopay"
                      ? "Số điện thoại"
                      : "Số tài khoản"}
                  </Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.number}
                    onChangeText={(text) => setFormData({ ...formData, number: text })}
                    keyboardType="numeric"
                  />
                </View>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAddModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSavePayment}>
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

export default PaymentMethodScreen;
