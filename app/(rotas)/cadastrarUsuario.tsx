import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function CadastrarUsuario() {
  useEffect(() => {
    // Forçar modo paisagem
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);
  
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Lado Esquerdo */}
      <View style={styles.leftContainer}>
        <TextInput
          placeholder="Nome completo"
          style={styles.input}
        />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Telefone"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Lado Direito */}
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.cadastrarButton}>
          <Text style={styles.cadastrarButtonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>
            Voltar para o <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  leftContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',  // Ajuste para não centralizar o conteúdo verticalmente
    marginRight: 10, // Ajuste para dar espaço entre as seções
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',  // Ajustado para alinhar no topo da seção
    padding: 20,
  },
  cadastrarButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
  },
  cadastrarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#000',
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
