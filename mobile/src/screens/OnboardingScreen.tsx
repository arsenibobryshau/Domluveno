import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { gradients, spacing, radius, colors } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '../components/GradientButton';

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
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      >
        {slides.map((s, idx) => (
          <View key={idx} style={[styles.slide, { width }]}>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.text}>{s.text}</Text>
            <LinearGradient colors={gradients.primary} style={styles.illustration} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <GradientButton title="Registrovat" onPress={onGetStarted} />
        <View style={{ height: spacing.sm }} />
        <GradientButton title="Přihlásit se" onPress={onLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  text: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  illustration: {
    width: width * 0.7,
    height: width * 0.5,
    borderRadius: radius.lg,
    opacity: 0.25,
  },
  footer: {
    padding: spacing.lg,
  },
});

