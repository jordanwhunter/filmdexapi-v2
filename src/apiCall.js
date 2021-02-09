const api = '/api/submissions';

const handleResponse = res => {
  if(res.ok) return res.json()
  else res.text().then(text => Promise.reject(text))
};

export const getJSON = event => {
  return Object.fromEntries((new FormData(event.target)).entries())
};

export const readItems = () => {
  return fetch(api).then(handleResponse)
};

export const createItem = item => {
  return fetch(api, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(handleResponse)
};