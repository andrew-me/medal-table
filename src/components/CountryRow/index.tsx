import React from 'react';
import { Country, CountryContent } from '../../domain';
import TextField from '../TextField';
import NumberField from '../NumberField';

import './country-row.scss';

type Props = {
    country: Country;
    onSave: (country: Country, content: CountryContent) => void;
    onCancel: (country: Country) => void;
    onDelete?: (country: Country) => void;
}

type State = {
    name: {
        value: string;
        error: string;
    };
    medals: {
        value: string;
        error: string;
    }
    isChanged: boolean;
}

class CountryRow extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: {
                value: this.props.country.getName(),
                error: ""
            },
            medals: {
                value: this.props.country.getMedals().toString(),
                error: ""
            },
            isChanged: false
        }
    }

    reset() {
        this.setState({
            name: {
                value: this.props.country.getName(),
                error: ""
            },
            medals: {
                value: this.props.country.getMedals().toString(),
                error: ""
            },
            isChanged: false
        })
    }

    handleNameChange = (value: string) => {
        this.setState({ name: { value, error: '' }});
    }

    handleMedalsChange = (value: string) => {
        this.setState({ medals: { value, error: '' }});
    }

    validateMedals = () => {
        const validateMedals = this.props.country.validateMedals(parseInt(this.state.medals.value));
        let medalsError = '';

        switch(validateMedals.tag) {
            case 'validationSuccess':
                break;
            case 'validationFailure':
                medalsError = validateMedals.message;
        }

        return medalsError;
    }

    validateName = async () => {
        const validateName = await this.props.country.validateName(this.state.name.value);
        let nameError = '';

        switch(validateName.tag) {
            case 'validationSuccess':
                break;
            case 'validationFailure':
                nameError = validateName.message;
        }

        return nameError;
    }

    handleSave = async (evt: any) => {
        evt.preventDefault();

        const nameError = await this.validateName();
        const medalsError = this.validateMedals();

        if (nameError || medalsError) {
            this.setState({
                name: { value: this.state.name.value, error: nameError },
                medals: { value: this.state.medals.value, error: medalsError },
            })
        }
        else {
            this.props.onSave(this.props.country, { name: this.state.name.value, medals: parseInt(this.state.medals.value) });
            if (this.props.country.tag === 'newCountry') {
                this.reset();
            }
        }
    }

    handleCancel = (evt: any) => {
        evt.preventDefault();
        this.reset();

        this.props.onCancel(this.props.country);
    }

    handleDelete = async (evt: any) => {
        evt.preventDefault();
        if(this.props.onDelete) {
            this.props.onDelete(this.props.country);
        }
    }

    isChanged() {
        return this.state.name.value !== this.props.country.getName() || parseInt(this.state.medals.value) !== this.props.country.getMedals();
    }

    render() {
        return (
            <tr className="country-table">
                <td>
                    <TextField
                        focus={this.props.country.tag === 'newCountry'}
                        placeholder='Name'
                        label="Name"
                        value={this.state.name.value}
                        error={this.state.name.error}
                        onChange={this.handleNameChange}
                    />
                </td>
                <td>
                    <NumberField     
                        placeholder='Medals' 
                        label="Medals" 
                        value={this.state.medals.value}
                        error={this.state.medals.error}
                        onChange={this.handleMedalsChange}  
                    />
                </td>
                <td>
                    {this.isChanged() && <button onClick={this.handleSave}>Save</button> }
                    {(this.props.country.tag === 'newCountry' || this.isChanged()) && <button onClick={this.handleCancel}>Cancel</button> }
                    {this.props.onDelete && <button onClick={this.handleDelete}>Delete</button>}
                </td>
            </tr>
        )  
    }
}

export default CountryRow;