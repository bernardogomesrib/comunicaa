import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { Button } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(rotas)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* nesta parte é onde você define as telas que vão ser usadas no app e se elas irão mostrar o header ou não,
        é possivel configurar o header de cada tela individualmente e adicionar botões e outras coisas como por exemplo
        o titulo, caso não mude, o nome do arquivo será usado */}
        <Stack.Screen name="index"  options={{ headerShown: true, title:'Pagina inicial' }} />
        <Stack.Screen
          name="two"
          options={{
            headerShown: true,
            headerRight: () => (
              <Button
                onPress={() => alert('Button pressed!')}
                title="Info"
                color="#000"
              />
            ),
          }}
        />
        <Stack.Screen name="teste"  options={{ headerShown: true, title:'Tela de testes' }} />
      </Stack>
    </ThemeProvider>
  );
}
