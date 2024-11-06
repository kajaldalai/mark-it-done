import { useState } from "react";
import { Alert, Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Index() {
  const [showText, setShowText] = useState(false);

  const handlePress = () => {
    Alert.alert('Hello World!');
  };
  // const handlePress = () => {
  //   setShowText(!showText);
  // };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
      {showText && <Text>Hello World!</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0E494E',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});