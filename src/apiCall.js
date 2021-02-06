const api = '/api/films';

const handleResponse = (res) => {
  if (res.ok) return res.json();
  else res.text().then((text) => Promise.reject(text));
};

export const readFilmTypes = () => {
  return fetch(api).then(handleResponse);
};

