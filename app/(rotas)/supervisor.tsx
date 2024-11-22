// app/supervisor.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Supervisor() {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [password, setPassword] = useState('');

  // Lista de usuários para o exemplo
  const users = ['João', 'Maria', 'Joaquim', 'Lucas', 'Ana', 'Carlos', 'Fernanda', 'Paulo'];

  return (
    <View style={styles.container}>
      {/* Título Centralizado */}
      <Text style={styles.title}>Quem irá utilizar?</Text>

      {/* Administrador com ícone */}
      <View style={styles.adminContainer}>
        <Ionicons name="person-circle-outline" size={32} color="#007BFF" />
        <Text style={styles.adminText}>Administrador</Text>

        {/* Campo de senha (aparece ao clicar no administrador) */}
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => setShowPasswordField(!showPasswordField)}>
          <Text style={styles.adminButtonText}>Senha de acesso</Text>
        </TouchableOpacity>
      </View>

      {showPasswordField && (
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.enterButton}>
            <Text style={styles.enterButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Lista rolável horizontal de usuários */}
      <Text style={styles.subTitle}>Selecione o usuário:</Text>
      <ScrollView horizontal style={styles.userList}>
        {users.map((user, index) => (
          <View key={index} style={styles.userCard}>
            <Ionicons name="person-outline" size={40} color="#007BFF"/>
            <Text style={styles.userName}>{user}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  adminContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  adminText: {
    marginLeft: 10,
    fontSize: 18,
  },
  adminButton: {
    marginLeft: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  passwordInput: {
    width: 200,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
  },
  enterButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  enterButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  userList: {
    flexDirection: 'row',
  },
  userCard: {
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    width: 100,
  },
  userName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
