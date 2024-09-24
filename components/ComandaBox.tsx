import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';
import { Comanda } from './Comanda';
import { ScrollView } from 'native-base';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

const estilo: ViewStyle = {

  flex: 1,
  flexGrow: 1,
  width: '100%',

};

const estiloConteiner: ViewStyle = {
  flex:1,

  flexDirection: "column",

  backgroundColor: 'white',
  position: 'relative',
  bottom: 0,

  maxHeight: '100%',
  width: '100%',

  borderTopEndRadius: 40,
  borderTopStartRadius: 40,
  padding: 40,
  paddingBottom: 0,

};

const contentContainer: ViewStyle = {

  alignItems: 'center',

  width: '100%',

}

export function ComandaBox(props: any) {


  return (
    
      <View style={estiloConteiner}>
        <NativeBaseProvider >
          <ScrollView style={estilo} contentContainerStyle={contentContainer} showsVerticalScrollIndicator={false} > 
            {props.comandas.length === 0 ? (
              
              <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{ color: Colors.light.faintText , fontFamily: 'MuseoModernoRegular' }}>Não há comandas por aqui</Text>
                <View style={{height: 1, width: '170%', backgroundColor: '#F3F3F3', marginTop: 10}}></View>
              </View>

            ) : props.comandas.map((comanda: any) => (
                <Comanda key={comanda.id} comanda={comanda} />
              )
            )
            }
          </ScrollView>
        </NativeBaseProvider>
      </View>
    
  );
}
