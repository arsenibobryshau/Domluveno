import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { TextField } from '../components/TextField';
import { GradientButton } from '../components/GradientButton';
import { spacing, colors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  onSignupSuccess: () => void;
  onSwitchToLogin: () => void;
};

export const SignupScreen: React.FC<Props> = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('heslo123');
  const [firstName, setFirstName] = useState('Jan');
  const [lastName, setLastName] = useState('Novák');

  const handleSignup = async () => {
    // Dočasně přeskočíme backend, rovnou pokračujeme do aplikace
    onSignupSuccess();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Image source={require('../../assets/LOGO_final-1.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Vytvoření nového účtu</Text>
        <Text style={styles.subtitle}>Vytvořte si účet a procházejte nabídky ostatních uživatelů.</Text>
        <View style={{ height: spacing.lg }} />
        <TextField label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextField label="Jméno" value={firstName} onChangeText={setFirstName} />
        <TextField label="Příjmení" value={lastName} onChangeText={setLastName} />
        <TextField label="Heslo" value={password} onChangeText={setPassword} secureTextEntry />
        <View style={{ height: spacing.md }} />
        <GradientButton title="Zaregistrovat se" onPress={handleSignup} />
        <View style={{ height: spacing.lg }} />
        <Text style={styles.link} onPress={onSwitchToLogin}>Máte už účet? Přihlaste se.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    padding: spacing.lg,
    backgroundColor: '#fff',
  },
  logo: { width: 150, height: 40, marginBottom: spacing.lg },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    marginTop: spacing.xs,
    fontSize: 16,
  },
  link: {
    color: '#6C4CF1',
    fontWeight: '600',
    marginTop: spacing.sm,
  },
});

