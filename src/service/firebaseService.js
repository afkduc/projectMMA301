import { database } from "../config/configFirebase";
import {
  ref,
  push,
  set,
  get,
  update,
  remove,
  onValue,
  query,
  orderByChild,
  equalTo,
  off,
} from "firebase/database";

class FirebaseService {
  // Tạo dữ liệu mới (id tự động)
  async create(path, data) {
    try {
      const dataRef = ref(database, path);
      const newRef = push(dataRef);
      const newData = {
        ...data,
        id: newRef.key,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await set(newRef, newData);
      return newRef.key;
    } catch (error) {
      console.error("❌ Error creating data:", error);
      throw error;
    }
  }

  // Tạo dữ liệu mới với id chỉ định
  async createWithId(path, id, data) {
    try {
      const dataRef = ref(database, `${path}/${id}`);
      const newData = {
        ...data,
        id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await set(dataRef, newData);
      return id;
    } catch (error) {
      console.error("❌ Error creating data with ID:", error);
      throw error;
    }
  }

  // Đọc một mục
  async read(path) {
    try {
      const dataRef = ref(database, path.split("/").slice(0, -1).join("/"));
      const snapshot = await get(dataRef);
      if (!snapshot.exists()) return null;
      const data = snapshot.val();
      const targetId = path.split("/").pop();
      if (typeof data === "object") {
        const items = Object.values(data);
        const matchedItem = items.find((item) => item?.id == targetId);
        return matchedItem ? { ...matchedItem, id: matchedItem.id ?? null } : null;
      }

      return null;
    } catch (error) {
      console.error("❌ Error reading data:", error);
      throw error;
    }
  }

  // Đọc toàn bộ danh sách và dùng id bên trong nếu có
  async readAll(path) {
    try {
      const dataRef = ref(database, path);
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.values(data).map((item) => ({
          ...item,
          id: item.id ?? null, // Lấy id từ bên trong
        }));
      }
      return [];
    } catch (error) {
      console.error("❌ Error reading all data:", error);
      return [];
    }
  }

  // Cập nhật dữ liệu
  async update(path, data) {
    try {
      const dataRef = ref(database, path);
      const updateData = {
        ...data,
        updatedAt: Date.now(),
      };
      await update(dataRef, updateData);
      return true;
    } catch (error) {
      console.error("❌ Error updating data:", error);
      throw error;
    }
  }

  // Xoá dữ liệu
  async delete(path) {
    try {
      const dataRef = ref(database, path);
      await remove(dataRef);
      return true;
    } catch (error) {
      console.error("❌ Error deleting data:", error);
      throw error;
    }
  }

  // Lắng nghe thay đổi real-time
  listen(path, callback) {
    try {
      const dataRef = ref(database, path);
      const unsubscribe = onValue(
        dataRef,
        (snapshot) => {
          const raw = snapshot.val();
          const result = raw
            ? Object.values(raw).map((item) => ({
                ...item,
                id: item.id ?? null, // Lấy id từ bên trong nếu có
              }))
            : [];
          callback(result);
        },
        (error) => {
          console.error("❌ Firebase listener error:", error);
        }
      );
      return unsubscribe;
    } catch (error) {
      console.error("❌ Error setting up listener:", error);
      return () => {};
    }
  }

  // Truy vấn theo field = value
  async queryByField(path, field, value) {
    if (value === undefined || value === null || value === "") {
      console.warn(`⚠️ Invalid query value for field ${field}:`, value);
      return [];
    }

    try {
      const dataRef = ref(database, path);
      const queryRef = query(dataRef, orderByChild(field), equalTo(value));
      const snapshot = await get(queryRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.values(data).map((item) => ({
          ...item,
          id: item.id ?? null,
        }));
      }
      return [];
    } catch (error) {
      console.error("❌ Error querying data:", error);
      return [];
    }
  }

  // Kiểm tra kết nối Firebase
  async checkConnection(timeoutMs = 3000) {
    return new Promise((resolve) => {
      const connectedRef = ref(database, ".info/connected");
      const timeout = setTimeout(() => {
        resolve(false);
        off(connectedRef);
      }, timeoutMs);

      onValue(connectedRef, (snapshot) => {
        if (snapshot.val() === true) {
          clearTimeout(timeout);
          resolve(true);
          off(connectedRef);
        }
      });
    });
  }

  // Lấy tất cả node + key Firebase
async readAllWithKeys(path) {
  try {
    const dataRef = ref(database, path)
    const snapshot = await get(dataRef)
    if (snapshot.exists()) {
      const data = snapshot.val()
      return Object.entries(data).map(([firebaseKey, item]) => ({
        firebaseKey,
        ...item,
      }))
    }
    return []
  } catch (error) {
    console.error("❌ Error reading all data with keys:", error)
    return []
  }
}

}

export default new FirebaseService();
