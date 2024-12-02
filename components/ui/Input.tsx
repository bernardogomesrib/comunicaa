import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { DimensionValue, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { View } from '../Themed';
import { useColorScheme } from '../useColorScheme';

type ThemeProps = {
    width?: DimensionValue | null,
    height?: DimensionValue | null,
    rightIcon?: ComponentProps<typeof Ionicons>['name'],
    leftIcon?: ComponentProps<typeof Ionicons>['name']
};

export type TextProps = ThemeProps & TextInput['props'];

export function Input(props: TextProps) {
    const { style, width, height, rightIcon, leftIcon, secureTextEntry, ...otherProps } = props;
    const color = useColorScheme();

    const localStyle = StyleSheet.create({
        view: {
            display: 'flex',
            flexDirection: 'row',
            borderColor: color === "dark" ? 'white' : 'black',
            borderWidth: 1,
            width: width ? width : "50%",
            alignItems:'center',
            height: height ? height : 40, // Defina uma altura padrão ou use a altura passada como prop
            overflow: 'scroll', // Garante que o conteúdo não ultrapasse a altura do View
        },
        input: {
            flex: 1,
            color: color === "dark" ? 'white' : 'black',
            height: '100%', // Garante que o TextInput ocupe toda a altura do View
        }
    });
    const [secureText, setSecureText] = React.useState(secureTextEntry ? true : false);
    return (

        <View style={localStyle.view}>
            {rightIcon ? <Ionicons name={rightIcon} size={30} color={color === 'light' ? "black" : 'white'} /> : null}
            <TextInput style={[localStyle.input, style]} secureTextEntry={secureText} {...otherProps} />
            {leftIcon ? <Ionicons name={leftIcon} size={30} color={color === 'light' ? "black" : 'white'} /> : null}
            {secureTextEntry ? <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Ionicons name={secureText ? 'eye' : 'eye-off'} size={30} color="white" />
            </TouchableOpacity> : null}
        </View>
    );
}