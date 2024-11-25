import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationBar } from './Navbar';
import { Header } from './Header';
import comingsoon from '../assets/images/comingsoon.png';

export const ReferralScreen = () => {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.title}>Referral</Text>

        <View style={styles.comingSoonContainer}>
          <Image
            source={comingsoon}
            style={styles.comingSoonImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#6750A4',
    marginBottom: 8,
    textAlign: 'center',
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonImage: {
    width: '80%',
    height: '50%',
  },
});
