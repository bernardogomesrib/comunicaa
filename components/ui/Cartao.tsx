import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  Alert,
} from "react-native";
import { CartaoEntity } from "../entidades/entidades";
import { Text, useThemeColor } from "../Themed";
import {
  AddTextToSay,
  getThingToSay,
  setThingToSay,
  speak,
} from "../util/ttsClass";
import ModalOpcoesCartao from "../../app/(rotas)/modalOpcoesCartao";
import AdicionarCartaoPranchaModal from "../../app/(rotas)/adicionarCartaoPranchaModal";
import AlterarCartaoModal from "../../app/(rotas)/alterarCartaoModal";
import ExcluirCartaoModal from "../../app/(rotas)/excluirCartaoModal";

export type Props = {
  lightColor?: string;
  darkColor?: string;
  cartao: CartaoEntity;
  setTexto: (string: string) => void;
  type?: "toText" | "onClick";
} & TouchableOpacityProps;

export function Cartao(props: Props) {
  const {
    style,
    lightColor,
    type,
    darkColor,
    setTexto,
    cartao,
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const [modalOpcoesVisible, setModalOpcoesVisible] = useState(false);
  const [modalPranchaVisible, setModalPranchaVisible] = useState(false);
  const [modalAlterarVisible, setModalAlterarVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);

  const pressed = () => {
    if (type === "onClick") {
      setThingToSay(cartao.rotulo);
      speak();
    } else {
      AddTextToSay(cartao.rotulo);
      setTexto(getThingToSay());
    }
    setModalOpcoesVisible(true);
  };

  // Funções de manipulação dos modais
  const abrirModalPrancha = () => {
    setModalOpcoesVisible(false);
    setModalPranchaVisible(true);
  };

  const abrirModalAlterar = () => {
    setModalOpcoesVisible(false);
    setModalAlterarVisible(true);
  };

  const abrirModalExcluir = () => {
    setModalOpcoesVisible(false);
    setModalExcluirVisible(true);
  };

  const fecharModalPrancha = () => setModalPranchaVisible(false);
  const fecharModalAlterar = () => setModalAlterarVisible(false);
  const fecharModalExcluir = () => setModalExcluirVisible(false);

  return (
    <>
      <TouchableOpacity
        onPress={pressed}
        style={[
          {
            backgroundColor,
            borderWidth: 1,
            borderBlockColor: "white",
            width: "100%",
            alignItems: "center",
          },
          style,
        ]}
        {...otherProps}
      >
        <Image source={{ uri: cartao.imagemCartao }} width={150} height={150} />
        <Text style={{ display: "flex", textAlign: "center" }}>
          {cartao.rotulo}
        </Text>
      </TouchableOpacity>

      {/* Modal de Opções */}
      <ModalOpcoesCartao
        visible={modalOpcoesVisible}
        onClose={() => setModalOpcoesVisible(false)}
        onAdicionarPrancha={abrirModalPrancha}
        onEditar={abrirModalAlterar}
        onExcluir={abrirModalExcluir}
      />

      {/* Modais Específicos */}
      <AdicionarCartaoPranchaModal
        visible={modalPranchaVisible}
        onClose={fecharModalPrancha}
      />

      <AlterarCartaoModal
        visible={modalAlterarVisible}
        onClose={fecharModalAlterar}
        cartao={cartao}
        onSave={fecharModalAlterar}
      />

      <ExcluirCartaoModal
        visible={modalExcluirVisible}
        onClose={fecharModalExcluir}
        onExcluir={() =>
          Alert.alert(
            "Sucesso",
            `Cartão '${cartao.rotulo}' excluído com sucesso.`
          )
        }
        nomeCartao={cartao.rotulo}
      />
    </>
  );
}
