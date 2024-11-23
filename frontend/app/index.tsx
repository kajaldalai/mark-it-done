import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../components/Welcome';
import LoginScreen from '../components/Login';
import DashboardScreen from '../components/Dashboard';
import { Task } from '../components/Tasks/Task'
import { Leaderboard } from '../components/Leaderboard'
import { Rewards } from '../components/Rewards'

const Stack = createStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}