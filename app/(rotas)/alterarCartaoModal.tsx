import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const AlterarCartaoModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [rotulo, setRotulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

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

  const salvarAlteracoes = () => {
    if (!rotulo || !categoria) {
      Alert.alert(
        "Erro",
        "Preencha todos os campos para salvar as alterações."
      );
      return;
    }
    Alert.alert("Sucesso", "Alterações salvas com sucesso!");
    onClose();
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
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                  {categoria || "Selecione"}
                </Text>
              </TouchableOpacity>
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
});

export default AlterarCartaoModal;
