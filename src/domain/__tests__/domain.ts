import {NewCountry, SavedCountry} from '../index';
import { createCountry, editCountry, deleteCountry } from '../../api';

jest.mock('../../api', () => {
    return {
        fetchCountries: jest.fn(),
        fetchCountry: () => [],
        createCountry: jest.fn(),
        editCountry: jest.fn(),
        deleteCountry: jest.fn()
    }
});

const nameOver140 = 'Duis imperdiet eu diam sit amet faucibus. Sed vel laoreet. Duis imperdiet eu diam sit amet faucibus. Sed vel laoreet. Duis imperdiet eu diam sit amet faucibus. Sed vel laoreet.';


const validContent = { name: 'A country', medals: 3};
const invalidContentNameOver140 = { name: nameOver140, medals: 3};
const validConfig = { order: 'alphabetical' };
const validMeta = { created: new Date(2019, 4, 1), updated: new Date(2019, 4, 1)};

describe('domain', () => {
    describe('Test variable nameOver140 is over 140 length', () => {
        expect(nameOver140.length).toBeGreaterThan(140);
    });

    describe('New country', () => {
        let newCountry: any;

        beforeEach(() => {
            newCountry = new NewCountry();
        });

        it('should have an empty name', () => {
            expect(newCountry.getName()).toBe("");
        });

        it('should have zero medals', () => {
            expect(newCountry.getMedals()).toBe(0);
        });

        it('should not have an id', () => {
            expect(newCountry.getId).toBe(undefined);
        });

        it('should not have meta', () => {
            expect(newCountry.getMeta).toBe(undefined);
        });

        it('should not have edit', () => {
            expect(newCountry.edit).toBe(undefined);
        });

        it('should not have delete', () => {
            expect(newCountry.delete).toBe(undefined);
        });

        describe('create()', () => {
            it('should call api.createCountry', async () => {
                await newCountry.create(validContent, validConfig);
    
                expect(createCountry.mock.calls.length).toBe(1);
            });

            it('should fail validation if empty name', async () => {
                await expect(newCountry.create({...validContent, name: ''}, validConfig))
                    .rejects.toMatchObject({ message: 'Name is required' });                
            });

            it('should fail validation if name is longer than max length', async () => {
                await expect(newCountry.create(invalidContentNameOver140, validConfig))
                    .rejects.toMatchObject({ message: 'Name is longer than 140' });                
            });

            // etc
        })
    });

    describe('Saved country', () => {
        let savedCountry: any;

        describe('Valid saved country', () => {
            beforeEach(() => {
                savedCountry = new SavedCountry('1234', validContent, validMeta);
            });

            it('should have a name', () => {
                expect(savedCountry.getName()).toBe(validContent.name);
            });
    
            it('should have medals', () => {
                expect(savedCountry.getMedals()).toBe(validContent.medals);
            });
    
            it('should have an id', () => {
                expect(savedCountry.getId()).toBe('1234');
            });
    
            it('should have meta', () => {
                expect(savedCountry.getMeta()).toBe(validMeta);
            });

            it('should not have create', () => {
                expect(savedCountry.create).toBe(undefined);
            });

            describe('edit()', () => {
                it('should call api.editCountry', async () => {
                    await savedCountry.edit(validContent, validConfig);
        
                    expect(editCountry.mock.calls.length).toBe(1);
                });

                it('should fail validation if empty name', async () => {
                    await expect(savedCountry.edit({...validContent, name: ''}, validConfig))
                        .rejects.toMatchObject({ message: 'Name is required' });                
                });
    
                it('should fail validation if name is longer than max length', async () => {
                    await expect(savedCountry.edit(invalidContentNameOver140, validConfig))
                        .rejects.toMatchObject({ message: 'Name is longer than 140' });                
                });
    
                // etc
            })

            describe('delete()', () => {
                it('should call api.deleteCountry', async () => {
                    await savedCountry.delete('1234', validConfig);
        
                    expect(deleteCountry.mock.calls.length).toBe(1);
                });
            })
        });
    });
});