const API_URL = 'https://rickandmortyapi.com/api';

export const fetchEpisodes = ({ page = 1, name = '' }) => {
  return fetch(`${API_URL}/episode?page=${page}&name=${name}`)
    .then(data => data.json());
}

export const fetchEpisode = (id) => {
  return fetch(`${API_URL}/episode/${id}`)
    .then(data => data.json());
}

export const fetchCharacter = (id) => {
  return fetch(`${API_URL}/character/${id}`)
    .then(data => data.json());
}
