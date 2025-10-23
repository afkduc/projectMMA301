import FirebaseService from './firebaseService';

class OtpService {
  constructor() {
    this.basePath = 'otps';
  }

  // Gửi và lưu OTP mới
  async sendOtp(otpCode, userId) {
    try {
      const data = {
        otp: otpCode, 
        userId,
        verified: false, // OTP chưa được xác nhận
        createdAt: Date.now(), // Thời điểm tạo OTP
      };
      const otpId = await FirebaseService.create(this.basePath, data);
      return otpId;
    } catch (error) {
      console.error('❌ Error sending OTP:', error);
      return null;
    }
  }

  // Lấy OTP mới nhất theo userId
  async getLatestOtpByUserId(userId) {
    try {
      const otps = await FirebaseService.queryByField(
        this.basePath,
        'userId',
        userId
      );
      // Sắp xếp theo createdAt giảm dần để lấy OTP mới nhất
      const sortedOtps = otps.sort((a, b) => b.createdAt - a.createdAt);
      return sortedOtps[0] || null;
    } catch (error) {
      console.error('❌ Error getting latest OTP by userId:', error);
      return null;
    }
  }

  // Xác thực OTP
  async verifyOtp(userId, inputOtp, expireMs = 5 * 60 * 1000) {
    const otpData = await this.getLatestOtpByUserId(userId);
    if (!otpData) {
      return { success: false, message: 'Không tìm thấy mã OTP' };
    }

    const now = Date.now();

    if (otpData.verified) {
      return { success: false, message: 'Mã OTP đã được sử dụng' };
    }

    if (otpData.otp !== inputOtp) {
      return { success: false, message: 'Mã OTP không đúng' };
    }

    if (now - otpData.createdAt > expireMs) {
      return { success: false, message: 'Mã OTP đã hết hạn' };
    }

    // Cập nhật trạng thái verified = true
    await FirebaseService.update(`${this.basePath}/${otpData.id}`, {
      verified: true,
    });

    return { success: true, message: 'Xác thực thành công' };
  }

  // Xoá toàn bộ OTP của 1 user (nếu cần)
  async deleteOtpsByUserId(userId) {
    const otps = await FirebaseService.queryByField(
      this.basePath,
      'userId',
      userId
    );
    for (const otp of otps) {
      await FirebaseService.delete(`${this.basePath}/${otp.id}`);
    }
  }
}

export default new OtpService();
