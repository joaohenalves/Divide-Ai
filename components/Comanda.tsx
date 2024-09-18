import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';


const estilo: ViewStyle = {

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

    margin: 5,

    width: '100%',
    flex: 1,

    padding: 15,

    borderRadius: 15, 

    backgroundColor: Colors.light.background,
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

const lineStyle: ViewStyle = {
    height: 1,
    width: '100%',
    backgroundColor: '#1F1300',
    margin:10,
    alignSelf: "center",
    opacity: 0.4
};

const Line = () => {
    return <View style={lineStyle}></View>;
}

export function Comanda(props: any) {

    const comanda = props.comanda;

    return (
        <View style={estilo}> 
            <Text style={estiloExtra.titulo}>Comanda {comanda.id}</Text>

            <Line/>

            <View style={{flexDirection: 'row'}}> 
                <Text style={estiloExtra.campos}>Proprietário: </Text> 
                <Text style={estiloExtra.texto}>{comanda.proprietario}</Text>
            </View>

            <View style={{flexDirection: 'row'}}> 
                <Text style={estiloExtra.campos}>Data de criação: </Text>
                <Text style={estiloExtra.texto}>{comanda.dtCriacao}</Text>
            </View>

            <Line />
        </View>
    );
}
