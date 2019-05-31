import bem, { add } from '../dist/bem.js';

describe('@textkernel/bem package', () => {

  it('should have bem function as default export', () => {
    expect(bem).toBeInstanceOf(Function);
  });

  it('should have add function as named export', () => {
    expect(add).toBeInstanceOf(Function);
  });

});
