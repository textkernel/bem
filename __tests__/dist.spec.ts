import make from '../dist/bem';

describe('@textkernel/bem package', () => {

  it('should have bem function as default export', () => {
    expect(make).toBeInstanceOf(Function);
  });

});
