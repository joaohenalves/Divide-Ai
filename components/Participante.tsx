import { Colors } from "../constants/Colors";
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "native-base";
import { useFetchPartComanda } from '@/hooks/useFetchPartComanda';

export default function Participante(props: any) {

    const {participantesComanda, triggerRefreshPartComanda} = useFetchPartComanda(parseInt(props.comanda_id));
    const participantes = participantesComanda;

    return(

        <ScrollView style={{maxHeight: 120}} showsVerticalScrollIndicator={false}>
                        
            {participantes.map((participante: any, index: any) => (
                <View key={participante.id_usuario} style={styles.tableRow}>

                    <Text style={styles.tableRowText}>{participante.id_usuario}</Text>
                    <Text style={styles.tableRowText}>{participante.nome_usuario}</Text>

                </View>
                ))
            }
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    fullitem: {
        flexDirection: 'column',
        backgroundColor: 'white',
        marginVertical: 6,
        borderRadius: 10,
    },

    tableRow: {

        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        paddingVertical: 5,
        margin: 5,
        alignContent: 'center',
        justifyContent: 'space-between',

    },
    tableRowText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
        fontFamily: 'MuseoModernoRegular',
    }
});

