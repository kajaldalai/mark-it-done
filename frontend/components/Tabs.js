import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const tasks = [
  { id: '1', title: 'CS495 Assignment 4', description: 'Set the wheels in motion...', points: 400, dueDate: 'Nov 11, 10:00 AM' },
  { id: '2', title: 'CS585 Homework 3', description: 'A quick win awaits...', points: 150, dueDate: 'Nov 15, 11:59 PM' },
  { id: '3', title: 'CS450 Project Proposal', description: 'Today’s the day...', points: 300, dueDate: 'Nov 20, 11:59 PM' },
  { id: '4', title: 'CS581 Quiz 5', description: 'I know I am here for a while...', points: 500, dueDate: 'Nov 20, 11:59 PM' },
];

export const TaskCard = ({ title, description, points, dueDate }) => (
  <View style={styles.card}>
    <View>
      <Text style={styles.taskTitle}>{title}</Text>
      <Text style={styles.taskDescription}>{description}</Text>
      <Text style={styles.taskDueDate}>Due on {dueDate}</Text>
    </View>
    <Text style={styles.taskPoints}>{points} 💎</Text>
  </View>
);

const Tabs = () => {
  return (
    <View style={styles.tabsContainer}>
      <View style={styles.tabButtons}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.tabText}>Kick Off</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>In Motion...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Victory Lap</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#EEE',
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: '#D6BCFA',
    borderRadius: 10,
  },
  tabText: {
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    margin: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    color: '#555',
    marginVertical: 4,
  },
  taskDueDate: {
    color: '#888',
    fontSize: 12,
  },
  taskPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
