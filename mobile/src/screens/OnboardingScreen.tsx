import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { gradients, spacing, radius, colors } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '../components/GradientButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type Props = {
  onGetStarted: () => void;
  onLogin: () => void;
};

const slides = [
  {
    title: 'Vítejte v aplikaci',
    text: 'Rychlé domluvy mezi poptávajícími a poskytovateli.',
  },
  {
    title: 'Najdi odborníka',
    text: 'Filtrování podle kategorií a dostupnosti.',
  },
  {
    title: 'Chatujte a dohodněte detaily',
    text: 'Bezpečný chat a rychlé potvrzení nabídky.',
  },
];

export const OnboardingScreen: React.FC<Props> = ({ onGetStarted, onLogin }) => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Vítejte v aplikaci</Text>
        <Text style={styles.subtitle}>Rychlé domluvy mezi poptávajícími a poskytovateli.</Text>
        <View style={styles.illustrationWrap}>
          <LinearGradient colors={gradients.primary} style={styles.illustration} />
        </View>
        <View style={styles.dotsRow}>
          {slides.map((_, idx) => (
            <View key={idx} style={[styles.dot, idx === 0 && styles.dotActive]} />
          ))}
        </View>
        <View style={styles.buttons}>
          <GradientButton title="Registrovat" onPress={onGetStarted} />
          <View style={{ height: spacing.sm }} />
          <GradientButton title="Přihlásit se" onPress={onLogin} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    padding: spacing.lg,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  illustrationWrap: {
    marginTop: spacing.lg,
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  illustration: {
    flex: 1,
    opacity: 0.3,
  },
  dotsRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  buttons: {
    width: '100%',
  },
});

