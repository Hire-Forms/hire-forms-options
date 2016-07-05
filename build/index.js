(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HireFormsOptions = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = _dereq_("react");

var _react2 = _interopRequireDefault(_react);

var keyValueMap = _react2["default"].PropTypes.shape({
	key: _react2["default"].PropTypes.string.isRequired,
	value: _react2["default"].PropTypes.string.isRequired
});

exports.keyValueMap = keyValueMap;
// ARRAY OF

var arrayOfKeyValueMaps = _react2["default"].PropTypes.arrayOf(keyValueMap);

exports.arrayOfKeyValueMaps = arrayOfKeyValueMaps;
var arrayOfStrings = _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.string);

exports.arrayOfStrings = arrayOfStrings;
var arrayOfElements = _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.element);

exports.arrayOfElements = arrayOfElements;
// OR

var stringOrArray = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, _react2["default"].PropTypes.array]);

exports.stringOrArray = stringOrArray;
var stringOrKeyValueMap = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, keyValueMap]);

exports.stringOrKeyValueMap = stringOrKeyValueMap;
var stringOrArrayOfStrings = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.string, arrayOfStrings]);

exports.stringOrArrayOfStrings = stringOrArrayOfStrings;
var elementOrArrayOfElement = _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.element, arrayOfElements]);

exports.elementOrArrayOfElement = elementOrArrayOfElement;
var arrayOfStringsOrArrayOfKeyValueMaps = _react2["default"].PropTypes.oneOfType([arrayOfStrings, arrayOfKeyValueMaps]);

exports.arrayOfStringsOrArrayOfKeyValueMaps = arrayOfStringsOrArrayOfKeyValueMaps;
var keyValueMapOrArrayOfKeyValueMaps = _react2["default"].PropTypes.oneOfType([keyValueMap, arrayOfKeyValueMaps]);
exports.keyValueMapOrArrayOfKeyValueMaps = keyValueMapOrArrayOfKeyValueMaps;

},{"react":"react"}],2:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_('react');

var _react2 = _interopRequireDefault(_react);

var _option = _dereq_('./option');

var _option2 = _interopRequireDefault(_option);

var _sort = _dereq_('./sort');

var _hireFormsPropTypes = _dereq_('hire-forms-prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Options = function (_React$Component) {
	_inherits(Options, _React$Component);

	function Options() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Options);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Options)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			activeIndex: null,
			values: _this.props.values
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Options, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setState({ values: (0, _sort.sortValues)(this.props) });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var node = this.refs.options;
			if (node) node.style.zIndex = 1000;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({ values: (0, _sort.sortValues)(nextProps) });
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var node = this.refs.options;
			if (node) node.style.zIndex = 0;
		}
	}, {
		key: 'highlightPrev',
		value: function highlightPrev() {
			var activeIndex = this.state.activeIndex == null ? -1 : this.state.activeIndex - 1;

			if (activeIndex === -1) {
				activeIndex = this.state.values.length - 1;
			}

			this.setState({ activeIndex: activeIndex });
		}
	}, {
		key: 'highlightNext',
		value: function highlightNext() {
			var activeIndex = this.state.activeIndex == null ? 0 : this.state.activeIndex + 1;

			if (activeIndex === this.state.values.length) {
				activeIndex = 0;
			}

			this.setState({ activeIndex: activeIndex });
		}
	}, {
		key: 'select',
		value: function select() {
			if (this.state.activeIndex == null) return;
			this.props.onSelect(this.state.values[this.state.activeIndex]);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			if (this.state.values.length === 0 && this.props.children == null) {
				return null;
			}

			var listitems = this.state.values.map(function (data, index) {
				return _react2.default.createElement(_option2.default, _extends({}, _this2.props, {
					active: _this2.state.activeIndex === index,
					optionData: data,
					key: index
				}));
			});

			var children = this.props.children != null ? _react2.default.createElement(
				'li',
				{ className: 'children' },
				this.props.children
			) : null;

			return _react2.default.createElement(
				'ul',
				{
					className: 'hire-options',
					ref: 'options'
				},
				children,
				listitems
			);
		}
	}]);

	return Options;
}(_react2.default.Component);

