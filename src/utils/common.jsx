export const isLoggedIn = async () => {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include', // Important: includes HTTP-only cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      // User not authenticated
      return null;
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    return null;
  }
};