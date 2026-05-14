import { designTokens } from './designTokens';
import { Platform } from 'react-native';

// Import design tokens
const { Colors, Typography, Spacing, BorderRadius, Shadows, Animations } = designTokens;

export const theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  animations: Animations,
};

export type Theme = typeof theme;

// Common component sizes
export const ComponentSizes = {
  buttonHeight: 48,
  buttonSmallHeight: 40,
  cardPadding: Spacing[4],
  screenPadding: Spacing[4],
  tabHeight: 56,
};

// Preset styles for common components
export const PresetStyles = {
  shadowedCard: {
    ...Shadows.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.white,
  },
  neonCard: {
    ...Shadows.neonGlow,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.darkBg,
    borderWidth: 2,
    borderColor: Colors.neonPink,
  },
  glassCard: {
    backgroundColor: Colors.glass,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Colors.glassLight,
  },
  heading1: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.lineHeight.tight,
    color: Colors.black,
  },
  heading2: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.lineHeight.tight,
    color: Colors.black,
  },
  heading3: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.semibold,
    lineHeight: Typography.lineHeight.normal,
    color: Colors.black,
  },
  bodyText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.lineHeight.normal,
    color: Colors.gray800,
  },
  bodySmall: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.lineHeight.normal,
    color: Colors.gray600,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
