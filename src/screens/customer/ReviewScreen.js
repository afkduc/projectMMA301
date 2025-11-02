import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';
import reviewService from '../../service/reviewService';
import tutorService from '../../service/tutorService';

const ReviewScreen = ({ order, onBack }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng chọn số sao và nhập nhận xét của bạn.');
      return;
    }

    const reviewData = {
      orderId: order.id,
      tutorId: order.tutorId,
      customerId: order.customerId,
      rating,
      comment,
      createdAt: Date.now(),
    };

    try {
      // ✅ Tạo đánh giá mới
      await reviewService.createReview(reviewData);

      // ✅ Lấy tất cả review của gia sư đó
      const allReviews = await reviewService.getReviewsByTutor(order.tutorId);
      const ratings = allReviews.map((r) => r.rating);
      const averageRating =
        ratings.reduce((sum, r) => sum + r, 0) / ratings.length;

      // ✅ Cập nhật lại thông tin gia sư (điểm trung bình + số lượt đánh giá)
      await tutorService.updateTutor(order.tutorId, {
        rating: parseFloat(averageRating.toFixed(1)),
        reviews: ratings.length,
        updatedAt: Date.now(),
      });

      Alert.alert('Cảm ơn bạn!', 'Đánh giá của bạn đã được gửi thành công.');
      onBack && onBack();
    } catch (err) {
      console.error('Lỗi khi gửi đánh giá:', err);
      Alert.alert('Lỗi', 'Không thể gửi đánh giá. Vui lòng thử lại sau.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: '700',
          marginBottom: 20,
          textAlign: 'center',
          color: '#1e293b',
        }}
      >
        Đánh giá Gia sư
      </Text>

      <Rating
        startingValue={5}
        imageSize={36}
        onFinishRating={(value) => setRating(value)}
        style={{ alignSelf: 'center', marginBottom: 20 }}
      />

      <TextInput
        placeholder="Chia sẻ cảm nhận về buổi học..."
        value={comment}
        onChangeText={setComment}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#cbd5e1',
          borderRadius: 10,
          padding: 12,
          fontSize: 16,
          height: 120,
          textAlignVertical: 'top',
          marginBottom: 20,
          backgroundColor: '#f8fafc',
        }}
        placeholderTextColor="#94a3b8"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#2563eb',
          paddingVertical: 14,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 17,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          Gửi đánh giá
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={{ marginTop: 16 }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#2563eb',
            fontSize: 15,
            fontWeight: '500',
          }}
        >
          ← Quay lại
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewScreen;
