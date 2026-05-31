import * as React from "react";
import { StyleSheet, Image, View, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";

interface NavbarProps {
  activeScreen?: "profile" | "home" | "stella";
}

const Navbar: React.FC<NavbarProps> = ({ activeScreen }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab
  const isActive = (tab: string) => pathname.includes(tab);

  const handleNavigation = (screen: string) => {
    router.push(`/${screen}`);
  };

  return (
    <View style={styles.navbar}>
      {/* Stella (Style Assistant) */}
      <Pressable
        style={[styles.navItem, isActive("stella") && styles.activeItem]}
        onPress={() => handleNavigation("stella")}
      >
        <Image
          source={require("../../assets/figma/State=Default.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </Pressable>

      {/* Profile */}
      <Pressable
        style={[styles.navItem, isActive("profile") && styles.activeItem]}
        onPress={() => handleNavigation("profile")}
      >
        <Image
          source={require("../../assets/figma/profile.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </Pressable>

      {/* Home */}
      <Pressable
        style={[styles.navItem, isActive("homescreen") && styles.activeItem]}
        onPress={() => handleNavigation("homescreen")}
      >
        <Image
          source={require("../../assets/figma/home.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(185, 220, 249, 0.3)",
    width: "100%",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    transition: "all 0.3s ease",
  },
  activeItem: {
    backgroundColor: "rgba(13, 95, 214, 0.15)",
    borderWidth: 2,
    borderColor: "#0d5fd6",
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Navbar;
