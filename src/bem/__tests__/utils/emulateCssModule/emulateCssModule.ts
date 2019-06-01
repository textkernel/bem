type TCssModule = { [key: string]: any };

export default function emulateCssModule(classNames: string[]): TCssModule {
    return classNames.reduce(
        (result, className) => {
        result[className] = className;
        return result;
        },
        {} as TCssModule
    );
}
