// screens/AiAdvisorScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GEMINI_API_KEY } from '../config/apiKeys';

export default function AiAdvisorScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'w1',
      role: 'ai',
      text:
        'Xin chào! Mình là Trợ lý Gia Sư thông minh — mình giúp bạn tìm gia sư, lập lộ trình học và trả lời câu hỏi học tập.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // ✅ HÀM KIỂM TRA CÂU HỎI CÓ LIÊN QUAN "GIA SƯ" KHÔNG
  const isTutorRelated = (text) => {
    const keywords = [
      'gia sư',
      'dạy',
      'học',
      'môn',
      'toán',
      'lý',
      'hóa',
      'văn',
      'anh',
      'sinh',
      'ôn thi',
      'luyện thi',
      'học thử',
      'lộ trình',
      'trường',
      'đại học',
      'trung học',
      'tiểu học',
    ];
    const lower = text.toLowerCase();
    return keywords.some((k) => lower.includes(k));
  };

  const callGemini = async (prompt) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        'Xin lỗi, mình không có câu trả lời lúc này.';

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'ai' && last?.text === '🤖 Đang trả lời...') {
          return [...prev.slice(0, -1), { id: Date.now().toString(), role: 'ai', text: reply }];
        }
        return [...prev, { id: Date.now().toString(), role: 'ai', text: reply }];
      });
    } catch (err) {
      console.error('Gemini lỗi:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'ai',
          text: '⚠️ Không thể kết nối Gemini. Vui lòng thử lại sau.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (textToSend) => {
    const text = textToSend ?? input;
    if (!text || !text.trim()) return;

    // đẩy tin nhắn người dùng
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text }]);
    setInput('');

    // nếu hỏi ngoài chủ đề gia sư → phản hồi nhẹ nhàng
    if (!isTutorRelated(text)) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'ai',
          text:
            'Mình chỉ hỗ trợ các vấn đề liên quan đến **gia sư, học tập, và lộ trình học** thôi nhé ❤️. ' +
            'Các chủ đề khác bạn có thể tham khảo qua các kênh hỗ trợ khác.',
        },
      ]);
      return;
    }

    // nếu hợp lệ → gọi Gemini thật
    setMessages((prev) => [...prev, { id: 'typing-' + Date.now(), role: 'ai', text: '🤖 Đang trả lời...' }]);
    await callGemini(
      `Bạn là trợ lý gia sư. Người dùng hỏi: ${text}.
      Trả lời ngắn gọn, hữu ích, rõ ràng, có thể kèm gợi ý hành động như "Đặt lịch học thử", "Tìm gia sư gần bạn".`
    );
  };

  const handleQuickAction = (actionKey) => {
    const mapping = {
      'find-tutor': 'Tìm gia sư dạy Toán, cấp 3, khu vực Hà Nội, giá hợp lý. Gợi ý 3 lựa chọn + cách liên hệ.',
      'trial-lesson': 'Tôi muốn đăng ký học thử miễn phí cho môn Lý lớp 11. Hướng dẫn các bước cần làm.',
      'study-plan': 'Lập lộ trình học 8 tuần để ôn thi toán học kỳ lớp 10 cho học sinh trung bình, mỗi tuần 3 buổi.',
      'subject-help': 'Giải thích ngắn gọn phương pháp giải bài tích phân cơ bản và ví dụ.',
      'pricing': 'Các mức giá gia sư phổ biến hiện nay cho gia sư đại học dạy kèm tại nhà (1 buổi 90 phút).',
      'contact-support': 'Tôi muốn liên hệ hỗ trợ dịch vụ gia sư. Hãy cho tôi các kênh liên hệ và mẫu tin nhắn sẵn.',
    };
    const prompt = mapping[actionKey];
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text: prompt }]);
    setMessages((prev) => [...prev, { id: 'typing-' + Date.now(), role: 'ai', text: '🤖 Đang trả lời...' }]);
    callGemini(`Bạn là trợ lý gia sư. ${prompt}\nTrả lời ngắn gọn, có gợi ý hành động.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header & Quick Action Grid */}
      <View style={styles.headerWrap}>
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.avatarGradient}>
                <MaterialCommunityIcons name="robot-happy" size={22} color="#fff" />
              </LinearGradient>
              <Text style={styles.headerTitle}>Trợ lý ảo GiaSư.ai</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeBubble}>
            <Text style={styles.welcomeText}>
              Chào bạn! Mình là GiaSư.ai — mình có thể giúp tìm gia sư, lập lộ trình ôn tập, giải bài tập và lên lịch học.
            </Text>
          </View>

          <View style={styles.gridWrap}>
            <TouchableOpacity style={styles.tile} onPress={() => handleQuickAction('find-tutor')}>
              <MaterialCommunityIcons name="magnify" size={20} color="#d32f2f" />
              <Text style={styles.tileText}>Tìm gia sư</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tile} onPress={() => handleQuickAction('trial-lesson')}>
              <MaterialCommunityIcons name="school" size={20} color="#d32f2f" />
              <Text style={styles.tileText}>Học thử</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tile} onPress={() => handleQuickAction('study-plan')}>
              <MaterialCommunityIcons name="calendar-multiselect" size={20} color="#d32f2f" />
              <Text style={styles.tileText}>Lộ trình</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tile} onPress={() => handleQuickAction('subject-help')}>
              <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#d32f2f" />
              <Text style={styles.tileText}>Giải bài</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tile} onPress={() => handleQuickAction('pricing')}>
              <MaterialCommunityIcons name="cash" size={20} color="#d32f2f" />
              <Text style={styles.tileText}>Báo giá</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tile} onPress={() => handleQuickAction('contact-support')}>
              <MaterialCommunityIcons name="phone" size={20} color="#d32f2f" />
              <Text style={styles.tileText}>Liên hệ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Chat Section */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.messagesContainer}>
          {messages.map((m) => (
            <View key={m.id} style={[styles.msgWrapper, m.role === 'user' ? styles.msgUserWrap : styles.msgAiWrap]}>
              {m.role === 'ai' && (
                <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.aiAvatarGradient}>
                  <MaterialCommunityIcons name="robot-happy-outline" size={18} color="#fff" />
                </LinearGradient>
              )}
              <View style={[styles.msgBubble, m.role === 'user' ? styles.userMsg : styles.aiMsg]}>
                <Text style={[styles.msgText, m.role === 'user' ? styles.userMsgText : styles.aiMsgText]}>
                  {m.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Nhập nội dung cần hỗ trợ (VD: 'Tìm gia sư toán lớp 10')"
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage()}>
            {loading ? <ActivityIndicator color="#fff" /> : <Ionicons name="send" size={20} color="#fff" />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f2f2f6' },
  headerWrap: { paddingHorizontal: 12, paddingTop: 12 },
  headerCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, elevation: 4 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarGradient: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#222' },
  welcomeBubble: { marginTop: 12, backgroundColor: '#f7f7f8', padding: 12, borderRadius: 10 },
  welcomeText: { color: '#333' },
  gridWrap: { marginTop: 14, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tileText: { marginLeft: 10, fontSize: 14, color: '#333', fontWeight: '600' },
  container: { flex: 1, paddingHorizontal: 12, paddingTop: 10 },
  messagesContainer: { paddingBottom: 12 },
  msgWrapper: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 },
  msgUserWrap: { justifyContent: 'flex-end' },
  msgAiWrap: { justifyContent: 'flex-start' },
  aiAvatarGradient: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  msgBubble: { maxWidth: '78%', padding: 10, borderRadius: 12 },
  userMsg: { backgroundColor: '#007AFF', alignSelf: 'flex-end', borderTopRightRadius: 4 },
  aiMsg: { backgroundColor: '#fff', alignSelf: 'flex-start', borderTopLeftRadius: 4, borderWidth: 1, borderColor: '#eee' },
  msgText: { fontSize: 14 },
  userMsgText: { color: '#fff' },
  aiMsgText: { color: '#333' },
  inputBar: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: Platform.OS === 'ios' ? 20 : 6,
  },
  input: { flex: 1, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f2f2f6', borderRadius: 20, fontSize: 14 },
  sendBtn: { backgroundColor: '#8E2DE2', padding: 12, borderRadius: 20, marginLeft: 8, alignItems: 'center', justifyContent: 'center' },
});
