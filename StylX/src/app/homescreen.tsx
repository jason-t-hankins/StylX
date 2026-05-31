import { Text, StyleSheet, View, Image, Pressable, Animated, PanResponder, GestureResponderEvent, PanResponderGestureState } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getLikedImages, addLikedImage, LikedImage } from "../utils/storage";
import Navbar from "../components/Navbar";

interface StyleImage {
  id: string;
  style: "darkFae" | "streetFashion" | "emo";
  imageKey: string;
  label: string;
}

const STYLE_IMAGES: StyleImage[] = [
  { id: "emo1", style: "emo", imageKey: "emo1", label: "Emo 1" },
  { id: "emo2", style: "emo", imageKey: "emo2", label: "Emo 2" },
  { id: "emo3", style: "emo", imageKey: "emo3", label: "Emo 3" },
  { id: "fae1", style: "darkFae", imageKey: "fae1", label: "Dark Fae 1" },
  { id: "fae2", style: "darkFae", imageKey: "fae2", label: "Dark Fae 2" },
  { id: "fae3", style: "darkFae", imageKey: "fae3", label: "Dark Fae 3" },
  { id: "fashion1", style: "streetFashion", imageKey: "fashion1", label: "Street Fashion 1" },
  { id: "fashion2", style: "streetFashion", imageKey: "fashion2", label: "Street Fashion 2" },
  { id: "fashion3", style: "streetFashion", imageKey: "fashion3", label: "Street Fashion 3" },
];

const getImageSource = (imageKey: string) => {
  switch (imageKey) {
    case "emo1":
      return require("../../assets/figma/emo1.png");
    case "emo2":
      return require("../../assets/figma/emo2.png");
    case "emo3":
      return require("../../assets/figma/emo3.png");
    case "fae1":
      return require("../../assets/figma/fae1.png");
    case "fae2":
      return require("../../assets/figma/fae2.png");
    case "fae3":
      return require("../../assets/figma/fae3.png");
    case "fashion1":
      return require("../../assets/figma/fashion1.png");
    case "fashion2":
      return require("../../assets/figma/fashion2.png");
    case "fashion3":
      return require("../../assets/figma/fashion3.png");
    default:
      return require("../../assets/figma/emo1.png");
  }
};

export default function Homescreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedImages, setLikedImages] = useState<LikedImage[]>([]);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const loadLikes = async () => {
      const likes = await getLikedImages();
      setLikedImages(likes);
    };
    loadLikes();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const swipeThreshold = 120;

        if (gestureState.dx > swipeThreshold) {
          // Swiped right - add to likes
          handleLike();
          Animated.timing(pan, {
            toValue: { x: 500, y: 0 },
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            nextCard();
          });
        } else if (gestureState.dx < -swipeThreshold) {
          // Swiped left - pass
          Animated.timing(pan, {
            toValue: { x: -500, y: 0 },
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            nextCard();
          });
        } else {
          // Snap back
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleLike = async () => {
    const current = STYLE_IMAGES[currentIndex];
    const likedImage: LikedImage = {
      id: Date.now().toString(),
      imageKey: current.imageKey,
      style: current.style,
      likedAt: new Date().toISOString(),
    };
    await addLikedImage(likedImage);
    setLikedImages([...likedImages, likedImage]);
  };

  const nextCard = () => {
    if (currentIndex < STYLE_IMAGES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const rotateInterpolate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-30deg", "0deg", "30deg"],
  });

  const opacityInterpolate = pan.x.interpolate({
    inputRange: [-200, -100, 0, 100, 200],
    outputRange: [0.2, 0.5, 1, 0.5, 0.2],
  });

  if (currentIndex >= STYLE_IMAGES.length) {
    return (
      <LinearGradient
        style={styles.container}
        colors={["#fff", "#b9dcf9", "#fff"]}
        locations={[0.21, 0.49, 0.85]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.centerContent}>
          <Text style={styles.heading}>featured items today...</Text>
          <Text style={styles.subheading}>You've swiped through all the styles</Text>
          <Text style={styles.likesText}>❤️ You liked {likedImages.length} items</Text>
          <Pressable
            style={styles.resetButton}
            onPress={() => setCurrentIndex(0)}
          >
            <Text style={styles.resetButtonText}>Start Over</Text>
          </Pressable>
        </View>
        <Navbar activeScreen="home" />
      </LinearGradient>
    );
  }

  const current = STYLE_IMAGES[currentIndex];

  return (
    <LinearGradient
      style={styles.container}
      colors={["#fff", "#b9dcf9", "#fff"]}
      locations={[0.21, 0.49, 0.85]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Text style={styles.counter}>
          {currentIndex + 1} / {STYLE_IMAGES.length}
        </Text>

        <Animated.View
          style={[
            styles.cardContainer,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { rotate: rotateInterpolate },
              ],
              opacity: opacityInterpolate,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Image
            source={getImageSource(current.imageKey)}
            style={styles.card}
            resizeMode="cover"
          />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{current.label}</Text>
            <Text style={styles.styleTag}>{current.style}</Text>
          </View>
        </Animated.View>

        <View style={styles.swipeHint}>
          <Text style={styles.hintText}>← Swipe Left to Pass | Swipe Right to Like →</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[styles.actionButton, styles.passButton]}
            onPress={() => {
              Animated.timing(pan, {
                toValue: { x: -500, y: 0 },
                duration: 300,
                useNativeDriver: false,
              }).start(() => {
                pan.setValue({ x: 0, y: 0 });
                nextCard();
              });
            }}
          >
            <Text style={styles.actionButtonText}>✕ Pass</Text>
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.likeButton]}
            onPress={() => {
              handleLike();
              Animated.timing(pan, {
                toValue: { x: 500, y: 0 },
                duration: 300,
                useNativeDriver: false,
              }).start(() => {
                pan.setValue({ x: 0, y: 0 });
                nextCard();
              });
            }}
          >
            <Text style={styles.actionButtonText}>❤️ Like</Text>
          </Pressable>
        </View>
      </View>

      <Navbar activeScreen="home" />
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  counter: {
    fontSize: 16,
    color: "#656565",
    marginBottom: 20,
    fontWeight: "600",
  },
  cardContainer: {
    width: 280,
    height: 400,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  card: {
    width: "100%",
    height: "85%",
  },
  labelContainer: {
    height: "15%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#03118e",
  },
  styleTag: {
    fontSize: 12,
    color: "#0d5fd6",
    marginTop: 4,
  },
  swipeHint: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  hintText: {
    fontSize: 12,
    color: "#656565",
    textAlign: "center",
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  actionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  passButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 2,
    borderColor: "#656565",
  },
  likeButton: {
    backgroundColor: "#ff6b9d",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0d5fd6",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: "#656565",
    marginBottom: 20,
  },
  likesText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ff6b9d",
    marginBottom: 30,
  },
  resetButton: {
    backgroundColor: "#0d5fd6",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
