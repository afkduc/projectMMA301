import FirebaseService from "./firebaseService"

class ReviewService {
  constructor() {
    this.basePath = "reviews"
  }

  // Tạo đánh giá mới
  async createReview(reviewData) {
    try {
      const reviewId = await FirebaseService.create(this.basePath, reviewData)
      return reviewId
    } catch (error) {
      console.error("❌ Error creating review:", error)
      throw error
    }
  }

  // Lấy đánh giá theo ID
  async getReviewById(reviewId) {
    try {
      return await FirebaseService.read(`${this.basePath}/${reviewId}`)
    } catch (error) {
      console.error("❌ Error getting review:", error)
      throw error
    }
  }

  // Lấy tất cả đánh giá
  async getAllReviews() {
    try {
      return await FirebaseService.readAll(this.basePath)
    } catch (error) {
      console.error("❌ Error getting all reviews:", error)
      throw error
    }
  }

  // Lấy đánh giá theo workerId
  async getReviewsByWorker(workerId) {
    try {
      return await FirebaseService.queryByField(this.basePath, "workerId", workerId)
    } catch (error) {
      console.error("❌ Error getting reviews by worker:", error)
      throw error
    }
  }

  // Lấy đánh giá theo customerId
  async getReviewsByCustomer(customerId) {
    try {
      return await FirebaseService.queryByField(this.basePath, "customerId", customerId)
    } catch (error) {
      console.error("❌ Error getting reviews by customer:", error)
      throw error
    }
  }

  // Lấy đánh giá theo trạng thái
  async getReviewsByStatus(status) {
    try {
      return await FirebaseService.queryByField(this.basePath, "status", status)
    } catch (error) {
      console.error("❌ Error getting reviews by status:", error)
      throw error
    }
  }

  // Cập nhật đánh giá
  async updateReview(reviewId, reviewData) {
    try {
      await FirebaseService.update(`${this.basePath}/${reviewId}`, reviewData)
      return true
    } catch (error) {
      console.error("❌ Error updating review:", error)
      throw error
    }
  }

  // Cập nhật trạng thái đánh giá
  async updateReviewStatus(reviewId, status) {
    try {
      await FirebaseService.update(`${this.basePath}/${reviewId}`, { status })
      return true
    } catch (error) {
      console.error("❌ Error updating review status:", error)
      throw error
    }
  }

  // Xóa đánh giá
  async deleteReview(reviewId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${reviewId}`)
      return true
    } catch (error) {
      console.error("❌ Error deleting review:", error)
      throw error
    }
  }

  // Listener realtime - sửa lại snapshot để tránh lỗi .exists is not a function
  listenToReviews(callback) {
    return FirebaseService.listen(this.basePath, (dataArray) => {
      const safeArray = Array.isArray(dataArray) ? dataArray : [];
      callback(safeArray);
    });
  }
}

export default new ReviewService()
