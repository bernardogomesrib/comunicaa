import * as FileSystem from 'expo-file-system';
import { Button, Image, StyleSheet, } from 'react-native';

import { Text, View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';

export default function ModalScreen() {
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState({});
  const [apagado, setApagado] = useState(false);
  const checkAndLoadImage = async () => {
    const folderUri = `${FileSystem.documentDirectory}comunicaa/`;
    const imageUri = `${folderUri}image.jpg`;
    console.log(imageUri);
    const imageUrl = 'https://3.bp.blogspot.com/-CqBbZDEX2K0/V3oYC4fpIGI/AAAAAAAAB6M/nJ_wsRlVwNM7-2jVYjKN0V-rhrz1h3HDQCLcB/s1920/por-do-sol1.jpg';

    const folderInfo = await FileSystem.getInfoAsync(folderUri);
    if (!folderInfo.exists) {
      console.log("Criando pasta");
      await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
    }

    const imageInfo = await FileSystem.getInfoAsync(imageUri);
    if (!imageInfo.exists) {
      console.log("Baixando imagem");
      await FileSystem.downloadAsync(imageUrl, imageUri);
    }

    await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 }).then((data) => {
      setImg({ uri: `data:image/jpeg;base64,${data}` });
    }).then(() => {
      setLoading(false);
      setApagado(false);
    });

  };
  useEffect(() => {
    checkAndLoadImage();
  }, []);


  return (
    <View style={styles.container}>
      {loading ? (apagado ? <Text style={styles.title}>Imagem foi apagada</Text> : <Text style={styles.title}>Carregando ...</Text>) : (
        <>
          <Text style={styles.title}>outra tela só de exemplo</Text>
          <Image source={img} style={{ width: 200, height: 200 }} />

        </>)
      }
      <Button title="Apagar imagem do dispositivo" onPress={() => {
        FileSystem.deleteAsync(`${FileSystem.documentDirectory}comunicaa/image.jpg`);
        setImg({});
        setLoading(true);
        setApagado(true);
      }} />
      <Button title="Baixar novamente a imagem do dispositivo" onPress={() => { checkAndLoadImage() }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
