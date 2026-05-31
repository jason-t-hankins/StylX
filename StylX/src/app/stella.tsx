import { Text, StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../components/Navbar";

export default function StellaScreen() {
  return (
    <LinearGradient
      style={styles.container}
      colors={["#fff", "#b9dcf9", "#fff"]}
      locations={[0.21, 0.49, 0.85]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>✨ Stella</Text>
        <Text style={styles.subheading}>Your Style Assistant</Text>

        <View style={styles.featureCard}>
          <Text style={styles.cardTitle}>💡 Coming Soon</Text>
          <Text style={styles.cardDescription}>
            Stella is your personal style assistant. Get personalized fashion recommendations based on your quiz results!
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.cardTitle}>🎨 Features</Text>
          <Text style={styles.featureItem}>• Personalized style recommendations</Text>
          <Text style={styles.featureItem}>• Outfit matching suggestions</Text>
          <Text style={styles.featureItem}>• Trend alerts</Text>
          <Text style={styles.featureItem}>• Style tips & tricks</Text>
        </View>
      </ScrollView>
      <Navbar activeScreen="stella" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
  content: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0d5fd6",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: "#656565",
    marginBottom: 30,
  },
  featureCard: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#b9dcf9",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0d5fd6",
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 14,
    color: "#656565",
    lineHeight: 20,
  },
  featureItem: {
    fontSize: 14,
    color: "#656565",
    marginBottom: 8,
    lineHeight: 20,
  },
});
