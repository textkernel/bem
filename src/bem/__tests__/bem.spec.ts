import make from '..';
import { emulateCssModule } from './utils';

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
            const bem = make({
                elemPrefix: '~~',
                modPrefix: '__',
                valuePrefix: '_',
            });
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
            expect(blockClassNames.className).toBe('');
        });

        it('should return correct class names when called with boolean mods', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button',
                'Button--disabled',
                'Button--active',
            ]);
            const { block } = bem('Button', classnames);
            const blockAttrs = block({
                disabled: true,
                active: false,
                broken: true,
            });
            expect(blockAttrs.className.trim()).toBe(blockAttrs.className);
            expect(blockAttrs.className.split(' ')).toEqual([
                classnames['Button'],
                classnames['Button--disabled'],
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
            const blockAttrs = block({
                size: 2,
                score: 5,
                // todo: float and negative
                importance: 77,
                likeability: 42,
            });
            expect(blockAttrs.className.trim()).toBe(blockAttrs.className);
            expect(blockAttrs.className.split(' ')).toEqual([
                classnames['Button'],
                classnames['Button--size'],
                classnames['Button--size_2'],
                classnames['Button--score_5'],
                classnames['Button--importance'],
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
            const blockAttrs = block({
                theme: 'creepy',
                align: 'right',
                type: 'submit',
            });
            expect(blockAttrs.className.trim()).toBe(blockAttrs.className);
            expect(blockAttrs.className.split(' ')).toEqual([
                classnames['Button'],
                classnames['Button--theme'],
                classnames['Button--theme_creepy'],
                classnames['Button--align_right'],
                classnames['Button--type'],
            ]);
        });

        it('should treat className property correctly', () => {
            const bem = make();
            const classnames = emulateCssModule(['Button']);
            const { block } = bem('Button', classnames);
            const blockAttrs = block({
                className: 'Group__button',
            });
            expect(blockAttrs.className.trim()).toBe(blockAttrs.className);
            expect(blockAttrs.className.split(' ')).toEqual([
                classnames['Button'],
                'Group__button',
            ]);
        });

        it('should treat className property correctly when classnames is empty', () => {
            const bem = make();
            const classnames = {};
            const { block } = bem('Button', classnames);
            const blockAttrs = block({
                className: 'Group__button',
            });
            expect(blockAttrs.className).toBe('Group__button');
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
            const blockAttrs = block({
                theme: null,
                align: undefined,
                type: {},
                score: (() => true),
                data: new Map(),
            });
            expect(blockAttrs.className.trim()).toBe(blockAttrs.className);
            expect(blockAttrs.className.split(' ')).toEqual([
                classnames['Button'],
            ]);
        });
    });

    describe('elem', () => {
        it('should return empty class names when called with no props', () => {
            const bem = make();
            const { elem } = bem('Button', {});
            const elemClassNames = elem('label');
            expect(elemClassNames.className).toBe('');
        });

        it('should return correct class names when called with boolean mods', () => {
            const bem = make();
            const classnames = emulateCssModule([
                'Button__label',
                'Button__label--disabled',
                'Button__label--active',
            ]);
            const { elem } = bem('Button', classnames);
            const elemAttrs = elem('label', {
                disabled: true,
                active: false,
                broken: true,
            });
            expect(elemAttrs.className.trim()).toBe(elemAttrs.className);
            expect(elemAttrs.className.split(' ')).toEqual([
                classnames['Button__label'],
                classnames['Button__label--disabled'],
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
            const elemAttrs = elem('label', {
                size: 2,
                score: 5,
                // todo: float and negative
                importance: 77,
                likeability: 42,
            });
            expect(elemAttrs.className.trim()).toBe(elemAttrs.className);
            expect(elemAttrs.className.split(' ')).toEqual([
                classnames['Button__label'],
                classnames['Button__label--size'],
                classnames['Button__label--size_2'],
                classnames['Button__label--score_5'],
                classnames['Button__label--importance'],
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
            const elemAttrs = elem('label', {
                theme: 'creepy',
                align: 'right',
                type: 'submit',
            });
            expect(elemAttrs.className.trim()).toBe(elemAttrs.className);
            expect(elemAttrs.className.split(' ')).toEqual([
                classnames['Button__label'],
                classnames['Button__label--theme'],
                classnames['Button__label--theme_creepy'],
                classnames['Button__label--align_right'],
                classnames['Button__label--type'],
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
            const elemAttrs = elem(['label', 'item'], {
                theme: 'creepy',
                align: 'right',
                type: 'submit',
            });
            expect(elemAttrs.className.trim()).toBe(elemAttrs.className);
            expect(elemAttrs.className.split(' ')).toEqual([
                classnames['Button__label'],
                classnames['Button__label--theme'],
                classnames['Button__label--theme_creepy'],
                classnames['Button__label--align_right'],
                classnames['Button__label--type'],
                classnames['Button__item'],
                classnames['Button__item--theme'],
                classnames['Button__item--theme_creepy'],
                classnames['Button__item--align_right'],
            ]);
        });

        it('should treat className property correctly', () => {
            const bem = make();
            const classnames = emulateCssModule(['Button__label']);
            const { elem } = bem('Button', classnames);
            const elemAttrs = elem('label', {
                className: 'Group__button',
            });
            expect(elemAttrs.className.trim()).toBe(elemAttrs.className);
            expect(elemAttrs.className.split(' ')).toEqual([
                classnames['Button__label'],
                'Group__button',
            ]);
        });

        it('should treat className property correctly when classnames is empty', () => {
            const bem = make();
            const classnames = {};
            const { elem } = bem('Button', classnames);
            const elemAttrs = elem('label', {
                className: 'Group__button',
            });
            expect(elemAttrs.className).toBe('Group__button');
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
            const elemAttrs = elem('label', {
                theme: null,
                align: undefined,
                type: {},
                score: (() => true),
                data: new Map(),
            });
            expect(elemAttrs.className.trim()).toBe(elemAttrs.className);
            expect(elemAttrs.className.split(' ')).toEqual([
                classnames['Button__label'],
            ]);
        });
    });

    describe('block/elem(..., { debug: true }) options', () => {
        it('should log debugging information if needed', () => {
            const consoleLog = jest.spyOn(console, 'log').mockImplementation();
            const consoleTable = jest.spyOn(console, 'table').mockImplementation();
            const consoleGroup = jest.spyOn(console, 'group').mockImplementation();
            const consolegroupEnd = jest.spyOn(console, 'groupEnd').mockImplementation();
            const bem = make();
            const classnames = emulateCssModule([
                'Button',
                'Button--theme_creepy',
                'Button__label',
                'Button__label--theme_creepy',
                'Button__item',
                'Button__item--theme',
            ]);
            const { block, elem } = bem('Button', classnames);
            block({
                theme: 'creepy',
                className: 'Group__button',
                dispatch: () => true,
                payload: { foo: 'bar' },
                shit: undefined,
                onemilliondollamistake: null,
            }, {
                debug: true,
            });
            elem(['label', 'item'], {
                theme: 'creepy',
                className: 'Group__item',
                dispatch: () => true,
                payload: { foo: 'bar' },
                shit: undefined,
                onemilliondollamistake: null,
            }, {
                debug: true,
            });
            expect(consoleLog).toHaveBeenCalledTimes(8);
            expect(consoleTable).toHaveBeenCalledTimes(8);
            expect(consoleGroup).toHaveBeenCalledTimes(2);
            expect(consolegroupEnd).toHaveBeenCalledTimes(4);
        });
    });
});
