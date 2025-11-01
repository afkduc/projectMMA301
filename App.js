import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";

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
import TutorsManagementScreen from "./src/screens/admin/TutorsManagementScreen"

export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("login");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAI, setShowAI] = useState(false); //  trạng thái mở AI
  // Cập nhật state để thêm currentUser
  const [currentUser, setCurrentUser] = useState(null);

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
    } else if (role === "tutor") {
      setCurrentScreen("tutorDashboard"); // ✅ ADDED: vào dashboard tutor sau login
    } else if (userType === 'admin') {
      setCurrentScreen('adminDashboard');
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
        setCurrentScreen("tutorDashboard"); // ✅ ADDED
      } else if (tab === "orders") {
        setCurrentScreen("tutorOrders");    // ✅ ADDED
      } else if (tab === "tutorProfile") {
        setCurrentScreen("tutorProfile");   // ✅ ADDED
      }
    }
  };


  // --- Back navigation mapping ---
  const handleBack = () => {
    const backNavigation = {
      // Tutor 
      tutorOrderDetail: 'tutorOrders',
      tutorInfo: 'tutorProfile',
      tutorArea: 'tutorProfile',
      tutorSkills: 'tutorProfile',
      tutorSchedule: 'tutorProfile',
      tutorIncome: 'tutorProfile',
      tutorReviews: 'tutorProfile',
      tutorEditProfile: 'tutorProfile',
      tutorSupport: 'tutorProfile',
      tutorSettings: 'tutorProfile',
    };

    const backScreen = backNavigation[currentScreen];
    if (backScreen) {
      setCurrentScreen(backScreen);
    } else {
      // Fallback theo vai trò
      if (user?.role === 'customer') {
        setCurrentScreen('home');
      } else if (user?.role === 'tutor') {
        setCurrentScreen('tutorDashboard');
      } else if (user?.role === 'admin') {
        setCurrentScreen('adminDashboard');
      } else {
        setCurrentScreen('home');
      }
    }
  };


  // --- Khi tutor bấm vào order ---
  const handleOrderPress = (order) => {
    console.log("Tutor chọn đơn hàng:", order);
    setSelectedOrder(order);
    setCurrentScreen("tutorOrderDetail"); // ✅ ADDED
  };

  // --- Khi tutor bấm menu item trong profile ---
  const handleMenuPress = (action) => {
    console.log("Menu action:", action);
    if (action) {
      setCurrentScreen(action);
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

  if (currentScreen === "home") {
    return (
      <HomeScreen
        onServicePress={handleServicePress}
        onTabPress={handleTabPress}
        currentUser={user}
        onLogout={handleLogout}
        onOpenAI={() => setCurrentScreen("ai")}
      />
    );
  }

  // tutor screens
  if (currentScreen === "tutorDashboard") {
    return (
      <TutorDashboardScreen
        onServicePress={handleServicePress}
        onTabPress={handleTabPress}
        currentUser={user}           // ✅ ADDED: truyền currentUser nếu cần hiển thị tên/role
      />
    );
  }

  if (currentScreen === "tutorOrders") {
    return (
      <TutorOrdersScreen
        onOrderPress={handleOrderPress} // ✅ ADDED: bấm 1 order → sang detail
        onTabPress={handleTabPress}
      />
    );
  }

  if (currentScreen === "tutorOrderDetail") {
    // Nếu bạn đã có component thật, dùng nó thay cho Placeholder bên dưới
    return (
      <TutorOrderDetailScreen
        order={selectedOrder}
        onTabPress={handleTabPress}
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === "tutorProfile") {
    return (
      <TutorProfileScreen
        onTabPress={handleTabPress}
        onLogout={handleLogout}
        currentUser={currentUser}
        onMenuPress={handleMenuPress}
      />
    );
  }

  if (currentScreen === "tutorArea") {
    return (
      <TutorAreaScreen
        onTabPress={handleTabPress}
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === "tutorSkills") {
    return (
      <TutorSkillsScreen
        onTabPress={handleTabPress} // 🔙 Quay về trang chủ
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === "tutorInfo") {
    return (
      <TutorInfoScreen
        onTabPress={handleTabPress} // 🔙 Quay về trang chủ
        onBack={handleBack}
        currentUser={user}
      />
    );
  }

  if (currentScreen === "tutorSchedule") {
    return (
      <TutorScheduleScreen
        onTabPress={handleTabPress} // 🔙 Quay về trang chủ
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === "tutorIncome") {
    return (
      <TutorIncomeScreen
        onTabPress={handleTabPress} // 🔙 Quay về trang chủ
        onBack={handleBack}
        currentUser={user}
      />
    );
  }

  if (currentScreen === "tutorReviews") {
    return (
      <TutorReviewsScreen
        onTabPress={handleTabPress} // 🔙 Quay về trang chủ
        onBack={handleBack}
        currentUser={user}
      />
    );
  }

  if (currentScreen === "tutorEditProfile") {
    return (
      <TutorEditProfileScreen
        onTabPress={handleTabPress} // 🔙 Quay về trang chủ
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === "tutorSupport") {
    return (
      <TutorSupportScreen
        onTabPress={handleTabPress} // 🔙 Quay về trang chủ
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === "tutorSettings") {
    return (
      <TutorSettingsScreen
        onTabPress={handleTabPress} // 🔙 Quay về trang chủ
        onBack={handleBack}
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

  if (currentScreen === "tutorManagement") {
    return (
      <TutorsManagementScreen
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
      <Text style={{ marginTop: 12 }}>Màn "{currentScreen}" chưa có UI tương ứng.</Text>
    </SafeAreaView>
  );
};
