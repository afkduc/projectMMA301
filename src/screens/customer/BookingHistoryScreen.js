import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../style/styles';
import { statusConfig } from '../../constants/statusConfig';
import { CustomerBottomNav } from '../../components/BottomNavigation';
import TutorSessionsService from '../../service/TutorSessionsService';
import tutorService from '../../service/tutorService';
import serviceService from '../../service/serviceService';
import ReviewScreen from './ReviewScreen';
import Modal from 'react-native-modal';

const normalizeText = (text) => {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};


const BookingHistoryScreen = ({ onTabPress, onRebook }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewSession, setReviewSession] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchSessions = async () => {
      try {
        unsubscribe = TutorSessionsService.listenToSessions((allSessions) => {
          setSessions(allSessions.reverse()); // show mới nhất trước
          setLoading(false);
        });
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải lịch sử đặt gia sư');
        setLoading(false);
      }
    };

    fetchSessions();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleCancelBooking = async (sessionId) => {
    Alert.alert('Xác nhận hủy', 'Bạn có chắc muốn hủy buổi học này?', [
      { text: 'Không', style: 'cancel' },
      {
        text: 'Hủy buổi học',
        style: 'destructive',
        onPress: async () => {
          try {
            await TutorSessionsService.updateSessionStatus(sessionId, 'cancelled');
            Alert.alert('Thành công', 'Buổi học đã được hủy');
          } catch {
            Alert.alert('Lỗi', 'Không thể hủy buổi học.');
          }
        },
      },
    ]);
  };

  const openReviewModal = (session) => {
    setReviewSession(session);
    setReviewModalVisible(true);
  };

  const closeReviewModal = () => {
    setReviewSession(null);
    setReviewModalVisible(false);
  };

  const filteredSessions = sessions.filter((s) => {
    if (activeTab === 'all') return true;
    return s.status === activeTab;
  });

  const handleRebookSession = async (session) => {
    try {
      console.log('➡️ Rebooking session:', session);

      const tutor = await tutorService.getTutorById(session.tutorId);
      console.log('🔹 Fetched tutor:', tutor);

    if (!tutor) {
      Alert.alert('Thông báo', 'Không tìm thấy gia sư');
      return;
    }

    // Chuẩn hóa môn học session
    const sessionSubject = normalizeText(session.subject || session.service || '');
    const targetWords = sessionSubject.split(' ');
    console.log('🔹 Normalized session subject:', sessionSubject);
    console.log('🔹 Target words:', targetWords);

    // Chuẩn hóa danh sách môn học của tutor
    const tutorSubjects = (tutor.serviceId || []).map(normalizeText);
    console.log('🔹 Tutor subjects:', tutorSubjects);

    // Tìm môn học phù hợp
    const matchedSubject = tutorSubjects.find(subj =>
      targetWords.some(word => subj.includes(word))
    );

    console.log('🔹 Matched subject:', matchedSubject);

    if (!matchedSubject) {
      Alert.alert('Thông báo', 'Gia sư không có môn học phù hợp để đặt lại');
      return;
    }

    onRebook(tutor, matchedSubject, session);
  } catch (error) {
    console.error('❌ [BookingHistory] Lỗi khi đặt lại buổi học:', error);
    Alert.alert('Lỗi', 'Không thể đặt lại buổi học.');
  }
};



  const renderSession = ({ item }) => {
    const status = statusConfig[item.status] || {
      label: item.status,
      bg: '#eee',
      color: '#333',
    };

    return (
      <View style={styles.bookingCard}>
        <View style={styles.bookingHeader}>
          <View>
            <Text style={styles.bookingServiceName}>{item.service || 'Môn học'}</Text>
            <Text style={styles.bookingWorkerName}>
              Gia sư: {item.tutor || 'Chưa xác định'}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🕒</Text>
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{item.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>💰</Text>
            <Text style={styles.detailText}>{item.price || 'Thỏa thuận'}</Text>
          </View>
        </View>

        <View style={styles.bookingActions}>
          {/* {item.status === 'completed' && (
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => openReviewModal(item)}
            >
              <Text style={styles.reviewButtonText}>Đánh giá</Text>
            </TouchableOpacity>
          )} */}

          {(item.status === 'accepted' || (item.status === 'pending' && activeTab === 'all')) && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelBooking(item.id)}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.rebookButton}
            onPress={() => handleRebookSession(item)}
          >
            <Text style={styles.rebookButtonText}>Đặt lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
        <CustomerBottomNav onTabPress={onTabPress} activeTab="history" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Lịch sử đặt gia sư</Text>
      </View>

      <View style={styles.tabContainer}>
        {['all', 'accepted', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === 'all' ? 'Tất cả' : tab === 'accepted' ? 'Đã xác nhận' : 'Hoàn thành'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredSessions}
        renderItem={renderSession}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookingsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
            Bạn chưa có buổi học nào
          </Text>
        }
      />

      <Modal
        isVisible={reviewModalVisible}
        onBackdropPress={closeReviewModal}
        backdropOpacity={0.5}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 24,
            width: '90%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {reviewSession && <ReviewScreen order={reviewSession} onBack={closeReviewModal} />}
        </View>
      </Modal>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="history" />
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;
