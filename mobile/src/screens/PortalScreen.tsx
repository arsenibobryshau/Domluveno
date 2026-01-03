import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../components/Card';
import { spacing, colors } from '../theme';

const tiles = [
  { title: 'Zprávy', value: '5 aktivních chatů' },
  { title: 'Poptávky', value: '14 poptávek' },
  { title: 'Zakázky', value: '4 otevřené zakázky' },
  { title: 'Fakturace', value: 'K výplatě 124 234 Kč' },
];

export const PortalScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portal</Text>
      <View style={{ marginTop: spacing.md, flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -spacing.sm }}>
        {tiles.map((t) => (
          <Card key={t.title} style={styles.tile}>
            <Text style={styles.tileLabel}>{t.title}</Text>
            <Text style={styles.tileValue}>{t.value}</Text>
          </Card>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700' },
  tile: { width: '47%', marginHorizontal: spacing.sm, marginBottom: spacing.sm },
  tileLabel: { fontWeight: '700', marginBottom: spacing.xs },
  tileValue: { color: colors.muted },
});

