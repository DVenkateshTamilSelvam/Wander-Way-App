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
  FlatList,
  Modal,
} from 'react-native';
import BackIcon from '../assets/icons/BackIcon';
import LocationIcon from '../assets/icons/LocationIcon';

const HotelCreationScreen = ({ navigation }) => {
  const [hotelName, setHotelName] = useState('Apple Tree');
  const [location, setLocation] = useState('Vannarapettai');
  const [description, setDescription] = useState('Description of the Hotel');
  const [phoneNumber, setPhoneNumber] = useState('+91 9876543210');
  const [amenities, setAmenities] = useState(['Heater', 'TV', 'AC', 'GYM']);
const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [amenityInput, setAmenityInput] = useState('');

  const amenityOptions = [
    'Heater', 'TV', 'AC', 'GYM', 'WiFi', 'Mini Bar',
    'Room Service', 'Bathtub', 'Shower', 'Kitchen', 'Balcony',
  ];

  const handleSubmit = () => {
    // Handle form submission here
    alert('Hotel created successfully!');
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
        <Text style={styles.headerTitle}>Hotel Creation</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/hotel-night.png')}
            style={styles.hotelImage}
          />
          <TouchableOpacity style={styles.uploadButton}>
            <Image
              source={require('../assets/upload.png')}
              style={styles.uploadIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Hotel Name</Text>
        <TextInput
          style={styles.input}
          value={hotelName}
          onChangeText={setHotelName}
        />

        <Text style={styles.label}>Location</Text>
        <View style={styles.locationInputContainer}>
          <TextInput
            style={styles.locationInput}
            value={location}
            onChangeText={setLocation}
          />
          <View style={styles.locationIcon}>
            <Text style={styles.locationIconText}><LocationIcon/></Text>
          </View>
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
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

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
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
  hotelImage: {
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
    color: '#FF6B6B',
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
  locationInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 15,
  },
  locationInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  locationIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  locationIconText: {
    fontSize: 16,
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
  dropdownIcon: {
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

export default HotelCreationScreen;
