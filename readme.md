# SVG Injector

Inject SVG as a child of the provided element. 

```
import { SVGInjector } from "svg-injector"

let svgInjector = new SVGInjector({
	cssFilePath: "/path/to/file.css"
});

let element = document.createElement("span");
element.classes = "icon icon-umbrella";

// Alternatively
// let element = document.getElementById('MyIcon');

svgInjector.inject(element);

```
