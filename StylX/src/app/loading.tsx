import { StyleSheet, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const splashImage = require("../../assets/images/Type=Full.png");

export default function Loading() {
  return (
    <LinearGradient
      style={styles.container}
      colors={["#ffffff", "#b9dcf9", "#ffffff"]}
      locations={[0.16, 0.5, 0.87]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Image
          source={splashImage}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
