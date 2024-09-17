import { Colors } from "@/constants/Colors";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as config from "@/config";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";

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


export default function Index() {

  const router = useRouter();

  const [text, setText] = useState('');
  
  const [error, setError] = useState('');

  const validateAndNavigate = () => {
    if (text.trim() === '') {
      setError('O campo não pode estar vazio.');
    } else {
      setError('');

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
      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Insira seu nome:</Text>
      <View style={{height: 1, width: '45%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>

      {error ? <Text style={{color: 'red', marginTop: 3}}>{error}</Text> : null}

      <TextInput
        style={{height: '20%', width: '100%', borderRadius: 20, padding: 20, marginTop: 15, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setText(value)}
        value={text}
      />

      <CustomButton onPress={
      () => {
      validateAndNavigate();
      }} 
      title={"Continuar"}
      style={styles} 
      />
      </View>
      
    </View>
  );
}
