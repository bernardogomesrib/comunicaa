/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { ScrollView as DefaultView } from 'react-native';

import { useThemeColor } from '../Themed';


type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ViewProps = ThemeProps & DefaultView['props'];


export function ScrollView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return <DefaultView scrollEnabled style={[{ backgroundColor,display:'flex',flexWrap:'wrap',flexDirection:'row',width:"100%" }, style]} {...otherProps} />;
}
