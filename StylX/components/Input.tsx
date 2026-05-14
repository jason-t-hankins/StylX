import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  Text,
} from 'react-native';
import { theme } from '../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: 'default' | 'neon';
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'default',
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors, spacing, borderRadius, typography } = theme;

  const variantStyles: Record<
    string,
    { borderColor: string; backgroundColor: string }
  > = {
    default: {
      borderColor: isFocused ? colors.neonPink : colors.gray300,
      backgroundColor: colors.white,
    },
    neon: {
      borderColor: isFocused ? colors.neonCyan : colors.neonPink,
      backgroundColor: colors.darkBg,
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              fontSize: typography.fontSize.sm,
              color: colors.gray700,
              marginBottom: spacing[2],
            },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: currentVariant.borderColor,
            backgroundColor: currentVariant.backgroundColor,
            borderRadius: borderRadius.md,
            borderWidth: 2,
            padding: spacing[3],
            fontSize: typography.fontSize.base,
            color: variant === 'neon' ? colors.neonCyan : colors.gray900,
          },
        ]}
        placeholderTextColor={variant === 'neon' ? colors.gray400 : colors.gray400}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && (
        <Text
          style={[
            styles.error,
            {
              fontSize: typography.fontSize.xs,
              color: colors.error,
              marginTop: spacing[1],
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
  },
  input: {
    fontFamily: 'System',
  },
  error: {
    fontWeight: '500',
  },
});