import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  ImageBackground,
} from 'react-native';
import { theme, ComponentSizes } from '../constants/theme';
import { Button, Input } from '../components';

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      console.log('Login with:', { email, password });
      // Navigate to home on success
      // navigation.navigate('Home');
    }, 1500);
  };

  const { colors, spacing } = theme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.white }]}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing[4] }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.neonPink }]}>
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: colors.gray600 }]}>
            Sign in to discover your next look
          </Text>
        </View>

        {/* Illustration Placeholder */}
        <View
          style={[
            styles.illustrationPlaceholder,
            { backgroundColor: colors.mediumBg, borderColor: colors.neonCyan },
          ]}
        >
          <Text style={{ color: colors.gray400 }}>Y2K Illustration</Text>
        </View>

        {/* Form */}
        <View style={{ width: '100%' }}>
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            error={errors.email}
            variant="default"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            secureTextEntry
            variant="default"
          />

          {/* Forgot Password Link */}
          <Text
            style={[
              styles.forgotPasswordLink,
              { color: colors.neonPink, marginBottom: spacing[6] },
            ]}
          >
            Forgot Password?
          </Text>

          {/* Login Button */}
          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            variant="primary"
            fullWidth
            size="large"
            style={{ marginBottom: spacing[4] }}
          />

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={[styles.signupText, { color: colors.gray600 }]}>
              Don't have an account?{' '}
            </Text>
            <Text
              style={[styles.signupLink, { color: colors.neonPink }]}
              onPress={() => console.log('Navigate to signup')}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  illustrationPlaceholder: {
    width: 200,
    height: 280,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  forgotPasswordLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    fontWeight: '400',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '700',
  },
});
