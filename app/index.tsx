import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ChevronRight, Award, Zap, BookOpen } from 'lucide-react-native';

export default function Home() {
  const router = useRouter();
  const [streak, setStreak] = useState(3);
  const [wordsLearned, setWordsLearned] = useState(12);
  
  const gameOptions = [
    {
      id: 'quiz',
      title: 'Словесная викторина',
      description: 'Проверьте свой словарный запас с помощью увлекательной викторины',
      color: '#FF9500',
      icon: 'BookOpen',
    },
    {
      id: 'match',
      title: 'Сопоставление картинок',
      description: 'Сопоставляйте слова с изображениями',
      color: '#2E86DE',
      icon: 'Image',
    },
    {
      id: 'spelling',
      title: 'Игра в правописание',
      description: 'Практикуйте написание английских слов',
      color: '#5E5CE6',
      icon: 'PenTool',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Доброе утро!</Text>
        <Text style={styles.subtitle}>Давайте изучать английский сегодня</Text>
      </View>

      {/* Stats Section */}
      <Animated.View 
        style={styles.statsCard}
        entering={FadeInDown.duration(400).delay(100)}
      >
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#FF9500' }]}>
            <Zap size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.statValue}>{streak} дней</Text>
            <Text style={styles.statLabel}>Текущая серия</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#2E86DE' }]}>
            <BookOpen size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.statValue}>{wordsLearned}</Text>
            <Text style={styles.statLabel}>Изучено слов</Text>
          </View>
        </View>
      </Animated.View>

      {/* Continue Learning */}
      <Animated.View 
        style={styles.continueCard}
        entering={FadeInDown.duration(400).delay(200)}
      >
        <View style={styles.continueHeader}>
          <Text style={styles.sectionTitle}>Продолжить обучение</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/vocabulary')}
          >
            <Text style={styles.viewAllText}>Смотреть все</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.wordList}>
          <View style={styles.wordItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1512793988933-5dfcbf714a84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' }}
              style={styles.wordImage}
            />
            <Text style={styles.wordText}>Яблоко</Text>
          </View>
          
          <View style={styles.wordItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1573246353886-9228ddb6a786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' }}
              style={styles.wordImage}
            />
            <Text style={styles.wordText}>Машина</Text>
          </View>
          
          <View style={styles.wordItem}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' }}
              style={styles.wordImage}
            />
            <Text style={styles.wordText}>Мяч</Text>
          </View>
        </View>
      </Animated.View>

      {/* Game Options */}
      <Text style={styles.gamesTitle}>Игры</Text>
      
      {gameOptions.map((game, index) => (
        <Animated.View
          key={game.id}
          style={styles.gameCard}
          entering={FadeInDown.duration(400).delay(300 + (index * 100))}
        >
          <TouchableOpacity 
            style={styles.gameButton}
            onPress={() => router.push('/camera')}
          >
            <View style={[styles.gameIconContainer, { backgroundColor: game.color }]}>
              <BookOpen size={24} color="#FFFFFF" />
            </View>
            
            <View style={styles.gameInfo}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameDescription}>{game.description}</Text>
            </View>
            
            <ChevronRight size={20} color="#8E8E93" />
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Daily Challenge */}
      <Animated.View
        style={styles.challengeCard}
        entering={FadeInDown.duration(400).delay(600)}
      >
        <View style={styles.challengeHeader}>
          <Award size={24} color="#FF9500" />
          <Text style={styles.challengeTitle}>Ежедневное задание</Text>
        </View>
        
        <Text style={styles.challengeDescription}>
          Выполните сегодняшнее задание, чтобы продолжить серию!
        </Text>
        
        <TouchableOpacity 
          style={styles.challengeButton}
          onPress={() => router.push('/camera')}
        >
          <Text style={styles.challengeButtonText}>Начать задание</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
  continueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  continueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  viewAllButton: {
    padding: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#2E86DE',
    fontWeight: '500',
  },
  wordList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wordItem: {
    alignItems: 'center',
    width: '30%',
  },
  wordImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  gamesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  gameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  gameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  gameIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginLeft: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 16,
    lineHeight: 20,
  },
  challengeButton: {
    backgroundColor: '#FF9500',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});