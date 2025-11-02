import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Common Styles
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  // Login Screen Styles
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  switchLabel: {
    fontSize: 16,
    color: '#1f2937',
  },
  loginButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    alignItems: 'center',
    marginTop: 15,
  },
  registerButtonText: {
    color: '#2563eb',
    fontSize: 14,
  },
  // Thêm styles cho login info
  loginInfo: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginVertical: 10,
  },
  loginInfoText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 2,
  },
  // Home Screen Styles
  homeHeader: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  question: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  searchBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  servicesContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 15,
    marginBottom: 15,
  },
  servicesList: {
    gap: 10,
  },
  serviceCard: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    margin: 5,
    minHeight: 100,
    justifyContent: 'center',
  },
  serviceIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  promoContainer: {
    padding: 20,
    marginTop: 20,
    marginBottom: 80,
  },
  promoCard: {
    backgroundColor: '#2563eb',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  promoText: {
    fontSize: 14,
    color: '#bfdbfe',
    marginBottom: 15,
  },
  promoButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoButtonText: {
    color: '#2563eb',
    fontWeight: '600',
  },

  // Screen Header Styles
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    fontSize: 16,
    color: '#2563eb',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  filterButton: {
    fontSize: 20,
  },
  favoriteButton: {
    fontSize: 20,
  },

  // Filter Styles
  filterScroll: {
    maxWidth: '100%',
    paddingVertical: 10,
    maxHeight: 70,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
    minHeight: 50,
  },
  filterChip: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterText: {
    fontSize: 14,
    color: '#6b7280',
  },
  // Thêm styles cho filter active state
  activeFilterChip: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '600',
  },

  // Worker List Styles
  workersList: {
    padding: 15,
    gap: 15,
    paddingBottom: 100,
  },
  workerCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  workerHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 40,
    marginRight: 15,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  experience: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rating: {
    fontSize: 14,
    color: '#f59e0b',
  },
  reviews: {
    fontSize: 12,
    color: '#9ca3af',
  },
  workerMeta: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 5,
  },
  distance: {
    fontSize: 12,
    color: '#6b7280',
  },
  workerFooter: {
    flexDirection: 'row',
    gap: 10,
  },
  contactButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },

  // Worker Detail Styles
  detailContent: {
    flex: 1,
    marginBottom: 140,
  },
  workerProfile: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  detailAvatar: {
    fontSize: 60,
    marginBottom: 10,
  },
  detailWorkerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  detailExperience: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 10,
  },
  detailRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  detailRating: {
    fontSize: 16,
    color: '#f59e0b',
  },
  detailReviews: {
    fontSize: 14,
    color: '#9ca3af',
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  serviceItem: {
    fontSize: 14,
    color: '#6b7280',
  },

  // css date booking .
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },

  dateButton: {
    width: '30%',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    marginBottom: 10,
  },

  selectedDate: {
    backgroundColor: '#2563eb',
  },

  dateText: {
    color: '#374151',
    fontSize: 14,
  },

  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  detailFooter: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 15,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },

  // History Screen Styles
  historyHeader: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tabScroll: {
    maxHeight: 50,
    backgroundColor: '#ffffff',
  },

  tabContainerScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10, // cách giữa các tab
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2563eb',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeTabText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  bookingsList: {
    padding: 15,
    gap: 15,
    paddingBottom: 100,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  bookingServiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  bookingWorkerName: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDetails: {
    gap: 8,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailIcon: {
    fontSize: 14,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 10,
  },
  reviewButton: {
    flex: 1,
    backgroundColor: '#f59e0b',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  rebookButton: {
    flex: 1,
    backgroundColor: '#2563eb', // Màu xanh dương chính
    paddingVertical: 12, // Tăng padding theo chiều dọc
    paddingHorizontal: 16,
    borderRadius: 10, // Bo góc mềm hơn
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // Bóng trên Android
    marginLeft: 8, // Khoảng cách giữa các nút nếu nằm cạnh nhau
  },

  rebookButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // Profile Screen Styles
  profileHeader: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileAvatar: {
    fontSize: 50,
    backgroundColor: '#f3f4f6',
    width: 70,
    height: 70,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 35,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#6b7280',
  },
  editButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuIcon: {
    fontSize: 20,
    width: 25,
    textAlign: 'center',
  },
  menuTitle: {
    fontSize: 16,
    color: '#1f2937',
  },
  menuArrow: {
    fontSize: 18,
    color: '#9ca3af',
  },
  promoIcon: {
    fontSize: 30,
  },
  promoContent: {
    flex: 1,
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 100,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Worker Dashboard Styles
  workerHeader: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  workerAvatar: {
    fontSize: 50,
  },
  workerSpecialty: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  workerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  notificationButton: {
    position: 'relative',
    padding: 10,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 10,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActions: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  recentOrdersSection: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
    marginBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  recentOrdersList: {
    gap: 10,
  },
  recentOrderCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  recentOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentOrderCustomer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  recentOrderService: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  recentOrderTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 5,
  },
  recentOrderPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  // Worker Orders Styles
  ordersList: {
    padding: 15,
    gap: 15,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  customerAvatar: {
    fontSize: 40,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  orderService: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  orderTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  orderDetails: {
    marginBottom: 15,
  },
  orderAddress: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  orderDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 10,
    lineHeight: 20,
  },
  orderMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDuration: {
    fontSize: 14,
    color: '#6b7280',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  orderActions: {
    gap: 10,
  },
  phoneButton: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  phoneButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  pendingActions: {
    flexDirection: 'row',
    gap: 10,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Worker Order Detail Styles
  orderDetailContent: {
    flex: 1,
    marginBottom: 160,
  },
  customerDetailInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  customerDetailAvatar: {
    fontSize: 50,
  },
  customerDetails: {
    flex: 1,
  },
  customerDetailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  customerDetailPhone: {
    fontSize: 16,
    color: '#2563eb',
  },
  orderDetailInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  priceValue: {
    color: '#2563eb',
    fontSize: 16,
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  addressIcon: {
    fontSize: 16,
  },
  addressText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  orderDetailDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  notesList: {
    gap: 8,
  },
  noteItem: {
    fontSize: 14,
    color: '#6b7280',
  },
  orderDetailFooter: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 10,
  },
  callActionButton: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  callActionButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  pendingActionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  rejectActionButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  rejectActionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptActionButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  acceptActionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  completeActionButton: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeActionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Worker Profile Styles
  workerProfileHeader: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  workerProfileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  workerProfileAvatar: {
    fontSize: 50,
  },
  workerProfileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  workerProfilePhone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  workerProfileSpecialty: {
    fontSize: 14,
    color: '#2563eb',
  },
  availabilityContainer: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  availabilityInfo: {
    flex: 1,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  availabilitySubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  workerStatsContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 10,
  },
  workerStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  workerStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 2,
  },
  workerStatLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  earningsContainer: {
    padding: 20,
    marginTop: 10,
  },
  earningsCard: {
    backgroundColor: '#2563eb',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  earningsIcon: {
    fontSize: 30,
  },
  earningsContent: {
    flex: 1,
  },
  earningsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  earningsAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  earningsSubtext: {
    fontSize: 12,
    color: '#bfdbfe',
  },
  earningsButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  earningsButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },

  // Bottom Navigation Styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navText: {
    fontSize: 12,
    color: '#6b7280',
  },
  activeNavText: {
    color: '#2563eb',
    fontWeight: '600',
  },

  // Thêm styles cho admin screens
  adminHeader: {
    backgroundColor: '#3a393bff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  adminTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  adminStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 10,
  },
  adminStatCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '31%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adminStatIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  adminStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 4,
  },
  adminStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  adminMenuCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adminMenuIcon: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
  },
  adminMenuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  adminMenuDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAvatar: {
    fontSize: 40,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  adminRole: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  customerRole: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  workerRole: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  userActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  editUserButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editUserButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteUserButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteUserButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  // Thêm styles cho quick stats
  quickStatsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    gap: 20,
  },
  quickStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Admin styles bổ sung
  adminSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  adminMenuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  adminMenuCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adminMenuIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  adminMenuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  adminMenuDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 5,
  },

  // Service Management Styles
  serviceManagementCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  serviceManagementIcon: {
    fontSize: 24,
  },
  serviceInfo: {
    flex: 1,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  serviceActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editServiceButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editServiceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleServiceButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleServiceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Review Management Styles
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewCustomer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  reviewWorker: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  reviewService: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
  },
  ratingStars: {
    fontSize: 16,
  },
  ratingNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  reviewComment: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
    marginBottom: 15,
    lineHeight: 20,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 10,
  },
  warningButton: {
    flex: 1,
    backgroundColor: '#f59e0b',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  warningButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Payment Management Styles
  paymentStatsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  paymentStatCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentStatIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  paymentStatNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
    textAlign: 'center',
  },
  paymentStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  transactionCustomer: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  transactionWorker: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  transactionDetails: {
    marginBottom: 15,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  transactionCommission: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  transactionWorkerReceived: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  transactionActions: {
    flexDirection: 'row',
    gap: 10,
  },
  processButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  processButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Area Management Styles
  areaStatsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  areaStatCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  areaStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  areaStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  areaCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  areaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  areaInfo: {
    flex: 1,
  },
  areaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  areaCity: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  areaWorkerCount: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  areaActions: {
    flexDirection: 'row',
    gap: 10,
  },
  assignButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  assignButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleAreaButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleAreaButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Admin Account Management Styles
  adminAccountCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  adminAccountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  adminAccountAvatar: {
    fontSize: 40,
    marginRight: 15,
  },
  adminAccountInfo: {
    flex: 1,
  },
  adminAccountName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  adminAccountPhone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  adminAccountEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  adminAccountRole: {
    fontSize: 14,
    color: '#ff0000ff',
    fontWeight: '600',
    marginBottom: 2,
  },

  // System Settings Styles
  settingsContent: {
    flex: 1,
    marginBottom: 80,
  },
  settingsSection: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  settingsItem: {
    marginBottom: 15,
  },
  settingsLabel: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
    fontWeight: '600',
  },
  settingsInput: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
  },
  settingsButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  settingsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsToggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingsToggleInfo: {
    flex: 1,
  },
  settingsToggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingsToggleSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingsMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingsMenuIcon: {
    fontSize: 20,
    width: 30,
    textAlign: 'center',
    marginRight: 15,
  },
  settingsMenuInfo: {
    flex: 1,
  },
  settingsMenuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingsMenuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingsMenuArrow: {
    fontSize: 18,
    color: '#9ca3af',
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  dangerButtonText: {
    color: 'white',
  },

  // System Logs Styles
  logStatsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  logStatCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logStatIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  logStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  logStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  logCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logHeader: {
    marginBottom: 10,
  },
  logInfo: {
    gap: 5,
  },
  logActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logActionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  logAction: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logUser: {
    fontSize: 14,
    color: '#6b7280',
  },
  logTimestamp: {
    fontSize: 14,
    color: '#6b7280',
  },
  logIP: {
    fontSize: 12,
    color: '#9ca3af',
  },
  logDetails: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  addressList: {
    padding: 15,
    paddingBottom: 100,
  },
  addressCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  defaultBadge: {
    backgroundColor: '#2563eb',
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  editAddressButton: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  addressPhone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 10,
  },
  setDefaultButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  setDefaultButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteAddressButton: {
    flex: 1,
    backgroundColor: '#fef2f2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteAddressButtonText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalCloseButton: {
    fontSize: 20,
    color: '#6b7280',
  },
  modalForm: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formRow: {
    flexDirection: 'row',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Payment Method styles
  paymentList: {
    padding: 15,
    paddingBottom: 100,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  paymentNumber: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  paymentExpiry: {
    fontSize: 12,
    color: '#9ca3af',
  },
  deletePaymentButton: {
    fontSize: 18,
    color: '#ef4444',
  },
  setDefaultPaymentButton: {
    backgroundColor: '#f0f9ff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  setDefaultPaymentButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  paymentTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minWidth: '45%',
  },
  selectedPaymentType: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  paymentTypeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  paymentTypeName: {
    fontSize: 14,
    color: '#374151',
  },
  selectedPaymentTypeName: {
    color: '#2563eb',
    fontWeight: '600',
  },

  // Offers styles
  offersList: {
    padding: 15,
    paddingBottom: 100,
  },
  offerCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  disabledOfferCard: {
    opacity: 0.6,
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  offerIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  offerInfo: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  offerDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  offerDiscount: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e',
  },
  offerDetails: {
    marginBottom: 15,
  },
  offerDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  offerDetailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  offerCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    fontFamily: 'monospace',
  },
  offerDetailValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  offerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offerStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  useOfferButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  useOfferButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Worker Schedule styles
  scheduleContent: {
    flex: 1,
    marginBottom: 80,
  },
  saveScheduleButton: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleSection: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
  },
  scheduleSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  dayScheduleCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dayHeader: {
    marginBottom: 15,
  },
  dayInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  dayToggle: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  dayToggleActive: {
    backgroundColor: '#10b981',
  },
  dayToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  dayToggleActiveText: {
    color: 'white',
  },
  timeSelectors: {
    gap: 15,
  },
  timeSelector: {
    marginBottom: 10,
  },
  timeSelectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  timeScrollView: {
    flexDirection: 'row',
  },
  timeSlot: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedTimeSlot: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedTimeSlotText: {
    color: 'white',
    fontWeight: '600',
  },
  areasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  areaChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  areaChipActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  areaChipText: {
    fontSize: 14,
    color: '#6b7280',
  },
  areaChipActiveText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  areaChipCheck: {
    fontSize: 12,
    color: '#2563eb',
  },
  quickSettings: {
    gap: 15,
  },
  quickSettingButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  quickSettingButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  quickSettingButtonSubtext: {
    fontSize: 12,
    color: '#6b7280',
  },
  scheduleStats: {
    flexDirection: 'row',
    gap: 15,
  },
  scheduleStatItem: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  scheduleStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 5,
  },
  scheduleStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Worker Income styles
  incomeContent: {
    flex: 1,
    marginBottom: 80,
  },
  periodSelector: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  periodButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedPeriodButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  selectedPeriodButtonText: {
    color: 'white',
  },
  incomeSummary: {
    padding: 15,
  },
  incomeSummaryCard: {
    backgroundColor: '#2563eb',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  incomeSummaryTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  incomeSummaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  incomeSummaryDetails: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  incomeSummaryDetailItem: {
    alignItems: 'center',
  },
  incomeSummaryDetailLabel: {
    fontSize: 12,
    color: '#bfdbfe',
    marginBottom: 5,
  },
  incomeSummaryDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  incomeBreakdown: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
  incomeBreakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  incomeBreakdownCards: {
    gap: 10,
  },
  incomeBreakdownCard: {
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  incomeBreakdownIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  incomeBreakdownLabel: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
  },
  incomeBreakdownAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  recentTransactions: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 10,
  },
  recentTransactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  recentTransactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllTransactions: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  transactionsList: {
    gap: 10,
  },
  transactionDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  transactionCustomer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  transactionService: {
    fontSize: 12,
    color: '#6b7280',
  },
  transactionAmounts: {
    alignItems: 'flex-end',
  },
  transactionGrossAmount: {
    fontSize: 14,
    color: '#6b7280',
    textDecorationLine: 'line-through',
  },
  transactionCommission: {
    fontSize: 12,
    color: '#ef4444',
  },
  transactionNetAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  transactionFooter: {
    marginTop: 10,
  },
  transactionStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  transactionStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  withdrawalSection: {
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  withdrawalCard: {
    backgroundColor: '#10b981',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  withdrawalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  withdrawalBalance: {
    fontSize: 14,
    color: '#d1fae5',
    marginBottom: 20,
  },
  withdrawalButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  withdrawalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  // Worker Edit Profile styles
  workerFormSection: {
    marginBottom: 25,
  },

  workerFormSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  // Skills management
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },

  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },

  skillChipText: {
    fontSize: 14,
    color: '#3b82f6',
    marginRight: 6,
  },

  skillRemoveButton: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },

  addSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  addSkillButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },

  addSkillButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Worker Skills Screen styles
  skillsContent: {
    flex: 1,
  },

  addSkillSection: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },

  addSkillTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },

  addSkillForm: {
    gap: 15,
  },

  skillInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },

  levelSelectorLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },

  levelSelectorContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  levelSelectorButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },

  selectedLevelButton: {
    backgroundColor: '#eff6ff',
  },

  levelSelectorText: {
    fontSize: 14,
    color: '#6b7280',
  },

  addSkillSubmitButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  addSkillSubmitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  suggestedSkillsSection: {
    marginTop: 20,
  },

  suggestedSkillsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 10,
  },

  suggestedSkillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  suggestedSkillChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },

  suggestedSkillText: {
    fontSize: 12,
    color: '#6b7280',
  },

  skillsListSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },

  skillsListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  skillsListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },

  skillsStats: {
    alignItems: 'flex-end',
  },

  skillsStatsText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },

  skillsList: {
    gap: 15,
  },

  skillManagementCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#f8fafc',
  },

  skillManagementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  skillManagementInfo: {
    flex: 1,
  },

  skillManagementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },

  skillManagementMeta: {
    flexDirection: 'row',
    gap: 8,
  },

  skillLevelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  skillLevelText: {
    fontSize: 12,
    fontWeight: '500',
  },

  verifiedBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  verifiedText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '500',
  },

  removeSkillButton: {
    fontSize: 16,
    padding: 5,
  },

  skillManagementActions: {
    gap: 12,
  },

  skillActionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },

  skillLevelSelector: {
    flexDirection: 'row',
    gap: 8,
  },

  skillLevelOption: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
  },

  selectedSkillLevel: {
    backgroundColor: '#eff6ff',
  },

  skillLevelOptionText: {
    fontSize: 12,
    color: '#6b7280',
  },

  verifyButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },

  verifyButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Help & Support styles
  helpTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  helpTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  activeHelpTab: {
    borderBottomColor: '#3b82f6',
  },

  helpTabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },

  activeHelpTabText: {
    color: '#3b82f6',
    fontWeight: '600',
  },

  helpContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  // FAQ styles
  faqContainer: {
    gap: 10,
  },

  faqItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },

  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },

  faqArrow: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: '300',
  },

  faqAnswer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },

  faqAnswerText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },

  // Contact styles
  contactContainer: {
    gap: 20,
  },

  quickContactSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
  },

  quickContactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },

  quickContactButtons: {
    flexDirection: 'row',
    gap: 15,
  },

  quickContactButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  quickContactIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  quickContactText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },

  quickContactSubtext: {
    fontSize: 12,
    color: '#6b7280',
  },

  contactFormSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
  },

  contactFormTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },

  contactForm: {
    gap: 15,
  },

  contactInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },

  contactTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  submitContactButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  submitContactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Edit Profile specific styles
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },

  editProfileAvatar: {
    fontSize: 60,
    marginBottom: 10,
  },

  changeAvatarButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },

  changeAvatarButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Gender selection
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  genderButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
  },

  selectedGenderButton: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },

  genderButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },

  selectedGenderButtonText: {
    color: '#3b82f6',
    fontWeight: '500',
  },

  // Date picker
  datePickerText: {
    fontSize: 16,
    color: '#374151',
  },

  // Notification styles
  notificationTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  notificationTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  activeNotificationTab: {
    backgroundColor: '#3b82f6',
  },

  notificationTabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },

  activeNotificationTabText: {
    color: '#ffffff',
  },

  notificationsList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  unreadNotificationCard: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },

  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  notificationIconContainer: {
    marginRight: 12,
  },

  notificationIcon: {
    fontSize: 24,
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },

  unreadNotificationTitle: {
    fontWeight: '600',
  },

  notificationMessage: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },

  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },

  notificationActions: {
    alignItems: 'center',
    gap: 10,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },

  deleteNotificationButton: {
    fontSize: 16,
    padding: 5,
  },

  markAllReadButton: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },

  formInputError: {
    borderColor: '#ef4444',
  },

  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },

  // search service home user
  searchTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },

  // Select time for user to worker detail
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    marginTop: 10,
  },

  timeButton: {
    width: '30%', // hoặc "31%" nếu muốn chặt chẽ hơn
    aspectRatio: 2.8, // giữ tỉ lệ chiều ngang / dọc
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300
    backgroundColor: '#f9fafb', // gray-50
  },

  selectedTime: {
    backgroundColor: '#2563eb', // blue-600
    borderColor: '#2563eb',
  },

  timeText: {
    color: '#374151', // gray-700
    fontSize: 14,
    fontWeight: '500',
  },

  selectedTimeText: {
    color: '#fff',
  },

  //add user for booking tutor
  addressInput: {
    marginTop: 5,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#111827',
  },
  // OTP styles
  resendContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 14,
    color: '#6b7280',
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  // Role selection styles
  roleContainer: {
    marginBottom: 24,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  activeRoleButton: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    textAlign: 'center',
  },
  activeRoleButtonText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  // Worker fields styles
  workerFieldsContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  workerFieldsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  workerNote: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  workerNoteText: {
    fontSize: 13,
    color: '#92400e',
    lineHeight: 18,
  },

  multiSelectContainer: {
    marginVertical: 10,
  },
  multiSelectLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  serviceItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 6,
  },
  serviceItemSelected: {
    backgroundColor: '#4CAF50',
  },
  serviceText: {
    fontSize: 14,
    color: '#333',
  },
  serviceTextSelected: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },

  //phone tab đơn hàng của worker
  bookingActions: {
    marginTop: 12,
    gap: 10,
  },

  singleRow: {
    width: '100%',
  },

  phoneButtonOrder: {
    backgroundColor: '#facc15',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },

  phoneButtonTextOrder: {
    color: '#1f2937',
    fontWeight: '600',
    fontSize: 16,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  cancelButtonOrder: {
    backgroundColor: '#ef4444',
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  cancelButtonTextOrder: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  acceptButtonOrder: {
    backgroundColor: '#10b981',
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  acceptButtonTextOrder: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  completeButtonOrder: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  completeButtonTextOrder: {
    color: 'white',
    fontWeight: 'bold',
  },

  checkboxList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 8,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  checkboxChecked: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },

  checkboxLabel: {
    fontSize: 14,
  },

  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
