import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { api } from './src/apiClient';
import { login, register } from './src/authService';
import { clearToken } from './src/token';

export default function App() {
  const [categories, setCategories] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('heslo123');
  const [firstName, setFirstName] = useState('Jan');
  const [lastName, setLastName] = useState('Novák');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshPublic();
  }, []);

  const refreshPublic = async () => {
    try {
      const [cats, reqs] = await Promise.all([api.getCategories(), api.getRequests()]);
      setCategories(cats);
      setRequests(reqs);
    } catch (e: any) {
      Alert.alert('Chyba', e.message);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const t = await register(email, password, firstName, lastName);
      setToken(t);
      Alert.alert('OK', 'Registrace hotova, token uložen');
    } catch (e: any) {
      Alert.alert('Chyba', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const t = await login(email, password);
      setToken(t);
      Alert.alert('OK', 'Přihlášen, token uložen');
    } catch (e: any) {
      Alert.alert('Chyba', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async () => {
    setLoading(true);
    try {
      await api.createRequest({
        title: 'Úklid bytu',
        description: '2+kk',
        categoryId: categories[0]?.id || 1,
        budget: 1000,
        currency: 'CZK',
      });
      Alert.alert('OK', 'Poptávka vytvořena');
      await refreshPublic();
    } catch (e: any) {
      Alert.alert('Chyba', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await clearToken();
    setToken(null);
    Alert.alert('OK', 'Odhlášeno');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Domluveno MVP (Expo)</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text style={styles.label}>Heslo</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Text style={styles.label}>Jméno</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
        <Text style={styles.label}>Příjmení</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
        <View style={styles.row}>
          <Button title="Registrace" onPress={handleRegister} disabled={loading} />
          <View style={{ width: 8 }} />
          <Button title="Login" onPress={handleLogin} disabled={loading} />
        </View>
        <View style={{ height: 8 }} />
        <Button title="Logout" onPress={handleLogout} />
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>Kategorie (public)</Text>
        {categories.map((c) => (
          <Text key={c.id}>• {c.name}</Text>
        ))}
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>Poptávky (public)</Text>
        {requests.map((r) => (
          <Text key={r.id}>• {r.title} ({r.status})</Text>
        ))}
      </View>

      <View style={styles.box}>
        <Text style={styles.subtitle}>Akce s tokenem</Text>
        <Button title="Vytvořit demo poptávku" onPress={handleCreateRequest} disabled={!token || loading} />
        {!token && <Text style={styles.info}>Nejdřív se přihlas/registruj, uloží se token.</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#f7f7fb',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  box: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    marginTop: 6,
    fontWeight: '500',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  info: {
    marginTop: 6,
    color: '#666',
  },
});
