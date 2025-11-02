import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../../style/styles";
import { CustomerBottomNav } from "../../components/BottomNavigation";

const HelpSupportScreen = ({ onTabPress, onBack }) => {
  const [selectedTab, setSelectedTab] = useState("faq");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqData = [
    {
      id: "1",
      question: "Làm sao để tìm và đặt gia sư?",
      answer:
        "Bạn có thể tìm gia sư bằng cách: 1) Chọn môn học bạn cần, 2) Xem danh sách gia sư gợi ý, 3) Chọn gia sư phù hợp và ấn 'Đặt lịch'.",
    },
    {
      id: "2",
      question: "Tôi có thể hủy buổi học không?",
      answer:
        "Bạn có thể hủy buổi học miễn phí trước 4 tiếng so với thời gian học. Sau đó, hệ thống có thể tính phí hủy 20% học phí buổi đó.",
    },
    {
      id: "3",
      question: "Thanh toán học phí bằng cách nào?",
      answer:
        "Bạn có thể thanh toán bằng tiền mặt sau buổi học, hoặc thanh toán online qua ví điện tử (MoMo, ZaloPay) hay chuyển khoản ngân hàng.",
    },
    {
      id: "4",
      question: "Nếu tôi không hài lòng với gia sư thì sao?",
      answer:
        "Nếu bạn không hài lòng, hãy gửi phản hồi trong vòng 24h sau buổi học. Hệ thống sẽ hỗ trợ đổi gia sư hoặc hoàn học phí phù hợp.",
    },
    {
      id: "5",
      question: "Thời gian phản hồi của gia sư là bao lâu?",
      answer:
        "Gia sư thường phản hồi trong vòng 15–30 phút. Trong giờ cao điểm, có thể mất đến 1 tiếng.",
    },
  ];

  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleSubmitContact = () => {
    if (
      !contactForm.name ||
      !contactForm.email ||
      !contactForm.subject ||
      !contactForm.message
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    Alert.alert(
      "Gửi thành công",
      "Yêu cầu hỗ trợ của bạn đã được gửi. Trung tâm sẽ phản hồi trong vòng 24 giờ."
    );
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleCall = () => {
    Linking.openURL("tel:19006789");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@giasu24h.vn");
  };

  const renderFAQ = () => (
    <View style={styles.faqContainer}>
      {faqData.map((item) => (
        <View key={item.id} style={styles.faqItem}>
          <TouchableOpacity
            style={styles.faqQuestion}
            onPress={() =>
              setExpandedFAQ(expandedFAQ === item.id ? null : item.id)
            }
          >
            <Text style={styles.faqQuestionText}>{item.question}</Text>
            <Text style={styles.faqArrow}>
              {expandedFAQ === item.id ? "−" : "+"}
            </Text>
          </TouchableOpacity>
          {expandedFAQ === item.id && (
            <View style={styles.faqAnswer}>
              <Text style={styles.faqAnswerText}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderContact = () => (
    <View style={styles.contactContainer}>
      {/* Liên hệ nhanh */}
      <View style={styles.quickContactSection}>
        <Text style={styles.quickContactTitle}>Liên hệ nhanh</Text>
        <View style={styles.quickContactButtons}>
          <TouchableOpacity
            style={styles.quickContactButton}
            onPress={handleCall}
          >
            <Text style={styles.quickContactIcon}>📞</Text>
            <Text style={styles.quickContactText}>Gọi điện</Text>
            <Text style={styles.quickContactSubtext}>1900 6789</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickContactButton}
            onPress={handleEmail}
          >
            <Text style={styles.quickContactIcon}>✉️</Text>
            <Text style={styles.quickContactText}>Email</Text>
            <Text style={styles.quickContactSubtext}>
              support@giasu24h.vn
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Gửi yêu cầu hỗ trợ */}
      <View style={styles.contactFormSection}>
        <Text style={styles.contactFormTitle}>Gửi yêu cầu hỗ trợ</Text>
        <View style={styles.contactForm}>
          <TextInput
            style={styles.contactInput}
            placeholder="Họ và tên"
            value={contactForm.name}
            onChangeText={(text) =>
              setContactForm({ ...contactForm, name: text })
            }
          />
          <TextInput
            style={styles.contactInput}
            placeholder="Email"
            value={contactForm.email}
            onChangeText={(text) =>
              setContactForm({ ...contactForm, email: text })
            }
            keyboardType="email-address"
          />
          <TextInput
            style={styles.contactInput}
            placeholder="Chủ đề (ví dụ: Hỗ trợ đặt lịch, vấn đề thanh toán...)"
            value={contactForm.subject}
            onChangeText={(text) =>
              setContactForm({ ...contactForm, subject: text })
            }
          />
          <TextInput
            style={[styles.contactInput, styles.contactTextArea]}
            placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
            value={contactForm.message}
            onChangeText={(text) =>
              setContactForm({ ...contactForm, message: text })
            }
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={styles.submitContactButton}
            onPress={handleSubmitContact}
          >
            <Text style={styles.submitContactButtonText}>Gửi yêu cầu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Trung tâm hỗ trợ</Text>
        <View />
      </View>

      {/* Tabs */}
      <View style={styles.helpTabContainer}>
        <TouchableOpacity
          style={[
            styles.helpTab,
            selectedTab === "faq" && styles.activeHelpTab,
          ]}
          onPress={() => setSelectedTab("faq")}
        >
          <Text
            style={[
              styles.helpTabText,
              selectedTab === "faq" && styles.activeHelpTabText,
            ]}
          >
            Câu hỏi thường gặp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.helpTab,
            selectedTab === "contact" && styles.activeHelpTab,
          ]}
          onPress={() => setSelectedTab("contact")}
        >
          <Text
            style={[
              styles.helpTabText,
              selectedTab === "contact" && styles.activeHelpTabText,
            ]}
          >
            Liên hệ
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.helpContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === "faq" ? renderFAQ() : renderContact()}
      </ScrollView>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default HelpSupportScreen;
