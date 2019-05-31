import { keymirror } from './utils';
import bem, { add } from '../';

describe('@textkernel/bem', () => {

  describe('keymirror', () => {
    it('should create mirrored object from any object', () => {
      expect(keymirror({ a: '', b: ''})).toEqual({ a: 'a', b: 'b' });
    });
  });

  describe('bem', () => {
    it('should BEMify a given value', () => {
      expect(bem('42 is the answer')).toEqual('I do BEM magic with your "42 is the answer"');
    });
  });

  describe('add', () => {
    it('should add two values', () => {
      expect(add(1, 2)).toEqual(3);
    });
  });

});
