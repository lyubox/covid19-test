import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Grid from './Grid';
import '@testing-library/jest-dom/extend-expect';

describe('Grid', () => {
  const summaryJSON = `
  [
    {
        "Country": "Bulgaria",
        "CountryCode": "BG",
        "Date": "2020-10-19T16:59:22Z",
        "NewConfirmed": 395,
        "NewDeaths": 18,
        "NewRecovered": 31,
        "Premium": {},
        "Slug": "bulgaria",
        "TotalConfirmed": 29503,
        "TotalDeaths": 986,
        "TotalRecovered": 16943
    },
    {
        "Country": "Burkina Faso",
        "CountryCode": "BF",
        "Date": "2020-10-19T16:59:22Z",
        "NewConfirmed": 38,
        "NewDeaths": 0,
        "NewRecovered": 56,
        "Premium": {},
        "Slug": "burkina-faso",
        "TotalConfirmed": 2381,
        "TotalDeaths": 65,
        "TotalRecovered": 1774
    },
    {
        "Country": "Burundi",
        "CountryCode": "BI",
        "Date": "2020-10-19T16:59:22Z",
        "NewConfirmed": 6,
        "NewDeaths": 0,
        "NewRecovered": 0,
        "Premium": {},
        "Slug": "burundi",
        "TotalConfirmed": 542,
        "TotalDeaths": 1,
        "TotalRecovered": 497
    },
    {
        "Country": "Cambodia",
        "CountryCode": "KH",
        "Date": "2020-10-19T16:59:22Z",
        "NewConfirmed": 0,
        "NewDeaths": 0,
        "NewRecovered": 0,
        "Premium": {},
        "Slug": "cambodia",
        "TotalConfirmed": 283,
        "TotalDeaths": 0,
        "TotalRecovered": 280
    }
]`;

  const summary = JSON.parse(summaryJSON);

  const location = {
    search: '/details/bulgaria?q=bul'
  };

  test('Should search in table', () => {
    render(
      <Grid
        summary={summary}
        location={location}
      />
    );

    const search = screen.getByPlaceholderText('Search for country');

    screen.getByText('Bulgaria');

    fireEvent.change(search, { target: { value: 'Cambodia' } });

    expect(screen.queryByText('Bugaria')).not.toBeInTheDocument();
    expect(screen.queryByText('Cambodia')).toBeInTheDocument();
  });
});
