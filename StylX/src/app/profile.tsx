import { Text, StyleSheet, View, Image, Pressable, ScrollView, ImageBackground, Alert, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getUserData, getQuizResult, getClosetItems, addClosetItem, ClosetItem, UserData, QuizResult, clearAllData } from "../utils/storage";
import ClosetTab from "../components/ClosetTab";
import Navbar from "../components/Navbar";
import ItemDetailScreen from "../components/ItemDetailScreen";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [quiz, setQuiz] = useState<QuizResult | null>(null);
  const [closetItems, setClosetItems] = useState<ClosetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ClosetItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const userData = await getUserData();
      const quizData = await getQuizResult();
      const items = await getClosetItems();
      setUser(userData);
      setQuiz(quizData);
      setClosetItems(items);
      setLoading(false);
    };
    loadData();
  }, []);

  const joinYear = user ? new Date(user.createdAt).getFullYear() : "—";
  const styleType = quiz?.style || "Not yet taken";

  const handleShowDetails = (item: ClosetItem) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleDeleteItem = async (itemId: string) => {
    const updatedItems = closetItems.filter((item) => item.id !== itemId);
    setClosetItems(updatedItems);
    
    // Save to storage
    const { saveClosetItems } = await import("../utils/storage");
    await saveClosetItems(updatedItems);
    
    // Close modal and show confirmation
    setShowDetailModal(false);
    Alert.alert("Success", "Item deleted from your closet");
  };

  const handleClearAllData = () => {
    console.log("🗑️ Trash button pressed");
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to delete all user data? This cannot be undone.");
      if (confirmed) {
        clearAllData();
        setUser(null);
        setQuiz(null);
        setClosetItems([]);
        alert("All data cleared");
        router.push("/signup");
      }
    } else {
      Alert.alert("Clear All Data", "Are you sure you want to delete all user data? This cannot be undone.", [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Delete All",
          onPress: async () => {
            await clearAllData();
            setUser(null);
            setQuiz(null);
            setClosetItems([]);
            Alert.alert("Success", "All data cleared");
            router.push("/signup");
          },
        },
      ]);
    }
  };

  const handleUploadItem = async () => {
    try {
      // Lazy load ImagePicker
      const ImagePicker = await import("expo-image-picker");
      
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please allow access to your media library to upload items.");
        return;
      }

      // Open image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0];
        let imageUri = selectedImage.uri;

        // On web, convert to base64 for persistence
        if (Platform.OS === "web") {
          try {
            const response = await fetch(selectedImage.uri);
            const blob = await response.blob();
            const reader = new FileReader();
            
            imageUri = await new Promise((resolve, reject) => {
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          } catch (e) {
            console.warn("Could not convert to base64, using original URI", e);
          }
        } else {
          // On mobile, copy to permanent storage
          const { documentDirectory, copyAsync } = await import("expo-file-system/legacy");
          const filename = `closet_${Date.now()}.jpg`;
          const permanentUri = `${documentDirectory}${filename}`;
          
          await copyAsync({
            from: selectedImage.uri,
            to: permanentUri,
          });
          
          imageUri = permanentUri;
        }
        
        const newItem: ClosetItem = {
          id: Date.now().toString(),
          image: imageUri,
          name: `Item ${closetItems.length + 1}`,
        };

        // Save to storage
        await addClosetItem(newItem);

        // Update local state
        setClosetItems([...closetItems, newItem]);
        Alert.alert("Success", "Item added to your closet!");
      }
    } catch (error) {
      console.error("Error uploading item:", error);
      Alert.alert("Error", "Failed to upload item. Please try again.");
    }
  };

  return (
    <ImageBackground style={[styles.profileIcon, styles.profileIconFlexBox]} resizeMode="cover">
      {/* Profile Header */}
      <View style={styles.profile}>
        <View style={[styles.profileContainer, styles.bottomFlexBox]}>
          <View style={styles.topFlexBox}>
            <Image
              source={require("../../assets/figma/profilepic.png")}
              style={styles.profilePicIcon}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.bottom, styles.bottomSpaceBlock]}>
            <Text style={styles.missBbXoxo}>{user?.firstName || "Guest"}</Text>
            <Text style={[styles.losAngelesCaContainer, styles.mysavesTypo]}>
              <Text style={styles.losAngelesCa}>Joined {joinYear}</Text>
              <Text style={styles.text}>{`   |   `}</Text>
              <Text style={styles.losAngelesCa}>{styleType}</Text>
              <Text style={styles.text}>{`  |  `}</Text>
              <Text style={styles.losAngelesCa}>0 Friends</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Closet Tab Component */}
      <ClosetTab 
        items={closetItems}
        onDetailsPress={handleShowDetails}
      />

      {/* Item Detail Modal */}
      <ItemDetailScreen
        item={selectedItem}
        visible={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onDelete={handleDeleteItem}
      />

      {/* Navbar */}
      <Navbar activeScreen="profile" />

      {/* Settings Button */}
      <View style={[styles.iconAdd, styles.iconPosition]}>
        <Pressable style={styles.wrapper} onPress={handleClearAllData}>
          <Text style={[styles.icon, styles.trashCanEmoji]}>🗑️</Text>
        </Pressable>
      </View>
      {/* Upload Item Button */}
      <View style={[styles.iconAdd2, styles.iconPosition]}>
        <Pressable style={styles.wrapper} onPress={handleUploadItem}>
          <Image
            source={require("../../assets/figma/Group 1.svg")}
            style={styles.icon}
            resizeMode="cover"
          />
        </Pressable>
        <Text style={[styles.uploadALook, styles.groupIconPosition]}>Upload Item</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profileIconFlexBox: {
    alignItems: "center",
    overflow: "hidden",
  },
  bottomFlexBox: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  bottomSpaceBlock: {
    paddingHorizontal: 0,
    justifyContent: "center",
    overflow: "hidden",
  },
  mysavesTypo: {
    fontFamily: "Goldman-Regular",
    textAlign: "left",
  },
  topFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  groupIconPosition: {
    left: "0%",
    position: "absolute",
  },
  iconPosition: {
    top: 65,
    height: 73,
    width: 55,
    position: "absolute",
  },
  profileIcon: {
    height: 852,
    justifyContent: "flex-end",
    width: "100%",
  },
  profile: {
    height: 209,
    zIndex: 0,
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  profileContainer: {
    overflow: "hidden",
    alignSelf: "stretch",
  },
  profilePicIcon: {
    height: 109,
    width: 69,
  },
  bottom: {
    paddingVertical: 12,
    gap: 16,
    alignSelf: "stretch",
    alignItems: "center",
  },
  missBbXoxo: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Goldman-Bold",
    textAlign: "left",
    color: "#03118e",
    alignSelf: "center",
  },
  losAngelesCaContainer: {
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "Goldman-Regular",
  },
  losAngelesCa: {
    color: "#0d5fd6",
  },
  text: {
    color: "#03118e",
  },
  wrapper: {
    left: "9.09%",
    right: "10.91%",
    bottom: "39.73%",
    width: "80%",
    height: "60.27%",
    top: "0%",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  trashCanEmoji: {
    fontSize: 40,
    textAlign: "center",
    justifyContent: "center",
  },
  uploadALook: {
    height: "28.77%",
    top: "71.23%",
    fontSize: 10,
    fontFamily: "Google Sans Code",
    color: "#656565",
    textAlign: "center",
    width: "100%",
  },
  iconAdd: {
    left: 33,
    zIndex: 3,
  },
  iconAdd2: {
    left: 305,
    zIndex: 4,
  },
});
