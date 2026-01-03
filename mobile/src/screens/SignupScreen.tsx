import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextField } from '../components/TextField';
import { GradientButton } from '../components/GradientButton';
import { spacing, colors } from '../theme';
import { register } from '../authService';

type Props = {
  onSignupSuccess: () => void;
  onSwitchToLogin: () => void;
};

export const SignupScreen: React.FC<Props> = ({ onSignupSuccess, onSwitchToLogin }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('heslo123');
  const [firstName, setFirstName] = useState('Jan');
  const [lastName, setLastName] = useState('Novák');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      await register(email, password, firstName, lastName);
      onSignupSuccess();
    } catch (e: any) {
      Alert.alert('Chyba', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vytvoření nového účtu</Text>
      <Text style={styles.subtitle}>Vytvořte si účet a procházejte nabídky ostatních uživatelů.</Text>
      <View style={{ height: spacing.lg }} />
      <TextField label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextField label="Jméno" value={firstName} onChangeText={setFirstName} />
      <TextField label="Příjmení" value={lastName} onChangeText={setLastName} />
      <TextField label="Heslo" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={{ height: spacing.md }} />
      <GradientButton title="Zaregistrovat se" onPress={handleSignup} disabled={loading} />
      <View style={{ height: spacing.lg }} />
      <Text style={styles.link} onPress={onSwitchToLogin}>Máte už účet? Přihlaste se.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.muted,
    marginTop: spacing.xs,
  },
  link: {
    color: '#6C4CF1',
    fontWeight: '600',
  },
});

