"use strict";
var SVGInjector = (function () {
    function SVGInjector(settings) {
        this._svgCssFile = settings.cssFilePath;
        for (var i = 0; i < document.styleSheets.length; i++) {
            var css = document.styleSheets[i];
            if (css.href.indexOf(this._svgCssFile) > 0) {
                this._styleSheet = css;
                break;
            }
        }
        if (this._styleSheet === undefined) {
            throw new Error("Style Sheet not found");
        }
    }
    SVGInjector.prototype.inject = function (el, options) {
        var svgElement = this._getSVG(el);
        el = this._markLoaded(el);
        el.appendChild(svgElement);
    };
    SVGInjector.prototype._markLoaded = function (el) {
        el.classList.add('icon--loaded');
        return el;
    };
    SVGInjector.prototype._getSVG = function (el) {
        var backgroundImageDataUri = this._getBackgroundImage(el);
        return this._convertToSVG(backgroundImageDataUri);
        ;
    };
    SVGInjector.prototype._convertToSVG = function (dataUri) {
        var decodedSvg = decodeURIComponent(dataUri).match(/<svg(.*?)<\/svg>/g)[0];
        var placeholder = document.createElement('div');
        placeholder.innerHTML = decodedSvg;
        return placeholder.children[0];
    };
    SVGInjector.prototype._getBackgroundImage = function (el) {
        var rules = this._styleSheet.cssRules;
        var classSelector = el.classList;
        var bgImageStyle;
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            if (el.matches(rules[i].selectorText)) {
                bgImageStyle = rule.style.backgroundImage;
                break;
            }
        }
        if (bgImageStyle === undefined) {
            throw new Error("Background SVG not defined");
        }
        return bgImageStyle;
    };
    return SVGInjector;
}());
exports.SVGInjector = SVGInjector;
//# sourceMappingURL=index.js.map