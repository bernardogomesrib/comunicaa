import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Para ícones
import * as ScreenOrientation from "expo-screen-orientation";
import Slider from "@react-native-community/slider";
import { Link } from "expo-router";

export default function Configuracoes() {
  const [selectedOption, setSelectedOption] = useState<
    "Discurso" | "Aparência" | "Exibição" | "Idioma" | null
  >(null);
  const [voiceVolume, setVoiceVolume] = useState(50);
  const [voiceSpeed, setVoiceSpeed] = useState(50);
  const [voicePitch, setVoicePitch] = useState(50);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [cardSize, setCardSize] = useState(150);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const renderConfigContent = () => {
    switch (selectedOption) {
      case "Discurso":
        return (
          <ScrollView style={styles.contentScroll}>
            <Text style={styles.configLabel}>
              Português (Brasil) - Fulano (Masculino)
            </Text>
            <TouchableOpacity style={styles.changeVoice}>
              <Text style={styles.changeVoiceText}>Mudar voz</Text>
            </TouchableOpacity>
            <View style={styles.sliderContainer}>
              <Text>Volume:</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={voiceVolume}
                onValueChange={setVoiceVolume}
              />
            </View>
            <View style={styles.sliderContainer}>
              <Text>Velocidade da Fala:</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={voiceSpeed}
                onValueChange={setVoiceSpeed}
              />
            </View>
            <View style={styles.sliderContainer}>
              <Text>Calibre de Fala:</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={voicePitch}
                onValueChange={setVoicePitch}
              />
            </View>
          </ScrollView>
        );
      case "Aparência":
        return (
          <ScrollView style={styles.contentScroll}>
            <View style={styles.switchContainer}>
              <Text>Modo Escuro:</Text>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
            <View style={styles.sliderContainer}>
              <Text>Tamanho da Fonte:</Text>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={24}
                value={fontSize}
                onValueChange={setFontSize}
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.dropdown}>Modelo da Fonte: Poppins</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      case "Exibição":
        return (
          <ScrollView style={styles.contentScroll}>
            <TouchableOpacity>
              <Text style={styles.dropdown}>Quantidade de Colunas: 6</Text>
            </TouchableOpacity>
            <View style={styles.sliderContainer}>
              <Text>Tamanho dos Cartões:</Text>
              <Slider
                style={styles.slider}
                minimumValue={100}
                maximumValue={200}
                value={cardSize}
                onValueChange={setCardSize}
              />
            </View>
          </ScrollView>
        );
      case "Idioma":
        return (
          <ScrollView style={styles.contentScroll}>
            {[
              "Português",
              "Inglês",
              "Espanhol",
              "Francês",
              "Alemão",
              "Italiano",
            ].map((lang) => (
              <TouchableOpacity key={lang}>
                <Text style={styles.dropdown}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      default:
        return (
          <View style={styles.emptyContent}>
            <Text>Selecione uma configuração para visualizar</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
        <TouchableOpacity>
          <Link href="/pranchaDentro">
            <Ionicons name="arrow-back" size={30} color="#333" />
          </Link>
        </TouchableOpacity>
      </View>

      {/* Conteúdo em Linhas */}
      <View style={styles.row}>
        {/* Coluna da Esquerda */}
        <ScrollView style={styles.leftColumn}>
          {["Discurso", "Aparência", "Exibição", "Idioma"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() =>
                setSelectedOption(
                  option as "Discurso" | "Aparência" | "Exibição" | "Idioma"
                )
              }
            >
              <Text
                style={[
                  styles.configOption,
                  selectedOption === option && styles.selectedConfigOption,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Coluna da Direita */}
        <View style={styles.rightColumn}>{renderConfigContent()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  leftColumn: {
    width: "30%",
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  rightColumn: {
    width: "70%",
    padding: 10,
  },
  configOption: {
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    color: "#555",
  },
  selectedConfigOption: {
    backgroundColor: "#e0e0e0",
    fontWeight: "bold",
    color: "#000",
  },
  contentScroll: {
    flex: 1,
  },
  dropdown: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
  },
  changeVoice: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  changeVoiceText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  sliderContainer: {
    marginVertical: 10,
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
