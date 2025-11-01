import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";

// login - register - forgotPassword
import LoginScreen from "@login/LoginScreen";
import RegisterScreen from "@login/RegisterScreen";
import ForgotPasswordScreen from "@login/ForgotPasswordScreen";
import { seedUsers } from "@service/initUsers";
// AI ask 
import AiAdvisorScreen from "./src/screens/AiAdvisorScreen";

// Customer screens
import HomeScreen from "./src/screens/customer/HomeScreen";

// Tutor screens
import TutorDashboardScreen from "./src/screens/tutor/TutorDashboardScreen";
import TutorOrdersScreen from "./src/screens/tutor/TutorOrdersScreen";
import TutorProfileScreen from "./src/screens/tutor/TutorProfileScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("login");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAI, setShowAI] = useState(false); //  trạng thái mở AI


  // login initUser
  useEffect(() => {
    seedUsers(); // chạy 1 lần khi app start
  }, []);

  // --- Xử lý login ---
  const handleLogin = (role, userData) => {
    console.log("Đăng nhập thành công:", role, userData);
    setUser(userData);
    if (role === "customer") {
      setCurrentScreen("home");
    } else if (role === "tutor") {
      setCurrentScreen("tutorDashboard");
    }
  };

  // --- Chuyển sang register ---
  const handleRegisterPress = () => {
    setCurrentScreen("register");
  };

  // --- Quên mật khẩu ---
  const handleForgotPasswordPress = () => {
    setCurrentScreen("forgotPassword");
  };

  // --- Quay lại login ---
  const handleBackToLogin = () => {
    setCurrentScreen("login");
  };

  // --- Khi người dùng bấm chọn 1 dịch vụ ---
  const handleServicePress = (service) => {
    console.log("Người dùng chọn dịch vụ:", service);
    setSelectedService(service);
    // ở đây bạn có thể chuyển sang TutorListScreen hoặc hiển thị chi tiết service
  };

  // --- Khi người dùng bấm tab ---
  const handleTabPress = (tab) => {
    console.log("Người dùng chọn tab:", tab);
    
    // Customer tabs
    if (user?.role === "customer") {
      if (tab === "profile") {
        // sau này bạn có thể mở ProfileScreen
      } else if (tab === "home") {
        setCurrentScreen("home");
      }
    }
    
    // Tutor tabs
    if (user?.role === "tutor") {
      if (tab === "dashboard") {
        setCurrentScreen("tutorDashboard");
      } else if (tab === "orders") {
        setCurrentScreen("tutorOrders");
      } else if (tab === "tutorProfile") {
        setCurrentScreen("tutorProfile");
      }
    }
  };

  // --- Khi tutor bấm vào order ---
  const handleOrderPress = (order) => {
    console.log("Tutor chọn đơn hàng:", order);
    setSelectedOrder(order);
    // Có thể chuyển sang màn chi tiết đơn hàng
    setCurrentScreen("tutorOrderDetail");
  };

  // --- Khi tutor bấm menu item trong profile ---
  const handleMenuPress = (action) => {
    console.log("Menu action:", action);
    // Chuyển đến màn hình tương ứng
    if (action) {
      setCurrentScreen(action);
    }
  };

  // --- Khi đăng xuất ---
  const handleLogout = () => {
    setUser(null);
    setCurrentScreen("login");
  };

  // =================== RENDER ===================
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
            onRegister={() => setCurrentScreen("login")}
            onBackToLogin={handleBackToLogin}
          />
        );
      case "forgotPassword":
        return (
          <ForgotPasswordScreen onBackToLogin={handleBackToLogin} />
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
    // 🧠 Hiển thị màn hình AI Advisor Chat (chuyên tư vấn về Gia sư)
    if (currentScreen === "ai") {
      return (
        <AiAdvisorScreen
          onBack={() => setCurrentScreen("home")} // 🔙 Quay về trang chủ
          currentUser={user}
        />
      );
    }

  // 🔹 Nếu user đã đăng nhập → hiển thị HomeScreen
  if (currentScreen === "home") {
    return (
      <HomeScreen
        onServicePress={handleServicePress}
        onTabPress={handleTabPress}
        currentUser={user}
        onLogout={handleLogout}
        onOpenAI={() => setCurrentScreen("ai")} // 🧠 Khi nhấn robot → mở màn hình AI
      />
    );
  }

  // Dự phòng (nếu cần)
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Xin chào, {user.name || "Người dùng"} 👋</Text>
      <Text>Vai trò: {user.role}</Text>
    </SafeAreaView>
  );
}
