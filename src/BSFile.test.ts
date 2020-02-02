import BSFile from './BSFile';

const testDataPath = './.testdata/input.cat';

test('Test BSFile class', () => {
    expect(new BSFile(testDataPath)).toBeTruthy();
});

test('Test load method', () => {
    expect.assertions(1);

    const testFile = new BSFile(testDataPath);
    return testFile.load().then(result => {
        expect(result).toBeTruthy();
    });
})

test('Test extractModels', () => {
    const testFile = new BSFile(testDataPath);
    testFile.load().then(result => {
        let models = testFile.extractModels();
        expect(Array.isArray(models)).toBeTruthy();
    });
});