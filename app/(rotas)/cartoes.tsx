import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ScreenOrientation from "expo-screen-orientation";
import CriarCartaoModal from "./criarCartaoModal";
import AlterarCartaoModal from "./alterarCartaoModal";
import ExcluirCartaoModal from "./excluirCartaoModal";
import AdicionarCartaoPranchaModal from "./adicionarCartaoPranchaModal";
import { ScrollView } from "@/components/ui/ScroolView";
import { Cartao } from "@/components/ui/Cartao";

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
  const [cartoesBiblioteca, setCartoesBiblioteca] = useState([]);
  const [page, setPage] = useState(0);

  const pegarCartoesBiblioteca = async (pageNum = 0) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}cartao?page=${pageNum}&size=10`
      );
      const newCartoes = response.data.content;
      setCartoesBiblioteca((prev) =>
        pageNum === 0 ? newCartoes : [...prev, ...newCartoes]
      );
      setPage(pageNum);
    } catch (error) {
      console.error("Erro ao carregar cartões da biblioteca:");
      Alert.alert(
        "Erro",
        "Não foi possível carregar os cartões da biblioteca."
      );
    }
  };

  const handleLoadMore = () => {
    pegarCartoesBiblioteca(page + 1);
  };

  useEffect(() => {
    pegarCartoesBiblioteca();
  }, []);

  const meusCartoes = [
    { id: "1", title: "Cartão 1" },
    { id: "2", title: "Cartão 2" },
  ];

  const handleSelectCard = (id: string) => {
    setSelectedCard((prev) => (prev === id ? null : id));
  };

  const handleExcluirCard = (nome: string) => {
    setNomeCartaoExcluir(nome);
    setModalExcluirVisible(true);
  };

  const handleAdicionarPrancha = (rotulo: string, prancha: string) => {
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
        <TouchableOpacity style={styles.dropdown}>
          <Text style={{ color: "#888" }}>Selecione</Text>
        </TouchableOpacity>
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
          </TouchableOpacity>
        )}
      />

      {/* Cartões da Biblioteca */}
      <Text style={styles.sectionTitle}>Cartões da Biblioteca</Text>
      <ScrollView onMomentumScrollEnd={handleLoadMore} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {cartoesBiblioteca.map((card, key) => (
            <View
              key={key}
              style={{
                width: "20%",
                marginBottom: 10,
                transform: [{ scale: 0.9 }],
              }}
            >
              <Cartao
                type="onClick"
                cartao={card}
                setTexto={function (string: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>

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
    padding: 20,
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
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
});

export default Cartoes;
