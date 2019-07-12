enum Action { applied, ignored };

enum TypesOfWhat {
    baseName = 'baseName',
    modifier = 'modifier',
    className = 'className'
};

export default class ActionExplanation {

    static action = Action;

    private readonly action: Action;
    private context: string;
    private what: string | undefined;
    private typeOfWhat: TypesOfWhat;
    private value: string | number | boolean | undefined;
    private classname: string | undefined;
    private reason: string | undefined;

    constructor(context: string, action: Action) {
        this.context = context;
        this.action = action;
        this.typeOfWhat = TypesOfWhat.baseName;
    }

    public modifier(what: string): ActionExplanation {
        this.what = what;
        this.typeOfWhat = TypesOfWhat.modifier;
        return this;
    }

    public className(what: string): ActionExplanation {
        this.what = what;
        this.typeOfWhat = TypesOfWhat.className;
        return this;
    }

    public with(value: string | number | boolean): ActionExplanation {
        this.value = value;
        return this;
    }

    public as(classname: string): ActionExplanation {
        this.classname = classname;
        return this;
    }

    public because(reason: string): ActionExplanation {
        this.reason = reason;
        return this;
    }

    public get contextSummary(): string {
        return this.context;
    }

    public get actionSummary(): string {
        if (this.action === Action.applied) {
            return this.getActionAppliedSummary();
        }
        return this.getActionIgnoredSummary();
    }

    public get reasonSummary(): string {
        if (!this.reason) return 'reason was not specified.';
        return this.reason;
    }

    public get resultSummary(): string {
        if (!this.classname) return 'resulting classname was not specified.';
        return this.classname;
    }

    private getActionAppliedSummary(): string {
        let summary = '';
        switch (this.typeOfWhat) {
            case TypesOfWhat.baseName:
                summary = `Base block/elem name "${this.context}" was applied.`;
                break;
            case TypesOfWhat.modifier:
                if (this.value !== undefined) {
                    summary = `Modifier "${this.what}" was applied with value "${this.value}".`;
                } else {
                    summary = `Modifier "${this.what}" was applied with no value.`;
                }
                break;
            case TypesOfWhat.className:
                    summary = `Class "${this.what}" was applied.`;
                break;
        }
        return summary;
    }

    private getActionIgnoredSummary(): string {
        let summary = '';
        switch (this.typeOfWhat) {
            case TypesOfWhat.baseName:
                summary = `Base block/elem name "${this.what}" was ignored.`;
                break;
            case TypesOfWhat.modifier:
                if (this.value !== undefined) {
                    summary = `Modifier "${this.what}" with value "${this.value}" was ignored.`;
                } else {
                    summary = `Modifier "${this.what}" was ignored.`;
                }
                break;
            case TypesOfWhat.className:
                    summary = `Class "${this.what}" was ignored.`;
                break;
        }
        return summary;
    }

}
