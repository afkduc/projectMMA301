import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { styles } from "../../style/styles";
import { TutorBottomNav } from "../../components/BottomNavigation";

const TutorSkillsScreen = ({ onTabPress, onBack }) => {
  const [skills, setSkills] = useState([
    { id: "1", name: "Toán THPT", level: "expert", verified: true },
    { id: "2", name: "Tiếng Anh giao tiếp", level: "expert", verified: true },
    { id: "3", name: "Vật Lý lớp 10–12", level: "intermediate", verified: false },
    { id: "4", name: "Lập trình Python cơ bản", level: "beginner", verified: false },
  ]);

  const [availableSkills] = useState([
    "Hóa học THPT",
    "Ngữ văn THCS",
    "IELT 6.5",
    "TOEIC 600+",
    "Sinh học THPT",
    "Địa lý THCS",
    "Lịch sử THPT",
    "Tin học văn phòng",
    "Lập trình Java",
    "React Native căn bản",
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("beginner");

  const skillLevels = [
    { id: "beginner", name: "Cơ bản (mới dạy)", color: "#f59e0b" },
    { id: "intermediate", name: "Khá (kinh nghiệm)", color: "#3b82f6" },
    { id: "expert", name: "Chuyên gia (lâu năm)", color: "#10b981" },
  ];

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên môn/kỹ năng giảng dạy");
      return;
    }

    const exists = skills.find(
      (s) => s.name.toLowerCase().trim() === newSkill.toLowerCase().trim()
    );
    if (exists) {
      Alert.alert("Lỗi", "Môn/kỹ năng này đã tồn tại trong danh sách");
      return;
    }

    const newSkillObj = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: selectedLevel,
      verified: false,
    };
    setSkills([...skills, newSkillObj]);
    setNewSkill("");
    Alert.alert("Thành công", "Đã thêm môn/kỹ năng giảng dạy");
  };

  const handleRemoveSkill = (skillId) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa môn/kỹ năng này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          setSkills(skills.filter((s) => s.id !== skillId));
          Alert.alert("Đã xóa", "Môn/kỹ năng đã được xóa");
        },
      },
    ]);
  };

  const handleUpdateSkillLevel = (skillId, newLevel) => {
    setSkills(
      skills.map((s) => (s.id === skillId ? { ...s, level: newLevel } : s))
    );
    Alert.alert("Thành công", "Đã cập nhật mức độ giảng dạy");
  };

  const handleRequestVerification = (skillId) => {
    Alert.alert(
      "Yêu cầu xác minh",
      "Gửi yêu cầu xác minh chứng chỉ/chuyên môn cho môn/kỹ năng này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Gửi yêu cầu",
          onPress: () => {
            Alert.alert(
              "Đã gửi",
              "Yêu cầu xác minh đã được gửi. Chúng tôi sẽ phản hồi trong 3–5 ngày làm việc."
            );
          },
        },
      ]
    );
  };

  const getLevelColor = (level) => {
    const levelData = skillLevels.find((l) => l.id === level);
    return levelData?.color || "#6b7280";
  };

  const getLevelName = (level) => {
    const levelData = skillLevels.find((l) => l.id === level);
    return levelData?.name || level;
  };

  const renderSkill = ({ item }) => (
    <View style={styles.skillManagementCard}>
      <View style={styles.skillManagementHeader}>
        <View style={styles.skillManagementInfo}>
          <Text style={styles.skillManagementName}>{item.name}</Text>
          <View style={styles.skillManagementMeta}>
            <View
              style={[
                styles.skillLevelBadge,
                { backgroundColor: getLevelColor(item.level) + "20" },
              ]}
            >
              <Text
                style={[
                  styles.skillLevelText,
                  { color: getLevelColor(item.level) },
                ]}
              >
                {getLevelName(item.level)}
              </Text>
            </View>
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Đã xác minh chứng chỉ</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => handleRemoveSkill(item.id)}>
          <Text style={styles.removeSkillButton}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.skillManagementActions}>
        <Text style={styles.skillActionLabel}>Mức độ giảng dạy:</Text>
        <View style={styles.skillLevelSelector}>
          {skillLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.skillLevelOption,
                item.level === level.id && styles.selectedSkillLevel,
                { borderColor: level.color },
              ]}
              onPress={() => handleUpdateSkillLevel(item.id, level.id)}
            >
              <Text
                style={[
                  styles.skillLevelOptionText,
                  item.level === level.id && {
                    color: level.color,
                    fontWeight: "600",
                  },
                ]}
              >
                {level.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {!item.verified && (
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={() => handleRequestVerification(item.id)}
          >
            <Text style={styles.verifyButtonText}>Yêu cầu xác minh chứng chỉ</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderSuggestedSkill = (skillName) => (
    <TouchableOpacity
      key={skillName}
      style={styles.suggestedSkillChip}
      onPress={() => setNewSkill(skillName)}
    >
      <Text style={styles.suggestedSkillText}>{skillName}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Môn & kỹ năng giảng dạy</Text>
        <View />
      </View>

      <ScrollView
        style={styles.skillsContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Add New Skill */}
        <View style={styles.addSkillSection}>
          <Text style={styles.addSkillTitle}>Thêm môn/kỹ năng</Text>

          <View style={styles.addSkillForm}>
            <TextInput
              style={styles.skillInput}
              placeholder="VD: Toán THPT / IELTS 5.0–6.5 / Python cơ bản"
              value={newSkill}
              onChangeText={setNewSkill}
            />

            <Text style={styles.levelSelectorLabel}>Mức độ giảng dạy:</Text>
            <View style={styles.levelSelectorContainer}>
              {skillLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.levelSelectorButton,
                    selectedLevel === level.id && styles.selectedLevelButton,
                    { borderColor: level.color },
                  ]}
                  onPress={() => setSelectedLevel(level.id)}
                >
                  <Text
                    style={[
                      styles.levelSelectorText,
                      selectedLevel === level.id && {
                        color: level.color,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {level.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.addSkillSubmitButton}
              onPress={handleAddSkill}
            >
              <Text style={styles.addSkillSubmitButtonText}>Thêm vào danh sách</Text>
            </TouchableOpacity>
          </View>

          {/* Suggested Skills */}
          <View style={styles.suggestedSkillsSection}>
            <Text style={styles.suggestedSkillsTitle}>Gợi ý phổ biến:</Text>
            <View style={styles.suggestedSkillsContainer}>
              {availableSkills.map((skill) => renderSuggestedSkill(skill))}
            </View>
          </View>
        </View>

        {/* Skills List */}
        <View style={styles.skillsListSection}>
          <View style={styles.skillsListHeader}>
            <Text style={styles.skillsListTitle}>
              Danh sách môn/kỹ năng ({skills.length})
            </Text>
            <View style={styles.skillsStats}>
              <Text style={styles.skillsStatsText}>
                {skills.filter((s) => s.verified).length} đã xác minh
              </Text>
            </View>
          </View>

          <FlatList
            data={skills}
            renderItem={renderSkill}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.skillsList}
          />
        </View>
      </ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  );
};

export default TutorSkillsScreen;
