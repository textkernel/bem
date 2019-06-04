const DEFAULT_ELEM_PREFIX = '__';
const DEFAULT_MOD_PREFIX = '--';
const DEFAULT_VALUE_PREFIX = '_';

interface IPrefixes {
    elemPrefix?: string;
    modPrefix?: string;
    valuePrefix?: string;
}

export interface IClassNames {
    [key: string]: string;
}

interface IMods {
    [key: string]: string | number | boolean;
}

interface IAttrs {
    className: string;
}

function hasClassName(classNames: IClassNames, value: string): boolean {
    return Object.prototype.hasOwnProperty.call(classNames, value);
}

function buildClassNames(
    baseName: string,
    classNames: IClassNames,
    mods: IMods,
    prefixes: IPrefixes,
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
}: IPrefixes = {}) {
    return function bem(blockName: string, classNames: IClassNames) {
        const prefixes = { modPrefix, valuePrefix };
        return {
            block(mods: IMods = {}): IAttrs {
                return {
                    className: buildClassNames(blockName, classNames, mods, prefixes),
                };
            },
            elem(names: string | string[], mods: IMods = {}): IAttrs {
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
