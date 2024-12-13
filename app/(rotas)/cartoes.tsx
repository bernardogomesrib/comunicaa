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
import * as ScreenOrientation from "expo-screen-orientation";
import AlterarCartaoModal from "./alterarCartaoModal";
import ExcluirCartaoModal from "./excluirCartaoModal";
import AdicionarCartaoPranchaModal from "./adicionarCartaoPranchaModal";
import ModalOpcoesCartao from "./modalOpcoesCartao";
import { ScrollView } from "@/components/ui/ScroolView";
import { Cartao } from "@/components/ui/Cartao";
import { pegarCartoes } from "./apiService.js";

const Cartoes = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [modalAlterarVisible, setModalAlterarVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [modalPranchaVisible, setModalPranchaVisible] = useState(false);
  const [modalOpcoesVisible, setModalOpcoesVisible] = useState(false);
  const [cartoesBiblioteca, setCartoesBiblioteca] = useState([]);
  const [page, setPage] = useState(0);
  const [cartaoAtual, setCartaoAtual] = useState(null);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    lockOrientation();
    carregarCartoesBiblioteca();
  }, []);

  const carregarCartoesBiblioteca = async (pageNum = 0) => {
    try {
      const newCartoes = await pegarCartoes(pageNum);
      setCartoesBiblioteca((prev) =>
        pageNum === 0 ? newCartoes : [...prev, ...newCartoes]
      );
      setPage(pageNum);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar os cartões da biblioteca."
      );
    }
  };

  const abrirModalOpcoes = (cartao) => {
    setCartaoAtual(cartao);
    setModalOpcoesVisible(true);
  };

  const fecharModalOpcoes = () => {
    setCartaoAtual(null);
    setModalOpcoesVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cartões</Text>
        <View>
          <FontAwesome name="bars" size={24} color="white" />
          <Ionicons name="settings" size={24} color="white" />
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
        data={[{ id: "1", title: "Cartão 1" }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selectedCard === item.id && styles.selectedCard,
            ]}
            onPress={() => abrirModalOpcoes(item)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Cartões da Biblioteca */}
      <Text style={styles.sectionTitle}>Cartões da Biblioteca</Text>
      <ScrollView
        onMomentumScrollEnd={() => carregarCartoesBiblioteca(page + 1)}
        style={{ flex: 1 }}
      >
        <View style={styles.cardContainer}>
          {cartoesBiblioteca.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.card,
                selectedCard === card.id && styles.selectedCard,
              ]}
              onPress={() => abrirModalOpcoes(card)}
            >
              <Cartao type="onClick" cartao={card} setTexto={() => {}} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modais */}
      <AlterarCartaoModal
        visible={modalAlterarVisible}
        onClose={() => setModalAlterarVisible(false)}
        cartao={cartaoAtual}
        onSave={() => carregarCartoesBiblioteca()}
      />
      <ExcluirCartaoModal
        visible={modalExcluirVisible}
        onClose={() => setModalExcluirVisible(false)}
        onExcluir={() => carregarCartoesBiblioteca()}
        nomeCartao={cartaoAtual?.title}
      />
      <AdicionarCartaoPranchaModal
        visible={modalPranchaVisible}
        onClose={() => setModalPranchaVisible(false)}
      />
      <ModalOpcoesCartao
        visible={modalOpcoesVisible}
        onClose={fecharModalOpcoes}
        onAdicionarPrancha={() => {
          setModalPranchaVisible(true);
          fecharModalOpcoes();
        }}
        onEditar={() => {
          setModalAlterarVisible(true);
          fecharModalOpcoes();
        }}
        onExcluir={() => {
          setModalExcluirVisible(true);
          fecharModalOpcoes();
        }}
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
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default Cartoes;
