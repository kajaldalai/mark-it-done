import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const NavigationBar = () => {
  return (
      <View style={navigationBarStyles.container}>
          <TouchableOpacity style={navigationBarStyles.navItem}>
              <View style={navigationBarStyles.iconContainer}>
                  <Image
                      source={{ uri: 'https://placeholder.pics/svg/64x32' }}
                      style={navigationBarStyles.icon}
                  />
              </View>
              <Text style={navigationBarStyles.label}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={navigationBarStyles.navItem}>
              <View style={navigationBarStyles.iconContainer}>
                  <Image
                      source={{ uri: 'https://placeholder.pics/svg/64x32' }}
                      style={navigationBarStyles.icon}
                  />
              </View>
              <Text style={navigationBarStyles.label}>Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={navigationBarStyles.navItem}>
              <View style={navigationBarStyles.iconContainer}>
                  <Image
                      source={{ uri: 'https://placeholder.pics/svg/64x32' }}
                      style={navigationBarStyles.icon}
                  />
              </View>
              <Text style={navigationBarStyles.label}>Leaderboard</Text>
          </TouchableOpacity>
      </View>
  );
};

const navigationBarStyles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#f3edf7',
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 15,
  },
  navItem: {
      alignItems: 'center',
  },
  iconContainer: {
      backgroundColor: '#e4d7f5',
      padding: 10,
      borderRadius: 16,
  },
  icon: {
      width: 64,
      height: 32,
  },
  label: {
      marginTop: 4,
      color: '#1d1b20',
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.5,
      textAlign: 'center',
      lineHeight: 16,
  },
});