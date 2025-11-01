export const users = [
  // Admin users
  { id: "1", phone: "0123456789", password: "123456", role: "admin", name: "Admin Nguyễn", email: "admin@example.com" },
  { id: "2", phone: "0987654321", password: "123456", role: "admin", name: "Admin Trần", email: "admin2@example.com" },

  // Student users
  {
    id: "3",
    phone: "0111111111",
    password: "123456",
    role: "student",
    name: "Nguyễn Văn A",
    email: "student1@example.com",
    status: "active",
    joinDate: "2024-01-01",
    area: "Quận Hoàn Kiếm, Hà Nội",
  },
  {
    id: "4",
    phone: "0222222222",
    password: "123456",
    role: "student",
    name: "Trần Thị B",
    email: "student2@example.com",
    status: "active",
    joinDate: "2024-01-05",
    area: "Quận Đống Đa, Hà Nội",
  },
  {
    id: "5",
    phone: "0333333333",
    password: "123456",
    role: "student",
    name: "Lê Văn C",
    email: "student3@example.com",
    status: "blocked",
    joinDate: "2024-01-10",
    area: "Quận Cầu Giấy, Hà Nội",
  },

  // Tutor users
  {
    id: "6",
    phone: "0444444444",
    password: "123456",
    role: "tutor",
    name: "Gia sư Minh Tuấn",
    email: "tutor1@example.com",
    subject: "Toán học",
    status: "active",
    joinDate: "2024-01-02",
    area: "Quận Hoàn Kiếm, Hà Nội",
    rating: 4.8,
    completedSessions: 127,
    degree: "Cử nhân Sư phạm Toán – Đại học Sư phạm Hà Nội",
  },
  {
    id: "7",
    phone: "0555555555",
    password: "123456",
    role: "tutor",
    name: "Gia sư Văn Nam",
    email: "tutor2@example.com",
    subject: "Ngữ văn",
    status: "pending",
    joinDate: "2024-01-15",
    area: "Quận Đống Đa, Hà Nội",
    rating: 4.6,
    completedSessions: 89,
    degree: "Cử nhân Sư phạm Ngữ văn – Đại học Quốc gia Hà Nội",
  },
  {
    id: "8",
    phone: "0666666666",
    password: "123456",
    role: "tutor",
    name: "Gia sư Hoàng Long",
    email: "tutor3@example.com",
    subject: "Tiếng Anh",
    status: "active",
    joinDate: "2024-01-08",
    area: "Quận Cầu Giấy, Hà Nội",
    rating: 4.9,
    completedSessions: 203,
    degree: "Cử nhân Ngôn ngữ Anh – Đại học Hà Nội",
  },
]

export const subjects = [
  {
    id: "1",
    name: "Toán học",
    icon: "🧮",
    color: "#fbbf24",
    suggestedPrice: "150,000đ/giờ",
    description: "Dạy kèm Toán học các cấp – Tiểu học, THCS, THPT",
    status: "active",
  },
  {
    id: "2",
    name: "Ngữ văn",
    icon: "📚",
    color: "#3b82f6",
    suggestedPrice: "120,000đ/giờ",
    description: "Ôn luyện làm văn, đọc hiểu và phân tích tác phẩm",
    status: "active",
  },
  {
    id: "3",
    name: "Tiếng Anh",
    icon: "🗣️",
    color: "#06b6d4",
    suggestedPrice: "200,000đ/giờ",
    description: "Luyện giao tiếp, ngữ pháp và thi chứng chỉ quốc tế",
    status: "active",
  },
  {
    id: "4",
    name: "Tin học",
    icon: "💻",
    color: "#8b5cf6",
    suggestedPrice: "180,000đ/giờ",
    description: "Dạy kỹ năng tin học văn phòng và lập trình cơ bản",
    status: "active",
  },
  {
    id: "5",
    name: "Vật lý",
    icon: "⚙️",
    color: "#10b981",
    suggestedPrice: "160,000đ/giờ",
    description: "Gia sư Vật lý từ cơ bản đến nâng cao",
    status: "active",
  },
  {
    id: "6",
    name: "Hóa học",
    icon: "⚗️",
    color: "#f59e0b",
    suggestedPrice: "150,000đ/giờ",
    description: "Ôn thi Hóa học và giải bài tập nâng cao",
    status: "active",
  },
  {
    id: "7",
    name: "Sinh học",
    icon: "🧬",
    color: "#84cc16",
    suggestedPrice: "140,000đ/giờ",
    description: "Dạy Sinh học và luyện thi THPT Quốc gia",
    status: "active",
  },
  {
    id: "8",
    name: "Lịch sử",
    icon: "🏛️",
    color: "#ef4444",
    suggestedPrice: "130,000đ/giờ",
    description: "Giúp học sinh ghi nhớ sự kiện và hiểu lịch sử Việt Nam",
    status: "inactive",
  },
]

