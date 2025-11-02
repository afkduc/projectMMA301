import FirebaseService from "@service/firebaseService";

class TutorSessionsService {
  constructor() {
    this.basePath = "tutorSessions"; // node trong Firebase
  }

  // ✅ Tạo buổi học mới
  async createSession(sessionData) {
    try {
      const finalData = {
        ...sessionData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const sessionId = await FirebaseService.create(this.basePath, finalData);
      return sessionId;
    } catch (error) {
      console.error("Error creating tutor session:", error);
      throw error;
    }
  }

  // ✅ Lấy tất cả buổi học
  async getAllSessions() {
    try {
      const sessions = await FirebaseService.readAll(this.basePath);
      return sessions || [];
    } catch (error) {
      console.error("Error getting all tutor sessions:", error);
      throw error;
    }
  }

  // ✅ Lấy buổi học theo ID
  async getSessionById(sessionId) {
    try {
      const session = await FirebaseService.read(`${this.basePath}/${sessionId}`);
      return session || null;
    } catch (error) {
      console.error("Error getting tutor session by ID:", error);
      throw error;
    }
  }

  // ✅ Lấy buổi học theo trạng thái (pending / accepted / completed ...)
  async getSessionsByStatus(status) {
    try {
      const sessions = await this.getAllSessions();
      return sessions.filter((s) => s.status === status);
    } catch (error) {
      console.error("Error filtering tutor sessions by status:", error);
      throw error;
    }
  }

  // ✅ Lấy buổi học theo gia sư
  async getSessionsByTutor(tutorName) {
    try {
      const sessions = await this.getAllSessions();
      return sessions.filter((s) => s.tutor === tutorName);
    } catch (error) {
      console.error("Error getting sessions by tutor:", error);
      throw error;
    }
  }

  // ✅ Lấy buổi học theo học viên
  async getSessionsByStudent(studentName) {
    try {
      const sessions = await this.getAllSessions();
      return sessions.filter((s) => s.student === studentName);
    } catch (error) {
      console.error("Error getting sessions by student:", error);
      throw error;
    }
  }

  // ✅ Cập nhật thông tin buổi học
  async updateSession(sessionId, sessionData) {
    try {
      await FirebaseService.update(`${this.basePath}/${sessionId}`, {
        ...sessionData,
        updatedAt: Date.now(),
      });
      return true;
    } catch (error) {
      console.error("Error updating tutor session:", error);
      throw error;
    }
  }

  // ✅ Cập nhật trạng thái buổi học (pending → accepted → completed, ...)
  async updateSessionStatus(sessionId, status) {
    try {
      await this.updateSession(sessionId, { status });
      return true;
    } catch (error) {
      console.error("Error updating tutor session status:", error);
      throw error;
    }
  }

  // ✅ Xóa buổi học
  async deleteSession(sessionId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${sessionId}`);
      return true;
    } catch (error) {
      console.error("Error deleting tutor session:", error);
      throw error;
    }
  }

  // ✅ Lắng nghe realtime thay đổi
  listenToSessions(callback) {
    return FirebaseService.listen(this.basePath, (snapshotData) => {
      callback(Array.isArray(snapshotData) ? snapshotData : []);
    });
  }
}

export default new TutorSessionsService();
