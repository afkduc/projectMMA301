'use client';

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import UserService from "@service/UserService"
import OtpService from "@service/otpService";
import { sendSms } from "@utils/smsService"; 

const ForgotPasswordScreen = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1); // 1: input phonenumber, 2: OTP, 3: new password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    let interval = null;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const validatePhone = (phoneNumber) => {
    const regex = /^(0\d{9}|\+84\d{9})$/;
    return regex.test(phoneNumber);
  };

  const getInternationalPhone = (phone) => {
    return phone.startsWith('0') ? '+84' + phone.slice(1) : phone;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSendOTP = async () => {
    setError('');
    if (!validatePhone(phone)) {
      setError('Số điện thoại không hợp lệ');
      return;
    }

    setLoading(true);
    try {
      const user = await UserService.getUserByPhone(phone);
      if (!user || !user.id) {
        setError('Số điện thoại không tồn tại trong hệ thống');
        return;
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      await OtpService.sendOtp(otpCode, user.id);
      await sendSms(getInternationalPhone(phone), `Mã OTP của bạn là: ${otpCode}`);
      setUserId(user.id);
      setCountdown(60);
      setStep(2);
      Alert.alert('Đã gửi mã OTP', `OTP đã được gửi đến ${phone}`);
    } catch (err) {
      console.error('Lỗi gửi OTP:', err);
      setError('Không thể gửi mã OTP. Thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    if (otp.length !== 6) {
      setError('Mã OTP phải gồm 6 số');
      return;
    }

    setLoading(true);
    try {
      const result = await OtpService.verifyOtp(userId, otp);
      if (result.success) {
        setStep(3);
        Alert.alert('Thành công', 'Mã OTP hợp lệ');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Lỗi xác minh OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    if (!validatePassword(newPassword)) {
      setError('Mật khẩu phải từ 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Xác nhận mật khẩu không khớp');
      return;
    }

    setLoading(true);
    try {
      const success = await UserService.resetPasswordByPhone(phone, newPassword);
      if (success) {
        Alert.alert('Đặt lại thành công', 'Mật khẩu đã được cập nhật', [
          { text: 'OK', onPress: onBackToLogin },
        ]);
      } else {
        setError('Không thể đặt lại mật khẩu. Thử lại.');
      }
    } catch (err) {
      setError('Lỗi đặt lại mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setLoading(true);
    try {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      await OtpService.sendOtp(otpCode, userId);
      await sendSms(getInternationalPhone(phone), `Mã OTP của bạn là: ${otpCode}`);
      setCountdown(60);
      Alert.alert('Gửi lại thành công', 'OTP mới đã được gửi');
    } catch (err) {
      setError('Không thể gửi lại OTP');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              placeholder="Nhập số điện thoại"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSendOTP}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Gửi mã OTP</Text>
            </TouchableOpacity>
          </>
        );

      case 2:
        return (
          <>
            <Text style={styles.label}>Mã OTP</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
              placeholder="Nhập mã OTP"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              style={styles.button}
              onPress={handleVerifyOTP}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Xác minh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={countdown > 0 || loading}
            >
              <Text style={{ color: countdown > 0 ? '#aaa' : '#007bff' }}>
                {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi lại mã OTP'}
              </Text>
            </TouchableOpacity>
          </>
        );

      case 3:
        return (
          <>
            <Text style={styles.label}>Mật khẩu mới</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Nhập mật khẩu mới"
            />
            <Text style={styles.label}>Xác nhận mật khẩu</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Xác nhận lại mật khẩu"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
            </TouchableOpacity>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Quên mật khẩu</Text>
          {renderStepContent()}
          <TouchableOpacity onPress={onBackToLogin} style={{ marginTop: 20 }}>
            <Text style={{ color: '#007bff' }}>Quay lại đăng nhập</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  wrapper: { flex: 1 },
  content: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
