import make from '..'; // eslint-disable-line import/no-unresolved

describe('@textkernel/bem package', (): void => {
    it('should have bem function as default export', (): void => {
        expect(make).toBeInstanceOf(Function);
    });
});
