/// <reference types="react" />
import * as React from 'react';
export interface IKeyValue {
    key: string | number;
    value: string;
}
export interface IProps {
    highlightClass?: string;
    onSelect?: (option: IKeyValue) => void;
    optionComponent?: React.StatelessComponent<IOptionComponentProps>;
    query?: string;
    sortOn?: SortTypes;
    value?: IKeyValue;
    values?: IKeyValue[];
}
export interface IState {
    activeIndex: number;
    values: IKeyValue[];
}
declare class Options extends React.Component<IProps, IState> {
    state: IState;
    static defaultProps: Partial<IProps>;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    highlightPrev(): void;
    highlightNext(): void;
    select: () => void;
    render(): JSX.Element;
}
export interface ICommonOptionComponentProps {
    active: boolean;
    onClick: () => void;
    optionData: IKeyValue;
}
export interface IOptionComponentProps extends ICommonOptionComponentProps {
    displayValue: string;
}
export declare type SortTypes = 'alphabet' | 'relevance';
export default Options;
