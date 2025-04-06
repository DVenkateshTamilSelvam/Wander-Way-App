import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions,
    Modal,
    Pressable,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../HomeScreen.styles';
import HeartIcon from '../../assets/icons/HeartIcon';
import LocationIcon from '../../assets/icons/LocationIcon';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import NotificationBellIcon from '../../assets/icons/NotificationBellIcon';
import FilterIcon from '../../assets/icons/FilterIcon';
import SearchIcon from '../../assets/icons/SearchIcon';
import MyBookingIcon from '../../assets/icons/MyBookings';
import SearchHomeIcon from '../../assets/icons/HomeIcon';
import StarIcon from '../../assets/icons/StarIcon';
import { API_BASE_URL } from '../../config/config';

const { height } = Dimensions.get('window');


const HomeScreen = ({ route, navigation }) => {
  // Get search parameters from navigation
  const { searchParams = {} } = route.params || {};
  const {
    location = 'Tirunelveli', // Changed default to match your database
    checkInDate = '24 OCT-26 OCT',
    checkOutDate,
    guestCount = 3,
    roomCount = 1,
  } = searchParams;

  const [filterVisible, setFilterVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedRating, setSelectedRating] = useState(4);
  const [priceRange, setPriceRange] = useState([90, 350]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [sortOption, setSortOption] = useState('Price Lower to Higher');

  // State for hotels and rooms
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Search text state
  const [searchText, setSearchText] = useState('');

  // Facilities list
  const facilities = [
    'Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'AC', 'Parking',
  ];

  // Format date display
  const formatDateRange = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      const formatDate = (date) => {
        const day = date.getDate();
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
      };

      return `${formatDate(checkIn)}-${formatDate(checkOut)}`;
    }
    return checkInDate; // Return default if dates not provided
  };

  // Fetch hotels and rooms from API
  useEffect(() => {
    // In the fetchData function
    const fetchData = async () => {
      setLoading(true);
      console.log('Starting to fetch data...');
      console.log(`API Base URL: ${API_BASE_URL}`);
      
      try {
        // Fetch all hotels
        console.log('Fetching hotels...');
        const hotelsResponse = await fetch(`${API_BASE_URL}/api/gethotels`);
        
        console.log('Hotels response status:', hotelsResponse.status);
        
        if (hotelsResponse.status !== 200 && hotelsResponse.status !== 304) {
          throw new Error(`Failed to fetch hotels: ${hotelsResponse.status}`);
        }
        
        let hotelsData;
        try {
          hotelsData = await hotelsResponse.json();
          console.log('Hotels data success status:', hotelsData.success);
          console.log('Number of hotels:', hotelsData.data ? hotelsData.data.length : 'No data array found');
        } catch (jsonError) {
          console.error('Error parsing hotels JSON:', jsonError);
          if (hotelsResponse.status === 304) {
            console.log('304 response - using cached data');
            hotelsData = { success: true, data: [] };
          } else {
            throw jsonError;
          }
        }
        
        // Similar approach for rooms
        console.log('Fetching rooms...');
        const roomsResponse = await fetch(`${API_BASE_URL}/api/getrooms`);
        
        console.log('Rooms response status:', roomsResponse.status);
        
        if (roomsResponse.status !== 200 && roomsResponse.status !== 304) {
          throw new Error(`Failed to fetch rooms: ${roomsResponse.status}`);
        }
        
        let roomsData;
        try {
          roomsData = await roomsResponse.json();
          console.log('Rooms data success status:', roomsData.success);
          console.log('Number of rooms:', roomsData.data ? roomsData.data.length : 'No data array found');
        } catch (jsonError) {
          console.error('Error parsing rooms JSON:', jsonError);
          if (roomsResponse.status === 304) {
            console.log('304 response for rooms - using cached data');
            roomsData = { success: true, data: [] };
          } else {
            throw jsonError;
          }
        }
        
        // Check if we actually have data to process
        if (!hotelsData.data || !roomsData.data) {
          console.error('Missing data in API response');
          throw new Error('API returned success but no data was found');
        }
        
        // Format and store the data
        console.log('Formatting hotels data...');
        let formattedHotels = formatHotelsData(hotelsData.data || []);
        console.log('Formatted hotels count:', formattedHotels.length);
        
        console.log('Formatting rooms data...');
        const formattedRooms = formatRoomsData(roomsData.data || []);
        console.log('Formatted rooms count:', formattedRooms.length);
        
        // Now update hotel price ranges based on rooms
        formattedHotels = formattedHotels.map(hotel => {
          return {
            ...hotel,
            priceRange: getPriceRangeFromRooms(hotel.id, formattedRooms)
          };
        });
        
        setHotels(formattedHotels);
        setRooms(formattedRooms);
        
        // Apply initial filtering based on location
        console.log('Filtering data by location:', location);
        filterDataByLocation(formattedHotels, formattedRooms, location);
        
        setLoading(false);
        console.log('Data fetch and processing complete');
      } catch (err) {
        console.error('Error fetching data:', err);
        console.error('Error stack:', err.stack);
        setError(err.message);
        setLoading(false);
        
        // If you want to completely remove sample data fallback, remove or comment out these lines:
        // const sampleData = getSampleData();
        // setHotels(sampleData.hotels);
        // setRooms(sampleData.rooms);
        // filterDataByLocation(sampleData.hotels, sampleData.rooms, location);

        Alert.alert(
          'Connection Error',
          `Error: ${err.message}. Please check your server connection.`,
          [{ text: 'OK' }]
        );
      }
    };

    fetchData();
  }, [location]);

  // Format hotels data from API to match our component structure
  // Format hotels data from API to match our component structure
