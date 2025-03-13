import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import BackIcon from '../assets/icons/BackIcon';
import UserAvatarIcon from '../assets/icons/UserAvatar';
import EmailIcon from '../assets/icons/EmailIcon';
import PasswordIcon from '../assets/icons/PasswordIcon';

const BackIon = () => (
  <TouchableOpacity>
    <Text><BackIcon/></Text>
  </TouchableOpacity>
);

const UserIcon = () => (
  <Text><UserAvatarIcon/></Text>
);

const EmailIon = () => (
  <Text><EmailIcon/></Text>
);

const PasswordIon = () => (
  <Text><PasswordIcon/></Text>
);

const CreateAccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BackIon />
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
            defaultValue="Priya"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <EmailIon />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
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
          />
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Continue</Text>
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
  loginText: {
    color: '#D35400',
    fontWeight: '600',
  },
});

export default CreateAccountScreen;
