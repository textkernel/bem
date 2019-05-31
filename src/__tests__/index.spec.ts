import bem from '../';

describe('index', () => {

  it('should have `bem` function as default export', () => {
    expect(bem).toBeInstanceOf(Function);
  });
});
