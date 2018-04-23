/// <reference types="react" />
import * as React from 'react';
import { IOptionComponentProps, ICommonOptionComponentProps } from "./index";
export interface IProps extends ICommonOptionComponentProps {
    highlightClass?: string;
    optionComponent?: React.StatelessComponent<IOptionComponentProps>;
    query?: string;
}
declare const _default: (props: IProps) => JSX.Element;
export default _default;
