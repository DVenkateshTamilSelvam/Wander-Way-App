import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Switch,
  Alert,
  BackHandler,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BackIcon from '../assets/icons/BackIcon';

const UpdateAvailabilityScreen = ({ navigation }) => {
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate fetching hotels
    setLoading(true);
    setTimeout(() => {
      setHotels([
        { id: '1', name: 'Grand Hotel' },
        { id: '2', name: 'Beach Resort' },
        { id: '3', name: 'Mountain Lodge' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Fetch rooms when hotel is selected
  useEffect(() => {
    if (selectedHotel) {
      setLoadingRooms(true);
      setRooms([]);
      setSelectedRoom(null);

      // Simulate fetching rooms for selected hotel
      setTimeout(() => {
        setRooms([
          { id: '101', name: 'Room 101', available: true },
          { id: '102', name: 'Room 102', available: false },
          { id: '103', name: 'Suite 103', available: true },
        ]);
        setLoadingRooms(false);
      }, 800);
    }
  }, [selectedHotel]);

  // Set availability when room is selected
  useEffect(() => {
    if (selectedRoom) {
      const room = rooms.find(r => r.id === selectedRoom);
      if (room) {
        setIsAvailable(room.available);
      }
    }
  }, [selectedRoom, rooms]);

  const handleUpdateAvailability = () => {
    if (!selectedHotel || !selectedRoom) {
      Alert.alert('Selection Required', 'Please select both hotel and room');
      return;
    }

    setLoading(true);

    // Simulate API call to update room availability
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        `Availability for ${rooms.find(r => r.id === selectedRoom)?.name} has been updated to ${isAvailable ? 'Available' : 'Not Available'}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}><BackIcon/></Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Room Availability</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Hotel</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#D35400" />
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedHotel}
                onValueChange={(itemValue) => setSelectedHotel(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="-- Select a hotel --" value={null} />
                {hotels.map((hotel) => (
                  <Picker.Item key={hotel.id} label={hotel.name} value={hotel.id} />
                ))}
              </Picker>
            </View>
          )}
        </View>

        {selectedHotel && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Select Room</Text>
            {loadingRooms ? (
              <ActivityIndicator size="small" color="#D35400" />
            ) : (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedRoom}
                  onValueChange={(itemValue) => setSelectedRoom(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="-- Select a room --" value={null} />
                  {rooms.map((room) => (
                    <Picker.Item key={room.id} label={room.name} value={room.id} />
                  ))}
                </Picker>
              </View>
            )}
          </View>
        )}

        {selectedRoom && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Set Availability</Text>
            <View style={styles.availabilityContainer}>
              <Text style={styles.availabilityText}>
                {isAvailable ? 'Available' : 'Not Available'}
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isAvailable ? '#2196F3' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsAvailable(!isAvailable)}
                value={isAvailable}
              />
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.updateButton,
            (!selectedHotel || !selectedRoom) && styles.disabledButton,
          ]}
          onPress={handleUpdateAvailability}
          disabled={!selectedHotel || !selectedRoom || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.updateButtonText}>Update Availability</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  availabilityText: {
    fontSize: 16,
    color: '#333333',
  },
  updateButton: {
    backgroundColor: '#D35400',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UpdateAvailabilityScreen;
