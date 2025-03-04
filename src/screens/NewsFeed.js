import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchNews } from '../api/newsApi';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const news = await fetchNews();
      setArticles(news);
      await AsyncStorage.setItem('news', JSON.stringify(news));
    } catch (error) {
      const cachedNews = await AsyncStorage.getItem('news');
      if (cachedNews) setArticles(JSON.parse(cachedNews));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  return (
    <View style={[styles.container, colorScheme === 'dark' && styles.darkBackground]}>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, colorScheme === 'dark' && styles.darkCard]}>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            )}
            <Text style={[styles.title, colorScheme === 'dark' && styles.darkText]}>
              {item.title}
            </Text>
            <Text style={[styles.description, colorScheme === 'dark' && styles.darkText]}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadNews} />}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#007AFF" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default NewsFeed;

