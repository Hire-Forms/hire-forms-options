"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require('react');
const cx = require('classnames');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (props) => {
    let displayValue = props.optionData.value;
    if (props.query.length) {
        const re = new RegExp(props.query, 'ig');
        displayValue = props.optionData.value.replace(re, `<span class="${props.highlightClass}">$&</span>`);
    }
    return (props.optionComponent != null) ?
        React.createElement(props.optionComponent, __assign({}, props, {displayValue: displayValue, onClick: props.onClick})) :
        React.createElement("li", {className: cx('hire-forms-option', { highlight: props.active }), dangerouslySetInnerHTML: { __html: displayValue }, onClick: props.onClick});
};
