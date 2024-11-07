import { Text, View } from '@/components/Themed';
import { Picker } from '@react-native-picker/picker';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Localization from 'expo-localization';
import { Link } from 'expo-router';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native';

export default function TabOneScreen() {
  const [thingToSay, setThingToSay] = useState('Palavra');
  const colorScheme = useColorScheme();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [vozes, setVozes] = useState<Speech.Voice[] | []>([]);
  const [deviceLanguage, setDeviceLanguage] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  //variável para dizer se está carregando ou não
  const [loading, setLoading] = useState(true);
  const [deviceType, setDeviceType] = useState<string | null>('');
  const changeTheVoice = (itemValue: string) => {
    setSelectedVoice(itemValue);
    if (selectedVoice) {
      console.log("Changing voice to " + itemValue);
      setIsSpeaking(true);
      Speech.speak(thingToSay, {
        voice: itemValue.toString(),
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
    }
  }
  //função para fazer o app falar
  const speak = async () => {
    setIsSpeaking(true);
    Speech.speak(thingToSay, {
      voice: selectedVoice,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  };

  
  //DEFININDO A LINGUAGEM DO DISPOSITIVO assim que inicia a tela
  useEffect(() => {
    setDeviceLanguage(Localization.getLocales()[0].languageTag);
    // definindo o tipo de dispositivo que está usando o app, se é android ou ios
    setDeviceType(Device.osName);
  }, []);

  //PEGANDO AS VOZES DISPONÍVEIS NO DISPOSITIVO DEPOIS DE DEFINIR A VARIAVEL DE LINGUAGEM
  useEffect(() => {
    const getVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      setVozes(voices);
    };
    getVoices();
  }, [deviceLanguage]);

  //SELECIONANDO A VOZ DO DISPOSITIVO DE ACORDO COM A LINGUAGEM DO DISPOSITIVO E DESATIVANDO O LOADING
  //SE NÃO ENCONTRAR NENHUMA VOZ NO IDIOMA DO DISPOSITIVO, A VOZ SELECIONADA SERÁ NULA
  //por padrão a voz selecionada é a primeira voz encontrada no idioma do dispositivo
  useEffect(() => {
    setSelectedVoice(vozes ? vozes.find((voice) => voice.name.toLowerCase().includes(deviceLanguage.toLowerCase()))?.identifier : undefined);
    
    // desativando o loading por ter finalmente carregado as vozes e as outras variáveis necessárias
    setLoading(false);
  }, [vozes]);

  //PARANDO DE FALAR
  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };
  //PAUSANDO A FALA, só funciona em dispositivos IOS pode esquecer pausar com android
  const pauseSpeaking = () => {
    if (deviceType === 'Android'){
      alert('Pausar a fala não é suportado em dispositivos Android');
    }else{
      setIsPaused(true)
      Speech.pause();
    }
  }
  
  const resumeSpeaking = () => {
    if (deviceType === 'Android'){
      alert('Pausar a fala não é suportado em dispositivos Android');
    }else{
      setIsPaused(false)
      Speech.resume();
    }
  }

  return (loading ? (<View style={styles.container}><Text>Carregando....</Text></View>) : (<View style={styles.container}>
      {/* texto da tela inicial */}
      <Text style={styles.title}>Tela inicial</Text>

      {/* Link para uma segunda tela, ele é definido com o nome do arquivo que contém a tela */}
      <Link href="/two"><Text style={{textDecorationLine:'underline'}}>Segunda tela</Text></Link>



      {/* Input para o texto que será falado */}
      <TextInput style={[styles.inputLike, colorScheme === 'dark' ? styles.darkTextInput : styles.lightTextInput]} value={thingToSay} onChangeText={setThingToSay} />
      
      {/* se o app estiver falando, o botão será de parar, se não, será de falar */}
      {isSpeaking ? (
        <Button title="Parar" onPress={stopSpeaking} />
      ) : (
        <Button title="Falar" onPress={speak} />
      )}
      {/* se o app estiver falando, aparecerá um texto dizendo que está falando */}
      {isSpeaking ? <Text>Falando...</Text> : null}

      {/* se o app estiver falando aparecerá um botão para pausar a fala */}

      {isSpeaking && !isPaused ? <Button title='Pausar' onPress={pauseSpeaking}/> : null}
      {/* botão para continuar caso a fala esteja pausada, inútil para android mas existe */}
      {isPaused ? <Button title='Continuar' onPress={resumeSpeaking}/> : null}

      {/* scroolview para mostrar as vozes disponíveis no idioma do dispositivo, se quizer ver TODAS as vozes altere o comentario da linha abaixo para comentar o null
      outra possibilidade é apagar o if e deixar o map sem condição
      o if que está sendo utilizado é uma forma de condição que é definida desta forma:
      (condição ? se verdadeiro : se falso)           */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, width: "100%" }}>
        {/* texto só para não ficar sem nada na tela caso o dispositivo não tenha nenhuma voz disponível */}
        <Text>Vozes disponíveis - no idioma atual do dispositivo:</Text>
        {vozes.map((voz) => (
          (voz.name.toLowerCase().includes(deviceLanguage.toLowerCase()) ? <Text key={voz.identifier}>{voz.identifier} - {voz.name}</Text> : null /* <Text key={voz.identifier}>{voz.identifier} - {voz.name}</Text> */)
        ))}

        <View style={[{ marginTop: 20,justifyContent:'center',alignItems:'center'},colorScheme === 'dark' ? styles.darkTextInput : styles.lightTextInput]}>
          <Text>Selecione uma voz:</Text>
          <View style={[{width:'100%'}]}>
            {/* picker, não vem com o axios ou react de padrão, tem que instalar o pacote @react-native-picker/picker */}
            <Picker
              selectedValue={selectedVoice}
              onValueChange={(itemValue: string) => changeTheVoice(itemValue)}
              style={[colorScheme === 'dark' ? styles.pickerStyleDark : styles.pickerStyleLight]}
            >
              {/* mapeando as vozes disponíveis no idioma do dispositivo compativeis com o idioma do dispositivo */}
              {/* é possível alterar para ver todas as vozes disponíveis no dispositivo, basta retirar o if e deixar o map sem condição */}
              {vozes.map((voz) => (
                (voz.name.toLowerCase().includes(deviceLanguage.toLowerCase()) ? <Picker.Item style={colorScheme === 'dark' ? styles.darkTextInput : styles.lightTextInput} key={voz.identifier} label={voz.name} value={voz.identifier} /> : null)
              ))}
            </Picker>
          </View>
        </View>
      </ScrollView>
    </View>)
  );
}
/* estilização da tela atual */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
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
  darkTextInput: {
    color: DarkTheme.colors.text,
    backgroundColor: DarkTheme.colors.background,
  },
  lightTextInput: {
    color: DefaultTheme.colors.text,
    backgroundColor: DefaultTheme.colors.background,
  },
  inputLike: {
    borderColor: 'white', borderWidth: 1, width: '50%'
  },
  pickerStyleLight:{
    width: '100%',
    borderColor: 'black', borderWidth: 1,
    color: DefaultTheme.colors.text,
    backgroundColor: DefaultTheme.colors.background,
  },
  pickerStyleDark:{
    width: '100%',
    borderColor: 'white', borderWidth: 1,
    color: DarkTheme.colors.text,
    backgroundColor: DarkTheme.colors.background,
  }
});