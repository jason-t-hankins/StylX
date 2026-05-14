import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  Text,
} from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { theme } from '../constants/theme';
import { Card, Button } from '../components';

const { width, height } = Dimensions.get('window');

interface LookItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  vibe: 'casual' | 'formal' | 'party' | 'retro' | 'minimalist';
}

// Mock data - replace with real data from API/Firebase
const MOCK_LOOKS: LookItem[] = [
  {
    id: '1',
    title: 'Retro Y2K Fit',
    description: 'Low-rise jeans with a butterfly top',
    tags: ['y2k', 'casual', 'vintage'],
    vibe: 'retro',
  },
  {
    id: '2',
    title: 'Minimalist Chic',
    description: 'White tee with tailored trousers',
    tags: ['minimalist', 'clean', 'modern'],
    vibe: 'minimalist',
  },
  {
    id: '3',
    title: 'Party Ready',
    description: 'Sequined dress for the night',
    tags: ['party', 'glam', 'nightlife'],
    vibe: 'party',
  },
];

export const DiscoverScreen: React.FC = () => {
  const [looks, setLooks] = useState<LookItem[]>(MOCK_LOOKS);
  const [savedFavorites, setSavedFavorites] = useState<string[]>([]);
  const { colors, spacing } = theme;

  const handleSaveLook = (lookId: string) => {
    if (savedFavorites.includes(lookId)) {
      setSavedFavorites(savedFavorites.filter((id) => id !== lookId));
    } else {
      setSavedFavorites([...savedFavorites, lookId]);
    }
  };

  const renderLookCard = ({ item }: { item: LookItem }) => {
    const isSaved = savedFavorites.includes(item.id);

    return (
      <Card
        variant="neon"
        style={styles.lookCard}
        pressable
      >
        <View style={styles.cardContent}>
          {/* Image placeholder - replace with actual Image component from Figma designs */}
          <View
            style={[
              styles.imagePlaceholder,
              { backgroundColor: colors.mediumBg },
            ]}
          >
            <Text style={{ color: colors.gray400 }}>Look Image</Text>
          </View>

          {/* Title and Description */}
          <Text style={[styles.title, { color: colors.neonCyan }]}>
            {item.title}
          </Text>
          <Text style={[styles.description, { color: colors.gray400 }]}>
            {item.description}
          </Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {item.tags.map((tag, idx) => (
              <View
                key={idx}
                style={[
                  styles.tag,
                  { backgroundColor: colors.darkBg, borderColor: colors.neonPink },
                ]}
              >
                <Text style={[styles.tagText, { color: colors.neonPink }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          {/* Actions */}
          <Button
            title={isSaved ? '★ Saved' : '☆ Save Look'}
            onPress={() => handleSaveLook(item.id)}
            variant="neon"
            size="small"
            fullWidth
            textStyle={{ fontSize: 14 }}
          />
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.white }]}>
      <View style={[styles.header, { paddingHorizontal: spacing[4] }]}>
        <Text style={[styles.headerTitle, { color: colors.black }]}>
          Discover Looks
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.gray600 }]}>
          Find your next favorite outfit
        </Text>
      </View>

      <FlatList
        data={looks}
        keyExtractor={(item) => item.id}
        renderItem={renderLookCard}
        scrollEnabled={true}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: spacing[4], paddingBottom: spacing[8] },
        ]}
        ItemSeparatorComponent={() => (
          <View style={{ height: spacing[3] }} />
        )}
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
    borderBottomWidth: 2,
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
  listContent: {
    paddingTop: 16,
  },
  lookCard: {
    borderRadius: 16,
  },
  cardContent: {
    gap: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
