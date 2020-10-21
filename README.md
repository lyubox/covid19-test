# Covid19 Stats App #

Our goal is to have a simple web app which offers information about Covid19 statistics per country.

API: https://covid19api.com/

Initial screen should consist of a single button, when clicked, an excerpt of the most recent data for at least 10 countries must be populated as a list.
The user should be able to click on a specific country and get detailed information about that country's current stats on the right side of the page.
Bellow the detailed view, there should be a button, which offers a modal view and historical data for that country.

User should be able to sort already populated list by the number of infected people.

The detail and modal views must be accessible by their own unique urls.

UX, styling and attention to detail is up to you.

**Bonus**:
In DEV Mode Only - Making sure the browser will not make any OPTIONS requests in the Network tab when communicating with the API if no `Access-Control-Allow-Origin` headers received by the Back-End.

### What can be used:

* ReactJS
* Redux
* Webpack
* Any other library considered necessary

### What cannot be used
* Any UI libraries (ex. Material-UI)

---

Please upload your complete source code to a GitHub repo.

### How we will test your code:

1. `git clone`
2. `yarn && yarn run start`
