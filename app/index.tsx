import { Colors } from "../constants/Colors";
import { Text, View } from "react-native";
import * as Font from 'expo-font';

export default function Index() {

  const [fontsLoaded] = Font.useFonts({
    MuseoModernoRegular: require('../assets/fonts/MuseoModerno-Regular.ttf'),
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
      }}
    >
      <Text style={{ color: Colors.light.text, fontWeight: 'bold', fontFamily: 'MuseoModernoRegular' }}>Hello, World!</Text>
    </View>
  );
}
