/**
 * Country service for providing country, state and phone code data
 * Uses country-state-city library instead of static files
 */

import { Country, State } from 'country-state-city';

// Get all countries with complete info
const getAllCountries = () => {
  return Country.getAllCountries().map(country => ({
    name: country.name,
    code: country.isoCode,
    flag: country.flag,
    phoneCode: country.phonecode
  }));
};

// Get all phone codes formatted for selector
const getAllCountryCodes = () => {
  return Country.getAllCountries().map(country => ({
    code: `+${country.phonecode}`,
    country: country.name,
    flag: country.isoCode.toLowerCase()
  })).sort((a, b) => a.country.localeCompare(b.country));
};

// Get states/provinces by country code
const getStatesByCountry = (countryCode) => {
  const states = State.getStatesOfCountry(countryCode);
  
  if (!states || states.length === 0) {
    return [getGenericState(countryCode)];
  }
  
  return states.map(state => ({
    name: state.name,
    code: `${countryCode}-${state.isoCode}`
  }));
};

// For countries without defined states/provinces
const getGenericState = (countryCode) => {
  return {
    name: "Not Applicable",
    code: `${countryCode}-NA`
  };
};

// Get flag URL using ISO code
const getFlagUrl = (isoCode) => {
  return `https://flagcdn.com/32x24/${isoCode.toLowerCase()}.png`;
};

// Default values
const defaultCountry = "US";
const defaultCountryCode = { code: "+1", country: "United States", flag: "us" };

// Get country by code
const getCountryByCode = (code) => {
  const country = Country.getCountryByCode(code);
  if (!country) return null;
  
  return {
    name: country.name,
    code: country.isoCode,
    phoneCode: country.phonecode
  };
};

// Get country by name
const getCountryByName = (name) => {
  const allCountries = Country.getAllCountries();
  const country = allCountries.find(c => c.name.toLowerCase() === name.toLowerCase());
  return country ? getCountryByCode(country.isoCode) : null;
};

// Get phone code by country code
const getPhoneCodeByCountry = (countryCode) => {
  const country = Country.getCountryByCode(countryCode);
  return country ? `+${country.phonecode}` : '';
};

export {
  getAllCountries,
  getAllCountryCodes,
  getStatesByCountry,
  getGenericState,
  getFlagUrl,
  getCountryByCode,
  getCountryByName,
  getPhoneCodeByCountry,
  defaultCountry,
  defaultCountryCode
};
