import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import home from '../assets/images/home.png'
import leaderboard from '../assets/images/leaderboard.png'
import rewards from '../assets/images/rewards.png'

export const NavigationBar = () => {
  const [selected, setSelected] = useState('Home');

  const navItems = [
    { name: 'Home', icon: home },
    { name: 'Rewards', icon: rewards },
    { name: 'Leaderboard', icon: leaderboard },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            styles.navItem,
            selected === item.name && styles.selectedNavItem,
          ]}
          onPress={() => setSelected(item.name)}
        >
          <View style={styles.iconContainer}>
            <Image source={item.icon} style={styles.icon} />
          </View>
          <Text
            style={[
              styles.label,
              selected === item.name && styles.selectedLabel,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f3edf7',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  navItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    width: "30%"
  },
  selectedNavItem: {
    backgroundColor: '#e8def8',
  },
  iconContainer: {
    marginBottom: 4,
  },
  icon: {
    width: 28,
    height: 20,
  },
  label: {
    color: '#1d1b20',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedLabel: {
    color: '#744be5',
  },
});

export default NavigationBar;
