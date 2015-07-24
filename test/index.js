var jsdom           = require("jsdom").jsdom
global.document     = jsdom('<html><body></body></html>' || '')
global.window       = document.defaultView
global.navigator    = window.navigator
global.HTMLElement  = window.HTMLElement

require("classlist-polyfill");

let React = require("react/addons");
let should = require("should");
let Options = require("../build");

let TestUtils = React.addons.TestUtils;

describe("Hire Forms Options", function() {
	it("Should be a ReactElement", function() {
		TestUtils.isElement(<Options onChange={function() {}} />).should.be.ok();
	});

	describe("Without values", function() {
		it("Should return null", function() {
			let renderedComponent = TestUtils.renderIntoDocument(
				<Options onChange={function() {}} />
			);

			let options = TestUtils.scryRenderedDOMComponentsWithClass(
				renderedComponent,
				'hire-options'
			);

			options.length.should.equal(0);
		});
	});

	describe("With (three) values", function() {
		let currentResponse, renderedComponent, listitems;

		beforeEach(function() {
			currentResponse = null;

			renderedComponent = TestUtils.renderIntoDocument(
				<Options
					onChange={(response) => currentResponse = response}
					values={[
						{"key": "A", "value": "Jaap"}, 
						{"key": "B", "value": "Schaap"}, 
						{"key": "C", "value": "Aap"}]} />
			);

			listitems = TestUtils.scryRenderedDOMComponentsWithTag(
				renderedComponent,
				'li'
			);
		});

		it("Should find three listitems", function() {
			listitems.length.should.equal(3);
		});

		// This also proves that without a query prop, the values order isn't changed.
		it("Should return the key/value map of the selected item", function() {
			TestUtils.Simulate.click(listitems[0]);
			should.deepEqual(currentResponse, {"key": "A", "value": "Jaap"});

			TestUtils.Simulate.click(listitems[1]);
			should.deepEqual(currentResponse, {"key": "B", "value": "Schaap"});

			TestUtils.Simulate.click(listitems[2]);
			should.deepEqual(currentResponse, {"key": "C", "value": "Aap"});
		});

		it("Should highlight next when highlighNext() is called", function() {
			renderedComponent.highlightNext();
			listitems[0].getDOMNode().className.should.equal("highlight");
			listitems[1].getDOMNode().className.should.equal("");
			listitems[2].getDOMNode().className.should.equal("");

			renderedComponent.highlightNext();
			listitems[0].getDOMNode().className.should.equal("");
			listitems[1].getDOMNode().className.should.equal("highlight");
			listitems[2].getDOMNode().className.should.equal("");

			renderedComponent.highlightNext();
			listitems[0].getDOMNode().className.should.equal("");
			listitems[1].getDOMNode().className.should.equal("");
			listitems[2].getDOMNode().className.should.equal("highlight");

			renderedComponent.highlightNext();
			listitems[0].getDOMNode().className.should.equal("highlight");
			listitems[1].getDOMNode().className.should.equal("");
			listitems[2].getDOMNode().className.should.equal("");
		});

		it("Should highlight previous when highlighPrevious() is called", function() {
			renderedComponent.highlightPrev();
			listitems[0].getDOMNode().className.should.equal("");
			listitems[1].getDOMNode().className.should.equal("");
			listitems[2].getDOMNode().className.should.equal("highlight");

			renderedComponent.highlightPrev();
			listitems[0].getDOMNode().className.should.equal("");
			listitems[1].getDOMNode().className.should.equal("highlight");
			listitems[2].getDOMNode().className.should.equal("");

			renderedComponent.highlightPrev();
			listitems[0].getDOMNode().className.should.equal("highlight");
			listitems[1].getDOMNode().className.should.equal("");
			listitems[2].getDOMNode().className.should.equal("");

			renderedComponent.highlightPrev();
			listitems[0].getDOMNode().className.should.equal("");
			listitems[1].getDOMNode().className.should.equal("");
			listitems[2].getDOMNode().className.should.equal("highlight");
		});
	});

	describe("With (three) values and a query", function() {
		let currentResponse, renderedComponent, listitems;

		beforeEach(function() {
			currentResponse = null;

			renderedComponent = TestUtils.renderIntoDocument(
				<Options
					onChange={(response) => currentResponse = response}
					query="aap"
					values={[
						{"key": "A", "value": "Jaap"}, 
						{"key": "B", "value": "Schaap"}, 
						{"key": "C", "value": "Aap"}]} />
			);

			listitems = TestUtils.scryRenderedDOMComponentsWithTag(
				renderedComponent,
				'li'
			);
		});

		it("Should sort on relevance when a query prop is given", function() {
			listitems[0].props["data-key"].should.equal("C");
			listitems[0].props["data-value"].should.equal("Aap");
			listitems[2].props["data-key"].should.equal("B");
			listitems[2].props["data-value"].should.equal("Schaap");
		});

		it("Should highlight the query string", function() {
			listitems[0].getDOMNode().innerHTML.should.equal("<span class=\"highlight\">Aap</span>");
			listitems[1].getDOMNode().innerHTML.should.equal("J<span class=\"highlight\">aap</span>");
			listitems[2].getDOMNode().innerHTML.should.equal("Sch<span class=\"highlight\">aap</span>");
		});
	});
});