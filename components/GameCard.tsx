import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { GameController, BookOpen, PenTool, Image as ImageIcon, Layers } from 'lucide-react-native';
import { ProgressBar } from './ProgressBar';

interface GameCardProps {
  title: string;
  description: string;
  type: 'quiz' | 'match' | 'spelling' | 'memory';
  color: string;
  progress?: number;
  totalLevels?: number;
  completedLevels?: number;
  onPress?: () => void;
}

export function GameCard({
  title,
  description,
  type,
  color,
  progress,
  totalLevels,
  completedLevels,
  onPress,
}: GameCardProps) {
  // Choose icon based on game type
  const renderIcon = () => {
    switch (type) {
      case 'quiz':
        return <BookOpen size={24} color="#FFFFFF" />;
      case 'match':
        return <ImageIcon size={24} color="#FFFFFF" />;
      case 'spelling':
        return <PenTool size={24} color="#FFFFFF" />;
      case 'memory':
        return <Layers size={24} color="#FFFFFF" />;
      default:
        return <GameController size={24} color="#FFFFFF" />;
    }
  };

  return (
    <Animated.View entering={FadeIn.duration(400).delay(200)}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: color }]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            {renderIcon()}
            <Text style={styles.title}>{title}</Text>
          </View>
          
          <Text style={styles.description}>{description}</Text>
          
          {(progress !== undefined || (totalLevels && completedLevels !== undefined)) && (
            <View style={styles.progressContainer}>
              {progress !== undefined ? (
                <ProgressBar 
                  progress={progress} 
                  backgroundColor="rgba(255, 255, 255, 0.2)"
                  fillColor="rgba(255, 255, 255, 0.9)"
                  height={6}
                  showPercentage
                />
              ) : (
                <View style={styles.levelsContainer}>
                  <ProgressBar 
                    progress={completedLevels! / totalLevels!}
                    backgroundColor="rgba(255, 255, 255, 0.2)"
                    fillColor="rgba(255, 255, 255, 0.9)"
                    height={6}
                  />
                  <Text style={styles.levelsText}>
                    {completedLevels}/{totalLevels} levels completed
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.playButtonContainer}>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={onPress}
          >
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 4,
  },
  levelsContainer: {
    marginTop: 4,
  },
  levelsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 6,
    textAlign: 'right',
  },
  playButtonContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});