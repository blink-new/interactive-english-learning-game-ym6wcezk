import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Search, BookOpen, X } from 'lucide-react-native';

// Пример данных - в реальном приложении это пришло бы из хранилища
const initialVocabulary = [
  {
    id: '1',
    word: 'Apple',
    translation: 'Яблоко',
    imageUrl: 'https://images.unsplash.com/photo-1512793988933-5dfcbf714a84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    category: 'Еда',
    learned: true,
  },
  {
    id: '2',
    word: 'Car',
    translation: 'Машина',
    imageUrl: 'https://images.unsplash.com/photo-1573246353886-9228ddb6a786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Транспорт',
    learned: true,
  },
  {
    id: '3',
    word: 'Ball',
    translation: 'Мяч',
    imageUrl: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Спорт',
    learned: true,
  },
  {
    id: '4',
    word: 'Book',
    translation: 'Книга',
    imageUrl: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Образование',
    learned: false,
  },
  {
    id: '5',
    word: 'House',
    translation: 'Дом',
    imageUrl: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    category: 'Места',
    learned: false,
  },
  {
    id: '6',
    word: 'Cat',
    translation: 'Кошка',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    category: 'Животные',
    learned: false,
  },
  {
    id: '7',
    word: 'Phone',
    translation: 'Телефон',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    category: 'Технологии',
    learned: false,
  },
  {
    id: '8',
    word: 'Water',
    translation: 'Вода',
    imageUrl: 'https://images.unsplash.com/photo-1603059123302-7142ff4e20c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    category: 'Напитки',
    learned: false,
  },
];

// Категории с цветами
const categories = [
  { id: 'all', name: 'Все', color: '#2E86DE' },
  { id: 'Еда', name: 'Еда', color: '#FF9500' },
  { id: 'Транспорт', name: 'Транспорт', color: '#5856D6' },
  { id: 'Спорт', name: 'Спорт', color: '#34C759' },
  { id: 'Животные', name: 'Животные', color: '#FF2D55' },
  { id: 'Места', name: 'Места', color: '#5AC8FA' },
];

export default function VocabularyScreen() {
  const [vocabulary, setVocabulary] = useState(initialVocabulary);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSearch, setShowSearch] = useState(false);

  // Фильтрация словаря на основе поиска и категории
  const filteredVocabulary = vocabulary.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderVocabularyItem = ({ item, index }) => (
    <Animated.View
      style={styles.wordCard}
      entering={FadeInDown.duration(300).delay(index * 50)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.wordImage} />
      <View style={styles.wordInfo}>
        <Text style={styles.wordText}>{item.word}</Text>
        <Text style={styles.translationText}>{item.translation}</Text>
        <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      {item.learned && (
        <View style={styles.learnedBadge}>
          <Text style={styles.learnedText}>Изучено</Text>
        </View>
      )}
    </Animated.View>
  );

  const getCategoryColor = (category: string) => {
    const foundCategory = categories.find(c => c.id === category);
    return foundCategory ? foundCategory.color : '#2E86DE';
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && { backgroundColor: item.color }
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item.id && { color: '#FFFFFF' }
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {showSearch ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск по словарю..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={() => {
                setSearchQuery('');
                setShowSearch(false);
              }}
            >
              <X size={20} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.titleContainer}>
              <BookOpen size={24} color="#2E86DE" />
              <Text style={styles.title}>Мой словарь</Text>
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setShowSearch(true)}
            >
              <Search size={22} color="#2E86DE" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {filteredVocabulary.length > 0 ? (
        <FlatList
          data={filteredVocabulary}
          renderItem={renderVocabularyItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Слова не найдены</Text>
          <Text style={styles.emptyStateText}>
            {searchQuery ? 
              'Попробуйте другой поисковый запрос или категорию' : 
              'Сфотографируйте предметы камерой, чтобы добавить новые слова!'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginLeft: 10,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  clearSearchButton: {
    padding: 8,
    marginLeft: 4,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    marginRight: 10,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  listContent: {
    padding: 16,
  },
  wordCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  wordImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  wordInfo: {
    flex: 1,
  },
  wordText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  translationText: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 6,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  learnedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  learnedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
});