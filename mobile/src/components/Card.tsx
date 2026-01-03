import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing, shadows } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const Card: React.FC<Props> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
    ...shadows.card,
  },
});

