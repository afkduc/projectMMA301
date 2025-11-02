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
import { AdminBottomNav } from "../../components/BottomNavigation";

const ReviewManagementScreen = ({ onTabPress, onBack }) => {
  const [reviewList, setReviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await ReviewService.getAllReviews();
        setReviewList(reviews);
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải danh sách đánh giá.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleVisibility = async (reviewId, currentStatus) => {
    const newStatus =
      currentStatus === "rejected" ? "approved" : "rejected";
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

  const handleWarningTutor = (review) => {
    Alert.alert(
      "Cảnh báo gia sư",
      `Gửi cảnh báo đến ${review.tutor}?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Gửi cảnh báo",
          onPress: () => {
            Alert.alert("Thành công", `Đã gửi cảnh báo đến ${review.tutor}`);
          },
        },
      ]
    );
  };

  const filteredReviews = reviewList.filter((review) => {
    const matchesSearch =
      review.student?.toLowerCase().includes(searchText.toLowerCase()) ||
      review.tutor?.toLowerCase().includes(searchText.toLowerCase()) ||
      review.subject?.toLowerCase().includes(searchText.toLowerCase());
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
        return "Hiển thị";
    }
  };

  const renderReview = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    const toggleText =
      item.status === "rejected" ? "Hiển thị" : "Ẩn";

    return (
      <View style={[styles.reviewCard, { marginBottom: 10 }]}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewInfo}>
            <Text style={styles.reviewCustomer}>👨‍🎓 {item.student}</Text>
            <Text style={styles.reviewWorker}>🧑‍🏫 {item.tutor}</Text>
            <Text style={styles.reviewService}>📘 {item.subject}</Text>
            <Text style={styles.reviewDate}>📅 {item.date}</Text>
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

        <View
          style={[
            styles.reviewActions,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <TouchableOpacity
            style={[styles.rejectButton, { flex: 1, marginRight: 5 }]}
            onPress={() =>
              handleToggleVisibility(item.id, item.status)
            }
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={[styles.searchContainer, { padding: 5 }]}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm theo học viên, gia sư hoặc môn học..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

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

      <AdminBottomNav onTabPress={onTabPress} activeTab="reviewManagement" />
    </SafeAreaView>
  );
};

export default ReviewManagementScreen;
