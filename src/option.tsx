import * as React from 'react';
import * as cx from 'classnames';
import { IOptionComponentProps, ICommonOptionComponentProps } from "./index";

interface IProps extends ICommonOptionComponentProps {
	highlightClass?: string;
	optionComponent?: React.StatelessComponent<IOptionComponentProps>;
	query?: string;
}

export default (props: IProps) => {
	const { active, highlightClass, onClick, optionComponent, optionData, query } = props;

	const displayValue = (query.length) ?
		optionData.value.replace(
			(new RegExp(query, 'ig')),
			`<span class="${highlightClass}">$&</span>`
		) :
		optionData.value;

	return (optionComponent != null) ?
		<props.optionComponent
			active={active}
			displayValue={displayValue}
			onClick={onClick}
		  optionData={optionData}
		/> :
		<li
			className={cx(
				'hire-forms-option',
				{ highlight: active }
			)}
			dangerouslySetInnerHTML={{ __html: displayValue }}
			onClick={onClick}
		/>;
}
