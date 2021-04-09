const apiUrl = 'https://api.covid19api.com';

const api = async (path, params = {}) => {
  const url = `${apiUrl}/${path}`;
  const body = await fetch(url, params);
  return await body.json();
};

export const get = (path, params) =>
  api(path, {
    ...params,
    method: 'GET'
  });

export const post = (path, params) => {
  api(path, {
    ...params,
    method: 'POST'
  })
}