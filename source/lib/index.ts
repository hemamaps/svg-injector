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
    	let svgElement:Element = this._getSVG(el.className);
    	el = this._markLoaded(el);
		el.appendChild(svgElement);
    }

    public getInjectHtml(classSelector:string, options?:InjectorOptions) {
    	let svgElement:Element = this._getSVG(classSelector);
    	return svgElement;
	}

    private _markLoaded(el:Element):Element {
		el.classList.add('icon--loaded');
		return el;
	}

    private _getSVG(classSelector:string):Element {
    	let backgroundImageDataUri:string = this._getBackgroundByClassName(classSelector);
    	return this._convertToSVG(backgroundImageDataUri);;
	}

	private _convertToSVG(dataUri:string):Element {
		let decodedSvg:string = decodeURIComponent(dataUri).match(/<svg(.*?)<\/svg>/g)[0];
		let placeholder = document.createElement('div');
		placeholder.innerHTML = decodedSvg;
    	return placeholder.children[0];
	}

    private _getBackgroundImage(el:Element):string {
    	return this._getBackgroundByClassName(el.className);
	}

	private _getBackgroundByClassName(classSelector:string):string {
		let rules = this._styleSheet.cssRules;
		let bgImageStyle;

		for (let i = 0; i < rules.length; i++) {
			let rule = rules[i];
			let selectorText = rules[i].selectorText;
			if (classSelector.indexOf(selectorText.slice(1)) > -1) {
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
