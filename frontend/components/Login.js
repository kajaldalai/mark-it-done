import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

function LoginHeader() {
  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.title}>Almost there...</Text>
      <Text style={headerStyles.subtitle}>Login with your school credentials</Text>
    </View>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Sign in clicked');
  };

  return (
    <View style={formStyles.container}>
      <View style={formStyles.inputField}>
        <Text style={formStyles.label}>Email</Text>
        <TextInput
          style={formStyles.input}
          placeholder="student@hawk.iit.edu"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={formStyles.inputField}>
        <Text style={formStyles.label}>Password</Text>
        <TextInput
          style={formStyles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={formStyles.button} onPress={handleSignIn}>
        <Text style={formStyles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

function GoogleSignInButton() {
  return (
    <TouchableOpacity style={googleStyles.button} onPress={() => console.log('Google Login')}>
      <View style={googleStyles.contentContainer}>
        <Image
          source={{ uri: 'https://placeholder.pics/svg/20x20' }}
          style={googleStyles.icon}
        />
        <Text style={googleStyles.text}>Continue with Google</Text>
      </View>
    </TouchableOpacity>
  );
}

function TermsAndPrivacy() {
  return (
    <Text style={termsStyles.text}>
      By clicking continue, you agree to our{' '}
      <Text style={termsStyles.boldText}>Terms of Service</Text> and{' '}
      <Text style={termsStyles.boldText}>Privacy Policy</Text>
    </Text>
  );
}

export default function LoginScreen() {
  return (
    <View style={screenStyles.container}>
      <LoginHeader />
      <LoginForm />
      <View style={screenStyles.dividerContainer}>
        <View style={screenStyles.divider} />
        <Text style={screenStyles.orText}>or</Text>
        <View style={screenStyles.divider} />
      </View>
      <GoogleSignInButton />
      <TermsAndPrivacy />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#744be5',
    textAlign: 'center',
    lineHeight: 38.73,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
  },
});

const formStyles = StyleSheet.create({
  container: {
    width: 320,
    height: 272,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    width: 272,
    marginBottom: 24,
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
    backgroundColor: '#fff',
    color: '#b3b3b3',
  },
  button: {
    width: 175,
    height: 39,
    backgroundColor: '#7b61ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
});

const googleStyles = StyleSheet.create({
  button: {
    backgroundColor: '#eee9ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 327,
    height: 40,
    marginBottom: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
  },
});

const termsStyles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: '#828282',
    textAlign: 'center',
    lineHeight: 18,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
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
});
