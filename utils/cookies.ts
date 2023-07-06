// Use only on client

export function login(str: string) {
  document.cookie = `player=${str}; path=/; max-age=${60 * 60 * 24 * 30};`;
}

export function logout() {
  document.cookie = `player=; path=/;`;
  window.location.reload();
}
