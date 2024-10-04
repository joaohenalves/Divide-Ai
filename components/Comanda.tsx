import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';
import { format } from 'date-fns';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import TabelaItens from './TabelaItens';
import axios from 'axios';
import * as config from '@/config';
import { useFetchComandas } from '@/hooks/useFetchComandas';

const estilo: ViewStyle = {

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

    marginVertical: 5,

    width: '100%',
    flex: 1,

    padding: 15,

    borderRadius: 15, 

    backgroundColor: Colors.light.background,
    zIndex: -1,
    
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
      margin: 3,
    },

    campos :{  
      color: Colors.light.faintText,
      fontFamily: 'MuseoModernoRegular',
      fontSize: 18,
      margin: 3,
    },

    camposInput: {  
      color: Colors.light.faintText,
      fontFamily: 'MuseoModernoRegular',
      fontSize: 18,
      margin: 3,
    },
}

const lineStyle: ViewStyle = {
    height: 1,
    width: '100%',
    backgroundColor: '#1F1300',
    margin:10,
    alignSelf: "center",
    opacity: 0.4,
    
};


const Line = () => {
    return <View style={lineStyle}></View>;
}

const compras = require("@/compar.json")

const Comanda = (props : any) => {

    const comanda = props.comanda;
    const { triggerRefresh } = useFetchComandas();

    const dataFormatada = format(new Date(comanda.data_hora), 'dd/MM/yyyy HH:mm');

    const [expanded, setExpanded] = React.useState(false);
    const [alter, setAlter] = React.useState(false);
    const [nome, setNome] = React.useState(comanda.nome_dono);

    const finalizar_comanda: any = async (user : string, id : any) => {

      try {

        const response = await axios.put('http://' + config.ip + config.port + "/alterarcomanda", {
          id: id,
          nome: user,
          status: 0 
        });
        comanda.status_comanda = 0;
        console.log('Resposta do servidor:', response.data);
        triggerRefresh();

        //showModalTemporarily('Comanda criada com sucesso!');
      } catch (e) {
        
        //setError(e instanceof Error ? e.message : String(e));
        console.error('Erro ao fazer a requisição:', e);
        //showModalTemporarily('Erro ao criar comanda!');
      }
    };

    if (comanda.status_comanda == 1) {
    return ( 
        <TouchableOpacity style={estilo} activeOpacity={0.85} disabled={true}>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>

                <Text style={estiloExtra.titulo}>Comanda {comanda.id}  {comanda.status_comanda}</Text>
            
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  
                  <Ionicons name={"create"} color={Colors.light.icon} size={30} style={{marginHorizontal: 10, zIndex: 100}} onPress={() => setAlter(!alter)}/>

                  <Ionicons name={"trash"} color={Colors.light.icon} size={30} style={{marginHorizontal: 10}} onPress={() => finalizar_comanda(comanda.nome_dono, comanda.id)}/>   
                  
                </View>

            </View>
            
          <Line />
    
          <View style={{ flexDirection: 'row' }}>
            <Text style={estiloExtra.campos}>Proprietário:</Text>
            {
                !alter ? <Text style={estiloExtra.texto}>{comanda.nome_dono}</Text> :
                <TextInput style={estiloExtra.camposInput} value={nome} onChangeText={(text) => setNome(text)} />

            }
          </View>
    
          <View style={{ flexDirection: 'row' }}>
            <Text style={estiloExtra.campos}>Data de criação: </Text>
            <Text style={estiloExtra.texto}>{dataFormatada}</Text>
          </View>
    
          <Line />
    
          {expanded && (
            
            <View style={{width: "100%"}}>
              <TabelaItens itens={compras} />
              
            </View>
          )}

          {expanded ? <Ionicons name='chevron-up' size={20} color={Colors.light.icon} style={{ alignSelf: 'center' }} onPress={() => setExpanded(!expanded)}/>
          : <Ionicons name='chevron-down' size={20} color={Colors.light.icon} style={{ alignSelf: 'center' }}  onPress={() => setExpanded(!expanded)}/>}

        </TouchableOpacity>
      );}
      else {
        return (
          <View></View>
        )
      }
}

export default Comanda;