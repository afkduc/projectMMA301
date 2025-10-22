// Thêm dữ liệu users với role vào đầu file
export const users = [
    // Admin users
    { id: "1", phone: "0123456789", password: "123456", role: "admin", name: "Admin Nguyễn", email: "admin@example.com" },
    { id: "2", phone: "0987654321", password: "123456", role: "admin", name: "Admin Trần", email: "admin2@example.com" },
  
    // Customer users
    {
      id: "3",
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
      id: "4",
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
      id: "5",
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
  