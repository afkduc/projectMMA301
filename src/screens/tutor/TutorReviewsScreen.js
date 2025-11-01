import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native"
import { styles } from "../../style/additional"
import { TutorBottomNav } from "../../components/BottomNavigation"
import TutorService from "../../service/tutorService"
import ReviewService from "../../service/reviewService"

const TutorReviewsScreen = ({ onTabPress, onBack, currentUser }) => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [ratingDistribution, setRatingDistribution] = useState([])

  const filters = [
    { id: "all", label: "Tất cả" },
    { id: "5star", label: "5 sao" },
    { id: "4star", label: "4 sao" },
    { id: "3star", label: "3 sao" },
    { id: "recent", label: "Gần đây" },
  ]

  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating)
  }

  useEffect(() => {
    const loadReviews = async () => {
      if (!currentUser?.id) return
      try {
        const allTutors = await TutorService.getAllTutors()
        const tutor = allTutors.find(
          w => String(w.userId) === String(currentUser.id)
        )
        if (!tutor) return

        const tutorReviews = await ReviewService.getReviewsByTutor(tutor.id)
        setReviews(tutorReviews)

        const counts = [5,4,3,2,1].map(stars => ({
          stars,
          count: tutorReviews.filter(r => r.rating === stars).length
        }))
        const total = tutorReviews.length
        const dist = counts.map(item => ({
          ...item,
          percentage: total ? Math.round((item.count / total) * 100) : 0
        }))
        setRatingDistribution(dist)

        setFilteredReviews(tutorReviews)
      } catch (err) {
        console.error("❌ Error loading reviews:", err)
      }
    }
    loadReviews()
  }, [currentUser])

  useEffect(() => {
    let filtered = reviews
    if (activeFilter === "5star") filtered = reviews.filter(r => r.rating === 5)
    else if (activeFilter === "4star") filtered = reviews.filter(r => r.rating === 4)
    else if (activeFilter === "3star") filtered = reviews.filter(r => r.rating === 3)
    else if (activeFilter === "recent") filtered = [...reviews].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,10)
    setFilteredReviews(filtered)
  }, [activeFilter, reviews])

  const handleReply = (reviewId) => {
    Alert.alert("Trả lời đánh giá", "Tính năng trả lời đánh giá đang được phát triển")
  }

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

      <ScrollView style={styles.reviewsContent}>
        <View style={styles.overallRatingSection}>
          <Text style={styles.sectionTitle}>Tổng quan đánh giá</Text>
          <View style={styles.overallRatingCard}>
            <View style={styles.overallRatingLeft}>
              <Text style={styles.overallRatingNumber}>
                {(reviews.reduce((s,r)=>s+r.rating,0) / (reviews.length||1)).toFixed(1)}
              </Text>
              <Text style={styles.overallRatingStars}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.overallRatingText}>{reviews.length} đánh giá</Text>
            </View>
            <View style={styles.overallRatingRight}>
              {ratingDistribution.map(item => (
                <View key={item.stars} style={styles.ratingDistributionRow}>
                  <Text style={styles.ratingDistributionStars}>{item.stars}⭐</Text>
                  <View style={styles.ratingDistributionBar}>
                    <View style={[styles.ratingDistributionFill, {width: `${item.percentage}%`}]} />
                  </View>
                  <Text style={styles.ratingDistributionCount}>{item.count}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.reviewFilterTabs}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.reviewFilterTab,
                activeFilter === filter.id && styles.activeReviewFilterTab
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text style={[
                styles.reviewFilterTabText,
                activeFilter === filter.id && styles.activeReviewFilterTabText
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.reviewsList}>
          {filteredReviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewCustomerInfo}>
                  <Text style={styles.reviewCustomerAvatar}>👤</Text>
                  <View style={styles.reviewCustomerDetails}>
                    <Text style={styles.reviewCustomerName}>{review.student || review.customer}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.reviewMenuButton}>
                  <Text style={styles.reviewMenuIcon}>⋮</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.reviewRating}>
                <Text style={styles.reviewStars}>{renderStars(review.rating)}</Text>
                <Text style={styles.reviewService}>• {review.subject || review.service}</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <View style={styles.reviewFooter}>
                <Text style={styles.reviewOrderId}>Mã lớp: #{review.classId || review.orderId || review.id}</Text>
                <TouchableOpacity
                  style={styles.replyButton}
                  onPress={() => handleReply(review.id)}
                >
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
              • Đến đúng giờ và thông báo trước nếu có thay đổi{"\n"}• Chuẩn bị giáo án rõ ràng, giao bài và phản hồi kịp thời{"\n"}• Giải thích dễ hiểu, ví dụ gần gũi, khuyến khích đặt câu hỏi{"\n"}• Trả lời đánh giá lịch sự và xây dựng, đề xuất giải pháp cụ thể
            </Text>
          </View>
        </View>
      </ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  )
}

export default TutorReviewsScreen