export const tutors = [
  {
    id: "1",
    name: "Gia sư Minh",
    degree: "Cử nhân Sư phạm Toán – Đại học Sư phạm Hà Nội",
    rating: 4.8,
    price: "150,000đ/giờ",
    distance: "0.5km",
    avatar: "👨‍🏫",
    reviews: 127,
    phone: "0901234567",
  },
  {
    id: "2",
    name: "Gia sư Tuấn",
    degree: "Cử nhân Sư phạm Ngữ văn – Đại học Quốc gia Hà Nội",
    rating: 4.6,
    price: "120,000đ/giờ",
    distance: "1.2km",
    avatar: "👨‍🏫",
    reviews: 89,
    phone: "0907654321",
  },
  {
    id: "3",
    name: "Gia sư Hùng",
    degree: "Cử nhân Ngôn ngữ Anh – Đại học Hà Nội",
    rating: 4.9,
    price: "180,000đ/giờ",
    distance: "2.1km",
    avatar: "👨‍🏫",
    reviews: 203,
    phone: "0912345678",
  },
]
// Danh sách lịch học của học viên
export const studentBookings = [
  {
    id: "1",
    subject: "Toán học",
    tutor: "Gia sư Minh",
    date: "15/01/2024",
    time: "09:00",
    status: "completed",
    price: "150,000đ",
    address: "123 Nguyễn Văn A, Quận Hoàn Kiếm, Hà Nội",
  },
  {
    id: "2",
    subject: "Ngữ văn",
    tutor: "Gia sư Tuấn",
    date: "16/01/2024",
    time: "14:00",
    status: "confirmed",
    price: "120,000đ",
    address: "456 Lê Văn B, Quận Đống Đa, Hà Nội",
  },
  {
    id: "3",
    subject: "Tiếng Anh",
    tutor: "Gia sư Hùng",
    date: "14/01/2024",
    time: "10:00",
    status: "cancelled",
    price: "180,000đ",
    address: "789 Trần Văn C, Quận Cầu Giấy, Hà Nội",
  },
]

