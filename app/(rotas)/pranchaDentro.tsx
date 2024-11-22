import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Usando ícones do Ionicons
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter } from 'expo-router';

export default function PranchaDentro() {
  const router = useRouter();
  useEffect(() => {
    // Forçar a tela a ficar no modo paisagem
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Liberar a orientação quando o componente for desmontado
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Prancha de Cores</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => router.push('/modalMenu')}>
            <Ionicons name="menu" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/configuracoes')}>
            <Ionicons name="settings" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Faixa de Reproduzir Cartões */}
      <View style={styles.cardPlayer}>
        <TouchableOpacity onPress={() => console.log('Reproduzir texto do cartão')}>
          <Ionicons name="play-circle" size={40} color="green" />
        </TouchableOpacity>
        <Text style={styles.cardPlayerText}>Selecione cartões para reproduzir </Text>
        <View style={styles.cardPlayerIcons}>
          <TouchableOpacity onPress={() => console.log('Excluir cartão')}>
            <Ionicons name="trash" size={30} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Abrir teclado')}>
            <Ionicons name="keypad" size={30} color="blue" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Barra lateral esquerda */}
        <ScrollView style={styles.cardSidebar}>
          <View style={styles.cardItem}>
            <Text>Prancha de Cores</Text>
            <Ionicons name="alert-circle" size={20} color="orange" />
          </View>
          <View style={styles.cardItem}>
            <Text>Prancha de Escola</Text>
            <Ionicons name="search" size={20} color="blue" />
          </View>
          <View style={styles.cardItem}>
            <Text>Prancha de Sentimentos</Text>
            <Ionicons name="search" size={20} color="blue" />
          </View>
          <View style={styles.cardItem}>
            <Text>Prancha de Números</Text>
            <Ionicons name="search" size={20} color="blue" />
          </View>
          <View style={styles.cardItem}>
            <Text>Prancha de Animais</Text>
            <Ionicons name="search" size={20} color="blue" />
          </View>
          <View style={styles.cardItem}>
            <Text>Prancha de Ferramentas</Text>
            <Ionicons name="search" size={20} color="blue" />
          </View>
          <View style={styles.cardItem}>
            <Text>Prancha de Roupas</Text>
            <Ionicons name="search" size={20} color="blue" />
          </View>
          {/* Adicione mais cartões conforme necessário */}
        </ScrollView>

        {/* Visualização dos cartões principais */}
        <ScrollView contentContainerStyle={styles.mainContent}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Cor 1: Vermelho</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Cor 2: Azul</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>Cor 3: Verde</Text>
          </View>
          {/* Adicione mais cartões conforme necessário */}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  icons: {
    flexDirection: 'row',
  },
  cardPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cardPlayerText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  cardPlayerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  cardSidebar: {
    width: 120,
    backgroundColor: '#f9f9f9',
    borderRightWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  mainContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    flex: 1,
  },
  card: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    margin: 10,
    width: 150,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});
