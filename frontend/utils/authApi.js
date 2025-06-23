import axios from 'axios';
import { setAuthToken } from '../utils/auth';

export async function login(username, password) {
  const res = await axios.post('/api/users/login', { username, password });
  if (res.data.token) setAuthToken(res.data.token);
  return res.data;
}

export function logout() {
  setAuthToken(null);
}
