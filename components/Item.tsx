import { Colors } from "../constants/Colors";
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Item(props: any) {

    const item = props.item;

    return(
        <View key={props.index} style={styles.tableRow}>
            <Text style={styles.tableRowText}>{item.nomeCompra}</Text>
            <Text style={styles.tableRowText}>{item.quantidade}</Text>
            <Text style={styles.tableRowText}>R$ {item.valorCompra}</Text>
            <Ionicons name="create-outline" size={22} color={Colors.light.icon} style={{marginHorizontal: 5}} />
            <Ionicons name="person-outline" size={22} color={Colors.light.icon} style={{marginHorizontal: 5}} />

        </View>
    )
}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 6,
        borderRadius: 10,
        padding: 10,
    },
    tableRowText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 13,
        fontFamily: 'MuseoModernoRegular',
    }
});