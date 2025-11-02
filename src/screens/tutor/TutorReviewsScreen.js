import { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../style/additional";
import { TutorBottomNav } from "../../components/BottomNavigation";
import TutorService from "../../service/tutorService";
import ReviewService from "../../service/reviewService";

const TutorReviewsScreen = ({ onTabPress, onBack, currentUser }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const filters = [
    { id: "all", label: "Tất cả" },
    { id: "5star", label: "5 sao" },
    { id: "4star", label: "4 sao" },
    { id: "3star", label: "3 sao" },
    { id: "recent", label: "Gần đây" },
  ];

  const renderStars = (rating) => {
    const r = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return "⭐".repeat(r) + "☆".repeat(5 - r);
  };

  const parseDate = (item) => {
    const d = item?.date
      ? new Date(item.date)
      : item?.createdAt
      ? new Date(item.createdAt)
      : null;
    return d && !isNaN(d) ? d : new Date(0);
  };

  const loadReviews = useCallback(async () => {
    if (!currentUser?.id) return;
    setError(null);
    try {
      setLoading(true);
      const allTutors = await TutorService.getAllTutors();
      const tutor = Array.isArray(allTutors)
        ? allTutors.find((w) => String(w.userId) === String(currentUser.id))
        : null;

      if (!tutor?.id) {
        setReviews([]);
        setLoading(false);
        return;
      }

      const tutorReviews = await ReviewService.getReviewsByTutor(tutor.id);
      setReviews(Array.isArray(tutorReviews) ? tutorReviews : []);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error loading reviews:", err);
      setError("Không tải được đánh giá. Vui lòng thử lại.");
      setReviews([]);
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      await loadReviews();
    })();
    return () => {
      mounted = false;
    };
  }, [loadReviews]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadReviews();
    setRefreshing(false);
  }, [loadReviews]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((s, r) => s + (Number(r?.rating) || 0), 0);
    return sum / reviews.length;
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: reviews.filter((r) => Number(r?.rating) === stars).length,
    }));
    const total = reviews.length || 0;
    return counts.map((item) => ({
      ...item,
      percentage: total ? Math.round((item.count / total) * 100) : 0,
    }));
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (!Array.isArray(reviews)) return [];
    switch (activeFilter) {
      case "5star":
        return reviews.filter((r) => Number(r?.rating) === 5);
      case "4star":
        return reviews.filter((r) => Number(r?.rating) === 4);
      case "3star":
        return reviews.filter((r) => Number(r?.rating) === 3);
      case "recent":
        return [...reviews].sort((a, b) => parseDate(b) - parseDate(a)).slice(0, 10);
      case "all":
      default:
        return reviews;
    }
  }, [activeFilter, reviews]);

  const handleReply = (reviewId) => {
    Alert.alert("Trả lời đánh giá", "Tính năng trả lời đánh giá đang được phát triển");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Đánh giá từ học viên</Text>
        <View style={styles.headerRight}>
          <Text style={styles.reviewCount}>{reviews.length} đánh giá</Text>
        </View>
      </View>

      {loading ? (
        <View style={[styles.content, { alignItems: "center" }]}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 12 }}>Đang tải đánh giá…</Text>
        </View>
      ) : error ? (
        <ScrollView
          style={styles.reviewsContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={[styles.content, { alignItems: "center" }]}>
            <Text style={{ marginBottom: 12 }}>{error}</Text>
            <TouchableOpacity style={styles.replyButton} onPress={onRefresh}>
              <Text style={styles.replyButtonText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.reviewsContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.overallRatingSection}>
            <Text style={styles.sectionTitle}>Tổng quan đánh giá</Text>
            <View style={styles.overallRatingCard}>
              <View style={styles.overallRatingLeft}>
                <Text style={styles.overallRatingNumber}>{averageRating.toFixed(1)}</Text>
                <Text style={styles.overallRatingStars}>
                  {renderStars(Math.round(averageRating))}
                </Text>
                <Text style={styles.overallRatingText}>{reviews.length} đánh giá</Text>
              </View>
              <View style={styles.overallRatingRight}>
                {ratingDistribution.map((item) => (
                  <View key={item.stars} style={styles.ratingDistributionRow}>
                    <Text style={styles.ratingDistributionStars}>{item.stars}⭐</Text>
                    <View style={styles.ratingDistributionBar}>
                      <View
                        style={[
                          styles.ratingDistributionFill,
                          { width: `${item.percentage}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.ratingDistributionCount}>{item.count}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.reviewFilterTabs}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.reviewFilterTab,
                  activeFilter === filter.id && styles.activeReviewFilterTab,
                ]}
                onPress={() => setActiveFilter(filter.id)}
              >
                <Text
                  style={[
                    styles.reviewFilterTabText,
                    activeFilter === filter.id && styles.activeReviewFilterTabText,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.reviewsList}>
            {filteredReviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewCustomerInfo}>
                    <Text style={styles.reviewCustomerAvatar}>👤</Text>
                    <View style={styles.reviewCustomerDetails}>
                      <Text style={styles.reviewCustomerName}>
                        {review.student || review.customer || "Học viên"}
                      </Text>
                      <Text style={styles.reviewDate}>
                        {parseDate(review).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.reviewMenuButton}>
                    <Text style={styles.reviewMenuIcon}>⋮</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.reviewRating}>
                  <Text style={styles.reviewStars}>{renderStars(review.rating)}</Text>
                  <Text style={styles.reviewService}>• {review.subject || review.service || "Lớp học"}</Text>
                </View>

                <Text style={styles.reviewComment}>
                  {review.comment || "Không có nội dung."}
                </Text>

                <View style={styles.reviewFooter}>
                  <Text style={styles.reviewOrderId}>
                    Mã lớp: #{review.classId || review.orderId || review.id}
                  </Text>
                  <TouchableOpacity style={styles.replyButton} onPress={() => handleReply(review.id)}>
                    <Text style={styles.replyButtonText}>Trả lời</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.reviewTipsSection}>
            <View style={styles.reviewTips}>
              <Text style={styles.reviewTipsTitle}>💡 Mẹo cải thiện đánh giá</Text>
              <Text style={styles.reviewTipsText}>
                • Đến đúng giờ và thông báo trước nếu có thay đổi{"\n"}• Chuẩn bị giáo án rõ ràng, giao bài và phản hồi
                kịp thời{"\n"}• Giải thích dễ hiểu, ví dụ gần gũi, khuyến khích đặt câu hỏi{"\n"}• Trả lời đánh giá lịch sự,
                xây dựng, đề xuất giải pháp cụ thể
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  );
};

export default TutorReviewsScreen;
