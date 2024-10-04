import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

const lineStyle: ViewStyle = {
    height: 1,
    width: '100%',
    backgroundColor: '#1F1300',
    margin:10,
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
                </View>
                
                {props.itens.map((item: any, index: number) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableRowText}>{item.nomeCompra}</Text>
                        <Text style={styles.tableRowText}>{item.quantidade}</Text>
                        <Text style={styles.tableRowText}>R$ {item.valorCompra}</Text>
                    </View>
                ))}
            </View>
        );
    }

    const styles = StyleSheet.create({
        tableContainer: {
            flex: 1,
            margin: 5,
        },
        tableHeader: {
            flexDirection: 'row',
            
            borderBottomWidth: 1,
            borderBottomColor: '#1F1300',
            margin: 5,

        },
        tableHeaderText: {
            flex: 1,
            fontWeight: 'bold',
            textAlign: 'left',
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#1F1300',
            padding: 5,
        },
        tableRowText: {
            flex: 1,
            textAlign: 'left',
        },
    });