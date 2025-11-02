import React, { useEffect, useMemo, useState } from "react";
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
import { getCurrentUserId } from "../../utils/auth";
import TutorService from "../../service/tutorService";

const TutorScheduleScreen = ({ onTabPress, onBack }) => {
  // ----- STATE -----
  const [schedule, setSchedule] = useState({
    monday: { enabled: true, start: "08:00", end: "18:00" },
    tuesday: { enabled: true, start: "08:00", end: "18:00" },
    wednesday: { enabled: true, start: "08:00", end: "18:00" },
    thursday: { enabled: true, start: "08:00", end: "18:00" },
    friday: { enabled: true, start: "08:00", end: "18:00" },
    saturday: { enabled: true, start: "09:00", end: "17:00" },
    sunday: { enabled: false, start: "09:00", end: "17:00" },
  });

  // Danh sách khu vực "chuẩn" (id cố định) – có thể tái sử dụng giống bên TutorAreaScreen
  const AREA_MASTER = useMemo(
    () => [
      { id: "caugiay", name: "Cầu Giấy" },
      { id: "thanhxuan", name: "Thanh Xuân" },
      { id: "dongda", name: "Đống Đa" },
      { id: "bactuliem", name: "Bắc Từ Liêm" },
      { id: "mydinh", name: "Mỹ Đình" },
      { id: "longbien", name: "Long Biên" },
      { id: "thanhtri", name: "Thanh Trì" },
      { id: "tayho", name: "Tây Hồ" },
    ],
    []
  );

  const [workingAreas, setWorkingAreas] = useState(
    AREA_MASTER.map((a) => ({ ...a, enabled: false }))
  );

  // ----- CONSTANTS -----
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
    "06:00","07:00","08:00","09:00","10:00","11:00",
    "12:00","13:00","14:00","15:00","16:00","17:00",
    "18:00","19:00","20:00","21:00","22:00",
  ];

  // ====== 1) LOAD AREAS & SCHEDULE CỦA TUTOR TỪ DB ======
  useEffect(() => {
    (async () => {
      try {
        const uid = await getCurrentUserId();
        if (!uid) return;

        const tutor = await TutorService.getTutorByUserId(uid);
        if (!tutor) return;

        // Đồng bộ "areas" (đã lưu bên TutorAreaScreen)
        const selectedIds = Array.isArray(tutor.areas) ? tutor.areas.map(String) : [];
        const mergedAreas = AREA_MASTER.map((a) => ({
          ...a,
          enabled: selectedIds.includes(a.id),
        }));
        setWorkingAreas(mergedAreas);

        // Nếu bạn muốn lưu/đồng bộ cả schedule đã từng lưu:
        if (tutor.schedule && typeof tutor.schedule === "object") {
          setSchedule((prev) => ({ ...prev, ...tutor.schedule }));
        }
      } catch (e) {
        // Không chặn UI – chỉ log
        console.warn("Load tutor areas/schedule failed:", e);
      }
    })();
  }, [AREA_MASTER]);

  // ====== HANDLERS ======
  const handleToggleDay = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const handleTimeChange = (day, type, time) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: time },
    }));
  };

  const handleToggleArea = (areaId) => {
    setWorkingAreas((prev) =>
      prev.map((a) =>
        a.id === areaId ? { ...a, enabled: !a.enabled } : a
      )
    );
  };

  const handleSaveSchedule = async () => {
    try {
      const uid = await getCurrentUserId();
      if (!uid) {
        Alert.alert("Lỗi", "Không xác định được người dùng hiện tại.");
        return;
      }
      const tutor = await TutorService.getTutorByUserId(uid);
      if (!tutor?.id) {
        Alert.alert("Lỗi", "Không tìm thấy hồ sơ gia sư.");
        return;
      }

      const enabledAreaIds = workingAreas
        .filter((a) => a.enabled)
        .map((a) => a.id);

      // Ghi đồng bộ: areas + schedule
      await TutorService.updateTutor(tutor.id, {
        areas: enabledAreaIds,
        schedule: schedule,
      });

      Alert.alert("Thành công", "Đã cập nhật lịch dạy & khu vực nhận lớp");
    } catch (e) {
      Alert.alert("Lỗi", "Không thể lưu thay đổi. Vui lòng thử lại.");
    }
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

  // ====== UI ======
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

      <ScrollView style={styles.scheduleContent} showsVerticalScrollIndicator={false}>
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

        {/* Working Areas – đồng bộ với TutorAreaScreen */}
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
                const next = { ...schedule };
                Object.keys(next).forEach((d) => {
                  if (d !== "sunday") {
                    next[d] = { enabled: true, start: "08:00", end: "18:00" };
                  }
                });
                setSchedule(next);
                Alert.alert("Thành công", "Đã áp dụng lịch dạy hành chính");
              }}
            >
              <Text style={styles.quickSettingButtonText}>🕘 Giờ hành chính</Text>
              <Text style={styles.quickSettingButtonSubtext}>T2–T6: 8:00–18:00</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickSettingButton}
              onPress={() => {
                const next = { ...schedule };
                Object.keys(next).forEach((d) => {
                  next[d] = { enabled: true, start: "06:00", end: "22:00" };
                });
                setSchedule(next);
                Alert.alert("Thành công", "Đã áp dụng lịch dạy cả tuần");
              }}
            >
              <Text style={styles.quickSettingButtonText}>🌅 Cả tuần</Text>
              <Text style={styles.quickSettingButtonSubtext}>Tất cả: 6:00–22:00</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.scheduleSection}>
          <Text style={styles.scheduleSectionTitle}>Thống kê</Text>
          <View style={styles.scheduleStats}>
            <View style={styles.scheduleStatItem}>
              <Text style={styles.scheduleStatNumber}>
                {Object.values(schedule).filter((d) => d.enabled).length}
              </Text>
              <Text style={styles.scheduleStatLabel}>Ngày dạy</Text>
            </View>
            <View style={styles.scheduleStatItem}>
              <Text style={styles.scheduleStatNumber}>
                {workingAreas.filter((a) => a.enabled).length}
              </Text>
              <Text style={styles.scheduleStatLabel}>Khu vực nhận lớp</Text>
            </View>
            <View style={styles.scheduleStatItem}>
              <Text style={styles.scheduleStatNumber}>
                {Object.values(schedule)
                  .filter((d) => d.enabled)
                  .reduce((total, d) => {
                    const s = parseInt(d.start.split(":")[0], 10);
                    const e = parseInt(d.end.split(":")[0], 10);
                    return total + (e - s);
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
