const DEFAULT_ELEM_PREFIX = '__';
const DEFAULT_MOD_PREFIX = '--';
const DEFAULT_VALUE_PREFIX = '_';

type TPrefixes = {
    elemPrefix?: string;
    modPrefix?: string;
    valuePrefix?: string;
}

type TClassNames = {
    [key: string]: string;
}

type TMods = {
    [key: string]: string | number | boolean;
}

interface IAttrs {
    className: string;
}

function buildClassNames(
    baseName: string,
    classNames: TClassNames,
    mods: TMods,
    prefixes: TPrefixes
): string {
    const result = [];
    const { modPrefix, valuePrefix } = prefixes;


    if (classNames.hasOwnProperty(baseName)) {
        result.push(classNames[baseName]);
    }

    Object.keys(mods)
        .filter(modName => {
            if (modName === 'className') return false;
            const typeOfMod = typeof mods[modName];
            return (
                typeOfMod === 'string' ||
                typeOfMod === 'number' ||
                typeOfMod === 'boolean'
            );
        })
        .forEach(modName => {

            const modValue = mods[modName];
            const classNameWithoutValue = `${baseName}${modPrefix}${modName}`;
            const classNameCandidateWithValue = `${baseName}${modPrefix}${modName}${valuePrefix}${modValue}`;

            if (modValue === false || modValue === '' || modValue === 0) {
                return;
            } else if (modValue === true && classNames.hasOwnProperty(classNameWithoutValue)) {
                result.push(classNames[classNameWithoutValue]);
            } else {
                if (classNames.hasOwnProperty(classNameWithoutValue)) {
                    result.push(classNames[classNameWithoutValue]);
                }
                if (classNames.hasOwnProperty(classNameCandidateWithValue)) {
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
    valuePrefix = DEFAULT_VALUE_PREFIX
}: TPrefixes = {}) {
    return function bem(blockName: string, classNames: TClassNames) {
        const prefixes = { modPrefix, valuePrefix };
        return {
            block(mods: TMods = {}): IAttrs {
                return {
                    className: buildClassNames(blockName, classNames, mods, prefixes)
                };
            },
            elem(names: string | string[], mods: TMods = {}): IAttrs {
                const elemNames = (typeof names === 'string') ? [names] : names;
                return {
                    className: elemNames.reduce(
                        (result, name) => {
                            const elemName = `${blockName}${elemPrefix}${name}`;
                            result += ' ' + buildClassNames(elemName, classNames, mods, prefixes);
                            return result.trim();
                        },
                        ''
                    ),
                };
            },
        };
    }
}
