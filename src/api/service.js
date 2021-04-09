import { get, post } from './endpoint'

export const getSummary = () => get('summary');
export const getHistory = country => get(`total/country/${country}`);

export const postHistory = history => post('history', {body: history})
