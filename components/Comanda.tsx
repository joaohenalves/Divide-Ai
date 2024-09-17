import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';


const estilo: ViewStyle = {

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

    margin: 5,

    width: '100%',
    height: 100,

    padding: 10,

    borderColor: Colors.light.tint,
    borderWidth: 2,
    borderRadius: 15, 
};

const estiloExtra = {
    titulo : {
      color: Colors.light.text,
      fontSize: 24,
      fontFamily: 'MuseoModernoRegular',
    },
    
    texto: { 
      color: Colors.light.text,
      fontFamily: 'MuseoModernoRegular',
      fontSize: 18,
    },

    campos :{  
      color: Colors.light.faintText,
      fontFamily: 'MuseoModernoRegular',
      fontSize: 18,
    }
    
}

export function Comanda(props: any) {

    const comanda = props.comanda;

    return (
        <View style={estilo}> 
            <Text style={estiloExtra.titulo}>Comanda {comanda.id}</Text>

            <View style={{flexDirection: 'row'}}> 
                <Text style={estiloExtra.campos}>Proprietário: </Text> 
                <Text style={estiloExtra.texto}>{comanda.proprietario}</Text>
            </View>

            <View style={{flexDirection: 'row'}}> 
                <Text style={estiloExtra.campos}>Data de criação:</Text>
                <Text style={estiloExtra.texto}>{comanda.dtCriacao}</Text>
            </View>
        </View>
    );
}
