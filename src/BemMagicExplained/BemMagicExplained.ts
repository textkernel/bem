import ActionExplanation from './ActionExplanation';
import { ClassNames } from '../types';

type BemMagicExplainedArgs = {
    block: string;
    elems?: string[];
    classNames: ClassNames;
    isEnabled: boolean;
}

export default class BemMagicExplained {
    /* eslint-disable no-console */

    private readonly block: string;

    private readonly elems: string[];

    private readonly classNames: ClassNames;

    private readonly isEnabled: boolean;

    private explanationsApplied: ActionExplanation[] = [];

    private explanationsIgnored: ActionExplanation[] = [];

    private result: string = '';

    public constructor({
        block, elems = [], classNames, isEnabled,
    }: BemMagicExplainedArgs) {
        this.block = block;
        this.elems = elems;
        this.classNames = classNames;
        this.isEnabled = isEnabled;
    }

    public applies(baseName: string): ActionExplanation {
        const explanation = new ActionExplanation(baseName, ActionExplanation.action.applied);
        this.explanationsApplied.push(explanation);
        return explanation;
    }

    public ignores(baseName: string): ActionExplanation {
        const explanation = new ActionExplanation(baseName, ActionExplanation.action.ignored);
        this.explanationsIgnored.push(explanation);
        return explanation;
    }

    public thatsWhatWeHave(result: string): void {
        this.result = result;
    }

    public explain(): void {
        if (this.isEnabled === false) return;
        let groupTitle = '';
        if (this.elems.length > 0) {
            const elemNames = BemMagicExplained.stringifyArrayOfStrings(this.elems);
            groupTitle = `BEM magic explained for block: "${this.block}", elem(s): ${elemNames}`;
        } else {
            groupTitle = `BEM magic explained for block: "${this.block}"`;
        }
        this.groupTogether(
            groupTitle,
            this.printClassNamesInfo,
            this.printAppliedExplanations,
            this.printIgnoredExplanations,
            this.printOutput,
        );
    }

    private printClassNamesInfo(): void {
        console.groupCollapsed();
        console.log('Class names lookup table:');
        console.table(this.classNames);
        console.groupEnd();
    }

    private groupTogether(groupTitle: string, ...printFunctions: (() => void)[]): void {
        console.group(groupTitle);
        printFunctions.forEach(
            (printFunction): void => printFunction.call(this),
        );
        console.groupEnd();
    }

    private printAppliedExplanations(): void {
        if (this.explanationsApplied.length > 0) {
            console.log('Applied:');
            const explanationsAppliedTableData = this.explanationsApplied
                .map((explanation): unknown => ({
                    'Block or element': explanation.contextSummary,
                    'What happened': explanation.actionSummary,
                    'Why?': explanation.reasonSummary,
                    'Class name': explanation.resultSummary,
                }));
            console.table(explanationsAppliedTableData);
        } else {
            console.log('Nothing was applied');
        }
    }

    private printIgnoredExplanations(): void {
        if (this.explanationsIgnored.length > 0) {
            console.log('Ignored:');
            const explanationsIgnoredTableData = this.explanationsIgnored
                .map((explanation): unknown => ({
                    'Block or element': explanation.contextSummary,
                    'What happened': explanation.actionSummary,
                    'Why?': explanation.reasonSummary,
                }));
            console.table(explanationsIgnoredTableData);
        } else {
            console.log('Nothing was ignored');
        }
    }

    private printOutput(): void {
        if (this.result) {
            console.log('After all, the following class names were applied:');
            console.table(this.result.split(' '));
        }
    }

    private static stringifyArrayOfStrings(values: string[]): string {
        if (values.length === 0) return '';
        return values.map((value): string => `"${value}"`).join(', ');
    }
}
