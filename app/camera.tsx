import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Camera, Repeat, Image as ImageIcon, Check, X } from 'lucide-react-native';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [identifiedObject, setIdentifiedObject] = useState<string | null>(null);
  const cameraRef = useRef<ExpoCamera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const data = await cameraRef.current.takePictureAsync();
        setPhoto(data.uri);
        // Имитация распознавания объекта (в реальном приложении это был бы вызов API)
        simulateObjectRecognition();
      } catch (error) {
        console.error('Ошибка при съемке фотографии:', error);
        Alert.alert('Ошибка', 'Не удалось сделать фотографию');
      }
    }
  };

  const simulateObjectRecognition = () => {
    setIsProcessing(true);
    // Имитация задержки вызова API
    setTimeout(() => {
      // Случайный выбор из распространенных объектов для демонстрации
      const objects = ['Яблоко', 'Книга', 'Стул', 'Чашка', 'Телефон', 'Стол', 'Банан', 'Машина', 'Окно', 'Дверь'];
      const randomObject = objects[Math.floor(Math.random() * objects.length)];
      setIdentifiedObject(randomObject);
      setIsProcessing(false);
    }, 2000);
  };

  const flipCamera = () => {
    setCameraType(
      cameraType === CameraType.back ? CameraType.front : CameraType.back
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const resetCamera = () => {
    setPhoto(null);
    setIdentifiedObject(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const saveToVocabulary = () => {
    // Здесь вы бы сохранили слово и изображение в хранилище словаря вашего приложения
    Alert.alert(
      'Слово сохранено!', 
      `"${identifiedObject}" было добавлено в ваш словарь.`,
      [{ text: 'OK', onPress: resetCamera }]
    );
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Запрос разрешения на камеру...</Text></View>;
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Нет доступа к камере</Text>
        <Text style={styles.errorSubtext}>Доступ к камере необходим для съемки объектов для обучения.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!photo ? (
        <>
          <ExpoCamera
            ref={cameraRef}
            style={styles.camera}
            type={cameraType}
          >
            <View style={styles.overlay}>
              <View style={styles.targetFrame} />
            </View>
          </ExpoCamera>
          
          <View style={styles.controls}>
            <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
              <Repeat size={22} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            
            <View style={styles.placeholderButton} />
          </View>
          
          <Animated.View 
            style={styles.instruction}
            entering={SlideInDown.duration(500)}
          >
            <Text style={styles.instructionText}>
              Сфотографируйте предмет, чтобы узнать его название на английском
            </Text>
          </Animated.View>
        </>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          
          {isProcessing ? (
            <View style={styles.processingOverlay}>
              <Text style={styles.processingText}>Определение объекта...</Text>
            </View>
          ) : identifiedObject && (
            <Animated.View 
              style={styles.resultContainer}
              entering={FadeIn.duration(400)}
            >
              <Text style={styles.objectName}>{identifiedObject}</Text>
              <View style={styles.resultButtons}>
                <TouchableOpacity style={styles.rejectButton} onPress={resetCamera}>
                  <X size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={saveToVocabulary}>
                  <Check size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
          
          <TouchableOpacity style={styles.backButton} onPress={resetCamera}>
            <Text style={styles.backButtonText}>Сделать другое фото</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  flipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
  },
  placeholderButton: {
    width: 48,
    height: 48,
  },
  instruction: {
    position: 'absolute',
    bottom: 130,
    left: 24,
    right: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 16,
  },
  instructionText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 120,
    left: 24,
    right: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  objectName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  resultButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  rejectButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  acceptButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 100,
  },
  errorSubtext: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    marginHorizontal: 40,
  },
});