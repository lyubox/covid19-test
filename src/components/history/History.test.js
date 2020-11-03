import React from 'react';
import { Provider } from 'react-redux';
import History from './History';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('History', () => {
  const fetchFn = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { Country: 'Bulgaria', CountryCode: '', Province: '', City: '', CityCode: '', Lat: '0', Lon: '0', Confirmed: 30527, Deaths: 1008, Recovered: 17153, Active: 12366, Date: '2020-10-19T00:00:00Z' },
        { Country: 'Bulgaria', CountryCode: '', Province: '', City: '', CityCode: '', Lat: '0', Lon: '0', Confirmed: 31863, Deaths: 1019, Recovered: 17414, Active: 13430, Date: '2020-10-20T00:00:00Z' }
      ])
    }));

  global.fetch = fetchFn;

  const history = {
    goBack: jest.fn()
  };

  beforeEach(() => {
    fetchFn.mockClear();
    history.goBack.mockClear();
  });

  test('Lists history data if the server returns responce', async () => {
    render(
      <History slug='bulgaria' history={history} />
    );

    await waitFor(() => {
      // The title
      screen.getByText('Bulgaria');

      // The second row is there
      screen.getByText('2020-10-19');

      expect(fetchFn.mock.calls.length).toBe(1);

      const [[url, { method }]] = fetchFn.mock.calls;
      expect(url).toBe('https://api.covid19api.com/total/country/bulgaria');
      expect(method).toBe('GET');
    });
  });

  test('Close button will get us back', async () => {
    render(
      <History slug='bulgaria' history={history} />
    );

    await waitFor(() => {
      const button = screen.getByText('X');

      fireEvent.click(button);

      expect(history.goBack.mock.calls.length).toBe(1);
    });
  });

  test('Should show error', async () => {
    fetchFn.mockReturnValueOnce(
      Promise.reject(new Error('Yada yada'))
    );

    render(
      <History slug='bulgaria' history={history} />
    );

    await waitFor(() => {
      screen.getByText('There was a problem loading history for bulgaria!');
    });
  });
});
