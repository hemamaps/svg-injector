import {SVGInjector} from "../lib/index";

let element = document.getElementById('icon');

let injector = new SVGInjector({
	cssFilePath: "/assets/css/svgs.css"
});
injector.inject(element);
