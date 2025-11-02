import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../style/styles';
import { CustomerBottomNav } from '../../components/BottomNavigation';
import * as Location from 'expo-location';
import orderService from '../../service/orderService';
import { getCurrentUserId } from '../../utils/auth';
import userService from '../../service/UserService';

const TutorDetailScreen = ({
  tutor,
  service,
  onBack,
  onTabPress,
  previousOrder,
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');
  const [customer, setCustomer] = useState(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  useEffect(() => {
    if (previousOrder) {
      setSelectedDate(previousOrder.date || '');
      setSelectedTime(previousOrder.time || '');
      setAddress(previousOrder.address || '');
    }
  }, [previousOrder]);

  useEffect(() => {
    const fetchCustomerAndAddress = async () => {
      const customerId = await getCurrentUserId();
      if (!customerId) return;

      const user = await userService.getUserById(customerId);
      if (user) {
        setCustomer(user);
        if (!address) {
          setAddress(user.address || '');
        }
      }
    };

    fetchCustomerAndAddress();
  }, []);

  // Lấy vị trí hiện tại
  const getCurrentLocation = async () => {
    try {
      setGettingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Quyền bị từ chối', 'Không thể truy cập vị trí.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const reverseGeocode = await Location.reverseGeocodeAsync(location.coords);

      if (reverseGeocode.length > 0) {
        const { street, district, city, region } = reverseGeocode[0];
        const fullAddress = `${street || ''}, ${district || ''}, ${city || ''
          }, ${region || ''}`;
        setAddress(fullAddress);
      } else {
        Alert.alert('Lỗi', 'Không tìm được địa chỉ.');
      }
    } catch (error) {
      console.error('Lỗi lấy vị trí:', error);
      Alert.alert('Lỗi', 'Không thể lấy vị trí.');
    } finally {
      setGettingLocation(false);
    }
  };

  const times = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  // Trong handleBooking
  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !address) {
      Alert.alert('Thông báo', 'Vui lòng chọn ngày, giờ và địa chỉ');
      return;
    }

    if (!customer) {
      Alert.alert('Lỗi', 'Không xác định được người dùng.');
      return;
    }

    // 🧠 Xử lý khớp serviceId (vì tutor.serviceId là mảng tên dịch vụ)
    let matchedServiceName = null;

    if (Array.isArray(tutor?.serviceId) && service) {
      const normalize = (str) =>
        str?.toLowerCase()?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '')?.trim();

      const serviceNameNorm = normalize(service.name || '');

      matchedServiceName = tutor.serviceId.find((item) =>
        normalize(item)?.includes(serviceNameNorm)
      );
    }

    // 🔒 Nếu không tìm được khớp thì vẫn lưu service?.id hoặc 'unknown'
    const serviceKey = matchedServiceName || service?.id || 'unknown';
    const serviceNameDisplay = service?.name || 'Môn học';

    const orderData = {
      address,
      date: selectedDate,
      time: selectedTime,
      customer: customer?.name || 'Khách hàng',
      service: serviceNameDisplay,
      serviceId: serviceKey, // ✅ đã chuẩn hóa
      avatar: tutor?.avatar,
      tutor: tutor?.name || 'Gia sư',
      price: tutor?.price || 'Thỏa thuận',
      estimatedHours: '1',
      description: 'Gia sư tại nhà',
      status: 'pending',
      customerId: customer?.id,
      tutorId: tutor?.id,
    };

    Alert.alert(
      'Xác nhận đặt lịch',
      `Đặt lịch với ${tutor?.name || 'gia sư'}\nDịch vụ: ${serviceNameDisplay}\nNgày: ${selectedDate}\nGiờ: ${selectedTime}\nĐịa chỉ: ${address}`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: async () => {
            try {
              await orderService.createOrder(orderData);
              Alert.alert('Thành công', 'Đặt lịch thành công!');
              onBack && onBack();
            } catch (error) {
              console.error('❌ [TutorDetailScreen] Lỗi tạo booking:', error);
              Alert.alert('Lỗi', 'Không thể đặt lịch. Vui lòng thử lại.');
            }
          },
        },
      ]
    );
  };



  const handleCall = () => {
    Alert.alert(
      'Gọi điện',
      `Bạn có muốn gọi cho ${tutor?.name}: ${tutor?.phone} không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Gọi',
          onPress: () => {
            const phoneNumber = `tel:${tutor?.phone}`;
            Linking.openURL(phoneNumber).catch(() =>
              Alert.alert('Lỗi', 'Không thể mở trình quay số.')
            );
          },
        },
      ]
    );
  };

  const formatCurrency = (value) => {
    const number = Number(value);
    if (isNaN(number)) return '0 đ/giờ';
    return `${new Intl.NumberFormat('vi-VN').format(number)} đ/giờ`;
  };

  const getNextDays = (numDays = 7) => {
    const result = [];
    const today = new Date();

    for (let i = 0; i < numDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      let label = '';
      if (i === 0) label = 'Hôm nay';
      else if (i === 1) label = 'Ngày mai';
      else {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        label = `${day}/${month}`;
      }

      const value = date.toISOString().split('T')[0];
      result.push({ id: i, label, value });
    }

    return result;
  };

  if (!tutor || !service) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20 }}>
          <Text>Thiếu thông tin gia sư hoặc dịch vụ.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.screenHeader}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.backButton}>← Quay lại</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Chi tiết gia sư</Text>
          <TouchableOpacity>
            <Text style={styles.favoriteButton}>❤️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailContent}>
          <View style={styles.workerProfile}>
            <Text style={styles.detailAvatar}>{tutor.avatar}</Text>
            <Text style={styles.detailWorkerName}>{tutor.name}</Text>
            <Text style={styles.detailExperience}>{tutor.degree}</Text>
            <View style={styles.detailRatingContainer}>
              <Text style={styles.detailRating}>⭐ {tutor.rating}</Text>
              <Text style={styles.detailReviews}>
                ({tutor.reviews} đánh giá)
              </Text>
            </View>
            <Text style={styles.detailPrice}>{formatCurrency(tutor.price)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Giới thiệu</Text>
            <Text style={styles.description}>
              {`Tôi là gia sư ${service?.name ? String(service.name).toLowerCase() : 'Môn học'} 
  với kinh nghiệm ${String(tutor?.experience || 'chưa có thông tin')}.
  Cam kết giảng dạy tận tâm, dễ hiểu và hỗ trợ học viên tiến bộ nhanh chóng.`}
            </Text>

          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn ngày</Text>
            <View style={styles.dateContainer}>
              {getNextDays().map((date) => (
                <TouchableOpacity
                  key={date.id}
                  style={[
                    styles.dateButton,
                    selectedDate === date.value && styles.selectedDate,
                  ]}
                  onPress={() => setSelectedDate(date.value)}
                >
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate === date.value && styles.selectedDateText,
                    ]}
                  >
                    {date.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn giờ</Text>
            <View style={styles.timeContainer}>
              {times.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeButton,
                    selectedTime === time && styles.selectedTime,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === time && styles.selectedTimeText,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ</Text>
            <TextInput
              style={styles.addressInput}
              placeholder="Nhập địa chỉ nơi học"
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </ScrollView>

        <View style={styles.detailFooter}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Text style={styles.callButtonText}>📞 Gọi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
            <Text style={styles.bookButtonText}>Đặt lịch học</Text>
          </TouchableOpacity>
        </View>

        <CustomerBottomNav onTabPress={onTabPress} activeTab="home" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TutorDetailScreen;
