import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native"
import { styles } from "../../style/styles"
import { TutorBottomNav } from "../../components/BottomNavigation"
import OrderService from "../../service/orderService"
import TutorService from "../../service/tutorService"

const TutorIncomeScreen = ({ onTabPress, onBack, currentUser }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [orders, setOrders] = useState([])
  const [incomeData, setIncomeData] = useState({
    total: 0,
    orders: 0,
    hours: 0,
    gross: 0,
    commission: 0
  })
  const [tutor, setTutor] = useState(null)

  const periods = [
    { id: "today", name: "Hôm nay" },
    { id: "week", name: "Tuần này" },
    { id: "month", name: "Tháng này" },
    { id: "year", name: "Năm nay" },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0
    const numeric = priceStr.replace(/[^\d]/g, "")
    return parseInt(numeric || "0")
  }

  const filterOrdersByPeriod = (orders, period) => {
    const now = new Date()
    const nowDateStr = now.toISOString().slice(0,10)

    return orders.filter(order => {
      if (!order.date) return false
      let orderDate = new Date()
      if (order.date.includes("/")) {
        const [day, month, year] = order.date.split("/").map(x => parseInt(x))
        orderDate = new Date(year, month - 1, day)
      } else if (order.date.includes("-")) {
        orderDate = new Date(order.date)
      }

      const orderDateStr = `${orderDate.getFullYear()}-${String(orderDate.getMonth()+1).padStart(2,"0")}-${String(orderDate.getDate()).padStart(2,"0")}`

      switch (period) {
        case "today":
          return orderDateStr === nowDateStr
        case "week":
          const startOfWeek = new Date(now)
          startOfWeek.setDate(now.getDate() - now.getDay())
          startOfWeek.setHours(0,0,0,0)
          const endOfWeek = new Date(startOfWeek)
          endOfWeek.setDate(startOfWeek.getDate() + 6)
          endOfWeek.setHours(23,59,59,999)
          return orderDate >= startOfWeek && orderDate <= endOfWeek
        case "month":
          return orderDate.getFullYear() === now.getFullYear() && orderDate.getMonth() === now.getMonth()
        case "year":
          return orderDate.getFullYear() === now.getFullYear()
        default:
          return false
      }
    })
  }

  useEffect(() => {
    const loadTutor = async () => {
      if (!currentUser) return
      const allTutors = await TutorService.getAllTutors()
      const matched = allTutors.find(w => String(w.userId) === String(currentUser.id))
      setTutor(matched)
    }
    loadTutor()
  }, [currentUser])

  useEffect(() => {
    const loadIncomeData = async () => {
      if (!tutor) return
      const allOrders = await OrderService.getOrdersByTutor(tutor.id)
      const filtered = filterOrdersByPeriod(allOrders, selectedPeriod)
      const completedOrders = filtered.filter(o =>
        (o.status || "").toLowerCase() === "completed"
      )

      const gross = completedOrders.reduce((sum, o) => sum + parsePrice(o.price), 0)
      const commission = gross * 0.1
      const tutorReceived = gross - commission
      const ordersCount = completedOrders.length
      const hours = completedOrders.reduce((sum, o) => sum + (o.estimatedHours || 2), 0)

      setIncomeData({
        total: tutorReceived,
        gross,
        commission,
        orders: ordersCount,
        hours
      })
      setOrders(completedOrders)
    }

    loadIncomeData()
  }, [tutor, selectedPeriod])

  const renderOrder = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDate}>{item.date}</Text>
          <Text style={styles.transactionCustomer}>{item.studentName || item.customerName || item.customer || "Học viên"}</Text>
          <Text style={styles.transactionService}>{item.subjectName || item.serviceName || item.service}</Text>
        </View>
        <View style={styles.transactionAmounts}>
          <Text style={styles.transactionGrossAmount}>
            {formatCurrency(parsePrice(item.price))}
          </Text>
          <Text style={styles.transactionCommission}>
            -{formatCurrency(parsePrice(item.price) * 0.1)}
          </Text>
          <Text style={styles.transactionNetAmount}>
            {formatCurrency(parsePrice(item.price) * 0.9)}
          </Text>
        </View>
      </View>
      <View style={styles.transactionFooter}>
        <View
          style={[
            styles.transactionStatus,
            {
              backgroundColor:
                item.status === "completed" ? "#d1fae5" : "#fef3c7",
            },
          ]}
        >
          <Text
            style={[
              styles.transactionStatusText,
              {
                color: item.status === "completed" ? "#065f46" : "#92400e",
              },
            ]}
          >
            {item.status === "completed" ? "Đã thanh toán" : "Chờ thanh toán"}
          </Text>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Báo cáo thu nhập gia sư</Text>
      </View>

      <ScrollView
        style={styles.incomeContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.selectedPeriodButton,
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period.id && styles.selectedPeriodButtonText,
                ]}
              >
                {period.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.incomeSummary}>
          <View style={styles.incomeSummaryCard}>
            <Text style={styles.incomeSummaryTitle}>Tổng thu nhập</Text>
            <Text style={styles.incomeSummaryAmount}>
              {formatCurrency(incomeData.total)}
            </Text>
            <View style={styles.incomeSummaryDetails}>
              <View style={styles.incomeSummaryDetailItem}>
                <Text style={styles.incomeSummaryDetailLabel}>Số lớp</Text>
                <Text style={styles.incomeSummaryDetailValue}>
                  {incomeData.orders}
                </Text>
              </View>
              <View style={styles.incomeSummaryDetailItem}>
                <Text style={styles.incomeSummaryDetailLabel}>Giờ dạy</Text>
                <Text style={styles.incomeSummaryDetailValue}>
                  {incomeData.hours}h
                </Text>
              </View>
              <View style={styles.incomeSummaryDetailItem}>
                <Text style={styles.incomeSummaryDetailLabel}>
                  Trung bình/giờ
                </Text>
                <Text style={styles.incomeSummaryDetailValue}>
                  {incomeData.hours > 0
                    ? formatCurrency(Math.round(incomeData.total / incomeData.hours))
                    : "0đ"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.incomeBreakdown}>
          <Text style={styles.incomeBreakdownTitle}>Chi tiết thu nhập</Text>
          <View style={styles.incomeBreakdownCards}>
            <View style={styles.incomeBreakdownCard}>
              <Text style={styles.incomeBreakdownIcon}>💰</Text>
              <Text style={styles.incomeBreakdownLabel}>Tổng học phí</Text>
              <Text style={styles.incomeBreakdownAmount}>
                {formatCurrency(incomeData.gross)}
              </Text>
            </View>
            <View style={styles.incomeBreakdownCard}>
              <Text style={styles.incomeBreakdownIcon}>📊</Text>
              <Text style={styles.incomeBreakdownLabel}>Hoa hồng (10%)</Text>
              <Text style={styles.incomeBreakdownAmount}>
                -{formatCurrency(incomeData.commission)}
              </Text>
            </View>
            <View style={styles.incomeBreakdownCard}>
              <Text style={styles.incomeBreakdownIcon}>💵</Text>
              <Text style={styles.incomeBreakdownLabel}>Thực nhận</Text>
              <Text style={styles.incomeBreakdownAmount}>
                {formatCurrency(incomeData.total)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recentTransactions}>
          <View className={styles.recentTransactionsHeader}>
            <Text style={styles.recentTransactionsTitle}>
              Lớp gần đây
            </Text>
          </View>
          <FlatList
            data={orders.slice(0, 5)}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.transactionsList}
          />
        </View>

        <View style={styles.withdrawalSection}>
          <View style={styles.withdrawalCard}>
            <Text style={styles.withdrawalTitle}>Rút tiền</Text>
            <Text style={styles.withdrawalBalance}>
              Số dư khả dụng: {formatCurrency(incomeData.total)}
            </Text>
            <TouchableOpacity style={styles.withdrawalButton}>
              <Text style={styles.withdrawalButtonText}>💳 Rút tiền</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  )
}

export default TutorIncomeScreen
