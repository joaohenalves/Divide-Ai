import { Tabs } from 'expo-router';
import React from 'react';
import * as config from '@/config';
import { Header } from '@/components/Header';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [backgroundColor, setBackgroundColor] = React.useState(Colors[colorScheme ?? 'light'].background);
  const user = config.currentUser.name;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor}} edges={["top", 'left', 'right']} >
      <Tabs
        
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 50
          },
    
        }}>
        <Tabs.Screen
          name="index"
          key={1}
          options={{
          headerShown: true,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} size={35}/>
          ),
          header(props) {
            return <Header user={user} {...props} />;
          },
        }}
        listeners={{
          tabPress: (e) => {
            setBackgroundColor(Colors[colorScheme ?? 'light'].background);
        },
          }}
        />
        <Tabs.Screen
          name="novaComanda"
          key={2}
          options={{
          headerShown: false,
          title: 'Nova Comanda',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'receipt' : 'receipt-outline'} color={color} size={35}/>
          )
        }}
        listeners={{
          tabPress: (e) => {
            setBackgroundColor(Colors.light.contrast_backgroud);
        },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
