type TCssModule = { [key: string]: any };

export default function emulateCssModule(classNames: string[]): TCssModule {
    const randomHash = Math.random().toString(32).slice(2, 8).toUpperCase();
    return classNames.reduce(
        (result, className) => {
        result[className] = `${className}--${randomHash}`;
        return result;
        },
        {} as TCssModule
    );
}
