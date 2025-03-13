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
} from 'react-native';

import BackIcon from '../assets/icons/BackIcon';
import UserAvatarIcon from '../assets/icons/UserAvatar';
import PasswordIcon from '../assets/icons/PasswordIcon';

const BackIon = () => (
  <TouchableOpacity>
    <Text><BackIcon/></Text>
  </TouchableOpacity>
);

const UserIcon = () => (
  <Text><UserAvatarIcon/></Text>
);

const PasswordIon = () => (
  <Text><PasswordIcon/></Text>
);

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if username and password are "admin"
    if (username === 'admin' && password === 'admin') {
      // Navigate to AdminHomeScreen
      navigation.navigate('AdminHomeScreen');
    } else {
      // Show an error message for invalid credentials
      Alert.alert(
        'Login Failed',
        'Invalid username or password. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BackIon />

      <View style={styles.formContainer}>
        <Text style={styles.headerText}>
          Welcome <Text style={styles.accentText}>Back</Text>
        </Text>
        <Text style={styles.subHeaderText}>
          We missed you! Login to continue your journey with us.
        </Text>

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <UserIcon />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            defaultValue=""
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <PasswordIon />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Doesnt have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
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
  signupText: {
    color: '#D35400',
    fontWeight: '600',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -5,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#D35400',
    fontSize: 14,
  },
});

export default LoginScreen;
