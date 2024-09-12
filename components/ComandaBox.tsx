import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';

const estilo: ViewStyle = {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,

    height: '85%',
    width: '100%',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    padding: 40
};

const comandas = []

export function ComandaBox() {
  return (
    <View style={estilo}> 
        {comandas.length === 0 && (
            
            <View style={{flexDirection:'column', alignItems:'center'}}>
              <Text style={{ color: Colors.light.faintText , fontFamily: 'MuseoModernoRegular' }}>Não há comandas por aqui</Text>
              <View style={{height: 1, width: '170%', backgroundColor: '#F3F3F3', marginTop: 10}}></View>
            </View>
        )}
    </View>
  );
}
