import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const AdminHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../assets/hotel-exterior.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Welcome Admin</Text>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('HotelCreationScreen')}
            >
              <Text style={styles.menuButtonText}>Hotel Creation</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('RoomCreationScreen')}
            >
              <Text style={styles.menuButtonText}>Room Creation</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('BookingRecordsScreen')}
            >
              <Text style={styles.menuButtonText}>Booking Records</Text>
            </TouchableOpacity>
            

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('PaymentRecordsScreen')}
            >
              <Text style={styles.menuButtonText}>Payment Records</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 20,
    paddingTop: 200,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    marginTop: 20,
  },
  menuContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    gap: 30,
  },
  menuButton: {
    backgroundColor: '#D35400',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    position: 'absolute',
    right: 30,
    top: '40%',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default AdminHomeScreen;
