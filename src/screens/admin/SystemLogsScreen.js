import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import { styles } from "../../style/styles";
import { systemLogs } from "../../data/mockData";
import { AdminBottomNav } from "../../components/BottomNavigation";

const SystemLogsScreen = ({ onTabPress, onBack }) => {
  const [logList] = useState(systemLogs);
  const [searchText, setSearchText] = useState("");
  const [filterAction, setFilterAction] = useState("all");

  const filteredLogs = logList.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchText.toLowerCase()) ||
      log.user.toLowerCase().includes(searchText.toLowerCase()) ||
      log.details.toLowerCase().includes(searchText.toLowerCase());
    const matchesAction =
      filterAction === "all" ||
      log.action.toLowerCase().includes(filterAction.toLowerCase());
    return matchesSearch && matchesAction;
  });

  const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
      case "đăng nhập":
        return "🔑";
      case "xóa người dùng":
        return "🗑️";
      case "cập nhật dịch vụ":
        return "✏️";
      case "tạo đơn hàng":
        return "📋";
      case "thanh toán":
        return "💰";
      default:
        return "📝";
    }
  };

  const getActionColor = (action) => {
    switch (action.toLowerCase()) {
      case "đăng nhập":
        return "#10b981";
      case "xóa người dùng":
        return "#ef4444";
      case "cập nhật dịch vụ":
        return "#3b82f6";
      case "tạo đơn hàng":
        return "#f59e0b";
      case "thanh toán":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  const renderLog = ({ item }) => (
    <View style={styles.logCard}>
      <View style={styles.logHeader}>
        <View style={styles.logInfo}>
          <View style={styles.logActionContainer}>
            <Text style={styles.logActionIcon}>
              {getActionIcon(item.action)}
            </Text>
            <Text
              style={[styles.logAction, { color: getActionColor(item.action) }]}
            >
              {item.action}
            </Text>
          </View>
          <Text style={styles.logUser}>👤 {item.user}</Text>
          <Text style={styles.logTimestamp}>🕐 {item.timestamp}</Text>
          <Text style={styles.logIP}>🌐 {item.ip}</Text>
        </View>
      </View>

      <Text style={styles.logDetails}>{item.details}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Nhật ký hệ thống</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>📊</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.logStatsContainer}>
        <View style={styles.logStatCard}>
          <Text style={styles.logStatIcon}>📝</Text>
          <Text style={styles.logStatNumber}>{logList.length}</Text>
          <Text style={styles.logStatLabel}>Tổng log</Text>
        </View>
        <View style={styles.logStatCard}>
          <Text style={styles.logStatIcon}>🔑</Text>
          <Text style={styles.logStatNumber}>
            {logList.filter((l) => l.action === "Đăng nhập").length}
          </Text>
          <Text style={styles.logStatLabel}>Đăng nhập</Text>
        </View>
        <View style={styles.logStatCard}>
          <Text style={styles.logStatIcon}>⚠️</Text>
          <Text style={styles.logStatNumber}>
            {logList.filter((l) => l.action.includes("Xóa")).length}
          </Text>
          <Text style={styles.logStatLabel}>Thao tác nguy hiểm</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm trong nhật ký..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterChip,
            filterAction === "all" && styles.activeFilterChip,
          ]}
          onPress={() => setFilterAction("all")}
        >
          <Text
            style={[
              styles.filterText,
              filterAction === "all" && styles.activeFilterText,
            ]}
          >
            Tất cả ({logList.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            filterAction === "đăng nhập" && styles.activeFilterChip,
          ]}
          onPress={() => setFilterAction("đăng nhập")}
        >
          <Text
            style={[
              styles.filterText,
              filterAction === "đăng nhập" && styles.activeFilterText,
            ]}
          >
            Đăng nhập ({logList.filter((l) => l.action === "Đăng nhập").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            filterAction === "xóa" && styles.activeFilterChip,
          ]}
          onPress={() => setFilterAction("xóa")}
        >
          <Text
            style={[
              styles.filterText,
              filterAction === "xóa" && styles.activeFilterText,
            ]}
          >
            Xóa ({logList.filter((l) => l.action.includes("Xóa")).length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredLogs}
        renderItem={renderLog}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <AdminBottomNav onTabPress={onTabPress} activeTab="systemLogs" />
    </SafeAreaView>
  );
};

export default SystemLogsScreen;
