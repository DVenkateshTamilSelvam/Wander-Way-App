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
  FlatList,
  Modal,
  ActivityIndicator,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import BackIcon from '../../assets/icons/BackIcon';
import LocationIcon from '../../assets/icons/LocationIcon';
import { API_BASE_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const HotelCreationScreen = ({ navigation }) => {
  const [hotelName, setHotelName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [amenityInput, setAmenityInput] = useState('');
  const [amenityOptions, setAmenityOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Fetch amenities on component mount
  useEffect(() => {
    fetchAmenities();
    requestPermissions();
  }, []);

  // Request necessary permissions
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        // Request camera permissions
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to upload images',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        // Request storage permissions
        const storageGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to save images',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        // Request location permissions
        const locationGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (
          cameraGranted !== PermissionsAndroid.RESULTS.GRANTED ||
          storageGranted !== PermissionsAndroid.RESULTS.GRANTED ||
          locationGranted !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          Alert.alert('Permission Denied', 'Some permissions were not granted');
        }
      } catch (err) {
        console.error('Permission error: ', err);
      }
    } else if (Platform.OS === 'ios') {
      // For iOS, permissions are requested when using the services
      Geolocation.requestAuthorization('whenInUse');
    }
  };

  // Function to fetch all amenities
  const fetchAmenities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/hotelamenities`);
      const result = await response.json();
      if (result.success) {
        setAmenityOptions(result.data);
      } else {
        setError('Failed to fetch amenities');
      }
    } catch (err) {
      console.error('Error fetching amenities:', err);
      setError('Network error when fetching amenities');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to search amenities
  const searchAmenities = async (searchTerm) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/hotelamenities/search?term=${searchTerm}`);
      const result = await response.json();

      if (result.success) {
        setAmenityOptions(result.data);
      } else {
        setError('Failed to search amenities');
      }
    } catch (err) {
      console.error('Error searching amenities:', err);
      setError('Network error when searching amenities');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmenityInputChange = (text) => {
    setAmenityInput(text);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Debounce search to avoid too many API calls
    if (text.length > 0) {
      const timeout = setTimeout(() => {
        searchAmenities(text);
      }, 500);
      setSearchTimeout(timeout);
    } else {
      fetchAmenities(); // Reset to all amenities when input is cleared
    }
  };

  // Handle image selection using react-native-image-picker
  const pickImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1200,
        maxHeight: 1200,
        includeBase64: false,
      };

      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', 'Failed to select image');
        } else if (response.assets && response.assets.length > 0) {
          // Limit to 5 images
          if (images.length >= 5) {
            Alert.alert('Limit reached', 'You can upload maximum 5 images');
            return;
          }

          const newImage = response.assets[0];
          setImages([...images, newImage]);
        }
      });
    } catch (err) {
      console.error('Error picking image:', err);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  // Remove an image
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Get current location using react-native-geolocation-service
  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);

      // Check for location permission on Android
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (!granted) {
          // Permission is not granted, request it again
          const requestResult = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to proceed',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );

          if (requestResult !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
              'Permission Required',
              'Location permission is required to get your current coordinates',
              [{ text: 'OK' }]
            );
            setIsLoading(false);
            return;
          }
        }
      }

      // For iOS, request permission
      if (Platform.OS === 'ios') {
        const authStatus = await Geolocation.requestAuthorization('whenInUse');
        if (authStatus !== 'granted') {
          Alert.alert(
            'Permission denied',
            'Please allow location access in your device settings to use this feature',
            [{ text: 'OK' }]
          );
          setIsLoading(false);
          return;
        }
      }

      // Permissions are granted, get current position
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: long } = position.coords;
          setLatitude(lat.toString());
          setLongitude(long.toString());

          // Set address to coordinates for now
          setAddress(`${lat}, ${long}`);
          setIsLoading(false);

          // Note: The Google Maps reverse geocoding requires an API key
          // You can implement it here if you have a valid key
        },
        // eslint-disable-next-line no-shadow
        (error) => {
          console.error('Error getting location:', error);
          Alert.alert('Location Error', `Failed to get current location: ${error.message}`);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (err) {
      console.error('Error getting location:', err);
      Alert.alert('Error', 'Failed to get current location');
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!hotelName.trim() || !address.trim() || !latitude || !longitude) {
      Alert.alert('Missing information', 'Please fill in all required fields');
      return;
    }

    if (images.length === 0) {
      Alert.alert('Images required', 'Please upload at least one image of your hotel');
      return;
    }

    try {
      setIsLoading(true);

      // Get admin ID from storage (assuming you store it during login)
      const userDataString = await AsyncStorage.getItem('userData');

    if (!userDataString) {
      Alert.alert('Error', 'User session not found, please login again');
      setIsLoading(false);
      return;
    }

    // Parse the userData JSON string to get the user object
    const userData = JSON.parse(userDataString);
    const adminId = userData.id; // Use the id from the user object

    if (!adminId) {
      Alert.alert('Error', 'User ID not found, please login again');
      setIsLoading(false);
      return;
    }


      // Create form data
      const formData = new FormData();
      formData.append('hotelName', hotelName);
      formData.append('address', address);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('description', description);
      formData.append('phoneNumber', phoneNumber);
      formData.append('adminId', adminId);
      formData.append('amenities', JSON.stringify(amenities.map(amenity => amenity)));

      // Append images
      images.forEach((image, index) => {
        const imageName = image.uri.split('/').pop();
        const imageType = 'image/' + (imageName.split('.').pop() === 'png' ? 'png' : 'jpeg');

        formData.append('images', {
          uri: image.uri,
          name: imageName,
          type: imageType,
        });
      });

      // Send API request
      const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Hotel created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('AdminHomeScreen') },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Failed to create hotel');
      }

    } catch (err) {
      console.error('Error submitting form:', err);
      Alert.alert('Error', 'Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addAmenity = (amenity) => {
    if (amenity && !amenities.includes(amenity.name)) {
      setAmenities([...amenities, amenity.name]);
    }
    setAmenityInput('');
    setShowAmenitiesModal(false);
  };

  // Add custom amenity
  const addCustomAmenity = () => {
    if (amenityInput && !amenities.includes(amenityInput)) {
      setAmenities([...amenities, amenityInput]);
    }
    setAmenityInput('');
    setShowAmenitiesModal(false);
  };

  // Remove an amenity
  const removeAmenity = (amenityToRemove) => {
    setAmenities(amenities.filter(amenity => amenity !== amenityToRemove));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}><BackIcon/></Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hotel Creation</Text>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      <ScrollView style={styles.formContainer}>
        {/* Image Gallery */}
        <Text style={styles.label}>Hotel Images (Max 5)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageGallery}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.hotelImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <Text style={styles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}

          {images.length < 5 && (
            <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
              <Text style={styles.addImageText}>+</Text>
              <Text style={styles.addImageLabel}>Add Image</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <Text style={styles.label}>Hotel Name*</Text>
        <TextInput
          style={styles.input}
          value={hotelName}
          onChangeText={setHotelName}
          placeholder="Enter hotel name"
        />

        <Text style={styles.label}>Location*</Text>
        <View style={styles.locationInputContainer}>
          <TextInput
            style={styles.locationInput}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            multiline
          />
          <TouchableOpacity
            style={styles.locationIcon}
            onPress={getCurrentLocation}
          >
            <Text style={styles.locationIconText}><LocationIcon/></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.coordsContainer}>
          <View style={styles.coordInput}>
            <Text style={styles.coordLabel}>Latitude</Text>
            <TextInput
              style={styles.coordTextInput}
              value={latitude}
              onChangeText={setLatitude}
              keyboardType="numeric"
              placeholder="Latitude"
            />
          </View>
          <View style={styles.coordInput}>
            <Text style={styles.coordLabel}>Longitude</Text>
            <TextInput
              style={styles.coordTextInput}
              value={longitude}
              onChangeText={setLongitude}
              keyboardType="numeric"
              placeholder="Longitude"
            />
          </View>
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          placeholder="Describe your hotel"
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
          placeholder="Enter phone number"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isLoading}
        >
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
              onChangeText={handleAmenityInputChange}
            />

            {isLoading ? (
              <ActivityIndicator size="large" color="#FF6B6B" style={styles.loader} />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <FlatList
                data={amenityOptions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.amenityOption}
                    onPress={() => addAmenity(item)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
                style={styles.amenityList}
              />
            )}

            {amenityInput && !amenityOptions.some(opt => opt.name === amenityInput) && (
              <TouchableOpacity
                style={styles.addCustomButton}
                onPress={addCustomAmenity}
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

export default HotelCreationScreen;
