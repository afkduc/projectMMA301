import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "../../style/styles";
import { TutorBottomNav } from "../../components/BottomNavigation";

const TutorScheduleScreen = ({ onTabPress, onBack }) => {
  const [schedule, setSchedule] = useState({
    monday: { enabled: true, start: "08:00", end: "18:00" },
    tuesday: { enabled: true, start: "08:00", end: "18:00" },
    wednesday: { enabled: true, start: "08:00", end: "18:00" },
    thursday: { enabled: true, start: "08:00", end: "18:00" },
    friday: { enabled: true, start: "08:00", end: "18:00" },
    saturday: { enabled: true, start: "09:00", end: "17:00" },
    sunday: { enabled: false, start: "09:00", end: "17:00" },
  });

  const [workingAreas, setWorkingAreas] = useState([
    { id: "1", name: "Quận 1", enabled: true },
    { id: "2", name: "Quận 3", enabled: true },
    { id: "3", name: "Quận 5", enabled: false },
    { id: "4", name: "Quận 7", enabled: true },
    { id: "5", name: "Quận Bình Thạnh", enabled: false },
  ]);

  const dayNames = {
    monday: "Thứ 2",
    tuesday: "Thứ 3",
    wednesday: "Thứ 4",
    thursday: "Thứ 5",
    friday: "Thứ 6",
    saturday: "Thứ 7",
    sunday: "Chủ nhật",
  };

  const timeSlots = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const handleToggleDay = (day) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        enabled: !schedule[day].enabled,
      },
    });
  };

  const handleTimeChange = (day, type, time) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [type]: time,
      },
    });
  };

  const handleToggleArea = (areaId) => {
    setWorkingAreas(
      workingAreas.map((area) =>
        area.id === areaId ? { ...area, enabled: !area.enabled } : area
      )
    );
  };

  const handleSaveSchedule = () => {
    Alert.alert("Thành công", "Đã cập nhật lịch dạy");
  };

  const renderTimeSelector = (day, type, currentTime) => (
    <View style={styles.timeSelector}>
      <Text style={styles.timeSelectorLabel}>
        {type === "start" ? "Từ" : "Đến"}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.timeScrollView}
      >
        {timeSlots.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeSlot,
              currentTime === time && styles.selectedTimeSlot,
            ]}
            onPress={() => handleTimeChange(day, type, time)}
          >
            <Text
              style={[
                styles.timeSlotText,
                currentTime === time && styles.selectedTimeSlotText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Lịch dạy</Text>
        <TouchableOpacity onPress={handleSaveSchedule}>
          <Text style={styles.saveScheduleButton}>Lưu</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scheduleContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Working Hours */}
        <View style={styles.scheduleSection}>
          <Text style={styles.scheduleSectionTitle}>Khung giờ dạy</Text>
          {Object.entries(schedule).map(([day, daySchedule]) => (
            <View key={day} style={styles.dayScheduleCard}>
              <View style={styles.dayHeader}>
                <View style={styles.dayInfo}>
                  <Text style={styles.dayName}>{dayNames[day]}</Text>
                  <TouchableOpacity
                    style={[
                      styles.dayToggle,
                      daySchedule.enabled && styles.dayToggleActive,
                    ]}
                    onPress={() => handleToggleDay(day)}
                  >
                    <Text
                      style={[
                        styles.dayToggleText,
                        daySchedule.enabled && styles.dayToggleActiveText,
                      ]}
                    >
                      {daySchedule.enabled ? "Mở" : "Đóng"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {daySchedule.enabled && (
                <View style={styles.timeSelectors}>
                  {renderTimeSelector(day, "start", daySchedule.start)}
                  {renderTimeSelector(day, "end", daySchedule.end)}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Working Areas */}
        <View style={styles.scheduleSection}>
          <Text style={styles.scheduleSectionTitle}>Khu vực dạy</Text>
          <View style={styles.areasContainer}>
            {workingAreas.map((area) => (
              <TouchableOpacity
                key={area.id}
                style={[styles.areaChip, area.enabled && styles.areaChipActive]}
                onPress={() => handleToggleArea(area.id)}
              >
                <Text
                  style={[
                    styles.areaChipText,
                    area.enabled && styles.areaChipActiveText,
                  ]}
                >
                  {area.name}
                </Text>
                {area.enabled && <Text style={styles.areaChipCheck}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Settings */}
        <View style={styles.scheduleSection}>
          <Text style={styles.scheduleSectionTitle}>Cài đặt nhanh</Text>
          <View style={styles.quickSettings}>
            <TouchableOpacity
              style={styles.quickSettingButton}
              onPress={() => {
                const newSchedule = { ...schedule };
                Object.keys(newSchedule).forEach((day) => {
                  if (day !== "sunday") {
                    newSchedule[day] = {
                      enabled: true,
                      start: "08:00",
                      end: "18:00",
                    };
                  }
                });
                setSchedule(newSchedule);
                Alert.alert("Thành công", "Đã áp dụng lịch dạy hành chính");
              }}
            >
              <Text style={styles.quickSettingButtonText}>🕘 Giờ hành chính</Text>
              <Text style={styles.quickSettingButtonSubtext}>
                T2–T6: 8:00–18:00
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickSettingButton}
              onPress={() => {
                const newSchedule = { ...schedule };
                Object.keys(newSchedule).forEach((day) => {
                  newSchedule[day] = {
                    enabled: true,
                    start: "06:00",
                    end: "22:00",
                  };
                });
                setSchedule(newSchedule);
                Alert.alert("Thành công", "Đã áp dụng lịch dạy cả tuần");
              }}
            >
              <Text style={styles.quickSettingButtonText}>🌅 Cả tuần</Text>
              <Text style={styles.quickSettingButtonSubtext}>
                Tất cả: 6:00–22:00
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.scheduleSection}>
          <Text style={styles.scheduleSectionTitle}>Thống kê</Text>
          <View style={styles.scheduleStats}>
            <View style={styles.scheduleStatItem}>
              <Text style={styles.scheduleStatNumber}>
                {Object.values(schedule).filter((day) => day.enabled).length}
              </Text>
              <Text style={styles.scheduleStatLabel}>Ngày dạy</Text>
            </View>
            <View style={styles.scheduleStatItem}>
              <Text style={styles.scheduleStatNumber}>
                {workingAreas.filter((area) => area.enabled).length}
              </Text>
              <Text style={styles.scheduleStatLabel}>Khu vực nhận lớp</Text>
            </View>
            <View style={styles.scheduleStatItem}>
              <Text style={styles.scheduleStatNumber}>
                {Object.values(schedule)
                  .filter((day) => day.enabled)
                  .reduce((total, day) => {
                    const start = Number.parseInt(day.start.split(":")[0]);
                    const end = Number.parseInt(day.end.split(":")[0]);
                    return total + (end - start);
                  }, 0)}
                h
              </Text>
              <Text style={styles.scheduleStatLabel}>Tổng giờ/tuần</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  );
};

export default TutorScheduleScreen;
