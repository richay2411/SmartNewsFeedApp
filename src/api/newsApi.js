import axios from 'axios';

const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=us';

export const fetchNews = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}&apiKey=${API_KEY}&page=${page}`);
    return response.data.articles;
  } catch (error) {
    throw new Error('Failed to fetch news');
  }
};
