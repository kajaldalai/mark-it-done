import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import google from '../assets/images/google.png'
import { authenticateUser } from './database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const user = await authenticateUser(email, password);
            if (user) {
                await AsyncStorage.setItem('user', JSON.stringify(user));
                navigation.navigate('Task');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <View style={styles.container}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.title}>Almost there...</Text>
            <Text style={styles.subtitle}>Login with your school credentials</Text>
            <View style={styles.form}>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="student@hawk.iit.edu"
                        placeholderTextColor="#b3b3b3"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="********"
                        placeholderTextColor="#b3b3b3"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.signInButtonText}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.divider} />
            </View>
            <TouchableOpacity style={styles.googleButton}
                onPress={() => navigation.navigate('Task')}
            >
                <Image source={google} style={styles.googleLogo} />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
                By clicking continue, you agree to our{' '}
                <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#744be5',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        color: '#475467',
        textAlign: 'center',
        marginBottom: 20,
    },
    form: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d9d9d9',
        marginBottom: 20,
    },
    inputField: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#1e1e1e',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#d9d9d9',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        color: '#000',
    },
    signInButton: {
        backgroundColor: '#744be5',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeText: {
        fontSize: 16,
        color: '#475467',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#d9d9d9',
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#828282',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee9ff',
        borderRadius: 8,
        paddingVertical: 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
    googleLogo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    footerText: {
        fontSize: 12,
        color: '#828282',
        textAlign: 'center',
    },
    linkText: {
        color: '#744be5',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});
