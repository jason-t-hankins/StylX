import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { theme, ComponentSizes } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'neon' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { colors, spacing, borderRadius, shadows } = theme;

  const buttonHeight = size === 'small' ? 40 : size === 'large' ? 56 : 48;
  const paddingHorizontal = size === 'small' ? spacing[3] : spacing[4];

  const variantStyles: Record<string, { container: ViewStyle; text: TextStyle }> = {
    primary: {
      container: {
        backgroundColor: colors.neonPink,
        ...shadows.neonGlow,
      },
      text: {
        color: colors.white,
        fontWeight: '600',
      },
    },
    secondary: {
      container: {
        backgroundColor: colors.gray200,
      },
      text: {
        color: colors.gray900,
        fontWeight: '600',
      },
    },
    neon: {
      container: {
        backgroundColor: colors.darkBg,
        borderWidth: 2,
        borderColor: colors.neonCyan,
        ...shadows.neonGlowCyan,
      },
      text: {
        color: colors.neonCyan,
        fontWeight: '700',
      },
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.neonPink,
      },
      text: {
        color: colors.neonPink,
        fontWeight: '600',
      },
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          height: buttonHeight,
          paddingHorizontal,
          borderRadius: borderRadius.md,
          width: fullWidth ? '100%' : 'auto',
          ...currentVariant.container,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={currentVariant.text.color as string}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize: size === 'small' ? 14 : 16,
              ...currentVariant.text,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
});
