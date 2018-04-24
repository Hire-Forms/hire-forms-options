"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const option_1 = require("./option");
const sort_1 = require("./sort");
class Options extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            activeIndex: null,
            values: this.props.values,
        };
        this.select = () => {
            if (this.state.activeIndex == null)
                return;
            this.props.onSelect(this.state.values[this.state.activeIndex]);
        };
    }
    componentWillMount() {
        const { query, sortOn, values } = this.props;
        this.setState({ values: sort_1.sortValues(query, sortOn, values) });
    }
    componentWillReceiveProps(nextProps) {
        const { query, sortOn, values } = nextProps;
        this.setState({ values: sort_1.sortValues(query, sortOn, values) });
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
    render() {
        if (this.state.values.length === 0 && this.props.children == null) {
            return null;
        }
        const listitems = this.state.values.map((optionData, index) => React.createElement(option_1.default, Object.assign({}, this.props, { active: this.state.activeIndex === index, key: index, optionData: optionData, onClick: () => {
                this.setState({ activeIndex: index }, () => this.select());
            } })));
        const children = this.props.children != null ?
            React.createElement("li", { className: "children" }, this.props.children) :
            null;
        return (React.createElement("ul", { className: "hire-options", ref: (node) => {
                if (node != null) {
                    node.style.zIndex = '1000';
                }
            } },
            children,
            listitems));
    }
}
Options.defaultProps = {
    highlightClass: 'highlight',
    query: '',
    value: { key: '', value: '' },
    values: [],
};
exports.default = Options;
