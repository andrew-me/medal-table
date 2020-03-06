import { SavedCountry, CountryContent, CountryMeta } from '../domain';
import * as db from './fakeDatabase';

export type DataOrder = 'alphabetical' | 'medals';

export type DataConfig = {
  order: DataOrder;
}

export type CountryData = {id: string, content: CountryContent, meta: CountryMeta};

export type CountryList = CountryData[];

function translateCountries(countries: CountryList) {
    return countries.map((country) => new SavedCountry(country.id, country.content, country.meta));
}

export const fetchCountries = async (dataConfig: DataConfig) => {
  const result = await db.fetchCountries(dataConfig);
  return translateCountries(result);
}

export const fetchCountry = async (name: string) => {
    const result = await db.fetchCountry(name);
    return translateCountries(result);
  }

export const createCountry = async (content: CountryContent, dataConfig: DataConfig) => {
  const result = await db.createCountry(content, dataConfig);
  return translateCountries(result);
}

export const editCountry = async (id: string, content: CountryContent, dataConfig: DataConfig) => {
  const result = await db.editCountry(id, content, dataConfig);
  return translateCountries(result);
}

export const deleteCountry = async (id: string, dataConfig: DataConfig) => {
  const result = await db.deleteCountry(id, dataConfig);
  return translateCountries(result);
}
