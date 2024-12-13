import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const ModalOpcoesCartao = ({
  visible,
  onClose,
  onAdicionarPrancha,
  onEditar,
  onExcluir,
}: {
  visible: boolean;
  onClose: () => void;
  onAdicionarPrancha: () => void;
  onEditar: () => void;
  onExcluir: () => void;
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Opções do Cartão</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={onAdicionarPrancha}
          >
            <Text style={styles.optionText}>Adicionar à Prancha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onEditar}>
            <Text style={styles.optionText}>Editar Cartão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onExcluir}>
            <Text style={styles.optionText}>Excluir Cartão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ModalOpcoesCartao;
