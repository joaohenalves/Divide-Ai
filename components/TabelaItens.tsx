import { ScrollView } from 'native-base';
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Item from './Item';
import { Ionicons } from '@expo/vector-icons';

const lineStyle: ViewStyle = {
    height: 1,
    width: '100%',
    backgroundColor: '#1F1300',
    marginVertical:1,
    alignSelf: "center",
    opacity: 0.4,
    
};

export default function TabelaItens(props: any) {
        return (
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Item</Text>
                    <Text style={styles.tableHeaderText}>Qtd.</Text>
                    <Text style={styles.tableHeaderText}>Valor</Text>
                    <Ionicons name="trash" size={22} color="transparent" style={{marginHorizontal: 5}}/>
                    <Ionicons name="trash" size={22} color="transparent" style={{marginHorizontal: 5}}/>
                </View>

                <View style={lineStyle}></View>
                
                <ScrollView style={{maxHeight: 150}} showsVerticalScrollIndicator={false}>
                {props.itens.map((item: any, index: number) => (
                    
                    <Item key={index} item={item} />
                ))}
                </ScrollView>
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