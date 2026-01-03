import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../components/Card';
import { spacing, colors } from '../theme';

const events = [
  { time: '09:00', title: 'Oprava počítače', place: 'Kladno' },
  { time: '11:00', title: 'Instalace Wi-Fi', place: 'Praha 4' },
  { time: '15:00', title: 'Oprava PC - dálkově', place: 'Remote' },
];

export const CalendarScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listopad 2025</Text>
      <View style={{ height: spacing.md }} />
      <Text style={styles.section}>Dnešní plán</Text>
      {events.map((e, idx) => (
        <Card key={idx} style={{ marginBottom: spacing.sm }}>
          <Text style={styles.eventTime}>{e.time}</Text>
          <Text style={styles.eventTitle}>{e.title}</Text>
          <Text style={{ color: colors.muted }}>{e.place}</Text>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700' },
  section: { fontWeight: '700', fontSize: 16, marginBottom: spacing.sm },
  eventTime: { color: colors.muted, fontWeight: '600' },
  eventTitle: { fontWeight: '700', marginBottom: spacing.xs },
});

