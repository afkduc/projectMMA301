import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from "react-native"
import { styles } from "../../style/styles"
import { statusConfig } from "../../constants/statusConfig"
import { TutorBottomNav } from "../../components/BottomNavigation"
import { getCurrentUserId } from "../../utils/auth"
import OrderService from "../../service/orderService"
import TutorService from "../../service/tutorService"
import ServiceService from "../../service/serviceService"

const TutorDashboardScreen = ({ onTabPress, onOrderPress }) => {
  const [orders, setOrders] = useState([])
  const [tutorInfo, setTutorInfo] = useState(null)

  useEffect(() => {
    const fetchAndListenOrders = async () => {
      try {
        const userId = await getCurrentUserId()
        const [tutor, allServices] = await Promise.all([
          TutorService.getTutorByUserId(userId),
          ServiceService.getAllServices(),
        ])

        if (!tutor || !tutor.id) {
          console.warn("Không tìm thấy thông tin tutor tương ứng với userId:", userId)
          setOrders([])
          return
        }

        // Xử lý specialty từ serviceId
        const serviceNames = (tutor.serviceId || [])
          .map((id) => {
            const svc = allServices.find((s) => String(s.id) === String(id))
            return svc ? svc.name : `#${id}`
          })
          .join(", ")

        setTutorInfo({
          ...tutor,
          specialty: Array.isArray(tutor.specialty)
            ? tutor.specialty.join(", ")
            : tutor.specialty || "Chưa có môn học",
          rating: tutor.rating || "4.8",
          totalReviews: tutor.reviews || 0,
        })


        const unsubscribe = OrderService.listenToTutorOrders(tutor.id, (tutorOrders) => {
          const sortedOrders = tutorOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
          setOrders(sortedOrders)
        })

        return unsubscribe
      } catch (error) {
        console.error("Lỗi khi fetch và listen orders:", error)
      }
    }

    let unsubscribeFn
    fetchAndListenOrders().then((unsub) => {
      if (typeof unsub === "function") {
        unsubscribeFn = unsub
      }
    })

    return () => {
      if (unsubscribeFn) unsubscribeFn()
    }
  }, [])

  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const acceptedOrders = orders.filter((o) => o.status === "accepted").length
  const completedOrders = orders.filter((o) => o.status === "completed").length
  const totalEarnings = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => {
      const rawPrice = o.price?.toLowerCase?.().trim()
      const price =
        rawPrice === "thỏa thuận"
          ? 0
          : Number.parseInt(rawPrice.replace(/[^\d]/g, ""), 10) || 0
      return sum + price
    }, 0)

  const recentOrders = orders.slice(0, 3)

  const renderRecentOrder = ({ item }) => {
    const status = statusConfig[item.status] || {}
    return (
      <TouchableOpacity style={styles.recentOrderCard} onPress={() => onOrderPress(item)}>
        <View style={styles.recentOrderHeader}>
          <Text style={styles.recentOrderCustomer}>{item.customer}</Text>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>
        <Text style={styles.recentOrderService}>{item.service}</Text>
        <Text style={styles.recentOrderTime}>📅 {item.date} - {item.time}</Text>
        <Text style={styles.recentOrderPrice}>💰 {item.price}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Tutor Header */}
        <View style={styles.tutorHeader}>
          <View style={styles.tutorInfo}>
            <Text style={styles.tutorAvatar}>👨‍🏫</Text>
            <View>
              <Text style={styles.tutorName}>{tutorInfo?.name || "Gia sư chưa đặt tên"}</Text>
              <Text style={styles.tutorSpecialty}>{tutorInfo?.specialty || "Chuyên ngành chưa xác định"}</Text>
              <View style={styles.tutorRating}>
                <Text style={styles.rating}>⭐ {tutorInfo?.rating}</Text>
                <Text style={styles.reviews}>({tutorInfo?.totalReviews} đánh giá)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⏳</Text>
            <Text style={styles.statNumber}>{pendingOrders}</Text>
            <Text style={styles.statLabel}>Chờ xác nhận</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📘</Text>
            <Text style={styles.statNumber}>{acceptedOrders}</Text>
            <Text style={styles.statLabel}>Đang dạy</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statNumber}>{completedOrders}</Text>
            <Text style={styles.statLabel}>Hoàn thành</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statNumber}>{(totalEarnings / 1000).toFixed(0)}K</Text>
            <Text style={styles.statLabel}>Thu nhập</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={() => onTabPress("orders")}>
              <Text style={styles.actionIcon}>📋</Text>
              <Text style={styles.actionText}>Đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onTabPress("tutorSchedule")}
            >
              <Text style={styles.actionIcon}>📅</Text>
              <Text style={styles.actionText}>Lịch dạy học</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💰</Text>
              <Text style={styles.actionText}>Thu nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>⭐</Text>
              <Text style={styles.actionText}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrdersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
            <TouchableOpacity onPress={() => onTabPress("orders")}>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentOrders}
            renderItem={renderRecentOrder}
            scrollEnabled={false}
            contentContainerStyle={styles.recentOrdersList}
            keyExtractor={(item, index) => item.id || index.toString()}
          />
        </View>
      </ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="dashboard" />
    </SafeAreaView>
  )
}

export default TutorDashboardScreen