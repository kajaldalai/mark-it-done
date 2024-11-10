import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Call API here for login
        try {
            const response = await axios.post('http://192.168.0.11:3000/login', {
                email,
                password
            });
            if (response.status == 200) {
                navigation.replace('Dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
        // navigation.navigate('Dashboard');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Almost there...</Text>
            <Text>Login with your school credentials</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Google Login')}>
                <Text style={styles.googleButton}>Continue with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
    button: { backgroundColor: '#000', padding: 10, alignItems: 'center', borderRadius: 5 },
    buttonText: { color: '#fff', fontSize: 16 },
    googleButton: { color: '#6200ea', marginTop: 15 }
});
