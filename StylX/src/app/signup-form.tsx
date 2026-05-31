import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { saveUserData, UserData } from "../utils/storage";

export default function SignUpForm() {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <LinearGradient
      style={styles.container}
      colors={["#fff", "#b9dcf9", "#fff"]}
      locations={[0.21, 0.49, 0.85]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.fields}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#0d5fd6"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#0d5fd6"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#0d5fd6"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Create Password"
            placeholderTextColor="#0d5fd6"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#0d5fd6"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={async () => {
            // Save user data before navigating
            const userData: UserData = {
              firstName,
              lastName,
              email,
              password,
              createdAt: new Date().toISOString(),
            };
            await saveUserData(userData);
            router.push("/style-quiz");
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
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
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fields: {
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 280,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(242, 242, 242, 0.4)",
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#03118e",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0d5fd6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: "#0d5fd6",
    fontWeight: "500",
  },
});
