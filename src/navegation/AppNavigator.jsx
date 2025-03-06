import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//Componentes
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ReportScreen from '../screens/Report/ReportScreen'; 
import ReportedZoneMapScreen from '../screens/ReportedZoneMap/ReportedZoneMapScreen'; 
import Menu from '../components/Menu';
import NoticeScreen from '../screens/Notice/NoticeScreen';
import NoticiaDetalleScreen from '../screens/Notice/NoticiaDetalleScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ReporteScreen from '../screens/Reporte/ReporteScreen';
import ReporteView from '../screens/Reporte/ReporteView';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Notice" component={NoticeScreen} />
        <Stack.Screen name="NoticeDetails" component={NoticiaDetalleScreen} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
        <Stack.Screen name="ReportedZoneMap" component={ReportedZoneMapScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ReporteView" component={ReporteView} />
        <Stack.Screen name="Reporte" component={ReporteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}