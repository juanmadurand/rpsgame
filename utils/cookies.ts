export function login(str: string) {
  document.cookie = `displayName=${str}; path=/; max-age=${60 * 60 * 24 * 30};`;
}

export function logout() {
  document.cookie = `displayName=; path=/;`;
  window.location.reload();
}
