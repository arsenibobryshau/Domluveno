import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextField } from '../components/TextField';
import { GradientButton } from '../components/GradientButton';
import { spacing, colors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  onLoginSuccess: () => void;
  onSwitchToSignup: () => void;
  onForgot: () => void;
};

export const LoginScreen: React.FC<Props> = ({ onLoginSuccess, onSwitchToSignup, onForgot }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('heslo123');

  const handleLogin = async () => {
    // Dočasně přeskočíme backend, rovnou pokračujeme do aplikace
    onLoginSuccess();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Vítejte zpět</Text>
        <Text style={styles.subtitle}>Jsme rádi, že jste zpět, prosíme přihlašte se.</Text>
        <View style={{ height: spacing.lg }} />
        <TextField label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextField label="Heslo" value={password} onChangeText={setPassword} secureTextEntry />
        <View style={{ height: spacing.md }} />
        <GradientButton title="Přihlásit se" onPress={handleLogin} />
        <View style={{ height: spacing.sm }} />
        <Text style={styles.link} onPress={onForgot}>Zapomenuté heslo?</Text>
        <View style={{ height: spacing.lg }} />
        <Text style={styles.link} onPress={onSwitchToSignup}>Nemáte účet? Vytvořte si ho.</Text>
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

