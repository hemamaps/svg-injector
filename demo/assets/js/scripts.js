/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(2);
	var element = document.getElementById('icon');
	var injector = new index_1.SVGInjector({
	    cssFilePath: "/assets/css/svgs.css"
	});
	injector.inject(element);


/***/ },
/* 2 */
/***/ function(module, exports) {

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
	            var selectorText = rules[i].selectorText;
	            if (classSelector.contains(selectorText.slice(1))) {
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


/***/ }
/******/ ]);
//# sourceMappingURL=scripts.js.map