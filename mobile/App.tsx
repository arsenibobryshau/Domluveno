import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignupScreen } from './src/screens/SignupScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { CalendarScreen } from './src/screens/CalendarScreen';
import { AvailabilityScreen } from './src/screens/AvailabilityScreen';
import { PortalScreen } from './src/screens/PortalScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/theme';

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({ color, size }) => {
          let icon = 'home';
          if (route.name === 'Kalendář') icon = 'calendar';
          if (route.name === 'Dostupnost') icon = 'time';
          if (route.name === 'Portal') icon = 'grid';
          if (route.name === 'Profil') icon = 'person';
          return <Ionicons name={icon as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Domů" component={HomeScreen} />
      <Tab.Screen name="Kalendář" component={CalendarScreen} />
      <Tab.Screen name="Dostupnost" component={AvailabilityScreen} />
      <Tab.Screen name="Portal" component={PortalScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboarding ? (
          <Stack.Screen name="Onboarding">
            {() => (
              <OnboardingScreen
                onGetStarted={() => setShowOnboarding(false)}
                onLogin={() => setShowOnboarding(false)}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreenWrapper} />
            <Stack.Screen name="Signup" component={SignupScreenWrapper} />
            <Stack.Screen name="Main" component={MainTabs} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// jednoduché obalení pro navigaci mezi login/signup -> main
const LoginScreenWrapper = ({ navigation }: any) => (
  <LoginScreen
    onLoginSuccess={() => navigation.replace('Main')}
    onSwitchToSignup={() => navigation.navigate('Signup')}
    onForgot={() => {}}
  />
);

const SignupScreenWrapper = ({ navigation }: any) => (
  <SignupScreen
    onSignupSuccess={() => navigation.replace('Main')}
    onSwitchToLogin={() => navigation.navigate('Login')}
  />
);
