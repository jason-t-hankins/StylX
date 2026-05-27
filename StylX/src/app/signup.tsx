import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const typeXImage = require("../../assets/figma/Type=X.svg");

export default function SignUp() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/signup-form");
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#fff", "#b9dcf9", "#fff"]}
      locations={[0.21, 0.49, 0.85]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.options}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>

      <View style={styles.logo}>
        <Image
          source={typeXImage}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    overflow: "hidden",
    width: "100%",
  },
  options: {
    width: "100%",
    gap: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    overflow: "hidden",
    zIndex: 10,
    paddingLeft: 70,
  },
  button: {
    width: 120,
    paddingVertical: 15,
    paddingHorizontal: 27,
    borderWidth: 1,
    borderColor: "#0d5fd6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: "#0d5fd6",
    textAlign: "center",
    fontWeight: "500",
  },
  logo: {
    width: 300,
    height: 350,
    position: "absolute",
    top: "50%",
    right: -100,
    transform: [{ translateY: -175 }],
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
});
