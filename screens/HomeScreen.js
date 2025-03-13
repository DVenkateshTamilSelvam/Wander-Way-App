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
  } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './HomeScreen.styles';
import HeartIcon from '../assets/icons/HeartIcon';
import LocationIcon from '../assets/icons/LocationIcon';
import CalendarIcon from '../assets/icons/CalendarIcon';
import NotificationBellIcon from '../assets/icons/NotificationBellIcon';
import FilterIcon from '../assets/icons/FilterIcon';
import SearchIcon from '../assets/icons/SearchIcon';
import MyBookingIcon from '../assets/icons/MyBookings';
import SearchHomeIcon from '../assets/icons/HomeIcon';
import StarIcon from '../assets/icons/StarIcon';

const { height } = Dimensions.get('window');


const HomeScreen = ({ route, navigation }) => {
  // Get search parameters from navigation
  const { searchParams = {} } = route.params || {};
  const {
    location = 'Bali, Indonesia',
    checkInDate = '24 OCT-26 OCT',
    checkOutDate,
    guestCount = 3,
    roomCount = 1,
  } = searchParams;

  const [filterVisible, setFilterVisible] = useState(false);

  const [selectedRating, setSelectedRating] = useState(4);
  const [priceRange, setPriceRange] = useState([90, 350]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [sortOption, setSortOption] = useState('Price Lower to Higher');

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

  // Sample hotel data
  const [hotels, setHotels] = useState([
    {
      id: '1',
      name: 'AYANA Resort',
      location: 'Tirunelveli',
      image: require('../assets/hotel-1.png'),
      priceRange: '2,000 - 5,000 RS',
      discount: '10% OFF',
      rating: 4.5,
      amenities: ['Free Wi-Fi', 'Pool', 'Spa'],
      category: 'recommended',
    },
    {
      id: '2',
      name: 'COMO Uma Resort',
      location: 'Tirunelveli',
      image: require('../assets/hotel-2.png'),
      priceRange: '3000 - 55,000 RS',
      discount: '10% OFF',
      rating: 4.7,
      amenities: ['Free Wi-Fi', 'Pool', 'Restaurant'],
      category: 'recommended',
    },
    {
      id: '3',
      name: 'Grand Business Center',
      location: 'Tirunelveli',
      image: require('../assets/hotel-3.png'),
      priceRange: '15,000 - 30,000 RS',
      amenities: ['Free Wi-Fi', 'AC Conference rooms'],
      category: 'business',
    },
    {
      id: '4',
      name: 'Corporate Suite',
      location: 'Tirunelveli',
      image: require('../assets/hotel-4.png'),
      priceRange: '25,000 - 35,000 RS',
      amenities: ['In-room work stations', 'Meeting Rooms'],
      category: 'business',
    },
  ]);

  // Filter hotels based on search parameters
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Search text state
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Filter hotels based on location
    const filtered = hotels.filter(hotel =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredHotels(filtered);
  }, [location, hotels]);

  const applyFilters = () => {
    let filtered = hotels.filter(hotel => {
      // Filter by location
      const locationMatch = hotel.location.toLowerCase().includes(location.toLowerCase());

      // Filter by rating
      const ratingMatch = selectedRating ? hotel.rating >= selectedRating : true;

      // Filter by price range
      const priceMatch = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];

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

    // Apply sorting
    if (sortOption === 'Price Lower to Higher') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price Higher to Lower') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredHotels(filtered);
    setFilterVisible(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedRating(null);
    setPriceRange([90, 350]);
    setSelectedFacilities([]);
    setSortOption('Price Lower to Higher');

    // Reset to original filtered list based on location
    const filtered = hotels.filter(hotel =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredHotels(filtered);
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
    } else {
      // Reset to original filtered list based on location
      const filtered = hotels.filter(hotel =>
        hotel.location.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredHotels(filtered);
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
          {item.amenities.map((amenity, index) => (
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

  // Fixed Filter Drawer - This was the problem
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
                <Text style={styles.priceRangeText}>${priceRange[0]}-${Math.round(priceRange[1])}</Text>
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

        <FlatList
          data={recommendedHotels}
          renderItem={renderRecommendedCard}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendedList}
        />

        {/* Business Accommodates (Vertical List) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Business Accommodates</Text>
        </View>

        {businessHotels.map(hotel => renderBusinessCard({ item: hotel }))}
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
