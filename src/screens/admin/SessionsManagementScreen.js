import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Alert,
    ScrollView,
} from 'react-native';
import { styles } from '../../style/styles';
import { AdminBottomNav } from '../../components/BottomNavigation';
import { statusConfig } from '../../constants/statusConfig';
import TutorSessionsService from '../../service/TutorSessionsService';

const SessionsManagementScreen = ({ onTabPress, onBack }) => {
    const [sessions, setSessions] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    // ✅ Lắng nghe realtime từ Firebase
    useEffect(() => {
        const unsubscribe = TutorSessionsService.listenToSessions(setSessions);
        return () => unsubscribe && unsubscribe();
    }, []);

    // ✅ Lọc buổi học theo trạng thái
    const filteredSessions = sessions.filter((session) => {
        if (activeTab === 'all') return true;
        return session.status === activeTab;
    });

    // ✅ Hiển thị từng buổi học
    const renderSession = ({ item }) => {
        const status = statusConfig[item.status] || {
            label: 'Không xác định',
            bg: '#e5e7eb',
            color: '#000',
        };

        return (
            <View style={[styles.orderCard, { marginBottom: 5 }]}>
                <View style={styles.orderHeader}>
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerAvatar}>{item.avatar || '👤'}</Text>
                        <View>
                            <Text style={styles.customerName}>{item.student || 'Không rõ'}</Text>
                            <Text style={styles.orderService}>
                                {item.subject || 'Không rõ môn học'}
                            </Text>
                            <Text style={styles.orderTime}>
                                📅 {item.date || 'N/A'} - {item.time || 'N/A'}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                        <Text style={[styles.statusText, { color: status.color }]}>
                            {status.label}
                        </Text>
                    </View>
                </View>

                <View style={styles.orderDetails}>
                    <Text style={styles.orderAddress}>📍 {item.address || 'Chưa có địa chỉ'}</Text>
                    {item.description && (
                        <Text style={styles.orderDescription}>{item.description}</Text>
                    )}
                    <View style={styles.orderMeta}>
                        <Text style={styles.orderDuration}>
                            ⏱️ {item.estimatedHours ?? 'N/A'}h
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    // ✅ Danh sách tab trạng thái
    const allTabs = [
        { key: 'all', label: 'Tất cả' },
        { key: 'pending', label: 'Chờ xác nhận' },
        { key: 'confirmed', label: 'Đã xác nhận' },
        { key: 'accepted', label: 'Đã nhận' },
        { key: 'completed', label: 'Hoàn thành' },
        { key: 'cancelled', label: 'Đã hủy' },
        { key: 'rejected', label: 'Đã từ chối' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.screenHeader}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={[styles.backButton, { fontSize: 25 }]}>←</Text>
                </TouchableOpacity>
                <Text
                    pointerEvents="none"
                    style={[
                        styles.screenTitle,
                        {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                        },
                    ]}
                >
                    Quản lý buổi học
                </Text>
            </View>

            {/* Tabs */}
            <View
                style={{
                    backgroundColor: '#f3f4f6',
                    paddingVertical: 10,
                    borderRadius: 15,
                    marginHorizontal: 10,
                    marginBottom: 10,
                }}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10, gap: 8 }}
                >
                    {allTabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.key}
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 16,
                                borderRadius: 20,
                                backgroundColor:
                                    activeTab === tab.key ? '#2563eb' : '#e5e7eb',
                            }}
                            onPress={() => setActiveTab(tab.key)}
                        >
                            <Text
                                style={{
                                    color: activeTab === tab.key ? '#fff' : '#374151',
                                    fontWeight: '600',
                                }}
                            >
                                {tab.label} (
                                {tab.key === 'all'
                                    ? sessions.length
                                    : sessions.filter((s) => s.status === tab.key).length}
                                )
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Danh sách buổi học */}
            <FlatList
                data={filteredSessions}
                renderItem={renderSession}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingBottom: 100,
                    paddingHorizontal: 15,
                    paddingTop: 5,
                }}
                showsVerticalScrollIndicator={false}
            />

            {/* Navigation dưới cùng */}
            <AdminBottomNav onTabPress={onTabPress} activeTab="sessionManagement" />
        </SafeAreaView>
    );
};

export default SessionsManagementScreen;
