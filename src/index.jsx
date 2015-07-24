// TODO move listitem to seperate component (so we don't have to store data-key and data-value as attributes)
// Move util functions to seperate module

import React from "react";
import cx from "classnames";

import {keyValueMapOrArrayOfKeyValueMaps, arrayOfKeyValueMaps} from "hire-forms-prop-types";
import {castArray} from "hire-forms-utils";

/**
 * Options are rendered beneath the autocomplete and select components.
 *
 * @class
 * @extends React.Component
 */
class Options extends React.Component {
	componentDidMount() {
		let node = React.findDOMNode(this);

		if (node) {
			node.style.zIndex = 1000;
		}
	}

	componentWillUnmount() {
		let node = React.findDOMNode(this);
		node.style.zIndex = 0;
	}

	/**
	 * Sort values on relevance. A result is more relevant when the search
	 * query is more at the beginning of the string. In other words:
	 * String.indexOf(props.query): lower is better.
	 * @param {Array<Object>} value An array of key/value maps
	 * @param {String} query A search query
	 * @returns {Array<Object>} Sorted values on relevance
	 */
	sortRelevance(values, query) {
		return values.sort((a, b) => {
			a = a.value.toLowerCase();
			b = b.value.toLowerCase();

			let indexA = a.indexOf(query);
			let indexB = b.indexOf(query);

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

	/*
	 * highlight the currently highlighted option.
	 *
	 * @param {Object} target An HTMLElement or event object
	 * @param {String} className Name of the highlight class
	 */
	highlight(target, className) {
		// Check if target is an event object.
		if (target.hasOwnProperty("currentTarget")) {
			target = target.currentTarget;
		}

		target.classList.add(className);
	}

	/**
	 * Unhighlight the currently highlighted option.
	 *
	 * @param {String} className Name of the highlight class
	 * @return {Object} The unhighlighted HTMLElement
	 */
	unhighlight(className) {
		let el;
		let node = React.findDOMNode(this);

		if (node) {
			el = node.querySelector(`li.${className}`);

			if (el) {
				el.classList.remove(className);
			}
		}

		return el;
	}

	handleClick(ev) {
		this.props.onChange(this.getOptionData(ev.currentTarget));
	}

	highlightPrev() {
		let prev;
		let current = this.unhighlight(this.props.highlightClass);

		if (current) {
			prev = current.previousElementSibling;
		}

		// If current and prev aren't found, start at the top.
		// Current is not found if there is no list item highlighted.
		// Prev is not found if the first list item is highlighted.
		if (!prev) {
			prev = React.findDOMNode(this).lastChild;
		}

		this.highlight(prev, this.props.highlightClass);
	}


	highlightNext() {
		let next;
		let current = this.unhighlight(this.props.highlightClass);

		if (current) {
			next = current.nextElementSibling;
		}

		// If current and next aren't found, start at the top.
		// Current is not found if there is no list item highlighted.
		// Next is not found if the last list item is highlighted.
		if (!next) {
			next = React.findDOMNode(this).firstChild;
		}

		this.highlight(next, this.props.highlightClass);
	}

	select() {
		let current = this.unhighlight(this.props.highlightClass);

		if (current) {
			this.props.onChange(this.getOptionData(current));
		}
	}

	/**
	 * Get the key (id) and value (display name) of an option DOM element.
	 *
	 * @param {Object} el - Option DOM element
	 * @returns {Object}
	 */
	getOptionData(el) {
		return {
			key: el.getAttribute("data-key"),
			value: el.getAttribute("data-value")
		};
	}

	render() {
		if (this.props.values.length === 0) {
			return null;
		}

		let values = (this.props.sortRelevance && (this.props.query !== "")) ?
			this.sortRelevance(this.props.values, this.props.querySelector) :
			this.props.values;

		let listitems = values.map((data, index) => {
			let displayValue = data.value;

			if (this.props.query.length) {
				let re = new RegExp(this.props.query, "ig");
				displayValue = data.value.replace(re, "<span class=\"highlight\">$&</span>");
			}

			let selectedValue = castArray(this.props.value)

			return (
				<li
					className={cx({selected: selectedValue.indexOf(data.value) > -1})}
					dangerouslySetInnerHTML={{__html: displayValue}}
					data-key={data.key}
					data-value={data.value}
					key={index}
					onClick={this.handleClick.bind(this)}
					onMouseEnter={this.highlight.bind(this)}
					onMouseLeave={this.unhighlight.bind(this)}>
				</li>
			);
		});

		return (
			<ul
				className="hire-options">
				{listitems}
			</ul>
		);
	}
}

Options.defaultProps = {
	highlightClass: "highlight",
	query: "",
	sortRelevance: true,
	value: {key: "", value: ""},
	values: []
};


Options.propTypes = {
	highlightClass: React.PropTypes.string,
	onChange: React.PropTypes.func.isRequired,
	query: React.PropTypes.string,
	sortRelevance: React.PropTypes.bool,
	value: keyValueMapOrArrayOfKeyValueMaps,
	values: arrayOfKeyValueMaps
};

export default Options;
