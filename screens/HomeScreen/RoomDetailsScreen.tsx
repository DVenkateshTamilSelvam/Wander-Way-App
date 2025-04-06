import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from './styles';
import BackIcon from '../../assets/icons/BackIcon';
import HeartIcon from '../../assets/icons/HeartIcon';
import LocationIcon from '../../assets/icons/LocationIcon';
import StarIcon from '../../assets/icons/StarIcon';
import { API_BASE_URL } from '../../config/config';

const { width } = Dimensions.get('window');

const RoomDetailScreen = ({ route, navigation }) => {
  const { room } = route.params;
  
  // States for booking
  const [selectedDates, setSelectedDates] = useState({});
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(room.price);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get hotel details for this room
  const [hotel, setHotel] = useState(null);
  const [isLoadingHotel, setIsLoadingHotel] = useState(true);
  
  // Payment states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  // Reference for image slider
  const flatListRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Get the hotel data
  React.useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/gethotel/${room.hotelId}`);
        const hotelData = await response.json();
        
        if (hotelData.success && hotelData.data) {
          setHotel(hotelData.data);
        } else {
          console.log('Failed to fetch hotel details');
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      } finally {
        setIsLoadingHotel(false);
      }
    };
    
    fetchHotelDetails();
  }, [room.hotelId]);

  // Calculate number of nights and total price
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return room.price;
    
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return room.price * diffDays * guestCount;
  };

  // Handle date selection
  const handleDayPress = (day) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Start new selection
      const selected = {};
      selected[day.dateString] = { selected: true, startingDay: true, color: '#B33D1E' };
      setSelectedDates(selected);
      setCheckInDate(day.dateString);
      setCheckOutDate(null);
    } else {
      // Complete the selection
      const startDate = new Date(checkInDate);
      const endDate = new Date(day.dateString);

      // Ensure end date is after start date
      if (endDate < startDate) {
        Alert.alert('Invalid Selection', 'Check-out date must be after check-in date');
        return;
      }

      // Create date range
      const selected = {};
      selected[checkInDate] = { selected: true, startingDay: true, color: '#B33D1E' };
      selected[day.dateString] = { selected: true, endingDay: true, color: '#B33D1E' };

      // Fill in middle days
      let currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + 1);

      while (currentDate < endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        selected[dateString] = { selected: true, color: '#FFCDC2' };
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setSelectedDates(selected);
      setCheckOutDate(day.dateString);
      
      // Calculate total price
      const totalPrice = calculateTotalPrice();
      setTotalPrice(totalPrice);
    }
  };

  // Handle booking
  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      Alert.alert('Booking Error', 'Please select check-in and check-out dates');
      return;
    }
    
    if (guestCount > room.maxOccupancy) {
      Alert.alert('Booking Error', `Maximum occupancy for this room is ${room.maxOccupancy} guests`);
      return;
    }
    
    // Show payment modal
    setShowPaymentModal(true);
  };

  // Process payment
  const processPayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentModal(false);
      
      // Prepare booking data
      const bookingData = {
        roomId: room.id,
        hotelId: room.hotelId,
        checkInDate,
        checkOutDate,
        guestCount,
        totalAmount: totalPrice,
        paymentMethod,
      };
      
      // Navigate to confirmation screen
      navigation.navigate('BookingConfirmation', { bookingData });
    }, 2000);
  };

  // Adjust guest count
  const adjustGuestCount = (increment) => {
    const newCount = guestCount + increment;
    if (newCount >= 1 && newCount <= room.maxOccupancy) {
      setGuestCount(newCount);
      // Recalculate total price
      const newTotalPrice = calculateTotalPrice();
      setTotalPrice(newTotalPrice);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Render calendar modal
  const renderCalendarModal = () => (
    <Modal
      visible={calendarVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setCalendarVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>Select Dates</Text>
            <TouchableOpacity onPress={() => setCalendarVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          
          <Calendar
            markingType={'period'}
            markedDates={selectedDates}
            onDayPress={handleDayPress}
            minDate={new Date().toISOString().split('T')[0]}
            theme={{
              selectedDayBackgroundColor: '#B33D1E',
              todayTextColor: '#B33D1E',
              arrowColor: '#B33D1E',
            }}
          />
          
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={() => setCalendarVisible(false)}
          >
            <Text style={styles.applyButtonText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Render payment modal
  const renderPaymentModal = () => (
    <Modal
      visible={showPaymentModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowPaymentModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.paymentContainer}>
          <View style={styles.paymentHeader}>
            <Text style={styles.paymentTitle}>Payment</Text>
            <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.paymentContent}>
            <Text style={styles.paymentSectionTitle}>Booking Summary</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Room Type:</Text>
              <Text style={styles.summaryValue}>{room.roomType}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Check-in:</Text>
              <Text style={styles.summaryValue}>{formatDate(checkInDate)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Check-out:</Text>
              <Text style={styles.summaryValue}>{formatDate(checkOutDate)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Guests:</Text>
              <Text style={styles.summaryValue}>{guestCount}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Price per night:</Text>
              <Text style={styles.summaryValue}>{room.price.toLocaleString()} RS</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total:</Text>
              <Text style={styles.summaryValueTotal}>{totalPrice.toLocaleString()} RS</Text>
            </View>
            
            <Text style={styles.paymentSectionTitle}>Payment Method</Text>
            <TouchableOpacity 
              style={[styles.paymentOption, paymentMethod === 'creditCard' && styles.selectedPaymentOption]}
              onPress={() => setPaymentMethod('creditCard')}
            >
              <Text style={styles.paymentOptionText}>Credit Card</Text>
              {paymentMethod === 'creditCard' && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.paymentOption, paymentMethod === 'paypal' && styles.selectedPaymentOption]}
              onPress={() => setPaymentMethod('paypal')}
            >
              <Text style={styles.paymentOptionText}>PayPal</Text>
              {paymentMethod === 'paypal' && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.paymentOption, paymentMethod === 'googlePay' && styles.selectedPaymentOption]}
              onPress={() => setPaymentMethod('googlePay')}
            >
              <Text style={styles.paymentOptionText}>Google Pay</Text>
              {paymentMethod === 'googlePay' && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.payNowButton}
            onPress={processPayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.payNowButtonText}>PAY NOW</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Handle image change
  const handleImageChange = (index) => {
    setActiveImageIndex(index);
  };

  // Render room amenity item
  const renderAmenityItem = (amenity) => (
    <View style={styles.amenityItem} key={amenity}>
      <View style={styles.amenityIcon}>
        <Text>✓</Text>
      </View>
      <Text style={styles.amenityText}>{amenity}</Text>
    </View>
  );

  // Prepare room images array
  const roomImages = room.images && room.images.length > 0 
    ? room.images 
    : [room.image];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}><BackIcon /></Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Room Details</Text>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>
            <HeartIcon />
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Room Images Slider */}
        <View style={styles.imageContainer}>
          <FlatList
            ref={flatListRef}
            data={roomImages}
            renderItem={({ item }) => (
              <Image source={item} style={styles.roomImage} />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.floor(
                event.nativeEvent.contentOffset.x / width
              );
              handleImageChange(slideIndex);
            }}
          />
          
          {/* Image pagination dots */}
          <View style={styles.paginationContainer}>
            {roomImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  activeImageIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Room Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.roomType}>{room.roomType} - Room {room.roomNumber}</Text>
          
          {!isLoadingHotel && hotel ? (
            <View style={styles.hotelInfoRow}>
              <Text style={styles.hotelName}>{hotel.hotelName}</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationIcon}><LocationIcon /></Text>
                <Text style={styles.locationText}>{hotel.address || 'Tirunelveli'}</Text>
              </View>
              {hotel.rating && (
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingIcon}><StarIcon /></Text>
                  <Text style={styles.ratingText}>{hotel.rating}</Text>
                </View>
              )}
            </View>
          ) : (
            <ActivityIndicator size="small" color="#B33D1E" />
          )}
          
          <Text style={styles.priceText}>
            {room.price.toLocaleString()} RS <Text style={styles.nightText}>/night</Text>
          </Text>
        </View>
        
        {/* Room Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {room.description || 'Experience luxury and comfort in this spacious room. Perfect for both business and leisure travelers, featuring modern amenities and elegant decor to make your stay memorable.'}
          </Text>
        </View>
        
        {/* Room Amenities */}
        <View style={styles.amenitiesContainer}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesList}>
            {room.amenities && room.amenities.length > 0 
              ? room.amenities.map(amenity => renderAmenityItem(amenity))
              : ['Free Wi-Fi', 'AC', 'TV', 'Room Service'].map(amenity => renderAmenityItem(amenity))
            }
          </View>
        </View>
        
        {/* Room Details */}
        <View style={styles.roomDetailsContainer}>
          <Text style={styles.sectionTitle}>Room Details</Text>
          <View style={styles.roomDetailsList}>
            <View style={styles.roomDetailItem}>
              <Text style={styles.detailLabel}>Maximum Occupancy</Text>
              <Text style={styles.detailValue}>{room.maxOccupancy} Guests</Text>
            </View>
            <View style={styles.roomDetailItem}>
              <Text style={styles.detailLabel}>Room Size</Text>
              <Text style={styles.detailValue}>300 sq ft</Text>
            </View>
            <View style={styles.roomDetailItem}>
              <Text style={styles.detailLabel}>Bed Type</Text>
              <Text style={styles.detailValue}>
                {room.roomType.includes('Single') ? 'Queen Bed' : 'King Bed + Twin Bed'}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Policy */}
        <View style={styles.policyContainer}>
          <Text style={styles.sectionTitle}>Policy</Text>
          <View style={styles.policyItem}>
            <Text style={styles.policyLabel}>Check-in Time</Text>
            <Text style={styles.policyValue}>12:00 PM</Text>
          </View>
          <View style={styles.policyItem}>
            <Text style={styles.policyLabel}>Check-out Time</Text>
            <Text style={styles.policyValue}>11:00 AM</Text>
          </View>
          <View style={styles.policyItem}>
            <Text style={styles.policyLabel}>Cancellation</Text>
            <Text style={styles.policyValue}>Free cancellation up to 24 hours before check-in</Text>
          </View>
        </View>
        
        {/* Extra space at bottom for booking bar */}
        <View style={{ height: 80 }} />
      </ScrollView>
      
      {/* Booking Bar */}
      <View style={styles.bookingBar}>
        <View style={styles.datesGuestsContainer}>
          <TouchableOpacity 
            style={styles.dateSelection}
            onPress={() => setCalendarVisible(true)}
          >
            <Text style={styles.dateLabel}>
              {checkInDate && checkOutDate 
                ? `${formatDate(checkInDate).split(',')[0]} - ${formatDate(checkOutDate).split(',')[0]}` 
                : 'Select Dates'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.guestSelection}>
            <TouchableOpacity 
              style={styles.guestButton}
              onPress={() => adjustGuestCount(-1)}
            >
              <Text style={styles.guestButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.guestCount}>{guestCount}</Text>
            <TouchableOpacity 
              style={styles.guestButton}
              onPress={() => adjustGuestCount(1)}
            >
              <Text style={styles.guestButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.bookNowButton}
          onPress={handleBooking}
        >
          <Text style={styles.bookNowText}>BOOK NOW</Text>
        </TouchableOpacity>
      </View>
      
      {/* Modals */}
      {renderCalendarModal()}
      {renderPaymentModal()}
    </SafeAreaView>
  );
};

export default RoomDetailScreen;