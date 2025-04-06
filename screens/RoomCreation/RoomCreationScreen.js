import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import BackIcon from '../../assets/icons/BackIcon';
import styles from './styles';
import { API_BASE_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoomCreationScreen = ({ navigation, route }) => {
  // Get userId from route params if available
  const routeUserId = route.params?.userId || null;
  
  const [userId, setUserId] = useState(routeUserId);
  const [roomNumber, setRoomNumber] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [hotelId, setHotelId] = useState(null);
  const [roomType, setRoomType] = useState('Suite');
  const [pricePerDay, setPricePerDay] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [maxOccupancy, setMaxOccupancy] = useState('');
  const [description, setDescription] = useState('');
  const [roomImages, setRoomImages] = useState([]); // Changed to array for multiple images
  
  // States for modals
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showHotelsModal, setShowHotelsModal] = useState(false);
  const [amenityInput, setAmenityInput] = useState('');
  
  // State for hotels and amenities from API
  const [hotels, setHotels] = useState([]);
  const [availableAmenities, setAvailableAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get user ID from AsyncStorage if not provided in route params
  useEffect(() => {
    const getUserData = async () => {
      if (!routeUserId) {
        try {
          const userDataString = await AsyncStorage.getItem('userData');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            if (userData.id) {
              setUserId(userData.id);
            } else {
              Alert.alert('Error', 'User ID not found, please login again');
              navigation.goBack();
            }
          } else {
            Alert.alert('Error', 'User session not found, please login again');
            navigation.goBack();
          }
        } catch (error) {
          console.error('Error retrieving user data:', error);
          Alert.alert('Error', 'Failed to retrieve user data');
          navigation.goBack();
        }
      }
    };

    getUserData();
  }, [routeUserId, navigation]);

  // Fetch hotels maintained by this user once we have the userId
  useEffect(() => {
    if (userId) {
      fetchUserHotels();
      fetchRoomAmenities();
    }
  }, [userId]);

  const fetchUserHotels = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/hotels/admin/${userId}`);
      const result = await response.json();
      
      if (result.success) {
        setHotels(result.data);
      } else {
        Alert.alert('Error', 'Failed to fetch hotels');
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      Alert.alert('Error', 'Network error while fetching hotels');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoomAmenities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/roomamenities`);
      const result = await response.json();
      
      if (result.success) {
        setAvailableAmenities(result.data.map(item => item.name));
      }
    } catch (error) {
      console.error('Error fetching amenities:', error);
    }
  };

  const handleRoomTypeSelection = (type) => {
    setRoomType(type);
  };

  const selectHotel = (hotel) => {
    setHotelName(hotel.hotelName);
    setHotelId(hotel.id);
    setShowHotelsModal(false);
  };

  const addAmenity = (amenity) => {
    if (amenity && !amenities.includes(amenity)) {
      setAmenities([...amenities, amenity]);
    }
    setAmenityInput('');
    setShowAmenitiesModal(false);
  };

  const removeAmenity = (amenityToRemove) => {
    setAmenities(amenities.filter(amenity => amenity !== amenityToRemove));
  };

  // Filter amenities based on input
  const filteredAmenities = availableAmenities.filter(
    option => option.toLowerCase().includes(amenityInput.toLowerCase())
  );

  const uploadImages = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1200,
      maxHeight: 1200,
      includeBase64: false,
      selectionLimit: 10, // Allow multiple selections
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Error', 'Failed to pick images');
      } else if (response.assets && response.assets.length > 0) {
        // Append new images to existing ones
        setRoomImages([...roomImages, ...response.assets]);
      }
    });
  };

  const removeImage = (index) => {
    const updatedImages = [...roomImages];
    updatedImages.splice(index, 1);
    setRoomImages(updatedImages);
  };

  const handleSubmit = async () => {
    // Validation
    if (!roomNumber || !hotelId || !pricePerDay || !maxOccupancy) {
      Alert.alert('Missing Information', 'Please fill all required fields');
      return;
    }

    if (roomImages.length < 3) {
      Alert.alert('Images Required', 'Please upload at least 3 room images');
      return;
    }

    setIsLoading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('roomNumber', roomNumber);
      formData.append('hotelId', hotelId);
      formData.append('roomType', roomType);
      formData.append('pricePerDay', pricePerDay);
      formData.append('maxOccupancy', maxOccupancy);
      formData.append('description', description);
      formData.append('amenities', JSON.stringify(amenities));
      formData.append('createdBy', userId); // Add the user ID who created this room

      // Append room images
      roomImages.forEach((image, index) => {
        const imageName = image.uri.split('/').pop();
        const imageType = 'image/' + (imageName.split('.').pop() === 'png' ? 'png' : 'jpeg');
        
        formData.append('images', {
          uri: image.uri,
          name: imageName || `room${index}.jpg`,
          type: imageType,
        });
      });

      // Send API request
      const response = await fetch(`${API_BASE_URL}/api/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Room created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('AdminHomeScreen') }
        ]);
      } else {
        Alert.alert('Error', result.message || 'Failed to create room');
      }
    } catch (error) {
      console.error('Error creating room:', error);
      Alert.alert('Error', 'Network error while creating room');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}><BackIcon/></Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Room Creation</Text>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      <ScrollView style={styles.formContainer}>
        <View style={styles.imageUploadSection}>
          <Text style={styles.imageUploadTitle}>Room Images (Min 3 required)*</Text>
          <Text style={styles.imageUploadSubtitle}>
            {roomImages.length} of 3 minimum images selected
          </Text>
          
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImages}>
            <Image
              source={require('../../assets/upload.png')}
              style={styles.uploadIcon}
            />
            <Text style={styles.uploadButtonText}>Add Images</Text>
          </TouchableOpacity>
          
          {roomImages.length > 0 && (
            <ScrollView 
              horizontal 
              style={styles.imagesContainer}
              showsHorizontalScrollIndicator={false}
            >
              {roomImages.map((image, index) => (
                <View key={index} style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.imagePreview}
                  />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeImageButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <Text style={styles.label}>Room No*</Text>
        <TextInput
          style={styles.input}
          value={roomNumber}
          onChangeText={setRoomNumber}
          keyboardType="numeric"
          placeholder="Enter room number"
        />

        <Text style={styles.label}>Hotel Name*</Text>
        <TouchableOpacity 
          style={styles.dropdownContainer}
          onPress={() => setShowHotelsModal(true)}
        >
          <TextInput
            style={styles.dropdownInput}
            value={hotelName}
            editable={false}
            placeholder="Select hotel"
          />
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Room-Type</Text>
        <View style={styles.roomTypeContainer}>
          <TouchableOpacity
            style={[styles.roomTypeButton, roomType === 'Single' && styles.selectedRoomType]}
            onPress={() => handleRoomTypeSelection('Single')}
          >
            <Text style={[styles.roomTypeText, roomType === 'Single' && styles.selectedRoomTypeText]}>Single</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roomTypeButton, roomType === 'Double' && styles.selectedRoomType]}
            onPress={() => handleRoomTypeSelection('Double')}
          >
            <Text style={[styles.roomTypeText, roomType === 'Double' && styles.selectedRoomTypeText]}>Double</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roomTypeButton, roomType === 'Suite' && styles.selectedRoomType]}
            onPress={() => handleRoomTypeSelection('Suite')}
          >
            <Text style={[styles.roomTypeText, roomType === 'Suite' && styles.selectedRoomTypeText]}>Suite</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Price per Day (Rs)*</Text>
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

        <Text style={styles.label}>Maximum Occupancy*</Text>
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
          placeholder="Enter room description"
        />

        <TouchableOpacity 
          style={[styles.submitButton, isLoading && styles.disabledButton]} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Creating...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Hotels Modal */}
      <Modal
        visible={showHotelsModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Hotel</Text>

            {hotels.length === 0 ? (
              <Text style={styles.noDataText}>No hotels found</Text>
            ) : (
              <FlatList
                data={hotels}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.hotelOption}
                    onPress={() => selectHotel(item)}
                  >
                    <Text style={styles.hotelName}>{item.hotelName}</Text>
                    <Text style={styles.hotelAddress}>{item.address}</Text>
                  </TouchableOpacity>
                )}
                style={styles.hotelList}
              />
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowHotelsModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Amenities Modal */}
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

            {amenityInput && !availableAmenities.includes(amenityInput) && (
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

export default RoomCreationScreen;