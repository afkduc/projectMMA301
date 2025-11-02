import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../../style/styles"
import { menuItems } from "../../data/mockData"
import { CustomerBottomNav } from "../../components/BottomNavigation"
import userService from "../../service/UserService"
import EditProfileScreen from "./EditProfileScreen"
import { getCurrentUserId } from "../../utils/auth"

const ProfileScreen = ({ onTabPress, onLogout, onMenuPress }) => {
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUserInfo = async () => {
    const userId = await getCurrentUserId()
    const userData = await userService.getUserById(userId)
    if (userData) {
      setUserInfo({ ...userData, id: userId })
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const handleMenuPress = (action) => {
    if (action === "profile" && onMenuPress) {
      onMenuPress("personalInfo")
    } else if (action === "address" && onMenuPress) {
      onMenuPress("addressManagement")
    } else if (action === "payment" && onMenuPress) {
      onMenuPress("paymentMethod")
    } else if (action === "offers" && onMenuPress) {
      onMenuPress("offers")
    } else if (action === "support" && onMenuPress) {
      onMenuPress("helpSupport")
    } else if (action === "settings" && onMenuPress) {
      onMenuPress("customerSettings")
    } else if (action === "about" && onMenuPress) {
      onMenuPress("aboutUs")
    } else {
      Alert.alert("Thông báo", `Chức năng ${action} đang được phát triển`)
    }
  }

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: onLogout },
    ])
  }

  const handleSaveProfile = async (newUserInfo) => {
    await userService.updateUser(userInfo.id, newUserInfo)
    setUserInfo(newUserInfo)
    setShowEditProfile(false)
    Alert.alert("Thành công", "Đã lưu thông tin cá nhân.")
  }

  if (loading || !userInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 50 }} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileAvatar}>👤</Text>
            <View>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userPhone}>{userInfo.phone}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => setShowEditProfile(true)}>
            <Text style={styles.editButtonText}>Sửa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userInfo.completedOrders || 0}</Text>
            <Text style={styles.statLabel}>Đơn hoàn thành</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userInfo.rating || "Chưa có"}</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Ưu đãi</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item.action)}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.promoContainer}>
          <View style={styles.promoCard}>
            <Text style={styles.promoIcon}>🎉</Text>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Mời bạn bè - Nhận ưu đãi</Text>
              <Text style={styles.promoText}>Giảm 50k cho mỗi bạn bè tham gia</Text>
            </View>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Mời ngay</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      <EditProfileScreen
        visible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfile}
        userInfo={userInfo}
      />

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  )
}

export default ProfileScreen
