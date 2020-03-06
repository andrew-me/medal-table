import { v4 } from 'node-uuid';
import findIndex from 'lodash/findIndex';
import { CountryList, CountryData, DataConfig } from './index';
import { CountryContent } from '../domain';


// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase: { countries: CountryList} = {
  countries: [{
    id: v4(),
    content: {
        name: 'United Kingdom',
        medals: 3
    },
    meta: {
        created: new Date(2019, 5, 1),
        updated: new Date(2019, 5, 1)
    }
  }, {
    id: v4(),
    content: {
        name: 'Poland',
        medals: 5,
    },
    meta: {
        created: new Date(2019, 5, 3),
        updated: new Date(2019, 5, 3)
    }
  }, {
    id: v4(),
    content: {
        name: 'Greece',
        medals: 0,
    },
    meta: {
        created: new Date(2019, 5, 2),
        updated: new Date(2019, 5, 2)
    }
  }],
};

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

function orderCountries(dataConfig: DataConfig) {
  function orderAlpha(a: CountryData, b: CountryData) {
    const countryA = a.content.name.toUpperCase();
    const countryB = b.content.name.toUpperCase();

    if (countryA < countryB) {
      return -1;
    }
    if (countryA > countryB) {
      return 1;
    }
  
    // titles must be equal
    return 0;
  }

  function orderMedals(a: CountryData, b: CountryData) {
    return b.content.medals - a.content.medals;
  }

  return fakeDatabase.countries.sort(dataConfig.order === 'alphabetical' ? orderAlpha : orderMedals);
}

function processCountries(dataConfig: DataConfig) {
  return orderCountries(dataConfig);
}

export const fetchCountries = (dataConfig: DataConfig) =>
  delay(500).then(() => {
    return processCountries(dataConfig);
    }
  );

export const fetchCountry = (name: string) =>
  delay(500).then(() => {
    return fakeDatabase.countries.filter((country) => country.content.name === name);
    }
  );

export const createCountry = (content: CountryContent, dataConfig: DataConfig) =>
  delay(500).then(() => {
    const country = {
      id: v4(),
      content,
      meta: {
        created: new Date(),
        updated: new Date()
    }
    };
    fakeDatabase.countries.push(country);
    return processCountries(dataConfig);
  });

  export const editCountry = (id: string, content: CountryContent, dataConfig: DataConfig) =>
    delay(500).then(() => {
        const index = findIndex(fakeDatabase.countries, (country) => country.id === id)

        if (index === -1) {
            throw Error('Missing Country');
        }

        const initialCountry = fakeDatabase.countries[index];
        const country = {
            ...initialCountry,
            content,
            meta: {
            created: initialCountry.meta.created,
            updated: new Date()
        }
        };
        fakeDatabase.countries[index] = country;
        return processCountries(dataConfig);
  });

  export const deleteCountry = (id: string, dataConfig: DataConfig) =>
    delay(500).then(() => {
        const index = findIndex(fakeDatabase.countries, (country) => country.id === id)

        if (index === -1) {
            throw Error('Missing Country');
        }

        fakeDatabase.countries.splice(index, 1);
        return processCountries(dataConfig);
  });
