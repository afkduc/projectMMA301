import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, Switch, ActivityIndicator } from "react-native"
import { styles } from "../../style/styles"
import { workerMenuItems as tutorMenuItems } from "../../data/mockData"
import { TutorBottomNav } from "../../components/BottomNavigation"
import TutorService from "../../service/tutorService"
import ServiceService from "../../service/serviceService"
import OrderService from "../../service/orderService"
import { getCurrentUserId } from "../../utils/auth"
import userService from "../../service/UserService"

const TutorProfileScreen = ({ currentUser, onTabPress, onLogout, onMenuPress }) => {
  const [isAvailable, setIsAvailable] = useState(true)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState(null)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const loadTutorInfo = async () => {
      const uid = await getCurrentUserId()
      setUserId(uid)
      if (!uid) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const [tutor, allServices] = await Promise.all([
          TutorService.getTutorByUserId(uid),
          ServiceService.getAllServices(),
        ])

        if (tutor) {
          const serviceNames = (tutor.serviceId || [])
            .map(id => {
              const svc = allServices.find(s => String(s.id) === String(id))
              return svc ? svc.name : `#${id}`
            })
            .join(", ")

          setUserInfo({
            id: tutor.id,
            name: tutor.name,
            phone: tutor.phone,
            specialty: serviceNames || "N/A",
            experience: tutor.experience,
            price: tutor.price,
            address: tutor.address,
            rating: tutor.rating,
            reviews: tutor.reviews,
            completedOrders: tutor.completedOrders,
            isAvailable: tutor.status === "active" || tutor.status === true,
          })

          setIsAvailable(tutor.status === "active" || tutor.status === true)

          const allOrders = await OrderService.getOrdersByWorker(tutor.id)
          const now = new Date()
          const monthlyOrders = allOrders.filter(o => {
            if (!o.date) return false
            let orderDate = new Date()
            if (o.date.includes("/")) {
              const [day, month, year] = o.date.split("/").map(x => parseInt(x))
              orderDate = new Date(year, month - 1, day)
            } else if (o.date.includes("-")) {
              orderDate = new Date(o.date)
            }
            return (
              orderDate.getFullYear() === now.getFullYear() &&
              orderDate.getMonth() === now.getMonth() &&
              (o.status || "").toLowerCase() === "completed"
            )
          })

          const parsePrice = (priceStr) => {
            if (!priceStr) return 0
            const numeric = priceStr.replace(/[^\d]/g, "")
            return parseInt(numeric || "0")
          }

          const gross = monthlyOrders.reduce((sum, o) => sum + parsePrice(o.price), 0)
          const income = gross - gross * 0.1
          setMonthlyIncome(income)
        }
      } catch (err) {
      } finally {
        setLoading(false)
      }
    }

    loadTutorInfo()
  }, [currentUser])

  const handleToggleAvailability = async (value) => {
    setIsAvailable(value)
    if (!userInfo) return
    try {
      await TutorService.updateTutor(userInfo.id, { status: value ? true : false })
    } catch (err) {}
  }

  const handleSaveProfile = async (newUserInfo) => {
    if (!userInfo) return
    try {
      await TutorService.updateTutor(userInfo.id, newUserInfo)
      const updateUserInfo = {
        avatar: newUserInfo.avatar,
        name: newUserInfo.name,
        phone: newUserInfo.phone,
        specialty: newUserInfo.specialty,
        area: newUserInfo.address
      }
      await userService.updateUser(userId, updateUserInfo)
    } catch (err) {}
  }

  const handleMenuPress = (action) => {
    if (onMenuPress) {
      onMenuPress(action)
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#10b981" />
      </SafeAreaView>
    )
  }

  if (!userInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>Không tìm thấy thông tin gia sư.</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.tutorProfileHeader}>
          <View style={styles.tutorProfileInfo}>
            <Text style={styles.tutorProfileAvatar}>👨‍🏫</Text>
            <View>
              <Text style={styles.tutorProfileName}>{userInfo.name}</Text>
              <Text style={styles.tutorProfilePhone}>{userInfo.phone}</Text>
              <Text style={styles.tutorProfileSpecialty}>{userInfo.specialty}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => setShowEditProfile(true)}>
            <Text style={styles.editButtonText}>Sửa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.availabilityContainer}>
          <View style={styles.availabilityInfo}>
            <Text style={styles.availabilityTitle}>Trạng thái dạy học</Text>
            <Text style={styles.availabilitySubtitle}>
              {isAvailable ? "Đang sẵn sàng nhận lớp" : "Tạm ngưng nhận lớp"}
            </Text>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={handleToggleAvailability}
            trackColor={{ false: "#e5e7eb", true: "#10b981" }}
            thumbColor={isAvailable ? "#ffffff" : "#f3f4f6"}
          />
        </View>

        <View style={styles.tutorStatsContainer}>
          <View style={styles.tutorStatItem}>
            <Text style={styles.tutorStatNumber}>{userInfo.reviews ?? "-"}</Text>
            <Text style={styles.tutorStatLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.tutorStatItem}>
            <Text style={styles.tutorStatNumber}>{userInfo.completedOrders ?? "0"}</Text>
            <Text style={styles.tutorStatLabel}>Lớp hoàn thành</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.tutorStatItem}>
            <Text style={styles.tutorStatNumber}>{userInfo.experience ?? "-"}</Text>
            <Text style={styles.tutorStatLabel}>Kinh nghiệm</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {tutorMenuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item.action)}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.earningsContainer}>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsIcon}>💰</Text>
            <View style={styles.earningsContent}>
              <Text style={styles.earningsTitle}>Thu nhập tháng này</Text>
              <Text style={styles.earningsAmount}>
                {monthlyIncome.toLocaleString("vi-VN")}đ
              </Text>
            </View>
            <TouchableOpacity style={styles.earningsButton} onPress={() => handleMenuPress("tutorIncome")}>
              <Text style={styles.earningsButtonText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
              { text: "Hủy", style: "cancel" },
              { text: "Đăng xuất", style: "destructive", onPress: onLogout },
            ])
          }}
        >
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      <TutorEditProfileScreen
        visible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfile}
        userInfo={userInfo}
      />

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  )
}

export default TutorProfileScreen
