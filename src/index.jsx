import React from 'react';
import Option from './option';
import { sortValues } from './sort';
import { keyValueMapOrArrayOfKeyValueMaps, arrayOfKeyValueMaps } from 'hire-forms-prop-types';

class Options extends React.Component {
	state = {
		activeIndex: null,
		values: this.props.values,
	}

	componentWillMount() {
		this.setState({ values: sortValues(this.props) });
	}

	componentDidMount() {
		const node = this.refs.options;
		if (node) node.style.zIndex = 1000;
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ values: sortValues(nextProps) });
	}

	componentWillUnmount() {
		const node = this.refs.options;
		if (node) node.style.zIndex = 0;
	}

	highlightPrev() {
		let activeIndex = this.state.activeIndex == null ?
			-1 :
			this.state.activeIndex - 1;

		if (activeIndex === -1) {
			activeIndex = this.state.values.length - 1;
		}

		this.setState({ activeIndex });
	}

	highlightNext() {
		let activeIndex = this.state.activeIndex == null ?
			0 :
			this.state.activeIndex + 1;

		if (activeIndex === this.state.values.length) {
			activeIndex = 0;
		}

		this.setState({ activeIndex });
	}

	select() {
		if (this.state.activeIndex == null) return;
		this.props.onSelect(this.state.values[this.state.activeIndex]);
	}


	render() {
		if (this.state.values.length === 0 && this.props.children == null) {
			return null;
		}

		const listitems = this.state.values.map((data, index) =>
			<Option
				{...this.props}
				active={this.state.activeIndex === index}
				optionData={data}
				key={index}
			/>
		);

		const children = this.props.children != null ?
			<li className="children">{this.props.children}</li> :
			null;

		return (
			<ul
				className="hire-options"
				ref="options"
			>
				{children}
				{listitems}
			</ul>
		);
	}
}

Options.defaultProps = {
	highlightClass: 'highlight',
	query: '',
	sortOn: null,
	value: { key: '', value: '' },
	values: [],
};


Options.propTypes = {
	children: React.PropTypes.node,
	highlightClass: React.PropTypes.string,
	onSelect: React.PropTypes.func.isRequired,
	optionComponent: React.PropTypes.func,
	query: React.PropTypes.string,
	sortOn: React.PropTypes.oneOf([null, 'alphabet', 'relevance']),
	value: keyValueMapOrArrayOfKeyValueMaps,
	values: arrayOfKeyValueMaps,
};

export default Options;
