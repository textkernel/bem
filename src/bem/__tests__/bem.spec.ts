import make from '../';
import keymirror from './utils/keymirror';

describe('@textkernel/bem', () => {

    describe('make', () => {

        it('should return bem function when called without options', () => {
            const bem = make();
            expect(bem).toBeInstanceOf(Function);
        });

        it('should return bem function when called with empty options', () => {
            const bem = make({});
            expect(bem).toBeInstanceOf(Function);
        });

        it('should return bem function when called with some options', () => {
            const bem = make({ elemPrefix: '~~' });
            expect(bem).toBeInstanceOf(Function);
        });
    });

    describe('bem', () => {

        it('should return block and elem functions', () => {
            const bem = make();
            const classnames = {};
            const { block, elem } = bem('Button', classnames);
            expect(block).toBeInstanceOf(Function);
            expect(elem).toBeInstanceOf(Function);
        });
    });

    describe('block', () => {

        it('should return empty class names for block with no props', () => {
            const bem = make();
            const { block } = bem('Button', {});
            const blockClassNames = block();
            expect(blockClassNames).toBe('');
        });

        it('should return class names for block', () => {
            const bem = make();
            const classnames = keymirror({
                'Button': '',
                'Button--disabled': '',
                'Button--active': '',
                'Button--size': '',
                'Button--size_2': '',
                'Button--theme': '',
                'Button--theme_creepy': '',
            });
            const { block } = bem('Button', classnames);
            const blockClassNames = block({
                disabled: true,
                active: false,
                size: 2,
                className: 'ButtonGroup__item',
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button',
                'Button--disabled',
                'Button--size',
                'Button--size_2',
                'ButtonGroup__item'
            ]);
        });
    });

    describe('elem', () => {

        it('should return empty class names for block with no props', () => {
            const bem = make();
            const { elem } = bem('Button', {});
            const blockClassNames = elem('icon');
            expect(blockClassNames).toBe('');
        });

        it('should return class names for element', () => {

            const bem = make();
            const classnames = keymirror({
                'Button__icon': '',
                'Button__icon--disabled': '',
                'Button__icon--active': '',
                'Button__icon--size': '',
                'Button__icon--size_2': '',
                'Button__icon--theme': '',
                'Button__icon--theme_creepy': '',
            });
            const { elem } = bem('Button', classnames);
            const blockClassNames = elem('icon', {
                disabled: true,
                active: false,
                theme: 'creepy',
                size: 2,
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button__icon',
                'Button__icon--disabled',
                'Button__icon--theme',
                'Button__icon--theme_creepy',
                'Button__icon--size',
                'Button__icon--size_2'
            ]);
        });

        it('should return class names for element', () => {
            const bem = make();
            const classnames = keymirror({
                'Button__icon': '',
                'Button__icon--disabled': '',
                'Button__icon--active': '',
                'Button__icon--size': '',
                'Button__icon--size_2': '',
                'Button__icon--theme': '',
                'Button__icon--theme_creepy': '',
                'Button__item': '',
                'Button__item--theme': '',
                'Button__item--theme_creepy': '',

            });
            const { elem } = bem('Button', classnames);
            const blockClassNames = elem(['item', 'icon'], {
                disabled: true,
                active: false,
                theme: 'creepy',
                size: 2,
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button__item',
                'Button__item--theme',
                'Button__item--theme_creepy',
                'Button__icon',
                'Button__icon--disabled',
                'Button__icon--theme',
                'Button__icon--theme_creepy',
                'Button__icon--size',
                'Button__icon--size_2'
            ]);
        });
    });
});
