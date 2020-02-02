import BSString from './BSString';
import fs from 'fs';

const testDataPath = './.testdata/input.cat';

test('Test BSString class', () => {
    expect(new BSString('')).toBeTruthy();
});

test('Test load method', () => {
    expect.assertions(1);
    const data = fs.readFileSync(testDataPath, 'utf8');
    const testFile = new BSString(data);
    return testFile.load().then(result => {
        expect(result).toBeTruthy();
    });
})

test('Test extractModels', () => {
    expect.assertions(1);
    const data = fs.readFileSync(testDataPath, 'utf8');
    const testFile = new BSString(data);
    return testFile.load().then(result => {
        let models = testFile.extractModels();
        expect(Array.isArray(models)).toBeTruthy();
    });
});