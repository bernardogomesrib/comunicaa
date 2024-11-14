import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StyleSheet } from "react-native";

const stylesApp = StyleSheet.create({
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
      borderColor: 'rgb(205,205,205)', borderWidth: 1,
      color: DarkTheme.colors.text,
      backgroundColor: DarkTheme.colors.background,
    }
  });
  

export default stylesApp;
export { stylesApp };
