import {getFirstName, getLastName, isValidPassword} from '../src/utils/user';

describe('Simple mock tests of user utility class', () => {
    describe('getFirstName', () => {
        it('should return first name when given full name', () => {
            const testName = 'Jorge Montoya';
            const expectedResults = 'Jorge';
            const results = getFirstName(testName);
    
            expect(results).toEqual(expectedResults);
        });
        it('should return first name if only first name given', () => {
            const expected = 'Meme';
            const results = getFirstName(expected);

            expect(results).toBe(expected);
        });
        it('should throw an error on empty string', () => {
            
            const error = new Error('Invalid name supplied');
            expect(() => getFirstName('')).toThrow(error);
        })
    });

    describe('getLastName', () => {
        it('should throw error on empty string', () => {

            const error = new Error('Invalid name supplied');
            expect(() => getLastName('')).toThrow(error);
        });
        it('should return full string if only one word supplied', () => {
            const expected = 'Meme';
            const results = getLastName(expected);

            expect(results).toBe(expected);
        });
        it('should return last word in fullname if first and last supplied', () => {
            const testName = 'Jorge Montoya';
            const expectedResults = 'Montoya';
            const results = getLastName(testName);
    
            expect(results).toEqual(expectedResults);
        })
    });

    describe('isValidPassword', () => {
        it('should reject password shorter than 8 characters', () => {
            const testString = 'efvrge7';
            const results = isValidPassword(testString);

            expect(results).toBeFalsy();
        });
        it("should reject password that contains the word 'password'", () => {
            const testString = "fdgretyrgsdPasswordgfqferqtrq";
            const results = isValidPassword(testString);

            expect(results).toBeFalsy();
        });
        it('should accept password of proper length and context', () => {
            const testString = "gfagegfyeryterftjfgyszdrdsrsfg3434$";
            const results = isValidPassword(testString);

            expect(results).toBeTruthy();
        })
    })
});
