import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import RightArrow from '../assets/icons/RightArrow';

const InnerTravellerScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.innerTravellerContainer}>
      <View style={styles.innerTravellerContent}>
        <Text style={styles.innerTravellerTitle}>Unleash Your Inner Traveller</Text>
        <Text style={styles.innerTravellerSubtitle}>
          Your passport to a world of extraordinary hotel experiences. Join us today and unlock a realm of comfort, luxury, and adventure.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('SearchScreen')}
        >
          <Text style={styles.buttonText}>Start Exploring</Text>
          <Text><RightArrow/></Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.adminSection}>
          <Text style={styles.footerText}>If you are an </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.adminText}>admin</Text>
          </TouchableOpacity>
          <Text style={styles.highlightText}> ? Click Here !!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  innerTravellerContainer: {
    flex: 1,
    backgroundColor: '#FFF5EE',
  },
  innerTravellerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  innerTravellerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D35400',
    marginBottom: 16,
  },
  innerTravellerSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#D35400',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    color: '#666',
  },
  loginText: {
    color: '#D35400',
    fontWeight: '600',
  },
  adminSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  adminText: {
    color: '#D35400',
    fontWeight: '600',
  },
  highlightText: {
    color: '#FFD700',
    fontWeight: '600',
  },
});

export default InnerTravellerScreen;
