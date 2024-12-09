import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import CriarCartaoModal from "./criarCartaoModal";
import AlterarCartaoModal from "./alterarCartaoModal";
import ExcluirCartaoModal from "./excluirCartaoModal";
import AdicionarCartaoPranchaModal from "./adicionarCartaoPranchaModal";

const Cartoes = () => {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    lockOrientation();
  }, []);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAlterarVisible, setModalAlterarVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [nomeCartaoExcluir, setNomeCartaoExcluir] = useState("");
  const [modalPranchaVisible, setModalPranchaVisible] = useState(false);

  const meusCartoes = [
    { id: "1", title: "Cartão 1" },
    { id: "2", title: "Cartão 2" },
  ];

  const cartoesBiblioteca = [
    { id: "3", title: "Cartão Biblioteca 1" },
    { id: "4", title: "Cartão Biblioteca 2" },
  ];

  const handleSelectCard = (id: string) => {
    setSelectedCard((prev) => (prev === id ? null : id));
  };

  const handleExcluirCard = (nome: string) => {
    setNomeCartaoExcluir(nome);
    setModalExcluirVisible(true);
  };

  const handleAdicionarPrancha = (rotulo: string, prancha: string) => {
    // Lógica para adicionar o cartão à prancha selecionada
    console.log(`Cartão "${rotulo}" adicionado à prancha "${prancha}".`);
    setModalPranchaVisible(false);
  };

  const excluirCartao = () => {
    console.log(`Cartão "${nomeCartaoExcluir}" excluído.`);
    setModalExcluirVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cartões</Text>
        <View style={styles.headerIcons}>
          <FontAwesome
            name="bars"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Ionicons
            name="settings"
            size={24}
            color="white"
            style={styles.icon}
          />
        </View>
      </View>

      {/* Barra de Filtros */}
      <View style={styles.filterBar}>
        <TextInput placeholder="Filtrar por rótulo" style={styles.searchBar} />
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>Categoria:</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownPlaceholder}>Selecione</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Meus Cartões */}
      <Text style={styles.sectionTitle}>Meus Cartões</Text>
      <FlatList
        data={meusCartoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selectedCard === item.id && styles.selectedCard,
            ]}
            onPress={() => handleSelectCard(item.id)}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            {selectedCard === item.id && (
              <View style={styles.cardMenu}>
                <TouchableOpacity
                  style={styles.cardMenuButton}
                  onPress={() => setModalPranchaVisible(true)}
                >
                  <Text style={styles.cardMenuText}>Adicionar à Prancha</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cardMenuButton}
                  onPress={() => setModalAlterarVisible(true)}
                >
                  <Text style={styles.cardMenuText}>Alterar Cartão</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cardMenuButton}
                  onPress={() => handleExcluirCard(item.title)}
                >
                  <Text style={styles.cardMenuText}>Excluir Cartão</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Cartões da Biblioteca */}
      <Text style={styles.sectionTitle}>Cartões da Biblioteca</Text>
      <FlatList
        data={cartoesBiblioteca}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        )}
      />

      {/* Botão Criar Cartão */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          backgroundColor: "#4d88ff",
          padding: 15,
          borderRadius: 30,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Criar Cartão</Text>
      </TouchableOpacity>

      {/* Modais */}
      <CriarCartaoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <AlterarCartaoModal
        visible={modalAlterarVisible}
        onClose={() => setModalAlterarVisible(false)}
      />
      <ExcluirCartaoModal
        visible={modalExcluirVisible}
        onClose={() => setModalExcluirVisible(false)}
        onExcluir={excluirCartao}
        nomeCartao={nomeCartaoExcluir}
      />
      <AdicionarCartaoPranchaModal
        visible={modalPranchaVisible}
        onClose={() => setModalPranchaVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6D83F4",
    padding: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 10,
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    marginRight: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dropdownPlaceholder: {
    color: "#888",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCard: {
    borderColor: "#6D83F4",
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 14,
  },
  cardMenu: {
    marginTop: 5,
  },
  cardMenuButton: {
    padding: 5,
    backgroundColor: "#eee",
    borderRadius: 3,
    marginTop: 5,
  },
  cardMenuText: {
    fontSize: 12,
    color: "#333",
  },
  createButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#22AD4C",
    padding: 15,
    borderRadius: 30,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Cartoes;
