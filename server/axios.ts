import { env } from 'env.mjs';
import axios from 'axios';

const version = 'v1';
const baseURL = `${env.NEXT_PUBLIC_API_URL}/api/${version}`;

export const api = axios.create({
  baseURL,
  timeout: 5000,
});
