export const countryState = store => store.country;
export const summaryList = store => store?.country?.summary?.Countries || [];
export const summaryGlobal = store => store?.country?.summary?.Global;

export const historyState = store => store?.history;
