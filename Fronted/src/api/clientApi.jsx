const API_URL = import.meta.env.VITE_API_URL || import.meta.env.Local_Host;
async function request(url, options = {}) {
  const token = localStorage.getItem('token');

  const response = await fetch(API_URL + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    body: options.body
      ? JSON.stringify(options.body)
      : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

const api = {
  get: (url) => request(url),

  post: (url, data) =>
    request(url, {
      method: 'POST',
      body: data,
    }),
};

export default api;