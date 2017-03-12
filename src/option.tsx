import * as React from 'react';
import * as cx from 'classnames';
import {IKeyValue} from "./index";

interface IProps {
	active: boolean;
	highlightClass: string;
	onClick: () => void;
	optionComponent?: any;
	optionData: IKeyValue;
	query: string;
}

export default (props: IProps) => {
	let displayValue = props.optionData.value;

	if (props.query.length) {
		const re = new RegExp(props.query, 'ig');
		displayValue = props.optionData.value.replace(
			re,
			`<span class="${props.highlightClass}">$&</span>`
		);
	}

	return (props.optionComponent != null) ?
		<props.optionComponent
			{...props}
			displayValue={displayValue}
			onClick={props.onClick}
		/> :
		<li
			className={cx(
				'hire-forms-option',
				{ highlight: props.active }
			)}
			dangerouslySetInnerHTML={{ __html: displayValue }}
			onClick={props.onClick}
		/>;
}
