import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../../style/styles';
import ServiceService from '@service/serviceService';
import { initialServices } from '@utils/DataInitializer';
import { CustomerBottomNav } from '../../components/BottomNavigation';

const HomeScreen = ({ onServicePress, onTabPress, onOpenAI }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  // 🧠 --- Hiệu ứng cho nút AI Robot ---
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  // 🧠 --- Hết phần khai báo hiệu ứng ---

  useEffect(() => {
    loadServices();
  }, []);

  // 🧠 --- Hiệu ứng idle cho nút robot (xoay nhẹ, nhấp nháy) ---
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(blinkAnim, { toValue: 0.7, duration: 700, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(blinkAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);
  // 🧠 --- Hết phần hiệu ứng AI ---

  const removeVietnameseTones = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(services);
    } else {
      const normalizedQuery = removeVietnameseTones(searchQuery.toLowerCase());
      const results = services.filter((service) => {
        const name = removeVietnameseTones(service.name.toLowerCase());
        return name.includes(normalizedQuery);
      });
      setFilteredServices(results);
    }
  }, [searchQuery, services]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const activeServices = await ServiceService.getActiveServices();
      if (activeServices.length > 0) {
        setServices(activeServices);
      } else {
        setServices(initialServices.filter((s) => s.status === 'active'));
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setServices(initialServices.filter((s) => s.status === 'active'));
    } finally {
      setLoading(false);
    }
  };

  const renderService = ({ item }) => (
    <TouchableOpacity
      style={[styles.serviceCard, { backgroundColor: item.color + '20' }]}
      onPress={() => onServicePress && onServicePress(item)}
    >
      <Text style={styles.serviceIcon}>{item.icon}</Text>
      <Text style={styles.serviceName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // 🧠 Khi người dùng bấm vào icon robot → gọi hàm từ App để mở AI
  const goToAI = () => {
    Animated.sequence([
      Animated.timing(pressAnim, { toValue: 0.86, duration: 100, useNativeDriver: true }),
      Animated.timing(pressAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start(() => {
      if (onOpenAI) onOpenAI(); // gọi về App.js
    });
  };

  // 🧠 --- Tạo hiệu ứng xoay nhẹ cho nút AI ---
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-8deg', '8deg'],
  });
  // 🧠 --- Hết phần hiệu ứng xoay ---

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size='large' color='#2563eb' />
          <Text style={{ marginTop: 20, fontSize: 16, color: '#6b7280' }}>
            Đang tải danh sách gia sư...
          </Text>
        </View>
        <CustomerBottomNav onTabPress={onTabPress} activeTab='home' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.homeHeader}>
          <Text style={styles.greeting}>Xin chào! 👋</Text>
          <Text style={styles.question}>Bạn cần gia sư nào hôm nay?</Text>
        </View>

        {/* Ô tìm kiếm */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchTextInput}
              placeholder='Tìm kiếm gia sư...'
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor='#9ca3af'
            />
          </View>
        </View>

        {/* Danh sách dịch vụ / gia sư */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Gia sư phổ biến</Text>

          {filteredServices.length > 0 ? (
            <FlatList
              data={filteredServices}
              renderItem={renderService}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.servicesList}
              keyExtractor={(item) => item.id || item.name}
            />
          ) : (
            <Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 20 }}>
              Không tìm thấy gia sư phù hợp
            </Text>
          )}
        </View>

        {/* Khuyến mãi */}
        <View style={styles.promoContainer}>
          <View style={styles.promoCard}>
            <Text style={styles.promoTitle}>🎉 Ưu đãi đặc biệt</Text>
            <Text style={styles.promoText}>Giảm 20% cho lần đặt đầu tiên</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Sử dụng ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 🧠 --- NÚT FLOATING AI ROBOT --- */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 90,
          right: 20,
          zIndex: 999,
          elevation: 10,
          transform: [{ scale: pressAnim }, { rotate }],
          opacity: blinkAnim,
        }}
      >
        <TouchableOpacity activeOpacity={0.85} onPress={goToAI}>
          <LinearGradient
            colors={['#00c6ff', '#0072ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 68,
              height: 68,
              borderRadius: 34,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.25,
              shadowRadius: 5,
              elevation: 6,
            }}
          >
            <MaterialCommunityIcons name='robot-happy-outline' size={36} color='#fff' />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
      {/* 🧠 --- HẾT NÚT FLOATING AI ROBOT --- */}

      <CustomerBottomNav onTabPress={onTabPress} activeTab='home' />
    </SafeAreaView>
  );
};

export default HomeScreen;