// Danh sách buổi dạy của gia sư
export const tutorSessions = [
  {
    id: "1",
    student: "Nguyễn Văn A",
    phone: "0901234567",
    subject: "Toán học",
    date: "18/01/2024",
    time: "14:00",
    address: "123 Nguyễn Văn Cừ, Quận Hoàn Kiếm, Hà Nội",
    description: "Ôn tập chuyên đề phương trình và hệ phương trình bậc hai",
    estimatedHours: 2,
    price: "300,000đ",
    status: "pending",
    avatar: "👤",
  },
  {
    id: "2",
    student: "Trần Thị B",
    phone: "0907654321",
    subject: "Ngữ văn",
    date: "19/01/2024",
    time: "09:00",
    address: "456 Lê Lợi, Quận Đống Đa, Hà Nội",
    description: "Phân tích tác phẩm 'Vợ nhặt' và luyện viết đoạn văn nghị luận",
    estimatedHours: 1.5,
    price: "225,000đ",
    status: "accepted",
    avatar: "👩",
  },
  {
    id: "3",
    student: "Lê Văn C",
    phone: "0912345678",
    subject: "Tiếng Anh",
    date: "17/01/2024",
    time: "15:30",
    address: "789 Trần Hưng Đạo, Quận Ba Đình, Hà Nội",
    description: "Luyện nói tiếng Anh giao tiếp theo chủ đề du lịch",
    estimatedHours: 3,
    price: "450,000đ",
    status: "completed",
    avatar: "👨",
  },
  {
    id: "4",
    student: "Phạm Thị D",
    phone: "0923456789",
    subject: "Vật lý",
    date: "20/01/2024",
    time: "10:00",
    address: "321 Võ Văn Tần, Quận Cầu Giấy, Hà Nội",
    description: "Ôn tập chuyên đề dao động điều hòa và bài tập ứng dụng",
    estimatedHours: 1,
    price: "150,000đ",
    status: "pending",
    avatar: "👩",
  },
]

// Ngày và giờ học
export const dates = [
  { id: "1", label: "Hôm nay", value: "2024-01-15" },
  { id: "2", label: "Ngày mai", value: "2024-01-16" },
  { id: "3", label: "17/01", value: "2024-01-17" },
  { id: "4", label: "18/01", value: "2024-01-18" },
]

export const times = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

// Menu học viên
export const menuItems = [
  { id: "1", title: "Thông tin cá nhân", icon: "👤", action: "profile" },
  { id: "2", title: "Địa chỉ học tập", icon: "📍", action: "address" },
  { id: "3", title: "Phương thức thanh toán", icon: "💳", action: "payment" },
  { id: "4", title: "Ưu đãi của tôi", icon: "🎁", action: "offers" },
  { id: "5", title: "Hỗ trợ học viên", icon: "💬", action: "support" },
  { id: "6", title: "Cài đặt", icon: "⚙️", action: "settings" },
  { id: "7", title: "Về chúng tôi", icon: "ℹ️", action: "about" },
]

// Menu gia sư
export const tutorMenuItems = [
  { id: "1", title: "Thông tin gia sư", icon: "👤", action: "tutorInfo" },
  { id: "2", title: "Khu vực giảng dạy", icon: "📍", action: "tutorArea" },
  { id: "3", title: "Lịch dạy học", icon: "📅", action: "tutorSchedule" },
  { id: "4", title: "Báo cáo thu nhập", icon: "💰", action: "tutorIncome" },
  { id: "5", title: "Đánh giá từ học viên", icon: "⭐", action: "tutorReviews" },
  { id: "6", title: "Hỗ trợ gia sư", icon: "💬", action: "tutorSupport" },
  { id: "7", title: "Cài đặt", icon: "⚙️", action: "tutorSettings" },
]

// Thống kê cho admin
export const adminStats = {
  totalUsers: 156,
  totalTutors: 45,
  totalStudents: 111,
  totalSessions: 1247,
  completedSessions: 1089,
  pendingSessions: 158,
  totalRevenue: 45600000,
  monthlyRevenue: 8900000,
  todaySessions: 23,
  weeklySessions: 156,
  processingSessions: 45,
}

// Menu admin
export const adminMenuItems = [
  { id: "1", title: "Quản lý học viên", icon: "👥", action: "students", screen: "studentManagement" },
  { id: "2", title: "Quản lý gia sư", icon: "👨‍🏫", action: "tutors", screen: "tutorManagement" },
  { id: "3", title: "Quản lý môn học", icon: "📘", action: "subjects", screen: "subjectManagement" },
  { id: "4", title: "Quản lý buổi học", icon: "📋", action: "sessions", screen: "sessionManagement" },
  { id: "5", title: "Đánh giá & phản hồi", icon: "⭐", action: "reviews", screen: "reviewManagement" },
  { id: "6", title: "Thanh toán & hoa hồng", icon: "💰", action: "payments", screen: "paymentManagement" },
  { id: "7", title: "Quản lý khu vực", icon: "📍", action: "areas", screen: "areaManagement" },
  { id: "8", title: "Tài khoản admin", icon: "👨‍💼", action: "admins", screen: "adminAccountManagement" },
  { id: "9", title: "Cài đặt hệ thống", icon: "⚙️", action: "settings", screen: "systemSettings" },
  { id: "10", title: "Nhật ký hệ thống", icon: "📊", action: "logs", screen: "systemLogs" },
]

