import * as Font from 'expo-font';

export default async function useFont() {
    await Font.loadAsync({
      vndi01: require('./assets/fonts/vndi01.ttf'),
      vndi02: require('./assets/fonts/vndi02.ttf'),
      Roboto_Black: require('./assets/fonts/Roboto-Black.ttf'),
      Roboto_BlackItalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
      Roboto_Bold: require('./assets/fonts/Roboto-Bold.ttf'),
      Roboto_BoldItalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
      Pacifico: require('./assets/fonts/Pacifico-Regular.ttf'),
    });

    return true;
}
