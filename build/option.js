"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cx = require("classnames");
exports.default = (props) => {
    const { active, highlightClass, onClick, optionComponent, optionData, query } = props;
    const displayValue = (query.length) ?
        optionData.value.replace((new RegExp(query, 'ig')), `<span class="${highlightClass}">$&</span>`) :
        optionData.value;
    return (optionComponent != null) ?
        React.createElement(props.optionComponent, { active: active, displayValue: displayValue, onClick: onClick, optionData: optionData }) :
        React.createElement("li", { className: cx('hire-forms-option', { highlight: active }), dangerouslySetInnerHTML: { __html: displayValue }, onClick: onClick });
};
