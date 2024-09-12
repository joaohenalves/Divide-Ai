import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text, TextInput } from 'react-native';
import React, { useState } from 'react';

const estilo: ViewStyle = {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,

    height: '70%',
    width: '100%',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    padding: 35
};


export function NovaComandaBox() {

  const [text, setText] = useState('');

  return (
    <View style={estilo}> {/* Caixa Branca */}

            <View style={{flexDirection:'column', width: "100%"}}>
              <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoSemiBold', fontSize: 32, alignSelf: "center", marginBottom: 20 }}>Criar nova comanda</Text>
              <Text style={{ color: Colors.light.faintText , fontFamily: 'MuseoModernoRegular', fontSize: 20 , alignSelf: "flex-end"}}>Proprietário:</Text>
              <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoRegular', fontSize: 28 , alignSelf: "flex-end", marginTop: -10}}>[User]</Text>          
            </View>

            <View style={{height: 1, width: '170%', backgroundColor: '#F3F3F3', margin:10}}></View>

            <View style={{flexDirection:'column', width: "100%"}}>
              <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Título:</Text>
              <View style={{height: 1, width: '13%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>

              <TextInput
                    style={{ height: 40, width: '100%', borderRadius: 20, padding: 15, marginTop: 15, backgroundColor: Colors.light.background}}
                    placeholder="Escreva aqui"
                    onChangeText={(value) => setText(value)}
                    value={text}
               />          
            </View>
    </View>
  );
}
