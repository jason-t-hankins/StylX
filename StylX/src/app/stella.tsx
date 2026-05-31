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

        <View style={styles.featureCard}>
          <Text style={styles.cardDescription}>
            Hi! I'm Stella, your AI STYL X Assistant.{'\n'}I can help you find looks based on your closet, saves, or general style questions.{'\n'}What can I help you with today?
          </Text>
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
