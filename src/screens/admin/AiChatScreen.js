// /screens/admin/AiChatScreen.js
import React from "react";
import { SafeAreaView, View } from "react-native";
import { AdminBottomNav } from "../../components/BottomNavigation";
import AiAdvisorScreen from "../AiAdvisorScreen";

export default function AiChatScreen({ onTabPress, currentUser }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f6' }}>
            <View style={{ flex: 1, marginTop: 0, marginLeft: 0, marginRight: 0, paddingBottom: 30 }}>
                <AiAdvisorScreen onBack={() => onTabPress("adminDashboard")} currentUser={currentUser} />
            </View>

            <AdminBottomNav onTabPress={onTabPress} activeTab="aichat" />
        </SafeAreaView>
    );
}
