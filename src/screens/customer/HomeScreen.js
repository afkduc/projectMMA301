import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { styles } from '../../style/styles';
import ServiceService from "@service/serviceService";
import { initialServices } from "@utils/DataInitializer";
import { CustomerBottomNav } from '../../components/BottomNavigation';

const HomeScreen = ({ onServicePress, onTabPress }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

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

      try {
        const activeServices = await ServiceService.getActiveServices();
        if (activeServices.length > 0) {
          setServices(activeServices);
        } else {
          setServices(initialServices.filter((s) => s.status === 'active'));
        }
      } catch (error) {
        console.error('Error loading services from Firebase:', error);
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
      onPress={() => onServicePress(item)}
    >
      <Text style={styles.serviceIcon}>{item.icon}</Text>
      <Text style={styles.serviceName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size='large' color='#2563eb' />
          <Text style={{ marginTop: 20, fontSize: 16, color: '#6b7280' }}>
            Đang tải gia sư...
          </Text>
        </View>
        <CustomerBottomNav onTabPress={onTabPress} activeTab='home' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.homeHeader}>
          <Text style={styles.greeting}>Xin chào! 👋</Text>
          <Text style={styles.question}>Bạn cần gia sư nào hôm nay?</Text>
        </View>

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
      <CustomerBottomNav onTabPress={onTabPress} activeTab='home' />
    </SafeAreaView>
  );
};

export default HomeScreen;
