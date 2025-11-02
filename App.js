import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";

// Login - Register - ForgotPassword
import LoginScreen from "@login/LoginScreen";
import RegisterScreen from "@login/RegisterScreen";
import ForgotPasswordScreen from "@login/ForgotPasswordScreen";
import { seedUsers } from "@service/initUsers";

// Customer screens
import HomeScreen from "./src/screens/customer/HomeScreen";

// Tutor screens
import TutorDashboardScreen from "./src/screens/tutor/TutorDashboardScreen";
import TutorOrdersScreen from "./src/screens/tutor/TutorOrdersScreen";
import TutorProfileScreen from "./src/screens/tutor/TutorProfileScreen";
import TutorOrderDetailScreen from "./src/screens/tutor/TutorOrderDetailScreen";
import TutorAreaScreen from "./src/screens/tutor/TutorAreaScreen";
import TutorSkillsScreen from "./src/screens/tutor/TutorSkillsScreen";
import TutorInfoScreen from "./src/screens/tutor/TutorInfoScreen";
import TutorScheduleScreen from "./src/screens/tutor/TutorScheduleScreen";
import TutorIncomeScreen from "./src/screens/tutor/TutorIncomeScreen";
import TutorReviewsScreen from "./src/screens/tutor/TutorReviewsScreen";
import TutorEditProfileScreen from "./src/screens/tutor/TutorEditProfileScreen";
import TutorSupportScreen from "./src/screens/tutor/TutorSupportScreen";
import TutorSettingsScreen from "./src/screens/tutor/TutorSettingsScreen";

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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAI, setShowAI] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // --- Init users ---
  useEffect(() => {
    seedUsers();
  }, []);

  const currentScreen = screenStack[screenStack.length - 1];

  const pushScreen = (screen) => {
    setScreenStack((prev) => [...prev, screen]);
  };

  const handleBack = () => {
    setScreenStack((prev) => {
      if (prev.length > 1) {
        const newStack = [...prev];
        newStack.pop();
        return newStack;
      }
      return prev;
    });
  };

  // --- Login ---
  const handleLogin = (role, userData) => {
    setUser(userData);
    setCurrentUser(userData);
    if (role === "customer") pushScreen("home");
    else if (role === "tutor") pushScreen("tutorDashboard");
    else if (role === "admin") pushScreen("adminDashboard");
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

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    pushScreen("tutorOrderDetail");
  };

  const handleTabPress = (tab) => {
    console.log("Người dùng chọn tab:", tab);
    if (user?.role === "customer") {
      if (tab === "home") pushScreen("home");
      else if (tab === "profile") pushScreen("userProfile");
    }

    if (user?.role === "tutor") {
      switch (tab) {
        case "dashboard":
          pushScreen("tutorDashboard");
          break;
        case "orders":
          pushScreen("tutorOrders");
          break;
        case "tutorProfile":
          pushScreen("tutorProfile");
          break;
      }
    }

    if (user?.role === "admin") {
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
        return (
          <RegisterScreen
            onRegister={() => setScreenStack(["login"])}
            onBackToLogin={handleBackToLogin}
          />
        );
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

  // --- Tutor Screens ---
  switch (currentScreen) {
    case "tutorDashboard":
      return (
        <TutorDashboardScreen
          onServicePress={handleServicePress}
          onTabPress={handleTabPress}
          currentUser={user}
        />
      );
    case "tutorOrders":
      return (
        <TutorOrdersScreen
          onOrderPress={handleOrderPress}
          onTabPress={handleTabPress}
        />
      );
    case "tutorOrderDetail":
      return (
        <TutorOrderDetailScreen
          order={selectedOrder}
          onTabPress={handleTabPress}
          onBack={handleBack}
        />
      );
    case "tutorProfile":
      return (
        <TutorProfileScreen
          onTabPress={handleTabPress}
          onLogout={handleLogout}
          currentUser={currentUser}
          onMenuPress={handleMenuPress}
        />
      );
    case "tutorArea":
      return <TutorAreaScreen onTabPress={handleTabPress} onBack={handleBack} />;
    case "tutorSkills":
      return <TutorSkillsScreen onTabPress={handleTabPress} onBack={handleBack} />;
    case "tutorInfo":
      return <TutorInfoScreen onTabPress={handleTabPress} onBack={handleBack} currentUser={user} />;
    case "tutorSchedule":
      return <TutorScheduleScreen onTabPress={handleTabPress} onBack={handleBack} />;
    case "tutorIncome":
      return <TutorIncomeScreen onTabPress={handleTabPress} onBack={handleBack} currentUser={user} />;
    case "tutorReviews":
      return <TutorReviewsScreen onTabPress={handleTabPress} onBack={handleBack} currentUser={user} />;
    case "tutorEditProfile":
      return <TutorEditProfileScreen onTabPress={handleTabPress} onBack={handleBack} />;
    case "tutorSupport":
      return <TutorSupportScreen onTabPress={handleTabPress} onBack={handleBack} />;
    case "tutorSettings":
      return <TutorSettingsScreen onTabPress={handleTabPress} onBack={handleBack} />;
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
      return (
        <UserManagementScreen
          onBack={handleBack}
          onTabPress={handleTabPress}
          currentUser={user}
          onLogout={handleLogout}
          activeTab="userManagement"
        />
      );
    case "adminProfile":
      return (
        <AdminProfileScreen
          onBack={handleBack}
          onTabPress={handleTabPress}
          currentUser={user}
          onLogout={handleLogout}
          activeTab="adminProfile"
          onMenuPress={handleMenuPress}
        />
      );
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
          <Text style={{ marginTop: 12 }}>Màn "{currentScreen}" chưa có UI tương ứng.</Text>
        </SafeAreaView>
      );
  }
}
