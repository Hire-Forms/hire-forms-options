import * as React from 'react';
import Option from './option';
import { sortValues } from './sort';

export interface IKeyValue {
	key: string | number;
	value: string;
}

interface IProps {
	highlightClass: string;
	onSelect?: (option: IKeyValue) => void;
	query: string;
	sortOn: string;
	value: IKeyValue;
	values: IKeyValue[];
}

interface IState {
	activeIndex: number;
	values: IKeyValue[];
}

class Options extends React.Component<IProps, IState> {
	public state: IState = {
		activeIndex: null,
		values: this.props.values,
	};


	public static defaultProps: IProps = {
		highlightClass: 'highlight',
		query: '',
		sortOn: null,
		value: { key: '', value: '' },
		values: [],
	};

	componentWillMount() {
		this.setState({ values: sortValues(this.props) });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ values: sortValues(nextProps) });
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

	select = () => {
		if (this.state.activeIndex == null) return;
		this.props.onSelect(this.state.values[this.state.activeIndex]);
	}

	render() {
		if (this.state.values.length === 0 && this.props.children == null) {
			return null;
		}

		const listitems = this.state.values.map((optionData, index) =>
			<Option
				{...this.props}
				active={this.state.activeIndex === index}
				key={index}
				optionData={optionData}
				onClick={
					() => this.setState(
						{ activeIndex: index }, // When an option is clicked, the activeIndex is set
						() => this.select() // After setting the activeIndex, this.select is called
					)
				}
			/>
		);

		const children = this.props.children != null ?
			<li className="children">{this.props.children}</li> :
			null;

		return (
			<ul
				className="hire-options"
			  ref={(node: HTMLElement) => {
			    if (node != null) {
						node.style.zIndex = '1000';
					}
			  }}
			>
				{children}
				{listitems}
			</ul>
		);
	}
}


// Options.propTypes = {
// 	children: React.PropTypes.node,
// 	highlightClass: React.PropTypes.string,
// 	onSelect: React.PropTypes.func.isRequired,
// 	optionComponent: React.PropTypes.func,
// 	query: React.PropTypes.string,
// 	sortOn: React.PropTypes.oneOf([null, 'alphabet', 'relevance']),
// 	value: keyValueMapOrArrayOfKeyValueMaps,
// 	values: arrayOfKeyValueMaps,
// };

export default Options;
