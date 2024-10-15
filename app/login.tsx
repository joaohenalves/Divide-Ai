import { Colors } from "@/constants/Colors";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import * as config from "@/config";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { saveSession } from "@/components/User"

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.contrast_backgroud,
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'MuseoModernoRegular',
  },
});


export default function Login(props: any) {

  const router = props.router

  const [text, setText] = useState('');
  
  const [error, setError] = useState('');

  const validateAndNavigate = () => {
    if (text.trim() === '') {
      setError('O campo não pode estar vazio.');
    } else {
      setError('');

      //saveSession(token, username, email);
      config.currentUser.name = text;
      router.push({ pathname: '/(main)'});
      
    }
  };

  return (
    <View
      style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      }}
    > 
      <Image source={require('@/assets/images/splash_empty.png')} style={{ width: 200, height: 200, marginBottom: 50 }} />
      
      <View style={{flexDirection:'column', width: "80%"}}>
        <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Ralize seu login:</Text>
      <View style={{height: 1, width: '45%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>
      
      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 15, fontSize: 15, alignSelf: "flex-start",}}>Email</Text>
      <TextInput
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setText(value)}
        value={text}

      />

      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 5, fontSize: 15, alignSelf: "flex-start",}}>Senha</Text>
      <TextInput
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setText(value)}
        value={text}

      />
      <View>
        <CustomButton onPress={
        () => {
        validateAndNavigate();
        }} 
        title={"Continuar"}
        style={styles} 
        />
        </View>

        <Text 
          onPress={() => router.push({ pathname: '/Cadastro'})} 
          style={{ color: Colors.light.text , 
                    fontFamily: 'MuseoModernoLight', 
                    fontSize: 15, 
                    alignSelf: "center",
                    marginVertical: 15,
                    borderBottomColor: Colors.light.contrast_backgroud,
                    borderBottomWidth: 1,
                    }}>Ainda não tenho cadastro
          </Text>
        </View>
      
    </View>
  );
}
