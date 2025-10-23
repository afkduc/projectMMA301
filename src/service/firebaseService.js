// @service/firebaseService.js
import { database } from "@config/configFirebase"
import {
  ref,
  push,
  set,
  get,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database"

class FirebaseService {
  // 🔌 Kiểm tra kết nối Firebase
  async checkConnection() {
    try {
      const connectedRef = ref(database, ".info/connected")
      return new Promise((resolve) => {
        onValue(
          connectedRef,
          (snapshot) => {
            const isConnected = snapshot.val() === true
            console.log(isConnected ? "✅ Firebase connected" : "❌ Firebase disconnected")
            resolve(isConnected)
          },
          { onlyOnce: true }
        )
      })
    } catch (error) {
      console.error("❌ Error checking Firebase connection:", error)
      return false
    }
  }

  //  Tạo dữ liệu mới
  async create(basePath, data) {
    try {
      const dataRef = ref(database, basePath)
      const newRef = push(dataRef)
      await set(newRef, data)
      return newRef.key
    } catch (error) {
      console.error("❌ Error creating data:", error)
      throw error
    }
  }

  //  Đọc dữ liệu một bản ghi
  async read(path) {
    try {
      const snapshot = await get(ref(database, path))
      return snapshot.exists() ? snapshot.val() : null
    } catch (error) {
      console.error("❌ Error reading data:", error)
      throw error
    }
  }

  //  Đọc tất cả dữ liệu trong path
  async readAll(basePath) {
    try {
      const snapshot = await get(ref(database, basePath))
      if (snapshot.exists()) {
        const data = snapshot.val()
        return Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      }
      return []
    } catch (error) {
      console.error("❌ Error reading all data:", error)
      throw error
    }
  }

  //  Cập nhật dữ liệu
  async update(path, data) {
    try {
      await update(ref(database, path), data)
      return true
    } catch (error) {
      console.error("❌ Error updating data:", error)
      throw error
    }
  }

  //  Xóa dữ liệu
  async delete(path) {
    try {
      await remove(ref(database, path))
      return true
    } catch (error) {
      console.error("❌ Error deleting data:", error)
      throw error
    }
  }

  //  Truy vấn theo trường
  async queryByField(basePath, field, value) {
    try {
      const dataRef = query(ref(database, basePath), orderByChild(field), equalTo(value))
      const snapshot = await get(dataRef)
      if (snapshot.exists()) {
        const data = snapshot.val()
        return Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      }
      return []
    } catch (error) {
      console.error("❌ Error querying data:", error)
      throw error
    }
  }

  // Lắng nghe thay đổi real-time
  listen(basePath, callback) {
    try {
      const dataRef = ref(database, basePath)
      return onValue(dataRef, (snapshot) => {
        const data = snapshot.val()
        const dataArray = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : []
        callback(dataArray)
      })
    } catch (error) {
      console.error("❌ Error listening to data:", error)
      throw error
    }
  }
}

export default new FirebaseService()
