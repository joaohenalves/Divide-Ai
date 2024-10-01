import { Colors } from "../../constants/Colors";
import { ComandaBox } from "@/components/ComandaBox";
import React from "react";
import { View} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as config from '@/config';

export default function Index() {
  

  const [comandas, setComandas] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {

      const fetchComandas = async () => {
        try {
          const response = await axios.get(`http://${config.ip}${config.port}/selecionarcomandas`, {
            params: {
              nome: config.currentUser.name,  
            }
          });
          setComandas(response.data);
        } catch (error) {
          console.error("Erro ao buscar as comandas: ", error);
        }
      };

      fetchComandas();

      return () => {
        // Função de limpeza (opcional) pode ser executada aqui quando a tela perder foco
      };
    }, [])
  );

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
        flexDirection: "column"
      }}
    >
     <ComandaBox comandas={comandas}/>
    </View>
  );
}
