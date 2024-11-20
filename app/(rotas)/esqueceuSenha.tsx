import React, { useState, useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link} from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EsqueciMinhaSenha() {
  const [opcao, setOpcao] = useState('email');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Forçar modo paisagem
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity
        style={styles.backButton}
      >
        <Link href="/login"><Icon name="arrow-back" size={24} color="#000" /></Link>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Esqueci minha senha</Text>
      <Text style={styles.subtitle}>Recupere a sua senha com e-mail ou Telefone</Text>

      {/* Botões radiais */}
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setOpcao('email')}
        >
          <View
            style={[
              styles.radioCircle,
              opcao === 'email' && styles.radioCircleSelected,
            ]}
          />
          <Text style={styles.radioLabel}>Receber por E-mail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setOpcao('sms')}
        >
          <View
            style={[
              styles.radioCircle,
              opcao === 'sms' && styles.radioCircleSelected,
            ]}
          />
          <Text style={styles.radioLabel}>Receber por SMS</Text>
        </TouchableOpacity>
      </View>

      {/* Campo de entrada */}
      <TextInput
        style={styles.input}
        placeholder={
          opcao === 'email' ? 'Digite seu e-mail' : 'Digite seu número de telefone'
        }
        value={inputValue}
        onChangeText={setInputValue}
        keyboardType={opcao === 'email' ? 'email-address' : 'phone-pad'}
      />

      {/* Texto informativo */}
      <Text style={styles.infoText}>
        {opcao === 'email'
          ? 'Você receberá um e-mail com o link de redefinição de senha no endereço informado.'
          : 'Você receberá um SMS com o link de redefinição de senha no número de telefone informado.'}
      </Text>

      {/* Botão */}
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Receber link de redefinição</Text>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  radioContainer: {
    marginBottom: 30,
    alignItems: 'flex-start',
    width: '80%',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: 'rgb(102, 218, 113)',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000',
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
  resetButton: {
    backgroundColor: 'rgb(102, 218, 113)',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
