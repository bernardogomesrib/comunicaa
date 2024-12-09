import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const CriarCartaoModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [rotulo, setRotulo] = useState("");
  const [categoriaid, setCategoriaid] = useState<number | null>(null);
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<
    { id: number; descricao: string }[]
  >([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Buscar categorias ao abrir o modal
  useEffect(() => {
    if (visible) {
      fetchCategorias();
    }
  }, [visible]);

  const fetchCategorias = async () => {
    setLoadingCategorias(true);
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}categoriacartao`
      );
      setCategorias(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as categorias.");
    } finally {
      setLoadingCategorias(false);
    }
  };

  const selecionarDaBiblioteca = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à galeria para continuar."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const abrirCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para continuar."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const criarCartao = async () => {
    if (!rotulo || !categoriaid || !imagemUri) {
      Alert.alert("Erro", "Preencha todos os campos para criar o cartão.");
      return;
    }

    const formData = new FormData();
    formData.append("rotulo", rotulo);
    formData.append("categoriaid", categoriaid.toString());
    formData.append("file", {
      uri: imagemUri,
      type: "image/jpeg",
      name: "cartao.jpg",
    });

    setLoadingSubmit(true);

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}cartao`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Cartão criado com sucesso:", response.data);
      Alert.alert("Sucesso", "Cartão criado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao criar cartão:", error);
      Alert.alert("Erro", "Não foi possível criar o cartão.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Criar novo cartão</Text>

          <View style={styles.content}>
            {/* Lado Esquerdo */}
            <View style={styles.leftContent}>
              <Text style={styles.label}>Rótulo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o rótulo"
                value={rotulo}
                onChangeText={setRotulo}
              />
              <Text style={styles.label}>Categoria</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <Text style={styles.dropdownText}>
                  {categorias.find((cat) => cat.id === categoriaid)
                    ?.descricao || "Selecione"}
                </Text>
                <Ionicons
                  name={dropdownOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
              {dropdownOpen && (
                <View style={styles.dropdownList}>
                  {loadingCategorias ? (
                    <ActivityIndicator size="small" color="#000" />
                  ) : (
                    categorias.map((categoria) => (
                      <TouchableOpacity
                        key={categoria.id}
                        style={styles.dropdownOption}
                        onPress={() => {
                          setCategoriaid(categoria.id);
                          setDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownText}>
                          {categoria.descricao}
                        </Text>
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              )}
            </View>

            {/* Lado Direito */}
            <View style={styles.rightContent}>
              <Text style={styles.label}>Imagem do Cartão</Text>
              <View style={styles.imagePreview}>
                {imagemUri ? (
                  <Image source={{ uri: imagemUri }} style={styles.image} />
                ) : (
                  <Text>Nenhuma imagem selecionada</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={selecionarDaBiblioteca}
              >
                <Ionicons name="folder-outline" size={20} color="#000" />
                <Text style={styles.iconButtonText}>Sua biblioteca</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={abrirCamera}>
                <Ionicons name="camera-outline" size={20} color="#000" />
                <Text style={styles.iconButtonText}>Câmera</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton}
              onPress={criarCartao}
              disabled={loadingSubmit}
            >
              {loadingSubmit ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.createButtonText}>Criar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContent: {
    width: "45%",
  },
  rightContent: {
    width: "45%",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dropdownText: {
    color: "#000",
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 150,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconButtonText: {
    marginLeft: 5,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#4d88ff",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CriarCartaoModal;
