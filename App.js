import React, { useState, useEffect } from "react";
// login - register - forgotPassword
import LoginScreen from "@login/LoginScreen";
import RegisterScreen from "@login/RegisterScreen";
import ForgotPasswordScreen from "@login/ForgotPasswordScreen";
import { seedUsers } from "@service/initUsers";
// import AdminService from "./src/service/AdminService";

// AI ask 
import AiAdvisorScreen from "./src/screens/AiAdvisorScreen";

// Customer screens
import HomeScreen from "./src/screens/customer/HomeScreen";

// Admin screens
import AdminDashboardScreen from "./src/screens/admin/AdminDashboardScreen";
import AdminAccountManagementScreen from "./src/screens/admin/AdminAccountManagementScreen";
import CustomerManagementScreen from "./src/screens/admin/CustomerManagementScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("login");
  const [selectedService, setSelectedService] = useState(null);
  const [showAI, setShowAI] = useState(false); //  trạng thái mở AI

  // login initUser
  useEffect(() => {
    seedUsers(); // chạy 1 lần khi app start
  }, []);

  // useEffect(() => {
  //   const addSampleAdmins = async () => {
  //     await AdminService.createAdmin({
  //       name: "Quản trị viên Nguyễn",
  //       phone: "0123456789",
  //       email: "admin@example.com",
  //       password: "123456",
  //     });

  //     await AdminService.createAdmin({
  //       name: "Quản trị viên Trần",
  //       phone: "0987654321",
  //       email: "admin2@example.com",
  //       password: "123456",
  //     });
  //   };

  //   addSampleAdmins();
  // }, []);

  // --- Xử lý login ---
  const handleLogin = (role, userData) => {
    console.log("Đăng nhập thành công:", role, userData);
    setUser(userData);
    if (role === "customer") {
      setCurrentScreen("home");
    }
    if (role === "admin") {
      setCurrentScreen("adminDashboard");
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
    // ở đây bạn có thể chuyển sang WorkerListScreen hoặc hiển thị chi tiết service
  };

  // --- Khi người dùng bấm tab trong HomeScreen ---
  const handleTabPress = (tab) => {
    console.log("Người dùng chọn tab:", tab);
    if (tab === "profile") {
      // sau này bạn có thể mở ProfileScreen
    } else if (tab === "home") {
      setCurrentScreen("home");
    }

    if (user?.role === "admin") {
      if (tab === "adminDashboard") {
        setCurrentScreen("adminDashboard");
      } else if (tab === "userManagement") {
        setCurrentScreen("adminDashboard");
      } else if (tab === "orderManagement") {
        setCurrentScreen("adminDashboard");
      } else if (tab === "adminProfile") {
        setCurrentScreen("adminDashboard");
      }
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

  if (currentScreen === "adminDashboard") {
    return (
      <AdminDashboardScreen
        onServicePress={handleServicePress}
        onTabPress={handleTabPress}
        currentUser={user}
        onLogout={handleLogout}
        onMenuPress={(screen) => setCurrentScreen(screen)}
      />
    );
  }

  if (currentScreen === "adminAccountManagement") {
    return (
      <AdminAccountManagementScreen
        onBack={() => setCurrentScreen("adminDashboard")}
        onTabPress={handleTabPress}
        currentUser={user}
        onLogout={handleLogout}
      />
    );
  }

  if (currentScreen === "customerManagement") {
    return (
      <CustomerManagementScreen
        onBack={() => setCurrentScreen("adminDashboard")}
        onTabPress={handleTabPress}
        currentUser={user}
        onLogout={handleLogout}
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
