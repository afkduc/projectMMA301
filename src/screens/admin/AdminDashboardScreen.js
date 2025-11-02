import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { styles } from "../../style/styles";
import { adminMenuItems } from "../../data/mockData";
import { AdminBottomNav } from "../../components/BottomNavigation";
import FirebaseService from "../../service/firebaseService";
import TutorSessionsService from "../../service/TutorSessionsService";

const AdminDashboardScreen = ({ onTabPress, onMenuPress, currentUser }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTutors: 0,
    totalSessions: 0,
    completedSessions: 0,
    unprocessedSessions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, tutors, sessions] = await Promise.all([
          FirebaseService.readAll("users"),
          FirebaseService.readAll("tutors"),
          TutorSessionsService.getAllSessions(),
        ]);

        const completedSessions = sessions.filter((s) => s.status === "completed");
        const unprocessedSessions = sessions.filter((s) => s.status !== "completed");

        setStats({
          totalUsers: users.length,
          totalTutors: tutors.length,
          totalSessions: sessions.length,
          completedSessions: completedSessions.length,
          unprocessedSessions: unprocessedSessions.length,
        });
      } catch (error) {
        console.error("❌ Lỗi khi tải thống kê admin:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.adminHeader}>
        <View>
          <Text style={styles.adminTitle}>Admin Dashboard</Text>
          <Text style={styles.adminSubtitle}>
            Xin chào, {currentUser?.name || "Admin"}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Tổng quan */}
        <View style={styles.adminStatsGrid}>
          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>👥</Text>
            <Text style={styles.adminStatNumber}>{stats.totalUsers}</Text>
            <Text style={styles.adminStatLabel}>Tổng người dùng</Text>
          </View>

          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>🧑‍🏫</Text>
            <Text style={styles.adminStatNumber}>{stats.totalTutors}</Text>
            <Text style={styles.adminStatLabel}>Tổng gia sư</Text>
          </View>

          <View style={styles.adminStatCard}>
            <Text style={styles.adminStatIcon}>📚</Text>
            <Text style={styles.adminStatNumber}>{stats.totalSessions}</Text>
            <Text style={styles.adminStatLabel}>Tổng buổi học</Text>
          </View>
        </View>

        {/* Thống kê nhanh */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thống kê nhanh</Text>
          <View style={styles.quickStatsContainer}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{stats.completedSessions}</Text>
              <Text style={styles.quickStatLabel}>Buổi đã hoàn thành</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{stats.unprocessedSessions}</Text>
              <Text style={styles.quickStatLabel}>Buổi chưa xử lý</Text>
            </View>
          </View>
        </View>

        {/* Menu quản lý */}
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

      {/* Navigation dưới cùng */}
      <AdminBottomNav onTabPress={onTabPress} activeTab="adminDashboard" />
    </SafeAreaView>
  );
};

export default AdminDashboardScreen;
