import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  fetchCategorias,
  atualizarCartao,
} from "../../app/(rotas)/apiService.js";
import {
  CartaoEntity,
  CategoriaCartaoEntity,
} from "@/components/entidades/entidades.js";

const AlterarCartaoModal = ({
  visible,
  onClose,
  cartao,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  cartao: CartaoEntity | null;
  onSave: () => void;
}) => {
  const [rotulo, setRotulo] = useState(cartao?.rotulo || "");
  const [categoriaId, setCategoriaId] = useState<number | null>(
    cartao?.categoria?.id || null
  );
  const [imagem, setImagem] = useState<string | null>(
    cartao?.imagemCartao || null
  );
  const [categorias, setCategorias] = useState<CategoriaCartaoEntity[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (cartao) {
      setRotulo(cartao.rotulo || "");
      setCategoriaId(cartao.categoria?.id || null);
      setImagem(cartao.imagemCartao || null);
    }
  }, [cartao]);

  useEffect(() => {
    if (visible) {
      carregarCategorias();
      categorias;
    }
  }, [visible]);

  const carregarCategorias = async () => {
    setLoadingCategorias(true);
    try {
      const categoriasCarregadas = await fetchCategorias();
      setCategorias(categoriasCarregadas);
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

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
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

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const salvarAlteracoes = async () => {
    if (!rotulo || !categoriaId) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos para salvar as alterações."
      );
      return;
    }

    const formData = new FormData();
    formData.append("rotulo", rotulo);
    formData.append("categoriaid", categoriaId.toString());
    if (imagem) {
      const file = { uri: imagem, type: "image/jpeg", name: "cartao.jpg" };
      formData.append("file", file);
    }

    try {
      await atualizarCartao(cartao?.id!, formData);
      Alert.alert("Sucesso", "Cartão atualizado com sucesso!");
      onSave();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error.response || error);
      Alert.alert("Erro", "Não foi possível atualizar o cartão.");
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
          <Text style={styles.title}>Alterar Cartão</Text>

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
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Text style={styles.dropdownText}>
                  {categorias.find((cat) => cat.id === categoriaId)
                    ?.descricao || "Selecione"}
                </Text>
              </TouchableOpacity>
              {showDropdown && (
                <ScrollView
                  style={styles.dropdownScroll}
                  nestedScrollEnabled={true}
                >
                  {categorias.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => {
                        setCategoriaId(cat.id);
                        setShowDropdown(false);
                      }}
                      style={[
                        styles.dropdownItem,
                        categoriaId === cat.id && styles.selectedDropdownItem,
                      ]}
                    >
                      <Text>{cat.descricao}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Lado Direito */}
            <View style={styles.rightContent}>
              <Text style={styles.label}>Imagem do Cartão</Text>
              <View style={styles.imagePreview}>
                {imagem ? (
                  <Text>Imagem selecionada</Text>
                ) : (
                  <Ionicons name="image-outline" size={40} color="#888" />
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
              onPress={salvarAlteracoes}
            >
              <Text style={styles.createButtonText}>Salvar</Text>
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  dropdownText: {
    color: "#888",
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
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconButtonText: {
    marginLeft: 10,
    color: "#000",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  dropdownScroll: {
    maxHeight: 70,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedDropdownItem: {
    backgroundColor: "#f0f0f0",
  },
});

export default AlterarCartaoModal;
