// @service/initUsers.js
import UserService from "@service/UserService";

export async function seedUsers() {
  try {
    console.log("🌱 Bắt đầu tạo tài khoản test...");

    const usersToCreate = [
      {
        name: "Admin Test",
        phone: "0909999999",
        password: "123456",
        role: "admin",
        email: "admin@test.com",
      },
      {
        name: "Customer Test",
        phone: "0911111111",
        password: "123456",
        role: "customer",
        email: "customer@test.com",
      },
    ];

    for (const user of usersToCreate) {
      const exists = await UserService.phoneExists(user.phone);
      if (!exists) {
        await UserService.createUser(user);
        console.log("✅ Tạo thành công:", user.phone);
      } else {
        console.log("⚠️ User đã tồn tại:", user.phone);
      }
    }

    console.log("🎉 Seed user hoàn tất!");
  } catch (error) {
    console.error("❌ Lỗi khi seed user:", error);
  }
}
