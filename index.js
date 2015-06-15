"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _hireFormsPropTypes = require("hire-forms-prop-types");

var HIGHTLIGHT_CLASS = "highlight";

/**
 * Options are rendered beneath the autocomplete and select components.
 *
 * @class
 * @extends React.Component
 */

var Options = (function (_React$Component) {
	function Options() {
		_classCallCheck(this, Options);

		if (_React$Component != null) {
			_React$Component.apply(this, arguments);
		}
	}

	_inherits(Options, _React$Component);

	_createClass(Options, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var node = _react2["default"].findDOMNode(this);

			if (node) {
				node.style.zIndex = 1000;
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			var node = _react2["default"].findDOMNode(this);
			node.style.zIndex = 0;
		}
	}, {
		key: "sortRelevance",

		/**
   * Sort props.values on relevance. A result is more relevant
   * when the search query is more at the beginning of the string.
   * String.indexOf(props.query): lower is better.
   *
   * @returns {Array<String>} Sorted values on relevance
   */
		value: function sortRelevance(values) {
			var _this = this;

			return values.sort(function (a, b) {
				a = a.value.toLowerCase();
				b = b.value.toLowerCase();

				var indexA = a.indexOf(_this.props.query);
				var indexB = b.indexOf(_this.props.query);

				if (indexA > indexB) {
					return 1;
				}

				if (indexA < indexB) {
					return -1;
				}

				if (indexA === indexB) {
					if (a > b) {
						return 1;
					}

					if (a < b) {
						return -1;
					}
				}

				return 0;
			});
		}
	}, {
		key: "highlight",
		value: function highlight(target) {
			// Check if target is an event object.
			if (target.hasOwnProperty("currentTarget")) {
				target = target.currentTarget;
			}

			target.classList.add(HIGHTLIGHT_CLASS);
		}
	}, {
		key: "unhighlight",

		/**
   * Unhighlight the currently highlighted option.
   *
   *
   */
		value: function unhighlight() {
			var el = undefined;
			var node = _react2["default"].findDOMNode(this);

			if (node) {
				el = node.querySelector("li.highlight");

				if (el) {
					el.classList.remove(HIGHTLIGHT_CLASS);
				}
			}

			return el;
		}
	}, {
		key: "handleClick",
		value: function handleClick(ev) {
			this.props.onChange(this.getOptionData(ev.currentTarget));
		}
	}, {
		key: "highlightPrev",
		value: function highlightPrev() {
			var prev = undefined;
			var current = this.unhighlight();

			if (current) {
				prev = current.previousElementSibling;
			}

			// If current and prev aren't found, start at the top.
			// Current is not found if there is no list item highlighted.
			// Prev is not found if the first list item is highlighted.
			if (!prev) {
				prev = _react2["default"].findDOMNode(this).lastChild;
			}

			this.highlight(prev);
		}
	}, {
		key: "highlightNext",
		value: function highlightNext() {
			var next = undefined;
			var current = this.unhighlight();

			if (current) {
				next = current.nextElementSibling;
			}

			// If current and next aren't found, start at the top.
			// Current is not found if there is no list item highlighted.
			// Next is not found if the last list item is highlighted.
			if (!next) {
				next = _react2["default"].findDOMNode(this).firstChild;
			}

			this.highlight(next);
		}
	}, {
		key: "select",
		value: function select() {
			var current = this.unhighlight();

			if (current) {
				this.props.onChange(this.getOptionData(current));
			}
		}
	}, {
		key: "getOptionData",

		/**
   * Get the key (id) and value (display name) of an option DOM element.
   *
   * @param {Object} el - Option DOM element
   * @returns {Object}
   */
		value: function getOptionData(el) {
			return {
				key: el.getAttribute("data-key"),
				value: el.getAttribute("data-value")
			};
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			if (this.props.values.length === 0) {
				return null;
			}

			var values = this.props.sortRelevance ? this.sortRelevance(this.props.values) : this.props.values;

			var listitems = values.map(function (data, index) {
				var displayValue = data.value;

				if (_this2.props.query.length) {
					var re = new RegExp(_this2.props.query, "ig");
					displayValue = data.value.replace(re, "<span class=\"highlight\">$&</span>");
				}

				var selectedValue = Array.isArray(_this2.props.value) ? _this2.props.value : [_this2.props.value];

				return _react2["default"].createElement("li", {
					className: (0, _classnames2["default"])({ selected: selectedValue.indexOf(data.value) > -1 }),
					dangerouslySetInnerHTML: { __html: displayValue },
					"data-key": data.key,
					"data-value": data.value,
					key: index,
					onClick: _this2.handleClick.bind(_this2),
					onMouseEnter: _this2.highlight.bind(_this2),
					onMouseLeave: _this2.unhighlight.bind(_this2) });
			});

			return _react2["default"].createElement(
				"ul",
				{
					className: "hire-options" },
				listitems
			);
		}
	}]);

	return Options;
})(_react2["default"].Component);

Options.defaultProps = {
	query: "",
	sortRelevance: true,
	value: "",
	values: []
};

Options.propTypes = {
	onChange: _react2["default"].PropTypes.func.isRequired,
	query: _react2["default"].PropTypes.string,
	sortRelevance: _react2["default"].PropTypes.bool,
	value: _hireFormsPropTypes.stringOrArrayOfString,
	values: _hireFormsPropTypes.arrayOfKeyValue
};

exports["default"] = Options;
module.exports = exports["default"];
