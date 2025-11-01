import FirebaseService from "@service/firebaseService";
import { hashPassword } from "@utils/hashPassword";

class AdminService {
  constructor() {
    this.basePath = "admin";
  }

  async createAdmin(adminData) {
    try {
      const hashedPassword = await hashPassword(adminData.password);
      const finalData = {
        ...adminData,
        password: hashedPassword,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        role: "admin",
        status: "active",
      };
      const adminId = await FirebaseService.create(this.basePath, finalData);
      return adminId;
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  }

  async getAllAdmins() {
    try {
      const admins = await FirebaseService.readAll(this.basePath);
      return admins;
    } catch (error) {
      console.error("Error getting all admins:", error);
      throw error;
    }
  }

  async getAdminById(adminId) {
    try {
      const admin = await FirebaseService.read(`${this.basePath}/${adminId}`);
      return admin;
    } catch (error) {
      console.error("Error getting admin by id:", error);
      throw error;
    }
  }

  async updateAdmin(adminId, adminData) {
    try {
      await FirebaseService.update(`${this.basePath}/${adminId}`, {
        ...adminData,
        updatedAt: Date.now(),
      });
      return true;
    } catch (error) {
      console.error("Error updating admin:", error);
      throw error;
    }
  }

  async deleteAdmin(adminId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${adminId}`);
      return true;
    } catch (error) {
      console.error("Error deleting admin:", error);
      throw error;
    }
  }

  listenToAdmins(callback) {
    return FirebaseService.listen(this.basePath, (adminsArray) => {
      callback(Array.isArray(adminsArray) ? adminsArray : []);
    });
  }
}

export default new AdminService();
