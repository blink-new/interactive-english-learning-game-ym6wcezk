import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Volume2 } from 'lucide-react-native';

interface WordCardProps {
  word: string;
  translation?: string;
  imageUrl: string;
  onPress?: () => void;
  onPronounce?: () => void;
  showTranslation?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function WordCard({
  word,
  translation,
  imageUrl,
  onPress,
  onPronounce,
  showTranslation = true,
  size = 'medium',
}: WordCardProps) {
  // Size variations
  const cardStyle = {
    small: {
      card: { width: 120, height: 160 },
      image: { height: 90 },
      wordText: { fontSize: 14 },
      translationText: { fontSize: 12 },
    },
    medium: {
      card: { width: 150, height: 190 },
      image: { height: 110 },
      wordText: { fontSize: 16 },
      translationText: { fontSize: 14 },
    },
    large: {
      card: { width: 180, height: 230 },
      image: { height: 140 },
      wordText: { fontSize: 18 },
      translationText: { fontSize: 16 },
    },
  };

  return (
    <Animated.View entering={FadeIn.duration(400)}>
      <TouchableOpacity
        style={[styles.card, cardStyle[size].card]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, cardStyle[size].image]}
        />
        
        <View style={styles.content}>
          <View style={styles.wordContainer}>
            <Text style={[styles.wordText, cardStyle[size].wordText]}>
              {word}
            </Text>
            
            {onPronounce && (
              <TouchableOpacity 
                style={styles.pronounceButton} 
                onPress={onPronounce}
              >
                <Volume2 size={16} color="#2E86DE" />
              </TouchableOpacity>
            )}
          </View>
          
          {showTranslation && translation && (
            <Text style={[styles.translationText, cardStyle[size].translationText]}>
              {translation}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 8,
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  wordText: {
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  translationText: {
    color: '#8E8E93',
  },
  pronounceButton: {
    padding: 4,
  },
});