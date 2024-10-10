import { Colors } from "@/constants/Colors";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as config from "@/config";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { saveSession } from "@/components/User"


export default function Cadastro() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const [error, setError] = useState('');

  const validateAndNavigate = () => {
    if (username.trim() === '') {
      setError('O campo nome não pode estar vazio.');
    } else if (email.trim() === '') {
        setError('O campo email não pode estar vazio.');
    } else if (password.trim() === '') {
        setError('O campo senha não pode estar vazio.');
    } else {
      setError('');

      //saveSession(token, username, email);
      config.currentUser.name = username;
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
      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', fontSize: 20, alignSelf: "flex-start",}}>Cadastro</Text>
      <View style={{height: 1, width: '45%', backgroundColor: Colors.light.contrast_backgroud, alignSelf: "flex-start"}}></View>

      {error ? <Text style={{color: 'red', marginTop: 3}}>{error}</Text> : null}

      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 15, fontSize: 15, alignSelf: "flex-start",}}>Nome de usuário</Text>
      <TextInput
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setUsername(value)}
        value={username}

      />

      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 10, fontSize: 15, alignSelf: "flex-start",}}>E-mail</Text>
      <TextInput
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setEmail(value)}
        value={email}
      />

      <Text style={{ color: Colors.light.text , fontFamily: 'MuseoModernoLight', marginLeft: 10, marginTop: 10, fontSize: 15, alignSelf: "flex-start",}}>Senha</Text>
      <TextInput
        style={{height: '10%', width: '100%', borderRadius: 20, padding: 20, backgroundColor: Colors.light.background}}
        placeholder="Escreva aqui"
        placeholderTextColor={Colors.light.faintText}
        onChangeText={(value) => setPassword(value)}
        value={password}
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