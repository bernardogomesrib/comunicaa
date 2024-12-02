import { Text, View } from '@/components/Themed';
import { Input } from '@/components/ui/Input';
import { ScrollView } from '@/components/ui/ScroolView';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-native';

export default function TabOneScreen() {
  const [secureText, setSecureText] = useState(true);
  const [cards,setCards] = useState<any[]>()
  const [url,setUrl] = useState("")
  const [page,setPage] = useState(0)
  const pegaMaisCards = async()=>{
    
    axios.get(process.env.EXPO_PUBLIC_API_URL + `cartao?page=${page+1}&size=10`).then(
      (res) => {
        setPage(page+1);
        setCards((prevCards = []) => [...prevCards, ...res.data.content]);
      }).catch((error)=>{
        console.log(error.message)
      })
  }
  const pegarCards = async ()=>{
    axios.get(process.env.EXPO_PUBLIC_API_URL + "cartao?page=0&size=10").then(
      (res) => {
        setCards(res.data.content);
      }).catch((error)=>{
        console.log(error.message)
      })
  }
  useEffect(() => {
    pegarCards();
  }, []);
  return (
    <View>
      <Input
        rightIcon='accessibility'
        leftIcon='add'
        //secureTextEntry
        value={url}
        width={"100%"}
      />
     
      <ScrollView onMomentumScrollEnd={pegaMaisCards} >

      {cards && cards.map((card) =>
               (
                <View key={card.id} style={{width:"50%"}}>
                  <Text>{card.rotulo}</Text>
                  <Image source={{ uri: card.imagemCartao }} style={{ width: 100, height: 100 }} />
                  {/* <Text>{card.imagemCartao}</Text> */}
                  <Text>{card.categoria.descricao}</Text>
                  <Button title='definir no input' onPress={() => { setUrl(card.imagemCartao) }} />
                </View>
              )
            )}
      </ScrollView>
    </View>
  );
}

