export function getItem(key: string) {
  const authCache = localStorage.getItem(key);
  if (authCache) {
    return JSON.parse(authCache);
  }
}

export function setItem(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
