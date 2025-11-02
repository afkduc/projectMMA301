import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert, Switch, ActivityIndicator } from "react-native"
import { styles } from "../../style/styles"
import { tutorMenuItems } from "../../data/mockData"
import { TutorBottomNav } from "../../components/BottomNavigation"
import TutorService from "../../service/tutorService"
import ServiceService from "../../service/serviceService"
import OrderService from "../../service/orderService"
import { getCurrentUserId } from "../../utils/auth"
import userService from "../../service/UserService"
import TutorEditProfileScreen from "./TutorEditProfileScreen"

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
          // Không dùng array → chỉ lấy chuỗi trong DB
          let serviceNames = "N/A"
          if (typeof tutor.serviceId === "string") {
            serviceNames = tutor.serviceId
          } else if (typeof tutor.specialty === "string") {
            serviceNames = tutor.specialty
          }

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

          const allOrders = await OrderService.getAllOrdersByTutorId(tutor.id) 
          const now = new Date()
          let gross = 0
for (let i = 0; i < (allOrders ? allOrders.length : 0); i++) {
  const o = allOrders[i]
  if (!o || !o.date) continue

  let orderDate = new Date()
  if (typeof o.date === "string") {
    if (o.date.indexOf("/") !== -1) {
      const parts = o.date.split("/")
      const day = parseInt(parts[0] || "0", 10)
      const month = parseInt(parts[1] || "0", 10)
      const year = parseInt(parts[2] || "0", 10)
      orderDate = new Date(year, month - 1, day)
    } else if (o.date.indexOf("-") !== -1) {
      orderDate = new Date(o.date)
    }
  }

  const status = (o.status || "").toLowerCase()
  if (orderDate.getFullYear() === now.getFullYear()
      && orderDate.getMonth() === now.getMonth()
      && status === "completed") {
    const priceStr = o.price || "0"
    const numeric = priceStr.replace(/[^\d]/g, "")
    const price = parseInt(numeric || "0", 10)
    if (!isNaN(price)) gross += price
  }
}
const income = gross - Math.floor(gross * 0.1)
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
            <Text style={styles.tutorStatNumber}>{userInfo.experience ? `${userInfo.experience} năm` : "-"}</Text>
            <Text style={styles.tutorStatLabel}>Kinh nghiệm</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
  {(() => {
    const out = []
    const list = tutorMenuItems

    if (list && typeof list === "object") {
      if (Array.isArray(list)) {
        // lặp thuần for, không dùng .map
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          if (!item) continue
          out.push(
            <TouchableOpacity key={item.id || i} style={styles.menuItem} onPress={() => handleMenuPress(item.action)}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          )
        }
      } else {
        // trường hợp là object: {id1: {...}, id2: {...}}
        for (const k in list) {
          if (!Object.prototype.hasOwnProperty.call(list, k)) continue
          const item = list[k]
          if (!item) continue
          out.push(
            <TouchableOpacity key={item.id || k} style={styles.menuItem} onPress={() => handleMenuPress(item.action)}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          )
        }
      }
    }

    return out.length ? out : <Text style={{ padding: 12, color: "#6b7280" }}>Menu trống</Text>
  })()}
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
