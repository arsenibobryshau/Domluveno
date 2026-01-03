import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors, radius, spacing } from '../theme';

type Props = TextInputProps & {
  label?: string;
};

export const TextField: React.FC<Props> = ({ label, style, ...rest }) => {
  return (
    <View style={{ marginBottom: spacing.md }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.muted}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.xs,
    color: colors.text,
    fontWeight: '600',
  },
  input: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#fff',
  },
});