// In formatHotelsData function
const formatHotelsData = (apiHotels) => {
  console.log('Starting to format hotels, count:', apiHotels.length);
  
  return apiHotels.map((hotel, index) => {
    try {
      console.log(`Processing hotel ${index} (ID: ${hotel.id}): ${hotel.hotelName}`);
      
      // Check if images exist
      if (!hotel.images) {
        console.warn(`Hotel ${hotel.id} has no images property`);
      } else {
        console.log(`Hotel ${hotel.id} has ${hotel.images.length} images`);
      }

      // Extract first image path or use default
      let imagePath;
      try {
        if (hotel.images && hotel.images.length > 0) {
          // Fix the URL formation to handle file paths correctly
          let imageSrc = hotel.images[0].imagePath;

          // Remove any Windows file path
          imageSrc = imageSrc.replace(/^.*[\\\/]uploads/, '/uploads');

          // Make sure we have a clean path
          const imageUrl = `${API_BASE_URL}${imageSrc}`;
          console.log(`Fixed image URL: ${imageUrl}`);

          imagePath = { uri: imageUrl };
        } else {
          console.log('Using default image for hotel', hotel.id);
          imagePath = require('../../assets/hotel-1.png');
        }
      } catch (imageError) {
        console.error(`Error processing image for hotel ${hotel.id}:`, imageError);
        imagePath = require('../../assets/hotel-1.png');
      }


      // Create a valid category
      const category = hotel.hotelName.toLowerCase().includes('business') ? 'business' : 'recommended';
      console.log(`Hotel ${hotel.id} category:`, category);

      // Return the formatted hotel object
      return {
        id: hotel.id.toString(),
        name: hotel.hotelName,
        location: hotel.address || 'Tirunelveli',
        image: imagePath,
        priceRange: '1,000 - 5,000 RS', // Will be updated later
        discount: hotel.discount || null,
        rating: hotel.rating || (Math.random() * 1.5 + 3.5).toFixed(1),
        amenities: hotel.amenities ? hotel.amenities.map(amenity => amenity.name) : ['Free Wi-Fi'],
        category: category,
        description: hotel.description,
        coordinates: {
          latitude: parseFloat(hotel.latitude || '0'),
          longitude: parseFloat(hotel.longitude || '0')
        }
      };
    } catch (hotelError) {
      console.error(`Failed to process hotel ${index}:`, hotelError);
      // Return fallback data
      return {
        id: hotel.id?.toString() || `fallback-${index}`,
        name: hotel.hotelName || 'Unknown Hotel',
        location: 'Tirunelveli',
        image: require('../../assets/hotel-1.png'),
        priceRange: '1,000 - 5,000 RS',
        rating: 4.0,
        amenities: ['Free Wi-Fi'],
        category: 'recommended',
      };
    }
  });
};

  // Format rooms data from API
  const formatRoomsData = (apiRooms) => {
    return apiRooms.map(room => {
      try {
        let imagePath;
        if (room.images && room.images.length > 0) {
          let imageSrc = room.images[0].imagePath;
  
          // Remove any unexpected path formatting
          imageSrc = imageSrc.replace(/^.*[\\\/]uploads/, '/uploads');
  
          imagePath = { uri: `${API_BASE_URL}${imageSrc}` };
        } else {
          imagePath = require('../../assets/hotel-4.png');
        }
  
        // Process additional images
        const images = room.images 
          ? room.images.map(img => ({ 
              uri: `${API_BASE_URL}${img.imagePath.replace(/^.*[\\\/]uploads/, '/uploads')}` 
            }))
          : [];
  
        return {
          id: room.id.toString(),
          hotelId: room.hotelId.toString(),
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          price: parseFloat(room.pricePerDay),
          image: imagePath, // Single image preview
          maxOccupancy: room.maxOccupancy,
          amenities: room.amenities ? room.amenities.map(amenity => amenity.name) : ['Free Wi-Fi', 'AC'],
          description: room.description,
          images: images // All images for display
        };
      // eslint-disable-next-line no-catch-shadow
      } catch (error) {
        console.error(`Error formatting room ${room.id}:`, error);
        return {
          id: room.id.toString(),
          hotelId: room.hotelId.toString(),
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          price: parseFloat(room.pricePerDay),
          image: require('../../assets/hotel-4.png'),
          maxOccupancy: room.maxOccupancy,
          amenities: ['Free Wi-Fi', 'AC'],
          description: room.description,
          images: []
        };
      }
    });
  };
  
  // Get price range string for a hotel based on its rooms
  const getPriceRangeFromRooms = (hotelId, roomsData) => {
    const hotelRooms = roomsData.filter(room => room.hotelId === hotelId.toString());
    
    if (hotelRooms.length === 0) {
      return '2,000 - 5,000 RS';
    }
    
    const prices = hotelRooms.map(room => room.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return `${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} RS`;
  };

  // Filter data by location
  const filterDataByLocation = (hotelsData, roomsData, locationQuery) => {
    // If no location query or it's the default, show all hotels
    if (!locationQuery || locationQuery === 'Tirunelveli') {
      setFilteredHotels(hotelsData);
      
      // Get all rooms
      setFilteredRooms(roomsData);
      return;
    }
    
    // Otherwise filter by location as you're currently doing
    const filteredHotelsResult = hotelsData.filter(hotel =>
      hotel.location.toLowerCase().includes(locationQuery.toLowerCase())
    );
    
    setFilteredHotels(filteredHotelsResult);
    
    // Get rooms for the filtered hotels
    const filteredHotelIds = filteredHotelsResult.map(hotel => hotel.id);
    const filteredRoomsResult = roomsData.filter(room =>
      filteredHotelIds.includes(room.hotelId)
    );
    
    setFilteredRooms(filteredRoomsResult);
  };


  const applyFilters = () => {
    let filtered = hotels.filter(hotel => {
      // Filter by location
      const locationMatch = hotel.location.toLowerCase().includes(location.toLowerCase());

      // Filter by rating
      const ratingMatch = selectedRating ? hotel.rating >= selectedRating : true;

      // Filter by price range - this would need to be refined based on your actual price representation
      const priceMatch = true; // Simplified for now, implement parsing logic for your price format

      // Filter by facilities/amenities if any selected
      let facilitiesMatch = true;
      if (selectedFacilities.length > 0) {
        facilitiesMatch = selectedFacilities.some(facility =>
          hotel.amenities.some(amenity =>
            amenity.toLowerCase().includes(facility.toLowerCase())
          )
        );
      }

      return locationMatch && ratingMatch && priceMatch && facilitiesMatch;
    });

    // Apply sorting (simplified, adjust according to your data structure)
    if (sortOption === 'Rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredHotels(filtered);

    // Filter rooms based on hotel filtering
    const filteredHotelIds = filtered.map(hotel => hotel.id);
    const filteredRoomsResult = rooms.filter(room =>
      filteredHotelIds.includes(room.hotelId)
    );

    setFilteredRooms(filteredRoomsResult);
    setFilterVisible(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedRating(null);
    setPriceRange([90, 350]);
    setSelectedFacilities([]);
    setSortOption('Price Lower to Higher');

    // Reset to original filtered list based on location
    filterDataByLocation(hotels, rooms, location);
  };

  // Filter hotels based on search text
  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const searchResults = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(text.toLowerCase()) ||
        hotel.location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredHotels(searchResults);
      
      // Filter rooms based on filtered hotels
      const filteredHotelIds = searchResults.map(hotel => hotel.id);
      const filteredRoomsResult = rooms.filter(room => 
        filteredHotelIds.includes(room.hotelId)
      );
      
      setFilteredRooms(filteredRoomsResult);
    } else {
      // Reset to original filtered list based on location
      filterDataByLocation(hotels, rooms, location);
    }
  };

  const toggleFacility = (facility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter(item => item !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  // Render hotel card for recommended section (horizontal)
  const renderRecommendedCard = ({ item }) => (
    <TouchableOpacity
      style={styles.horizontalCard}
      onPress={() => navigation.navigate('HotelDetail', { hotel: item })}
    >
      <Image source={item.image} style={styles.horizontalCardImage} />

      <View style={styles.cardContent}>
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}

        {item.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}><StarIcon/></Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => console.log('Added to favorites')}
        >
          <Text style={styles.favoriteIcon}><HeartIcon/></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}><LocationIcon/></Text>
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <Text style={styles.priceText}>{item.priceRange} <Text style={styles.nightText}>/night</Text></Text>
      </View>
    </TouchableOpacity>
  );

  // Render hotel card for business section (vertical)
  const renderBusinessCard = ({ item }) => (
    <TouchableOpacity
      style={styles.verticalCard}
      onPress={() => navigation.navigate('HotelDetail', { hotel: item })}
    >
      <Image source={item.image} style={styles.verticalCardImage} />

      <View style={styles.cardContentVertical}>
        <TouchableOpacity
          style={styles.favoriteButtonVertical}
          onPress={() => console.log('Added to favorites')}
        >
          <Text style={styles.favoriteIcon}><LocationIcon/></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hotelInfoVertical}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <View style={styles.amenitiesContainer}>
          {item.amenities.slice(0, 2).map((amenity, index) => (
            <View key={index} style={styles.amenityBadge}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  // Render room card
  const renderRoomCard = ({ item }) => (
    <TouchableOpacity
      style={styles.verticalCard}
      onPress={() => navigation.navigate('RoomDetail', { room: item })}
    >
      <Image source={item.image} style={styles.verticalCardImage} />

      <View style={styles.cardContentVertical}>
        <View style={styles.roomPriceBadge}>
          <Text style={styles.roomPriceText}>{item.price.toLocaleString()} RS</Text>
        </View>
      </View>

      <View style={styles.hotelInfoVertical}>
        <Text style={styles.hotelName}>{item.roomType} - Room {item.roomNumber}</Text>
        <View style={styles.amenitiesContainer}>
          <View style={styles.occupancyBadge}>
            <Text style={styles.occupancyText}>Max: {item.maxOccupancy} guests</Text>
          </View>
          {item.amenities.slice(0, 1).map((amenity, index) => (
            <View key={index} style={styles.amenityBadge}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Filter recommended hotels
  const recommendedHotels = filteredHotels.filter(hotel => hotel.category === 'recommended');

  // Filter business hotels
  const businessHotels = filteredHotels.filter(hotel => hotel.category === 'business');

  // Fixed Filter Drawer
  const renderFilterDrawer = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterVisible}
      onRequestClose={() => setFilterVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.filterContainer}>
          {/* Filter Header */}
          <View style={styles.filterHeader}>
            <TouchableOpacity onPress={() => setFilterVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.filterTitle}>Filter</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContent}>
            {/* Sort By */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <TouchableOpacity style={styles.sortSelection}>
                <Text>{sortOption}</Text>
                <Text style={styles.arrowIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Ratings */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Ratings</Text>
              <View style={styles.ratingOptions}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    style={[
                        styles.ratingButton,
                      selectedRating === rating && styles.selectedRating,
                    ]}
                    onPress={() => setSelectedRating(rating)}
                  >
                    <Text style={[
                      styles.ratingText,
                      selectedRating === rating && styles.selectedRatingText,
                    ]}>
                      {rating} <StarIcon />
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Ranges */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Price Ranges</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={50}
                  maximumValue={500}
                  minimumTrackTintColor="#B33D1E"
                  maximumTrackTintColor="#E0E0E0"
                  thumbTintColor="#B33D1E"
                  value={priceRange[1]}
                  onValueChange={(value) => setPriceRange([priceRange[0], value])}
                />
                <Text style={styles.priceRangeText}>Rs{priceRange[0]}-${Math.round(priceRange[1])}</Text>
              </View>
            </View>

            {/* Facilities */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Facilities</Text>
              <View style={styles.facilitiesContainer}>
                {facilities.map((facility) => (
                  <TouchableOpacity
                    key={facility}
                    style={[
                        styles.facilityButton,
                      selectedFacilities.includes(facility) && styles.selectedFacility,
                    ]}
                    onPress={() => toggleFacility(facility)}
                  >
                    <Text style={[
                      styles.facilityText,
                      selectedFacilities.includes(facility) && styles.selectedFacilityText,
                    ]}>
                      {facility}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Apply Button */}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={applyFilters}
          >
            <Text style={styles.applyButtonText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#B33D1E" />
        <Text style={styles.loadingText}>Loading hotels and rooms...</Text>
      </SafeAreaView>
    );
  }

  if (error && !hotels.length) {
    return (
      <SafeAreaView style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.replace('Home')}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with location and notification */}
      <View style={styles.header}>
        <View style={styles.locationHeader}>
          <Text style={styles.locationLabel}>Location</Text>
          <Text style={styles.locationValue}>{location}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}><NotificationBellIcon/></Text>
        </TouchableOpacity>
      </View>

      {/* Date and Guest Info */}
      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.infoButtonIcon}><CalendarIcon/></Text>
          <Text style={styles.infoButtonText}>{formatDateRange()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.infoButtonIcon}>👥</Text>
          <Text style={styles.infoButtonText}>{guestCount} guests</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}><SearchIcon/></Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Hotel By Name"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Text><FilterIcon/></Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContent}>
        {/* Recommended Hotels (Horizontal Scrolling) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Hotels</Text>
        </View>

        {/* Render filter drawer directly */}
        {renderFilterDrawer()}

        {recommendedHotels.length > 0 ? (
  <FlatList
    data={recommendedHotels}
    renderItem={renderRecommendedCard}
    keyExtractor={(item) => item.id.toString()}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.recommendedList}
  />
) : (
  <Text style={styles.noDataText}>No recommended hotels found. Total hotels: {filteredHotels.length}</Text>
)}

        {/* Business Accommodates (Vertical List) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Business Accommodates</Text>
        </View>

        {businessHotels.length > 0 ? (
          businessHotels.map(hotel => renderBusinessCard({ item: hotel }))
        ) : (
          <Text style={styles.noDataText}>No business accommodations found</Text>
        )}
        
        {/* Available Rooms Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Rooms</Text>
        </View>
        
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => renderRoomCard({ item: room }))
        ) : (
          <Text style={styles.noDataText}>No rooms available for the selected criteria</Text>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.activeNavItem]}><SearchHomeIcon/></Text>
          <Text style={[styles.navText, styles.activeNavItem]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.navIcon}><HeartIcon/></Text>
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Bookings')}
        >
          <Text style={styles.navIcon}><MyBookingIcon/></Text>
          <Text style={styles.navText}>My bookings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
