const API_URL = 'https://rickandmortyapi.com/api';

export const fetchEpisodes = ({ page = 1, name = '' }) => {
  return fetch(`${API_URL}/episode?page=${page}&name=${name}`)
    .then(data => data.json());
}
