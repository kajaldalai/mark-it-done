import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import { Task } from '../screens/Tasks/Task'
import { Leaderboard } from '../screens/Leaderbpard/Leaderboard'
import { Rewards } from '../screens/Reward/Rewards'
import { ProfileScreen } from '../screens/Profile'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initDatabase, insertInitialTasks } from '../database';
import { ReferralScreen } from '../screens/Referral';
import { SettingsScreen } from '../screens/Settings';
import { NotificationsScreen } from '../screens/Notification';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initDatabase();
    insertInitialTasks();
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
          <Stack.Screen name="Task" component={Task} />
          <Stack.Screen name="Leaderboard" component={Leaderboard} />
          <Stack.Screen name="Home" component={Task} />
          <Stack.Screen name="Rewards" component={Rewards} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Referral" component={ReferralScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
