import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text, TextInput } from 'react-native';
import * as config from '@/config';
import React, { useState } from 'react';
import { currentUser } from '@/config';
import CustomButton from './CustomButton';
import { StyleSheet } from 'react-native';
import axios from 'axios';

const estiloOuter: ViewStyle = {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,

    height: '70%',
    width: '100%',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    padding: 35,
    paddingBottom: 10,
};

const estiloInner: ViewStyle = {
  flexDirection: "column",
  justifyContent: "flex-start",
  width: '100%',

};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.contrast_backgroud,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'baseline',
    marginTop: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'MuseoModernoRegular',
  },
});

export function NovaComandaBox() {

  const [text, setText] = useState('');

  const [error, setError] = useState('');

  const cadastrar_comanda: any = async () => {
    try {
      const response = await axios.post('http://' + config.ip + config.port + "/cadastrarcomanda", {
        nome: currentUser.name,
      });
  
      console.log('Resposta do servidor:', response.data);
    } catch (e) {
      
      setError(e instanceof Error ? e.message : String(e));
      console.error('Erro ao fazer a requisição:', e);
    }
  };

  return (
      <View style={estiloOuter}> 

        <View style={estiloInner}> 

              <View style={{flexDirection:'column', width: "100%",}}>
                <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoSemiBold', fontSize: 32, alignSelf: "center", marginBottom: 20 }}>Criar nova comanda</Text>
                <Text style={{ color: Colors.light.faintText , fontFamily: 'MuseoModernoRegular', fontSize: 20 , alignSelf: "flex-end"}}>Proprietário:</Text>
                <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoRegular', fontSize: 28 , alignSelf: "flex-end", marginTop: -10}}>{currentUser.name}</Text>          
              </View>

              <View style={{height: 1, width: '100%', backgroundColor: '#F3F3F3', marginVertical: 10}}></View>

              <View style={{flexDirection:'column', width: "100%"}}>
                <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Título:</Text>
                <View style={{height: 1, width: '13%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>

                <TextInput
                      style={{ height: 40, width: '100%', borderRadius: 20, padding: 15, marginTop: 15, backgroundColor: Colors.light.background}}
                      placeholder="Sem título por enquanto"
                      placeholderTextColor={Colors.light.faintText}
                      onChangeText={(value) => setText(value)}
                      value={text}
                />         
              </View>
          </View>    

          <View style={estiloInner}> 

            <View style={{height: 1, width: '100%', backgroundColor: '#F3F3F3'}}></View>
            {error ? <Text style={{color: 'red', marginTop: 3}}>{error}</Text> : null}
            <CustomButton style={styles} onPress={cadastrar_comanda} title="Criar comanda" />

          </View>
      </View>
  );
}
