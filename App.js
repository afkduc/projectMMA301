import React, { useState } from "react";
import { SafeAreaView, Text, ActivityIndicator } from "react-native"
// login - register - forgotPassword
import LoginScreen from "@login/LoginScreen"
import RegisterScreen from "@login/RegisterScreen";
import ForgotPasswordScreen from "@login/ForgotPasswordScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // không còn loading khởi tạo Firebase
  const [currentScreen, setCurrentScreen] = useState("login"); //  Quản lý màn hình

  //  Callback: khi đăng nhập thành công
  const handleLogin = (role, userData) => {
    console.log("Đăng nhập thành công:", role, userData);
    setUser(userData);
  };

  //  Chuyển sang màn đăng ký
  const handleRegisterPress = () => {
    setCurrentScreen("register");
  };

  // Chuyển sang màn quên mật khẩu
  const handleForgotPasswordPress = () => {
    setCurrentScreen("forgotPassword");
  };

  //  Quay lại màn login từ register hoặc forgot password
  const handleBackToLogin = () => {
    setCurrentScreen("login");
  };

  //  Nếu chưa đăng nhập → hiển thị login/register/forgotPassword
  if (!user) {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen
            onLogin={handleLogin}
            onRegister={handleRegisterPress}
            onForgotPassword={handleForgotPasswordPress}
          />
        );
      case "register":
        return (
          <RegisterScreen
            onRegister={() => setCurrentScreen("login")} // Sau khi đăng ký xong quay về login
            onBackToLogin={handleBackToLogin} // Nút quay lại login
          />
        );
      case "forgotPassword":
        return (
          <ForgotPasswordScreen
            onBackToLogin={handleBackToLogin} // Nút quay lại login
          />
        );
      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            onRegister={handleRegisterPress}
            onForgotPassword={handleForgotPasswordPress}
          />
        );
    }
  }

  //  Sau khi đăng nhập thành công → hiển thị giao diện chính
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
