import { Colors } from "../constants/Colors";
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFetchPartItem } from "@/hooks/useFetchPartItem";

export default function Item(props: any) {

    const item = props.item;
    const [expanded, setExpanded] = React.useState(false);

    const {participantes, triggerRefreshPartItem} = useFetchPartItem(item.id_item);

    return(

        <View style={styles.fullitem}>
            <View key={props.index} style={styles.tableRow}>
                <Text style={styles.tableRowText}>{item.nome_item}</Text>
                <Text style={styles.tableRowText}>{item.quantidade}</Text>
                <Text style={styles.tableRowText}>{item.preco}</Text>
                <Ionicons name="create-outline" size={22} color={Colors.light.icon} style={{marginHorizontal: 5}} />

                {expanded ? <Ionicons name="chevron-up" size={22} color={Colors.light.icon} style={{marginHorizontal: 5}} onPress={() => setExpanded(!expanded)} />
                : <Ionicons name="chevron-down" size={22} color={Colors.light.icon} style={{marginHorizontal: 5}} onPress={() => setExpanded(!expanded)} />
                }

            </View>

            {expanded &&

                <View>
                    <Line/>                

                    <View style={{justifyContent: "center"}}>

                    {participantes.map((dividendo: any, index: number) => (
                        <View style={styles.personRow} key={dividendo.id_usuario}>
                            <Text style={styles.tableRowText} >{dividendo.id_usuario}</Text>
                            <Text style={styles.tableRowText} >{dividendo.nome_usuario}</Text>
                            <Ionicons name="trash-outline" size={18} color={"black"} style={{marginVertical: 5}} />
                        </View>
                        ))}
                </View>

                </View>
            }
        </View>
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
        alignContent: 'center',
    },
    tableRowText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
        fontFamily: 'MuseoModernoRegular',
    },
    personRow: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '95%',
        alignSelf: 'center',
    }
});

const Line = () => {
    return <View style={lineStyle}></View>;
};

const lineStyle: ViewStyle = {
    height: 1,
    width: '95%',
    backgroundColor: '#1F1300',
    alignSelf: "center",
    opacity: 0.4,
    
};