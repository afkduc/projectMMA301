import UserService from "@service/UserService";
import ServiceService from "@service/serviceService";
import FirebaseService from "@service/firebaseService";


// Initial data to populate Firebase
// custommer
const initialUsers = [
  {
    phone: "0111111111",
    password: "123456",
    role: "customer",
    name: "Nguyễn Văn Anh",
    email: "customer1@example.com",
    status: "active",
    joinDate: "2024-01-01",
    area: "Hà đông , Hà Nội",
  },
  {
    phone: "0222222222",
    password: "123456",
    role: "customer",
    name: "Trần Thị Bình",
    email: "customer2@example.com",
    status: "active",
    joinDate: "2024-01-05",
    area: "Hoàn Kiếm , Hà Nội",
  },
  {
    phone: "0333333333",
    password: "123456",
    role: "customer",
    name: "Lê Văn Công",
    email: "customer3@example.com",
    status: "blocked",
    joinDate: "2024-01-10",
    area: "Cầu giấy , Hà Nội",
  },
   // Admin 
   {
    phone: "0123456789",
    password: "123456",
    role: "admin",
    name: "Admin Bùi",
    email: "admin@example.com",
    status: "active",
  },
  {
    phone: "0987654321",
    password: "123456",
    role: "admin",
    name: "Admin Trần",
    email: "admin2@example.com",
    status: "active",
  },
  // tutor users
  {
    phone: "0444444444",
    password: "123456",
    role: "tutor",
    name: "THầy Minh Tuấn",
    email: "tutor@example.com",
    specialty: "Gia sư toán",
    status: "active",
    joinDate: "2024-01-02",
    area: "Hoàng Mai , Hà Nội",
    rating: 4.8,
    completedOrders: 127,
    certificate: "Tốt nghiệp đại học quốc gia hà nội GPA 4",
    experience: "5 năm kinh nghiệm",
    price: "150,000đ/giờ",
    distance: "0.5km",
    avatar: "👨‍🔧",
    reviews: 127,
  },
  {
    phone: "0555555555",
    password: "123456",
    role: "tutor",
    name: "Thầy Văn Nam",
    email: "tutor@example.com",
    specialty: "Thợ nước",
    status: "pending",
    joinDate: "2024-01-15",
    area: "Thach Thất , Hà Nội",
    rating: 4.6,
    completedOrders: 89,
    certificate: "Tốt nghiệp đại học quốc gia hà nội GPA 4",
    experience: "3 năm kinh nghiệm",
    price: "120,000đ/giờ",
    distance: "1.2km",
    avatar: "👨‍🔧",
    reviews: 89,
  },
  {
    phone: "0666666666",
    password: "123456",
    role: "tutor",
    name: "Thầy Hoàng Long",
    email: "tutor@example.com",
    specialty: "Thợ máy lạnh",
    status: "active",
    joinDate: "2024-01-08",
    area: "Quận 7, TP.HCM",
    rating: 4.9,
    completedOrders: 203,
    certificate: "Tốt nghiệp đại học quốc gia hà nội GPA 4",
    experience: "7 năm kinh nghiệm",
    price: "180,000đ/giờ",
    distance: "2.1km",
    avatar: "👨‍🔧",
    reviews: 203,
  },
]
// dữ liệu dịch vụ ban đầu 
const initialServices = [
    {
      name: "Gia sư Tiếng Anh",
      icon: "📝",
      color: "#2563eb",
      suggestedPrice: "200,000đ/giờ",
      description: "Học tiếng Anh theo trình độ",
      status: "active",
    },
    {
      name: "Gia sư Toán",
      icon: "➗",
      color: "#f97316",
      suggestedPrice: "180,000đ/giờ",
      description: "Học Toán từ cơ bản đến nâng cao",
      status: "active",
    },
    {
      name: "Gia sư Vật Lý",
      icon: "⚛️",
      color: "#8b5cf6",
      suggestedPrice: "180,000đ/giờ",
      description: "Học lý thuyết và bài tập vật lý",
      status: "active",
    },
    {
      name: "Gia sư Hóa Học",
      icon: "🧪",
      color: "#06b6d4",
      suggestedPrice: "180,000đ/giờ",
      description: "Học phản ứng và công thức hóa học",
      status: "active",
    },
    {
      name: "Gia sư Sinh Học",
      icon: "🌱",
      color: "#10b981",
      suggestedPrice: "180,000đ/giờ",
      description: "Học sinh vật lý thuyết và sơ đồ sinh học",
      status: "active",
    },
    {
      name: "Gia sư Lịch Sử",
      icon: "📜",
      color: "#f59e0b",
      suggestedPrice: "150,000đ/giờ",
      description: "Học các sự kiện và mốc lịch sử quan trọng",
      status: "active",
    },
    {
      name: "Gia sư Địa Lý",
      icon: "🗺️",
      color: "#3b82f6",
      suggestedPrice: "150,000đ/giờ",
      description: "Học về bản đồ và hiện tượng địa lý",
      status: "active",
    },
    {
      name: "Gia sư Tin Học",
      icon: "💻",
      color: "#ef4444",
      suggestedPrice: "200,000đ/giờ",
      description: "Học lập trình và kỹ năng máy tính",
      status: "active",
    },
  ]
  

//  Định nghĩa class DataInitializer trước khi export
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

      const isConnected = await FirebaseService.checkConnection()
      if (!isConnected) {
        console.log("Firebase not available, skipping data initialization")
        return false
      }

      console.log("Initializing Firebase data...")

  // Kiểm tra xem dữ liệu đã tồn tại chưa
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
export { initialServices, initialUsers };
