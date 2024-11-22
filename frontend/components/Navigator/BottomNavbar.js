import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const BottomNav = ({ activeTab, onTabPress }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => onTabPress('home')}
    >
      <Text style={activeTab === 'home' ? styles.activeNavText : styles.navText}>🏠</Text>
      <Text style={activeTab === 'home' ? styles.activeNavLabel : styles.navLabel}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => onTabPress('rewards')}
    >
      <Text style={activeTab === 'rewards' ? styles.activeNavText : styles.navText}>🏆</Text>
      <Text style={activeTab === 'rewards' ? styles.activeNavLabel : styles.navLabel}>Rewards</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => onTabPress('leaderboard')}
    >
      <Text style={activeTab === 'leaderboard' ? styles.activeNavText : styles.navText}>📊</Text>
      <Text style={activeTab === 'leaderboard' ? styles.activeNavLabel : styles.navLabel}>Leaderboard</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 24,
    color: '#999',
  },
  activeNavText: {
    fontSize: 24,
    color: '#8A2BE2',
  },
  navLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeNavLabel: {
    fontSize: 12,
    color: '#8A2BE2',
    marginTop: 4,
  },
});