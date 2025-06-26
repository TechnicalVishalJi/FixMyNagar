export const isLoggedIn = async () => {
  // Use this function using useEffect in your code as below:
    // useEffect(() => {
    //     isLoggedIn().then((status) => {
    //       if(Boolean(status)){navigate("/")};
    //     });
    //   }, [navigate])
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include', // Important: includes HTTP-only cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User is logged in:', data.user);
      return data.user;
    } else {
      console.log('User is not logged in or session expired');
      return false;
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
};