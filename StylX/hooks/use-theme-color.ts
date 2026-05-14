/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { theme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  const colorScheme = useColorScheme() ?? 'light';
  const colorFromProps = props[colorScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Use theme colors with sensible defaults for light/dark
    switch (colorName) {
      case 'text':
        return colorScheme === 'dark' ? theme.colors.white : theme.colors.gray900;
      case 'background':
        return colorScheme === 'dark' ? theme.colors.darkBg : theme.colors.white;
      case 'tint':
        return theme.colors.neonPink;
      case 'icon':
        return theme.colors.gray500;
      case 'tabIconDefault':
        return theme.colors.gray400;
      case 'tabIconSelected':
        return theme.colors.neonPink;
      default:
        return colorScheme === 'dark' ? theme.colors.white : theme.colors.gray900;
    }
  }
}
