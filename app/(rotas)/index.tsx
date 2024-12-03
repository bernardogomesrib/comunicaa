import { CartaoEntity } from '@/components/entidades/entidades';
import { View } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import { Cartao } from '@/components/ui/Cartao';
import { Input } from '@/components/ui/Input';
import { ScrollView } from '@/components/ui/ScroolView';
import { setThingToSay, speak } from '@/components/util/ttsClass';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export default function TabOneScreen() {
  const [secureText, setSecureText] = useState(true);
  const [cards, setCards] = useState<CartaoEntity[]>([]);
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(0);
  const [text, setText] = useState("")
  const pegaMaisCards = async () => {
    axios.get(process.env.EXPO_PUBLIC_API_URL + `cartao?page=${page + 1}&size=10`).then(
      (res) => {
        setPage(page + 1);
        setCards((prevCards = []) => [...prevCards, ...res.data.content]);
      }).catch((error) => {
        console.log(error.message);
      });
  };

  const pegarCards = async () => {
    axios.get(process.env.EXPO_PUBLIC_API_URL + "cartao?page=0&size=10").then(
      (res) => {
        setCards(res.data.content);
      }).catch((error) => {
        console.log(error.message);
      });
  };
  
  useEffect(() => {
    pegarCards();
  }, []);

  return (
    <View>
      <View style={{display:"flex",flexDirection:'row',width:"100%", alignItems: 'center'}}>
      <Input
        //rightIcon='accessibility'
        //leftIcon='add'
        value={text}
        width={"80%"}
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {setThingToSay(e.nativeEvent.text); setText(e.nativeEvent.text)}}
      />
      <Button title="Click" style={{width:"20%",flexDirection:'row'}} onPress={speak}/>
      </View>
      
      <ScrollView onMomentumScrollEnd={pegaMaisCards} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {cards && cards.map((card, key) => (
            <View key={key} style={{ width: '45%', marginBottom: 10 }}>
              <Cartao type="onClick" cartao={card} setTexto={setText} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
