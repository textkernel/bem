import make from '../';
import { emulateCssModule } from './utils'

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

        it('should return `block` and `elem` functions', () => {
            const bem = make();
            const classnames = {};
            const { block, elem } = bem('Button', classnames);
            expect(block).toBeInstanceOf(Function);
            expect(elem).toBeInstanceOf(Function);
        });
    });

    describe('block', () => {

        it('should return empty class names when called with no props', () => {
            const bem = make();
            const { block } = bem('Button', {});
            const blockClassNames = block();
            expect(blockClassNames).toBe('');
        });

        it('should return correct class names when called with boolean mods', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button',
                'Button--disabled',
                'Button--active',
            ]);
            const { block } = bem('Button', classnames);
            const blockClassNames = block({
                disabled: true,
                active: false,
                broken: true,
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button',
                'Button--disabled',
            ]);
        });

        it('should return correct class names when called with numeric mods', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button',
                'Button--size',
                'Button--size_2',
                'Button--score_5',
                'Button--importance',
            ]);
            const { block } = bem('Button', classnames);
            const blockClassNames = block({
                size: 2,
                score: 5,
                // todo: float and negative
                importance: 77,
                likeability: 42,
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button',
                'Button--size',
                'Button--size_2',
                'Button--score_5',
                'Button--importance',
            ]);
        });

        it('should return correct class names when called with string mods', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button',
                'Button--theme',
                'Button--theme_creepy',
                'Button--align_right',
                'Button--type',
            ]);
            const { block } = bem('Button', classnames);
            const blockClassNames = block({
                theme: 'creepy',
                align: 'right',
                type: 'submit'
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button',
                'Button--theme',
                'Button--theme_creepy',
                'Button--align_right',
                'Button--type',
            ]);
        });

        it('should treat className property correctly', () => {
            const bem = make();
            const classnames = emulateCssModule(['Button']);
            const { block } = bem('Button', classnames);
            const blockClassNames = block({
                className: 'ButtonGroup__button'
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button',
                'ButtonGroup__button',
            ]);
        });

        it('should ignore props that are not of boolean, number or string type', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button',
                'Button--theme',
                'Button--theme_creepy',
                'Button--align',
                'Button--align_right',
                'Button--type',
                'Button--type_object',
                'Button--score',
                'Button--score_1',
                'Button--data',
                'Button--data_obejct',
            ]);
            const { block } = bem('Button', classnames);
            const blockClassNames = block({
                theme: null as any,
                align: undefined as any,
                type: {} as any,
                score: (() => true) as any,
                data: new Map() as any,
            });
            expect(blockClassNames.split(' ')).toEqual(['Button']);
        });
    });

    describe('elem', () => {

        it('should return empty class names when called with no props', () => {
            const bem = make();
            const { elem } = bem('Button', {});
            const elemClassNames = elem('label');
            expect(elemClassNames).toBe('');
        });

        it('should return correct class names when called with boolean mods', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button__label',
                'Button__label--disabled',
                'Button__label--active',
            ]);
            const { elem } = bem('Button', classnames);
            const blockClassNames = elem('label', {
                disabled: true,
                active: false,
                broken: true,
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button__label',
                'Button__label--disabled',
            ]);
        });

        it('should return correct class names when called with numeric mods', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button__label',
                'Button__label--size',
                'Button__label--size_2',
                'Button__label--score_5',
                'Button__label--importance',
            ]);
            const { elem } = bem('Button', classnames);
            const blockClassNames = elem('label', {
                size: 2,
                score: 5,
                // todo: float and negative
                importance: 77,
                likeability: 42,
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button__label',
                'Button__label--size',
                'Button__label--size_2',
                'Button__label--score_5',
                'Button__label--importance',
            ]);
        });

        it('should return correct class names when called with string mods', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button__label',
                'Button__label--theme',
                'Button__label--theme_creepy',
                'Button__label--align_right',
                'Button__label--type',
            ]);
            const { elem } = bem('Button', classnames);
            const blockClassNames = elem('label', {
                theme: 'creepy',
                align: 'right',
                type: 'submit'
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button__label',
                'Button__label--theme',
                'Button__label--theme_creepy',
                'Button__label--align_right',
                'Button__label--type',
            ]);
        });

        it('should be able to build class names for multiple elements', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button__label',
                'Button__label--theme',
                'Button__label--theme_creepy',
                'Button__label--align_right',
                'Button__label--type',
                'Button__item',
                'Button__item--theme',
                'Button__item--theme_creepy',
                'Button__item--align_right',
            ]);
            const { elem } = bem('Button', classnames);
            const blockClassNames = elem(['label', 'item'], {
                theme: 'creepy',
                align: 'right',
                type: 'submit'
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button__label',
                'Button__label--theme',
                'Button__label--theme_creepy',
                'Button__label--align_right',
                'Button__label--type',
                'Button__item',
                'Button__item--theme',
                'Button__item--theme_creepy',
                'Button__item--align_right',
            ]);
        });

        it('should treat className property correctly', () => {
            const bem = make();
            const classnames = emulateCssModule(['Button__label']);
            const { elem } = bem('Button', classnames);
            const blockClassNames = elem('label', {
                className: 'ButtonGroup__button'
            });
            expect(blockClassNames.split(' ')).toEqual([
                'Button__label',
                'ButtonGroup__button',
            ]);
        });

        it('should ignore props that are not of boolean, number or string type', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button__label',
                'Button__label--theme',
                'Button__label--theme_creepy',
                'Button__label--align',
                'Button__label--align_right',
                'Button__label--type',
                'Button__label--type_object',
                'Button__label--score',
                'Button__label--score_1',
                'Button__label--data',
                'Button__label--data_obejct',
            ]);
            const { elem } = bem('Button', classnames);
            const blockClassNames = elem('label', {
                theme: null as any,
                align: undefined as any,
                type: {} as any,
                score: (() => true) as any,
                data: new Map() as any,
            });
            expect(blockClassNames.split(' ')).toEqual(['Button__label']);
        });
    });
});
