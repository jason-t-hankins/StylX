import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  Dimensions,
} from 'react-native';
import { theme } from '../constants/theme';
import { Card, Button } from '../components';

const { width } = Dimensions.get('window');

interface WardrobeItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
  color: string;
  timesWorn: number;
  imageUrl?: string;
}

// Mock data - replace with real data from AsyncStorage or database
const MOCK_WARDROBE: WardrobeItem[] = [
  {
    id: '1',
    name: 'Pink Butterfly Top',
    category: 'tops',
    color: 'Pink',
    timesWorn: 5,
  },
  {
    id: '2',
    name: 'Low-Rise Jeans',
    category: 'bottoms',
    color: 'Blue',
    timesWorn: 12,
  },
  {
    id: '3',
    name: 'Silver Sequin Dress',
    category: 'dresses',
    color: 'Silver',
    timesWorn: 2,
  },
];

export const WardrobeScreen: React.FC = () => {
  const [items, setItems] = useState<WardrobeItem[]>(MOCK_WARDROBE);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { colors, spacing } = theme;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'shoes', label: 'Shoes' },
  ];

  const filteredItems =
    selectedCategory && selectedCategory !== 'all'
      ? items.filter((item) => item.category === selectedCategory)
      : items;

  const renderCategoryButton = (category: { id: string; label: string }) => {
    const isSelected =
      (selectedCategory === null && category.id === 'all') ||
      selectedCategory === category.id;

    return (
      <Button
        key={category.id}
        title={category.label}
        onPress={() =>
          setSelectedCategory(
            category.id === 'all' ? null : (category.id as any)
          )
        }
        variant={isSelected ? 'primary' : 'secondary'}
        size="small"
        style={styles.categoryButton}
        textStyle={{ fontSize: 12 }}
      />
    );
  };

  const renderWardrobeItem = ({ item }: { item: WardrobeItem }) => {
    return (
      <Card variant="glass" style={styles.itemCard}>
        {/* Item image placeholder */}
        <View
          style={[
            styles.itemImagePlaceholder,
            { backgroundColor: colors.mediumBg },
          ]}
        >
          <Text style={{ color: colors.gray500 }}>Item Photo</Text>
        </View>

        {/* Item details */}
        <Text
          style={[styles.itemName, { color: colors.gray900 }]}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        <View style={styles.itemMeta}>
          <View
            style={[
              styles.colorBadge,
              { backgroundColor: colors.neonPink },
            ]}
          >
            <Text style={{ color: colors.white, fontSize: 12 }}>{item.color}</Text>
          </View>
          <Text style={[styles.wornCount, { color: colors.gray500 }]}>
            Worn {item.timesWorn}x
          </Text>
        </View>

        {/* Action button */}
        <Button
          title="Log Outfit"
          onPress={() => {
            // Handle logging outfit usage
          }}
          variant="outline"
          size="small"
          fullWidth
        />
      </Card>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.white }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing[4] }]}>
        <Text style={[styles.headerTitle, { color: colors.black }]}>
          Your Wardrobe
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.gray600 }]}>
          {filteredItems.length} items
        </Text>
      </View>

      {/* Category Filter */}
      <View style={[styles.categoryContainer, { paddingHorizontal: spacing[4] }]}>
        <FlatList
          data={categories}
          renderItem={({ item }) => renderCategoryButton(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          ItemSeparatorComponent={() => (
            <View style={{ width: spacing[2] }} />
          )}
        />
      </View>

      {/* Wardrobe Grid */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderWardrobeItem}
        numColumns={2}
        columnWrapperStyle={{
          gap: spacing[3],
          paddingHorizontal: spacing[4],
        }}
        contentContainerStyle={{
          paddingTop: spacing[3],
          paddingBottom: spacing[8],
        }}
        scrollEnabled
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  categoryContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryButton: {
    minWidth: 70,
  },
  itemCard: {
    flex: 1,
  },
  itemImagePlaceholder: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  colorBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  wornCount: {
    fontSize: 12,
    fontWeight: '500',
  },
});
