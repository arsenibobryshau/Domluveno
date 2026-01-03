import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { spacing, colors } from '../theme';
import { clearToken } from '../token';

type Props = {
  onLogout?: () => void;
};

export const ProfileScreen: React.FC<Props> = ({ onLogout }) => {
  const handleLogout = async () => {
    await clearToken();
    onLogout?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Martin Novák</Text>
      <Text style={styles.subtitle}>martin@gmail.com</Text>
      <View style={{ height: spacing.lg }} />
      <Text style={styles.section}>Nastavení</Text>
      <Text style={styles.item}>Notifikace e-mailem</Text>
      <Text style={styles.item}>Notifikace aktivit</Text>
      <Text style={styles.item}>Jazyk</Text>
      <Text style={styles.item}>O nás</Text>
      <Text style={styles.item}>Ochrana osobních údajů</Text>
      <View style={{ height: spacing.lg }} />
      <Button title="Odhlásit se" onPress={handleLogout} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { color: colors.muted, marginBottom: spacing.lg },
  section: { fontWeight: '700', marginBottom: spacing.sm },
  item: { paddingVertical: spacing.xs, color: colors.text },
});

