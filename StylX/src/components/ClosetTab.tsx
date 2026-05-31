import * as React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ClosetCarousel from "./ClosetCarousel";
import { ClosetItem } from "../utils/storage";

interface ClosetTabProps {
  items?: ClosetItem[];
  onDetailsPress?: (item: ClosetItem) => void;
}

const ClosetTab: React.FC<ClosetTabProps> = ({ items, onDetailsPress }) => {
  return (
    <View style={styles.closetTab}>
      <View style={styles.masterContainer}>
        <ClosetCarousel items={items} onDetailsPress={onDetailsPress} />
      </View>
      <View style={[styles.tab3Saves, styles.tab3SavesPosition]}>
        <Text style={styles.mysaves}>MySaves</Text>
      </View>
      <View style={[styles.tab2Closet, styles.tab3SavesPosition]}>
        <Text style={styles.mysaves}>MyCloset</Text>
      </View>
      <View style={[styles.tab1Looks, styles.tab3SavesPosition]}>
        <Text style={styles.mysaves}>MyLooks</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tab3SavesPosition: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    bottom: "94.43%",
    top: "0%",
    width: "27.48%",
    height: "5.57%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    position: "absolute",
  },
  closetTab: {
    height: 451,
    width: "100%",
  },
  masterContainer: {
    top: 29,
    left: 0,
    width: "100%",
    height: 493,
    paddingHorizontal: 8,
    paddingVertical: 0,
    alignItems: "center",
    overflow: "hidden",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.64)",
  },
  tab3Saves: {
    right: "13.49%",
    left: "59.03%",
    backgroundColor: "#b9dcf9",
  },
  mysaves: {
    fontSize: 16,
    fontFamily: "Goldman-Regular",
    color: "#03118e",
    textAlign: "left",
  },
  tab2Closet: {
    right: "40.97%",
    left: "31.55%",
    backgroundColor: "#b9dcf9",
  },
  tab1Looks: {
    right: "68.45%",
    left: "4.07%",
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    borderTopLeftRadius: 12,
    bottom: "94.43%",
    top: "0%",
    width: "27.48%",
    height: "5.57%",
  },
});

export default ClosetTab;
