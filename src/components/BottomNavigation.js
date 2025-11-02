import { View, TouchableOpacity, Text } from "react-native"
import { styles } from "../style/styles"

export const CustomerBottomNav = ({ onTabPress, activeTab }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("home")}>
      <Text style={styles.navIcon}>🏠</Text>
      <Text style={[styles.navText, activeTab === "home" && styles.activeNavText]}>Trang chủ</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("history")}>
      <Text style={styles.navIcon}>📋</Text>
      <Text style={[styles.navText, activeTab === "history" && styles.activeNavText]}>Lịch sử</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("profile")}>
      <Text style={styles.navIcon}>👤</Text>
      <Text style={[styles.navText, activeTab === "profile" && styles.activeNavText]}>Cá nhân</Text>
    </TouchableOpacity>
  </View>
)

export const WorkerBottomNav = ({ onTabPress, activeTab }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("dashboard")}>
      <Text style={styles.navIcon}>🏠</Text>
      <Text style={[styles.navText, activeTab === "dashboard" && styles.activeNavText]}>Trang chủ</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("orders")}>
      <Text style={styles.navIcon}>📋</Text>
      <Text style={[styles.navText, activeTab === "orders" && styles.activeNavText]}>Đơn hàng</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("workerProfile")}>
      <Text style={styles.navIcon}>👤</Text>
      <Text style={[styles.navText, activeTab === "workerProfile" && styles.activeNavText]}>Cá nhân</Text>
    </TouchableOpacity>
  </View>
)

// Thêm AdminBottomNav component
export const AdminBottomNav = ({ onTabPress, activeTab }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("adminDashboard")}>
      <Text style={styles.navIcon}>🏠</Text>
      <Text style={[styles.navText, activeTab === "adminDashboard" && styles.activeNavText]}>Trang chủ</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("userManagement")}>
      <Text style={styles.navIcon}>👥</Text>
      <Text style={[styles.navText, activeTab === "userManagement" && styles.activeNavText]}>Người dùng</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("aichat")}>
      <Text style={styles.navIcon}>🤖</Text>
      <Text style={[styles.navText, activeTab === "aichat" && styles.activeNavText]}>AI Chat</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => onTabPress("adminProfile")}>
      <Text style={styles.navIcon}>👤</Text>
      <Text style={[styles.navText, activeTab === "adminProfile" && styles.activeNavText]}>Cá nhân</Text>
    </TouchableOpacity>
  </View>
)
