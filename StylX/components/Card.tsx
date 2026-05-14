import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { theme } from '../constants/theme';

interface CardProps extends TouchableOpacityProps {
  variant?: 'default' | 'neon' | 'glass';
  children: React.ReactNode;
  style?: ViewStyle;
  pressable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  style,
  pressable = false,
  ...props
}) => {
  const { colors, borderRadius, shadows, spacing } = theme;

  const variantStyles: Record<string, ViewStyle> = {
    default: {
      backgroundColor: colors.white,
      ...shadows.md,
    },
    neon: {
      backgroundColor: colors.darkBg,
      borderWidth: 2,
      borderColor: colors.neonPink,
      ...shadows.neonGlow,
    },
    glass: {
      backgroundColor: colors.glass,
      borderWidth: 1,
      borderColor: colors.glassLight,
      ...shadows.sm,
    },
  };

  const cardStyle = [
    styles.card,
    {
      borderRadius: borderRadius.lg,
      padding: spacing[4],
      ...variantStyles[variant],
    },
    style,
  ];

  if (pressable) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={cardStyle}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
