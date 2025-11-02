import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../../style/styles";
import { CustomerBottomNav } from "../../components/BottomNavigation";

const OffersScreen = ({ onTabPress, onBack }) => {
  const [offers, setOffers] = useState([
    {
      id: "1",
      title: "Giảm 50% dịch vụ đầu tiên",
      description: "Áp dụng cho học viên mới, giảm tối đa 100.000đ",
      discount: "50%",
      code: "WELCOME50",
      expiry: "31/12/2025",
      minOrder: "200.000đ",
      status: "available",
      type: "percentage",
    },
    {
      id: "2",
      title: "Giảm 30.000đ cho đơn từ 150k",
      description: "Áp dụng cho tất cả gia sư",
      discount: "30.000đ",
      code: "SAVE30K",
      expiry: "25/12/2025",
      minOrder: "150.000đ",
      status: "available",
      type: "fixed",
    },
    {
      id: "4",
      title: "Cashback 10%",
      description: "Hoàn tiền tối đa 50.000đ đối với gia sư Tiếng Anh",
      discount: "10%",
      code: "CASHBACK10",
      expiry: "11/02/2025",
      minOrder: "100.000đ",
      status: "expired",
      type: "cashback",
    },
  ]);

  const [activeTab, setActiveTab] = useState("available");

  const filteredOffers = offers.filter((offer) => {
    if (activeTab === "all") return true;
    return offer.status === activeTab;
  });

  const handleUseOffer = (offer) => {
    if (offer.status !== "available") {
      Alert.alert("Không thể sử dụng", "Ưu đãi này không còn khả dụng");
      return;
    }

    Alert.alert("Sử dụng ưu đãi", `Bạn có muốn sử dụng mã "${offer.code}"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Sử dụng",
        onPress: () => {
          // Copy to clipboard or navigate to booking
          Alert.alert(
            "Đã sao chép",
            `Mã "${offer.code}" đã được sao chép vào clipboard`
          );
        },
      },
    ]);
  };

  const getOfferIcon = (type) => {
    switch (type) {
      case "percentage":
        return "🎯";
      case "fixed":
        return "💰";
      case "shipping":
        return "🚚";
      case "cashback":
        return "💸";
      default:
        return "🎁";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "#10b981";
      case "used":
        return "#6b7280";
      case "expired":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Có thể sử dụng";
      case "used":
        return "Đã sử dụng";
      case "expired":
        return "Đã hết hạn";
      default:
        return status;
    }
  };

  const renderOffer = ({ item }) => (
    <View
      style={[
        styles.offerCard,
        item.status !== "available" && styles.disabledOfferCard,
      ]}
    >
      <View style={styles.offerHeader}>
        <Text style={styles.offerIcon}>{getOfferIcon(item.type)}</Text>
        <View style={styles.offerInfo}>
          <Text style={styles.offerTitle}>{item.title}</Text>
          <Text style={styles.offerDescription}>{item.description}</Text>
        </View>
        <View style={styles.offerDiscount}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>

      <View style={styles.offerDetails}>
        <View style={styles.offerDetailRow}>
          <Text style={styles.offerDetailLabel}>Mã:</Text>
          <Text style={styles.offerCode}>{item.code}</Text>
        </View>
        <View style={styles.offerDetailRow}>
          <Text style={styles.offerDetailLabel}>Đơn tối thiểu:</Text>
          <Text style={styles.offerDetailValue}>{item.minOrder}</Text>
        </View>
        <View style={styles.offerDetailRow}>
          <Text style={styles.offerDetailLabel}>Hết hạn:</Text>
          <Text style={styles.offerDetailValue}>{item.expiry}</Text>
        </View>
      </View>

      <View style={styles.offerFooter}>
        <View
          style={[
            styles.offerStatus,
            { backgroundColor: getStatusColor(item.status) + "20" },
          ]}
        >
          <Text
            style={[
              styles.offerStatusText,
              { color: getStatusColor(item.status) },
            ]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
        {item.status === "available" && (
          <TouchableOpacity
            style={styles.useOfferButton}
            onPress={() => handleUseOffer(item)}
          >
            <Text style={styles.useOfferButtonText}>Sử dụng</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Ưu đãi của tôi</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>🎁</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "available" && styles.activeTab]}
          onPress={() => setActiveTab("available")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "available" && styles.activeTabText,
            ]}
          >
            Có thể dùng ({offers.filter((o) => o.status === "available").length}
            )
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "used" && styles.activeTab]}
          onPress={() => setActiveTab("used")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "used" && styles.activeTabText,
            ]}
          >
            Đã dùng ({offers.filter((o) => o.status === "used").length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "expired" && styles.activeTab]}
          onPress={() => setActiveTab("expired")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "expired" && styles.activeTabText,
            ]}
          >
            Hết hạn ({offers.filter((o) => o.status === "expired").length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredOffers}
        renderItem={renderOffer}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.offersList}
        showsVerticalScrollIndicator={false}
      />

      <CustomerBottomNav onTabPress={onTabPress} activeTab="profile" />
    </SafeAreaView>
  );
};

export default OffersScreen;
