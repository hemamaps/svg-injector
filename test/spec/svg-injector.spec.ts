import { expect } from 'chai';

import {SVGInjector} from "../../source/lib/index";

describe("SVG Injector", function() {
	var svgInjector:SVGInjector;
	var iconFixture;

    before(function () {
    	fixture.setBase('test/spec/fixtures');
    });

    beforeEach(function() {
    	svgInjector = new SVGInjector({
    		cssFilePath: "/base/test/spec/fixtures/svgs.fixture.css"
		});
		iconFixture = fixture.load('icon.fixture.html');
    });

    afterEach(function() {
    	fixture.cleanup();
    });

    it("can inject an svg into element that exists in the dom", () => {
    	let el:Element = fixture.el.children[1];
    	svgInjector.inject(el);
    	expect(el.children[0].nodeName.toLowerCase()).to.equal('svg');
	});

    it("can inject to element that does not exist in the dom yet", () => {
    	let el = document.createElement('span');
    	el.className = 'icon icon-umbrella';
    	svgInjector.inject(el);

    	expect(el.children[0].nodeName.toLowerCase()).to.equal('svg');
	});

    it("has class 'icon--loaded' once svg has been inserted", () => {
		let el:Element = fixture.el.children[1];
		svgInjector.inject(el);

		let classes = el.classList;

		expect(classes.contains('icon--loaded')).to.equal(true);
	});

    it('fixture works', () => {
    	let el:Element = fixture.el.children[1];
    	expect(el.id).to.equal('icon');
	});

});
