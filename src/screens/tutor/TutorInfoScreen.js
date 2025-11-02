import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator
} from "react-native"
import { styles } from "../../style/additional"
import { TutorBottomNav } from "../../components/BottomNavigation"
import TutorService from "../../service/tutorService"
import UserService from "../../service/UserService"

const TutorInfoScreen = ({ currentUser, onTabPress, onBack }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tutorInfo, setTutorInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        if (!currentUser?.id) return

        const allTutors = await TutorService.getAllTutors()
        const tutor = allTutors.find(w => String(w.userId) === String(currentUser.id))
        if (!tutor) return

        const user = await UserService.getUserById(tutor.userId)

        const totalIncome = 2400000 // fake data

        setTutorInfo({
          ...tutor,
          email: user?.email,
          specialty: user?.specialty,
          completedOrders: user?.completedOrders,
          certificate: user?.certificate,
          area: user?.area,
          income: totalIncome
        })
      } catch (err) {
        // Do nothing for now
      } finally {
        setLoading(false)
      }
    }
    fetchTutorData()
  }, [currentUser])

  const handleSave = async () => {
    try {
      await TutorService.updateTutor(tutorInfo.id, {
        name: tutorInfo.name,
        phone: tutorInfo.phone,
        price: tutorInfo.price,
        experience: tutorInfo.experience,
        status: tutorInfo.status
      })
      setIsEditing(false)
    } catch (err) {
      // Handle error
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const updateInfo = (field, value) => {
    setTutorInfo((prev) => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#10b981" style={{ marginTop: 20 }} />
    )
  }

  if (!tutorInfo) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>Không tìm thấy thông tin gia sư.</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Thông tin gia sư</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButton}>{isEditing ? "Hủy" : "Sửa"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.workerInfoContent}>
        <View style={styles.workerInfoAvatar}>
          <Text style={styles.avatarIcon}>{tutorInfo.avatar || "👩‍🏫"}</Text>
          <Text style={styles.workerInfoName}>{tutorInfo.name}</Text>
          <Text style={styles.workerInfoSpecialty}>{tutorInfo.specialty}</Text>
          <View style={styles.workerInfoRating}>
            <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.ratingText}>{tutorInfo.rating} ({tutorInfo.reviews} đánh giá)</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Họ tên</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={tutorInfo.name}
                onChangeText={(text) => updateInfo("name", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{tutorInfo.name}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={tutorInfo.phone}
                onChangeText={(text) => updateInfo("phone", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{tutorInfo.phone}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{tutorInfo.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Khu vực</Text>
            <Text style={styles.infoValue}>{tutorInfo.area}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thông tin giảng dạy</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Môn dạy/Chuyên môn</Text>
            <Text style={styles.infoValue}>{tutorInfo.specialty}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kinh nghiệm</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={tutorInfo.experience}
                onChangeText={(text) => updateInfo("experience", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{tutorInfo.experience}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Học phí theo giờ</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={tutorInfo.price}
                onChangeText={(text) => updateInfo("price", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{tutorInfo.price}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Chứng chỉ</Text>
            <Text style={styles.infoValue}>{tutorInfo.certificate}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Thống kê</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{tutorInfo.completedOrders || 0}</Text>
              <Text style={styles.statLabel}>Lớp đã hoàn thành</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{tutorInfo.rating || 0}</Text>
              <Text style={styles.statLabel}>Đánh giá TB</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Tỷ lệ hoàn thành</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{(tutorInfo.income || 0).toLocaleString()}đ</Text>
              <Text style={styles.statLabel}>Thu nhập tháng</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Trạng thái</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sẵn sàng nhận lớp</Text>
            <Switch
              value={tutorInfo.status === true}
              onValueChange={async (val) => {
                try {
                  await TutorService.updateTutor(tutorInfo.id, { status: val })
                  setTutorInfo({ ...tutorInfo, status: val })
                } catch (err) {
                  // Handle error
                }
              }}
              trackColor={{ false: "#e5e7eb", true: "#10b981" }}
              thumbColor={tutorInfo.status ? "#ffffff" : "#f3f4f6"}
            />
          </View>
        </View>

        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelEditButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelEditButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveEditButton}
              onPress={handleSave}
            >
              <Text style={styles.saveEditButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <TutorBottomNav onTabPress={onTabPress} activeTab="tutorProfile" />
    </SafeAreaView>
  )
}

export default TutorInfoScreen
