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
import UserService from "@service/UserService"
import { services as mockServices } from "@data/mockData";
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

      // Try Firebase first
      try {
        const activeServices = await ServiceService.getActiveServices();
        if (activeServices.length > 0) {
          setServices(activeServices);
        } else {
          // Fall back to mock data
          setServices(mockServices.filter((s) => s.status === 'active'));
        }
      } catch (error) {
        console.error('Error loading services from Firebase:', error);
        // Fall back to mock data
        setServices(mockServices.filter((s) => s.status === 'active'));
      }
    } catch (error) {
      console.error('Error loading services:', error);
      // Use mock data as final fallback
      setServices(mockServices.filter((s) => s.status === 'active'));
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
        <View
          style={[
            styles.container,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <ActivityIndicator size='large' color='#2563eb' />
          <Text style={{ marginTop: 20, fontSize: 16, color: '#6b7280' }}>
            Đang tải dịch vụ...
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
          <Text style={styles.question}>Bạn cần dịch vụ gì hôm nay?</Text>
        </View>
        {/* <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchText}>Tìm kiếm dịch vụ...</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchTextInput}
              placeholder='Tìm kiếm dịch vụ...'
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor='#9ca3af'
            />
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Dịch vụ phổ biến</Text>
          {/* {services.length > 0 ? (
            <FlatList
              data={services}
              renderItem={renderService}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.servicesList}
              keyExtractor={(item) => item.id || item.name}
            />
          ) : (
            <Text style={{ textAlign: "center", color: "#6b7280", marginTop: 20 }}>Không có dịch vụ nào</Text>
          )} */}

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
            <Text
              style={{ textAlign: 'center', color: '#6b7280', marginTop: 20 }}
            >
              Không tìm thấy dịch vụ phù hợp
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
