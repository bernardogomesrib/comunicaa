import { Text, View } from '@/components/Themed';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { DefaultTheme } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Localization from 'expo-localization';
import { Link } from 'expo-router';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { Button, ScrollView, TextInput, useColorScheme } from 'react-native';
import { stylesApp } from '../styles';
export default function TabOneScreen() {
  const [thingToSay, setThingToSay] = useState('Palavra');
  const colorScheme = useColorScheme();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [vozes, setVozes] = useState<Speech.Voice[] | []>([]);
  const [deviceLanguage, setDeviceLanguage] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  const [velocidade, setVelocidade] = useState(1);
  const [pitch, setPitch] = useState(1);
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
        rate: velocidade,
        pitch:pitch
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
      rate: velocidade,
      pitch:pitch
    });
  };

  
  //DEFININDO A LINGUAGEM DO DISPOSITIVO assim que inicia a tela
  useEffect(() => {
    setDeviceLanguage(Localization.getLocales()[0].languageTag);
    // definindo o tipo de dispositivo que está usando o app, se é android ou ios
    setDeviceType(Device.osName);
  }, []);

  //PEGANDO AS VOZES DISPONÍVEIS NO DISPOSITIVO DEPOIS DE DEFINIR A VARIAVEL DE LINGUAGEM
  //SELECIONANDO A VOZ DO DISPOSITIVO DE ACORDO COM A LINGUAGEM DO DISPOSITIVO E DESATIVANDO O LOADING
  //SE NÃO ENCONTRAR NENHUMA VOZ NO IDIOMA DO DISPOSITIVO, A VOZ SELECIONADA SERÁ NULA
  //por padrão a voz selecionada é a primeira voz encontrada no idioma do dispositivo
  useEffect(() => {
    const getVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync().then((voices) => {
        setVozes(voices)
      }).then(() => {
        const selected = vozes.find((vozes) => vozes.name.toLowerCase().includes(deviceLanguage.toLowerCase()))?.identifier;
        setSelectedVoice(selected);
        setLoading(false);
      }).catch((error) => {alert('Erro ao pegar as vozes disponíveis: ' + error)}); ;
    };
    getVoices();
  }, [deviceLanguage]);


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

  return (loading ? (<View style={stylesApp.container}><Text>Carregando....</Text></View>) : (<View style={stylesApp.container}>
      {/* texto da tela inicial */}
      <Text style={stylesApp.title}>Tela inicial</Text>

      {/* Link para uma segunda tela, ele é definido com o nome do arquivo que contém a tela */}
      <Link href="/two"><Text style={{textDecorationLine:'underline'}}>Segunda tela</Text></Link>
      <Link href="/teste"><Text style={{textDecorationLine:'underline'}}>teladeTestes</Text></Link>

      {/* Slider para definir a velocidade da fala */}
      <Text>Velocidade da fala: {velocidade.toPrecision(2)}</Text>
      <Slider
        minimumValue={0.1}
        maximumValue={2}
        style={[colorScheme === 'dark' ? stylesApp.darkTextInput : stylesApp.lightTextInput, {width: '50%', height: 40}]}
        onValueChange={(value) => setVelocidade(value)}
        value={velocidade}
        step={0.1}
        minimumTrackTintColor={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
        maximumTrackTintColor={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
      />
      <Text>Pitch da fala: {pitch.toPrecision(2)}</Text>
      <Slider
        minimumValue={0.1}
        maximumValue={2}
        style={[colorScheme === 'dark' ? stylesApp.darkTextInput : stylesApp.lightTextInput, {width: '50%', height: 40}]}
        onValueChange={(value) => setPitch(value)}
        value={pitch}
        step={0.1}
        minimumTrackTintColor={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
        maximumTrackTintColor={colorScheme === 'dark' ? '#FFFFFF' : '#000000'}
      />
      {/* Input para o texto que será falado */}
      <TextInput style={[stylesApp.inputLike, colorScheme === 'dark' ? stylesApp.darkTextInput : stylesApp.lightTextInput]} value={thingToSay} onChangeText={setThingToSay} />
      
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

        <View style={[{ marginTop: 20,justifyContent:'center',alignItems:'center'}]}>
          <Text>Selecione uma voz:</Text>
          <View style={[{width:'100%'}]}>
            {/* picker, não vem com o axios ou react de padrão, tem que instalar o pacote @react-native-picker/picker */}
            <Picker
              selectedValue={selectedVoice}
              onValueChange={(itemValue: string) => changeTheVoice(itemValue)}
              style={[colorScheme === 'dark' ? stylesApp.pickerStyleDark : stylesApp.pickerStyleLight,
                {borderColor: colorScheme === 'dark' ? 'white' : 'black', borderWidth: 1,backgroundColor: colorScheme === 'dark' ? 'hsl(43,12%,17%)' : DefaultTheme.colors.background}
              ]}
            >
              {/* mapeando as vozes disponíveis no idioma do dispositivo compativeis com o idioma do dispositivo */}
              {/* é possível alterar para ver todas as vozes disponíveis no dispositivo, basta retirar o if e deixar o map sem condição */}
              {vozes.map((voz) => (
                (voz.name.toLowerCase().includes(deviceLanguage.toLowerCase()) ? <Picker.Item style={[colorScheme === 'dark' ? stylesApp.darkTextInput : stylesApp.lightTextInput,{backgroundColor:colorScheme=== 'dark' ? 'hsl(43,1%,100%)':DefaultTheme.colors.background }]} key={voz.identifier} label={voz.name} value={voz.identifier} /> : null)
              ))}
            </Picker>
          </View>
        </View>
      </ScrollView>
    </View>)
  );
}
/* estilização da tela atual */
