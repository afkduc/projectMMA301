import { Linking } from 'react-native';

export const sendSms = async (phone, message) => {
  const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
  const canOpen = await Linking.canOpenURL(smsUrl);

  if (canOpen) {
    await Linking.openURL(smsUrl);
    return true;
  } else {
    console.warn('Không thể mở ứng dụng SMS');
    return false;
  }
};
