/* frontend/components/Welcome.js */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import splash1 from '../assets/images/splash1.png'
import arrowright from '../assets/images/arrowright.png'

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={splash1}
        style={styles.image}
      />
      <Text style={styles.title}>
        A fun way to keep track of your tasks and earn rewards!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Let's Start</Text>
        <Image
          source={arrowright}
          style={styles.arrow}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 392,
    height: 378,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#696161',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#744be5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginRight: 10,
  },
  arrow: {
    width: 30,
    height: 30,
  },
});
