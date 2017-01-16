import {InjectorOptions} from "./interfaces/injector-options";
import {SVGInjectorOptions} from "./interfaces/svg-injector-options";

export class SVGInjector {
	private _svgCssFile;
	private _styleSheet;

    constructor(settings:SVGInjectorOptions) {
    	this._svgCssFile = settings.cssFilePath;
    	for(let i = 0; i < document.styleSheets.length; i++) {
    		let css = document.styleSheets[i];
    		if (css.href.indexOf(this._svgCssFile) > 0) {
    			this._styleSheet = css;
    			break;
			}
		}

		if (this._styleSheet === undefined) {
    		throw new Error("Style Sheet not found");
		}
    }

    public inject(el:Element, options?:InjectorOptions) {
    	let svgElement:Element = this._getSVG(el);
		el.appendChild(svgElement);
    }

    private _getSVG(el:Element):Element {
    	let backgroundImageDataUri:string = this._getBackgroundImage(el);
    	return this._convertToSVG(backgroundImageDataUri);;
	}

	private _convertToSVG(dataUri:string):Element {
		let decodedSvg:string = decodeURIComponent(dataUri).match(/<svg(.*?)<\/svg>/g)[0];
		let placeholder = document.createElement('div');
		placeholder.innerHTML = decodedSvg;
    	return placeholder.children[0];
	}

    private _getBackgroundImage(el:Element):string {
		let rules = this._styleSheet.rules;
		let classSelector = el.classList;
		let bgImageStyle;

		for (let i = 0; i < rules.length; i++) {
			let rule = rules[i];
			let selectorText = rules[i].selectorText;
			if (classSelector.contains(selectorText.slice(1))) {
				bgImageStyle = rule.style.backgroundImage;
				break;
			}
		}

    	if (bgImageStyle === undefined) {
			throw new Error("Background SVG not defined")
		}

		return bgImageStyle;
	}
}
