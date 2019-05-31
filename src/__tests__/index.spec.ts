import bem, { add } from '../';

describe('index', () => {

  it('should have `bem` function as default export', () => {
    expect(bem).toBeInstanceOf(Function);
  });

  it('should have `add` function as named export', () => {
    expect(add).toBeInstanceOf(Function);
  });

});
