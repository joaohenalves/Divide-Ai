import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const estilo: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: 'absolute',
    top: 0,

    height: '15%',
    width: '100%',

    padding: 25,

    backgroundColor: "transparent",
};

export function Header() {
  return (
    <View style={estilo}> 
        <Ionicons name="reorder-three" size={40} color={Colors.light.text}/>
        <Text style={{ color: Colors.light.text, fontSize: 24, fontFamily: 'MuseoModernoRegular' }}>Bem Vindo, Luiz</Text>
        <Ionicons name="information-circle-outline" size={40} color={Colors.light.icon} />
    </View>
  );
}
