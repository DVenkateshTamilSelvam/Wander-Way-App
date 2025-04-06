import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import SplashScreen from './screens/SplashScreen';
import InnerTravellerScreen from './screens/InnerTravellerScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import HotelCreationScreen from './screens/HotelCreation/HotelCreationScreen';
import RoomCreationScreen from './screens/RoomCreation/RoomCreationScreen';
import BookingRecordsScreen from './screens/BookingRecordScreen';
import PaymentRecordsScreen from './screens/PaymentRecordsScreen';
import UpdateAvailabilityScreen from './screens/UpdateAvailabilityScreen';

// Main App Navigation
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="InnerTraveller" component={InnerTravellerScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen}/>
        <Stack.Screen name="HotelCreationScreen" component={HotelCreationScreen}/>
        <Stack.Screen name="RoomCreationScreen" component={RoomCreationScreen}/>
        <Stack.Screen name="BookingRecordsScreen" component={BookingRecordsScreen}/>
        <Stack.Screen name="PaymentRecordsScreen" component={PaymentRecordsScreen}/>
        <Stack.Screen name="UpdateAvailabilityScreen" component={UpdateAvailabilityScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
