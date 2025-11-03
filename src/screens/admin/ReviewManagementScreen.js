import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { styles } from "../../style/styles";
import ReviewService from "../../service/reviewService";
import UserService from "../../service/UserService";
import tutorService from "../../service/tutorService";
import { AdminBottomNav } from "../../components/BottomNavigation";

const ReviewManagementScreen = ({ onTabPress, onBack }) => {
  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // 🧩 Lấy dữ liệu kết hợp review + user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviews, users, tutors] = await Promise.all([
          ReviewService.getAllReviews(),
          UserService.getAllUsers(),
          tutorService.getAllTutors(),
        ]);

        const userMap = {};
        users.forEach((u) => (userMap[u.id] = u));

        const tutorMap = {};
        tutors.forEach((t) => (tutorMap[t.id] = t));

        const merged = reviews.map((r) => ({
          ...r,
          student: userMap[r.customerId]?.name || "Không rõ học viên",
          tutor: tutorMap[r.tutorId]?.name || "Không rõ gia sư",
          tutorAvatar: tutorMap[r.tutorId]?.avatar || "👨‍🏫",
          tutorPhone: tutorMap[r.tutorId]?.phone || "—",
          tutorEmail: tutorMap[r.tutorId]?.email || "—",
        }));

        setReviewList(merged);
      } catch (error) {
        console.error("Lỗi tải review:", error);
        Alert.alert("Lỗi", "Không thể tải danh sách đánh giá.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Ẩn/hiển thị review
  const handleToggleVisibility = async (reviewId, currentStatus) => {
    const newStatus = currentStatus === "rejected" ? "approved" : "rejected";
    const confirmText =
      currentStatus === "rejected"
        ? "Hiển thị lại đánh giá này?"
        : "Ẩn đánh giá này?";
    Alert.alert("Xác nhận", confirmText, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đồng ý",
        onPress: async () => {
          await ReviewService.updateReviewStatus(reviewId, newStatus);
          setReviewList((prev) =>
            prev.map((r) =>
              r.id === reviewId ? { ...r, status: newStatus } : r
            )
          );
        },
      },
    ]);
  };

  // Gửi cảnh báo cho gia sư (đổi trạng thái -> reported)
  const handleWarningTutor = async (review) => {
    Alert.alert("Cảnh báo gia sư", `Gửi cảnh báo đến ${review.tutor}?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Gửi cảnh báo",
        onPress: async () => {
          try {
            await ReviewService.updateReviewStatus(review.id, "reported");
            setReviewList((prev) =>
              prev.map((r) =>
                r.id === review.id ? { ...r, status: "reported" } : r
              )
            );
            Alert.alert("Thành công", `Đã gửi cảnh báo đến ${review.tutor}`);
          } catch (error) {
            console.error("Lỗi khi gửi cảnh báo:", error);
            Alert.alert("Lỗi", "Không thể gửi cảnh báo đến gia sư");
          }
        },
      },
    ]);
  };

  // Lọc danh sách theo tìm kiếm + trạng thái
  const filteredReviews = reviewList.filter((review) => {
    const matchesSearch =
      review.student?.toLowerCase().includes(searchText.toLowerCase()) ||
      review.tutor?.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || review.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getRatingStars = (rating) =>
    "⭐".repeat(rating) + "☆".repeat(5 - rating);

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
      case "pending":
        return { backgroundColor: "#d1fae5", color: "#065f46" };
      case "reported":
        return { backgroundColor: "#fef3c7", color: "#92400e" };
      case "rejected":
        return { backgroundColor: "#f3f4f6", color: "#6b7280" };
      default:
        return { backgroundColor: "#d1fae5", color: "#065f46" };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
      case "pending":
        return "Hiển thị";
      case "reported":
        return "Cảnh báo";
      case "rejected":
        return "Ẩn";
      default:
        return "Tất cả";
    }
  };

  const renderReview = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    const toggleText = item.status === "rejected" ? "Hiển thị" : "Ẩn";

    return (
      <View style={[styles.reviewCard, { marginBottom: 10 }]}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewInfo}>
            <Text style={styles.reviewCustomer}>👨‍🎓 {item.student}</Text>
            <Text style={styles.reviewWorker}>🧑‍🏫 {item.tutor}</Text>
            <Text style={styles.reviewDate}>
              📅 {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusStyle.backgroundColor },
            ]}
          >
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        <View style={styles.reviewRating}>
          <Text style={styles.ratingStars}>{getRatingStars(item.rating)}</Text>
          <Text style={styles.ratingNumber}>({item.rating}/5)</Text>
        </View>

        <Text style={styles.reviewComment}>"{item.comment}"</Text>

        {/* Ẩn nút nếu đã cảnh báo */}
        {item.status !== "reported" ? (
          <View
            style={[
              styles.reviewActions,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <TouchableOpacity
              style={[styles.rejectButton, { flex: 1, marginRight: 5 }]}
              onPress={() => handleToggleVisibility(item.id, item.status)}
            >
              <Text style={styles.rejectButtonText}>{toggleText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.warningButton, { flex: 1, marginLeft: 5 }]}
              onPress={() => handleWarningTutor(item)}
            >
              <Text style={styles.warningButtonText}>Cảnh báo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text
            style={{
              color: "#92400e",
              fontStyle: "italic",
              marginTop: 8,
              textAlign: "center",
            }}
          >
            ⚠️ Đánh giá này đã bị cảnh báo
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={[styles.backButton, { fontSize: 25 }]}>←</Text>
        </TouchableOpacity>
        <Text
          pointerEvents="none"
          style={[
            styles.screenTitle,
            {
              position: "absolute",
              left: 0,
              right: 0,
              textAlign: "center",
            },
          ]}
        >
          Quản lý đánh giá
        </Text>
      </View>

      {/* Ô tìm kiếm */}
      <View style={[styles.searchContainer, { padding: 5 }]}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo học viên hoặc gia sư..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Bộ lọc */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {["all", "approved", "reported", "rejected"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterChip,
                filterStatus === status && styles.activeFilterChip,
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={[
                  styles.filterText,
                  filterStatus === status && styles.activeFilterText,
                ]}
              >
                {getStatusText(status)} (
                {
                  reviewList.filter(
                    (r) => status === "all" || r.status === status
                  ).length
                }
                )
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Danh sách */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredReviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 115, paddingHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Bottom navigation */}
      <AdminBottomNav onTabPress={onTabPress} activeTab="reviewManagement" />
    </SafeAreaView>
  );
};

export default ReviewManagementScreen;
