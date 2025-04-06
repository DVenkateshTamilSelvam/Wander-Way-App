import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { API_BASE_URL } from '../config/config';
import BackIcon from '../assets/icons/BackIcon';
import UserAvatarIcon from '../assets/icons/UserAvatar';
import EmailIcon from '../assets/icons/EmailIcon';
import PasswordIcon from '../assets/icons/PasswordIcon';
import PhoneIcon from '../assets/icons/EmailIcon'; // You'll need to create or import this

const BackButton = () => (
  <TouchableOpacity>
    <Text><BackIcon/></Text>
  </TouchableOpacity>
);

const UserIcon = () => (
  <Text><UserAvatarIcon/></Text>
);

const EmailInputIcon = () => (
  <Text><EmailIcon/></Text>
);

const PasswordInputIcon = () => (
  <Text><PasswordIcon/></Text>
);

const PhoneInputIcon = () => (
  <Text><PhoneIcon/></Text> // If you don't have this icon, you can reuse another icon
);

const CreateAccountScreen = ({ navigation }) => {
  // State for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle signup
  const handleSignup = async () => {
    if (!username || !email || !phoneNumber || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    const payload = {
      name: username,
      email,
      password,
      phoneNumber,
      usertype: isAdmin ? 'admin' : 'user'
    };

    console.log('Payload:', payload); // Debugging the data before sending

    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response:', data); // Debugging response from the backend

      if (response.ok) {
        Alert.alert('Success', data.message, [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BackButton />
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>
          Create <Text style={styles.accentText}>Account</Text>
        </Text>
        <Text style={styles.subHeaderText}>
          Fill your information below or register with your social account.
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <UserIcon />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <EmailInputIcon />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <PhoneInputIcon />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <PasswordInputIcon />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Register as Admin</Text>
          <Switch
            value={isAdmin}
            onValueChange={setIsAdmin}
            trackColor={{ false: "#E0E0E0", true: "#D35400" }}
            thumbColor={isAdmin ? "#FFFFFF" : "#FFFFFF"}
          />
        </View>

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles with added style for switch container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  accentText: {
    color: '#D35400',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 16,
    height: 50,
    alignItems: 'center',
  },
  iconContainer: {
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
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
});

export default CreateAccountScreen;
