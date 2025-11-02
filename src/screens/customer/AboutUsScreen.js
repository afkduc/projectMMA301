import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../../style/additional";
import { CustomerBottomNav } from "../../components/BottomNavigation";

const AboutUsScreen = ({ onTabPress, onBack }) => {
  const [activeTab, setActiveTab] = useState("company");

  const tabs = [
    { id: "company", label: "Công ty" },
    { id: "team", label: "Đội ngũ gia sư" },
    { id: "contact", label: "Liên hệ" },
  ];

  const tutors = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      subject: "Toán học",
      avatar: "👨‍🏫",
      description: "10+ năm kinh nghiệm giảng dạy học sinh THPT và đại học",
    },
    {
      id: 2,
      name: "Trần Thị B",
      subject: "Vật lý",
      avatar: "👩‍🏫",
      description: "Chuyên gia luyện thi THPT, giảng dạy hiệu quả và dễ hiểu",
    },
    {
      id: 3,
      name: "Lê Văn C",
      subject: "Hóa học",
      avatar: "👨‍🔬",
      description: "Kinh nghiệm hướng dẫn thực hành và thi cử",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      subject: "Anh văn",
      avatar: "👩‍🎓",
      description: "Gia sư tiếng Anh giao tiếp và học thuật",
    },
  ];

  const coreValues = [
    {
      icon: "🎯",
      title: "Chất lượng",
      description: "Đảm bảo gia sư chuyên môn cao, hiệu quả trong học tập",
    },
    {
      icon: "⚡",
      title: "Nhanh chóng",
      description: "Phản hồi và xếp lịch nhanh chóng cho học viên",
    },
    { icon: "🤝", title: "Tin cậy", description: "Gia sư đáng tin cậy, minh bạch" },
    { icon: "💡", title: "Sáng tạo", description: "Phương pháp giảng dạy linh hoạt, sinh động" },
  ];

  const achievements = [
    { number: "5K+", label: "Học viên hài lòng" },
    { number: "500+", label: "Gia sư chuyên nghiệp" },
    { number: "20K+", label: "Buổi học hoàn thành" },
    { number: "4.9", label: "Đánh giá trung bình" },
  ];

  const timeline = [
    {
      year: "2018",
      title: "Thành lập dịch vụ",
      description: "Ra mắt nền tảng kết nối học viên và gia sư",
    },
    {
      year: "2019",
      title: "Mở rộng môn học",
      description: "Bổ sung nhiều môn học: Toán, Lý, Hóa, Anh",
    },
    {
      year: "2021",
      title: "Ứng dụng di động",
      description: "Ra mắt ứng dụng cho Android và iOS",
    },
    {
      year: "2023",
      title: "Phát triển toàn quốc",
      description: "Phục vụ học viên trên toàn Việt Nam",
    },
  ];

  const workingHours = [
    { day: "Thứ 2 - Thứ 6", time: "8:00 - 20:00" },
    { day: "Thứ 7", time: "8:00 - 18:00" },
    { day: "Chủ nhật", time: "9:00 - 17:00" },
  ];

  const handleSocialMedia = (platform) => {
    const urls = {
      facebook: "https://facebook.com/serviceapp",
      instagram: "https://instagram.com/serviceapp",
      youtube: "https://youtube.com/serviceapp",
      linkedin: "https://linkedin.com/company/serviceapp",
    };

    Linking.openURL(urls[platform]).catch(() => {
      Alert.alert("Lỗi", "Không thể mở liên kết");
    });
  };

  const handleCall = () => {
    Linking.openURL("tel:1900123456");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@serviceapp.com");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "company":
        return (
          <View>
            <View style={styles.aboutSection}>
              <View style={styles.companyLogo}>
                <Text style={styles.logoIcon}>📚</Text>
                <Text style={styles.companyName}>TutorApp</Text>
                <Text style={styles.companySlogan}>
                  "Kết nối học viên - Gia sư chuyên nghiệp"
                </Text>
              </View>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Sứ mệnh & Tầm nhìn</Text>
              <Text style={styles.missionText}>
                Sứ mệnh: Kết nối học viên với gia sư uy tín, nâng cao hiệu quả học tập.
              </Text>
              <Text style={styles.missionText}>
                Tầm nhìn: Trở thành nền tảng gia sư hàng đầu Việt Nam, dễ dàng tìm kiếm và học tập.
              </Text>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Giá trị cốt lõi</Text>
              <View style={styles.coreValuesContainer}>
                {coreValues.map((value, index) => (
                  <View key={index} style={styles.valueItem}>
                    <Text style={styles.valueIcon}>{value.icon}</Text>
                    <Text style={styles.valueTitle}>{value.title}</Text>
                    <Text style={styles.valueDescription}>{value.description}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Thành tựu</Text>
              <View style={styles.achievementsGrid}>
                {achievements.map((achievement, index) => (
                  <View key={index} style={styles.achievementCard}>
                    <Text style={styles.achievementNumber}>{achievement.number}</Text>
                    <Text style={styles.achievementLabel}>{achievement.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Lịch sử phát triển</Text>
              <View style={styles.timelineContainer}>
                {timeline.map((item, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineYear}>
                      <Text style={styles.timelineYearText}>{item.year}</Text>
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>{item.title}</Text>
                      <Text style={styles.timelineDescription}>{item.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );

      case "team":
        return (
          <View>
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Đội ngũ gia sư</Text>
              <Text style={styles.teamIntroText}>
                Chúng tôi có đội ngũ gia sư uy tín, chuyên môn cao, tận tâm với học viên.
              </Text>
            </View>

            <View style={styles.teamMembersContainer}>
              {tutors.map((tutor) => (
                <View key={tutor.id} style={styles.teamMemberCard}>
                  <Text style={styles.teamMemberAvatar}>{tutor.avatar}</Text>
                  <View style={styles.teamMemberInfo}>
                    <Text style={styles.teamMemberName}>{tutor.name}</Text>
                    <Text style={styles.teamMemberPosition}>{tutor.subject}</Text>
                    <Text style={styles.teamMemberDescription}>{tutor.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );

      case "contact":
        return (
          <View>
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
              <TouchableOpacity style={styles.contactInfoItem} onPress={handleCall}>
                <Text style={styles.contactInfoIcon}>📞</Text>
                <View style={styles.contactInfoContent}>
                  <Text style={styles.contactInfoTitle}>Hotline</Text>
                  <Text style={styles.contactInfoText}>1900 123 456</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactInfoItem} onPress={handleEmail}>
                <Text style={styles.contactInfoIcon}>✉️</Text>
                <View style={styles.contactInfoContent}>
                  <Text style={styles.contactInfoTitle}>Email</Text>
                  <Text style={styles.contactInfoText}>support@tutorapp.com</Text>
                </View>
              </TouchableOpacity>
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
        <Text style={styles.screenTitle}>Về chúng tôi</Text>
        <View />
      </View>

      <View style={styles.aboutTabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.aboutTab,
              activeTab === tab.id && styles.activeAboutTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.aboutTabText,
                activeTab === tab.id && styles.activeAboutTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.aboutContent}>{renderTabContent()}</ScrollView>

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default AboutUsScreen;
