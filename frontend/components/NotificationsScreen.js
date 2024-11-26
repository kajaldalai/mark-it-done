import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationItem = ({ title, description, time, reward }) => {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationHeader}>
        <Ionicons name="alert-circle-outline" size={24} color="red" />
        <Text style={styles.notificationTitle}>{title}</Text>
      </View>
      <Text style={styles.notificationDescription}>{description}</Text>
      <Text style={styles.notificationTime}>{time}</Text>
      <View style={styles.reward}>
        <Text style={styles.rewardText}>{reward} 💎</Text>
      </View>
    </View>
  );
};

const NotificationsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Notifications</Text>
      <NotificationItem 
        title="CS495 Assignment 5"
        description="Hurry up! Only few hours left. Turn it in and take the win!"
        time="Due in 2 hours"
        reward="400"
      />
      <NotificationItem 
        title="CS450 Project Proposal"
        description="Come on, beat the deadline, feel the freedom!"
        time="Due in 6 hours"
        reward="400"
      />
      <NotificationItem 
        title="CS585 Assignment 5"
        description="Hey, mark it done, and enjoy the run!"
        time="Due in 2 days"
        reward="500"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 20,
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 10,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  reward: {
    marginTop: 10,
    backgroundColor: '#e5e5e5',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  rewardText: {
    fontSize: 14,
    color: '#333',
  },
});

export default NotificationsScreen;

//export { NotificationsScreen }; // Named export (not default)

