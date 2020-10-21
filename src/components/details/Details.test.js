import React from 'react';
import Details from './Details';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Details', () => {
  const detailsData = {
    Country: 'Bulgaria',
    CountryCode: 'BG',
    Date: '2020-10-21T22:22:27Z',
    NewConfirmed: 1336,
    NewDeaths: 11,
    NewRecovered: 261,
    Premium: {},
    Slug: 'bulgaria',
    TotalConfirmed: 31863,
    TotalDeaths: 1019,
    TotalRecovered: 17414
  };

  const history = {
    push: jest.fn()
  };

  beforeEach(() => history.push.mockClear());

  test('Displays detailed data', () => {
    render(
      <Router
        path='/:module/:country'
        children={<Details details={detailsData} history={history} />}
      />
    );

    // Check for some of the fields
    screen.getByText('BG');
    screen.getByText('2020-10-21');
  });

  test('The button works', async () => {
    render(<Details details={detailsData} history={history} />);

    const button = screen.getByText('history');

    fireEvent.click(button);

    expect(history.push.mock.calls.length).toBe(1);

    const [[path]] = history.push.mock.calls;
    expect(path).toBe('/history/bulgaria');
  });
});
