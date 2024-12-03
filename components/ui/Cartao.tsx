
import { Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { CartaoEntity } from "../entidades/entidades";
import { Text, useThemeColor } from "../Themed";
import { AddTextToSay, getThingToSay, setThingToSay, speak } from '../util/ttsClass';

type LocalProps = {
    lightColor?: string;
    darkColor?: string;
    cartao: CartaoEntity;
    setTexto:(string:string)=>void
    type?:'toText'|'onClick'
    /*  width: DimensionValue | null | undefined
     height: DimensionValue | null | undefined */
};

export type Props = LocalProps & TouchableOpacityProps;


export function Cartao(props: Props) {
    const { style, lightColor,type, darkColor,setTexto, cartao, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const pressed = () => {
        if(type==="onClick"){
            setThingToSay(cartao.rotulo);
            speak();
        }else{
            AddTextToSay(cartao.rotulo);
            setTexto(getThingToSay());
        }

    }
    return <TouchableOpacity onPress={pressed} style={[{ backgroundColor, borderWidth: 1, borderBlockColor: 'white', width: "100%", alignItems: 'center' }, style]} {...otherProps}>
        <Image source={{ uri: cartao.imagemCartao }} width={150} height={150} />
        <Text style={{ display: 'flex', textAlign: "center" }}>{cartao.rotulo}</Text>
    </TouchableOpacity>;
}