import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable, ImageBackground, Modal } from "react-native";
import { ClosetItem } from "../utils/storage";

interface ItemDetailScreenProps {
  item: ClosetItem | null;
  visible: boolean;
  onClose: () => void;
  onDelete: (itemId: string) => void;
}

const ItemDetailScreen: React.FC<ItemDetailScreenProps> = ({
  item,
  visible,
  onClose,
  onDelete,
}) => {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <ImageBackground style={styles.shoeDetailIcon} resizeMode="cover">
        <View style={[styles.pictureContainer, styles.buttonFlexBox]}>
          <Image
            source={{ uri: item.image }}
            style={styles.pictureContainerChild}
            resizeMode="cover"
          />
        </View>
        <View style={styles.bottom}>
          <View style={[styles.options, styles.textFlexBox]}>
            <View style={[styles.delete, styles.deleteFlexBox]}>
              <Pressable onPress={() => onDelete(item.id)}>
                <Image
                  source={require("../../assets/figma/icon_delete.png")}
                  style={styles.iconDelete}
                  resizeMode="cover"
                />
              </Pressable>
              <Text style={[styles.delete2, styles.text4Typo]}>Delete</Text>
            </View>
            <View style={[styles.delete, styles.deleteFlexBox]}>
              <Pressable onPress={() => {}}>
                <Image
                  source={require("../../assets/figma/icon_share.png")}
                  style={styles.iconDelete}
                  resizeMode="cover"
                />
              </Pressable>
              <Text style={[styles.delete2, styles.text4Typo]}>Share</Text>
            </View>
            <View style={[styles.delete4, styles.deleteFlexBox]}>
              <Pressable style={styles.iconDelete} onPress={() => {}}>
                <Image
                  source={require("../../assets/figma/icon_tryon.png")}
                  style={styles.icon}
                  resizeMode="cover"
                />
              </Pressable>
              <Text style={[styles.delete2, styles.text4Typo]}>Try on</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={[styles.text, styles.textFlexBox]}>
              <View style={styles.left}>
                <View style={styles.line1}>
                  <Text style={styles.articleShoes}>
                    <Text style={styles.article}>{`Item: `}</Text>
                    <Text style={styles.shoes}>{item.name}</Text>
                  </Text>
                </View>
                <View style={styles.line1}>
                  <Text style={styles.articleShoes}>
                    <Text style={styles.article}>{`Uploaded: `}</Text>
                    <Text style={styles.shoes}>
                      {new Date(parseInt(item.id)).toLocaleDateString()}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.left}>
                <View style={styles.line1}>
                  <Text style={styles.articleShoes}>
                    <Text style={styles.article}>{`ID: `}</Text>
                    <Text style={styles.shoes}>{item.id.slice(0, 8)}...</Text>
                  </Text>
                </View>
                <View style={styles.line1}>
                  <Text style={styles.articleShoes}>
                    <Text style={styles.article}>{`Status: `}</Text>
                    <Text style={styles.shoes}>In Closet</Text>
                  </Text>
                </View>
              </View>
            </View>
            <Pressable style={[styles.button, styles.buttonFlexBox]} onPress={onClose}>
              <Text style={[styles.text4, styles.text4Typo]}>Back</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    justifyContent: "center",
    overflow: "hidden",
  },
  textFlexBox: {
    alignSelf: "center",
    flexDirection: "row",
  },
  deleteFlexBox: {
    justifyContent: "space-between",
    height: 67,
    gap: 12,
    alignItems: "center",
  },
  text4Typo: {
    textAlign: "center",
    fontFamily: "Google Sans Code",
  },
  shoeDetailIcon: {
    height: 852,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  pictureContainer: {
    height: 540,
    width: 361,
    justifyContent: "center",
    alignItems: "center",
  },
  pictureContainerChild: {
    width: 319,
    height: 286,
  },
  bottom: {
    gap: 16,
    alignSelf: "stretch",
    alignItems: "center",
  },
  options: {
    gap: 24,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  delete: {
    gap: 12,
    width: 44,
  },
  iconDelete: {
    height: 44,
    width: 44,
  },
  delete2: {
    color: "#656565",
    fontSize: 12,
    alignSelf: "stretch",
  },
  delete4: {
    width: 45,
    gap: 12,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    height: 212,
    backgroundColor: "rgba(255, 255, 255, 0.61)",
    paddingHorizontal: 0,
    paddingVertical: 16,
    gap: 32,
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    width: 172,
    gap: 12,
    alignItems: "flex-start",
    overflow: "hidden",
  },
  line1: {
    height: 15,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
  },
  articleShoes: {
    textAlign: "left",
    fontSize: 12,
  },
  article: {
    fontFamily: "Goldman-Regular",
    color: "#03118e",
  },
  shoes: {
    color: "#656565",
    fontFamily: "Google Sans Code",
  },
  button: {
    elevation: 3,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#0d5fd6",
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 12,
    minWidth: 80,
    flexDirection: "row",
    width: 361,
    justifyContent: "center",
    alignItems: "center",
  },
  text4: {
    flex: 1,
    fontSize: 13,
    color: "#0d5fd6",
  },
});

export default ItemDetailScreen;
