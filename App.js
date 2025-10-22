import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native"
import LoginScreen from "@login/LoginScreen"
import { addAddress, listenAddresses } from "@service/firebaseService"


export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Khởi tạo Firebase hoặc các dữ liệu test
  useEffect(() => {
    const init = async () => {
      try {
        listenAddresses(); // Lắng nghe Realtime DB
        await addAddress({
          address: "123 Nguyễn Văn Cừ, Quận 5",
          phone: "0909999999",
          title: "Nhà test từ React Native",
          isDefault: false,
          userId: "3",
        });
      } catch (error) {
        console.error("Lỗi khi khởi tạo:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ✅ Callback: khi đăng nhập thành công
  const handleLogin = (role, userData) => {
    console.log("Đăng nhập thành công:", role, userData);
    setUser(userData);
  };

  const handleRegister = () => {
    console.log("👉 Chuyển sang màn đăng ký...");
  };

  const handleForgotPassword = () => {
    console.log("🔑 Chuyển sang màn quên mật khẩu...");
  };

  // ✅ Hiển thị loading khởi tạo ban đầu
  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Đang khởi tạo...</Text>
      </SafeAreaView>
    );
  }

  // ✅ Nếu chưa đăng nhập → hiển thị LoginScreen
  if (!user) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onRegister={handleRegister}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  // ✅ Sau khi đăng nhập thành công → hiển thị giao diện chính
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Xin chào, {user.name || "Người dùng"} 👋
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Vai trò: {user.role}</Text>
    </SafeAreaView>
  );
}
