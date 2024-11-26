import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Header } from './Header';
import NavigationBar from './Navbar';

const NotificationItem = ({ title, description, time, reward }) => {
  return (
    <View style={styles.notificationWrapper}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.notificationItem}>
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <View style={styles.exclamationMark} />
            <Text style={styles.notificationTitle}>{title}</Text>
          </View>
          <Text style={styles.notificationDescription}>{description}</Text>
          <View style={styles.bottomRow}>
            <Image source={require('../assets/images/reward.png')} style={styles.diamondIcon} />
            <Text style={styles.rewardText}>{reward}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.pageTitle}>Notifications</Text>
      <ScrollView style={styles.scrollContainer}>
        <NotificationItem 
          title="CS495 Assignment 5"
          description="Hurry up! Only few hours left. Turn it in and take the win!"
          time="Due in 2 hours!"
          reward="450"
        />
        <NotificationItem 
          title="CS450 Project Proposal"
          description="Come on, beat the deadline, feel the freedom!"
          time="Due in 6 hours!"
          reward="300"
        />
        <NotificationItem 
          title="CS585 Assignment 5"
          description="Hey, mark it done, and enjoy the run!"
          time="Due in 2 days!"
          reward="250"
        />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#744be5',
    marginVertical: 20,
    textAlign: 'center',
    marginLeft: 0,
  },
  notificationWrapper: {
    marginBottom: 15,
    position: 'relative',
    paddingTop: 10,
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContent: {
    flex: 1,
    marginRight: 10,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exclamationMark: {
    width: 4,
    height: 16,
    backgroundColor: 'red',
    borderRadius: 2,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic'
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  diamondIcon: {
    width: 20,
    height: 16,
    marginRight: 4,
  },
  rewardText: {
    fontSize: 14,
    color: '#333',
  },
  timeContainer: {
    backgroundColor: '#ff4d4f',
    borderRadius: 20,
    padding: 8,
    position: 'absolute',
    right: 16,
    top: 0,
    zIndex: 1,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});


