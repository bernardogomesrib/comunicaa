// app/modal.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ModalMenu() {
  const router = useRouter();

  return (
    <View style={styles.modalContainer}>
      <View style={styles.options}>
        <TouchableOpacity style={styles.option} onPress={() => router.push('/cartoes')}>
          <Ionicons name="albums-outline" size={24} color="#007BFF" />
          <Text style={styles.optionText}>Cartões</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/nova-prancha')}>
          <Ionicons name="add-circle-outline" size={24} color="#007BFF" />
          <Text style={styles.optionText}>Nova Prancha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/minha-biblioteca')}>
          <Ionicons name="book-outline" size={24} color="#007BFF" />
          <Text style={styles.optionText}>Minha Biblioteca</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push('/supervisor')}>
          <Ionicons name="person-circle-outline" size={24} color="#007BFF" />
          <Text style={styles.optionText}>Supervisor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    justifyContent: 'space-between',
  },
  options: {
    flex: 1,
    justifyContent: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  backButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
