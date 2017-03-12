"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cx = require("classnames");
exports.default = (props) => {
    let displayValue = props.optionData.value;
    if (props.query.length) {
        const re = new RegExp(props.query, 'ig');
        displayValue = props.optionData.value.replace(re, `<span class="${props.highlightClass}">$&</span>`);
    }
    return (props.optionComponent != null) ?
        React.createElement(props.optionComponent, Object.assign({}, props, { displayValue: displayValue, onClick: props.onClick })) :
        React.createElement("li", { className: cx('hire-forms-option', { highlight: props.active }), dangerouslySetInnerHTML: { __html: displayValue }, onClick: props.onClick });
};
