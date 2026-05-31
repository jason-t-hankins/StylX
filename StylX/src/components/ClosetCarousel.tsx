import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import Coverflow from "react-native-coverflow";

interface ClosetItem {
  id: string;
  image: any;
  name: string;
}

interface ClosetCarouselProps {
  items?: ClosetItem[];
  onDetailsPress?: (item: ClosetItem) => void;
}

const ClosetCarousel: React.FC<ClosetCarouselProps> = ({
  items = [
    {
      id: "1",
      image: require("../../assets/figma/Image=Jacket.png"),
      name: "Jacket",
    },
    {
      id: "2",
      image: require("../../assets/figma/Image=Shoes.png"),
      name: "Shoes",
    },
    {
      id: "3",
      image: require("../../assets/figma/Image=Skirt.png"),
      name: "Skirt",
    },
  ],
  onDetailsPress = () => {},
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  // Reset index if it goes out of bounds
  React.useEffect(() => {
    if (currentIndex >= items.length && items.length > 0) {
      setCurrentIndex(0);
    }
  }, [items.length]);
  
  // Check if items array is empty
  if (items.length === 0) {
    return (
      <View style={styles.carousel}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>empty wardrobe!  #depression</Text>
        </View>
      </View>
    );
  }
  
  // Ensure index is always valid
  const safeIndex = Math.min(currentIndex, items.length - 1);
  const currentItem = items[safeIndex];

  return (
    <View style={styles.carousel}>
      <Coverflow
        onChange={(index: number) => setCurrentIndex(index)}
        style={styles.coverflowContainer}
      >
        {items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image
              source={item.image}
              style={styles.itemImage}
              resizeMode="cover"
            />
          </View>
        ))}
      </Coverflow>

      <Pressable
        style={styles.button}
        onPress={() => onDetailsPress(currentItem)}
      >
        <Text style={styles.text}>Details</Text>
      </Pressable>

      <Text style={styles.itemName}>{currentItem.name}</Text>
      <Text style={styles.itemCounter}>
        {currentIndex + 1} / {items.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    height: 372,
    width: "100%",
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  coverflowContainer: {
    height: 265,
    width: "100%",
  },
  itemContainer: {
    height: 265,
    width: 215,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 44,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderRadius: 44,
  },
  button: {
    elevation: 4,
    borderRadius: 12,
    borderColor: "#0d5fd6",
    borderWidth: 1,
    paddingHorizontal: 27,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: "Google Sans Code",
    color: "#0d5fd6",
    textAlign: "center",
    fontWeight: "600",
  },
  itemName: {
    fontSize: 14,
    fontFamily: "Goldman-Regular",
    color: "#03118e",
    fontWeight: "500",
    marginTop: 8,
  },
  itemCounter: {
    fontSize: 12,
    fontFamily: "Goldman-Regular",
    color: "#656565",
    marginTop: 4,
  },
  emptyContainer: {
    height: 265,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 44,
    backgroundColor: "rgba(13, 95, 214, 0.1)",
  },
  emptyText: {
    fontSize: 20,
    fontFamily: "Goldman-Regular",
    color: "#0d5fd6",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default ClosetCarousel;
