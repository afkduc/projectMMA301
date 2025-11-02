import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { styles } from '../../style/styles';
import { statusConfig } from '../../constants/statusConfig';
import { TutorBottomNav } from '../../components/BottomNavigation';
import { getCurrentUserId } from '../../utils/auth';
import userService from '../../service/UserService';

// SERVICES
import OrderService from '../../service/orderService';
import TutorService from '../../service/tutorService';

const TutorOrdersScreen = ({ onTabPress, onOrderPress }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndListenOrders = async () => {
      setLoading(true);
      try {
        const userId = await getCurrentUserId();
        const tutor = await TutorService.getTutorByUserId(userId);

        if (!tutor || !tutor.id) {
          console.warn('Không tìm thấy thông tin tutor tương ứng với userId:', userId);
          setOrders([]);
          setLoading(false);
          return;
        }

        // Ưu tiên hàm mới listenToTutorOrders; fallback nếu bạn chưa refactor
        const unsubscribe =
          OrderService.listenToWorkerOrders?.(tutor.id, (tutorOrders) => {
            const sorted = tutorOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            setOrders(sorted);
            setLoading(false);
          }) ||
          OrderService.listenToWorkerOrders?.(tutor.id, (tutorOrders) => {
            const sorted = tutorOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            setOrders(sorted);
            setLoading(false);
          });

        return unsubscribe;
      } catch (error) {
        console.error('Lỗi khi fetch và listen orders:', error);
        setLoading(false);
      }
    };

    let unsubscribeFn;
    fetchAndListenOrders().then((unsub) => {
      if (typeof unsub === 'function') unsubscribeFn = unsub;
    });

    return () => {
      if (unsubscribeFn) unsubscribeFn();
    };
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
    // các status giữ nguyên: pending / accepted / completed
  });

  // call
  const handleCall = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ.');
      return;
    }
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Không thể gọi', 'Thiết bị không hỗ trợ chức năng gọi điện.');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => {
        console.error('Lỗi khi cố gắng gọi điện:', err);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cố gắng thực hiện cuộc gọi.');
      });
  };

  // cập nhật trạng thái
  const handleUpdateStatus = async (orderId, newStatus, confirmation) => {
    Alert.alert(confirmation.title, confirmation.message, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: confirmation.confirmText,
        style: newStatus === 'rejected' ? 'destructive' : 'default',
        onPress: async () => {
          try {
            await OrderService.updateOrderStatus(orderId, newStatus);

            // nếu hoàn thành thì tăng completedOrders của tutor
            if (newStatus === 'completed') {
              const userId = await getCurrentUserId();
              const tutor = await TutorService.getTutorByUserId(userId);

              if (tutor && tutor.id) {
                const currentCompleted = parseInt(tutor.completedOrders || 0);
                await TutorService.updateTutor(tutor.id, {
                  completedOrders: currentCompleted + 1,
                });
              } else {
                console.warn('Không tìm thấy tutor tương ứng');
              }
            }

            Alert.alert('Thành công', `Đã cập nhật trạng thái lớp thành công!`);
            // listener tự cập nhật UI
          } catch (error) {
            console.error('Failed to update order status:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái. Vui lòng thử lại.');
          }
        },
      },
    ]);
  };

  const renderOrder = ({ item }) => {
    const status = statusConfig[item.status] || statusConfig.default;

    return (
      <TouchableOpacity style={styles.bookingCard} onPress={() => onOrderPress(item)}>
        {/* Header */}
        <View style={styles.bookingHeader}>
          <View>
            <Text style={styles.bookingServiceName}>{item?.service}</Text>
            <Text style={styles.bookingWorkerName}>Học viên: {item?.customer}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>

        {/* Chi tiết lớp */}
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>⏱️</Text>
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{item.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>💰</Text>
            <Text style={styles.detailText}>{item.price}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.bookingActions}>
          {/* Gọi cho học viên */}
          <View style={styles.singleRow}>
            <TouchableOpacity
              style={styles.phoneButtonOrder}
              onPress={async () => {
                try {
                  const user = await userService.getUserById(item.customerId);
                  if (user?.phone) {
                    handleCall(user.phone);
                  } else {
                    Alert.alert('Lỗi', 'Không tìm thấy số điện thoại của học viên.');
                  }
                } catch (error) {
                  console.error('Lỗi khi lấy số điện thoại:', error);
                  Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng.');
                }
              }}
            >
              <Text style={styles.phoneButtonTextOrder}>📞</Text>
            </TouchableOpacity>
          </View>

          {/* Nếu lớp chờ xác nhận */}
          {item.status === 'pending' && (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.cancelButtonOrder}
                onPress={() =>
                  handleUpdateStatus(item.id, 'rejected', {
                    title: 'Từ chối lớp',
                    message: 'Bạn có chắc muốn từ chối lớp này?',
                    confirmText: 'Từ chối',
                  })
                }
              >
                <Text style={styles.cancelButtonTextOrder}>Từ chối</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptButtonOrder}
                onPress={() =>
                  handleUpdateStatus(item.id, 'accepted', {
                    title: 'Nhận lớp',
                    message: 'Bạn có chắc muốn nhận lớp này?',
                    confirmText: 'Nhận lớp',
                  })
                }
              >
                <Text style={styles.acceptButtonTextOrder}>Nhận lớp</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Nếu đã nhận lớp */}
          {item.status === 'accepted' && (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.completeButtonOrder}
                onPress={() =>
                  handleUpdateStatus(item.id, 'completed', {
                    title: 'Hoàn thành buổi dạy',
                    message: 'Xác nhận đã hoàn thành buổi dạy?',
                    confirmText: 'Hoàn thành',
                  })
                }
              >
                <Text style={styles.completeButtonTextOrder}>Hoàn thành</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Quản lý lớp học</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            Tất cả
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
            Chờ xác nhận
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.tab, activeTab === 'accepted' && styles.activeTab]}
          onPress={() => setActiveTab('accepted')}
        >
          <Text style={[styles.tabText, activeTab === 'accepted' && styles.activeTabText]}>
            Đã xác nhận
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Hoàn thành
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyListText}>Chưa có lớp nào.</Text>}
        />
      )}

      <TutorBottomNav onTabPress={onTabPress} activeTab="orders" />
    </SafeAreaView>
  );
};

export default TutorOrdersScreen;