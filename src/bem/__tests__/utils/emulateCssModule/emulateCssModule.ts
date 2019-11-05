import { ClassNames } from '../../../../types';

export default function emulateCssModule(classNames: string[]): ClassNames {
    const randomHash = Math.random().toString(32).slice(2, 8).toUpperCase();
    return classNames.reduce(
        (result, className): ClassNames => ({
            ...result,
            [className]: `${className}--${randomHash}`,
        }),
        {} as ClassNames,
    );
}
