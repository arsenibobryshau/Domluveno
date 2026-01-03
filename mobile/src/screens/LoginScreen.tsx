import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextField } from '../components/TextField';
import { GradientButton } from '../components/GradientButton';
import { spacing, colors } from '../theme';
import { login } from '../authService';

type Props = {
  onLoginSuccess: () => void;
  onSwitchToSignup: () => void;
  onForgot: () => void;
};

export const LoginScreen: React.FC<Props> = ({ onLoginSuccess, onSwitchToSignup, onForgot }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('heslo123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      onLoginSuccess();
    } catch (e: any) {
      Alert.alert('Chyba', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vítejte zpět</Text>
      <Text style={styles.subtitle}>Jsme rádi, že jste zpět, prosíme přihlašte se.</Text>
      <View style={{ height: spacing.lg }} />
      <TextField label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextField label="Heslo" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={{ height: spacing.md }} />
      <GradientButton title="Přihlásit se" onPress={handleLogin} disabled={loading} />
      <View style={{ height: spacing.sm }} />
      <Text style={styles.link} onPress={onForgot}>Zapomenuté heslo?</Text>
      <View style={{ height: spacing.lg }} />
      <Text style={styles.link} onPress={onSwitchToSignup}>Nemáte účet? Vytvořte si ho.</Text>
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

