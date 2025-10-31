import FirebaseService from "@service/firebaseService";
import { hashPassword } from "@utils/hashPassword"; 

class UserService {
  constructor() {
    this.basePath = "users";
  }

  async getUserByPhone(phone) {
    try {
      const users = await FirebaseService.queryByField(this.basePath, "phone", phone);
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error("Error getting user by phone:", error);
      return null;
    }
  }

  // ✅ Tạo user mới (có mã hoá mật khẩu)
  async createUser(userData) {
    try {
      const hashedPassword = await hashPassword(userData.password);
      const finalData = {
        ...userData,
        password: hashedPassword,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const userId = await FirebaseService.create(this.basePath, finalData);
      return userId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await FirebaseService.read(`${this.basePath}/${userId}`);
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await FirebaseService.readAll(this.basePath);
      return users;
    } catch (error) {
      console.error("Error getting all users:", error);
      throw error;
    }
  }

  async getUsersByRole(role) {
    try {
      const users = await FirebaseService.queryByField(this.basePath, "role", role);
      return users;
    } catch (error) {
      console.error("Error getting users by role:", error);
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      await FirebaseService.update(`${this.basePath}/${userId}`, {
        ...userData,
        updatedAt: Date.now(),
      });
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${userId}`);
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  // ✅ Đăng nhập — so sánh mật khẩu đã mã hoá
  async authenticateUser(phone, password) {
    try {
      const users = await FirebaseService.queryByField(this.basePath, "phone", phone);
      if (!users.length) return null;

      const hashed = await hashPassword(password);
      const user = users.find((u) => u.password === hashed);
      return user || null;
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }

  async phoneExists(phone) {
    const users = await FirebaseService.queryByField(this.basePath, "phone", phone);
    return users.length > 0;
  }

  async emailExists(email) {
    const users = await FirebaseService.queryByField(this.basePath, "email", email);
    return users.length > 0;
  }

  // ✅ Reset mật khẩu (mã hoá mới)
  async resetPasswordByPhone(phone, newPassword) {
    try {
      const users = await FirebaseService.queryByField(this.basePath, "phone", phone);
      if (!users || users.length === 0) return false;

      const user = users[0];
      const newHashed = await hashPassword(newPassword);

      await FirebaseService.update(`${this.basePath}/${user.id}`, {
        password: newHashed,
        updatedAt: Date.now(),
      });

      return true;
    } catch (error) {
      console.error("Error resetting password:", error);
      return false;
    }
  }

  listenToUsers(callback) {
    return FirebaseService.listen(this.basePath, (usersArray) => {
      callback(Array.isArray(usersArray) ? usersArray : []);
    });
  }
}

export default new UserService();
