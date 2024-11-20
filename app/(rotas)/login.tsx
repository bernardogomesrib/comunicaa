import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Link } from 'expo-router';

export default function Login() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Campo Usuário */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          placeholder="E-mail ou Número de Telefone"
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      {/* Campo Senha */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Link Esqueci Minha Senha */}
      <TouchableOpacity>
      <Link href="/esqueceuSenha"><Text style={styles.forgotPassword}>Esqueci minha senha</Text></Link>
      </TouchableOpacity>

      {/* Botão de Login */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Texto para Cadastro */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não tem uma conta? </Text>
        <TouchableOpacity>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

      {/* Separador */}
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>Ou</Text>
        <View style={styles.separator} />
      </View>

      {/* Botão Login com Google */}
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Login com o Google</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  forgotPassword: {
    color: 'red',
    textAlign: 'left',
    marginBottom: 20
  },
  loginButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#333',
  },
  registerLink: {
    fontSize: 16,
    color: '#0969DA',
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
