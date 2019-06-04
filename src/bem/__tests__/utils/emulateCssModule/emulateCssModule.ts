import { IClassNames } from '../../..';

export default function emulateCssModule(classNames: string[]): IClassNames {
    const randomHash = Math.random().toString(32).slice(2, 8).toUpperCase();
    return classNames.reduce(
        (result, className): IClassNames => ({
            ...result,
            [className]: `${className}--${randomHash}`,
        }),
        // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
        {} as IClassNames,
    );
}
