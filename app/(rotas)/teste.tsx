import { View } from "@/components/Themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, ImageProps, ScrollView, useColorScheme } from "react-native";
const TesteRoute = ({selected,url}:{selected:boolean|undefined,url:string|undefined}) => {
    const colorScheme = useColorScheme();
    const selecionado = selected?false:true;
    const lnk:string = (url!==undefined?url:'../../assets/images/faviconNNN.png')
    console.log(lnk);
    const imagem: ImageProps = require(lnk);
    return (
        <ScrollView style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
            <View style={{ height: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {selecionado && (
                    <View style={{ width: '20%',height:imagem.height, display:'flex',alignItems: 'center',alignContent:'center',justifyContent:'center' }}>
                        <AntDesign name="arrowright" size={24} color={colorScheme === 'dark' ? 'gray' : 'black'}  />
                    </View>
                )}
                <Image source={imagem} style={{ aspectRatio: 1, height: imagem.height, width: (selecionado ? "80%" : "100%") }} />
            </View>

        </ScrollView>
    );
}
export default TesteRoute;