import { fetchCountry, createCountry, editCountry, deleteCountry, DataConfig } from '../api';

const NAME_LENGTH = 140;
const MEDALS_MAX = 10000;

type ValidationResult = ValidationSuccess | ValidationFailure;

type ValidationSuccess = {
    tag: 'validationSuccess';
    message?: string;
}

type ValidationFailure = {
    tag: 'validationFailure';
    message: string;
}

export type CountryContent = {
    name: string;
    medals: number;
}

export type CountryMeta = {
    created: Date;
    updated: Date;
}

export type Country = NewCountry | SavedCountry;

abstract class SharedCountry {
    protected content: CountryContent;

    getName() {
        return this.content.name;
    }

    getMedals() {
        return this.content.medals;
    }

    async validateName(name: string): Promise<ValidationResult> {
        if(name.length === 0) {
            return { tag: 'validationFailure', message: `Name is required` };
        }

        if(name.length > NAME_LENGTH) {
            return { tag: 'validationFailure', message: `Name is longer than ${NAME_LENGTH}` };
        }

        const match = await fetchCountry(name);

        if (match.length) {
            return { tag: 'validationFailure', message: `Name must be unique` };
        }

        return { tag: 'validationSuccess' };
    }

    validateMedals(medals: number): ValidationResult {
        if(isNaN(medals)) {
            return { tag: 'validationFailure', message: `Number of medals should be a number` };
        }

        if(medals < 0) {
            return { tag: 'validationFailure', message: `Number of medals should be zero or greater` };
        }

        if(medals > MEDALS_MAX) {
            return { tag: 'validationFailure', message: `Max medals is ${MEDALS_MAX}` };
        }

        return { tag: 'validationSuccess' };
    }

    async validate(content: CountryContent): Promise<ValidationResult> {
        const {name, medals} = content;

        const validateName = await this.validateName(name);
        if(validateName.tag === 'validationFailure') {
                return validateName;
        }

        const validateMedals = this.validateMedals(medals);
        if(validateMedals.tag === 'validationFailure') {
                return validateMedals;
        }

        return { tag: 'validationSuccess' };
    }

    constructor(content: CountryContent) {
        this.content = content;
    }
}

export class NewCountry extends SharedCountry {
    tag: 'newCountry' = 'newCountry';

    async validateNameIsUnique(name: string): Promise<ValidationResult> {
        const match = await fetchCountry(name);
    
        if (match.length) {
            return { tag: 'validationFailure', message: `Name must be unique` };
        }

        return { tag: 'validationSuccess' };
    }

    async create(content: CountryContent, dataConfig: DataConfig) {
        const validation = await this.validate(content);

        switch(validation.tag) {
            case 'validationFailure':
                throw new Error(validation.message);
            case 'validationSuccess':
                break;
        }

        const validateNameIsUnique = await this.validateNameIsUnique(content.name);

        switch(validateNameIsUnique.tag) {
            case 'validationFailure':
                throw new Error(validateNameIsUnique.message);
            case 'validationSuccess':
                break;
        }

        return await createCountry(content, dataConfig);
    };
 
    constructor() {
        super({
            name: '',
            medals: 0
        });
    }
}

export class SavedCountry extends SharedCountry {
    tag: 'savedCountry' = 'savedCountry';
    private id: string;
    private meta: CountryMeta;

    getId() {
        return this.id;
    }

    getMeta() {
        return this.meta;
    }

    async edit(content: CountryContent, dataConfig: DataConfig) {
        const validation = await this.validate(content);

        switch(validation.tag) {
            case 'validationFailure':
                throw new Error(validation.message);
            case 'validationSuccess':
                return await editCountry(this.id, content, dataConfig);
        }
    };

    async delete(id: string, dataConfig: DataConfig) {
        return await deleteCountry(this.id, dataConfig);
    };

    constructor(id: string, content: CountryContent, meta: CountryMeta) {
        super(content);

        this.id = id;
        this.meta = meta;
    }
}

