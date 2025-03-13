import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

// Splash Screen with auto navigation timeout
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Set a timeout to navigate after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('InnerTraveller'); // Using replace instead of navigate to prevent going back to splash
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, [navigation]); // Dependency array ensures useEffect runs only once

  return (
    <ImageBackground
      // Replace this with your actual image path
      source={require('../assets/splash-background.png')} // You'll need to create this path
      // Or use a placeholder for now
      // source={{ uri: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.png' }}
      style={styles.splashBackground}
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>WanderStay</Text>
          <Text style={styles.tagline}>Find Your Stay, Your Way</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  splashBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    color: '#FFD700',
    fontSize: 18,
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default SplashScreen;
