import make from '..';

describe('index', () => {
    it('should have `bem` function as default export', () => {
        expect(make).toBeInstanceOf(Function);
    });
});
