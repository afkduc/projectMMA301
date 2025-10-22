"use client"
import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from "react-native"
import { styles } from "@style/styles"
import UserService from "@service/UserService"
import DataInitializer from "@utils/DataInitializer"
import { users } from "@data/mockData"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginScreen = ({ onLogin, onRegister, onForgotPassword }) => {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [useFirebase, setUseFirebase] = useState(false)

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    try {
      setInitializing(true)
      const firebaseAvailable = await DataInitializer.initializeData()
      setUseFirebase(firebaseAvailable)

      if (!firebaseAvailable) {
        console.log("Using offline mode with mock data")
      }
    } catch (error) {
      console.error("Error initializing app:", error)
      setUseFirebase(false)
      console.log("Falling back to offline mode")
    } finally {
      setInitializing(false)
    }
  }

  const handleLogin = async () => {
    const trimmedPhone = phone.trim()
    const trimmedPassword = password.trim()

    if (!trimmedPhone || !trimmedPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin")
      return
    }

    try {
      setLoading(true)
      let user = null

      if (useFirebase) {
        try {
          user = await UserService.authenticateUser(phone, password)
          await AsyncStorage.setItem("currentUserId", user.id)
        } catch (error) {
          console.error("Firebase authentication error:", error)
          user = users.find((u) => u.phone === phone && u.password === password)
        }
      } else {
        user = users.find((u) => u.phone === phone && u.password === password)
      }

      if (user) {
        if (user.status === "blocked") {
          Alert.alert("Tài khoản bị khóa", "Vui lòng liên hệ admin.")
          return
        }
        onLogin(user.role, user)
      } else {
        Alert.alert("Lỗi", "Số điện thoại hoặc mật khẩu không đúng")
      }
    } catch (error) {
      console.error("Login error:", error)
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng nhập.")
    } finally {
      setLoading(false)
    }
  }

  if (initializing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.content, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={{ marginTop: 20, fontSize: 16, color: "#6b7280" }}>Đang khởi tạo ứng dụng...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🔧</Text>
          <Text style={styles.title}>Thợ Gần Tôi</Text>
          <Text style={styles.subtitle}>Tìm thợ sửa chữa gần bạn</Text>
          {!useFirebase && <Text style={{ fontSize: 12, color: "#ef4444", marginTop: 5 }}>📱 Chế độ offline</Text>}
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity style={styles.forgotPasswordButton} onPress={onForgotPassword} disabled={loading}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Đăng nhập</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerButton} onPress={onRegister} disabled={loading}>
            <Text style={styles.registerButtonText}>Chưa có tài khoản? Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
