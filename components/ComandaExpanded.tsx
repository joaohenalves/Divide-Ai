import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import TabelaItens from './TabelaItens';
import axios from 'axios';
import * as config from '@/config';
import { useFetchComandas } from '@/hooks/useFetchComandas';
import { useFetchItens } from '@/hooks/useFetchItens';
import { format, set } from 'date-fns';
import { Modal} from "react-native";
import { StyleSheet } from 'react-native';
import Participante from './Participante';

export default function ComandaExpanded(props: any){

    const comanda = props.comanda;
    const { triggerRefresh } = useFetchComandas();

    const {itens , triggerRefreshItens} = useFetchItens(comanda.id_comanda);

    const dataFormatada = format(new Date(comanda.data_hora), 'dd/MM/yyyy HH:mm');

    const [alter, setAlter] = React.useState(false);
    const [nome, setNome] = React.useState(comanda.nome_dono);
    const [confirmarModal, setconfirmarModal] = React.useState(false);


    const confirma: any = () => {

        finalizar(nome, comanda.id);
        setconfirmarModal(false);
        props.close(false);
    }

    const confirmar_finaliza: any = () => {
        setconfirmarModal(true);
    }

    const finalizar: any = async (user : string, id : any) => {

      try {

        const response = await axios.put('http://' + config.ip + config.port + "/desativarcomanda", {
            id_comanda: id
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

    return(
            <View style={estiloExpanded}> 

                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>

                    <Text style={estiloExtra.titulo}>Comanda {comanda.id_comanda}</Text>
            
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>

                        <Ionicons name={"close"} color={Colors.light.icon} size={30} style={{marginHorizontal: 10, zIndex: 100}} onPress={() => props.close(false)}/>

                        {//<Ionicons name={"create"} color={Colors.light.icon} size={30} style={{marginHorizontal: 10, zIndex: 100}} onPress={() => setAlter(!alter)}/>
                        }

                        <Ionicons name={"trash"} color={Colors.light.icon} size={30} style={{marginHorizontal: 10}} onPress={() => confirmar_finaliza()}/> 
                                    
                    </View>

                </View>
                    
                <Line />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={estiloExtra.campos}>Título:</Text>
                    <Text style={estiloExtra.texto}>{comanda.nome_comanda}</Text>
                </View>
            
                <View style={{ flexDirection: 'row' }}>
                    <Text style={estiloExtra.campos}>Proprietário:</Text>
                    <Text style={estiloExtra.texto}>{comanda.nome_dono}</Text>
                </View>
            
                <View style={{ flexDirection: 'row' }}>
                    <Text style={estiloExtra.campos}>Data de criação: </Text>
                    <Text style={estiloExtra.texto}>{dataFormatada}</Text>
                </View>

                <Line />

                <View style={{width: "100%"}}>
                    
                    <TabelaItens itens={itens} id_comanda={comanda.id_comanda} id_dono={comanda.id_dono} refreshItems={triggerRefreshItens}/>

                </View>

                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Participantes:</Text>

                    <Participante comanda_id={comanda.id_comanda}/>
                </View>
                        
            
                <View style={lineStyle}></View>

                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Valor Total:</Text>
                </View>

                <Modal
                    visible={confirmarModal}
                    transparent={true}
                    
                >
                    <View style={{zIndex: -1, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)", alignItems: 'center', justifyContent: "center"}}>

                        <View style={{padding: 10, width: "70%", backgroundColor: 'white', borderRadius: 20, flexDirection: 'column', alignContent: "center", justifyContent: "center" }}>
                            
                            <Text style={{margin: 10, fontFamily: 'MuseoModernoSemiBold'}}>Tem certeza que deseja finalizar a comanda?</Text>
                            
                            <View style={{flexDirection: 'row', width: "100%"}}>
                                
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                                    <Ionicons name={"checkmark-sharp"} color={Colors.light.icon} size={30} style={{marginHorizontal: 10}} onPress={() => confirma()}/>
                                    <Text style={{margin: 10, fontFamily: 'MuseoModernoSemiBold'}} onPress={() => confirma()}>Sim</Text>
                                </View>

                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                                    <Ionicons name={"close"} color={Colors.light.icon} size={30} style={{marginHorizontal: 10}} onPress={() => setconfirmarModal(!confirmarModal)}/>
                                    <Text style={{fontFamily: 'MuseoModernoSemiBold', margin: 10}} onPress={() => setconfirmarModal(!confirmarModal)}>Cancelar</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
    )

}

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

const estiloExpanded: ViewStyle = {

    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  
    marginVertical: 5,
  
    width: '80%',
    maxHeight: '80%',
    flex: 1,
  
    padding: 15,
  
    borderRadius: 15, 
  
    backgroundColor: Colors.light.background,
    opacity: 1,
    
};

const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    tableHeader: {

        flexDirection: 'column',
        alignContent: 'center',

    },
    tableHeaderText: {
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'MuseoModernoRegular',
        flex: 1,
    },
});