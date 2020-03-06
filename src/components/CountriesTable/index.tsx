import React, { useState, useEffect } from 'react';
import { fetchCountries, DataConfig, DataOrder } from '../../api';
import { Country, NewCountry, SavedCountry, CountryContent } from '../../domain';

import CountryRow from '../CountryRow';
import OrderButton from '../OrderButton'

import './countries-table.scss';

const CountriesTable = () => {
    const [countries, setCountries] = useState<SavedCountry[]>([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<DataOrder>('medals');
  
    useEffect(() => {
      let ignore = false;
  
      async function fetchData(dataConfig: DataConfig) {
        const result = await fetchCountries(dataConfig);

        if (!ignore) {
            setCountries(result);
            setLoading(false);
        };
      }
  
      fetchData({ order });
      return () => { ignore = true; }
    }, [order]);

    async function handleSave(idea: Country, content: CountryContent) {
        switch(idea.tag) {
            case 'newCountry':
                // reset new country
                setLoading(true);
                const createResult = await idea.create(content, { order });
                setCountries(createResult);
                setLoading(false);
                break;
            case 'savedCountry':
                setLoading(true);
                const editResult = await idea.edit(content, { order });
                setCountries(editResult);
                setLoading(false);
                break;
        }   
    }

    function handleCancel(idea: Country) {
        switch(idea.tag) {
            case 'newCountry':
                break;
            case 'savedCountry':
                break;
        } 
    }

    async function handleDelete(idea: Country) {
        switch(idea.tag) {
            case 'newCountry':
                break;
            case 'savedCountry':
                setLoading(true);
                const deleteResult = await idea.delete(idea.getId(), { order });
                setCountries(deleteResult);
                setLoading(false);
                break;
        } 
    }

    return (
        <>
            <div className="countries__head">
                <OrderButton onClick={() => setOrder('alphabetical')} text='Alphabetical' active={order === 'alphabetical'} />|
                <OrderButton onClick={() => setOrder('medals')} text='Medals' active={order === 'medals'} />
            </div>
            <table className="countries__table">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Medals</th>
                    </tr>
                </thead>
                <tbody>
                    <CountryRow country={new NewCountry()} onSave={handleSave} onCancel={handleCancel} />
                    {countries.map((country: SavedCountry) => {
                        return <CountryRow key={country.getId()} country={country} onSave={handleSave} onCancel={handleCancel} onDelete={handleDelete} />
                    })}
                </tbody>
            </table>
            <div>
                {loading && <div>Loading</div>}
            </div>
        </>
    );
}

export default CountriesTable;