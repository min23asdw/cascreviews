
const host = process.env.BE;

export const registerUser = async (username: string, password: string) => {
  const response = await fetch(`${host}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password ,role: 'customer'}),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return await response.json();
};

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${host}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  return await response.json();
};
