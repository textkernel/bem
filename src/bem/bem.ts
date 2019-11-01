import BemMagicExplained from '../BemMagicExplained';
import { ClassNames } from '../types';

const DEFAULT_ELEM_PREFIX = '__';
const DEFAULT_MOD_PREFIX = '--';
const DEFAULT_VALUE_PREFIX = '_';

type Prefixes = {
    elemPrefix?: string;
    modPrefix?: string;
    valuePrefix?: string;
}

type Mods = {
    [key: string]: unknown;
    className?: string;
    elemClassName?: string;
}

type DebugOptions = {
    debug?: boolean;
}

type Attrs = {
    className: string;
}

function hasClassName(classNames: ClassNames, value: string): boolean {
    return Object.prototype.hasOwnProperty.call(classNames, value);
}

function buildClassNames(
    baseName: string,
    fnType: 'block' | 'elem',
    classNames: ClassNames,
    mods: Mods,
    prefixes: Prefixes,
    bemMagic: BemMagicExplained,
): string {
    const result = [];
    const { modPrefix, valuePrefix } = prefixes;
    if (hasClassName(classNames, baseName)) {
        bemMagic.applies(baseName).as(classNames[baseName]).because('Base name class was found.');
        result.push(classNames[baseName]);
    } else {
        bemMagic.ignores(baseName).because('Base name class was not found.');
    }

    Object.keys(mods)
        .filter((modName): boolean => {
            if (modName === 'className') return false;
            const typeOfValue = typeof mods[modName];
            const isStringNumberOrBoolean = (
                typeOfValue === 'string'
                || typeOfValue === 'number'
                || typeOfValue === 'boolean'
            );
            if (isStringNumberOrBoolean === false) {
                bemMagic.ignores(baseName).modifier(modName)
                    .because('Modifier\'s value is not of a string, number or boolean type.');
            }
            return isStringNumberOrBoolean;
        })
        .forEach((modName): void => {
            const modValue = mods[modName];
            const classNameWithoutValue = `${baseName}${modPrefix}${modName}`;
            const classNameCandidateWithValue = `${baseName}${modPrefix}${modName}${valuePrefix}${modValue}`;

            if (modValue === false || modValue === '' || modValue === 0) {
                bemMagic.ignores(baseName).modifier(modName)
                    .because('Modifier\'s value is either empty string, false or zero.');
                return;
            }

            if (modValue === true && hasClassName(classNames, classNameWithoutValue)) {
                result.push(classNames[classNameWithoutValue]);
                bemMagic.applies(baseName).modifier(modName).with(modValue)
                    .as(classNames[classNameWithoutValue])
                    .because('Modifier\'s value is boolean "true".');
            } else {
                if (hasClassName(classNames, classNameWithoutValue)) {
                    result.push(classNames[classNameWithoutValue]);
                    bemMagic.applies(baseName).modifier(modName)
                        .as(classNames[classNameWithoutValue])
                        .because('Wildcard class name for the modifier was found.');
                }
                if (hasClassName(classNames, classNameCandidateWithValue)) {
                    result.push(classNames[classNameCandidateWithValue]);
                    bemMagic.applies(baseName).modifier(modName).with(modValue as string)
                        .as(classNames[classNameCandidateWithValue])
                        .because('Class was found for modifier + value pair.');
                }
            }

            bemMagic.ignores(baseName).modifier(modName)
                .because('Class was not found for either wildcard modifier nor modifier + value pair.');
        });

    if (
        fnType === 'block'
        && typeof mods.className === 'string'
        && mods.className !== ''
    ) {
        result.push(mods.className);
        bemMagic.applies(baseName)
            .className(mods.className)
            .as(mods.className)
            .because('Raw className was passed as a property');
    } else if (
        fnType === 'elem'
        && typeof mods.elemClassName === 'string'
        && mods.elemClassName !== ''
    ) {
        result.push(mods.elemClassName);
        bemMagic.applies(baseName)
            .className(mods.elemClassName)
            .as(mods.elemClassName)
            .because('elemClassName was passed as a property');
    }

    return result.join(' ');
}

type BlockFunction = (mods?: Mods, options?: DebugOptions) => Attrs;

function makeBlockFunction(
    blockName: string,
    classNames: ClassNames,
    prefixes: Prefixes,
): BlockFunction {
    return function block(mods: Mods = {}, options: DebugOptions = {}): Attrs {
        const bemMagic = new BemMagicExplained({
            block: blockName,
            classNames,
            isEnabled: (options.debug === true),
        });
        const output = buildClassNames(
            blockName,
            'block',
            classNames,
            mods,
            prefixes,
            bemMagic,
        );
        bemMagic.thatsWhatWeHave(output);
        bemMagic.explain();
        return { className: output };
    };
}

type ElemFunction = (names: string | string[], mods?: Mods, options?: DebugOptions) => Attrs;

function makeElemFunction(
    blockName: string,
    classNames: ClassNames,
    prefixes: Prefixes,
): ElemFunction {
    return function elem(
        names: string | string[],
        mods: Mods = {},
        options: DebugOptions = {},
    ): Attrs {
        const elemNames = (typeof names === 'string') ? [names] : names;
        const bemMagic = new BemMagicExplained({
            block: blockName,
            elems: elemNames,
            classNames,
            isEnabled: (options.debug === true),
        });
        const output = elemNames.reduce(
            (result: string[], name: string): string[] => [
                ...result,
                buildClassNames(
                    `${blockName}${prefixes.elemPrefix}${name}`,
                    'elem',
                    classNames,
                    mods,
                    prefixes,
                    bemMagic,
                ),
            ],
            [],
        ).join(' ');
        bemMagic.thatsWhatWeHave(output);
        bemMagic.explain();
        return { className: output };
    };
}

type BlockElemHelpers = {
    block: BlockFunction;
    elem: ElemFunction;
}
type BemFn = (blockName: string, classNames: ClassNames) => BlockElemHelpers

function makeBemFunction(prefixes: Prefixes): BemFn {
    return function bem(blockName: string, classNames: ClassNames): BlockElemHelpers {
        return {
            block: makeBlockFunction(blockName, classNames, prefixes),
            elem: makeElemFunction(blockName, classNames, prefixes),
        };
    };
}

export default function make(prefixes: Prefixes = {}): BemFn {
    const safePrefixes = Object.assign({
        elemPrefix: DEFAULT_ELEM_PREFIX,
        modPrefix: DEFAULT_MOD_PREFIX,
        valuePrefix: DEFAULT_VALUE_PREFIX,
    }, prefixes);
    return makeBemFunction(safePrefixes);
}
