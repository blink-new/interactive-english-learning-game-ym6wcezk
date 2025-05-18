import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Home, Camera as CameraIcon, Book } from 'lucide-react-native';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#2E86DE',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { 
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
        }
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Главная',
            tabBarIcon: ({ color }) => <Home size={22} color={color} />,
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Камера',
            tabBarIcon: ({ color }) => <CameraIcon size={22} color={color} />,
          }}
        />
        <Tabs.Screen
          name="vocabulary"
          options={{
            title: 'Словарь',
            tabBarIcon: ({ color }) => <Book size={22} color={color} />,
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}