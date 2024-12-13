import axios from "axios";

export const pegarCartoes = async (page) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}cartao?page=${page}&size=10`);
  return response.data.content;
};

export const carregarCartaoPorId = async (id) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}cartao/${id}`);
  return response.data;
};

export const criarCartao = async (rotulo, categoriaid, imagemUri) => {
  if (!rotulo || !categoriaid || !imagemUri) {
    throw new Error("Preencha todos os campos para criar o cartão.");
  }

  const formData = new FormData();
  formData.append("rotulo", rotulo);
  formData.append("categoriaid", categoriaid.toString());
  formData.append("file", {
    uri: imagemUri,
    type: "image/jpeg",
    name: "cartao.jpg",
  });

  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}cartao`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao criar cartão:", error);
    throw error;
  }
};

export const atualizarCartao = async (id, formData) => {
  if (!id) {
    throw new Error("O ID do cartão é obrigatório para a atualização.");
  }
  const response = await axios.put(
    `${process.env.EXPO_PUBLIC_API_URL}cartao/${id}/file`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};



export const excluirCartao = async (id) => {
  try {
    await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}cartao/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir cartão:", error);
    throw error;
  }
};

export const fetchCategorias = async () => {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}categoriacartao`);
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar as categorias:", error);
    throw new Error("Não foi possível carregar as categorias.");
  }
};
