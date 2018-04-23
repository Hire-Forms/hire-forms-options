import * as React from 'react';
import Option from './option';
import { sortValues } from './sort';

export interface IKeyValue {
	key: string | number;
	value: string;
}

export interface IProps {
	highlightClass?: string;
	onSelect?: (option: IKeyValue) => void;
	optionComponent?: React.StatelessComponent<IOptionComponentProps>;
	query?: string;
	sortOn?: string;
	value?: IKeyValue;
	values?: IKeyValue[];
}

export interface IState {
	activeIndex: number;
	values: IKeyValue[];
}

class Options extends React.Component<IProps, IState> {
	public state: IState = {
		activeIndex: null,
		values: this.props.values,
	};

	public static defaultProps: Partial<IProps> = {
		highlightClass: 'highlight',
		query: '',
		value: { key: '', value: '' },
		values: [],
	};

	componentWillMount() {
		const { query, sortOn, values} = this.props;
		this.setState({ values: sortValues(query, sortOn, values) });
	}

	componentWillReceiveProps(nextProps) {
		const { query, sortOn, values} = nextProps;
		this.setState({ values: sortValues(query, sortOn, values) });
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
	};

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
						() => this.select() // this.select uses the activeIndex to return the active value
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

export interface ICommonOptionComponentProps {
	active: boolean;
	onClick: () => void;
	optionData: IKeyValue;
}

export interface IOptionComponentProps extends ICommonOptionComponentProps {
	displayValue: string;
}

export default Options;
