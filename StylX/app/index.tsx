import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import { Link } from 'expo-router';
import { theme } from '../constants/theme';
import { Button } from '../components';

export default function WelcomeScreen() {
  const { colors, spacing } = theme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.white }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: spacing[4] },
        ]}
      >
        {/* Spacer */}
        <View style={{ height: spacing[8] }} />

        {/* Illustration */}
        <View
          style={[
            styles.illustrationPlaceholder,
            { backgroundColor: colors.mediumBg, borderColor: colors.neonCyan },
          ]}
        >
          <Text style={{ color: colors.gray400, fontSize: 16, fontWeight: '600' }}>
            ✨ StylX
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.mainTitle, { color: colors.neonPink }]}>
            Discover Your Style
          </Text>
          <Text style={[styles.subtitle, { color: colors.gray600, marginBottom: spacing[8] }]}>
            A y2k styling assistant to help you discover new looks and track your wardrobe.
          </Text>

          {/* Feature bullets */}
          <View style={{ gap: spacing[3], marginBottom: spacing[10] }}>
            {[
              '✨ Discover trending Y2K fits',
              '👗 Track your wardrobe',
              '💫 Get outfit inspiration',
            ].map((feature, idx) => (
              <Text
                key={idx}
                style={[styles.featureText, { color: colors.gray700 }]}
              >
                {feature}
              </Text>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Link href="/auth/login" asChild>
            <Button
              title="Login"
              onPress={() => {}}
              variant="primary"
              fullWidth
              size="large"
              style={{ marginBottom: spacing[3] }}
            />
          </Link>

          <Link href="/auth/signup" asChild>
            <Button
              title="Sign Up"
              onPress={() => {}}
              variant="neon"
              fullWidth
              size="large"
            />
          </Link>
        </View>

        <View style={{ height: spacing[6] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  illustrationPlaceholder: {
    width: 240,
    height: 320,
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  content: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 48,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },
});
