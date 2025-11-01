import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { styles } from "../../style/additional";
import { TutorBottomNav } from "../../components/BottomNavigation";

const TutorSupportScreen = ({ onTabPress, onBack }) => {
  const [activeTab, setActiveTab] = useState("faq");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    email: "",
    phone: "",
  });

  const tabs = [
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Liên hệ" },
    { id: "guide", label: "Hướng dẫn" },
  ];

  const faqData = [
    {
      id: 1,
      question: "Làm thế nào để tăng số lớp nhận được?",
      answer:
        "Bạn nên: 1) Mở rộng khu vực dạy, 2) Cập nhật hồ sơ & kỹ năng thường xuyên, 3) Duy trì đánh giá cao từ học viên/phụ huynh, 4) Phản hồi nhanh khi có lớp mới.",
    },
    {
      id: 2,
      question: "Tôi có thể thay đổi học phí không?",
      answer:
        "Có. Vào Cài đặt > Thông tin giảng dạy để điều chỉnh học phí theo giờ. Nên cân nhắc thị trường và mức độ cạnh tranh.",
    },
    {
      id: 3,
      question: "Khi nào tôi nhận được thanh toán?",
      answer:
        "Thanh toán sẽ được chuyển trong 24–48 giờ sau khi buổi học/lớp hoàn tất và được xác nhận.",
    },
    {
      id: 4,
      question: "Xử lý khiếu nại của phụ huynh/học viên như thế nào?",
      answer:
        "Hãy: 1) Lắng nghe và xác nhận vấn đề, 2) Xin lỗi lịch sự nếu có sơ suất, 3) Đưa giải pháp/đền bù phù hợp, 4) Liên hệ bộ phận hỗ trợ nếu cần.",
    },
  ];

  const supportCategories = [
    { id: "technical", title: "Kỹ thuật", description: "Lỗi ứng dụng, đăng nhập", icon: "🔧" },
    { id: "payment", title: "Thanh toán", description: "Học phí, rút tiền", icon: "💰" },
    { id: "class", title: "Lớp học", description: "Nhận lớp, lịch dạy", icon: "📚" },
    { id: "account", title: "Tài khoản", description: "Thông tin cá nhân", icon: "👤" },
  ];

  const priorityOptions = [
    { id: "low", label: "Thấp", color: "#10b981" },
    { id: "medium", label: "Trung bình", color: "#f59e0b" },
    { id: "high", label: "Cao", color: "#ef4444" },
  ];

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleQuickSupport = (type) => {
    switch (type) {
      case "call":
        Alert.alert("Gọi hỗ trợ", "Số điện thoại: 1900-1234");
        break;
      case "chat":
        Alert.alert("Chat trực tuyến", "Tính năng chat đang được phát triển");
        break;
      default:
        break;
    }
  };

  const handleSubmitContact = () => {
    if (!contactForm.subject || !contactForm.message) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }
    Alert.alert("Thành công", "Yêu cầu hỗ trợ đã được gửi. Chúng tôi sẽ phản hồi trong 24h.");
    setContactForm({ subject: "", message: "", email: "", phone: "" });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "faq":
        return (
          <View>
            {/* Quick Support */}
            <View style={styles.quickSupportSection}>
              <Text style={styles.sectionTitle}>Hỗ trợ nhanh</Text>
              <View style={styles.quickSupportButtons}>
                <TouchableOpacity
                  style={styles.quickSupportButton}
                  onPress={() => handleQuickSupport("call")}
                >
                  <Text style={styles.quickSupportIcon}>📞</Text>
                  <Text style={styles.quickSupportText}>Gọi ngay</Text>
                  <Text style={styles.quickSupportSubtext}>1900-1234</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickSupportButton}
                  onPress={() => handleQuickSupport("chat")}
                >
                  <Text style={styles.quickSupportIcon}>💬</Text>
                  <Text style={styles.quickSupportText}>Chat trực tuyến</Text>
                  <Text style={styles.quickSupportSubtext}>8:00 - 22:00</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* FAQ */}
            <View style={styles.faqSection}>
              <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>
              <View style={styles.faqContainer}>
                {faqData.map((faq) => (
                  <View key={faq.id} style={styles.faqItem}>
                    <TouchableOpacity
                      style={styles.faqQuestion}
                      onPress={() => toggleFaq(faq.id)}
                    >
                      <Text style={styles.faqQuestionText}>{faq.question}</Text>
                      <Text style={styles.faqArrow}>
                        {expandedFaq === faq.id ? "−" : "+"}
                      </Text>
                    </TouchableOpacity>
                    {expandedFaq === faq.id && (
                      <View style={styles.faqAnswer}>
                        <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        );

      case "contact":
        return (
          <View>
            {/* Support Categories */}
            <View style={styles.supportCategoriesSection}>
              <Text style={styles.sectionTitle}>Chọn loại hỗ trợ</Text>
              <View style={styles.supportCategoriesGrid}>
                {supportCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.supportCategoryCard,
                      selectedCategory === category.id && styles.selectedSupportCategory,
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text style={styles.supportCategoryIcon}>{category.icon}</Text>
                    <Text style={styles.supportCategoryTitle}>{category.title}</Text>
                    <Text style={styles.supportCategoryDescription}>{category.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Contact Form */}
            <View style={styles.contactFormSection}>
              <Text style={styles.sectionTitle}>Gửi yêu cầu hỗ trợ</Text>
              <View style={styles.contactForm}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Tiêu đề *</Text>
                  <TextInput
                    style={styles.contactInput}
                    value={contactForm.subject}
                    onChangeText={(text) => setContactForm((prev) => ({ ...prev, subject: text }))}
                    placeholder="Mô tả ngắn gọn vấn đề"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Mô tả chi tiết *</Text>
                  <TextInput
                    style={[styles.contactInput, styles.contactTextArea]}
                    value={contactForm.message}
                    onChangeText={(text) => setContactForm((prev) => ({ ...prev, message: text }))}
                    placeholder="Mô tả chi tiết vấn đề bạn gặp phải"
                    multiline
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Email liên hệ</Text>
                  <TextInput
                    style={styles.contactInput}
                    value={contactForm.email}
                    onChangeText={(text) => setContactForm((prev) => ({ ...prev, email: text }))}
                    placeholder="email@example.com"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Số điện thoại</Text>
                  <TextInput
                    style={styles.contactInput}
                    value={contactForm.phone}
                    onChangeText={(text) => setContactForm((prev) => ({ ...prev, phone: text }))}
                    placeholder="0123456789"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Mức độ ưu tiên</Text>
                  <View style={styles.prioritySelector}>
                    {priorityOptions.map((priority) => (
                      <TouchableOpacity
                        key={priority.id}
                        style={[
                          styles.priorityButton,
                          { borderColor: priority.color },
                          selectedPriority === priority.id && styles.selectedPriorityButton,
                        ]}
                        onPress={() => setSelectedPriority(priority.id)}
                      >
                        <Text style={[styles.priorityButtonText, { color: priority.color }]}>
                          {priority.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <TouchableOpacity style={styles.submitContactButton} onPress={handleSubmitContact}>
                  <Text style={styles.submitContactButtonText}>Gửi yêu cầu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case "guide":
        return (
          <View style={styles.supportTipsSection}>
            <View style={styles.supportTips}>
              <Text style={styles.supportTipsTitle}>📖 Hướng dẫn sử dụng</Text>
              <Text style={styles.supportTipsText}>
                <Text style={{ fontWeight: "bold" }}>1. Quản lý lớp học:{"\n"}</Text>
                • Kiểm tra lớp mới trong tab "Lớp học"{"\n"}• Nhận/Từ chối lớp đúng hạn{"\n"}• Cập nhật trạng thái buổi học{"\n\n"}
                <Text style={{ fontWeight: "bold" }}>2. Tối ưu hồ sơ:{"\n"}</Text>
                • Ảnh đại diện chuyên nghiệp{"\n"}• Mô tả môn dạy, phương pháp & chứng chỉ{"\n"}• Thiết lập khu vực dạy hợp lý{"\n\n"}
                <Text style={{ fontWeight: "bold" }}>3. Tăng thu nhập:{"\n"}</Text>
                • Duy trì đánh giá cao{"\n"}• Phản hồi nhanh yêu cầu mới{"\n"}• Lịch dạy nhất quán, đúng giờ
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Hỗ trợ gia sư</Text>
        <View />
      </View>

      {/* Tab Navigation */}
      <View style={styles.supportTabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.supportTab, activeTab === tab.id && styles.activeSupportTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[styles.supportTabText, activeTab === tab.id && styles.activeSupportTabText]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.supportContent}>{renderTabContent()}</ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  );
};

export default TutorSupportScreen;
