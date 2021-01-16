export default async function getPlayerStats({ platform, gamertag }) {
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({ platform, gamertag });
  const options = { method: 'POST', headers, body };

  const response = await fetch('/api', options);
  const data = await response.json();

  if (response.ok) return data;
  return Promise.reject(data);
}
