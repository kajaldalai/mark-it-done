import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function DashboardScreen() {

  // if (loading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Due: {item.due_date}</Text>
          </View>
        )}
      /> */}
      <Text style={styles.greetingText}>Hey, Kj! Glad to see you! 😃</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#f0f0f0' // Optional background color
  },
  greetingText: {
    fontSize: 20, // Set desired font size
    fontWeight: 'bold', // Optional for emphasis
    textAlign: 'center', // Center text within the Text component
    color: '#333' // Set text color
  }
});