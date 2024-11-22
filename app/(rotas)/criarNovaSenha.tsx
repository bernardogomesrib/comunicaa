import React, { useState, useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CriarNovaSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  useEffect(() => {
    // Forçar modo paisagem
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  const redefinirSenha = () => {
    if (novaSenha !== confirmaSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    // Adicione a lógica para redefinir a senha aqui
    alert('Senha redefinida com sucesso!');
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Criar nova senha</Text>

      {/* Campo: Nova Senha */}
      <Text style={styles.label}>Nova senha de acesso</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua nova senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      {/* Campo: Confirmar Nova Senha */}
      <Text style={styles.label}>Confirme sua nova senha de acesso</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme sua nova senha"
        secureTextEntry
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
      />

      {/* Descrição */}
      <Text style={styles.infoText}>
        A senha deve conter, no mínimo 8 caracteres, com uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@#*).
      </Text>

      {/* Botão: Redefinir */}
      <TouchableOpacity style={styles.redefinirButton} onPress={redefinirSenha}>
        <Text style={styles.redefinirButtonText}>Redefinir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: '80%',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  redefinirButton: {
    backgroundColor: 'rgb(102, 218, 113)', // Verde
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  redefinirButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
