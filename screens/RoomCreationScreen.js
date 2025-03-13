import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import BackIcon from '../assets/icons/BackIcon';

const RoomCreationScreen = ({ navigation }) => {
  const [roomNumber, setRoomNumber] = useState('121');
  const [hotelName, setHotelName] = useState('Apple Tree');
  const [roomType, setRoomType] = useState('Suite');
  const [pricePerDay, setPricePerDay] = useState('');
  const [amenities, setAmenities] = useState(['Heater', 'TV', 'AC', 'GYM']);
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [description, setDescription] = useState('Description of the Room');
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [amenityInput, setAmenityInput] = useState('');

  const amenityOptions = [
    'Heater', 'TV', 'AC', 'GYM', 'WiFi', 'Mini Bar',
    'Room Service', 'Bathtub', 'Shower', 'Kitchen', 'Balcony',
  ];


  const handleRoomTypeSelection = (type) => {
    setRoomType(type);
  };

  const handleSubmit = () => {
    // Handle form submission here
    alert('Room created successfully!');
    navigation.navigate('AdminHome');
  };

  const addAmenity = (amenity) => {
    if (amenity && !amenities.includes(amenity)) {
      setAmenities([...amenities, amenity]);
    }
    setAmenityInput('');
    setShowAmenitiesModal(false);
  };

  // Remove an amenity
  const removeAmenity = (amenityToRemove) => {
    setAmenities(amenities.filter(amenity => amenity !== amenityToRemove));
  };

  // Filter amenities based on input
  const filteredAmenities = amenityOptions.filter(
    option => option.toLowerCase().includes(amenityInput.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}><BackIcon/></Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Room Creation</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/luxury-room.png')}
            style={styles.roomImage}
          />
          <TouchableOpacity style={styles.uploadButton}>
            <Image
              source={require('../assets/upload.png')}
              style={styles.uploadIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Room No</Text>
        <TextInput
          style={styles.input}
          value={roomNumber}
          onChangeText={setRoomNumber}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Hotel Name</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInput}
            value={hotelName}
            editable={false}
          />
          <Text style={styles.dropdownIcon}>▼</Text>
        </View>

        <Text style={styles.label}>Room-Type</Text>
        <View style={styles.roomTypeContainer}>
          <TouchableOpacity
            style={[styles.roomTypeButton, roomType === 'Single' && styles.selectedRoomType]}
            onPress={() => handleRoomTypeSelection('Single')}
          >
            <Text style={styles.roomTypeText}>Single</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roomTypeButton, roomType === 'Double' && styles.selectedRoomType]}
            onPress={() => handleRoomTypeSelection('Double')}
          >
            <Text style={styles.roomTypeText}>Double</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roomTypeButton, roomType === 'Suite' && styles.selectedRoomType]}
            onPress={() => handleRoomTypeSelection('Suite')}
          >
            <Text style={[styles.roomTypeText, styles.selectedRoomTypeText]}>Suite</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Price per Day</Text>
        <TextInput
          style={styles.input}
          value={pricePerDay}
          onChangeText={setPricePerDay}
          keyboardType="numeric"
          placeholder="Enter price per day"
        />

<Text style={styles.label}>Amenities</Text>
      <View style={styles.amenitiesContainer}>
        <TouchableOpacity
          style={styles.amenitiesDropdown}
          onPress={() => setShowAmenitiesModal(true)}
        >
          <Text style={styles.amenitiesText}>Add Amenity</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        <View style={styles.amenitiesTags}>
          {amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityTagText}>{amenity}</Text>
              <TouchableOpacity onPress={() => removeAmenity(amenity)}>
                <Text style={styles.removeAmenityButton}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

        <Text style={styles.label}>Maximum Occupancy</Text>
        <TextInput
          style={styles.input}
          value={maxOccupancy}
          onChangeText={setMaxOccupancy}
          keyboardType="numeric"
          placeholder="Enter maximum occupancy"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      // eslint-disable-next-line react/jsx-no-undef
      <Modal
        visible={showAmenitiesModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Amenity</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search or type new amenity"
              value={amenityInput}
              onChangeText={setAmenityInput}
            />

            <FlatList
              data={filteredAmenities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.amenityOption}
                  onPress={() => addAmenity(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.amenityList}
            />

            {amenityInput && !amenityOptions.includes(amenityInput) && (
              <TouchableOpacity
                style={styles.addCustomButton}
                onPress={() => addAmenity(amenityInput)}
              >
                <Text style={styles.addCustomButtonText}>Add "{amenityInput}"</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowAmenitiesModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    fontSize: 24,
    color: '#D35400',
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D35400',
  },
  formContainer: {
    flex: 1,
    padding: 15,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  roomImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
  },
  uploadIcon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  dropdownInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  dropdownIcon: {
    paddingRight: 12,
    color: '#999',
  },
  roomTypeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  roomTypeButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  selectedRoomType: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  roomTypeText: {
    color: '#333',
  },
  selectedRoomTypeText: {
    color: '#FFFFFF',
  },
  amenitiesContainer: {
    marginBottom: 15,
  },
  amenitiesDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FF6B6B',
    marginBottom: 10,
  },
  amenitiesText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  amenitiesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityTag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  amenityTagText: {
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#D35400',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  amenitiesDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FF6B6B',
    marginBottom: 10,
  },
  amenitiesText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  amenitiesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityTag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityTagText: {
    color: '#333',
    marginRight: 5,
  },
  removeAmenityButton: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  amenityList: {
    maxHeight: 200,
  },
  amenityOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  addCustomButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addCustomButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
  },

});

export default RoomCreationScreen;
