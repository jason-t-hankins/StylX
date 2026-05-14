// StylX Design Tokens - Y2K Aesthetic
// Color palette, typography, spacing, and shadow scales

export const Colors = {
  // Primary Y2K Neon Palette
  neonPink: '#FF1493',
  neonCyan: '#00D9FF',
  neonYellow: '#FFFF00',
  neonGreen: '#39FF14',
  neonViolet: '#9D00FF',
  neonBlue: '#0099FF',

  // Neutrals & Backgrounds
  white: '#FFFFFF',
  black: '#000000',
  darkBg: '#0A0E27', // Deep space background
  mediumBg: '#1A1F3A',
  lightBg: '#F5F7FA',

  // Grays
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Glassmorphism & Transparency
  glass: 'rgba(255, 255, 255, 0.1)',
  glassLight: 'rgba(255, 255, 255, 0.15)',

  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Y2K Specific
  retroPurple: '#C43AFF',
  retroPink: '#FF69B4',
  retroCyan: '#00FFFF',
};

export const Typography = {
  fontFamily: {
    default: 'System', // Falls back to system fonts
    // Add custom fonts later if needed
    display: 'System', // For headers
    body: 'System', // For body text
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
};

export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  // Y2K Neon glow effect
  neonGlow: {
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  neonGlowCyan: {
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const Animations = {
  timingFast: 150,
  timingNormal: 300,
  timingSlow: 500,
  timingSlower: 800,
};

// Export all as object for centralized access
export const designTokens = {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Animations,
};
