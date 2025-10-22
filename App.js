import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { listenAddresses, addAddress } from "./src/service/firebaseService";

export default function App() {
  useEffect(() => {
    // 🔊 Lắng nghe dữ liệu Realtime
    listenAddresses();

    // ➕ Thêm dữ liệu mẫu
    addAddress({
      address: "123 Nguyễn Văn Cừ, Quận 5",
      phone: "0909999999",
      title: "Nhà test từ React Native",
      isDefault: false,
      userId: "3",
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Firebase Realtime Database Connected ✅
      </Text>
    </View>
  );
}
