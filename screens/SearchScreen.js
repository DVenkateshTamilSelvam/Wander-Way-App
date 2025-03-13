import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarIcon from '../assets/icons/CalendarIcon';
import HeartIcon from '../assets/icons/HeartIcon';
import MyBookingIcon from '../assets/icons/MyBookings';
import HomeIcon from '../assets/icons/HomeIcon';
import LocationIcon from '../assets/icons/LocationIcon';

const SearchScreen = ({ navigation }) => {
  // State variables
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  // Function to decrease count with minimum limit of 1
  const decreaseCount = (setter, value) => {
    if (value > 1) {
      setter(value - 1);
    }
  };

  // Function to handle date selection
  const handleDateSelect = (date, isCheckIn) => {
    if (isCheckIn) {
      setCheckInDate(date.dateString);
      setShowCheckInCalendar(false);
    } else {
      setCheckOutDate(date.dateString);
      setShowCheckOutCalendar(false);
    }
  };

  // Function to format date display
  const formatDateDisplay = (dateString) => {
    if (!dateString) {return 'DD/MM/YY';}

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);

    return `${day}/${month}/${year}`;
  };

  // Handle search button press
  // Handle search button press
const handleSearch = () => {
    // Navigate to home screen with search parameters
    navigation.replace('HomeScreen', {
      searchParams: {
        location,
        checkInDate,
        checkOutDate,
        guestCount,
        roomCount,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>

<KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex: 1}}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
  >
      {/* Background Image Header */}
      <View style={styles.headerImageContainer}>
        <Image
          source={require('../assets/hotel-view.png')}
          style={styles.headerImage}
        />

        {/* Welcome Text Overlay */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome to your next Adventure!</Text>
          <Text style={styles.welcomeSubtitle}>Discover the Perfect Stay with WanderStay</Text>
        </View>
      </View>

      {/* Search Form */}
      <View style={styles.searchForm}>
<Text style={styles.inputLabel}>Where?</Text>
<View style={styles.inputContainer}>
  <LocationIcon style={styles.inputIcon} />
  <TextInput
    style={styles.input}
    placeholder="Ex: Tirunelveli"
    value={location}
    onChangeText={setLocation}
  />
</View>

        {/* Date Selection Row */}
        <View style={styles.dateRow}>
          {/* Check-in Date */}
          <View style={styles.dateColumn}>
            <Text style={styles.inputLabel}>Check-in</Text>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => setShowCheckInCalendar(true)}
            >
              <Text style={styles.dateText}>
                {formatDateDisplay(checkInDate)}
              </Text>
              <Text style={styles.calendarIcon}><CalendarIcon/></Text>
            </TouchableOpacity>
          </View>

          {/* Check-out Date */}
          <View style={styles.dateColumn}>
            <Text style={styles.inputLabel}>Check-out</Text>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={() => setShowCheckOutCalendar(true)}
            >
              <Text style={styles.dateText}>
                {formatDateDisplay(checkOutDate)}
              </Text>
              <Text style={styles.calendarIcon}><CalendarIcon/></Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Guest and Room Selection Row */}
        <View style={styles.dateRow}>
          {/* Guest Counter */}
          <View style={styles.dateColumn}>
            <Text style={styles.inputLabel}>Guests</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => decreaseCount(setGuestCount, guestCount)}
              >
                <Text style={styles.counterButtonText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.counterValue}>{guestCount}</Text>

              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setGuestCount(guestCount + 1)}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Room Counter */}
          <View style={styles.dateColumn}>
            <Text style={styles.inputLabel}>Room</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => decreaseCount(setRoomCount, roomCount)}
              >
                <Text style={styles.counterButtonText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.counterValue}>{roomCount}</Text>

              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setRoomCount(roomCount + 1)}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity
          style={styles.findButton}
          onPress={handleSearch}
        >
          <Text style={styles.findButtonText}>FIND</Text>
        </TouchableOpacity>
      </View>

      </KeyboardAvoidingView>
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.activeNavItem]}><HomeIcon/></Text>
          <Text style={[styles.navText, styles.activeNavItem]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}><HeartIcon/></Text>
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}><MyBookingIcon/></Text>
          <Text style={styles.navText}>My Bookings</Text>
        </TouchableOpacity>
      </View>

      {/* Check-in Calendar Modal */}
      <Modal
        visible={showCheckInCalendar}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Text style={styles.calendarTitle}>Select Check-in Date</Text>
            <Calendar
              onDayPress={(day) => handleDateSelect(day, true)}
              markedDates={{
                [checkInDate]: {selected: true, selectedColor: '#D35400'},
              }}
              minDate={new Date().toISOString().split('T')[0]}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCheckInCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Check-out Calendar Modal */}
      <Modal
        visible={showCheckOutCalendar}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Text style={styles.calendarTitle}>Select Check-out Date</Text>
            <Calendar
              onDayPress={(day) => handleDateSelect(day, false)}
              markedDates={{
                [checkOutDate]: {selected: true, selectedColor: '#D35400'},
              }}
              minDate={checkInDate || new Date().toISOString().split('T')[0]}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCheckOutCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerImageContainer: {
    height: 350,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  welcomeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D35400',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#D35400',
  },
  searchForm: {
    padding: 20,
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateColumn: {
    width: '48%',
  },
  dateInputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  calendarIcon: {
    fontSize: 20,
  },
  locationIcon: {
    fontSize: 20,
  },
  counterContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  counterButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    fontSize: 24,
    color: '#D35400',
    fontWeight: '500',
  },
  counterValue: {
    fontSize: 18,
    color: '#333',
  },
  findButton: {
    backgroundColor: '#D35400',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  findButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    height: 60,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  activeNavItem: {
    color: '#D35400',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#D35400',
  },
  closeButton: {
    backgroundColor: '#D35400',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchScreen;
