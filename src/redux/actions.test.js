import { loadSummaryList, loadHistory } from './actions';

describe('loadSummaryList', () => {
  const dispatch = jest.fn();

  const summaryJSON = `
  {
  "Global": {
    "NewConfirmed": 100282,
    "TotalConfirmed": 1162857,
    "NewDeaths": 5658,
    "TotalDeaths": 63263,
    "NewRecovered": 15405,
    "TotalRecovered": 230845
  },
  "Countries": [
    {
      "Country": "ALA Aland Islands",
      "CountryCode": "AX",
      "Slug": "ala-aland-islands",
      "NewConfirmed": 0,
      "TotalConfirmed": 0,
      "NewDeaths": 0,
      "TotalDeaths": 0,
      "NewRecovered": 0,
      "TotalRecovered": 0,
      "Date": "2020-04-05T06:37:00Z"
    },
    {
      "Country": "Afghanistan",
      "CountryCode": "AF",
      "Slug": "afghanistan",
      "NewConfirmed": 18,
      "TotalConfirmed": 299,
      "NewDeaths": 1,
      "TotalDeaths": 7,
      "NewRecovered": 0,
      "TotalRecovered": 10,
      "Date": "2020-04-05T06:37:00Z"
    },
    {
      "Country": "Albania",
      "CountryCode": "AL",
      "Slug": "albania",
      "NewConfirmed": 29,
      "TotalConfirmed": 333,
      "NewDeaths": 3,
      "TotalDeaths": 20,
      "NewRecovered": 10,
      "TotalRecovered": 99,
      "Date": "2020-04-05T06:37:00Z"
    }
  ]
}
  `;

  const summary = JSON.parse(summaryJSON);

  const fetchMock = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(summary)
    })
  );

  global.fetch = fetchMock;

  beforeEach(() => {
    fetchMock.mockClear();
    dispatch.mockClear();
  });

  test('Load summary', done => {
    return loadSummaryList(dispatch)
      .then(() => {
        const [[{ type }], [{ type: secondType, payload }]] = dispatch.mock.calls;
        expect(type).toBe('SUMMARY_LIST_REQUESTED');
        expect(secondType).toBe('SUMMARY_LIST_SUCCESS');
        expect(payload).toEqual(summary);

        const [[url, { method }]] = fetchMock.mock.calls;
        expect(url).toBe('https://api.covid19api.com/summary');
        expect(method).toBe('GET');

        done();
      });
  });

  test('Error on load summary', done => {
    fetchMock.mockReturnValueOnce(Promise.reject(new Error('Yada yada')));

    return loadSummaryList(dispatch)
      .then(() => {
        const [[{ type }], [{ type: secondType, payload }]] = dispatch.mock.calls;
        expect(type).toBe('SUMMARY_LIST_REQUESTED');
        expect(secondType).toBe('SUMMARY_LIST_FAILURE');
        expect(payload).toEqual('There was a problem loading the summary list!');

        const [[url, { method }]] = fetchMock.mock.calls;
        expect(url).toBe('https://api.covid19api.com/summary');
        expect(method).toBe('GET');

        done();
      });
  });

  // ... loadHistory
});
