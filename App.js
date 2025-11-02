import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";

// Login - Register - ForgotPassword
import LoginScreen from "@login/LoginScreen";
import RegisterScreen from "@login/RegisterScreen";
import ForgotPasswordScreen from "@login/ForgotPasswordScreen";
import { seedUsers } from "@service/initUsers";

// Customer screens
import HomeScreen from "./src/screens/customer/HomeScreen";

// Admin screens
import AdminDashboardScreen from "./src/screens/admin/AdminDashboardScreen";
import AdminAccountManagementScreen from "./src/screens/admin/AdminAccountManagementScreen";
import CustomerManagementScreen from "./src/screens/admin/CustomerManagementScreen";
import TutorsManagementScreen from "./src/screens/admin/TutorsManagementScreen";
import SubjectManagementScreen from "./src/screens/admin/SubjectManagementScreen";
import SessionsManagementScreen from "./src/screens/admin/SessionsManagementScreen";
import ReviewManagementScreen from "./src/screens/admin/ReviewManagementScreen";
import UserManagementScreen from "./src/screens/admin/UserManagementScreen";
import AdminProfileScreen from "./src/screens/admin/AdminProfileScreen";
import AiChatScreen from "./src/screens/admin/AiChatScreen";

// AI
import AiAdvisorScreen from "./src/screens/AiAdvisorScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [screenStack, setScreenStack] = useState(["login"]);
  const [selectedService, setSelectedService] = useState(null);

  // --- Init users ---
  useEffect(() => {
    seedUsers();
  }, []);

  // --- Helpers ---
  const currentScreen = screenStack[screenStack.length - 1];

  const pushScreen = (screen) => {
    setScreenStack(prev => [...prev, screen]);
  };

  const handleBack = () => {
    setScreenStack(prev => {
      if (prev.length > 1) {
        const newStack = [...prev];
        newStack.pop();
        return newStack;
      }
      return prev; // fallback nếu chỉ còn 1 màn
    });
  };

  // --- Login ---
  const handleLogin = (role, userData) => {
    setUser(userData);
    if (role === "customer") pushScreen("home");
    if (role === "admin") pushScreen("adminDashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setScreenStack(["login"]);
  };

  const handleRegisterPress = () => pushScreen("register");
  const handleForgotPasswordPress = () => pushScreen("forgotPassword");
  const handleBackToLogin = () => setScreenStack(["login"]);

  const handleServicePress = (service) => {
    setSelectedService(service);
  };

  const handleTabPress = (tab) => {
    if (tab === "home") pushScreen("home");
    else if (tab === "profile") pushScreen("userProfile");
    else if (user?.role === "admin") {
      switch (tab) {
        case "adminDashboard":
          pushScreen("adminDashboard");
          break;
        case "userManagement":
          pushScreen("userManagement");
          break;
        case "aichat":
          pushScreen("aichat");
          break;
        case "adminProfile":
          pushScreen("adminProfile");
          break;
      }
    }
  };

  const handleMenuPress = (screen) => {
    pushScreen(screen);
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
        return <RegisterScreen onRegister={() => setScreenStack(["login"])} onBackToLogin={handleBackToLogin} />;
      case "forgotPassword":
        return <ForgotPasswordScreen onBackToLogin={handleBackToLogin} />;
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

  // --- Customer Screens ---
  if (currentScreen === "home") {
    return (
      <HomeScreen
        onServicePress={handleServicePress}
        onTabPress={handleTabPress}
        currentUser={user}
        onLogout={handleLogout}
        onOpenAI={() => pushScreen("ai")}
      />
    );
  }

  if (currentScreen === "ai") {
    return <AiAdvisorScreen onBack={handleBack} currentUser={user} />;
  }

  // --- Admin Screens ---
  switch (currentScreen) {
    case "adminDashboard":
      return (
        <AdminDashboardScreen
          onServicePress={handleServicePress}
          onTabPress={handleTabPress}
          currentUser={user}
          onLogout={handleLogout}
          onMenuPress={handleMenuPress}
        />
      );
    case "userManagement":
      return <UserManagementScreen onBack={handleBack} onTabPress={handleTabPress} currentUser={user} onLogout={handleLogout} activeTab="userManagement" />;
    case "adminProfile":
      return <AdminProfileScreen onBack={handleBack} onTabPress={handleTabPress} currentUser={user} onLogout={handleLogout} activeTab="adminProfile" onMenuPress={handleMenuPress} />;
    case "adminAccountManagement":
      return <AdminAccountManagementScreen onBack={handleBack} onTabPress={handleTabPress} currentUser={user} onLogout={handleLogout} />;
    case "customerManagement":
      return <CustomerManagementScreen onBack={handleBack} onTabPress={handleTabPress} currentUser={user} onLogout={handleLogout} />;
    case "tutorManagement":
      return <TutorsManagementScreen onBack={handleBack} onTabPress={handleTabPress} currentUser={user} onLogout={handleLogout} />;
    case "subjectManagement":
      return <SubjectManagementScreen onBack={handleBack} onTabPress={handleTabPress} currentUser={user} onLogout={handleLogout} />;
    case "sessionManagement":
      return <SessionsManagementScreen onBack={handleBack} onTabPress={handleTabPress} currentUser={user} onLogout={handleLogout} />;
    case "reviewManagement":
      return <ReviewManagementScreen onBack={handleBack} onTabPress={handleTabPress} currentUser={user} onLogout={handleLogout} />;
    case "aichat":
      return <AiChatScreen onBack={handleBack} onTabPress={handleTabPress} currentUser={user} onLogout={handleLogout} />;
    default:
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Xin chào, {user.name || "Người dùng"} 👋</Text>
          <Text>Vai trò: {user.role}</Text>
        </SafeAreaView>
      );
  }
}
