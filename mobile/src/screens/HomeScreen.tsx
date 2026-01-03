import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../components/Card';
import { spacing, colors } from '../theme';

const stats = [
  { label: 'Zprávy', value: '5 aktivních chatů' },
  { label: 'Poptávky', value: '14 poptávek' },
  { label: 'Zakázky', value: '4 otevřené' },
  { label: 'Fakturace', value: '124 234 Kč k výplatě' },
];

const tasks = [
  { title: 'Oprava počítače', time: '09:00 - 10:00', place: 'Praha 4' },
  { title: 'Instalace Wi-Fi', time: '11:00 - 14:00', place: 'Chodov' },
  { title: 'Úklid bytu', time: '15:00 - 16:30', place: 'Vinohrady' },
];

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ahoj, Martine</Text>
      <Text style={styles.subtitle}>Dnes Vás čeká náročný den</Text>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={styles.cardTitle}>Naplánované zakázky</Text>
        <Text style={styles.cardText}>Dnes máte 4 zakázky.</Text>
      </Card>

      <View style={{ marginTop: spacing.md }}>
        <Text style={styles.section}>Přehled</Text>
        <View style={styles.grid}>
          {stats.map((s) => (
            <Card key={s.label} style={styles.tile}>
              <Text style={styles.tileLabel}>{s.label}</Text>
              <Text style={styles.tileValue}>{s.value}</Text>
            </Card>
          ))}
        </View>
      </View>

      <View style={{ marginTop: spacing.md }}>
        <Text style={styles.section}>Dnes</Text>
        {tasks.map((t, idx) => (
          <Card key={idx} style={{ marginBottom: spacing.sm }}>
            <Text style={styles.tileLabel}>{t.title}</Text>
            <Text style={styles.tileValue}>{t.time}</Text>
            <Text style={{ color: colors.muted }}>{t.place}</Text>
          </Card>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: '#fff',
  },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { color: colors.muted, marginTop: spacing.xs },
  cardTitle: { fontWeight: '700', marginBottom: spacing.xs },
  cardText: { color: colors.muted },
  section: { fontWeight: '700', fontSize: 16, marginBottom: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -spacing.sm },
  tile: { width: '48%', marginHorizontal: spacing.sm, marginBottom: spacing.sm },
  tileLabel: { fontWeight: '700', marginBottom: spacing.xs },
  tileValue: { color: colors.muted },
});

