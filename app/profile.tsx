import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  
  useEffect(() => {
    // Перенаправление на главную страницу
    router.replace('/');
  }, [router]);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Перенаправление...</Text>
    </View>
  );
}