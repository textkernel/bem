type TDict = {
  [key: string]: any;
};

export default function keymirror(value: TDict) {
    return Object.keys(value)
        .reduce(
            (result, keyName) => {
            result[keyName] = keyName;
            return result;
            },
            {} as TDict
        );
}
