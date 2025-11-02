import FirebaseService from "./firebaseService";
import { hashPassword } from "@utils/hashPassword"; // ✅ Thêm dòng này

class TutorService {
  constructor() {
    this.basePath = "tutors";
  }

  //  Tạo tutor mới — tự động mã hoá mật khẩu trước khi lưu
async createTutor(tutorData) {
  try {
    let finalData = { ...tutorData };
    // Hash mật khẩu trước khi lưu
    if (tutorData.password) {
      const hashedPassword = await hashPassword(tutorData.password);
      finalData.password = hashedPassword;
    }
    // Đồng bộ dữ liệu với RegisterScreen: chuyển serviceId → subjects
    if (Array.isArray(tutorData.serviceId)) {
      finalData.subjects = tutorData.serviceId;
      delete finalData.serviceId; // ⚠️ Xóa trường cũ để tránh trùng
    }

    //  Nếu có specialty thì cũng đồng bộ lại
    if (tutorData.specialty && !finalData.subjects?.length) {
      finalData.subjects = tutorData.specialty.split(",").map((s) => s.trim());
    }

    // Thêm metadata
    finalData = {
      ...finalData,
      role: "tutor",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: finalData.status || "pending",
      rating: finalData.rating || 0,
      completedOrders: finalData.completedOrders || 0,
      price: finalData.price || "Thỏa thuận",
      avatar: finalData.avatar || "👨‍🏫",
      reviews: finalData.reviews || 0,
    };

    //  Lưu lên Firebase
    const tutorId = await FirebaseService.create(this.basePath, finalData);
    console.log("🎉 Gia sư đã được tạo:", tutorId);

    return tutorId;
  } catch (error) {
    console.error("❌ Error creating tutor:", error);
    throw error;
  }
}


  async getTutorById(tutorId) {
    try {
      const tutor = await FirebaseService.read(`${this.basePath}/${tutorId}`);
      return tutor || null;
    } catch (error) {
      console.error("Error getting tutor:", error);
      throw error;
    }
  }

  async getTutorByUserId(userId) {
    try {
      const allTutors = await FirebaseService.readAllWithKeys(this.basePath);
  
      // 🔎 Tìm user tương ứng trong bảng users
      const users = await FirebaseService.readAllWithKeys("users");
      const currentUser = users.find((u) => String(u.id) === String(userId));
  
      if (!currentUser) {
        console.warn("Không tìm thấy user tương ứng với userId:", userId);
        return null;
      }
  
      // Ưu tiên tìm theo userId
      let tutor = allTutors.find((w) => String(w.userId) === String(userId));
  
      // Nếu không có userId, fallback tìm theo số điện thoại hoặc tên
      if (!tutor && currentUser.phone) {
        tutor = allTutors.find((w) => w.phone === currentUser.phone);
      }
      if (!tutor && currentUser.name) {
        tutor = allTutors.find((w) => w.name === currentUser.name);
      }
  
      return tutor || null;
    } catch (error) {
      console.error("Error getting tutor by userId:", error);
      throw error;
    }
  }
  

  async getAllTutors() {
    try {
      const allUsers = await FirebaseService.readAll(this.basePath);
      return allUsers;
    } catch (error) {
      console.error("Error getting all tutors:", error);
      throw error;
    }
  }

  async getTutorsByStatus(status = "active") {
    try {
      const allTutors = await this.getAllTutors();
      return allTutors.filter((w) => w.status === status);
    } catch (error) {
      console.error("Error filtering tutor by status:", error);
      throw error;
    }
  }
//Tìm và sửa hàm lấy danh sách theo  subjects
  async getTutorBySubject(subjectName) {
    try {
      const snapshot = await get(query(ref(database, this.basePath)));
      const data = snapshot.val() || {};
      const tutors = Object.entries(data)
        .map(([id, value]) => ({ id, ...value }))
        .filter(
          (tutor) =>
            Array.isArray(tutor.subjects) &&
            tutor.subjects.some(
              (s) => s.toLowerCase() === subjectName.toLowerCase()
            )
        );
      return tutors;
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách tutor theo môn học:", error);
      return [];
    }
  }
  

  // ✅ Update — tự động hash lại nếu có thay đổi mật khẩu
  async updateTutor(innerId, tutorData) {
    try {
      const allTutors = await FirebaseService.readAllWithKeys(this.basePath);
      const target = allTutors.find((w) => String(w.id) === String(innerId));
      if (!target) throw new Error("Tutor not found by id: " + innerId);

      let updatedData = { ...tutorData, updatedAt: Date.now() };

      if (tutorData.password) {
        const hashed = await hashPassword(tutorData.password);
        updatedData.password = hashed;
      }

      await FirebaseService.update(
        `${this.basePath}/${target.firebaseKey}`,
        updatedData
      );
      return true;
    } catch (error) {
      console.error("❌ Error updating tutor:", error);
      throw error;
    }
  }

  async deleteTutor(tutorId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${tutorId}`);
      return true;
    } catch (error) {
      console.error("Error deleting tutor:", error);
      throw error;
    }
  }

  async filterTutorsBy(subjectName, sortBy = "rating") {
    try {
      let tutors = await this.getTutorBySubject(subjectName);
  
      switch (sortBy) {
        case "rating":
          tutors.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "price":
          tutors.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
          break;
        case "distance":
          tutors.sort(
            (a, b) => extractDistance(a.distance) - extractDistance(b.distance)
          );
          break;
      }
  
      return tutors;
    } catch (error) {
      console.error("Error filtering tutors:", error);
      throw error;
    }
  }
  

  listenToTutors(callback) {
    return FirebaseService.listen(this.basePath, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const tutors = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        callback(tutors);
      } else {
        callback([]);
      }
    });
  }
}

// Helper functions
const extractPrice = (priceString) => {
  if (!priceString) return Infinity;
  const numeric = priceString.replace(/[^\d]/g, "");
  return parseInt(numeric || "0");
};

const extractDistance = (distanceString) => {
  if (!distanceString) return Infinity;
  const match = distanceString.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : Infinity;
};

export default new TutorService();
