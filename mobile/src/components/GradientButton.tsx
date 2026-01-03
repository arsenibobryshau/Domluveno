import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radius, spacing } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export const GradientButton: React.FC<Props> = ({ title, onPress, disabled, style }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled} style={style}>
      <LinearGradient colors={gradients.primary} style={[styles.button, disabled && styles.disabled]}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.6,
  },
});

