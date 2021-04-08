import { get } from './endpoint';

export const getSummary = () => get('summary');
export const getHistory = country => get(`total/country/${country}`);
