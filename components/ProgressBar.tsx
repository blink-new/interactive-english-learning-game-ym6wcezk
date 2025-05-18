import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  borderRadius?: number;
  showPercentage?: boolean;
  label?: string;
  animated?: boolean;
  duration?: number;
}

export function ProgressBar({
  progress,
  height = 8,
  backgroundColor = '#E5E5EA',
  fillColor = '#2E86DE',
  borderRadius = 4,
  showPercentage = false,
  label,
  animated = true,
  duration = 800,
}: ProgressBarProps) {
  // Clamp progress between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  
  // Animated progress value
  const animatedProgress = useSharedValue(0);
  
  // Update the shared value when progress changes
  React.useEffect(() => {
    if (animated) {
      animatedProgress.value = withTiming(clampedProgress, { duration });
    } else {
      animatedProgress.value = clampedProgress;
    }
  }, [clampedProgress, animated, duration]);
  
  // Animated style for the progress fill
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value * 100}%`,
    };
  });

  return (
    <View style={styles.container}>
      {(label || showPercentage) && (
        <View style={styles.labelContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercentage && (
            <Text style={styles.percentage}>{`${Math.round(clampedProgress * 100)}%`}</Text>
          )}
        </View>
      )}
      
      <View 
        style={[
          styles.progressBackground, 
          { 
            height, 
            backgroundColor, 
            borderRadius 
          }
        ]}
      >
        <Animated.View 
          style={[
            styles.progressFill, 
            { 
              backgroundColor: fillColor,
              borderRadius, 
            },
            animatedStyle
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3C3C43',
  },
  percentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  progressBackground: {
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
});