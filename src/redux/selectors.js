export const countryState = store => store.country;
export const summaryList = store => store?.country?.list || [];
