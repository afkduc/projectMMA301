import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../style/styles';
import { CustomerBottomNav } from '../../components/BottomNavigation';
import tutorService from '../../service/tutorService';

const TutorListScreen = ({ service, onTutorPress, onBack, onTabPress }) => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const filteredTutors = await tutorService.getTutorByService(service.name);
        setTutors(filteredTutors);
      } catch (error) {
        console.error('Lỗi tải danh sách tutor:', error);
        Alert.alert('Lỗi', 'Không thể tải danh sách tutor.');
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [service]);

  const removeVietnameseTones = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  // phone call
  const handleCall = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert('Lỗi', 'Không có số điện thoại của tutor.');
      return;
    }

    const phoneUrl = `tel:${phoneNumber}`;

    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) Linking.openURL(phoneUrl);
        else Alert.alert('Lỗi', 'Không thể mở ứng dụng gọi điện.');
      })
      .catch((err) => {
        console.error('Lỗi khi gọi:', err);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cố gắng gọi.');
      });
  };

  // Search tutor
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTutors(tutors);
    } else {
      const lowerQuery = removeVietnameseTones(searchQuery.toLowerCase());

      const filtered = tutors.filter((tutor) => {
        const name = tutor.name?.toLowerCase() || '';
        const cleanName = removeVietnameseTones(name);
        return cleanName.includes(lowerQuery);
      });

      setFilteredTutors(filtered);
    }
  }, [searchQuery, tutors]);

  const renderTutor = ({ item }) => (
    <TouchableOpacity style={styles.workerCard}>
      <View style={styles.workerHeader}>
        <Text style={styles.avatar}>{item.avatar || '👨‍🏫'}</Text>
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>{item.name || 'Chưa rõ tên'}</Text>
          <Text style={styles.experience}>
            {item.experience || 'Kinh nghiệm chưa rõ'}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {item.rating || '5.0'}</Text>
            <Text style={styles.reviews}>({item.reviews || 0} đánh giá)</Text>
          </View>
        </View>
        <View style={styles.workerMeta}>
          <Text style={styles.price}>{item.price || 'Liên hệ'}</Text>
          <Text style={styles.distance}>📍 {item.distance || 'Không rõ'}</Text>
        </View>
      </View>
      <View style={styles.workerFooter}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => handleCall(item.phone)}
        >
          <Text style={styles.contactButtonText}>📞 Gọi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => onTutorPress(item, service)}
        >
          <Text style={styles.bookButtonText}>Đặt lịch</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>{service.name}</Text>
        <TouchableOpacity onPress={() => setShowSearch((prev) => !prev)}>
          <Text style={styles.filterButton}>🔍</Text>
        </TouchableOpacity>
      </View>

      {showSearch && (
        <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
          <TextInput
            placeholder='Tìm kiếm tutor theo tên...'
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              fontSize: 16,
              color: '#111827',
            }}
            placeholderTextColor='#9ca3af'
          />
        </View>
      )}

      <FlatList
        data={filteredTutors}
        renderItem={renderTutor}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.workersList}
        showsVerticalScrollIndicator={false}
      />

      <CustomerBottomNav onTabPress={onTabPress} activeTab='home' />
    </SafeAreaView>
  );
};

export default TutorListScreen;
