import { ScrollView } from 'native-base';
import { Colors } from '../constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Item from './Item';
import { Ionicons } from '@expo/vector-icons';
import { Modal} from "react-native";
import NewItem from './NewItem';

const lineStyle: ViewStyle = {
    height: 2,
    width: '100%',
    backgroundColor: '#1F1300',
    marginVertical:1,
    alignSelf: "center",
    opacity: 0.4,
    
};

export default function TabelaItens(props: any) {

    const [newi, setNewi] = React.useState(false);

        return (
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Item</Text>
                    <Text style={styles.tableHeaderText}>Qtd.</Text>
                    <Text style={styles.tableHeaderText}>Valor</Text>
                    <Ionicons name="trash" size={22} color="transparent" style={{marginHorizontal: 5}}/>
                    <Ionicons name="add" size={25} color={Colors.light.icon} style={{marginHorizontal: 10, backgroundColor: 'white', borderRadius: 10}} onPress={() => setNewi(!newi)} />
                </View>

                <View style={lineStyle}></View>
                
                <ScrollView style={{maxHeight: 180}} showsVerticalScrollIndicator={false}>
                {props.itens.map((item: any, index: number) => (
                    
                    <Item key={index} item={item} />
                ))}
                </ScrollView>

                <View style={lineStyle}></View>

                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Participantes:</Text>
                </View>

                <View style={lineStyle}></View>

                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Valor Total:</Text>
                </View>

                <Modal
                    transparent={true}
                    visible={newi}
                    onRequestClose={() => {
                        setNewi(!newi);
                    }}
                    >
                        <View style={{zIndex: -1, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: 'center', justifyContent: "center"}}>

                            <NewItem id_comanda={props.id_comanda} setNewi={setNewi} />

                        </View>

                    </Modal>

            </View>
        );
    }

    const styles = StyleSheet.create({
        tableContainer: {
            flex: 1,
            marginHorizontal: 5,
        },
        tableHeader: {
            width: '100%',
            flexDirection: 'row',
            alignContent: 'center',

        },
        tableHeaderText: {
            fontSize: 16,
            textAlign: 'left',
            fontFamily: 'MuseoModernoRegular',
            flex: 1,
        },
    });