import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Homescreen() {
  return (
    <LinearGradient
      style={styles.container}
      colors={["#fff", "#b9dcf9", "#fff"]}
      locations={[0.21, 0.49, 0.85]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Text style={styles.heading}>Home Screen</Text>
        <Text style={styles.placeholder}>Welcome to StylX!</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d5fd6",
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 14,
    color: "#666",
  },
});
