const DEFAULT_ELEM_PREFIX = '__';
const DEFAULT_MOD_PREFIX = '--';
const DEFAULT_VALUE_PREFIX = '_';

type Prefixes = {
    elemPrefix?: string;
    modPrefix?: string;
    valuePrefix?: string;
}

export type ClassNames = {
    [key: string]: string;
}

type Mods = {
    [key: string]: unknown;
}

type Attrs = {
    className: string;
}

function hasClassName(classNames: ClassNames, value: string): boolean {
    return Object.prototype.hasOwnProperty.call(classNames, value);
}

function buildClassNames(
    baseName: string,
    classNames: ClassNames,
    mods: Mods,
    prefixes: Prefixes,
): string {
    const result = [];
    const { modPrefix, valuePrefix } = prefixes;

    if (hasClassName(classNames, baseName)) {
        result.push(classNames[baseName]);
    }

    Object.keys(mods)
        .filter((modName): boolean => {
            if (modName === 'className') return false;
            const typeOfMod = typeof mods[modName];
            return (
                typeOfMod === 'string'
                || typeOfMod === 'number'
                || typeOfMod === 'boolean'
            );
        })
        .forEach((modName): void => {
            const modValue = mods[modName];
            const classNameWithoutValue = `${baseName}${modPrefix}${modName}`;
            const classNameCandidateWithValue = `${baseName}${modPrefix}${modName}${valuePrefix}${modValue}`;

            if (modValue === false || modValue === '' || modValue === 0) {
                return;
            }

            if (modValue === true && hasClassName(classNames, classNameWithoutValue)) {
                result.push(classNames[classNameWithoutValue]);
            } else {
                if (hasClassName(classNames, classNameWithoutValue)) {
                    result.push(classNames[classNameWithoutValue]);
                }
                if (hasClassName(classNames, classNameCandidateWithValue)) {
                    result.push(classNames[classNameCandidateWithValue]);
                }
            }
        });

    if (typeof mods.className === 'string' && mods.className !== '') {
        result.push(mods.className);
    }

    return result.join(' ');
}

export default function make({
    elemPrefix = DEFAULT_ELEM_PREFIX,
    modPrefix = DEFAULT_MOD_PREFIX,
    valuePrefix = DEFAULT_VALUE_PREFIX,
}: Prefixes = {}) {
    return function bem(blockName: string, classNames: ClassNames) {
        const prefixes = { modPrefix, valuePrefix };
        return {
            block(mods: Mods = {}): Attrs {
                return {
                    className: buildClassNames(blockName, classNames, mods, prefixes),
                };
            },
            elem(names: string | string[], mods: Mods = {}): Attrs {
                const elemNames = (typeof names === 'string') ? [names] : names;
                return {
                    className: elemNames.reduce(
                        (result: string[], name: string): string[] => [
                            ...result,
                            buildClassNames(`${blockName}${elemPrefix}${name}`, classNames, mods, prefixes),
                        ],
                        [],
                    ).join(' '),
                };
            },
        };
    };
}
