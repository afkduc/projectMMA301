import UserService from "@service/UserService";
import ServiceService from "@service/serviceService";
import FirebaseService from "@service/firebaseService";


// ✅ Chú ý: "ServiceService" viết hoa, phải khớp với file bạn export mặc định
// Nếu file của bạn là "serviceService.js" và export default new ServiceService(), thì import đúng như trên

// Initial data to populate Firebase
const initialUsers = [
  {
    phone: "0111111111",
    password: "123456",
    role: "customer",
    name: "Nguyễn Văn A",
    email: "customer1@example.com",
    status: "active",
    joinDate: "2024-01-01",
    area: "Quận 1, TP.HCM",
  },
  {
    phone: "0222222222",
    password: "123456",
    role: "customer",
    name: "Trần Thị B",
    email: "customer2@example.com",
    status: "active",
    joinDate: "2024-01-05",
    area: "Quận 3, TP.HCM",
  },
  {
    phone: "0333333333",
    password: "123456",
    role: "customer",
    name: "Lê Văn C",
    email: "customer3@example.com",
    status: "blocked",
    joinDate: "2024-01-10",
    area: "Quận 7, TP.HCM",
  },
]

// ✅ Định nghĩa class DataInitializer trước khi export
class DataInitializer {
  async init() {
    console.log("🚀 DataInitializer starting...");
    await this.initUsers();
  }

  async initUsers() {
    console.log("👤 Seeding users...");
    for (const user of initialUsers) {
      await UserService.createUser(user);
    }
    console.log("✅ Done initializing users!");
  }
  async initializeData() {
    try {
      console.log("Checking Firebase connection...")

      const isConnected = await this.checkFirebaseConnection()
      if (!isConnected) {
        console.log("Firebase not available, skipping data initialization")
        return false
      }

      console.log("Initializing Firebase data...")

      // Check if data already exists
      const existingUsers = await UserService.getAllUsers()
      if (existingUsers.length > 0) {
        console.log("Data already exists, skipping initialization")
        return true
      }

      // Initialize users
      console.log("Creating users...")
      for (const user of initialUsers) {
        try {
          await UserService.createUser(user)
        } catch (error) {
          console.error("Error creating user:", user.name, error)
        }
      }

      // Initialize services
      console.log("Creating services...")
      for (const service of initialServices) {
        try {
          await ServiceService.createService(service)
        } catch (error) {
          console.error("Error creating service:", service.name, error)
        }
      }

      console.log("Firebase data initialization completed!")
      return true
    } catch (error) {
      console.error("Error initializing Firebase data:", error)
      return false
    }
  }

  async resetData() {
    try {
      console.log("Resetting Firebase data...")

      // This would require admin privileges in a real app
      // For now, we'll just reinitialize
      await this.initializeData()

      console.log("Firebase data reset completed!")
      return true
    } catch (error) {
      console.error("Error resetting Firebase data:", error)
      return false
    }
  }

}

export default new DataInitializer();
