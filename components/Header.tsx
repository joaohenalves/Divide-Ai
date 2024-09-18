import { Colors } from '../constants/Colors';
import { View, ViewStyle, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

import { Pressable, Modal} from "react-native";

const estilo: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: 'absolute',
    top: 0,

    height: '15%',
    width: '100%',

    padding: 25,

    backgroundColor: "transparent",
};

const modalEstilo: ViewStyle = {

  flexDirection: "column",
  alignSelf: 'flex-end',
  backgroundColor: 'white',
  margin: 40,
  padding: 10,
  borderRadius: 20,

  shadowColor: Colors.light.contrast_backgroud,
  shadowRadius: 3,
};

export function Header( props : any) {

  const [modalVisible, setModalVisible] = React.useState(true);

  return (
    <View style={estilo}> 

    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={modalEstilo}>
            <Ionicons name="close" size={25} color={"black"} style={{alignSelf:"flex-end"}} onPress={() => {setModalVisible(!modalVisible)}} />
            <Text style={{ color: Colors.light.text, fontSize: 15, fontFamily: 'MuseoModernoRegular' }}>Sobre</Text>
        </View>
      </Modal>

        <Ionicons name="reorder-three" size={40} color={Colors.light.text}/>
        <Text style={{ color: Colors.light.text, fontSize: 24, fontFamily: 'MuseoModernoRegular' }}>Bem Vindo, {props.user}</Text>
        <Ionicons name="information-circle-outline" size={40} color={Colors.light.icon} onPress={() => {setModalVisible(!modalVisible)}} />
    </View>
  );
}
