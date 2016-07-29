import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class Option extends Component {
	render() {
		let displayValue = this.props.optionData.value;

		if (this.props.query.length) {
			const re = new RegExp(this.props.query, 'ig');
			displayValue = this.props.optionData.value.replace(
				re,
				`<span class="${this.props.highlightClass}">$&</span>`
			);
		}

		const option = (this.props.optionComponent != null) ?
			<this.props.optionComponent
				{...this.props}
				displayValue={displayValue}
				onClick={this.props.onClick}
			/> :
			<li
				className={cx(
					'hire-forms-option',
					{ highlight: this.props.active }
				)}
				dangerouslySetInnerHTML={{ __html: displayValue }}
				onClick={this.props.onClick}
			/>;

		return option;
	}
}

Option.propTypes = {
	active: PropTypes.bool,
	highlightClass: PropTypes.string,
	optionComponent: PropTypes.func,
	optionData: PropTypes.object,
	onClick: PropTypes.func,
	query: PropTypes.string,
	value: PropTypes.object,
};
