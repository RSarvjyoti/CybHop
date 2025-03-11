import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const fetchPokemon = async (limit = 5) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  return Promise.all(
    response.data.results.map(async (pokemon) => {
      const details = await axios.get(pokemon.url);
      return details.data;
    })
  );
};

export default api;