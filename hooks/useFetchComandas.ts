import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as config from '@/config';

export const useFetchComandas = () => {
  const [comandas, setComandas] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchComandas = async () => {
        try {
          const response = await axios.get(`http://${config.ip}${config.port}/selecionarcomandas`, {
            params: {
              nome: config.currentUser.name,
            }
          });
          setComandas(response.data);
        } catch (error) {
          console.error('Erro ao buscar as comandas: ', error);
        }
      };

      fetchComandas();

      return () => {
        // Função de limpeza (opcional) pode ser executada aqui quando a tela perder foco
      };
    }, [refresh])
  );

  const triggerRefresh = () => {
    setRefresh(prev => prev + 1);
  };

  return { comandas, triggerRefresh };
};