import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../components/Card';
import { GradientButton } from '../components/GradientButton';
import { spacing, colors } from '../theme';

const slots = [
  { title: 'Volno s možností dojezdu', time: '9:00 - 18:00', note: 'Víkend' },
  { title: 'Volno vzdáleně', time: '18:00 - 20:00', note: 'Každý den' },
  { title: 'Volno s možností dojezdu', time: '8:00 - 18:00', note: '25.11.2025' },
];

export const AvailabilityScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Správa dostupnosti</Text>
      </View>
      <Text style={styles.subtitle}>Časový plán dle svých možností</Text>
      <View style={{ height: spacing.md }} />
      <GradientButton title="Vytvořit časový plán" onPress={() => {}} />
      <View style={{ height: spacing.md }} />
      {slots.map((s, idx) => (
        <Card key={idx} style={{ marginBottom: spacing.sm }}>
          <Text style={styles.slotTitle}>{s.title}</Text>
          <Text style={styles.slotTime}>{s.time}</Text>
          <Text style={{ color: colors.muted }}>{s.note}</Text>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { color: colors.muted, marginTop: spacing.xs },
  slotTitle: { fontWeight: '700', marginBottom: spacing.xs },
  slotTime: { color: colors.muted, fontWeight: '600' },
});