// Đánh giá từ học viên
export const reviews = [
  {
    id: "1",
    student: "Nguyễn Văn A",
    tutor: "Gia sư Minh Tuấn",
    subject: "Toán học",
    rating: 5,
    comment: "Thầy dạy dễ hiểu, giúp em tiến bộ nhanh",
    date: "15/01/2024",
    status: "approved",
  },
  {
    id: "2",
    student: "Trần Thị B",
    tutor: "Gia sư Văn Nam",
    subject: "Ngữ văn",
    rating: 4,
    comment: "Thầy giảng hay nhưng hơi nghiêm khắc 😅",
    date: "16/01/2024",
    status: "approved",
  },
  {
    id: "3",
    student: "Lê Văn C",
    tutor: "Gia sư Hoàng Long",
    subject: "Tiếng Anh",
    rating: 3,
    comment: "Thầy dạy ổn nhưng cần thêm ví dụ thực tế",
    date: "17/01/2024",
    status: "reported",
  },
]

// Giao dịch học phí
export const transactions = [
  {
    id: "1",
    sessionId: "SES001",
    student: "Nguyễn Văn A",
    tutor: "Gia sư Minh Tuấn",
    amount: 300000,
    commission: 30000,
    tutorReceived: 270000,
    date: "15/01/2024",
    status: "completed",
  },
  {
    id: "2",
    sessionId: "SES002",
    student: "Trần Thị B",
    tutor: "Gia sư Văn Nam",
    amount: 225000,
    commission: 22500,
    tutorReceived: 202500,
    date: "16/01/2024",
    status: "completed",
  },
]
// Thêm dữ liệu khu vực (Hà Nội)
export const areas = [
  { id: "1", name: "Quận Hoàn Kiếm", city: "Hà Nội", status: "active", distance: "2km", district: "Trung tâm", tutorCount: 15, available: true },
  { id: "2", name: "Quận Đống Đa", city: "Hà Nội", status: "active", distance: "3km", district: "Trung tâm", tutorCount: 12, available: true },
  { id: "3", name: "Quận Cầu Giấy", city: "Hà Nội", status: "active", distance: "4km", district: "Phía tây", tutorCount: 18, available: true },
  { id: "4", name: "Quận Ba Đình", city: "Hà Nội", status: "active", distance: "5km", district: "Phía bắc", tutorCount: 10, available: true },
  { id: "5", name: "Quận Hai Bà Trưng", city: "Hà Nội", status: "active", distance: "6km", district: "Phía đông", tutorCount: 9, available: true },
]

// Thêm dữ liệu nhật ký hệ thống
export const systemLogs = [
  {
    id: "1",
    action: "Đăng nhập",
    user: "Admin Nguyễn",
    details: "Đăng nhập vào hệ thống quản lý gia sư",
    timestamp: "18/01/2024 09:30:15",
    ip: "192.168.1.100",
  },
  {
    id: "2",
    action: "Xóa người dùng",
    user: "Admin Trần",
    details: "Xóa tài khoản học viên ID: 10",
    timestamp: "18/01/2024 10:15:22",
    ip: "192.168.1.101",
  },
  {
    id: "3",
    action: "Cập nhật môn học",
    user: "Admin Nguyễn",
    details: "Cập nhật học phí môn Toán học",
    timestamp: "18/01/2024 11:45:30",
    ip: "192.168.1.100",
  },
]
