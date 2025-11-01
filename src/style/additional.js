import { StyleSheet, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  // Base styles
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  // Screen header
  screenHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },

  backButton: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "500",
  },

  editButton: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "600",
  },

  saveButton: {
    fontSize: 16,
    color: "#10b981",
    fontWeight: "600",
  },

  resetButton: {
    fontSize: 14,
    color: "#ef4444",
    fontWeight: "500",
  },

  headerRight: {
    alignItems: "flex-end",
  },

  reviewCount: {
    fontSize: 12,
    color: "#6b7280",
  },

  // Tutor Info Screen
  tutorInfoContent: {
    flex: 1,
    marginBottom: 80,
  },

  tutorInfoAvatar: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  avatarIcon: {
    fontSize: 80,
    marginBottom: 15,
  },

  tutorInfoName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },

  tutorInfoSpecialty: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "500",
    marginBottom: 12,
  },

  tutorInfoRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  ratingStars: {
    fontSize: 16,
  },

  ratingText: {
    fontSize: 14,
    color: "#6b7280",
  },

  infoSection: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f9fafb",
  },

  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    flex: 1,
  },

  infoValue: {
    fontSize: 14,
    color: "#1f2937",
    flex: 2,
    textAlign: "right",
  },

  infoInput: {
    fontSize: 14,
    color: "#1f2937",
    flex: 2,
    textAlign: "right",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#ffffff",
  },

  infoTextArea: {
    height: 60,
    textAlignVertical: "top",
    textAlign: "left",
  },

  workingAreasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  areaTag: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3b82f6",
  },

  areaTagText: {
    fontSize: 12,
    color: "#3b82f6",
    fontWeight: "500",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3b82f6",
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },

  editActions: {
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  cancelEditButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  cancelEditButtonText: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
  },

  saveEditButton: {
    flex: 1,
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  saveEditButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },

  // Tutor Area Screen
  areaContent: {
    flex: 1,
    marginBottom: 80,
  },

  areaStatsSection: {
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  areaStatsGrid: {
    flexDirection: "row",
    gap: 15,
  },

  areaStatCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  areaStatNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3b82f6",
    marginBottom: 4,
  },

  areaStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },

  areaSection: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 15,
    lineHeight: 20,
  },

  radiusSelector: {
    gap: 15,
  },

  radiusLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },

  radiusButtons: {
    flexDirection: "row",
    gap: 10,
  },

  radiusButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    alignItems: "center",
  },

  selectedRadiusButton: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },

  radiusButtonText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },

  selectedRadiusButtonText: {
    color: "#3b82f6",
    fontWeight: "600",
  },

  areasGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  areaCard: {
    width: "48%",
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  selectedAreaCard: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },

  disabledAreaCard: {
    opacity: 0.5,
    backgroundColor: "#f3f4f6",
  },

  areaCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  areaCardName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },

  selectedAreaCardName: {
    color: "#3b82f6",
  },

  areaCardCheck: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "700",
  },

  areaCardDistrict: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },

  selectedAreaCardDistrict: {
    color: "#1e40af",
  },

  areaCardDistance: {
    fontSize: 12,
    color: "#9ca3af",
  },

  selectedAreaCardDistance: {
    color: "#1e40af",
  },

  areaCardDisabled: {
    fontSize: 10,
    color: "#ef4444",
    fontWeight: "500",
    marginTop: 4,
  },

  quickAreaActions: {
    flexDirection: "row",
    gap: 10,
  },

  quickAreaButton: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  quickAreaButtonIcon: {
    fontSize: 20,
    marginBottom: 8,
  },

  quickAreaButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },

  quickAreaButtonSubtext: {
    fontSize: 12,
    color: "#6b7280",
  },

  areaTips: {
    backgroundColor: "#fef3c7",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f59e0b",
  },

  areaTipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400e",
    marginBottom: 8,
  },

  areaTipsText: {
    fontSize: 14,
    color: "#b45309",
    lineHeight: 20,
  },

  // Tutor Reviews Screen
  reviewsContent: {
    flex: 1,
    marginBottom: 80,
  },

  overallRatingSection: {
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  overallRatingCard: {
    flexDirection: "row",
    gap: 20,
  },

  overallRatingLeft: {
    alignItems: "center",
    flex: 1,
  },

  overallRatingNumber: {
    fontSize: 48,
    fontWeight: "700",
    color: "#f59e0b",
    marginBottom: 8,
  },

  overallRatingStars: {
    fontSize: 20,
    marginBottom: 8,
  },

  overallRatingText: {
    fontSize: 14,
    color: "#6b7280",
  },

  overallRatingRight: {
    flex: 2,
    gap: 4,
  },

  ratingDistributionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  ratingDistributionStars: {
    fontSize: 12,
    width: 30,
  },

  ratingDistributionBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    overflow: "hidden",
  },

  ratingDistributionFill: {
    height: "100%",
    backgroundColor: "#f59e0b",
  },

  ratingDistributionCount: {
    fontSize: 12,
    color: "#6b7280",
    width: 20,
    textAlign: "right",
  },

  reviewFilterTabs: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },

  reviewFilterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },

  activeReviewFilterTab: {
    backgroundColor: "#3b82f6",
  },

  reviewFilterTabText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },

  activeReviewFilterTabText: {
    color: "#ffffff",
    fontWeight: "600",
  },

  reviewsList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 15,
  },

  reviewCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  reviewCustomerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  reviewCustomerAvatar: {
    fontSize: 32,
    marginRight: 12,
  },

  reviewCustomerDetails: {
    flex: 1,
  },

  reviewCustomerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },

  reviewDate: {
    fontSize: 12,
    color: "#9ca3af",
  },

  reviewMenuButton: {
    padding: 4,
  },

  reviewMenuIcon: {
    fontSize: 16,
    color: "#6b7280",
  },

  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  reviewStars: {
    fontSize: 16,
  },

  reviewService: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 8,
  },

  reviewComment: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 12,
  },

  reviewImages: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  reviewImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  reviewImageIcon: {
    fontSize: 24,
  },

  reviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  reviewMeta: {
    flex: 1,
  },

  reviewOrderId: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  },

  reviewHelpful: {
    fontSize: 12,
    color: "#9ca3af",
  },

  replyButton: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3b82f6",
  },

  replyButtonText: {
    fontSize: 12,
    color: "#3b82f6",
    fontWeight: "500",
  },

  reviewTipsSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  reviewTips: {
    backgroundColor: "#f0f9ff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },

  reviewTipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0c4a6e",
    marginBottom: 8,
  },

  reviewTipsText: {
    fontSize: 14,
    color: "#075985",
    lineHeight: 20,
  },

  // Tutor Support Screen
  supportTabContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  supportTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  activeSupportTab: {
    borderBottomColor: "#3b82f6",
  },

  supportTabText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },

  activeSupportTabText: {
    color: "#3b82f6",
    fontWeight: "600",
  },

  supportContent: {
    flex: 1,
    marginBottom: 80,
  },

  quickSupportSection: {
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },

  quickSupportButtons: {
    flexDirection: "row",
    gap: 15,
  },

  quickSupportButton: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  quickSupportIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  quickSupportText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },

  quickSupportSubtext: {
    fontSize: 12,
    color: "#6b7280",
  },

  faqSection: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },

  faqContainer: {
    gap: 10,
  },

  faqItem: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
  },

  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8fafc",
  },

  faqQuestionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    flex: 1,
  },

  faqArrow: {
    fontSize: 18,
    color: "#6b7280",
    fontWeight: "600",
  },

  faqAnswer: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },

  faqAnswerText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },

  supportCategoriesSection: {
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },

  supportCategoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  supportCategoryCard: {
    width: "48%",
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  selectedSupportCategory: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },

  supportCategoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  supportCategoryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
    textAlign: "center",
  },

  supportCategoryDescription: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 16,
  },

  contactFormSection: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },

  contactForm: {
    gap: 20,
  },

  formGroup: {
    gap: 8,
  },

  formLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },

  contactInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },

  contactTextArea: {
    height: 100,
    textAlignVertical: "top",
  },

  prioritySelector: {
    flexDirection: "row",
    gap: 10,
  },

  priorityButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
  },

  selectedPriorityButton: {
    backgroundColor: "#fef3c7",
  },

  priorityButtonText: {
    fontSize: 12,
    fontWeight: "500",
  },

  submitContactButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  submitContactButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },

  supportTipsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  supportTips: {
    backgroundColor: "#f0f9ff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },

  supportTipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0c4a6e",
    marginBottom: 8,
  },

  supportTipsText: {
    fontSize: 14,
    color: "#075985",
    lineHeight: 20,
  },

  // Settings Screen
  settingsContent: {
    flex: 1,
    marginBottom: 80,
  },

  settingsSection: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    paddingVertical: 20,
  },

  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  settingsGroup: {
    paddingHorizontal: 20,
  },

  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f9fafb",
  },

  settingInfo: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "500",
    marginBottom: 2,
  },

  settingSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },

  settingValue: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "500",
  },

  workingModeSelector: {
    paddingHorizontal: 20,
    gap: 10,
  },

  workingModeOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },

  selectedWorkingMode: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },

  workingModeInfo: {
    flex: 1,
  },

  workingModeLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },

  selectedWorkingModeLabel: {
    color: "#3b82f6",
  },

  workingModeDesc: {
    fontSize: 12,
    color: "#6b7280",
  },

  workingModeCheck: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "700",
  },

  orderLimitSelector: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
  },

  orderLimitButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    alignItems: "center",
  },

  selectedOrderLimit: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },

  orderLimitText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },

  selectedOrderLimitText: {
    color: "#3b82f6",
    fontWeight: "600",
  },

  settingActionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f9fafb",
  },

  settingActionText: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "500",
  },

  dangerText: {
    color: "#ef4444",
  },

  settingActionArrow: {
    fontSize: 18,
    color: "#9ca3af",
  },

  appInfoContainer: {
    paddingHorizontal: 20,
  },

  appInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f9fafb",
  },

  appInfoLabel: {
    fontSize: 14,
    color: "#6b7280",
  },

  appInfoValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },

  appInfoAction: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "500",
  },

  // Personal Info Screen
  personalInfoContent: {
    flex: 1,
    marginBottom: 80,
  },

  personalInfoAvatar: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  personalInfoName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
  },

  membershipBadge: {
    backgroundColor: "#fbbf24",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },

  membershipText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },

  memberSinceText: {
    fontSize: 14,
    color: "#6b7280",
  },

  personalInfoSection: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  personalInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f9fafb",
  },

  personalInfoLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    flex: 1,
  },

  personalInfoValue: {
    fontSize: 14,
    color: "#1f2937",
    flex: 2,
    textAlign: "right",
  },

  personalInfoInput: {
    fontSize: 14,
    color: "#1f2937",
    flex: 2,
    textAlign: "right",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#ffffff",
  },

  personalInfoTextArea: {
    height: 60,
    textAlignVertical: "top",
    textAlign: "left",
  },

  genderSelector: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "flex-end",
    gap: 8,
  },

  genderOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
  },

  selectedGenderOption: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },

  genderOptionText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },

  selectedGenderOptionText: {
    color: "#3b82f6",
    fontWeight: "600",
  },

  accountStatsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  accountStatCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  accountStatNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3b82f6",
    marginBottom: 4,
  },

  accountStatLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },

  servicePreferences: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  preferenceTag: {
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#10b981",
  },

  preferenceTagText: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "500",
  },

  // Customer Settings Screen
  timePreferenceSelector: {
    paddingHorizontal: 20,
    gap: 10,
  },

  timePreferenceOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },

  selectedTimePreference: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },

  timePreferenceInfo: {
    flex: 1,
  },

  timePreferenceLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },

  selectedTimePreferenceLabel: {
    color: "#3b82f6",
  },

  timePreferenceTime: {
    fontSize: 12,
    color: "#6b7280",
  },

  timePreferenceCheck: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "700",
  },

  distanceSelector: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
  },

  distanceButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    alignItems: "center",
  },

  selectedDistance: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },

  distanceText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },

  selectedDistanceText: {
    color: "#3b82f6",
    fontWeight: "600",
  },

  priceRangeSelector: {
    paddingHorizontal: 20,
    gap: 10,
  },

  priceRangeOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },

  selectedPriceRange: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
  },

  priceRangeInfo: {
    flex: 1,
  },

  priceRangeLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },

  selectedPriceRangeLabel: {
    color: "#3b82f6",
  },

  priceRangeRange: {
    fontSize: 12,
    color: "#6b7280",
  },

  priceRangeCheck: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "700",
  },

  // About Us Screen
  aboutTabContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  aboutTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  activeAboutTab: {
    borderBottomColor: "#3b82f6",
  },

  aboutTabText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },

  activeAboutTabText: {
    color: "#3b82f6",
    fontWeight: "600",
  },

  aboutContent: {
    flex: 1,
    marginBottom: 80,
  },

  aboutSection: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    padding: 20,
  },

  companyLogo: {
    alignItems: "center",
    paddingVertical: 20,
  },

  logoIcon: {
    fontSize: 60,
    marginBottom: 15,
  },

  companyName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },

  companySlogan: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    fontStyle: "italic",
  },

  missionVisionContainer: {
    gap: 15,
  },

  missionCard: {
    backgroundColor: "#f0f9ff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },

  missionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },

  missionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0c4a6e",
    marginBottom: 8,
  },

  missionText: {
    fontSize: 14,
    color: "#075985",
    lineHeight: 20,
  },

  visionCard: {
    backgroundColor: "#f0fdf4",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#10b981",
  },

  visionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },

  visionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#064e3b",
    marginBottom: 8,
  },

  visionText: {
    fontSize: 14,
    color: "#047857",
    lineHeight: 20,
  },

  coreValuesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },

  valueItem: {
    width: "48%",
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  valueIcon: {
    fontSize: 32,
    marginBottom: 8,
  },

  valueTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },

  valueDescription: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 16,
  },

  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },

  achievementCard: {
    width: "48%",
    backgroundColor: "#fef3c7",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f59e0b",
  },

  achievementNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#92400e",
    marginBottom: 4,
  },

  achievementLabel: {
    fontSize: 14,
    color: "#b45309",
    textAlign: "center",
  },

  timelineContainer: {
    gap: 20,
  },

  timelineItem: {
    flexDirection: "row",
    gap: 15,
  },

  timelineYear: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },

  timelineYearText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },

  timelineContent: {
    flex: 1,
  },

  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },

  timelineDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },

  teamIntroText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    textAlign: "center",
  },

  teamMembersContainer: {
    gap: 15,
  },

  teamMemberCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  teamMemberAvatar: {
    fontSize: 48,
  },

  teamMemberInfo: {
    flex: 1,
  },

  teamMemberName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },

  teamMemberPosition: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "500",
    marginBottom: 8,
  },

  teamMemberDescription: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },

  cultureContainer: {
    gap: 15,
  },

  cultureItem: {
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  cultureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  cultureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 6,
  },

  cultureText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 18,
  },

  contactInfoContainer: {
    gap: 15,
  },

  contactInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: 10,
  },

  contactInfoIcon: {
    fontSize: 24,
    width: 30,
    textAlign: "center",
  },

  contactInfoContent: {
    flex: 1,
  },

  contactInfoTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },

  contactInfoText: {
    fontSize: 14,
    color: "#6b7280",
  },

  socialMediaContainer: {
    flexDirection: "row",
    gap: 15,
  },

  socialMediaButton: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  socialMediaIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  socialMediaText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },

  workingHoursContainer: {
    gap: 10,
  },

  workingHoursItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  workingHoursDay: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },

  workingHoursTime: {
    fontSize: 14,
    color: "#6b7280",
  },

  supportNote: {
    backgroundColor: "#ecfdf5",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#10b981",
  },

  supportNoteIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  supportNoteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#064e3b",
    marginBottom: 6,
  },

  supportNoteText: {
    fontSize: 14,
    color: "#047857",
    lineHeight: 18,
  },

  // Tutor Info styles
infoSection: {
  backgroundColor: "white",
  padding: 20,
  marginHorizontal: 15,
  marginVertical: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#e5e7eb",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
},
sectionTitle: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#1f2937",
  marginBottom: 10,
},
infoLabel: {
  fontSize: 14,
  fontWeight: "600",
  color: "#374151",
  marginBottom: 2,
},
infoValue: {
  fontSize: 14,
  color: "#6b7280",
},
})
