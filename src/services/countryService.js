/**
 * Servicio para proporcionar datos de países, estados y códigos telefónicos
 * Utiliza la biblioteca country-state-city para reemplazar los archivos estáticos
 */

import { Country, State, City } from 'country-state-city';

// Obtenemos todos los países con su información completa
const getAllCountries = () => {
  return Country.getAllCountries().map(country => ({
    name: country.name,
    code: country.isoCode,
    flag: country.flag,
    phoneCode: country.phonecode
  }));
};

// Obtener todos los códigos telefónicos con formato para selector
const getAllCountryCodes = () => {
  return Country.getAllCountries().map(country => ({
    code: `+${country.phonecode}`,
    country: country.name,
    flag: country.isoCode.toLowerCase()
  })).sort((a, b) => a.country.localeCompare(b.country));
};

// Obtener estados/provincias por código de país
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

// Para países sin estados/provincias definidos
const getGenericState = (countryCode) => {
  return {
    name: "Not Applicable",
    code: `${countryCode}-NA`
  };
};

// Obtener URL de la bandera utilizando el código ISO
const getFlagUrl = (isoCode) => {
  return `https://flagcdn.com/32x24/${isoCode.toLowerCase()}.png`;
};

// Valores por defecto
const defaultCountry = "US";
const defaultCountryCode = { code: "+1", country: "United States", flag: "us" };

// Obtener país por código
const getCountryByCode = (code) => {
  const country = Country.getCountryByCode(code);
  return country ? {
    name: country.name,
    code: country.isoCode
  } : null;
};

// Obtener país por nombre
const getCountryByName = (name) => {
  const countries = getAllCountries();
  return countries.find(country => 
    country.name.toLowerCase() === name.toLowerCase()
  );
};

// Obtener código telefónico por código de país
const getPhoneCodeByCountry = (countryCode) => {
  const country = Country.getCountryByCode(countryCode);
  return country ? `+${country.phonecode}` : "";
};

export {
  getAllCountries,
  getAllCountryCodes,
  getStatesByCountry,
  getGenericState,
  getFlagUrl,
  defaultCountry,
  defaultCountryCode,
  getCountryByCode,
  getCountryByName,
  getPhoneCodeByCountry
};
