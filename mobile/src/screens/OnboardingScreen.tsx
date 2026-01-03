import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
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
    title: 'Rychlé domluvy',
    text: 'Propojujeme poptávající a poskytovatele tak, aby se rychle dohodli.',
  },
  {
    title: 'Filtr a dostupnost',
    text: 'Vyber si obor, lokality a časové možnosti, které ti vyhovují.',
  },
  {
    title: 'Chat a potvrzení',
    text: 'Domluvte se v chatu a jedním klepnutím potvrďte nabídku.',
  },
];

export const OnboardingScreen: React.FC<Props> = ({ onGetStarted, onLogin }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const onScroll = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / width));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <Image source={require('../../assets/LOGO_final-1.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Vítejte v aplikaci</Text>
        <Text style={styles.subtitle}>Rychlé domluvy mezi poptávajícími a poskytovateli.</Text>
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          style={{ width }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {slides.map((s, idx) => (
            <View key={idx} style={[styles.slide, { width }]}>
              <View style={styles.illustrationWrap}>
                <LinearGradient
                  colors={gradients.primary}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.illustration}
                />
              </View>
              <Text style={styles.slideTitle}>{s.title}</Text>
              <Text style={styles.slideText}>{s.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.dotsRow}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <View style={styles.buttons}>
          <GradientButton title="Registrovat" onPress={onGetStarted} />
          <View style={{ height: spacing.sm }} />
          <GradientButton title="Přihlásit se" onPress={onLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  headerRow: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  logo: { width: 180, height: 48 },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'left',
    width: '100%',
    marginTop: spacing.xl,
  },
  subtitle: {
    fontSize: 17,
    color: colors.muted,
    textAlign: 'left',
    width: '100%',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  slide: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  illustrationWrap: {
    width: width * 0.82,
    height: width * 0.62,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  illustration: {
    flex: 1,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  slideText: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
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
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  buttons: {
    width: '100%',
  },
});

