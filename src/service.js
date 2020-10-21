import { get } from './api/endpoint';

export const getSummary = () => get('summary');
export const getHistory = country => get(`total/country/${country}`);
