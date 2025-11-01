import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { styles } from "../../style/styles";
import { adminMenuItems } from "../../data/mockData";
import { AdminBottomNav } from "../../components/BottomNavigation";
import FirebaseService from "../../service/firebaseService";

const AdminDashboardScreen = ({ onTabPress, onMenuPress, currentUser }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTutors: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, tutors, orders] = await Promise.all([
          FirebaseService.readAll("users"),
          FirebaseService.readAll("tutors"),
          FirebaseService.readAll("orders"),
        ])

        const currentMonth = new Date().getMonth()

        // Tách đơn đã hoàn thành và đơn đang chờ
        const completedOrders = orders.filter(o => o.status === "completed")
        const pendingOrders = orders.filter(o => o.status === "pending")

        setStats({
          totalUsers: users.length,
          totalTutors: tutors.length,
          totalOrders: orders.length,
          completedOrders: completedOrders.length,
          pendingOrders: pendingOrders.length,
        })
      } catch (error) {
        console.error("Error fetching admin stats:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.adminHeader}>
        <View>
          <Text style={styles.adminTitle}>Admin Dashboard</Text>
          <Text style={styles.adminSubtitle}>Xin chào, {currentUser?.name || "Admin"}</Text>
        </View>
        {/* <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>5</Text>
          </View>
        </TouchableOpacity> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.adminStatsGrid}>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>👥</Text>
            <Text style={styles.adminStatNumber}>{stats.totalUsers}</Text>
            <Text style={styles.adminStatLabel}>Tổng người dùng</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>🧑‍🏫</Text>
            <Text style={styles.adminStatNumber}>{stats.totalTutors}</Text>
            <Text style={styles.adminStatLabel}>Gia sư</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>📋</Text>
            <Text style={styles.adminStatNumber}>{stats.totalOrders}</Text>
            <Text style={styles.adminStatLabel}>Tổng đơn hàng</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thống kê nhanh</Text>
          <View style={styles.quickStatsContainer}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{stats.completedOrders}</Text>
              <Text style={styles.quickStatLabel}>Đơn hoàn thành</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{stats.pendingOrders}</Text>
              <Text style={styles.quickStatLabel}>Đơn chờ xử lý</Text>
            </View>
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quản lý hệ thống</Text>
          <View style={styles.adminMenuGrid}>
            {adminMenuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.adminMenuCard}
                onPress={() => onMenuPress && onMenuPress(item.screen)}
              >
                <Text style={styles.adminMenuIcon}>{item.icon}</Text>
                <Text style={styles.adminMenuTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <AdminBottomNav onTabPress={onTabPress} activeTab="adminDashboard" />
    </SafeAreaView>
  )
}

export default AdminDashboardScreen
