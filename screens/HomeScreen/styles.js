import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 22,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 22,
    color: '#888888',
  },
  favoriteActive: {
    color: '#FF3B30',
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.35,
    position: 'relative',
  },
  roomImage: {
    width,
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  roomType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  hotelInfoRow: {
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationIcon: {
    fontSize: 14,
    color: '#B33D1E',
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 14,
    color: '#FFD700',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B33D1E',
    marginTop: 8,
  },
  nightText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#888888',
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
  },
  amenitiesContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  amenityIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#666666',
  },
  roomDetailsContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  roomDetailsList: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    overflow: 'hidden',
  },
  roomDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  policyContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    marginBottom: 16,
  },
  policyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  policyLabel: {
    fontSize: 14,
    color: '#666666',
  },
  policyValue: {
    fontSize: 14,
    color: '#333333',
    maxWidth: '60%',
    textAlign: 'right',
  },
  bookingBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    elevation: 10,
  },
  datesGuestsContainer: {
    flex: 1,
    marginRight: 12,
  },
  dateSelection: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: '#333333',
  },
  guestSelection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B33D1E',
  },
  guestCount: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  bookNowButton: {
    backgroundColor: '#B33D1E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: height * 0.8,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    fontSize: 16,
    color: '#B33D1E',
  },
  applyButton: {
    backgroundColor: '#B33D1E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  paymentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: height * 0.8,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  paymentContent: {
    maxHeight: height * 0.6,
  },
  paymentSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 16,
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333333',
  },
  summaryValueTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B33D1E',
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedPaymentOption: {
    borderColor: '#B33D1E',
    backgroundColor: 'rgba(179, 61, 30, 0.05)',
  },
  paymentOptionText: {
    fontSize: 14,
    color: '#333333',
  },
  checkMark: {
    color: '#B33D1E',
    fontWeight: 'bold',
  },
  payNowButton: {
    backgroundColor: '#B33D1E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  payNowButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  }
});

export default styles;
