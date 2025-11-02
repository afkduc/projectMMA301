import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "../../style/styles";
import { statusConfig } from "../../constants/statusConfig";
import { TutorBottomNav } from "../../components/BottomNavigation";

const TutorOrderDetailScreen = ({ order, onBack, onTabPress }) => {
  const status = statusConfig[order.status];

  const handleAcceptOrder = () => {
    Alert.alert("Xác nhận nhận đơn", "Bạn có chắc muốn nhận đơn hàng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Nhận đơn",
        onPress: () => {
          Alert.alert("Thành công", "Đã nhận đơn hàng!");
          onBack();
        },
      },
    ]);
  };

  const handleRejectOrder = () => {
    Alert.alert("Xác nhận từ chối", "Bạn có chắc muốn từ chối đơn hàng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Từ chối",
        style: "destructive",
        onPress: () => {
          Alert.alert("Đã từ chối", "Đơn hàng đã được từ chối");
          onBack();
        },
      },
    ]);
  };

  const handleCompleteOrder = () => {
    Alert.alert("Hoàn thành công việc", "Xác nhận đã hoàn thành công việc?", [
      { text: "Chưa xong", style: "cancel" },
      {
        text: "Hoàn thành",
        onPress: () => {
          Alert.alert("Thành công", "Đã cập nhật trạng thái hoàn thành!");
          onBack();
        },
      },
    ]);
  };

  const handleCall = () => {
    Alert.alert("Gọi điện", `Gọi cho ${order.customer}: ${order.phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Chi tiết đơn hàng</Text>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>
      </View>
      <ScrollView style={styles.orderDetailContent}>
        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          <View style={styles.customerDetailInfo}>
            <Text style={styles.customerDetailAvatar}>{order.avatar}</Text>
            <View style={styles.customerDetails}>
              <Text style={styles.customerDetailName}>{order.customer}</Text>
              <Text style={styles.customerDetailPhone}>📞 {order.phone}</Text>
            </View>
          </View>
        </View>

        {/* Order Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin công việc</Text>
          <View style={styles.orderDetailInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Dịch vụ:</Text>
              <Text style={styles.infoValue}>{order.service}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Thời gian:</Text>
              <Text style={styles.infoValue}>
                {order.date} - {order.time}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ước tính:</Text>
              <Text style={styles.infoValue}>{order.estimatedHours} giờ</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Giá:</Text>
              <Text style={[styles.infoValue, styles.priceValue]}>
                {order.price}
              </Text>
            </View>
          </View>
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ</Text>
          <View style={styles.addressInfo}>
            <Text style={styles.addressIcon}>📍</Text>
            <Text style={styles.addressText}>{order.address}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả công việc</Text>
          <Text style={styles.orderDetailDescription}>{order.description}</Text>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ghi chú</Text>
          <View style={styles.notesList}>
            <Text style={styles.noteItem}>• Mang theo dụng cụ đầy đủ</Text>
            <Text style={styles.noteItem}>• Liên hệ trước khi đến 15 phút</Text>
            <Text style={styles.noteItem}>• Dọn dẹp sau khi hoàn thành</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.orderDetailFooter}>
        <TouchableOpacity style={styles.callActionButton} onPress={handleCall}>
          <Text style={styles.callActionButtonText}>📞 Gọi khách</Text>
        </TouchableOpacity>
        {order.status === "pending" && (
          <View style={styles.pendingActionButtons}>
            <TouchableOpacity
              style={styles.rejectActionButton}
              onPress={handleRejectOrder}
            >
              <Text style={styles.rejectActionButtonText}>Từ chối</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptActionButton}
              onPress={handleAcceptOrder}
            >
              <Text style={styles.acceptActionButtonText}>Nhận đơn</Text>
            </TouchableOpacity>
          </View>
        )}
        {order.status === "accepted" && (
          <TouchableOpacity
            style={styles.completeActionButton}
            onPress={handleCompleteOrder}
          >
            <Text style={styles.completeActionButtonText}>Hoàn thành</Text>
          </TouchableOpacity>
        )}
      </View>
      <TutorBottomNav onTabPress={onTabPress} activeTab="orders" />
    </SafeAreaView>
  );
};

// 🔁 Đổi export default
export default TutorOrderDetailScreen;
