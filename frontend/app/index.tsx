import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../components/Welcome';
import LoginScreen from '../components/Login';
import DashboardScreen from '../components/Dashboard';
import { Task } from '../components/Tasks/Task'
import { Leaderboard } from '../components/Leaderboard'
import { Rewards } from '../components/Rewards'
import { ProfileScreen } from '../components/Profile'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initDatabase } from '@/components/database';
import { ReferralScreen } from '../components/ReferralScreen';
import { SettingsScreen } from '../components/Settings';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Task" component={Task} />
          <Stack.Screen name="Leaderboard" component={Leaderboard} />
          <Stack.Screen name="Home" component={Task} />
          <Stack.Screen name="Rewards" component={Rewards} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Referral" component={ReferralScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