Options.defaultProps = {
	highlightClass: 'highlight',
	query: '',
	sortOn: null,
	value: { key: '', value: '' },
	values: []
};

Options.propTypes = {
	children: _react2.default.PropTypes.node,
	highlightClass: _react2.default.PropTypes.string,
	onSelect: _react2.default.PropTypes.func.isRequired,
	optionComponent: _react2.default.PropTypes.func,
	query: _react2.default.PropTypes.string,
	sortOn: _react2.default.PropTypes.oneOf([null, 'alphabet', 'relevance']),
	value: _hireFormsPropTypes.keyValueMapOrArrayOfKeyValueMaps,
	values: _hireFormsPropTypes.arrayOfKeyValueMaps
};

exports.default = Options;

},{"./option":3,"./sort":4,"hire-forms-prop-types":1,"react":"react"}],3:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = _dereq_('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = _dereq_('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = function (_Component) {
	_inherits(Option, _Component);

	function Option() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Option);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Option)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function () /* ev */{
			_this.props.onSelect({
				key: _this.props.optionData.key,
				value: _this.props.optionData.value
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Option, [{
		key: 'render',
		value: function render() {
			var displayValue = this.props.optionData.value;

			if (this.props.query.length) {
				var re = new RegExp(this.props.query, 'ig');
				displayValue = this.props.optionData.value.replace(re, '<span class="' + this.props.highlightClass + '">$&</span>');
			}

			var option = this.props.optionComponent != null ? _react2.default.createElement(this.props.optionComponent, _extends({}, this.props, {
				displayValue: displayValue,
				onClick: this.handleClick
			})) : _react2.default.createElement('li', {
				className: (0, _classnames2.default)('hire-forms-option', { highlight: this.props.active }),
				dangerouslySetInnerHTML: { __html: displayValue },
				onClick: this.handleClick
			});

			return option;
		}
	}]);

	return Option;
}(_react.Component);

exports.default = Option;


Option.propTypes = {
	active: _react.PropTypes.bool,
	highlightClass: _react.PropTypes.string,
	optionComponent: _react.PropTypes.func,
	optionData: _react.PropTypes.object,
	onSelect: _react.PropTypes.func,
	query: _react.PropTypes.string,
	value: _react.PropTypes.object
};

},{"classnames":"classnames","react":"react"}],4:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Sort values on relevance. A result is more relevant when the search
 * query is more at the beginning of the string. In other words:
 * String.indexOf(props.query): lower is better.
 * @param {Array<Object>} value An array of key/value maps
 * @param {String} query A search query
 * @returns {Array<Object>} Sorted values on relevance
 */
var sortOnRelevance = function sortOnRelevance(values, query) {
	return values.sort(function (a, b) {
		a = a.value.toLowerCase();
		b = b.value.toLowerCase();

		var indexA = a.indexOf(query);
		var indexB = b.indexOf(query);

		if (indexA > indexB) return 1;
		if (indexA < indexB) return -1;
		if (indexA === indexB) {
			if (a > b) return 1;
			if (a < b) return -1;
		}

		return 0;
	});
};

var sortOnAlphabet = function sortOnAlphabet(a, b) {
	a = a.value.toLowerCase();
	b = b.value.toLowerCase();

	if (a > b) return 1;else if (a < b) return -1;

	return 0;
};

var sortValues = exports.sortValues = function sortValues(_ref) {
	var query = _ref.query;
	var sortOn = _ref.sortOn;
	var values = _ref.values;

	var sortedValues = values;

	if (sortOn === 'alphabet') {
		sortedValues = sortedValues.sort(sortOnAlphabet);
	} else if (sortOn === 'relevance') {
		sortedValues = sortOnRelevance(sortedValues, query);
	}

	return sortedValues;
};

},{}]},{},[2])(2)
});