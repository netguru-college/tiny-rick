import { API_URL } from '@/constants';

const trimEmptyKeys = (obj) => Object.keys(obj)
  .reduce((acc, key) => obj[key]
    ? ({ ...acc, [key]: obj[key] })
    : acc
  , {});

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

export const fetchComments = (episodeId) => {
  return fetch(`${API_URL}/episode/${episodeId}/comments`)
    .then(data => data.json())
    .then(data => {
      if (data.error) throw(data.error);
      return data;
    });
}

export const postComment = (episodeId, comment) => {
  return fetch(`${API_URL}/episode/${episodeId}/comments`, {
    method: 'POST',
    body: JSON.stringify(trimEmptyKeys(comment)),
    headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(data => data.json());
}

export const fetchQuestions = () => {
  return fetch(`${API_URL}/questions`)
    .then(data => data.json());
};

export const postQuizAnswers = (answers) => {
  return fetch(`${API_URL}/quiz`, {
    method: 'POST',
    body: JSON.stringify(answers),
    headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(data => data.json());
};
