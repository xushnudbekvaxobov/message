const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export function createMessage({ content, expiresInMinutes }) {
  return request(`${API_BASE_URL}/api/messages`, {
    method: 'POST',
    body: JSON.stringify({ content, expiresInMinutes }),
  });
}

export function revealMessageByUrl(url) {
  return request(`${API_BASE_URL}/api/messages/reveal-by-url`, {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
}
