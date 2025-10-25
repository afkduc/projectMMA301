    // utils/auth.js
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getCurrentUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("currentUserId")
    return userId
  } catch (error) {
    console.error("Lỗi khi lấy userId:", error)
    return null
  }
}
