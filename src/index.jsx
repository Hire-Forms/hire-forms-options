/*
TODO move listitem to seperate component (so we don't have to store data-key
and data-value as attributes)
TODO Move util functions to seperate module
*/

import React from 'react';
import cx from 'classnames';

import { keyValueMapOrArrayOfKeyValueMaps, arrayOfKeyValueMaps } from 'hire-forms-prop-types';
import { castArray } from 'hire-forms-utils';

const hasKeyValue = (list, item) =>
	list.filter((li) => li.key === item.key).length > 0;

/**
 * Options are rendered beneath the autocomplete and select components.
 *
 * @class
 * @extends React.Component
 */
class Options extends React.Component {
	componentDidMount() {
		const node = this.refs.options;

		if (node) {
			node.style.zIndex = 1000;
		}
	}

	componentWillUnmount() {
		const node = this.refs.options;
		if (node) {
			node.style.zIndex = 0;
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
			key: el.getAttribute('data-key'),
			value: el.getAttribute('data-value'),
		};
	}

	handleClick = (ev) => {
		this.props.onChange(this.getOptionData(ev.currentTarget));
	}

	/*
	 * highlight the currently highlighted option.
	 *
	 * @param {Object} target An HTMLElement or event object
	 * @param {String} className Name of the highlight class
	 */
	highlight(target, className) {
		// Check if target is an event object.
		if (target.hasOwnProperty('currentTarget')) {
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
		const node = this.refs.options;

		if (node) {
			el = node.querySelector(`li.${className}`);

			if (el) {
				el.classList.remove(className);
			}
		}

		return el;
	}

	highlightPrev() {
		let prev;
		const current = this.unhighlight(this.props.highlightClass);

		if (current) {
			prev = current.previousElementSibling;
		}

		// If current and prev aren't found, start at the top.
		// Current is not found if there is no list item highlighted.
		// Prev is not found if the first list item is highlighted.
		if (!prev) {
			prev = this.refs.options.lastChild;
		}

		this.highlight(prev, this.props.highlightClass);
	}

	highlightNext() {
		let next;
		const current = this.unhighlight(this.props.highlightClass);

		if (current) {
			next = current.nextElementSibling;
		}

		// If current and next aren't found, start at the top.
		// Current is not found if there is no list item highlighted.
		// Next is not found if the last list item is highlighted.
		if (!next) {
			next = this.refs.options.firstChild;
		}

		this.highlight(next, this.props.highlightClass);
	}

	select() {
		const current = this.unhighlight(this.props.highlightClass);

		if (current) {
			this.props.onChange(this.getOptionData(current));
		}
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

			const indexA = a.indexOf(query);
			const indexB = b.indexOf(query);

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

	render() {
		if (this.props.values.length === 0 && this.props.children == null) {
			return null;
		}

		const values = (
				this.props.sort ||
				(this.props.sortRelevance && (this.props.query !== ''))
			) ?
			this.sortRelevance(this.props.values, this.props.querySelector) :
			this.props.values;

		const listitems = values.map((data, index) => {
			let displayValue = data.value;

			if (this.props.query.length) {
				const re = new RegExp(this.props.query, 'ig');
				displayValue = data.value.replace(re, '<span class="highlight">$&</span>');
			}

			return (
				<li
					className={cx({
						'hire-forms-option': true,
						selected: hasKeyValue(castArray(this.props.value), data),
					})}
					dangerouslySetInnerHTML={{ __html: displayValue }}
					data-key={data.key}
					data-value={data.value}
					key={index}
					onClick={this.handleClick}
				>
				</li>
			);
		});

		const children = this.props.children != null ?
			<li>{this.props.children}</li> :
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
	sort: false,
	sortRelevance: true,
	value: { key: '', value: '' },
	values: [],
};


Options.propTypes = {
	children: React.PropTypes.node,
	highlightClass: React.PropTypes.string,
	onChange: React.PropTypes.func.isRequired,
	query: React.PropTypes.string,
	querySelector: React.PropTypes.string,
	sort: React.PropTypes.bool,
	sortRelevance: React.PropTypes.bool,
	value: keyValueMapOrArrayOfKeyValueMaps,
	values: arrayOfKeyValueMaps,
};

export default Options;
