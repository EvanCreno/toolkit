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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(3);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/**
	 * Helper function for iterating over a collection
	 *
	 * @param collection
	 * @param fn
	 */
	function each(collection, fn) {
	    var i      = 0,
	        length = collection.length,
	        cont;
	
	    for(i; i < length; i++) {
	        cont = fn(collection[i], i);
	        if(cont === false) {
	            break; //allow early exit
	        }
	    }
	}
	
	/**
	 * Helper function for determining whether target object is an array
	 *
	 * @param target the object under test
	 * @return {Boolean} true if array, false otherwise
	 */
	function isArray(target) {
	    return Object.prototype.toString.apply(target) === '[object Array]';
	}
	
	/**
	 * Helper function for determining whether target object is a function
	 *
	 * @param target the object under test
	 * @return {Boolean} true if function, false otherwise
	 */
	function isFunction(target) {
	    return typeof target === 'function';
	}
	
	module.exports = {
	    isFunction : isFunction,
	    isArray : isArray,
	    each : each
	};


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(11);
	var _ = __webpack_require__(12);
	var enquire = __webpack_require__(8);
	var bodymovin = __webpack_require__(4);
	var Headroom = __webpack_require__(9);
	var headroomJquery = __webpack_require__(10);
	
	var HeaderApp = {
	  init: function init() {
	
	    this.didScroll = false;
	    this.menuOpened = false;
	    this.enquireInitializedMobile = false;
	
	    this.animatedLogoSprite();
	
	    enquire.register('screen and (max-width: 992px)', {
	      match: _.bind(this.mobileEvent, this)
	    });
	
	    enquire.register('screen and (max-height: 700px)', {
	      match: _.bind(this.showAndHideHeader, this)
	    });
	
	    enquire.register('screen and (min-width: 993px)', {
	      match: _.bind(this.desktopDropdownEvent, this)
	    });
	  },
	
	
	  variables: {
	    toggleSelector: '#toggle',
	    navigationId: '#nav',
	    navigationSelector: '.nav',
	    subMenuSelector: '#menuAnchor',
	    sectionsSelector: '.nav__sections',
	    sectionsContainerSelector: '.nav__sections-wrapper',
	    sectionSelector: '.nav__section',
	    navBackgroundSelector: '.nav__bg',
	    navBackgroundWrapper: '.nav__bg-wrapper',
	    rightNavigationSelector: '.right-buttons',
	    linksSelector: '.nav__links',
	    logoSelector: '.logo',
	    mobileClass: 'mobile',
	    activeClass: 'active',
	    scrolledClass: 'scrolled',
	    backgroundAnimationClass: 'is-animatable',
	    linksVisibleClass: 'is-visible',
	    mobileBackgroundSelector: '.mobile-bg',
	    mobileMenuClass: 'menu-open',
	    showNavigationClass: 'nav-down',
	    hideNavigationClass: 'nav-up',
	    playOnHoverClass: 'hoverPlay',
	    stopAnimationClass: 'stopedAnimation',
	    mobileBackgroundContainerSelector: '.mobile-bg-container'
	  },
	
	  toggleMobileMenu: function toggleMobileMenu(event) {
	    $(this.variables.linksSelector).hide().removeClass(this.variables.activeClass); // hide all submenus without animation
	    $(event.currentTarget).toggleClass(this.variables.activeClass);
	    $(this.variables.mobileBackgroundSelector).toggleClass(this.variables.activeClass);
	    $(this.variables.sectionsSelector).toggleClass(this.variables.activeClass);
	    $(this.variables.rightNavigationSelector).toggleClass(this.variables.activeClass);
	    $(this.variables.logoSelector).toggleClass(this.variables.mobileMenuClass);
	    $(this.variables.mobileBackgroundContainerSelector).toggleClass(this.variables.backgroundAnimationClass);
	  },
	  resetMobile: function resetMobile() {
	    $(this.variables.navigationId).removeClass(this.variables.mobileClass);
	    $(this.variables.toggleSelector).off('click');
	    $(this.variables.sectionSelector).off('click');
	    $(this.variables.linksSelector).css('display', 'inherit').removeClass(this.variables.activeClass);
	  },
	  resetDesktop: function resetDesktop() {
	    $(this.variables.sectionSelector).off('mouseover');
	    $(this.variables.sectionSelector).off('mouseleave');
	    $(this.variables.linksSelector).hide();
	  },
	  showSubMenu: function showSubMenu(event) {
	    if ($(event.currentTarget).find(this.variables.linksSelector).hasClass(this.variables.activeClass)) {
	      $(this.variables.linksSelector).slideUp().removeClass(this.variables.activeClass);
	
	      return;
	    }
	
	    $(this.variables.linksSelector).slideUp().removeClass(this.variables.activeClass);
	    $(event.currentTarget).find(this.variables.linksSelector).slideToggle().addClass(this.variables.activeClass);
	  },
	  mobileBgAnimation: function mobileBgAnimation() {
	    var windowDiameter = $(window).width() * 2 * $(window).height() * 2,
	        returnBiggest = Math.sqrt(windowDiameter) * 1.5;
	
	    $(this.variables.mobileBackgroundSelector).css({
	      'top': -returnBiggest / 2 + 'px',
	      'right': -returnBiggest / 2 + 'px',
	      'width': returnBiggest + 'px',
	      'height': returnBiggest + 'px'
	    });
	  },
	  showAndHideHeader: function showAndHideHeader(variables) {
	
	    var myElement = document.querySelector('.nav');
	
	    // I should pass the variable object inside the headroom
	    this.headroom = new Headroom(myElement, {
	      offset: 510,
	      tolerance: {
	        up: 20,
	        down: 20
	      },
	
	      onTop: function onTop(variables) {
	        $('#nav').removeClass('scrolled');
	        $('.logo').removeClass('scrolled');
	        $('.mobile-bg-container').addClass('visible');
	      },
	      onPin: function onPin() {
	        $('.menu').removeClass('hidedPrincipalNavigation');
	        $('#nav').addClass('scrolled');
	        $('.logo').addClass('scrolled');
	      },
	      onNotTop: function onNotTop() {
	        $('.mobile-bg-container').addClass('visible');
	      },
	      onUnpin: function onUnpin() {
	        $('.menu').addClass('hidedPrincipalNavigation');
	        $('.mobile-bg-container').addClass('visible');
	      }
	    });
	    this.headroom.init();
	  },
	  mobileEvent: function mobileEvent() {
	    this.resetDesktop();
	    if (!this.enquireInitializedMobile) {
	      this.enquireInitializedMobile = true;
	      this.createMenuButton();
	    }
	    $(window).on('resize', _.bind(this.mobileBgAnimation, this));
	    this.mobileBgAnimation();
	    $(this.variables.navigationId).addClass(this.variables.mobileClass);
	    $(this.variables.toggleSelector).click(_.bind(this.toggleMobileMenu, this));
	    $(this.variables.sectionSelector).click(_.bind(this.showSubMenu, this));
	  },
	  setBackgroundDropdown: function setBackgroundDropdown(bg) {
	    bg.addClass(this.variables.backgroundAnimationClass);
	  },
	  backgroundDropdown: function backgroundDropdown(event) {
	    var cssPadding = 30,
	        bg = $(this.variables.navBackgroundSelector),
	        bgWrapper = $(this.variables.navBackgroundWrapper),
	        selectedDropdown = $(event.currentTarget).find(this.variables.linksSelector),
	        height = selectedDropdown.innerHeight(),
	        width = selectedDropdown.innerWidth(),
	        windowWidth = $(this.variables.navigationSelector).outerWidth(),
	        navigationWidth = $('.nav .container').outerWidth(),
	        marginNavigation = (windowWidth - navigationWidth) / 2,
	        backgroundDropdownPosition = $(event.currentTarget).offset().left + cssPadding + ($(event.currentTarget).innerWidth() - cssPadding) / 2 - width / 2 - marginNavigation;
	
	    setTimeout(_.bind(this.setBackgroundDropdown, this, bg));
	    bgWrapper.addClass(this.variables.linksVisibleClass);
	
	    bg.css({
	      '-moz-transform': 'translateX(' + backgroundDropdownPosition + 'px)',
	      '-webkit-transform': 'translateX(' + backgroundDropdownPosition + 'px)',
	      '-ms-transform': 'translateX(' + backgroundDropdownPosition + 'px)',
	      '-o-transform': 'translateX(' + backgroundDropdownPosition + 'px)',
	      'transform': 'translateX(' + backgroundDropdownPosition + 'px)',
	      'width': width + 'px',
	      'height': height + 'px'
	    });
	  },
	  desktopDropdownEvent: function desktopDropdownEvent() {
	    this.resetMobile();
	    $(this.variables.sectionSelector).on('mouseover', _.bind(this.backgroundDropdown, this));
	    $(this.variables.sectionSelector).on('mouseleave', _.bind(this.destroyDropdown, this));
	    this.showAndHideHeader();
	  },
	
	
	  // Clear dropdowns in mouse leave
	  destroyDropdown: function destroyDropdown(event) {
	    var bg = $(this.variables.navBackgroundSelector),
	        bgWrapper = $(this.variables.navBackgroundWrapper);
	
	    setTimeout(_.bind(function () {
	      bg.removeClass(this.variables.backgroundAnimationClass);
	    }, this));
	
	    var bgWrapper = $(this.variables.navBackgroundWrapper);
	    bgWrapper.removeClass(this.variables.linksVisibleClass);
	  },
	
	
	  // Bodymovin menu Animation
	  createMenuButton: function createMenuButton() {
	    var menuAnimation,
	        animContainer = document.querySelectorAll('.container button')[0],
	        params = {
	      container: animContainer,
	      renderer: 'svg',
	      loop: false,
	      autoplay: false,
	      autoloadSegments: true,
	      path: templateUrl + '/assets/img/menu/data.json'
	    };
	    menuAnimation = bodymovin.loadAnimation(params);
	    menuAnimation.stop();
	
	    $('.container button').click(function () {
	      if (this.menuOpened) {
	        menuAnimation.setDirection(-1);
	      } else {
	        menuAnimation.setDirection(0);
	      }
	      menuAnimation.play();
	      this.menuOpened = !this.menuOpened;
	    });
	  },
	
	
	  // Listen to scroll to change header opacity class
	  toggleScrolledClass: function toggleScrolledClass() {
	    var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	
	    if (bodyScrollTop !== 0) {
	      $(this.variables.navigationId).addClass(this.variables.scrolledClass);
	      $(this.variables.logoSelector).addClass(this.variables.scrolledClass);
	    } else {
	      $(this.variables.navigationId).removeClass(this.variables.scrolledClass);
	      $(this.variables.logoSelector).removeClass(this.variables.scrolledClass);
	    }
	  },
	  checkScroll: function checkScroll() {
	    if ($(this.variables.navigationId).length > 0) {
	      $(window).on('scroll load resize', _.bind(this.toggleScrolledClass, this));
	    }
	  },
	  animatedLogoSprite: function animatedLogoSprite() {
	    this.hoverLogo();
	    $(this.variables.logoSelector).on('mouseover', _.bind(this.hoverLogo, this));
	  },
	  hoverLogo: function hoverLogo() {
	    $(this.variables.logoSelector).removeClass(this.variables.stopAnimationClass);
	    $(this.variables.logoSelector).addClass(this.variables.playOnHoverClass);
	    setTimeout(_.bind(this.stopLogoAnimation, this), 2000);
	  },
	  stopLogoAnimation: function stopLogoAnimation() {
	    $(this.variables.logoSelector).removeClass(this.variables.playOnHoverClass);
	    $(this.variables.logoSelector).addClass(this.variables.stopAnimationClass);
	  }
	};
	
	HeaderApp.init();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) { if(true) { !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); } else if(typeof module === "object" && module.exports) { module.exports = factory(); } else { root.bodymovin = factory(); } }(window, function() {var svgNS = "http://www.w3.org/2000/svg";
	var subframeEnabled = true;
	var expressionsPlugin;
	var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	var cachedColors = {};
	var bm_rounder = Math.round;
	var bm_rnd;
	var bm_pow = Math.pow;
	var bm_sqrt = Math.sqrt;
	var bm_abs = Math.abs;
	var bm_floor = Math.floor;
	var bm_max = Math.max;
	var bm_min = Math.min;
	var blitter = 10;
	
	var BMMath = {};
	(function(){
	    var propertyNames = Object.getOwnPropertyNames(Math);
	    var i, len = propertyNames.length;
	    for(i=0;i<len;i+=1){
	        BMMath[propertyNames[i]] = Math[propertyNames[i]];
	    }
	}());
	
	function ProjectInterface(){return {}};
	
	BMMath.random = Math.random;
	BMMath.abs = function(val){
	    var tOfVal = typeof val;
	    if(tOfVal === 'object' && val.length){
	        var absArr = Array.apply(null,{length:val.length});
	        var i, len = val.length;
	        for(i=0;i<len;i+=1){
	            absArr[i] = Math.abs(val[i]);
	        }
	        return absArr;
	    }
	    return Math.abs(val);
	
	}
	var defaultCurveSegments = 150;
	var degToRads = Math.PI/180;
	var roundCorner = 0.5519;
	
	function roundValues(flag){
	    if(flag){
	        bm_rnd = Math.round;
	    }else{
	        bm_rnd = function(val){
	            return val;
	        };
	    }
	}
	roundValues(false);
	
	function roundTo2Decimals(val){
	    return Math.round(val*10000)/10000;
	}
	
	function roundTo3Decimals(val){
	    return Math.round(val*100)/100;
	}
	
	function styleDiv(element){
	    element.style.position = 'absolute';
	    element.style.top = 0;
	    element.style.left = 0;
	    element.style.display = 'block';
	    element.style.transformOrigin = element.style.webkitTransformOrigin = '0 0';
	    element.style.backfaceVisibility  = element.style.webkitBackfaceVisibility = 'visible';
	    element.style.transformStyle = element.style.webkitTransformStyle = element.style.mozTransformStyle = "preserve-3d";
	}
	
	function styleUnselectableDiv(element){
	    element.style.userSelect = 'none';
	    element.style.MozUserSelect = 'none';
	    element.style.webkitUserSelect = 'none';
	    element.style.oUserSelect = 'none';
	
	}
	
	function BMEnterFrameEvent(n,c,t,d){
	    this.type = n;
	    this.currentTime = c;
	    this.totalTime = t;
	    this.direction = d < 0 ? -1:1;
	}
	
	function BMCompleteEvent(n,d){
	    this.type = n;
	    this.direction = d < 0 ? -1:1;
	}
	
	function BMCompleteLoopEvent(n,c,t,d){
	    this.type = n;
	    this.currentLoop = c;
	    this.totalLoops = t;
	    this.direction = d < 0 ? -1:1;
	}
	
	function BMSegmentStartEvent(n,f,t){
	    this.type = n;
	    this.firstFrame = f;
	    this.totalFrames = t;
	}
	
	function BMDestroyEvent(n,t){
	    this.type = n;
	    this.target = t;
	}
	
	function _addEventListener(eventName, callback){
	
	    if (!this._cbs[eventName]){
	        this._cbs[eventName] = [];
	    }
	    this._cbs[eventName].push(callback);
	
	}
	
	function _removeEventListener(eventName,callback){
	
	    if (!callback){
	        this._cbs[eventName] = null;
	    }else if(this._cbs[eventName]){
	        var i = 0, len = this._cbs[eventName].length;
	        while(i<len){
	            if(this._cbs[eventName][i] === callback){
	                this._cbs[eventName].splice(i,1);
	                i -=1;
	                len -= 1;
	            }
	            i += 1;
	        }
	        if(!this._cbs[eventName].length){
	            this._cbs[eventName] = null;
	        }
	    }
	
	}
	
	function _triggerEvent(eventName, args){
	    if (this._cbs[eventName]) {
	        var len = this._cbs[eventName].length;
	        for (var i = 0; i < len; i++){
	            this._cbs[eventName][i](args);
	        }
	    }
	}
	
	function randomString(length, chars){
	    if(chars === undefined){
	        chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	    }
	    var i;
	    var result = '';
	    for (i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	    return result;
	}
	
	function HSVtoRGB(h, s, v) {
	    var r, g, b, i, f, p, q, t;
	    if (arguments.length === 1) {
	        s = h.s, v = h.v, h = h.h;
	    }
	    i = Math.floor(h * 6);
	    f = h * 6 - i;
	    p = v * (1 - s);
	    q = v * (1 - f * s);
	    t = v * (1 - (1 - f) * s);
	    switch (i % 6) {
	        case 0: r = v, g = t, b = p; break;
	        case 1: r = q, g = v, b = p; break;
	        case 2: r = p, g = v, b = t; break;
	        case 3: r = p, g = q, b = v; break;
	        case 4: r = t, g = p, b = v; break;
	        case 5: r = v, g = p, b = q; break;
	    }
	    return [ r,
	        g,
	         b ];
	}
	
	function RGBtoHSV(r, g, b) {
	    if (arguments.length === 1) {
	        g = r.g, b = r.b, r = r.r;
	    }
	    var max = Math.max(r, g, b), min = Math.min(r, g, b),
	        d = max - min,
	        h,
	        s = (max === 0 ? 0 : d / max),
	        v = max / 255;
	
	    switch (max) {
	        case min: h = 0; break;
	        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
	        case g: h = (b - r) + d * 2; h /= 6 * d; break;
	        case b: h = (r - g) + d * 4; h /= 6 * d; break;
	    }
	
	    return [
	         h,
	         s,
	         v
	    ];
	}
	
	function addSaturationToRGB(color,offset){
	    var hsv = RGBtoHSV(color[0]*255,color[1]*255,color[2]*255);
	    hsv[1] += offset;
	    if (hsv[1] > 1) {
	        hsv[1] = 1;
	    }
	    else if (hsv[1] <= 0) {
	        hsv[1] = 0;
	    }
	    return HSVtoRGB(hsv[0],hsv[1],hsv[2]);
	}
	
	function addBrightnessToRGB(color,offset){
	    var hsv = RGBtoHSV(color[0]*255,color[1]*255,color[2]*255);
	    hsv[2] += offset;
	    if (hsv[2] > 1) {
	        hsv[2] = 1;
	    }
	    else if (hsv[2] < 0) {
	        hsv[2] = 0;
	    }
	    return HSVtoRGB(hsv[0],hsv[1],hsv[2]);
	}
	
	function addHueToRGB(color,offset) {
	    var hsv = RGBtoHSV(color[0]*255,color[1]*255,color[2]*255);
	    hsv[0] += offset/360;
	    if (hsv[0] > 1) {
	        hsv[0] -= 1;
	    }
	    else if (hsv[0] < 0) {
	        hsv[0] += 1;
	    }
	    return HSVtoRGB(hsv[0],hsv[1],hsv[2]);
	}
	
	function componentToHex(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? '0' + hex : hex;
	}
	
	var rgbToHex = (function(){
	    var colorMap = [];
	    var i;
	    var hex;
	    for(i=0;i<256;i+=1){
	        hex = i.toString(16);
	        colorMap[i] = hex.length == 1 ? '0' + hex : hex;
	    }
	
	    return function(r, g, b) {
	        if(r<0){
	            r = 0;
	        }
	        if(g<0){
	            g = 0;
	        }
	        if(b<0){
	            b = 0;
	        }
	        return '#' + colorMap[r] + colorMap[g] + colorMap[b];
	    };
	}());
	
	function fillToRgba(hex,alpha){
	    if(!cachedColors[hex]){
	        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	        cachedColors[hex] = parseInt(result[1], 16)+','+parseInt(result[2], 16)+','+parseInt(result[3], 16);
	    }
	    return 'rgba('+cachedColors[hex]+','+alpha+')';
	}
	
	var fillColorToString = (function(){
	
	    var colorMap = [];
	    return function(colorArr,alpha){
	        if(alpha !== undefined){
	            colorArr[3] = alpha;
	        }
	        if(!colorMap[colorArr[0]]){
	            colorMap[colorArr[0]] = {};
	        }
	        if(!colorMap[colorArr[0]][colorArr[1]]){
	            colorMap[colorArr[0]][colorArr[1]] = {};
	        }
	        if(!colorMap[colorArr[0]][colorArr[1]][colorArr[2]]){
	            colorMap[colorArr[0]][colorArr[1]][colorArr[2]] = {};
	        }
	        if(!colorMap[colorArr[0]][colorArr[1]][colorArr[2]][colorArr[3]]){
	            colorMap[colorArr[0]][colorArr[1]][colorArr[2]][colorArr[3]] = 'rgba(' + colorArr.join(',')+')';
	        }
	        return colorMap[colorArr[0]][colorArr[1]][colorArr[2]][colorArr[3]];
	    };
	}());
	
	function RenderedFrame(tr,o) {
	    this.tr = tr;
	    this.o = o;
	}
	
	function LetterProps(o,sw,sc,fc,m,p){
	    this.o = o;
	    this.sw = sw;
	    this.sc = sc;
	    this.fc = fc;
	    this.m = m;
	    this.props = p;
	}
	
	function iterateDynamicProperties(num){
	    var i, len = this.dynamicProperties;
	    for(i=0;i<len;i+=1){
	        this.dynamicProperties[i].getValue(num);
	    }
	}
	
	function reversePath(paths){
	    var newI = [], newO = [], newV = [];
	    var i, len, newPaths = {};
	    var init = 0;
	    if (paths.c) {
	        newI[0] = paths.o[0];
	        newO[0] = paths.i[0];
	        newV[0] = paths.v[0];
	        init = 1;
	    }
	    len = paths.i.length;
	    var cnt = len - 1;
	
	    for (i = init; i < len; i += 1) {
	        newI.push(paths.o[cnt]);
	        newO.push(paths.i[cnt]);
	        newV.push(paths.v[cnt]);
	        cnt -= 1;
	    }
	
	    newPaths.i = newI;
	    newPaths.o = newO;
	    newPaths.v = newV;
	
	    return newPaths;
	}
	/*!
	 Transformation Matrix v2.0
	 (c) Epistemex 2014-2015
	 www.epistemex.com
	 By Ken Fyrstenberg
	 Contributions by leeoniya.
	 License: MIT, header required.
	 */
	
	/**
	 * 2D transformation matrix object initialized with identity matrix.
	 *
	 * The matrix can synchronize a canvas context by supplying the context
	 * as an argument, or later apply current absolute transform to an
	 * existing context.
	 *
	 * All values are handled as floating point values.
	 *
	 * @param {CanvasRenderingContext2D} [context] - Optional context to sync with Matrix
	 * @prop {number} a - scale x
	 * @prop {number} b - shear y
	 * @prop {number} c - shear x
	 * @prop {number} d - scale y
	 * @prop {number} e - translate x
	 * @prop {number} f - translate y
	 * @prop {CanvasRenderingContext2D|null} [context=null] - set or get current canvas context
	 * @constructor
	 */
	
	var Matrix = (function(){
	
	    function reset(){
	        this.props[0] = 1;
	        this.props[1] = 0;
	        this.props[2] = 0;
	        this.props[3] = 0;
	        this.props[4] = 0;
	        this.props[5] = 1;
	        this.props[6] = 0;
	        this.props[7] = 0;
	        this.props[8] = 0;
	        this.props[9] = 0;
	        this.props[10] = 1;
	        this.props[11] = 0;
	        this.props[12] = 0;
	        this.props[13] = 0;
	        this.props[14] = 0;
	        this.props[15] = 1;
	        return this;
	    }
	
	    function rotate(angle) {
	        if(angle === 0){
	            return this;
	        }
	        var mCos = Math.cos(angle);
	        var mSin = Math.sin(angle);
	        return this._t(mCos, -mSin,  0, 0
	            , mSin,  mCos, 0, 0
	            , 0,  0,  1, 0
	            , 0, 0, 0, 1);
	    }
	
	    function rotateX(angle){
	        if(angle === 0){
	            return this;
	        }
	        var mCos = Math.cos(angle);
	        var mSin = Math.sin(angle);
	        return this._t(1, 0, 0, 0
	            , 0, mCos, -mSin, 0
	            , 0, mSin,  mCos, 0
	            , 0, 0, 0, 1);
	    }
	
	    function rotateY(angle){
	        if(angle === 0){
	            return this;
	        }
	        var mCos = Math.cos(angle);
	        var mSin = Math.sin(angle);
	        return this._t(mCos,  0,  mSin, 0
	            , 0, 1, 0, 0
	            , -mSin,  0,  mCos, 0
	            , 0, 0, 0, 1);
	    }
	
	    function rotateZ(angle){
	        if(angle === 0){
	            return this;
	        }
	        var mCos = Math.cos(angle);
	        var mSin = Math.sin(angle);
	        return this._t(mCos, -mSin,  0, 0
	            , mSin,  mCos, 0, 0
	            , 0,  0,  1, 0
	            , 0, 0, 0, 1);
	    }
	
	    function shear(sx,sy){
	        return this._t(1, sy, sx, 1, 0, 0);
	    }
	
	    function skew(ax, ay){
	        return this.shear(Math.tan(ax), Math.tan(ay));
	    }
	
	    function skewFromAxis(ax, angle){
	        var mCos = Math.cos(angle);
	        var mSin = Math.sin(angle);
	        return this._t(mCos, mSin,  0, 0
	            , -mSin,  mCos, 0, 0
	            , 0,  0,  1, 0
	            , 0, 0, 0, 1)
	            ._t(1, 0,  0, 0
	            , Math.tan(ax),  1, 0, 0
	            , 0,  0,  1, 0
	            , 0, 0, 0, 1)
	            ._t(mCos, -mSin,  0, 0
	            , mSin,  mCos, 0, 0
	            , 0,  0,  1, 0
	            , 0, 0, 0, 1);
	        //return this._t(mCos, mSin, -mSin, mCos, 0, 0)._t(1, 0, Math.tan(ax), 1, 0, 0)._t(mCos, -mSin, mSin, mCos, 0, 0);
	    }
	
	    function scale(sx, sy, sz) {
	        sz = isNaN(sz) ? 1 : sz;
	        if(sx == 1 && sy == 1 && sz == 1){
	            return this;
	        }
	        return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
	    }
	
	    function setTransform(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
	        this.props[0] = a;
	        this.props[1] = b;
	        this.props[2] = c;
	        this.props[3] = d;
	        this.props[4] = e;
	        this.props[5] = f;
	        this.props[6] = g;
	        this.props[7] = h;
	        this.props[8] = i;
	        this.props[9] = j;
	        this.props[10] = k;
	        this.props[11] = l;
	        this.props[12] = m;
	        this.props[13] = n;
	        this.props[14] = o;
	        this.props[15] = p;
	        return this;
	    }
	
	    function translate(tx, ty, tz) {
	        tz = tz || 0;
	        if(tx !== 0 || ty !== 0 || tz !== 0){
	            return this._t(1,0,0,0,0,1,0,0,0,0,1,0,tx,ty,tz,1);
	        }
	        return this;
	    }
	
	    function transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
	
	        if(a2 === 1 && b2 === 0 && c2 === 0 && d2 === 0 && e2 === 0 && f2 === 1 && g2 === 0 && h2 === 0 && i2 === 0 && j2 === 0 && k2 === 1 && l2 === 0){
	            if(m2 !== 0 || n2 !== 0 || o2 !== 0){
	
	                this.props[12] = this.props[12] * a2 + this.props[13] * e2 + this.props[14] * i2 + this.props[15] * m2 ;
	                this.props[13] = this.props[12] * b2 + this.props[13] * f2 + this.props[14] * j2 + this.props[15] * n2 ;
	                this.props[14] = this.props[12] * c2 + this.props[13] * g2 + this.props[14] * k2 + this.props[15] * o2 ;
	                this.props[15] = this.props[12] * d2 + this.props[13] * h2 + this.props[14] * l2 + this.props[15] * p2 ;
	            }
	            return this;
	        }
	
	        var a1 = this.props[0];
	        var b1 = this.props[1];
	        var c1 = this.props[2];
	        var d1 = this.props[3];
	        var e1 = this.props[4];
	        var f1 = this.props[5];
	        var g1 = this.props[6];
	        var h1 = this.props[7];
	        var i1 = this.props[8];
	        var j1 = this.props[9];
	        var k1 = this.props[10];
	        var l1 = this.props[11];
	        var m1 = this.props[12];
	        var n1 = this.props[13];
	        var o1 = this.props[14];
	        var p1 = this.props[15];
	
	        /* matrix order (canvas compatible):
	         * ace
	         * bdf
	         * 001
	         */
	        this.props[0] = a1 * a2 + b1 * e2 + c1 * i2 + d1 * m2;
	        this.props[1] = a1 * b2 + b1 * f2 + c1 * j2 + d1 * n2 ;
	        this.props[2] = a1 * c2 + b1 * g2 + c1 * k2 + d1 * o2 ;
	        this.props[3] = a1 * d2 + b1 * h2 + c1 * l2 + d1 * p2 ;
	
	        this.props[4] = e1 * a2 + f1 * e2 + g1 * i2 + h1 * m2 ;
	        this.props[5] = e1 * b2 + f1 * f2 + g1 * j2 + h1 * n2 ;
	        this.props[6] = e1 * c2 + f1 * g2 + g1 * k2 + h1 * o2 ;
	        this.props[7] = e1 * d2 + f1 * h2 + g1 * l2 + h1 * p2 ;
	
	        this.props[8] = i1 * a2 + j1 * e2 + k1 * i2 + l1 * m2 ;
	        this.props[9] = i1 * b2 + j1 * f2 + k1 * j2 + l1 * n2 ;
	        this.props[10] = i1 * c2 + j1 * g2 + k1 * k2 + l1 * o2 ;
	        this.props[11] = i1 * d2 + j1 * h2 + k1 * l2 + l1 * p2 ;
	
	        this.props[12] = m1 * a2 + n1 * e2 + o1 * i2 + p1 * m2 ;
	        this.props[13] = m1 * b2 + n1 * f2 + o1 * j2 + p1 * n2 ;
	        this.props[14] = m1 * c2 + n1 * g2 + o1 * k2 + p1 * o2 ;
	        this.props[15] = m1 * d2 + n1 * h2 + o1 * l2 + p1 * p2 ;
	
	        return this;
	    }
	
	    function clone(matr){
	        var i;
	        for(i=0;i<16;i+=1){
	            matr.props[i] = this.props[i];
	        }
	    }
	
	    function cloneFromProps(props){
	        var i;
	        for(i=0;i<16;i+=1){
	            this.props[i] = props[i];
	        }
	    }
	
	    function applyToPoint(x, y, z) {
	
	        return {
	            x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
	            y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
	            z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]
	        };
	        /*return {
	         x: x * me.a + y * me.c + me.e,
	         y: x * me.b + y * me.d + me.f
	         };*/
	    }
	    function applyToX(x, y, z) {
	        return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
	    }
	    function applyToY(x, y, z) {
	        return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
	    }
	    function applyToZ(x, y, z) {
	        return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
	    }
	
	    function inversePoints(pts){
	        //var determinant = this.a * this.d - this.b * this.c;
	        var determinant = this.props[0] * this.props[5] - this.props[1] * this.props[4];
	        var a = this.props[5]/determinant;
	        var b = - this.props[1]/determinant;
	        var c = - this.props[4]/determinant;
	        var d = this.props[0]/determinant;
	        var e = (this.props[4] * this.props[13] - this.props[5] * this.props[12])/determinant;
	        var f = - (this.props[0] * this.props[13] - this.props[1] * this.props[12])/determinant;
	        var i, len = pts.length, retPts = [];
	        for(i=0;i<len;i+=1){
	            retPts[i] = [pts[i][0] * a + pts[i][1] * c + e, pts[i][0] * b + pts[i][1] * d + f, 0]
	        }
	        return retPts;
	    }
	
	    function applyToPointArray(x,y,z,dimensions){
	        if(dimensions && dimensions === 2) {
	            var arr = point_pool.newPoint();
	            arr[0] = x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12]; 
	            arr[1] = x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13]; 
	            return arr;    
	        }
	        return [x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]];
	    }
	    function applyToPointStringified(x, y) {
	        return (bm_rnd(x * this.props[0] + y * this.props[4] + this.props[12]))+','+(bm_rnd(x * this.props[1] + y * this.props[5] + this.props[13]));
	    }
	
	    function toArray() {
	        return [this.props[0],this.props[1],this.props[2],this.props[3],this.props[4],this.props[5],this.props[6],this.props[7],this.props[8],this.props[9],this.props[10],this.props[11],this.props[12],this.props[13],this.props[14],this.props[15]];
	    }
	
	    function toCSS() {
	        if(isSafari){
	            return "matrix3d(" + roundTo2Decimals(this.props[0]) + ',' + roundTo2Decimals(this.props[1]) + ',' + roundTo2Decimals(this.props[2]) + ',' + roundTo2Decimals(this.props[3]) + ',' + roundTo2Decimals(this.props[4]) + ',' + roundTo2Decimals(this.props[5]) + ',' + roundTo2Decimals(this.props[6]) + ',' + roundTo2Decimals(this.props[7]) + ',' + roundTo2Decimals(this.props[8]) + ',' + roundTo2Decimals(this.props[9]) + ',' + roundTo2Decimals(this.props[10]) + ',' + roundTo2Decimals(this.props[11]) + ',' + roundTo2Decimals(this.props[12]) + ',' + roundTo2Decimals(this.props[13]) + ',' + roundTo2Decimals(this.props[14]) + ',' + roundTo2Decimals(this.props[15]) + ')';
	        } else {
	            this.cssParts[1] = this.props.join(',');
	            return this.cssParts.join('');
	        }
	    }
	
	    function to2dCSS() {
	        return "matrix(" + this.props[0] + ',' + this.props[1] + ',' + this.props[4] + ',' + this.props[5] + ',' + this.props[12] + ',' + this.props[13] + ")";
	    }
	
	    function toString() {
	        return "" + this.toArray();
	    }
	
	    return function(){
	        this.reset = reset;
	        this.rotate = rotate;
	        this.rotateX = rotateX;
	        this.rotateY = rotateY;
	        this.rotateZ = rotateZ;
	        this.skew = skew;
	        this.skewFromAxis = skewFromAxis;
	        this.shear = shear;
	        this.scale = scale;
	        this.setTransform = setTransform;
	        this.translate = translate;
	        this.transform = transform;
	        this.applyToPoint = applyToPoint;
	        this.applyToX = applyToX;
	        this.applyToY = applyToY;
	        this.applyToZ = applyToZ;
	        this.applyToPointArray = applyToPointArray;
	        this.applyToPointStringified = applyToPointStringified;
	        this.toArray = toArray;
	        this.toCSS = toCSS;
	        this.to2dCSS = to2dCSS;
	        this.toString = toString;
	        this.clone = clone;
	        this.cloneFromProps = cloneFromProps;
	        this.inversePoints = inversePoints;
	        this._t = this.transform;
	
	        this.props = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
	
	        this.cssParts = ['matrix3d(','',')'];
	    }
	}());
	
	function Matrix() {
	
	
	}
	
	/*
	 Copyright 2014 David Bau.
	
	 Permission is hereby granted, free of charge, to any person obtaining
	 a copy of this software and associated documentation files (the
	 "Software"), to deal in the Software without restriction, including
	 without limitation the rights to use, copy, modify, merge, publish,
	 distribute, sublicense, and/or sell copies of the Software, and to
	 permit persons to whom the Software is furnished to do so, subject to
	 the following conditions:
	
	 The above copyright notice and this permission notice shall be
	 included in all copies or substantial portions of the Software.
	
	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	 */
	
	(function (pool, math) {
	//
	// The following constants are related to IEEE 754 limits.
	//
	    var global = this,
	        width = 256,        // each RC4 output is 0 <= x < 256
	        chunks = 6,         // at least six RC4 outputs for each double
	        digits = 52,        // there are 52 significant digits in a double
	        rngname = 'random', // rngname: name for Math.random and Math.seedrandom
	        startdenom = math.pow(width, chunks),
	        significance = math.pow(2, digits),
	        overflow = significance * 2,
	        mask = width - 1,
	        nodecrypto;         // node.js crypto module, initialized at the bottom.
	
	//
	// seedrandom()
	// This is the seedrandom function described above.
	//
	    function seedrandom(seed, options, callback) {
	        var key = [];
	        options = (options == true) ? { entropy: true } : (options || {});
	
	        // Flatten the seed string or build one from local entropy if needed.
	        var shortseed = mixkey(flatten(
	            options.entropy ? [seed, tostring(pool)] :
	                (seed == null) ? autoseed() : seed, 3), key);
	
	        // Use the seed to initialize an ARC4 generator.
	        var arc4 = new ARC4(key);
	
	        // This function returns a random double in [0, 1) that contains
	        // randomness in every bit of the mantissa of the IEEE 754 value.
	        var prng = function() {
	            var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
	                d = startdenom,                 //   and denominator d = 2 ^ 48.
	                x = 0;                          //   and no 'extra last byte'.
	            while (n < significance) {          // Fill up all significant digits by
	                n = (n + x) * width;              //   shifting numerator and
	                d *= width;                       //   denominator and generating a
	                x = arc4.g(1);                    //   new least-significant-byte.
	            }
	            while (n >= overflow) {             // To avoid rounding up, before adding
	                n /= 2;                           //   last byte, shift everything
	                d /= 2;                           //   right using integer math until
	                x >>>= 1;                         //   we have exactly the desired bits.
	            }
	            return (n + x) / d;                 // Form the number within [0, 1).
	        };
	
	        prng.int32 = function() { return arc4.g(4) | 0; }
	        prng.quick = function() { return arc4.g(4) / 0x100000000; }
	        prng.double = prng;
	
	        // Mix the randomness into accumulated entropy.
	        mixkey(tostring(arc4.S), pool);
	
	        // Calling convention: what to return as a function of prng, seed, is_math.
	        return (options.pass || callback ||
	        function(prng, seed, is_math_call, state) {
	            if (state) {
	                // Load the arc4 state from the given state if it has an S array.
	                if (state.S) { copy(state, arc4); }
	                // Only provide the .state method if requested via options.state.
	                prng.state = function() { return copy(arc4, {}); }
	            }
	
	            // If called as a method of Math (Math.seedrandom()), mutate
	            // Math.random because that is how seedrandom.js has worked since v1.0.
	            if (is_math_call) { math[rngname] = prng; return seed; }
	
	            // Otherwise, it is a newer calling convention, so return the
	            // prng directly.
	            else return prng;
	        })(
	            prng,
	            shortseed,
	            'global' in options ? options.global : (this == math),
	            options.state);
	    }
	    math['seed' + rngname] = seedrandom;
	
	//
	// ARC4
	//
	// An ARC4 implementation.  The constructor takes a key in the form of
	// an array of at most (width) integers that should be 0 <= x < (width).
	//
	// The g(count) method returns a pseudorandom integer that concatenates
	// the next (count) outputs from ARC4.  Its return value is a number x
	// that is in the range 0 <= x < (width ^ count).
	//
	    function ARC4(key) {
	        var t, keylen = key.length,
	            me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
	
	        // The empty key [] is treated as [0].
	        if (!keylen) { key = [keylen++]; }
	
	        // Set up S using the standard key scheduling algorithm.
	        while (i < width) {
	            s[i] = i++;
	        }
	        for (i = 0; i < width; i++) {
	            s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
	            s[j] = t;
	        }
	
	        // The "g" method returns the next (count) outputs as one number.
	        (me.g = function(count) {
	            // Using instance members instead of closure state nearly doubles speed.
	            var t, r = 0,
	                i = me.i, j = me.j, s = me.S;
	            while (count--) {
	                t = s[i = mask & (i + 1)];
	                r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
	            }
	            me.i = i; me.j = j;
	            return r;
	            // For robust unpredictability, the function call below automatically
	            // discards an initial batch of values.  This is called RC4-drop[256].
	            // See http://google.com/search?q=rsa+fluhrer+response&btnI
	        })(width);
	    }
	
	//
	// copy()
	// Copies internal state of ARC4 to or from a plain object.
	//
	    function copy(f, t) {
	        t.i = f.i;
	        t.j = f.j;
	        t.S = f.S.slice();
	        return t;
	    };
	
	//
	// flatten()
	// Converts an object tree to nested arrays of strings.
	//
	    function flatten(obj, depth) {
	        var result = [], typ = (typeof obj), prop;
	        if (depth && typ == 'object') {
	            for (prop in obj) {
	                try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
	            }
	        }
	        return (result.length ? result : typ == 'string' ? obj : obj + '\0');
	    }
	
	//
	// mixkey()
	// Mixes a string seed into a key that is an array of integers, and
	// returns a shortened string seed that is equivalent to the result key.
	//
	    function mixkey(seed, key) {
	        var stringseed = seed + '', smear, j = 0;
	        while (j < stringseed.length) {
	            key[mask & j] =
	                mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
	        }
	        return tostring(key);
	    }
	
	//
	// autoseed()
	// Returns an object for autoseeding, using window.crypto and Node crypto
	// module if available.
	//
	    function autoseed() {
	        try {
	            if (nodecrypto) { return tostring(nodecrypto.randomBytes(width)); }
	            var out = new Uint8Array(width);
	            (global.crypto || global.msCrypto).getRandomValues(out);
	            return tostring(out);
	        } catch (e) {
	            var browser = global.navigator,
	                plugins = browser && browser.plugins;
	            return [+new Date, global, plugins, global.screen, tostring(pool)];
	        }
	    }
	
	//
	// tostring()
	// Converts an array of charcodes to a string
	//
	    function tostring(a) {
	        return String.fromCharCode.apply(0, a);
	    }
	
	//
	// When seedrandom.js is loaded, we immediately mix a few bits
	// from the built-in RNG into the entropy pool.  Because we do
	// not want to interfere with deterministic PRNG state later,
	// seedrandom will not call math.random on its own again after
	// initialization.
	//
	    mixkey(math.random(), pool);
	
	//
	// Nodejs and AMD support: export the implementation as a module using
	// either convention.
	//
	
	// End anonymous scope, and pass initial values.
	})(
	    [],     // pool: entropy pool starts empty
	    BMMath    // math: package containing random, pow, and seedrandom
	);
	var BezierFactory = (function(){
	    /**
	     * BezierEasing - use bezier curve for transition easing function
	     * by Gaëtan Renaudeau 2014 - 2015 – MIT License
	     *
	     * Credits: is based on Firefox's nsSMILKeySpline.cpp
	     * Usage:
	     * var spline = BezierEasing([ 0.25, 0.1, 0.25, 1.0 ])
	     * spline.get(x) => returns the easing value | x must be in [0, 1] range
	     *
	     */
	
	        var ob = {};
	    ob.getBezierEasing = getBezierEasing;
	    var beziers = {};
	
	    function getBezierEasing(a,b,c,d,nm){
	        var str = nm || ('bez_' + a+'_'+b+'_'+c+'_'+d).replace(/\./g, 'p');
	        if(beziers[str]){
	            return beziers[str];
	        }
	        var bezEasing = new BezierEasing([a,b,c,d]);
	        beziers[str] = bezEasing;
	        return bezEasing;
	    }
	
	// These values are established by empiricism with tests (tradeoff: performance VS precision)
	    var NEWTON_ITERATIONS = 4;
	    var NEWTON_MIN_SLOPE = 0.001;
	    var SUBDIVISION_PRECISION = 0.0000001;
	    var SUBDIVISION_MAX_ITERATIONS = 10;
	
	    var kSplineTableSize = 11;
	    var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
	
	    var float32ArraySupported = typeof Float32Array === "function";
	
	    function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
	    function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
	    function C (aA1)      { return 3.0 * aA1; }
	
	// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
	    function calcBezier (aT, aA1, aA2) {
	        return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
	    }
	
	// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
	    function getSlope (aT, aA1, aA2) {
	        return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
	    }
	
	    function binarySubdivide (aX, aA, aB, mX1, mX2) {
	        var currentX, currentT, i = 0;
	        do {
	            currentT = aA + (aB - aA) / 2.0;
	            currentX = calcBezier(currentT, mX1, mX2) - aX;
	            if (currentX > 0.0) {
	                aB = currentT;
	            } else {
	                aA = currentT;
	            }
	        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
	        return currentT;
	    }
	
	    function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
	        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
	            var currentSlope = getSlope(aGuessT, mX1, mX2);
	            if (currentSlope === 0.0) return aGuessT;
	            var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	            aGuessT -= currentX / currentSlope;
	        }
	        return aGuessT;
	    }
	
	    /**
	     * points is an array of [ mX1, mY1, mX2, mY2 ]
	     */
	    function BezierEasing (points) {
	        this._p = points;
	        this._mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
	        this._precomputed = false;
	
	        this.get = this.get.bind(this);
	    }
	
	    BezierEasing.prototype = {
	
	        get: function (x) {
	            var mX1 = this._p[0],
	                mY1 = this._p[1],
	                mX2 = this._p[2],
	                mY2 = this._p[3];
	            if (!this._precomputed) this._precompute();
	            if (mX1 === mY1 && mX2 === mY2) return x; // linear
	            // Because JavaScript number are imprecise, we should guarantee the extremes are right.
	            if (x === 0) return 0;
	            if (x === 1) return 1;
	            return calcBezier(this._getTForX(x), mY1, mY2);
	        },
	
	        // Private part
	
	        _precompute: function () {
	            var mX1 = this._p[0],
	                mY1 = this._p[1],
	                mX2 = this._p[2],
	                mY2 = this._p[3];
	            this._precomputed = true;
	            if (mX1 !== mY1 || mX2 !== mY2)
	                this._calcSampleValues();
	        },
	
	        _calcSampleValues: function () {
	            var mX1 = this._p[0],
	                mX2 = this._p[2];
	            for (var i = 0; i < kSplineTableSize; ++i) {
	                this._mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	            }
	        },
	
	        /**
	         * getTForX chose the fastest heuristic to determine the percentage value precisely from a given X projection.
	         */
	        _getTForX: function (aX) {
	            var mX1 = this._p[0],
	                mX2 = this._p[2],
	                mSampleValues = this._mSampleValues;
	
	            var intervalStart = 0.0;
	            var currentSample = 1;
	            var lastSample = kSplineTableSize - 1;
	
	            for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
	                intervalStart += kSampleStepSize;
	            }
	            --currentSample;
	
	            // Interpolate to provide an initial guess for t
	            var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample+1] - mSampleValues[currentSample]);
	            var guessForT = intervalStart + dist * kSampleStepSize;
	
	            var initialSlope = getSlope(guessForT, mX1, mX2);
	            if (initialSlope >= NEWTON_MIN_SLOPE) {
	                return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
	            } else if (initialSlope === 0.0) {
	                return guessForT;
	            } else {
	                return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
	            }
	        }
	    };
	
	    return ob;
	
	}())
	
	
	function matrixManagerFunction(){
	
	    var mat = new Matrix();
	
	    var returnMatrix2D = function(rX, scaleX, scaleY, tX, tY){
	        return mat.reset().translate(tX,tY).rotate(rX).scale(scaleX,scaleY).toCSS();
	    };
	
	    var getMatrix = function(animData){
	        return returnMatrix2D(animData.tr.r[2],animData.tr.s[0],animData.tr.s[1],animData.tr.p[0],animData.tr.p[1]);
	    };
	
	    return {
	        getMatrix : getMatrix
	    };
	
	}
	var MatrixManager = matrixManagerFunction;
	(function () {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }
	    if(!window.requestAnimationFrame)
	        window.requestAnimationFrame = function (callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function () {
	                    callback(currTime + timeToCall);
	                },
	                timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    if(!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function (id) {
	            clearTimeout(id);
	        };
	}());
	function createElement(parent,child,params){
	    if(child){
	        child.prototype = Object.create(parent.prototype);
	        child.prototype.constructor = child;
	        child.prototype._parent = parent.prototype;
	    }else{
	        var instance = Object.create(parent.prototype,params);
	        var getType = {};
	        if(instance && getType.toString.call(instance.init) === '[object Function]'){
	            instance.init();
	        }
	        return instance;
	    }
	}
	
	function extendPrototype(source,destination){
	    for (var attr in source.prototype) {
	        if (source.prototype.hasOwnProperty(attr)) destination.prototype[attr] = source.prototype[attr];
	    }
	}
	function bezFunction(){
	
	    var easingFunctions = [];
	    var math = Math;
	
	    function pointOnLine2D(x1,y1, x2,y2, x3,y3){
	        var det1 = (x1*y2) + (y1*x3) + (x2*y3) - (x3*y2) - (y3*x1) - (x2*y1);
	        return det1 > -0.0001 && det1 < 0.0001;
	    }
	
	    function pointOnLine3D(x1,y1,z1, x2,y2,z2, x3,y3,z3){
	        return pointOnLine2D(x1,y1, x2,y2, x3,y3) && pointOnLine2D(x1,z1, x2,z2, x3,z3);
	    }
	
	    /*function getEasingCurve(aa,bb,cc,dd,encodedFuncName) {
	        if(!encodedFuncName){
	            encodedFuncName = ('bez_' + aa+'_'+bb+'_'+cc+'_'+dd).replace(/\./g, 'p');
	        }
	        if(easingFunctions[encodedFuncName]){
	            return easingFunctions[encodedFuncName];
	        }
	        var A0, B0, C0;
	        var A1, B1, C1;
	        easingFunctions[encodedFuncName] = function(tt) {
	            var x = tt;
	            var i = 0, z;
	            while (++i < 20) {
	                C0 = 3 * aa;
	                B0 = 3 * (cc - aa) - C0;
	                A0 = 1 - C0 - B0;
	                z = (x * (C0 + x * (B0 + x * A0))) - tt;
	                if (bm_abs(z) < 1e-3) break;
	                x -= z / (C0 + x * (2 * B0 + 3 * A0 * x));
	            }
	            C1 = 3 * bb;
	            B1 = 3 * (dd - bb) - C1;
	            A1 = 1 - C1 - B1;
	            var polyB = x * (C1 + x * (B1 + x * A1));
	            //return c * polyB + b;
	            return polyB;
	        };
	        return easingFunctions[encodedFuncName];
	    }*/
	    var getBezierLength = (function(){
	
	        function Segment(l,p){
	            this.l = l;
	            this.p = p;
	        }
	
	        return function(pt1,pt2,pt3,pt4){
	            var curveSegments = defaultCurveSegments;
	            var k;
	            var i, len;
	            var ptCoord,perc,addedLength = 0;
	            var ptDistance;
	            var point = [],lastPoint = [];
	            var lengthData = {
	                addedLength: 0,
	                segments: []
	            };
	            len = pt3.length;
	            for(k=0;k<curveSegments;k+=1){
	                perc = k/(curveSegments-1);
	                ptDistance = 0;
	                for(i=0;i<len;i+=1){
	                    ptCoord = bm_pow(1-perc,3)*pt1[i]+3*bm_pow(1-perc,2)*perc*pt3[i]+3*(1-perc)*bm_pow(perc,2)*pt4[i]+bm_pow(perc,3)*pt2[i];
	                    point[i] = ptCoord;
	                    if(lastPoint[i] !== null){
	                        ptDistance += bm_pow(point[i] - lastPoint[i],2);
	                    }
	                    lastPoint[i] = point[i];
	                }
	                if(ptDistance){
	                    ptDistance = bm_sqrt(ptDistance);
	                    addedLength += ptDistance;
	                }
	                lengthData.segments.push(new Segment(addedLength,perc));
	            }
	            lengthData.addedLength = addedLength;
	            return lengthData;
	        };
	    }());
	
	    function BezierData(length){
	        this.segmentLength = 0;
	        this.points = new Array(length);
	    }
	
	    function PointData(partial,point){
	        this.partialLength = partial;
	        this.point = point;
	    }
	
	    var buildBezierData = (function(){
	
	        var storedData = {};
	
	        return function (keyData){
	            var pt1 = keyData.s;
	            var pt2 = keyData.e;
	            var pt3 = keyData.to;
	            var pt4 = keyData.ti;
	            var bezierName = (pt1.join('_')+'_'+pt2.join('_')+'_'+pt3.join('_')+'_'+pt4.join('_')).replace(/\./g, 'p');
	            if(storedData[bezierName]){
	                keyData.bezierData = storedData[bezierName];
	                return;
	            }
	        var curveSegments = defaultCurveSegments;
	        var k, i, len;
	            var ptCoord,perc,addedLength = 0;
	            var ptDistance;
	            var point,lastPoint = null;
	            if(pt1.length === 2 && (pt1[0] != pt2[0] || pt1[1] != pt2[1]) && pointOnLine2D(pt1[0],pt1[1],pt2[0],pt2[1],pt1[0]+pt3[0],pt1[1]+pt3[1]) && pointOnLine2D(pt1[0],pt1[1],pt2[0],pt2[1],pt2[0]+pt4[0],pt2[1]+pt4[1])){
	                curveSegments = 2;
	            }
	            var bezierData = new BezierData(curveSegments);
	            len = pt3.length;
	            for(k=0;k<curveSegments;k+=1){
	            point = new Array(len);
	                perc = k/(curveSegments-1);
	                ptDistance = 0;
	                for(i=0;i<len;i+=1){
	                ptCoord = bm_pow(1-perc,3)*pt1[i]+3*bm_pow(1-perc,2)*perc*(pt1[i] + pt3[i])+3*(1-perc)*bm_pow(perc,2)*(pt2[i] + pt4[i])+bm_pow(perc,3)*pt2[i];
	                point[i] = ptCoord;
	                    if(lastPoint !== null){
	                    ptDistance += bm_pow(point[i] - lastPoint[i],2);
	                    }
	                }
	            ptDistance = bm_sqrt(ptDistance);
	                addedLength += ptDistance;
	                bezierData.points[k] = new PointData(ptDistance,point);
	                lastPoint = point;
	            }
	            bezierData.segmentLength = addedLength;
	            keyData.bezierData = bezierData;
	            storedData[bezierName] = bezierData;
	
	        }
	    }());
	
	    function getDistancePerc(perc,bezierData){
	        var segments = bezierData.segments;
	        var len = segments.length;
	        var initPos = bm_floor((len-1)*perc);
	        var lengthPos = perc*bezierData.addedLength;
	        var lPerc = 0;
	        if(lengthPos == segments[initPos].l){
	            return segments[initPos].p;
	        }else{
	            var dir = segments[initPos].l > lengthPos ? -1 : 1;
	            var flag = true;
	            while(flag){
	                if(segments[initPos].l <= lengthPos && segments[initPos+1].l > lengthPos){
	                    lPerc = (lengthPos - segments[initPos].l)/(segments[initPos+1].l-segments[initPos].l);
	                    flag = false;
	                }else{
	                    initPos += dir;
	                }
	                if(initPos < 0 || initPos >= len - 1){
	                    flag = false;
	                }
	            }
	            return segments[initPos].p + (segments[initPos+1].p - segments[initPos].p)*lPerc;
	        }
	    }
	
	    function SegmentPoints(){
	        this.pt1 = new Array(2);
	        this.pt2 = new Array(2);
	        this.pt3 = new Array(2);
	        this.pt4 = new Array(2);
	    }
	
	    function getNewSegment(pt1,pt2,pt3,pt4,startPerc,endPerc, bezierData){
	
	        var pts = new SegmentPoints();
	        startPerc = startPerc < 0 ? 0 : startPerc > 1 ? 1 : startPerc;
	        var t0 = getDistancePerc(startPerc,bezierData);
	        endPerc = endPerc > 1 ? 1 : endPerc;
	        var t1 = getDistancePerc(endPerc,bezierData);
	        var i, len = pt1.length;
	        var u0 = 1 - t0;
	        var u1 = 1 - t1;
	        //Math.round(num * 100) / 100
	        for(i=0;i<len;i+=1){
	            pts.pt1[i] =  Math.round((u0*u0*u0* pt1[i] + (t0*u0*u0 + u0*t0*u0 + u0*u0*t0) * pt3[i] + (t0*t0*u0 + u0*t0*t0 + t0*u0*t0)* pt4[i] + t0*t0*t0* pt2[i])* 1000) / 1000;
	            pts.pt3[i] = Math.round((u0*u0*u1*pt1[i] + (t0*u0*u1 + u0*t0*u1 + u0*u0*t1)* pt3[i] + (t0*t0*u1 + u0*t0*t1 + t0*u0*t1)* pt4[i] + t0*t0*t1* pt2[i])* 1000) / 1000;
	            pts.pt4[i] = Math.round((u0*u1*u1* pt1[i] + (t0*u1*u1 + u0*t1*u1 + u0*u1*t1)* pt3[i] + (t0*t1*u1 + u0*t1*t1 + t0*u1*t1)* pt4[i] + t0*t1*t1* pt2[i])* 1000) / 1000;
	            pts.pt2[i] = Math.round((u1*u1*u1* pt1[i] + (t1*u1*u1 + u1*t1*u1 + u1*u1*t1)* pt3[i] + (t1*t1*u1 + u1*t1*t1 + t1*u1*t1)*pt4[i] + t1*t1*t1* pt2[i])* 1000) / 1000;
	        }
	        return pts;
	    }
	
	    return {
	        //getEasingCurve : getEasingCurve,
	        getBezierLength : getBezierLength,
	        getNewSegment : getNewSegment,
	        buildBezierData : buildBezierData,
	        pointOnLine2D : pointOnLine2D,
	        pointOnLine3D : pointOnLine3D
	    };
	}
	
	var bez = bezFunction();
	function dataFunctionManager(){
	
	    //var tCanvasHelper = document.createElement('canvas').getContext('2d');
	
	    function completeLayers(layers, comps, fontManager){
	        var layerData;
	        var animArray, lastFrame;
	        var i, len = layers.length;
	        var j, jLen, k, kLen;
	        for(i=0;i<len;i+=1){
	            layerData = layers[i];
	            if(!('ks' in layerData) || layerData.completed){
	                continue;
	            }
	            layerData.completed = true;
	            if(layerData.tt){
	                layers[i-1].td = layerData.tt;
	            }
	            animArray = [];
	            lastFrame = -1;
	            if(layerData.hasMask){
	                var maskProps = layerData.masksProperties;
	                jLen = maskProps.length;
	                for(j=0;j<jLen;j+=1){
	                    if(maskProps[j].pt.k.i){
	                        convertPathsToAbsoluteValues(maskProps[j].pt.k);
	                    }else{
	                        kLen = maskProps[j].pt.k.length;
	                        for(k=0;k<kLen;k+=1){
	                            if(maskProps[j].pt.k[k].s){
	                                convertPathsToAbsoluteValues(maskProps[j].pt.k[k].s[0]);
	                            }
	                            if(maskProps[j].pt.k[k].e){
	                                convertPathsToAbsoluteValues(maskProps[j].pt.k[k].e[0]);
	                            }
	                        }
	                    }
	                }
	            }
	            if(layerData.ty===0){
	                layerData.layers = findCompLayers(layerData.refId, comps);
	                completeLayers(layerData.layers,comps, fontManager);
	            }else if(layerData.ty === 4){
	                completeShapes(layerData.shapes);
	            }else if(layerData.ty == 5){
	                completeText(layerData, fontManager);
	            }
	        }
	    }
	
	    function findCompLayers(id,comps){
	        var i = 0, len = comps.length;
	        while(i<len){
	            if(comps[i].id === id){
	                return comps[i].layers;
	            }
	            i += 1;
	        }
	    }
	
	    function completeShapes(arr){
	        var i, len = arr.length;
	        var j, jLen;
	        var hasPaths = false;
	        for(i=len-1;i>=0;i-=1){
	            if(arr[i].ty == 'sh'){
	                if(arr[i].ks.k.i){
	                    convertPathsToAbsoluteValues(arr[i].ks.k);
	                }else{
	                    jLen = arr[i].ks.k.length;
	                    for(j=0;j<jLen;j+=1){
	                        if(arr[i].ks.k[j].s){
	                            convertPathsToAbsoluteValues(arr[i].ks.k[j].s[0]);
	                        }
	                        if(arr[i].ks.k[j].e){
	                            convertPathsToAbsoluteValues(arr[i].ks.k[j].e[0]);
	                        }
	                    }
	                }
	                hasPaths = true;
	            }else if(arr[i].ty == 'gr'){
	                completeShapes(arr[i].it);
	            }
	        }
	        /*if(hasPaths){
	            //mx: distance
	            //ss: sensitivity
	            //dc: decay
	            arr.splice(arr.length-1,0,{
	                "ty": "ms",
	                "mx":20,
	                "ss":10,
	                 "dc":0.001,
	                "maxDist":200
	            });
	        }*/
	    }
	
	    function convertPathsToAbsoluteValues(path){
	        var i, len = path.i.length;
	        for(i=0;i<len;i+=1){
	            path.i[i][0] += path.v[i][0];
	            path.i[i][1] += path.v[i][1];
	            path.o[i][0] += path.v[i][0];
	            path.o[i][1] += path.v[i][1];
	        }
	    }
	
	    function checkVersion(minimum,animVersionString){
	        var animVersion = animVersionString ? animVersionString.split('.') : [100,100,100];
	        if(minimum[0]>animVersion[0]){
	            return true;
	        } else if(animVersion[0] > minimum[0]){
	            return false;
	        }
	        if(minimum[1]>animVersion[1]){
	            return true;
	        } else if(animVersion[1] > minimum[1]){
	            return false;
	        }
	        if(minimum[2]>animVersion[2]){
	            return true;
	        } else if(animVersion[2] > minimum[2]){
	            return false;
	        }
	    }
	
	    var checkText = (function(){
	        var minimumVersion = [4,4,14];
	
	        function updateTextLayer(textLayer){
	            var documentData = textLayer.t.d;
	            textLayer.t.d = {
	                k: [
	                    {
	                        s:documentData,
	                        t:0
	                    }
	                ]
	            }
	        }
	
	        function iterateLayers(layers){
	            var i, len = layers.length;
	            for(i=0;i<len;i+=1){
	                if(layers[i].ty === 5){
	                    updateTextLayer(layers[i]);
	                }
	            }
	        }
	
	        return function (animationData){
	            if(checkVersion(minimumVersion,animationData.v)){
	                iterateLayers(animationData.layers);
	                if(animationData.assets){
	                    var i, len = animationData.assets.length;
	                    for(i=0;i<len;i+=1){
	                        if(animationData.assets[i].layers){
	                            iterateLayers(animationData.assets[i].layers);
	
	                        }
	                    }
	                }
	            }
	        }
	    }())
	
	    var checkColors = (function(){
	        var minimumVersion = [4,1,9];
	
	        function iterateShapes(shapes){
	            var i, len = shapes.length;
	            var j, jLen;
	            for(i=0;i<len;i+=1){
	                if(shapes[i].ty === 'gr'){
	                    iterateShapes(shapes[i].it);
	                }else if(shapes[i].ty === 'fl' || shapes[i].ty === 'st'){
	                    if(shapes[i].c.k && shapes[i].c.k[0].i){
	                        jLen = shapes[i].c.k.length;
	                        for(j=0;j<jLen;j+=1){
	                            if(shapes[i].c.k[j].s){
	                                shapes[i].c.k[j].s[0] /= 255;
	                                shapes[i].c.k[j].s[1] /= 255;
	                                shapes[i].c.k[j].s[2] /= 255;
	                                shapes[i].c.k[j].s[3] /= 255;
	                            }
	                            if(shapes[i].c.k[j].e){
	                                shapes[i].c.k[j].e[0] /= 255;
	                                shapes[i].c.k[j].e[1] /= 255;
	                                shapes[i].c.k[j].e[2] /= 255;
	                                shapes[i].c.k[j].e[3] /= 255;
	                            }
	                        }
	                    } else {
	                        shapes[i].c.k[0] /= 255;
	                        shapes[i].c.k[1] /= 255;
	                        shapes[i].c.k[2] /= 255;
	                        shapes[i].c.k[3] /= 255;
	                    }
	                }
	            }
	        }
	
	        function iterateLayers(layers){
	            var i, len = layers.length;
	            for(i=0;i<len;i+=1){
	                if(layers[i].ty === 4){
	                    iterateShapes(layers[i].shapes);
	                }
	            }
	        }
	
	        return function (animationData){
	            if(checkVersion(minimumVersion,animationData.v)){
	                iterateLayers(animationData.layers);
	                if(animationData.assets){
	                    var i, len = animationData.assets.length;
	                    for(i=0;i<len;i+=1){
	                        if(animationData.assets[i].layers){
	                            iterateLayers(animationData.assets[i].layers);
	
	                        }
	                    }
	                }
	            }
	        }
	    }());
	
	    var checkShapes = (function(){
	        var minimumVersion = [4,4,18];
	
	
	
	        function completeShapes(arr){
	            var i, len = arr.length;
	            var j, jLen;
	            var hasPaths = false;
	            for(i=len-1;i>=0;i-=1){
	                if(arr[i].ty == 'sh'){
	                    if(arr[i].ks.k.i){
	                        arr[i].ks.k.c = arr[i].closed;
	                    }else{
	                        jLen = arr[i].ks.k.length;
	                        for(j=0;j<jLen;j+=1){
	                            if(arr[i].ks.k[j].s){
	                                arr[i].ks.k[j].s[0].c = arr[i].closed;
	                            }
	                            if(arr[i].ks.k[j].e){
	                                arr[i].ks.k[j].e[0].c = arr[i].closed;
	                            }
	                        }
	                    }
	                    hasPaths = true;
	                }else if(arr[i].ty == 'gr'){
	                    completeShapes(arr[i].it);
	                }
	            }
	        }
	
	        function iterateLayers(layers){
	            var layerData;
	            var i, len = layers.length;
	            var j, jLen, k, kLen;
	            for(i=0;i<len;i+=1){
	                layerData = layers[i];
	                if(layerData.hasMask){
	                    var maskProps = layerData.masksProperties;
	                    jLen = maskProps.length;
	                    for(j=0;j<jLen;j+=1){
	                        if(maskProps[j].pt.k.i){
	                            maskProps[j].pt.k.c = maskProps[j].cl;
	                        }else{
	                            kLen = maskProps[j].pt.k.length;
	                            for(k=0;k<kLen;k+=1){
	                                if(maskProps[j].pt.k[k].s){
	                                    maskProps[j].pt.k[k].s[0].c = maskProps[j].cl;
	                                }
	                                if(maskProps[j].pt.k[k].e){
	                                    maskProps[j].pt.k[k].e[0].c = maskProps[j].cl;
	                                }
	                            }
	                        }
	                    }
	                }
	                if(layerData.ty === 4){
	                    completeShapes(layerData.shapes);
	                }
	            }
	        }
	
	        return function (animationData){
	            if(checkVersion(minimumVersion,animationData.v)){
	                iterateLayers(animationData.layers);
	                if(animationData.assets){
	                    var i, len = animationData.assets.length;
	                    for(i=0;i<len;i+=1){
	                        if(animationData.assets[i].layers){
	                            iterateLayers(animationData.assets[i].layers);
	
	                        }
	                    }
	                }
	            }
	        }
	    }());
	
	    /*function blitPaths(path){
	        var i, len = path.i.length;
	        for(i=0;i<len;i+=1){
	            path.i[i][0] /= blitter;
	            path.i[i][1] /= blitter;
	            path.o[i][0] /= blitter;
	            path.o[i][1] /= blitter;
	            path.v[i][0] /= blitter;
	            path.v[i][1] /= blitter;
	        }
	    }
	
	    function blitShapes(arr){
	        var i, len = arr.length;
	        var j, jLen;
	        var hasPaths = false;
	        for(i=len-1;i>=0;i-=1){
	            if(arr[i].ty == 'sh'){
	                if(arr[i].ks.k.i){
	                    blitPaths(arr[i].ks.k);
	                }else{
	                    jLen = arr[i].ks.k.length;
	                    for(j=0;j<jLen;j+=1){
	                        if(arr[i].ks.k[j].s){
	                            blitPaths(arr[i].ks.k[j].s[0]);
	                        }
	                        if(arr[i].ks.k[j].e){
	                            blitPaths(arr[i].ks.k[j].e[0]);
	                        }
	                    }
	                }
	                hasPaths = true;
	            }else if(arr[i].ty == 'gr'){
	                blitShapes(arr[i].it);
	            }else if(arr[i].ty == 'rc'){
	                blitProperty(arr[i].p);
	                blitProperty(arr[i].s);
	            }else if(arr[i].ty == 'st'){
	                blitProperty(arr[i].w);
	            }else if(arr[i].ty == 'tr'){
	                blitProperty(arr[i].p);
	                blitProperty(arr[i].sk);
	                blitProperty(arr[i].a);
	            }else if(arr[i].ty == 'el'){
	                blitProperty(arr[i].p);
	                blitProperty(arr[i].s);
	            }else if(arr[i].ty == 'rd'){
	                blitProperty(arr[i].r);
	            }else{
	
	                //console.log(arr[i].ty );
	            }
	        }
	    }
	
	    function blitText(data, fontManager){
	
	    }
	
	    function blitValue(val){
	        if(typeof(val) === 'number'){
	            val /= blitter;
	        } else {
	            var i = val.length-1;
	            while(i>=0){
	                val[i] /= blitter;
	                i-=1;
	            }
	        }
	        return val;
	    }
	
	    function blitProperty(data){
	        if(!data.k.length){
	            data.k = blitValue(data.k);
	        }else if(typeof(data.k[0]) === 'number'){
	            data.k = blitValue(data.k);
	        } else {
	            var i, len = data.k.length;
	            for(i=0;i<len;i+=1){
	                if(data.k[i].s){
	                    //console.log('pre S: ', data.k[i].s);
	                    data.k[i].s = blitValue(data.k[i].s);
	                    //console.log('post S: ', data.k[i].s);
	                }
	                if(data.k[i].e){
	                    //console.log('pre E: ', data.k[i].e);
	                    data.k[i].e = blitValue(data.k[i].e);
	                    //console.log('post E: ', data.k[i].e);
	                }
	            }
	        }
	    }
	
	    function blitLayers(layers,comps, fontManager){
	        var layerData;
	        var animArray, lastFrame;
	        var i, len = layers.length;
	        var j, jLen, k, kLen;
	        for(i=0;i<len;i+=1){
	            layerData = layers[i];
	            if(!('ks' in layerData)){
	                continue;
	            }
	            blitProperty(layerData.ks.a);
	            blitProperty(layerData.ks.p);
	            layerData.completed = true;
	            if(layerData.tt){
	                layers[i-1].td = layerData.tt;
	            }
	            animArray = [];
	            lastFrame = -1;
	            if(layerData.hasMask){
	                var maskProps = layerData.masksProperties;
	                jLen = maskProps.length;
	                for(j=0;j<jLen;j+=1){
	                    if(maskProps[j].pt.k.i){
	                        blitPaths(maskProps[j].pt.k);
	                    }else{
	                        kLen = maskProps[j].pt.k.length;
	                        for(k=0;k<kLen;k+=1){
	                            if(maskProps[j].pt.k[k].s){
	                                blitPaths(maskProps[j].pt.k[k].s[0]);
	                            }
	                            if(maskProps[j].pt.k[k].e){
	                                blitPaths(maskProps[j].pt.k[k].e[0]);
	                            }
	                        }
	                    }
	                }
	            }
	            if(layerData.ty===0){
	                layerData.w = Math.round(layerData.w/blitter);
	                layerData.h = Math.round(layerData.h/blitter);
	                blitLayers(layerData.layers,comps, fontManager);
	            }else if(layerData.ty === 4){
	                blitShapes(layerData.shapes);
	            }else if(layerData.ty == 5){
	                blitText(layerData, fontManager);
	            }else if(layerData.ty == 1){
	                layerData.sh /= blitter;
	                layerData.sw /= blitter;
	            } else {
	            }
	        }
	    }
	
	    function blitAnimation(animationData,comps, fontManager){
	        blitLayers(animationData.layers,comps, fontManager);
	    }*/
	
	    function completeData(animationData, fontManager){
	        if(animationData.__complete){
	            return;
	        }
	        checkColors(animationData);
	        checkText(animationData);
	        checkShapes(animationData);
	        completeLayers(animationData.layers, animationData.assets, fontManager);
	        animationData.__complete = true;
	        //blitAnimation(animationData, animationData.assets, fontManager);
	    }
	
	    function completeText(data, fontManager){
	        var letters;
	        var keys = data.t.d.k;
	        var k, kLen = keys.length;
	        for(k=0;k<kLen;k+=1){
	            var documentData = data.t.d.k[k].s;
	            letters = [];
	            var i, len;
	            var newLineFlag, index = 0, val;
	            var anchorGrouping = data.t.m.g;
	            var currentSize = 0, currentPos = 0, currentLine = 0, lineWidths = [];
	            var lineWidth = 0;
	            var maxLineWidth = 0;
	            var j, jLen;
	            var fontData = fontManager.getFontByName(documentData.f);
	            var charData, cLength = 0;
	            var styles = fontData.fStyle.split(' ');
	
	            var fWeight = 'normal', fStyle = 'normal';
	            len = styles.length;
	            for(i=0;i<len;i+=1){
	                if (styles[i].toLowerCase() === 'italic') {
	                    fStyle = 'italic';
	                }else if (styles[i].toLowerCase() === 'bold') {
	                    fWeight = '700';
	                } else if (styles[i].toLowerCase() === 'black') {
	                    fWeight = '900';
	                } else if (styles[i].toLowerCase() === 'medium') {
	                    fWeight = '500';
	                } else if (styles[i].toLowerCase() === 'regular' || styles[i].toLowerCase() === 'normal') {
	                    fWeight = '400';
	                } else if (styles[i].toLowerCase() === 'light' || styles[i].toLowerCase() === 'thin') {
	                    fWeight = '200';
	                }
	            }
	            documentData.fWeight = fWeight;
	            documentData.fStyle = fStyle;
	            len = documentData.t.length;
	            if(documentData.sz){
	                var boxWidth = documentData.sz[0];
	                var lastSpaceIndex = -1;
	                for(i=0;i<len;i+=1){
	                    newLineFlag = false;
	                    if(documentData.t.charAt(i) === ' '){
	                        lastSpaceIndex = i;
	                    }else if(documentData.t.charCodeAt(i) === 13){
	                        lineWidth = 0;
	                        newLineFlag = true;
	                    }
	                    if(fontManager.chars){
	                        charData = fontManager.getCharData(documentData.t.charAt(i), fontData.fStyle, fontData.fFamily);
	                        cLength = newLineFlag ? 0 : charData.w*documentData.s/100;
	                    }else{
	                        //tCanvasHelper.font = documentData.s + 'px '+ fontData.fFamily;
	                        cLength = fontManager.measureText(documentData.t.charAt(i), documentData.f, documentData.s);
	                    }
	                    if(lineWidth + cLength > boxWidth){
	                        if(lastSpaceIndex === -1){
	                            //i -= 1;
	                            documentData.t = documentData.t.substr(0,i) + "\r" + documentData.t.substr(i);
	                            len += 1;
	                        } else {
	                            i = lastSpaceIndex;
	                            documentData.t = documentData.t.substr(0,i) + "\r" + documentData.t.substr(i+1);
	                        }
	                        lastSpaceIndex = -1;
	                        lineWidth = 0;
	                    }else {
	                        lineWidth += cLength;
	                    }
	                }
	                len = documentData.t.length;
	            }
	            lineWidth = 0;
	            cLength = 0;
	            for (i = 0;i < len ;i += 1) {
	                newLineFlag = false;
	                if(documentData.t.charAt(i) === ' '){
	                    val = '\u00A0';
	                }else if(documentData.t.charCodeAt(i) === 13){
	                    lineWidths.push(lineWidth);
	                    maxLineWidth = lineWidth > maxLineWidth ? lineWidth : maxLineWidth;
	                    lineWidth = 0;
	                    val = '';
	                    newLineFlag = true;
	                    currentLine += 1;
	                }else{
	                    val = documentData.t.charAt(i);
	                }
	                if(fontManager.chars){
	                    charData = fontManager.getCharData(documentData.t.charAt(i), fontData.fStyle, fontManager.getFontByName(documentData.f).fFamily);
	                    cLength = newLineFlag ? 0 : charData.w*documentData.s/100;
	                }else{
	                    //var charWidth = fontManager.measureText(val, documentData.f, documentData.s);
	                    //tCanvasHelper.font = documentData.s + 'px '+ fontManager.getFontByName(documentData.f).fFamily;
	                    cLength = fontManager.measureText(val, documentData.f, documentData.s);
	                }
	
	                //
	                lineWidth += cLength;
	                letters.push({l:cLength,an:cLength,add:currentSize,n:newLineFlag, anIndexes:[], val: val, line: currentLine});
	                if(anchorGrouping == 2){
	                    currentSize += cLength;
	                    if(val == '' || val == '\u00A0' || i == len - 1){
	                        if(val == '' || val == '\u00A0'){
	                            currentSize -= cLength;
	                        }
	                        while(currentPos<=i){
	                            letters[currentPos].an = currentSize;
	                            letters[currentPos].ind = index;
	                            letters[currentPos].extra = cLength;
	                            currentPos += 1;
	                        }
	                        index += 1;
	                        currentSize = 0;
	                    }
	                }else if(anchorGrouping == 3){
	                    currentSize += cLength;
	                    if(val == '' || i == len - 1){
	                        if(val == ''){
	                            currentSize -= cLength;
	                        }
	                        while(currentPos<=i){
	                            letters[currentPos].an = currentSize;
	                            letters[currentPos].ind = index;
	                            letters[currentPos].extra = cLength;
	                            currentPos += 1;
	                        }
	                        currentSize = 0;
	                        index += 1;
	                    }
	                }else{
	                    letters[index].ind = index;
	                    letters[index].extra = 0;
	                    index += 1;
	                }
	            }
	            documentData.l = letters;
	            maxLineWidth = lineWidth > maxLineWidth ? lineWidth : maxLineWidth;
	            lineWidths.push(lineWidth);
	            if(documentData.sz){
	                documentData.boxWidth = documentData.sz[0];
	                documentData.justifyOffset = 0;
	            }else{
	                documentData.boxWidth = maxLineWidth;
	                switch(documentData.j){
	                    case 1:
	                        documentData.justifyOffset = - documentData.boxWidth;
	                        break;
	                    case 2:
	                        documentData.justifyOffset = - documentData.boxWidth/2;
	                        break;
	                    default:
	                        documentData.justifyOffset = 0;
	                }
	            }
	            documentData.lineWidths = lineWidths;
	
	            var animators = data.t.a;
	            jLen = animators.length;
	            var based, ind, indexes = [];
	            for(j=0;j<jLen;j+=1){
	                if(animators[j].a.sc){
	                    documentData.strokeColorAnim = true;
	                }
	                if(animators[j].a.sw){
	                    documentData.strokeWidthAnim = true;
	                }
	                if(animators[j].a.fc || animators[j].a.fh || animators[j].a.fs || animators[j].a.fb){
	                    documentData.fillColorAnim = true;
	                }
	                ind = 0;
	                based = animators[j].s.b;
	                for(i=0;i<len;i+=1){
	                    letters[i].anIndexes[j] = ind;
	                    if((based == 1 && letters[i].val != '') || (based == 2 && letters[i].val != '' && letters[i].val != '\u00A0') || (based == 3 && (letters[i].n || letters[i].val == '\u00A0' || i == len - 1)) || (based == 4 && (letters[i].n || i == len - 1))){
	                        if(animators[j].s.rn === 1){
	                            indexes.push(ind);
	                        }
	                        ind += 1;
	                    }
	                }
	                data.t.a[j].s.totalChars = ind;
	                var currentInd = -1, newInd;
	                if(animators[j].s.rn === 1){
	                    for(i = 0; i < len; i += 1){
	                        if(currentInd != letters[i].anIndexes[j]){
	                            currentInd = letters[i].anIndexes[j];
	                            newInd = indexes.splice(Math.floor(Math.random()*indexes.length),1)[0];
	                        }
	                        letters[i].anIndexes[j] = newInd;
	                    }
	                }
	            }
	            if(jLen === 0 && !('m' in data.t.p)){
	                data.singleShape = true;
	            }
	            documentData.yOffset = documentData.lh || documentData.s*1.2;
	            documentData.ls = documentData.ls || 0;
	            documentData.ascent = fontData.ascent*documentData.s/100;
	        }
	
	    }
	
	    var moduleOb = {};
	    moduleOb.completeData = completeData;
	
	    return moduleOb;
	}
	
	var dataManager = dataFunctionManager();
	var FontManager = (function(){
	
	    var maxWaitingTime = 5000;
	
	    function setUpNode(font, family){
	        var parentNode = document.createElement('span');
	        parentNode.style.fontFamily    = family;
	        var node = document.createElement('span');
	        // Characters that vary significantly among different fonts
	        node.innerHTML = 'giItT1WQy@!-/#';
	        // Visible - so we can measure it - but not on the screen
	        parentNode.style.position      = 'absolute';
	        parentNode.style.left          = '-10000px';
	        parentNode.style.top           = '-10000px';
	        // Large font size makes even subtle changes obvious
	        parentNode.style.fontSize      = '300px';
	        // Reset any font properties
	        parentNode.style.fontVariant   = 'normal';
	        parentNode.style.fontStyle     = 'normal';
	        parentNode.style.fontWeight    = 'normal';
	        parentNode.style.letterSpacing = '0';
	        parentNode.appendChild(node);
	        document.body.appendChild(parentNode);
	
	        // Remember width with no applied web font
	        var width = node.offsetWidth;
	        node.style.fontFamily = font + ', '+family;
	        return {node:node, w:width, parent:parentNode};
	    }
	
	    function checkLoadedFonts() {
	        var i, len = this.fonts.length;
	        var node, w;
	        var loadedCount = len;
	        for(i=0;i<len; i+= 1){
	            if(this.fonts[i].loaded){
	                loadedCount -= 1;
	                continue;
	            }
	            if(this.fonts[i].fOrigin === 't'){
	                if(window.Typekit && window.Typekit.load && this.typekitLoaded === 0){
	                    this.typekitLoaded = 1;
	                    try{window.Typekit.load({
	                        async: true,
	                        active: function() {
	                            this.typekitLoaded = 2;
	                        }.bind(this)
	                    });}catch(e){}
	                }
	                if(this.typekitLoaded === 2) {
	                    this.fonts[i].loaded = true;
	                }
	            } else if(this.fonts[i].fOrigin === 'n'){
	                this.fonts[i].loaded = true;
	            } else{
	                node = this.fonts[i].monoCase.node;
	                w = this.fonts[i].monoCase.w;
	                if(node.offsetWidth !== w){
	                    loadedCount -= 1;
	                    this.fonts[i].loaded = true;
	                }else{
	                    node = this.fonts[i].sansCase.node;
	                    w = this.fonts[i].sansCase.w;
	                    if(node.offsetWidth !== w){
	                        loadedCount -= 1;
	                        this.fonts[i].loaded = true;
	                    }
	                }
	                if(this.fonts[i].loaded){
	                    this.fonts[i].sansCase.parent.parentNode.removeChild(this.fonts[i].sansCase.parent);
	                    this.fonts[i].monoCase.parent.parentNode.removeChild(this.fonts[i].monoCase.parent);
	                }
	            }
	        }
	
	        if(loadedCount !== 0 && Date.now() - this.initTime < maxWaitingTime){
	            setTimeout(checkLoadedFonts.bind(this),20);
	        }else{
	            setTimeout(function(){this.loaded = true;}.bind(this),0);
	
	        }
	    };
	
	    function createHelper(def, fontData){
	        var tHelper = document.createElementNS(svgNS,'text');
	        tHelper.style.fontSize = '100px';
	        tHelper.style.fontFamily = fontData.fFamily;
	        tHelper.textContent = '1';
	        if(fontData.fClass){
	            tHelper.style.fontFamily = 'inherit';
	            tHelper.className = fontData.fClass;
	        } else {
	            tHelper.style.fontFamily = fontData.fFamily;
	        }
	        def.appendChild(tHelper);
	        var tCanvasHelper = document.createElement('canvas').getContext('2d');
	        tCanvasHelper.font = '100px '+ fontData.fFamily;
	        return tCanvasHelper;
	        return tHelper;
	    }
	
	    function addFonts(fontData, defs){
	        if(!fontData){
	            this.loaded = true;
	            return;
	        }
	        if(this.chars){
	            this.loaded = true;
	            this.fonts = fontData.list;
	            return;
	        }
	
	        var fontArr = fontData.list;
	        var i, len = fontArr.length;
	        for(i=0; i<len; i+= 1){
	            fontArr[i].loaded = false;
	            fontArr[i].monoCase = setUpNode(fontArr[i].fFamily,'monospace');
	            fontArr[i].sansCase = setUpNode(fontArr[i].fFamily,'sans-serif');
	            if(!fontArr[i].fPath) {
	                fontArr[i].loaded = true;
	            }else if(fontArr[i].fOrigin === 'p'){
	                var s = document.createElement('style');
	                s.type = "text/css";
	                s.innerHTML = "@font-face {" + "font-family: "+fontArr[i].fFamily+"; font-style: normal; src: url('"+fontArr[i].fPath+"');}";
	                defs.appendChild(s);
	            } else if(fontArr[i].fOrigin === 'g'){
	                //<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
	                var l = document.createElement('link');
	                l.type = "text/css";
	                l.rel = "stylesheet";
	                l.href = fontArr[i].fPath;
	                defs.appendChild(l);
	            } else if(fontArr[i].fOrigin === 't'){
	                //<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
	                var sc = document.createElement('script');
	                sc.setAttribute('src',fontArr[i].fPath);
	                defs.appendChild(sc);
	            }
	            fontArr[i].helper = createHelper(defs,fontArr[i]);
	            this.fonts.push(fontArr[i]);
	        }
	        checkLoadedFonts.bind(this)();
	    }
	
	    function addChars(chars){
	        if(!chars){
	            return;
	        }
	        if(!this.chars){
	            this.chars = [];
	        }
	        var i, len = chars.length;
	        var j, jLen = this.chars.length, found;
	        for(i=0;i<len;i+=1){
	            j = 0;
	            found = false;
	            while(j<jLen){
	                if(this.chars[j].style === chars[i].style && this.chars[j].fFamily === chars[i].fFamily && this.chars[j].ch === chars[i].ch){
	                    found = true;
	                }
	                j += 1;
	            }
	            if(!found){
	                this.chars.push(chars[i]);
	                jLen += 1;
	            }
	        }
	    }
	
	    function getCharData(char, style, font){
	        var i = 0, len = this.chars.length;
	        while( i < len) {
	            if(this.chars[i].ch === char && this.chars[i].style === style && this.chars[i].fFamily === font){
	                return this.chars[i];
	            }
	            i+= 1;
	        }
	    }
	
	    function measureText(char, fontName, size){
	        var fontData = this.getFontByName(fontName);
	        var tHelper = fontData.helper;
	        //tHelper.textContent = char;
	        return tHelper.measureText(char).width*size/100;
	        //return tHelper.getComputedTextLength()*size/100;
	    }
	
	    function getFontByName(name){
	        var i = 0, len = this.fonts.length;
	        while(i<len){
	            if(this.fonts[i].fName === name) {
	                return this.fonts[i];
	            }
	            i += 1;
	        }
	        return 'sans-serif';
	    }
	
	    var Font = function(){
	        this.fonts = [];
	        this.chars = null;
	        this.typekitLoaded = 0;
	        this.loaded = false;
	        this.initTime = Date.now();
	    };
	    Font.prototype.addChars = addChars;
	    Font.prototype.addFonts = addFonts;
	    Font.prototype.getCharData = getCharData;
	    Font.prototype.getFontByName = getFontByName;
	    Font.prototype.measureText = measureText;
	
	    return Font;
	
	}());
	var PropertyFactory = (function(){
	
	    var initFrame = -999999;
	
	    function getValue(){
	        if(this.elem.globalData.frameId === this.frameId){
	            return;
	        }
	        this.mdf = false;
	        var frameNum = this.comp.renderedFrame - this.offsetTime;
	        if(!(frameNum === this.lastFrame || (this.lastFrame !== initFrame && ((this.lastFrame >= this.keyframes[this.keyframes.length- 1].t-this.offsetTime && frameNum >= this.keyframes[this.keyframes.length- 1].t-this.offsetTime) || (this.lastFrame < this.keyframes[0].t-this.offsetTime && frameNum < this.keyframes[0].t-this.offsetTime))))){
	            var i = this.lastFrame < frameNum ? this._lastIndex : 0;
	            var len = this.keyframes.length- 1,flag = true;
	            var keyData, nextKeyData;
	
	            while(flag){
	                keyData = this.keyframes[i];
	                nextKeyData = this.keyframes[i+1];
	                if(i == len-1 && frameNum >= nextKeyData.t - this.offsetTime){
	                    if(keyData.h){
	                        keyData = nextKeyData;
	                    }
	                    break;
	                }
	                if((nextKeyData.t - this.offsetTime) > frameNum){
	                    break;
	                }
	                if(i < len - 1){
	                    i += 1;
	                }else{
	                    flag = false;
	                }
	            }
	
	            this._lastIndex = i;
	
	            var k, kLen,perc,jLen, j, fnc;
	            if(keyData.to){
	
	                if(!keyData.bezierData){
	                    bez.buildBezierData(keyData);
	                }
	                var bezierData = keyData.bezierData;
	                if(frameNum >= nextKeyData.t-this.offsetTime || frameNum < keyData.t-this.offsetTime){
	                    var ind = frameNum >= nextKeyData.t-this.offsetTime ? bezierData.points.length - 1 : 0;
	                    kLen = bezierData.points[ind].point.length;
	                    for(k = 0; k < kLen; k += 1){
	                        this.pv[k] = bezierData.points[ind].point[k];
	                        this.v[k] = this.mult ? this.pv[k]*this.mult : this.pv[k];
	                        if(this.lastPValue[k] !== this.pv[k]) {
	                            this.mdf = true;
	                            this.lastPValue[k] = this.pv[k];
	                        }
	                    }
	                    this._lastBezierData = null;
	                }else{
	                    if(keyData.__fnct){
	                        fnc = keyData.__fnct;
	                    }else{
	                        fnc = BezierFactory.getBezierEasing(keyData.o.x,keyData.o.y,keyData.i.x,keyData.i.y,keyData.n).get;
	                        keyData.__fnct = fnc;
	                    }
	                    perc = fnc((frameNum-(keyData.t-this.offsetTime))/((nextKeyData.t-this.offsetTime)-(keyData.t-this.offsetTime)));
	                    var distanceInLine = bezierData.segmentLength*perc;
	
	                    var segmentPerc;
	                    var addedLength =  (this.lastFrame < frameNum && this._lastBezierData === bezierData) ? this._lastAddedLength : 0;
	                    j =  (this.lastFrame < frameNum && this._lastBezierData === bezierData) ? this._lastPoint : 0;
	                    flag = true;
	                    jLen = bezierData.points.length;
	                    while(flag){
	                        addedLength +=bezierData.points[j].partialLength;
	                        if(distanceInLine === 0 || perc === 0 || j == bezierData.points.length - 1){
	                            kLen = bezierData.points[j].point.length;
	                            for(k=0;k<kLen;k+=1){
	                                this.pv[k] = bezierData.points[j].point[k];
	                                this.v[k] = this.mult ? this.pv[k]*this.mult : this.pv[k];
	                                if(this.lastPValue[k] !== this.pv[k]) {
	                                    this.mdf = true;
	                                    this.lastPValue[k] = this.pv[k];
	                                }
	                            }
	                            break;
	                        }else if(distanceInLine >= addedLength && distanceInLine < addedLength + bezierData.points[j+1].partialLength){
	                            segmentPerc = (distanceInLine-addedLength)/(bezierData.points[j+1].partialLength);
	                            kLen = bezierData.points[j].point.length;
	                            for(k=0;k<kLen;k+=1){
	                                this.pv[k] = bezierData.points[j].point[k] + (bezierData.points[j+1].point[k] - bezierData.points[j].point[k])*segmentPerc;
	                                this.v[k] = this.mult ? this.pv[k] * this.mult : this.pv[k];
	                                if(this.lastPValue[k] !== this.pv[k]) {
	                                    this.mdf = true;
	                                    this.lastPValue[k] = this.pv[k];
	                                }
	                            }
	                            break;
	                        }
	                        if(j < jLen - 1){
	                            j += 1;
	                        }else{
	                            flag = false;
	                        }
	                    }
	                    this._lastPoint = j;
	                    this._lastAddedLength = addedLength - bezierData.points[j].partialLength;
	                    this._lastBezierData = bezierData;
	                }
	            }else{
	                var outX,outY,inX,inY, keyValue;
	                len = keyData.s.length;
	                for(i=0;i<len;i+=1){
	                    if(keyData.h !== 1){
	                        if(frameNum >= nextKeyData.t-this.offsetTime){
	                            perc = 1;
	                        }else if(frameNum < keyData.t-this.offsetTime){
	                            perc = 0;
	                        }else{
	                            if(keyData.o.x instanceof Array){
	                                if(!keyData.__fnct){
	                                    keyData.__fnct = [];
	                                }
	                                if (!keyData.__fnct[i]) {
	                                    outX = keyData.o.x[i] || keyData.o.x[0];
	                                    outY = keyData.o.y[i] || keyData.o.y[0];
	                                    inX = keyData.i.x[i] || keyData.i.x[0];
	                                    inY = keyData.i.y[i] || keyData.i.y[0];
	                                    fnc = BezierFactory.getBezierEasing(outX,outY,inX,inY).get;
	                                    keyData.__fnct[i] = fnc;
	                                } else {
	                                    fnc = keyData.__fnct[i];
	                                }
	                            } else {
	                                if (!keyData.__fnct) {
	                                    outX = keyData.o.x;
	                                    outY = keyData.o.y;
	                                    inX = keyData.i.x;
	                                    inY = keyData.i.y;
	                                    fnc = BezierFactory.getBezierEasing(outX,outY,inX,inY).get;
	                                    keyData.__fnct = fnc;
	                                } else{
	                                    fnc = keyData.__fnct;
	                                }
	                            }
	                            perc = fnc((frameNum-(keyData.t-this.offsetTime))/((nextKeyData.t-this.offsetTime)-(keyData.t-this.offsetTime)));
	                        }
	                    }
	                    if(this.sh && keyData.h !== 1){
	                        var initP = keyData.s[i];
	                        var endP = keyData.e[i];
	                        if(initP-endP < -180){
	                            initP += 360;
	                        } else if(initP-endP > 180){
	                            initP -= 360;
	                        }
	                        keyValue = initP+(endP-initP)*perc;
	                    } else {
	                        keyValue = keyData.h === 1 ? keyData.s[i] : keyData.s[i]+(keyData.e[i]-keyData.s[i])*perc;
	                    }
	                    if(len === 1){
	                        this.v = this.mult ? keyValue*this.mult : keyValue;
	                        this.pv = keyValue;
	                        if(this.lastPValue != this.pv){
	                            this.mdf = true;
	                            this.lastPValue = this.pv;
	                        }
	                    }else{
	                        this.v[i] = this.mult ? keyValue*this.mult : keyValue;
	                        this.pv[i] = keyValue;
	                        if(this.lastPValue[i] !== this.pv[i]){
	                            this.mdf = true;
	                            this.lastPValue[i] = this.pv[i];
	                        }
	                    }
	                }
	            }
	        }
	        this.lastFrame = frameNum;
	        this.frameId = this.elem.globalData.frameId;
	    }
	
	    function getNoValue(){}
	
	    function ValueProperty(elem,data, mult){
	        this.mult = mult;
	        this.v = mult ? data.k * mult : data.k;
	        this.pv = data.k;
	        this.mdf = false;
	        this.comp = elem.comp;
	        this.k = false;
	        this.kf = false;
	        this.vel = 0;
	        this.getValue = getNoValue;
	    }
	
	    function MultiDimensionalProperty(elem,data, mult){
	        this.mult = mult;
	        this.data = data;
	        this.mdf = false;
	        this.comp = elem.comp;
	        this.k = false;
	        this.kf = false;
	        this.frameId = -1;
	        this.v = Array.apply(null, {length:data.k.length});
	        this.pv = Array.apply(null, {length:data.k.length});
	        this.lastValue = Array.apply(null, {length:data.k.length});
	        var arr = Array.apply(null, {length:data.k.length});
	        this.vel = arr.map(function () { return 0 });
	        var i, len = data.k.length;
	        for(i = 0;i<len;i+=1){
	            this.v[i] = mult ? data.k[i] * mult : data.k[i];
	            this.pv[i] = data.k[i];
	        }
	        this.getValue = getNoValue;
	    }
	
	    function KeyframedValueProperty(elem, data, mult){
	        this.keyframes = data.k;
	        this.offsetTime = elem.data.st;
	        this.lastValue = -99999;
	        this.lastPValue = -99999;
	        this.frameId = -1;
	        this._lastIndex = 0;
	        this.k = true;
	        this.kf = true;
	        this.data = data;
	        this.mult = mult;
	        this.elem = elem;
	        this.comp = elem.comp;
	        this.lastFrame = initFrame;
	        this.v = mult ? data.k[0].s[0]*mult : data.k[0].s[0];
	        this.pv = data.k[0].s[0];
	        this.getValue = getValue;
	    }
	
	    function KeyframedMultidimensionalProperty(elem, data, mult){
	        var i, len = data.k.length;
	        var s, e,to,ti;
	        for(i=0;i<len-1;i+=1){
	            if(data.k[i].to && data.k[i].s && data.k[i].e ){
	                s = data.k[i].s;
	                e = data.k[i].e;
	                to = data.k[i].to;
	                ti = data.k[i].ti;
	                if((s.length === 2 && !(s[0] === e[0] && s[1] === e[1]) && bez.pointOnLine2D(s[0],s[1],e[0],e[1],s[0] + to[0],s[1] + to[1]) && bez.pointOnLine2D(s[0],s[1],e[0],e[1],e[0] + ti[0],e[1] + ti[1])) || (s.length === 3 && !(s[0] === e[0] && s[1] === e[1] && s[2] === e[2]) && bez.pointOnLine3D(s[0],s[1],s[2],e[0],e[1],e[2],s[0] + to[0],s[1] + to[1],s[2] + to[2]) && bez.pointOnLine3D(s[0],s[1],s[2],e[0],e[1],e[2],e[0] + ti[0],e[1] + ti[1],e[2] + ti[2]))){
	                    data.k[i].to = null;
	                    data.k[i].ti = null;
	                }
	            }
	        }
	        this.keyframes = data.k;
	        this.offsetTime = elem.data.st;
	        this.k = true;
	        this.kf = true;
	        this.mult = mult;
	        this.elem = elem;
	        this.comp = elem.comp;
	        this.getValue = getValue;
	        this.frameId = -1;
	        this._lastIndex = 0;
	        this.v = Array.apply(null, {length:data.k[0].s.length});
	        this.pv = Array.apply(null, {length:data.k[0].s.length});
	        this.lastValue = Array.apply(null, {length:data.k[0].s.length});
	        this.lastPValue = Array.apply(null, {length:data.k[0].s.length});
	        this.lastFrame = initFrame;
	    }
	
	    var TransformProperty = (function() {
	        function positionGetter() {
	            return ExpressionValue(this.p);
	        }
	        function xPositionGetter() {
	            return ExpressionValue(this.px);
	        }
	        function yPositionGetter() {
	            return ExpressionValue(this.py);
	        }
	        function zPositionGetter() {
	            return ExpressionValue(this.pz);
	        }
	        function anchorGetter() {
	            return ExpressionValue(this.a);
	        }
	        function orientationGetter() {
	            return ExpressionValue(this.or);
	        }
	        function rotationGetter() {
	            return ExpressionValue(this.r, 1/degToRads);
	        }
	        function scaleGetter() {
	            return ExpressionValue(this.s, 100);
	        }
	        function opacityGetter() {
	            return ExpressionValue(this.o, 100);
	        }
	        function skewGetter() {
	            return ExpressionValue(this.sk);
	        }
	        function skewAxisGetter() {
	            return ExpressionValue(this.sa);
	        }
	        function applyToMatrix(mat) {
	            var i, len = this.dynamicProperties.length;
	            for(i = 0; i < len; i += 1) {
	                this.dynamicProperties[i].getValue();
	                if (this.dynamicProperties[i].mdf) {
	                    this.mdf = true;
	                }
	            }
	            if (this.a) {
	                mat.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
	            }
	            if (this.s) {
	                mat.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
	            }
	            if (this.r) {
	                mat.rotate(-this.r.v);
	            } else {
	                mat.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]);
	            }
	            if (this.data.p.s) {
	                if (this.data.p.z) {
	                    mat.translate(this.px.v, this.py.v, -this.pz.v);
	                } else {
	                    mat.translate(this.px.v, this.py.v, 0);
	                }
	            } else {
	                mat.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
	            }
	        }
	        function processKeys(){
	            if (this.elem.globalData.frameId === this.frameId) {
	                return;
	            }
	
	            this.mdf = false;
	            var i, len = this.dynamicProperties.length;
	
	            for(i = 0; i < len; i += 1) {
	                this.dynamicProperties[i].getValue();
	                if (this.dynamicProperties[i].mdf) {
	                    this.mdf = true;
	                }
	            }
	            if (this.mdf) {
	                this.v.reset();
	                if (this.a) {
	                    this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
	                }
	                if(this.s) {
	                    this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
	                }
	                if (this.sk) {
	                    this.v.skewFromAxis(-this.sk.v, this.sa.v);
	                }
	                if (this.r) {
	                    this.v.rotate(-this.r.v);
	                } else {
	                    this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]);
	                }
	                if (this.autoOriented && this.p.keyframes && this.p.getValueAtTime) {
	                    var v1,v2;
	                    if (this.p.lastFrame+this.p.offsetTime <= this.p.keyframes[0].t) {
	                        v1 = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / this.elem.globalData.frameRate,0);
	                        v2 = this.p.getValueAtTime(this.p.keyframes[0].t / this.elem.globalData.frameRate, 0);
	                    } else if(this.p.lastFrame+this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t) {
	                        v1 = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t / this.elem.globalData.frameRate), 0);
	                        v2 = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.01) / this.elem.globalData.frameRate, 0);
	                    } else {
	                        v1 = this.p.pv;
	                        v2 = this.p.getValueAtTime((this.p.lastFrame+this.p.offsetTime - 0.01) / this.elem.globalData.frameRate, this.p.offsetTime);
	                    }
	                    this.v.rotate(-Math.atan2(v1[1] - v2[1], v1[0] - v2[0]));
	                }
	                if(this.data.p.s){
	                    if(this.data.p.z) {
	                        this.v.translate(this.px.v, this.py.v, -this.pz.v);
	                    } else {
	                        this.v.translate(this.px.v, this.py.v, 0);
	                    }
	                }else{
	                    this.v.translate(this.p.v[0],this.p.v[1],-this.p.v[2]);
	                }
	            }
	            //console.log(this.v.to2dCSS())
	            this.frameId = this.elem.globalData.frameId;
	        }
	
	        function setInverted(){
	            this.inverted = true;
	            this.iv = new Matrix();
	            if(!this.k){
	                if(this.data.p.s){
	                    this.iv.translate(this.px.v,this.py.v,-this.pz.v);
	                }else{
	                    this.iv.translate(this.p.v[0],this.p.v[1],-this.p.v[2]);
	                }
	                if(this.r){
	                    this.iv.rotate(-this.r.v);
	                }else{
	                    this.iv.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v);
	                }
	                if(this.s){
	                    this.iv.scale(this.s.v[0],this.s.v[1],1);
	                }
	                if(this.a){
	                    this.iv.translate(-this.a.v[0],-this.a.v[1],this.a.v[2]);
	                }
	            }
	        }
	
	        function autoOrient(){
	            //
	            //var prevP = this.getValueAtTime();
	        }
	
	        return function TransformProperty(elem,data,arr){
	            this.elem = elem;
	            this.frameId = -1;
	            this.type = 'transform';
	            this.dynamicProperties = [];
	            this.mdf = false;
	            this.data = data;
	            this.getValue = processKeys;
	            this.applyToMatrix = applyToMatrix;
	            this.setInverted = setInverted;
	            this.autoOrient = autoOrient;
	            this.v = new Matrix();
	            if(data.p.s){
	                this.px = PropertyFactory.getProp(elem,data.p.x,0,0,this.dynamicProperties);
	                this.py = PropertyFactory.getProp(elem,data.p.y,0,0,this.dynamicProperties);
	                if(data.p.z){
	                    this.pz = PropertyFactory.getProp(elem,data.p.z,0,0,this.dynamicProperties);
	                }
	            }else{
	                this.p = PropertyFactory.getProp(elem,data.p,1,0,this.dynamicProperties);
	            }
	            if(data.r) {
	                this.r = PropertyFactory.getProp(elem, data.r, 0, degToRads, this.dynamicProperties);
	            } else if(data.rx) {
	                this.rx = PropertyFactory.getProp(elem, data.rx, 0, degToRads, this.dynamicProperties);
	                this.ry = PropertyFactory.getProp(elem, data.ry, 0, degToRads, this.dynamicProperties);
	                this.rz = PropertyFactory.getProp(elem, data.rz, 0, degToRads, this.dynamicProperties);
	                this.or = PropertyFactory.getProp(elem, data.or, 1, degToRads, this.dynamicProperties);
	            }
	            if(data.sk){
	                this.sk = PropertyFactory.getProp(elem, data.sk, 0, degToRads, this.dynamicProperties);
	                this.sa = PropertyFactory.getProp(elem, data.sa, 0, degToRads, this.dynamicProperties);
	            }
	            if(data.a) {
	                this.a = PropertyFactory.getProp(elem,data.a,1,0,this.dynamicProperties);
	            }
	            if(data.s) {
	                this.s = PropertyFactory.getProp(elem,data.s,1,0.01,this.dynamicProperties);
	            }
	            if(data.o){
	                this.o = PropertyFactory.getProp(elem,data.o,0,0.01,arr);
	            } else {
	                this.o = {mdf:false,v:1};
	            }
	            if(this.dynamicProperties.length){
	                arr.push(this);
	            }else{
	                if(this.a){
	                    this.v.translate(-this.a.v[0],-this.a.v[1],this.a.v[2]);
	                }
	                if(this.s){
	                    this.v.scale(this.s.v[0],this.s.v[1],this.s.v[2]);
	                }
	                if(this.sk){
	                    this.v.skewFromAxis(-this.sk.v,this.sa.v);
	                }
	                if(this.r){
	                    this.v.rotate(-this.r.v);
	                }else{
	                    this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]);
	                }
	                if(this.data.p.s){
	                    if(data.p.z) {
	                        this.v.translate(this.px.v, this.py.v, -this.pz.v);
	                    } else {
	                        this.v.translate(this.px.v, this.py.v, 0);
	                    }
	                }else{
	                    this.v.translate(this.p.v[0],this.p.v[1],-this.p.v[2]);
	                }
	            }
	            Object.defineProperty(this, "position", { get: positionGetter});
	            Object.defineProperty(this, "xPosition", { get: xPositionGetter});
	            Object.defineProperty(this, "yPosition", { get: yPositionGetter});
	            Object.defineProperty(this, "orientation", { get: orientationGetter});
	            Object.defineProperty(this, "anchorPoint", { get: anchorGetter});
	            Object.defineProperty(this, "rotation", { get: rotationGetter});
	            Object.defineProperty(this, "scale", { get: scaleGetter});
	            Object.defineProperty(this, "opacity", { get: opacityGetter});
	            Object.defineProperty(this, "skew", { get: skewGetter});
	            Object.defineProperty(this, "skewAxis", { get: skewAxisGetter});
	        }
	    }());
	
	    function getProp(elem,data,type, mult, arr) {
	        var p;
	        if(type === 2){
	            p = new TransformProperty(elem, data, arr);
	        } else if(data.a === 0){
	            if(type === 0) {
	                p = new ValueProperty(elem,data,mult);
	            } else {
	                p = new MultiDimensionalProperty(elem,data, mult);
	            }
	        } else if(data.a === 1){
	            if(type === 0) {
	                p = new KeyframedValueProperty(elem,data,mult);
	            } else {
	                p = new KeyframedMultidimensionalProperty(elem,data, mult);
	            }
	        } else if(!data.k.length){
	            p = new ValueProperty(elem,data, mult);
	        }else if(typeof(data.k[0]) === 'number'){
	            p = new MultiDimensionalProperty(elem,data, mult);
	        }else{
	            switch(type){
	                case 0:
	                    p = new KeyframedValueProperty(elem,data,mult);
	                    break;
	                case 1:
	                    p = new KeyframedMultidimensionalProperty(elem,data,mult);
	                    break;
	            }
	        }
	        if(p.k){
	            arr.push(p);
	        }
	        return p;
	    }
	
	    var getGradientProp = (function(){
	
	        function getValue(forceRender){
	            this.prop.getValue();
	            this.cmdf = false;
	            this.omdf = false;
	            if(this.prop.mdf || forceRender){
	                var i, len = this.data.p*4;
	                var mult, val;
	                for(i=0;i<len;i+=1){
	                    mult = i%4 === 0 ? 100 : 255;
	                    val = Math.round(this.prop.v[i]*mult);
	                    if(this.c[i] !== val){
	                        this.c[i] = val;
	                        this.cmdf = true;
	                    }
	                }
	                if(this.o.length){
	                    len = this.prop.v.length;
	                    for(i=this.data.p*4;i<len;i+=1){
	                        mult = i%2 === 0 ? 100 : 1;
	                        val = i%2 === 0 ?  Math.round(this.prop.v[i]*100):this.prop.v[i];
	                        if(this.o[i-this.data.p*4] !== val){
	                            this.o[i-this.data.p*4] = val;
	                            this.omdf = true;
	                        }
	                    }
	                }
	            }
	
	        }
	
	        function gradientProp(elem,data,arr){
	            this.prop = getProp(elem,data.k,1,null,[]);
	            this.data = data;
	            this.k = this.prop.k;
	            this.c = Array.apply(null,{length:data.p*4});
	            var cLength = data.k.k[0].s ? (data.k.k[0].s.length - data.p*4) : data.k.k.length - data.p*4;
	            this.o = Array.apply(null,{length:cLength});
	            this.cmdf = false;
	            this.omdf = false;
	            this.getValue = getValue;
	            if(this.prop.k){
	                arr.push(this);
	            }
	            this.getValue(true);
	        }
	
	        return function getGradientProp(elem,data,arr){
	            return new gradientProp(elem,data,arr);
	        }
	    }());
	
	
	
	
	    var DashProperty = (function(){
	
	        function processKeys(forceRender){
	            var i = 0, len = this.dataProps.length;
	
	            if(this.elem.globalData.frameId === this.frameId && !forceRender){
	                return;
	            }
	            this.mdf = false;
	            this.frameId = this.elem.globalData.frameId;
	            while(i<len){
	                if(this.dataProps[i].p.mdf){
	                    this.mdf = true;
	                    break;
	                }
	                i+=1;
	            }
	            if(this.mdf || forceRender){
	                if(this.renderer === 'svg') {
	                    this.dasharray = '';
	                }
	                for(i=0;i<len;i+=1){
	                    if(this.dataProps[i].n != 'o'){
	                        if(this.renderer === 'svg') {
	                            this.dasharray += ' ' + this.dataProps[i].p.v;
	                        }else{
	                            this.dasharray[i] = this.dataProps[i].p.v;
	                        }
	                    }else{
	                        this.dashoffset = this.dataProps[i].p.v;
	                    }
	                }
	            }
	        }
	
	        return function(elem, data,renderer, dynamicProperties){
	            this.elem = elem;
	            this.frameId = -1;
	            this.dataProps = new Array(data.length);
	            this.renderer = renderer;
	            this.mdf = false;
	            this.k = false;
	            if(this.renderer === 'svg'){
	                this.dasharray = '';
	            }else{
	
	                this.dasharray = new Array(data.length - 1);
	            }
	            this.dashoffset = 0;
	            var i, len = data.length, prop;
	            for(i=0;i<len;i+=1){
	                prop = PropertyFactory.getProp(elem,data[i].v,0, 0, dynamicProperties);
	                this.k = prop.k ? true : this.k;
	                this.dataProps[i] = {n:data[i].n,p:prop};
	            }
	            this.getValue = processKeys;
	            if(this.k){
	                dynamicProperties.push(this);
	            }else{
	                this.getValue(true);
	            }
	
	        }
	    }());
	
	    function getDashProp(elem, data,renderer, dynamicProperties) {
	        return new DashProperty(elem, data,renderer, dynamicProperties);
	    };
	
	    var TextSelectorProp = (function(){
	        var max = Math.max;
	        var min = Math.min;
	        var floor = Math.floor;
	        function updateRange(){
	            if(this.dynamicProperties.length){
	                var i, len = this.dynamicProperties.length;
	                for(i=0;i<len;i+=1){
	                    this.dynamicProperties[i].getValue();
	                    if(this.dynamicProperties[i].mdf){
	                        this.mdf = true;
	                    }
	                }
	            }
	            var totalChars = this.data.totalChars;
	            var divisor = this.data.r === 2 ? 1 : 100/totalChars;
	            var o = this.o.v/divisor;
	            var s = this.s.v/divisor + o;
	            var e = (this.e.v/divisor) + o;
	            if(s>e){
	                var _s = s;
	                s = e;
	                e = _s;
	            }
	            this.finalS = s;
	            this.finalE = e;
	        }
	
	        function getMult(ind){
	            //var easer = bez.getEasingCurve(this.ne.v/100,0,1-this.xe.v/100,1);
	            var easer = BezierFactory.getBezierEasing(this.ne.v/100,0,1-this.xe.v/100,1).get;
	            var mult = 0;
	            var s = this.finalS;
	            var e = this.finalE;
	            var type = this.data.sh;
	            if(type == 2){
	                if(e === s){
	                    mult = ind >= e ? 1 : 0;
	                }else{
	                    mult = max(0,min(0.5/(e-s) + (ind-s)/(e-s),1));
	                }
	                mult = easer(mult);
	            }else if(type == 3){
	                if(e === s){
	                    mult = ind >= e ? 0 : 1;
	                }else{
	                    mult = 1 - max(0,min(0.5/(e-s) + (ind-s)/(e-s),1));
	                }
	
	                mult = easer(mult);
	            }else if(type == 4){
	                if(e === s){
	                    mult = 0;
	                }else{
	                    mult = max(0,min(0.5/(e-s) + (ind-s)/(e-s),1));
	                    if(mult<.5){
	                        mult *= 2;
	                    }else{
	                        mult = 1 - 2*(mult-0.5);
	                    }
	                }
	                mult = easer(mult);
	            }else if(type == 5){
	                if(e === s){
	                    mult = 0;
	                }else{
	                    var tot = e - s;
	                    /*ind += 0.5;
	                    mult = -4/(tot*tot)*(ind*ind)+(4/tot)*ind;*/
	                    ind = min(max(0,ind+0.5-s),e-s);
	                    var x = -tot/2+ind;
	                    var a = tot/2;
	                    mult = Math.sqrt(1 - (x*x)/(a*a));
	                }
	                mult = easer(mult);
	            }else if(type == 6){
	                if(e === s){
	                    mult = 0;
	                }else{
	                    ind = min(max(0,ind+0.5-s),e-s);
	                    mult = (1+(Math.cos((Math.PI+Math.PI*2*(ind)/(e-s)))))/2;
	                    /*
	                     ind = Math.min(Math.max(s,ind),e-1);
	                     mult = (1+(Math.cos((Math.PI+Math.PI*2*(ind-s)/(e-1-s)))))/2;
	                     mult = Math.max(mult,(1/(e-1-s))/(e-1-s));*/
	                }
	                mult = easer(mult);
	            }else {
	                if(ind >= floor(s)){
	                    if(ind-s < 0){
	                        mult = 1 - (s - ind);
	                    }else{
	                        mult = max(0,min(e-ind,1));
	                    }
	                }
	                mult = easer(mult);
	            }
	            return mult*this.a.v;
	        }
	
	        return function TextSelectorProp(elem,data, arr){
	            this.mdf = false;
	            this.k = false;
	            this.data = data;
	            this.dynamicProperties = [];
	            this.getValue = updateRange;
	            this.getMult = getMult;
	            this.comp = elem.comp;
	            this.finalS = 0;
	            this.finalE = 0;
	            this.s = PropertyFactory.getProp(elem,data.s || {k:0},0,0,this.dynamicProperties);
	            if('e' in data){
	                this.e = PropertyFactory.getProp(elem,data.e,0,0,this.dynamicProperties);
	            }else{
	                this.e = {v:data.r === 2 ? data.totalChars : 100};
	            }
	            this.o = PropertyFactory.getProp(elem,data.o || {k:0},0,0,this.dynamicProperties);
	            this.xe = PropertyFactory.getProp(elem,data.xe || {k:0},0,0,this.dynamicProperties);
	            this.ne = PropertyFactory.getProp(elem,data.ne || {k:0},0,0,this.dynamicProperties);
	            this.a = PropertyFactory.getProp(elem,data.a,0,0.01,this.dynamicProperties);
	            if(this.dynamicProperties.length){
	                arr.push(this);
	            }else{
	                this.getValue();
	            }
	        }
	    }());
	
	    function getTextSelectorProp(elem, data,arr) {
	        return new TextSelectorProp(elem, data, arr);
	    };
	
	    var ob = {};
	    ob.getProp = getProp;
	    ob.getDashProp = getDashProp;
	    ob.getTextSelectorProp = getTextSelectorProp;
	    ob.getGradientProp = getGradientProp;
	    return ob;
	}());
	function ShapePath(){
		this.c = false;
		this._length = 0;
		this._maxLength = 8;
		this.v = Array.apply(null,{length:this._maxLength});
		this.o = Array.apply(null,{length:this._maxLength});
		this.i = Array.apply(null,{length:this._maxLength});
	};
	
	ShapePath.prototype.setPathData = function(closed, len) {
		this.c = closed;
		while(len > this._maxLength){
			this.doubleArrayLength();
		}
		var i = 0;
		while(i < len){
			this.v[i] = point_pool.newPoint();
			this.o[i] = point_pool.newPoint();
			this.i[i] = point_pool.newPoint();
			i += 1;
		}
		this._length = len;
	};
	
	ShapePath.prototype.doubleArrayLength = function() {
		this.v = this.v.concat(Array.apply(null,{length:this._maxLength}))
		this.i = this.i.concat(Array.apply(null,{length:this._maxLength}))
		this.o = this.o.concat(Array.apply(null,{length:this._maxLength}))
		this._maxLength *= 2;
	};
	
	ShapePath.prototype.setXYAt = function(x, y, type, pos, replace) {
		var arr;
		this._length = Math.max(this._length, pos + 1);
		if(this._length >= this._maxLength) {
			this.doubleArrayLength();
		}
		switch(type){
			case 'v':
				arr = this.v;
				break;
			case 'i':
				arr = this.i;
				break;
			case 'o':
				arr = this.o;
				break;
		}
		if(!arr[pos] || (arr[pos] && !replace)){
			arr[pos] = point_pool.newPoint();
		}
		arr[pos][0] = x;
		arr[pos][1] = y;
	};
	
	ShapePath.prototype.setTripleAt = function(vX,vY,oX,oY,iX,iY,pos, replace) {
		this.setXYAt(vX,vY,'v',pos, replace);
		this.setXYAt(oX,oY,'o',pos, replace);
		this.setXYAt(iX,iY,'i',pos, replace);
	};
	var ShapePropertyFactory = (function(){
	
	    var initFrame = -999999;
	
	    function interpolateShape() {
	        if(this.elem.globalData.frameId === this.frameId){
	            return;
	        }
	        this.mdf = false;
	        var frameNum = this.comp.renderedFrame - this.offsetTime;
	        if(!((this.lastFrame !== initFrame && ((this.lastFrame < this.keyframes[0].t-this.offsetTime && frameNum < this.keyframes[0].t-this.offsetTime) || (this.lastFrame > this.keyframes[this.keyframes.length - 1].t-this.offsetTime && frameNum > this.keyframes[this.keyframes.length - 1].t-this.offsetTime))))){
	            var keyPropS,keyPropE,isHold;
	            if(frameNum < this.keyframes[0].t-this.offsetTime){
	                keyPropS = this.keyframes[0].s[0];
	                isHold = true;
	                this._lastIndex = 0;
	            }else if(frameNum >= this.keyframes[this.keyframes.length - 1].t-this.offsetTime){
	                if(this.keyframes[this.keyframes.length - 2].h === 1){
	                    keyPropS = this.keyframes[this.keyframes.length - 1].s[0];
	                }else{
	                    keyPropS = this.keyframes[this.keyframes.length - 2].e[0];
	                }
	                isHold = true;
	            }else{
	                var i = this.lastFrame < initFrame ? this._lastIndex : 0;
	                var len = this.keyframes.length- 1,flag = true,keyData,nextKeyData, j, jLen, k, kLen;
	                while(flag){
	                    keyData = this.keyframes[i];
	                    nextKeyData = this.keyframes[i+1];
	                    if((nextKeyData.t - this.offsetTime) > frameNum){
	                        break;
	                    }
	                    if(i < len - 1){
	                        i += 1;
	                    }else{
	                        flag = false;
	                    }
	                }
	                isHold = keyData.h === 1;
	                this._lastIndex = i;
	
	                var perc;
	                if(!isHold){
	                    if(frameNum >= nextKeyData.t-this.offsetTime){
	                        perc = 1;
	                    }else if(frameNum < keyData.t-this.offsetTime){
	                        perc = 0;
	                    }else{
	                        var fnc;
	                        if(keyData.__fnct){
	                            fnc = keyData.__fnct;
	                        }else{
	                            fnc = BezierFactory.getBezierEasing(keyData.o.x,keyData.o.y,keyData.i.x,keyData.i.y).get;
	                            keyData.__fnct = fnc;
	                        }
	                        perc = fnc((frameNum-(keyData.t-this.offsetTime))/((nextKeyData.t-this.offsetTime)-(keyData.t-this.offsetTime)));
	                    }
	                    keyPropE = keyData.e[0];
	                }
	                keyPropS = keyData.s[0];
	            }
	            jLen = this.v._length;
	            kLen = keyPropS.i[0].length;
	            var hasModified = false;
	            var vertexValue;
	            for(j=0;j<jLen;j+=1){
	                for(k=0;k<kLen;k+=1){
	                    if(isHold){
	                        vertexValue = keyPropS.i[j][k];
	                        if(this.v.i[j][k] !== vertexValue){
	                            this.v.i[j][k] = vertexValue;
	                            this.pv.i[j][k] = vertexValue;
	                            hasModified = true;
	                        }
	                        vertexValue = keyPropS.o[j][k];
	                        if(this.v.o[j][k] !== vertexValue){
	                            this.v.o[j][k] = vertexValue;
	                            this.pv.o[j][k] = vertexValue;
	                            hasModified = true;
	                        }
	                        vertexValue = keyPropS.v[j][k];
	                        if(this.v.v[j][k] !== vertexValue){
	                            this.v.v[j][k] = vertexValue;
	                            this.pv.v[j][k] = vertexValue;
	                            hasModified = true;
	                        }
	                    }else{
	                        vertexValue = keyPropS.i[j][k]+(keyPropE.i[j][k]-keyPropS.i[j][k])*perc;
	                        if(this.v.i[j][k] !== vertexValue){
	                            this.v.i[j][k] = vertexValue;
	                            this.pv.i[j][k] = vertexValue;
	                            hasModified = true;
	                        }
	                        vertexValue = keyPropS.o[j][k]+(keyPropE.o[j][k]-keyPropS.o[j][k])*perc;
	                        if(this.v.o[j][k] !== vertexValue){
	                            this.v.o[j][k] = vertexValue;
	                            this.pv.o[j][k] = vertexValue;
	                            hasModified = true;
	                        }
	                        vertexValue = keyPropS.v[j][k]+(keyPropE.v[j][k]-keyPropS.v[j][k])*perc;
	                        if(this.v.v[j][k] !== vertexValue){
	                            this.v.v[j][k] = vertexValue;
	                            this.pv.v[j][k] = vertexValue;
	                            hasModified = true;
	                        }
	                    }
	                }
	            }
	            this.mdf = hasModified;
	            this.v.c = keyPropS.c;
	            this.paths = this.localShapeCollection;
	        }
	
	        this.lastFrame = frameNum;
	        this.frameId = this.elem.globalData.frameId;
	    }
	
	    function getShapeValue(){
	        return this.v;
	    }
	
	    function resetShape(){
	        this.paths = this.localShapeCollection;
	        if(!this.k){
	            this.mdf = false;
	        }
	    }
	
	    function ShapeProperty(elem, data, type){
	        this.comp = elem.comp;
	        this.k = false;
	        this.mdf = false;
	        this.v = shape_pool.newShape();
	        var pathData = type === 3 ? data.pt.k : data.ks.k;
	        this.v.v = pathData.v;
	        this.v.i = pathData.i;
	        this.v.o = pathData.o;
	        this.v.c = pathData.c;
	        this.v._length = this.v.v.length;
	        this.getValue = getShapeValue;
	        this.pv = shape_pool.clone(this.v);
	        this.localShapeCollection = shapeCollection_pool.newShapeCollection();
	        this.paths = this.localShapeCollection;
	        this.paths.addShape(this.v);
	        this.reset = resetShape;
	    }
	
	    function KeyframedShapeProperty(elem,data,type){
	        this.comp = elem.comp;
	        this.elem = elem;
	        this.offsetTime = elem.data.st;
	        this._lastIndex = 0;
	        this.getValue = interpolateShape;
	        this.keyframes = type === 3 ? data.pt.k : data.ks.k;
	        this.k = true;
	        this.kf = true;
	        var i, len = this.keyframes[0].s[0].i.length;
	        var jLen = this.keyframes[0].s[0].i[0].length;
	        this.v = shape_pool.newShape();
	        this.v.setPathData(this.keyframes[0].s[0].c, len);
	        this.pv = shape_pool.clone(this.v);
	        this.localShapeCollection = shapeCollection_pool.newShapeCollection();
	        this.paths = this.localShapeCollection;
	        this.paths.addShape(this.v);
	        this.lastFrame = initFrame;
	        this.reset = resetShape;
	    }
	
	    var EllShapeProperty = (function(){
	
	        var cPoint = roundCorner;
	
	        function convertEllToPath(){
	            var p0 = this.p.v[0], p1 = this.p.v[1], s0 = this.s.v[0]/2, s1 = this.s.v[1]/2;
	            if(this.d !== 3){
	                this.v.v[0][0] = p0;
	                this.v.v[0][1] = p1-s1;
	                this.v.v[1][0] = p0 + s0;
	                this.v.v[1][1] = p1;
	                this.v.v[2][0] = p0;
	                this.v.v[2][1] = p1+s1;
	                this.v.v[3][0] = p0 - s0;
	                this.v.v[3][1] = p1;
	                this.v.i[0][0] = p0 - s0*cPoint;
	                this.v.i[0][1] = p1 - s1;
	                this.v.i[1][0] = p0 + s0;
	                this.v.i[1][1] = p1 - s1*cPoint;
	                this.v.i[2][0] = p0 + s0*cPoint;
	                this.v.i[2][1] = p1 + s1;
	                this.v.i[3][0] = p0 - s0;
	                this.v.i[3][1] = p1 + s1*cPoint;
	                this.v.o[0][0] = p0 + s0*cPoint;
	                this.v.o[0][1] = p1 - s1;
	                this.v.o[1][0] = p0 + s0;
	                this.v.o[1][1] = p1 + s1*cPoint;
	                this.v.o[2][0] = p0 - s0*cPoint;
	                this.v.o[2][1] = p1 + s1;
	                this.v.o[3][0] = p0 - s0;
	                this.v.o[3][1] = p1 - s1*cPoint;
	            }else{
	                this.v.v[0][0] = p0;
	                this.v.v[0][1] = p1-s1;
	                this.v.v[1][0] = p0 - s0;
	                this.v.v[1][1] = p1;
	                this.v.v[2][0] = p0;
	                this.v.v[2][1] = p1+s1;
	                this.v.v[3][0] = p0 + s0;
	                this.v.v[3][1] = p1;
	                this.v.i[0][0] = p0 + s0*cPoint;
	                this.v.i[0][1] = p1 - s1;
	                this.v.i[1][0] = p0 - s0;
	                this.v.i[1][1] = p1 - s1*cPoint;
	                this.v.i[2][0] = p0 - s0*cPoint;
	                this.v.i[2][1] = p1 + s1;
	                this.v.i[3][0] = p0 + s0;
	                this.v.i[3][1] = p1 + s1*cPoint;
	                this.v.o[0][0] = p0 - s0*cPoint;
	                this.v.o[0][1] = p1 - s1;
	                this.v.o[1][0] = p0 - s0;
	                this.v.o[1][1] = p1 + s1*cPoint;
	                this.v.o[2][0] = p0 + s0*cPoint;
	                this.v.o[2][1] = p1 + s1;
	                this.v.o[3][0] = p0 + s0;
	                this.v.o[3][1] = p1 - s1*cPoint;
	            }
	        }
	
	        function processKeys(frameNum){
	            var i, len = this.dynamicProperties.length;
	            if(this.elem.globalData.frameId === this.frameId){
	                return;
	            }
	            this.mdf = false;
	            this.frameId = this.elem.globalData.frameId;
	
	            for(i=0;i<len;i+=1){
	                this.dynamicProperties[i].getValue(frameNum);
	                if(this.dynamicProperties[i].mdf){
	                    this.mdf = true;
	                }
	            }
	            if(this.mdf){
	                this.convertEllToPath();
	            }
	        }
	
	        return function EllShapeProperty(elem,data) {
	            /*this.v = {
	                v: Array.apply(null,{length:4}),
	                i: Array.apply(null,{length:4}),
	                o: Array.apply(null,{length:4}),
	                c: true
	            };*/
	            this.v = shape_pool.newShape();
	            this.v.setPathData(true, 4);
	            this.localShapeCollection = shapeCollection_pool.newShapeCollection();
	            this.paths = this.localShapeCollection;
	            this.localShapeCollection.addShape(this.v);
	            this.d = data.d;
	            this.dynamicProperties = [];
	            this.elem = elem;
	            this.comp = elem.comp;
	            this.frameId = -1;
	            this.mdf = false;
	            this.getValue = processKeys;
	            this.convertEllToPath = convertEllToPath;
	            this.reset = resetShape;
	            this.p = PropertyFactory.getProp(elem,data.p,1,0,this.dynamicProperties);
	            this.s = PropertyFactory.getProp(elem,data.s,1,0,this.dynamicProperties);
	            if(this.dynamicProperties.length){
	                this.k = true;
	            }else{
	                this.convertEllToPath();
	            }
	        }
	    }());
	
	    var StarShapeProperty = (function() {
	
	        function convertPolygonToPath(){
	            var numPts = Math.floor(this.pt.v);
	            var angle = Math.PI*2/numPts;
	            /*this.v.v.length = numPts;
	            this.v.i.length = numPts;
	            this.v.o.length = numPts;*/
	            var rad = this.or.v;
	            var roundness = this.os.v;
	            var perimSegment = 2*Math.PI*rad/(numPts*4);
	            var i, currentAng = -Math.PI/ 2;
	            var dir = this.data.d === 3 ? -1 : 1;
	            currentAng += this.r.v;
	            this.v._length = 0;
	            for(i=0;i<numPts;i+=1){
	                var x = rad * Math.cos(currentAng);
	                var y = rad * Math.sin(currentAng);
	                var ox = x === 0 && y === 0 ? 0 : y/Math.sqrt(x*x + y*y);
	                var oy = x === 0 && y === 0 ? 0 : -x/Math.sqrt(x*x + y*y);
	                x +=  + this.p.v[0];
	                y +=  + this.p.v[1];
	                this.v.setTripleAt(x,y,x-ox*perimSegment*roundness*dir,y-oy*perimSegment*roundness*dir,x+ox*perimSegment*roundness*dir,y+oy*perimSegment*roundness*dir, i, true);
	                /*this.v.v[i] = [x,y];
	                this.v.i[i] = [x+ox*perimSegment*roundness*dir,y+oy*perimSegment*roundness*dir];
	                this.v.o[i] = [x-ox*perimSegment*roundness*dir,y-oy*perimSegment*roundness*dir];*/
	                currentAng += angle*dir;
	            }
	            this.paths.length = 0;
	            this.paths[0] = this.v;
	        }
	
	        function convertStarToPath() {
	            var numPts = Math.floor(this.pt.v)*2;
	            var angle = Math.PI*2/numPts;
	            /*this.v.v.length = numPts;
	            this.v.i.length = numPts;
	            this.v.o.length = numPts;*/
	            var longFlag = true;
	            var longRad = this.or.v;
	            var shortRad = this.ir.v;
	            var longRound = this.os.v;
	            var shortRound = this.is.v;
	            var longPerimSegment = 2*Math.PI*longRad/(numPts*2);
	            var shortPerimSegment = 2*Math.PI*shortRad/(numPts*2);
	            var i, rad,roundness,perimSegment, currentAng = -Math.PI/ 2;
	            currentAng += this.r.v;
	            var dir = this.data.d === 3 ? -1 : 1;
	            this.v._length = 0;
	            for(i=0;i<numPts;i+=1){
	                rad = longFlag ? longRad : shortRad;
	                roundness = longFlag ? longRound : shortRound;
	                perimSegment = longFlag ? longPerimSegment : shortPerimSegment;
	                var x = rad * Math.cos(currentAng);
	                var y = rad * Math.sin(currentAng);
	                var ox = x === 0 && y === 0 ? 0 : y/Math.sqrt(x*x + y*y);
	                var oy = x === 0 && y === 0 ? 0 : -x/Math.sqrt(x*x + y*y);
	                x +=  + this.p.v[0];
	                y +=  + this.p.v[1];
	                this.v.setTripleAt(x,y,x-ox*perimSegment*roundness*dir,y-oy*perimSegment*roundness*dir,x+ox*perimSegment*roundness*dir,y+oy*perimSegment*roundness*dir, i, true);
	
	                /*this.v.v[i] = [x,y];
	                this.v.i[i] = [x+ox*perimSegment*roundness*dir,y+oy*perimSegment*roundness*dir];
	                this.v.o[i] = [x-ox*perimSegment*roundness*dir,y-oy*perimSegment*roundness*dir];
	                this.v._length = numPts;*/
	                longFlag = !longFlag;
	                currentAng += angle*dir;
	            }
	        }
	
	        function processKeys() {
	            if(this.elem.globalData.frameId === this.frameId){
	                return;
	            }
	            this.mdf = false;
	            this.frameId = this.elem.globalData.frameId;
	            var i, len = this.dynamicProperties.length;
	
	            for(i=0;i<len;i+=1){
	                this.dynamicProperties[i].getValue();
	                if(this.dynamicProperties[i].mdf){
	                    this.mdf = true;
	                }
	            }
	            if(this.mdf){
	                this.convertToPath();
	            }
	        }
	
	        return function StarShapeProperty(elem,data) {
	            /*this.v = {
	                v: [],
	                i: [],
	                o: [],
	                c: true
	            };*/
	            this.v = shape_pool.newShape();
	            this.v.setPathData(true, 0);
	            this.elem = elem;
	            this.comp = elem.comp;
	            this.data = data;
	            this.frameId = -1;
	            this.d = data.d;
	            this.dynamicProperties = [];
	            this.mdf = false;
	            this.getValue = processKeys;
	            this.reset = resetShape;
	            if(data.sy === 1){
	                this.ir = PropertyFactory.getProp(elem,data.ir,0,0,this.dynamicProperties);
	                this.is = PropertyFactory.getProp(elem,data.is,0,0.01,this.dynamicProperties);
	                this.convertToPath = convertStarToPath;
	            } else {
	                this.convertToPath = convertPolygonToPath;
	            }
	            this.pt = PropertyFactory.getProp(elem,data.pt,0,0,this.dynamicProperties);
	            this.p = PropertyFactory.getProp(elem,data.p,1,0,this.dynamicProperties);
	            this.r = PropertyFactory.getProp(elem,data.r,0,degToRads,this.dynamicProperties);
	            this.or = PropertyFactory.getProp(elem,data.or,0,0,this.dynamicProperties);
	            this.os = PropertyFactory.getProp(elem,data.os,0,0.01,this.dynamicProperties);
	            this.localShapeCollection = shapeCollection_pool.newShapeCollection();
	            this.localShapeCollection.addShape(this.v);
	            this.paths = this.localShapeCollection;
	            if(this.dynamicProperties.length){
	                this.k = true;
	            }else{
	                this.convertToPath();
	            }
	        }
	    }());
	
	    var RectShapeProperty = (function() {
	        function processKeys(frameNum){
	            if(this.elem.globalData.frameId === this.frameId){
	                return;
	            }
	            this.mdf = false;
	            this.frameId = this.elem.globalData.frameId;
	            var i, len = this.dynamicProperties.length;
	
	            for(i=0;i<len;i+=1){
	                this.dynamicProperties[i].getValue(frameNum);
	                if(this.dynamicProperties[i].mdf){
	                    this.mdf = true;
	                }
	            }
	            if(this.mdf){
	                this.convertRectToPath();
	            }
	
	        }
	
	        function convertRectToPath(){
	            var p0 = this.p.v[0], p1 = this.p.v[1], v0 = this.s.v[0]/2, v1 = this.s.v[1]/2;
	            var round = bm_min(v0,v1,this.r.v);
	            var cPoint = round*(1-roundCorner);
	            this.v._length = 0;
	
	            if(this.d === 2 || this.d === 1) {
	                this.v.setTripleAt(p0+v0, p1-v1+round,p0+v0, p1-v1+round,p0+v0,p1-v1+cPoint,0, true);
	                this.v.setTripleAt(p0+v0, p1+v1-round,p0+v0, p1+v1-cPoint,p0+v0, p1+v1-round,1, true);
	                if(round!== 0){
	                    this.v.setTripleAt(p0+v0-round, p1+v1,p0+v0-round,p1+v1,p0+v0-cPoint,p1+v1,2, true);
	                    this.v.setTripleAt(p0-v0+round,p1+v1,p0-v0+cPoint,p1+v1,p0-v0+round,p1+v1,3, true);
	                    this.v.setTripleAt(p0-v0,p1+v1-round,p0-v0,p1+v1-round,p0-v0,p1+v1-cPoint,4, true);
	                    this.v.setTripleAt(p0-v0,p1-v1+round,p0-v0,p1-v1+cPoint,p0-v0,p1-v1+round,5, true);
	                    this.v.setTripleAt(p0-v0+round,p1-v1,p0-v0+round,p1-v1,p0-v0+cPoint,p1-v1,6, true);
	                    this.v.setTripleAt(p0+v0-round,p1-v1,p0+v0-cPoint,p1-v1,p0+v0-round,p1-v1,7, true);
	                } else {
	                    this.v.setTripleAt(p0-v0,p1+v1,p0-v0+cPoint,p1+v1,p0-v0,p1+v1,2);
	                    this.v.setTripleAt(p0-v0,p1-v1,p0-v0,p1-v1+cPoint,p0-v0,p1-v1,3);
	                }
	            }else{
	                this.v.setTripleAt(p0+v0,p1-v1+round,p0+v0,p1-v1+cPoint,p0+v0,p1-v1+round,0, true);
	                if(round!== 0){
	                    this.v.setTripleAt(p0+v0-round,p1-v1,p0+v0-round,p1-v1,p0+v0-cPoint,p1-v1,1, true);
	                    this.v.setTripleAt(p0-v0+round,p1-v1,p0-v0+cPoint,p1-v1,p0-v0+round,p1-v1,2, true);
	                    this.v.setTripleAt(p0-v0,p1-v1+round,p0-v0,p1-v1+round,p0-v0,p1-v1+cPoint,3, true);
	                    this.v.setTripleAt(p0-v0,p1+v1-round,p0-v0,p1+v1-cPoint,p0-v0,p1+v1-round,4, true);
	                    this.v.setTripleAt(p0-v0+round,p1+v1,p0-v0+round,p1+v1,p0-v0+cPoint,p1+v1,5, true);
	                    this.v.setTripleAt(p0+v0-round,p1+v1,p0+v0-cPoint,p1+v1,p0+v0-round,p1+v1,6, true);
	                    this.v.setTripleAt(p0+v0,p1+v1-round,p0+v0,p1+v1-round,p0+v0,p1+v1-cPoint,7, true);
	                } else {
	                    this.v.setTripleAt(p0-v0,p1-v1,p0-v0+cPoint,p1-v1,p0-v0,p1-v1,1, true);
	                    this.v.setTripleAt(p0-v0,p1+v1,p0-v0,p1+v1-cPoint,p0-v0,p1+v1,2, true);
	                    this.v.setTripleAt(p0+v0,p1+v1,p0+v0-cPoint,p1+v1,p0+v0,p1+v1,3, true);
	
	                }
	            }
	        }
	
	        return function RectShapeProperty(elem,data) {
	            this.v = shape_pool.newShape();
	            this.v.c = true;
	            this.localShapeCollection = shapeCollection_pool.newShapeCollection();
	            this.localShapeCollection.addShape(this.v);
	            this.paths = this.localShapeCollection;
	            this.elem = elem;
	            this.comp = elem.comp;
	            this.frameId = -1;
	            this.d = data.d;
	            this.dynamicProperties = [];
	            this.mdf = false;
	            this.getValue = processKeys;
	            this.convertRectToPath = convertRectToPath;
	            this.reset = resetShape;
	            this.p = PropertyFactory.getProp(elem,data.p,1,0,this.dynamicProperties);
	            this.s = PropertyFactory.getProp(elem,data.s,1,0,this.dynamicProperties);
	            this.r = PropertyFactory.getProp(elem,data.r,0,0,this.dynamicProperties);
	            if(this.dynamicProperties.length){
	                this.k = true;
	            }else{
	                this.convertRectToPath();
	            }
	        }
	    }());
	
	    function getShapeProp(elem,data,type, arr){
	        var prop;
	        if(type === 3 || type === 4){
	            var dataProp = type === 3 ? data.pt : data.ks;
	            var keys = dataProp.k;
	            if(dataProp.a === 1 || keys.length){
	                prop = new KeyframedShapeProperty(elem, data, type);
	            }else{
	                prop = new ShapeProperty(elem, data, type);
	            }
	        }else if(type === 5){
	            prop = new RectShapeProperty(elem, data);
	        }else if(type === 6){
	            prop = new EllShapeProperty(elem, data);
	        }else if(type === 7){
	            prop = new StarShapeProperty(elem, data);
	        }
	        if(prop.k){
	            arr.push(prop);
	        }
	        return prop;
	    }
	
	    var ob = {};
	    ob.getShapeProp = getShapeProp;
	    return ob;
	}());
	var ShapeModifiers = (function(){
	    var ob = {};
	    var modifiers = {};
	    ob.registerModifier = registerModifier;
	    ob.getModifier = getModifier;
	
	    function registerModifier(nm,factory){
	        if(!modifiers[nm]){
	            modifiers[nm] = factory;
	        }
	    }
	
	    function getModifier(nm,elem, data, dynamicProperties){
	        return new modifiers[nm](elem, data, dynamicProperties);
	    }
	
	    return ob;
	}());
	
	function ShapeModifier(){}
	ShapeModifier.prototype.initModifierProperties = function(){};
	ShapeModifier.prototype.addShapeToModifier = function(){};
	ShapeModifier.prototype.addShape = function(data){
	    if(!this.closed){
	        this.shapes.push({shape:data.sh, data: data, localShapeCollection:shapeCollection_pool.newShapeCollection()});
	        this.addShapeToModifier(data.sh);
	    }
	}
	ShapeModifier.prototype.init = function(elem,data,dynamicProperties){
	    this.elem = elem;
	    this.frameId = -1;
	    this.shapes = [];
	    this.dynamicProperties = [];
	    this.mdf = false;
	    this.closed = false;
	    this.k = false;
	    this.isTrimming = false;
	    this.comp = elem.comp;
	    this.initModifierProperties(elem,data);
	    if(this.dynamicProperties.length){
	        this.k = true;
	        dynamicProperties.push(this);
	    }else{
	        this.getValue(true);
	    }
	}
	function TrimModifier(){};
	extendPrototype(ShapeModifier,TrimModifier);
	TrimModifier.prototype.processKeys = function(forceRender){
	    if(this.elem.globalData.frameId === this.frameId && !forceRender){
	        return;
	    }
	    this.mdf = forceRender ? true : false;
	    this.frameId = this.elem.globalData.frameId;
	    var i, len = this.dynamicProperties.length;
	
	    for(i=0;i<len;i+=1){
	        this.dynamicProperties[i].getValue();
	        if(this.dynamicProperties[i].mdf){
	            this.mdf = true;
	        }
	    }
	    if(this.mdf || forceRender){
	        var o = (this.o.v%360)/360;
	        if(o < 0){
	            o += 1;
	        }
	        var s = this.s.v + o;
	        var e = this.e.v + o;
	        if(s == e){
	
	        }
	        if(s>e){
	            var _s = s;
	            s = e;
	            e = _s;
	        }
	        this.sValue = s;
	        this.eValue = e;
	        this.oValue = o;
	    }
	}
	TrimModifier.prototype.initModifierProperties = function(elem,data){
	    this.sValue = 0;
	    this.eValue = 0;
	    this.oValue = 0;
	    this.getValue = this.processKeys;
	    this.s = PropertyFactory.getProp(elem,data.s,0,0.01,this.dynamicProperties);
	    this.e = PropertyFactory.getProp(elem,data.e,0,0.01,this.dynamicProperties);
	    this.o = PropertyFactory.getProp(elem,data.o,0,0,this.dynamicProperties);
	    this.m = data.m;
	    if(!this.dynamicProperties.length){
	        this.getValue(true);
	    }
	};
	
	TrimModifier.prototype.getSegmentsLength = function(shapeData){
	    var closed = shapeData.c;
	    var pathV = shapeData.v;
	    var pathO = shapeData.o;
	    var pathI = shapeData.i;
	    var i, len = shapeData._length;
	    var lengths = [];
	    var totalLength = 0;
	    for(i=0;i<len-1;i+=1){
	        lengths[i] = bez.getBezierLength(pathV[i],pathV[i+1],pathO[i],pathI[i+1]);
	        totalLength += lengths[i].addedLength;
	    }
	    if(closed){
	        lengths[i] = bez.getBezierLength(pathV[i],pathV[0],pathO[i],pathI[0]);
	        totalLength += lengths[i].addedLength;
	    }
	    return {lengths:lengths,totalLength:totalLength};
	}
	
	TrimModifier.prototype.calculateShapeEdges = function(s, e, shapeLength, addedLength, totalModifierLength) {
	    var segments = []
	    if(e <= 1){
	        segments.push({
	            s: s,
	            e: e
	        })
	    }else if(s >= 1){
	        segments.push({
	            s: s - 1,
	            e: e - 1
	        })
	    }else{
	        segments.push({
	            s: s,
	            e: 1
	        })
	        segments.push({
	            s: 0,
	            e: e - 1
	        })
	    }
	    var shapeSegments = [];
	    var i, len = segments.length, segmentOb;
	    for(i = 0; i < len; i += 1) {
	        segmentOb = segments[i];
	        if (segmentOb.e * totalModifierLength < addedLength || segmentOb.s * totalModifierLength > addedLength + shapeLength) {
	            
	        } else {
	            var shapeS, shapeE;
	            if(segmentOb.s * totalModifierLength <= addedLength) {
	                shapeS = 0;
	            } else {
	                shapeS = (segmentOb.s * totalModifierLength - addedLength) / shapeLength;
	            }
	            if(segmentOb.e * totalModifierLength >= addedLength + shapeLength) {
	                shapeE = 1;
	            } else {
	                shapeE = ((segmentOb.e * totalModifierLength - addedLength) / shapeLength);
	            }
	            shapeSegments.push([shapeS, shapeE]);
	        }
	    }
	    if(!shapeSegments.length){
	        shapeSegments.push([0,0]);
	    }
	    return shapeSegments;
	}
	
	TrimModifier.prototype.processShapes = function(firstFrame){
	    var shapePaths;
	    var i, len = this.shapes.length;
	    var j, jLen;
	    var s = this.sValue;
	    var e = this.eValue;
	    var pathsData,pathData, totalShapeLength, totalModifierLength = 0;
	
	    if(e === s){
	        for(i=0;i<len;i+=1){
	            this.shapes[i].localShapeCollection.releaseShapes();
	            this.shapes[i].shape.mdf = true;
	            this.shapes[i].shape.paths = this.shapes[i].localShapeCollection;
	        }
	    } else if(!((e === 1 && s === 0) || (e===0 && s === 1))){
	        var segments = [], shapeData, localShapeCollection;
	        for(i=0;i<len;i+=1){
	            shapeData = this.shapes[i];
	            if(!shapeData.shape.mdf && !this.mdf && !firstFrame && this.m !== 2){
	                shapeData.shape.paths = shapeData.localShapeCollection;
	            } else {
	                shapePaths = shapeData.shape.paths;
	                jLen = shapePaths._length;
	                totalShapeLength = 0;
	                if(!shapeData.shape.mdf && shapeData.pathsData){
	                    totalShapeLength = shapeData.totalShapeLength;
	                } else {
	                    pathsData = [];
	                    for(j=0;j<jLen;j+=1){
	                        pathData = this.getSegmentsLength(shapePaths.shapes[j]);
	                        pathsData.push(pathData);
	                        totalShapeLength += pathData.totalLength;
	                    }
	                    shapeData.totalShapeLength = totalShapeLength;
	                    shapeData.pathsData = pathsData;
	                }
	
	                totalModifierLength += totalShapeLength;
	                shapeData.shape.mdf = true;
	            }
	        }
	        var shapeS = s, shapeE = e, addedLength = 0;
	        var j, jLen;
	        for(i = len - 1; i >= 0; i -= 1){
	            shapeData = this.shapes[i];
	            if (shapeData.shape.mdf) {
	                localShapeCollection = shapeData.localShapeCollection;
	                localShapeCollection.releaseShapes();
	                if(this.m === 2 && len > 1) {
	                    var edges = this.calculateShapeEdges(s, e, shapeData.totalShapeLength, addedLength, totalModifierLength);
	                    addedLength += shapeData.totalShapeLength;
	                } else {
	                    edges = [[shapeS, shapeE]]
	                }
	                jLen = edges.length;
	                for (j = 0; j < jLen; j += 1) {
	                    shapeS = edges[j][0];
	                    shapeE = edges[j][1];
	                    segments.length = 0;
	                    if(shapeE <= 1){
	                        segments.push({
	                            s:shapeData.totalShapeLength * shapeS,
	                            e:shapeData.totalShapeLength * shapeE
	                        })
	                    }else if(shapeS >= 1){
	                        segments.push({
	                            s:shapeData.totalShapeLength * (shapeS - 1),
	                            e:shapeData.totalShapeLength * (shapeE - 1)
	                        })
	                    }else{
	                        segments.push({
	                            s:shapeData.totalShapeLength * shapeS,
	                            e:shapeData.totalShapeLength
	                        })
	                        segments.push({
	                            s:0,
	                            e:shapeData.totalShapeLength*(shapeE - 1)
	                        })
	                    }
	                    var newShapesData = this.addShapes(shapeData,segments[0]);
	                    if (segments[0].s !== segments[0].e) {
	                        var lastPos;
	                        if(segments.length > 1){
	                            if(shapeData.shape.v.c){
	                                var lastShape = newShapesData.pop();
	                                this.addPaths(newShapesData, localShapeCollection);
	                                newShapesData = this.addShapes(shapeData,segments[1], lastShape);
	                            } else {
	                                this.addPaths(newShapesData, localShapeCollection);
	                                newShapesData = this.addShapes(shapeData,segments[1]);
	                            }
	                        } 
	                        this.addPaths(newShapesData, localShapeCollection);
	                    }
	                    
	                }
	                shapeData.shape.paths = localShapeCollection;
	            }
	        }
	    } else if(this.mdf){
	        for(i=0;i<len;i+=1){
	            this.shapes[i].shape.mdf = true;
	        }
	    }
	    if(!this.dynamicProperties.length){
	        this.mdf = false;
	    }
	}
	
	TrimModifier.prototype.addPaths = function(newPaths, localShapeCollection) {
	    var i, len = newPaths.length;
	    for(i = 0; i < len; i += 1) {
	        localShapeCollection.addShape(newPaths[i])
	    }
	}
	
	TrimModifier.prototype.addSegment = function(pt1,pt2,pt3,pt4,shapePath,pos, newShape) {
	    /*console.log(pt1, 'vertex: v, at: ', pos);
	    console.log(pt2, 'vertex: o, at: ', pos);
	    console.log(pt3, 'vertex: i, at: ', pos + 1);
	    console.log(pt4, 'vertex: v, at: ', pos + 1);
	    console.log('newShape: ', newShape);*/
	    shapePath.setXYAt(pt2[0],pt2[1],'o',pos);
	    shapePath.setXYAt(pt3[0],pt3[1],'i',pos + 1);
	    if(newShape){
	        shapePath.setXYAt(pt1[0],pt1[1],'v',pos);
	    }
	    shapePath.setXYAt(pt4[0],pt4[1],'v',pos + 1);
	}
	
	TrimModifier.prototype.addShapes = function(shapeData, shapeSegment, shapePath){
	    var pathsData = shapeData.pathsData;
	    var shapePaths = shapeData.shape.paths.shapes;
	    var i, len = shapeData.shape.paths._length, j, jLen;
	    var addedLength = 0;
	    var currentLengthData,segmentCount;
	    var lengths;
	    var segment;
	    var shapes = [];
	    var initPos;
	    var newShape = true;
	    if(!shapePath){
	        shapePath = shape_pool.newShape();
	        segmentCount = 0;
	        initPos = 0;
	    } else {
	        segmentCount = shapePath._length;
	        initPos = shapePath._length;
	    }
	    shapes.push(shapePath);
	    for(i=0;i<len;i+=1){
	        lengths = pathsData[i].lengths;
	        shapePath.c = shapePaths[i].c;
	        jLen = shapePaths[i].c ? lengths.length : lengths.length + 1;
	        for(j=1;j<jLen;j+=1){
	            currentLengthData = lengths[j-1];
	            if(addedLength + currentLengthData.addedLength < shapeSegment.s){
	                addedLength += currentLengthData.addedLength;
	                shapePath.c = false;
	            } else if(addedLength > shapeSegment.e){
	                shapePath.c = false;
	                break;
	            } else {
	                if(shapeSegment.s <= addedLength && shapeSegment.e >= addedLength + currentLengthData.addedLength){
	                    this.addSegment(shapePaths[i].v[j-1],shapePaths[i].o[j-1],shapePaths[i].i[j],shapePaths[i].v[j],shapePath,segmentCount,newShape);
	                    newShape = false;
	                } else {
	                    segment = bez.getNewSegment(shapePaths[i].v[j-1],shapePaths[i].v[j],shapePaths[i].o[j-1],shapePaths[i].i[j], (shapeSegment.s - addedLength)/currentLengthData.addedLength,(shapeSegment.e - addedLength)/currentLengthData.addedLength, lengths[j-1]);
	                    this.addSegment(segment.pt1,segment.pt3,segment.pt4,segment.pt2,shapePath,segmentCount,newShape);
	                    newShape = false;
	                    shapePath.c = false;
	                }
	                addedLength += currentLengthData.addedLength;
	                segmentCount += 1;
	            }
	        }
	        if(shapePaths[i].c){
	            currentLengthData = lengths[j-1];
	            if(addedLength <= shapeSegment.e){
	                var segmentLength = lengths[j-1].addedLength;
	                if(shapeSegment.s <= addedLength && shapeSegment.e >= addedLength + segmentLength){
	                    this.addSegment(shapePaths[i].v[j-1],shapePaths[i].o[j-1],shapePaths[i].i[0],shapePaths[i].v[0],shapePath,segmentCount,newShape);
	                    newShape = false;
	                }else{
	                    segment = bez.getNewSegment(shapePaths[i].v[j-1],shapePaths[i].v[0],shapePaths[i].o[j-1],shapePaths[i].i[0], (shapeSegment.s - addedLength)/segmentLength,(shapeSegment.e - addedLength)/segmentLength, lengths[j-1]);
	                    this.addSegment(segment.pt1,segment.pt3,segment.pt4,segment.pt2,shapePath,segmentCount,newShape);
	                    newShape = false;
	                    shapePath.c = false;
	                }
	            } else {
	                shapePath.c = false;
	            }
	            addedLength += currentLengthData.addedLength;
	            segmentCount += 1;
	        }
	        if(shapePath._length){
	            shapePath.setXYAt(shapePath.v[initPos][0],shapePath.v[initPos][1],'i',initPos);
	            shapePath.setXYAt(shapePath.v[shapePath._length - 1][0],shapePath.v[shapePath._length - 1][1],'o',shapePath._length - 1);
	        }
	        if(addedLength > shapeSegment.e){
	            break;
	        }
	        if(i<len-1){
	            shapePath = shape_pool.newShape();
	            newShape = true;
	            shapes.push(shapePath);
	            segmentCount = 0;
	        }
	    }
	    return shapes;
	
	}
	
	
	ShapeModifiers.registerModifier('tm',TrimModifier);
	function RoundCornersModifier(){};
	extendPrototype(ShapeModifier,RoundCornersModifier);
	RoundCornersModifier.prototype.processKeys = function(forceRender){
	    if(this.elem.globalData.frameId === this.frameId && !forceRender){
	        return;
	    }
	    this.mdf = forceRender ? true : false;
	    this.frameId = this.elem.globalData.frameId;
	    var i, len = this.dynamicProperties.length;
	
	    for(i=0;i<len;i+=1){
	        this.dynamicProperties[i].getValue();
	        if(this.dynamicProperties[i].mdf){
	            this.mdf = true;
	        }
	    }
	}
	RoundCornersModifier.prototype.initModifierProperties = function(elem,data){
	    this.getValue = this.processKeys;
	    this.rd = PropertyFactory.getProp(elem,data.r,0,null,this.dynamicProperties);
	    if(!this.dynamicProperties.length){
	        this.getValue(true);
	    }
	};
	
	RoundCornersModifier.prototype.processPath = function(path, round){
	    var cloned_path = shape_pool.newShape();
	    cloned_path.c = path.c;
	    var i, len = path._length;
	    var currentV,currentI,currentO,closerV, newV,newO,newI,distance,newPosPerc,index = 0;
	    var vX,vY,oX,oY,iX,iY;
	    for(i=0;i<len;i+=1){
	        currentV = path.v[i];
	        currentO = path.o[i];
	        currentI = path.i[i];
	        if(currentV[0]===currentO[0] && currentV[1]===currentO[1] && currentV[0]===currentI[0] && currentV[1]===currentI[1]){
	            if((i===0 || i === len - 1) && !path.c){
	                cloned_path.setTripleAt(currentV[0],currentV[1],currentO[0],currentO[1],currentI[0],currentI[1],index);
	                /*cloned_path.v[index] = currentV;
	                cloned_path.o[index] = currentO;
	                cloned_path.i[index] = currentI;*/
	                index += 1;
	            } else {
	                if(i===0){
	                    closerV = path.v[len-1];
	                } else {
	                    closerV = path.v[i-1];
	                }
	                distance = Math.sqrt(Math.pow(currentV[0]-closerV[0],2)+Math.pow(currentV[1]-closerV[1],2));
	                newPosPerc = distance ? Math.min(distance/2,round)/distance : 0;
	                vX = iX = currentV[0]+(closerV[0]-currentV[0])*newPosPerc;
	                vY = iY = currentV[1]-(currentV[1]-closerV[1])*newPosPerc;
	                oX = vX-(vX-currentV[0])*roundCorner;
	                oY = vY-(vY-currentV[1])*roundCorner;
	                cloned_path.setTripleAt(vX,vY,oX,oY,iX,iY,index);
	                /*newV = [currentV[0]+(closerV[0]-currentV[0])*newPosPerc,currentV[1]-(currentV[1]-closerV[1])*newPosPerc];
	                newI = newV;
	                newO = [newV[0]-(newV[0]-currentV[0])*roundCorner,newV[1]-(newV[1]-currentV[1])*roundCorner];
	                cloned_path.v[index] = newV;
	                cloned_path.i[index] = newI;
	                cloned_path.o[index] = newO;*/
	                index += 1;
	
	                if(i === len - 1){
	                    closerV = path.v[0];
	                } else {
	                    closerV = path.v[i+1];
	                }
	                distance = Math.sqrt(Math.pow(currentV[0]-closerV[0],2)+Math.pow(currentV[1]-closerV[1],2));
	                newPosPerc = distance ? Math.min(distance/2,round)/distance : 0;
	                vX = oX = currentV[0]+(closerV[0]-currentV[0])*newPosPerc;
	                vY = oY = currentV[1]+(closerV[1]-currentV[1])*newPosPerc;
	                iX = vX-(vX-currentV[0])*roundCorner;
	                iY = vY-(vY-currentV[1])*roundCorner;
	                cloned_path.setTripleAt(vX,vY,oX,oY,iX,iY,index);
	
	                /*newV = [currentV[0]+(closerV[0]-currentV[0])*newPosPerc,currentV[1]+(closerV[1]-currentV[1])*newPosPerc];
	                newI = [newV[0]-(newV[0]-currentV[0])*roundCorner,newV[1]-(newV[1]-currentV[1])*roundCorner];
	                newO = newV;
	                cloned_path.v[index] = newV;
	                cloned_path.i[index] = newI;
	                cloned_path.o[index] = newO;*/
	                index += 1;
	            }
	        } else {
	            /*cloned_path.v[index] = path.v[i];
	            cloned_path.o[index] = path.o[i];
	            cloned_path.i[index] = path.i[i];*/
	            cloned_path.setTripleAt(path.v[i][0],path.v[i][1],path.o[i][0],path.o[i][1],path.i[i][0],path.i[i][1],index);
	            index += 1;
	        }
	    }
	    return cloned_path;
	}
	
	RoundCornersModifier.prototype.processShapes = function(firstFrame){
	    var shapePaths;
	    var i, len = this.shapes.length;
	    var j, jLen;
	    var rd = this.rd.v;
	
	    if(rd !== 0){
	        var shapeData, newPaths, localShapeCollection;
	        for(i=0;i<len;i+=1){
	            shapeData = this.shapes[i];
	            newPaths = shapeData.shape.paths;
	            localShapeCollection = shapeData.localShapeCollection;
	            if(!(!shapeData.shape.mdf && !this.mdf && !firstFrame)){
	                localShapeCollection.releaseShapes();
	                shapeData.shape.mdf = true;
	                shapePaths = shapeData.shape.paths.shapes;
	                jLen = shapeData.shape.paths._length;
	                for(j=0;j<jLen;j+=1){
	                    localShapeCollection.addShape(this.processPath(shapePaths[j],rd));
	                }
	            }
	            shapeData.shape.paths = shapeData.localShapeCollection;
	        }
	
	    }
	    if(!this.dynamicProperties.length){
	        this.mdf = false;
	    }
	}
	
	
	ShapeModifiers.registerModifier('rd',RoundCornersModifier);
	function RepeaterModifier(){};
	extendPrototype(ShapeModifier,RepeaterModifier);
	RepeaterModifier.prototype.processKeys = function(forceRender){
	    if(this.elem.globalData.frameId === this.frameId && !forceRender){
	        return;
	    }
	    this.mdf = forceRender ? true : false;
	    this.frameId = this.elem.globalData.frameId;
	    var i, len = this.dynamicProperties.length;
	
	    for(i=0;i<len;i+=1){
	        this.dynamicProperties[i].getValue();
	        if(this.dynamicProperties[i].mdf){
	            this.mdf = true;
	        }
	    }
	};
	RepeaterModifier.prototype.initModifierProperties = function(elem,data){
	    this.getValue = this.processKeys;
	    this.c = PropertyFactory.getProp(elem,data.c,0,null,this.dynamicProperties);
	    this.o = PropertyFactory.getProp(elem,data.o,0,null,this.dynamicProperties);
	    this.tr = PropertyFactory.getProp(elem,data.tr,2,null,this.dynamicProperties);
	    if(!this.dynamicProperties.length){
	        this.getValue(true);
	    }
	    this.pMatrix = new Matrix();
	    this.rMatrix = new Matrix();
	    this.sMatrix = new Matrix();
	    this.tMatrix = new Matrix();
	    this.matrix = new Matrix();
	};
	
	RepeaterModifier.prototype.applyTransforms = function(pMatrix, rMatrix, sMatrix, transform, perc, inv){
	    var dir = inv ? -1 : 1;
	    var scaleX = transform.s.v[0] + (1 - transform.s.v[0]) * (1 - perc);
	    var scaleY = transform.s.v[1] + (1 - transform.s.v[1]) * (1 - perc);
	    pMatrix.translate(transform.p.v[0] * dir * perc, transform.p.v[1] * dir * perc, transform.p.v[2]);
	    rMatrix.translate(-transform.a.v[0], -transform.a.v[1], transform.a.v[2]);
	    rMatrix.rotate(-transform.r.v * dir * perc);
	    rMatrix.translate(transform.a.v[0], transform.a.v[1], transform.a.v[2]);
	    sMatrix.translate(-transform.a.v[0], -transform.a.v[1], transform.a.v[2]);
	    sMatrix.scale(inv ? 1/scaleX : scaleX, inv ? 1/scaleY : scaleY);
	    sMatrix.translate(transform.a.v[0], transform.a.v[1], transform.a.v[2]);
	}
	
	RepeaterModifier.prototype.processShapes = function(firstFrame){
	    if(!this.dynamicProperties.length){
	        this.mdf = false;
	    }
	    var i, len = this.shapes.length;
	    var j, jLen;
	    var shapeData, localShapeCollection, currentPath;
	    var copies = Math.ceil(this.c.v);
	    var offset = this.o.v;
	    var offsetModulo = offset%1;
	    var roundOffset = offset > 0 ? Math.floor(offset) : Math.ceil(offset);
	    var k, pathData, shapeCollection, shapeCollectionList;
	    var tMat = this.tr.v.props;
	    var pProps = this.pMatrix.props;
	    var rProps = this.rMatrix.props;
	    var sProps = this.sMatrix.props;
	    var iteration = 0;
	    var l, lLen, tProps,transformers, maxLvl;
	    for(i=0;i<len;i+=1){
	        shapeData = this.shapes[i];
	        localShapeCollection = shapeData.localShapeCollection;
	        if(!(!shapeData.shape.mdf && !this.mdf && !firstFrame)){
	            localShapeCollection.releaseShapes();
	            shapeData.shape.mdf = true;
	            shapeCollection = shapeData.shape.paths;
	            shapeCollectionList = shapeCollection.shapes;
	            jLen = shapeCollection._length;
	            iteration = 0;
	            this.pMatrix.reset();
	            this.rMatrix.reset();
	            this.sMatrix.reset();
	            this.tMatrix.reset();
	            this.matrix.reset();
	
	            if(offset > 0) {
	                while(iteration<roundOffset){
	                    this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false);
	                    iteration += 1;
	                }
	                if(offsetModulo){
	                    this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, offsetModulo, false);
	                    iteration += offsetModulo;
	                }
	            } else if(roundOffset < 0) {
	                while(iteration>roundOffset){
	                    this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, true);
	                    iteration -= 1;
	                }
	                if(offsetModulo){
	                    this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, - offsetModulo, true);
	                    iteration -= offsetModulo;
	                }
	            }
	            for(j=0;j<jLen;j+=1){
	                currentPath = shapeCollectionList[j];
	                for(k=0;k<copies;k+=1) {
	                    if(k !== 0) {
	                        this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false);
	                    }
	                    if(shapeData.data.transformers) {
	                        shapeData.data.lvl = 0;
	                        maxLvl = 0;
	                        lLen = shapeData.data.elements.length;
	                        for(l = 0; l < lLen; l += 1) {
	                            maxLvl = Math.max(maxLvl, shapeData.data.elements[l].st.lvl);
	                        } 
	                        transformers = shapeData.data.transformers;
	                        lLen = transformers.length;
	                        for(l = lLen - 1; l >= maxLvl; l -= 1) {
	                            tProps = transformers[l].mProps.v.props;
	                            this.matrix.transform(tProps[0],tProps[1],tProps[2],tProps[3],tProps[4],tProps[5],tProps[6],tProps[7],tProps[8],tProps[9],tProps[10],tProps[11],tProps[12],tProps[13],tProps[14],tProps[15]);
	                        }
	                    }
	                    if(iteration !== 0){
	                        this.matrix.transform(rProps[0],rProps[1],rProps[2],rProps[3],rProps[4],rProps[5],rProps[6],rProps[7],rProps[8],rProps[9],rProps[10],rProps[11],rProps[12],rProps[13],rProps[14],rProps[15]);
	                        this.matrix.transform(sProps[0],sProps[1],sProps[2],sProps[3],sProps[4],sProps[5],sProps[6],sProps[7],sProps[8],sProps[9],sProps[10],sProps[11],sProps[12],sProps[13],sProps[14],sProps[15]);
	                        this.matrix.transform(pProps[0],pProps[1],pProps[2],pProps[3],pProps[4],pProps[5],pProps[6],pProps[7],pProps[8],pProps[9],pProps[10],pProps[11],pProps[12],pProps[13],pProps[14],pProps[15]);
	                    }
	                    localShapeCollection.addShape(this.processPath(currentPath, this.matrix));
	                    this.matrix.reset();
	                    iteration += 1;
	                }
	            }
	        }
	        shapeData.shape.paths = localShapeCollection;
	    }
	};
	
	RepeaterModifier.prototype.processPath = function(path, transform) {
	    var clonedPath = shape_pool.clone(path, transform);
	    return clonedPath;
	};
	
	
	ShapeModifiers.registerModifier('rp',RepeaterModifier);
	function ShapeCollection(){
		this._length = 0;
		this._maxLength = 4;
		this.shapes = Array.apply(null,{length:this._maxLength});
	};
	
	ShapeCollection.prototype.addShape = function(shapeData){
		if(this._length === this._maxLength){
			this.shapes = this.shapes.concat(Array.apply(null,{length:this._maxLength}));
			this._maxLength *= 2;
		}
		this.shapes[this._length] = shapeData;
		this._length += 1;
	};
	
	ShapeCollection.prototype.releaseShapes = function(){
		var i;
		for(i = 0; i < this._length; i += 1) {
			shape_pool.release(this.shapes[i]);
		}
		this._length = 0;
	};
	var ImagePreloader = (function(){
	
	    function imageLoaded(){
	        this.loadedAssets += 1;
	        if(this.loadedAssets === this.totalImages){
	        }
	    }
	
	    function getAssetsPath(assetData){
	        var path = '';
	        if(this.assetsPath){
	            var imagePath = assetData.p;
	            if(imagePath.indexOf('images/') !== -1){
	                imagePath = imagePath.split('/')[1];
	            }
	            path = this.assetsPath + imagePath;
	        } else {
	            path = this.path;
	            path += assetData.u ? assetData.u : '';
	            path += assetData.p;
	        }
	        return path;
	    }
	
	    function loadImage(path){
	        var img = document.createElement('img');
	        img.addEventListener('load', imageLoaded.bind(this), false);
	        img.addEventListener('error', imageLoaded.bind(this), false);
	        img.src = path;
	    }
	    function loadAssets(assets){
	        this.totalAssets = assets.length;
	        var i;
	        for(i=0;i<this.totalAssets;i+=1){
	            if(!assets[i].layers){
	                loadImage.bind(this)(getAssetsPath.bind(this)(assets[i]));
	                this.totalImages += 1;
	            }
	        }
	    }
	
	    function setPath(path){
	        this.path = path || '';
	    }
	
	    function setAssetsPath(path){
	        this.assetsPath = path || '';
	    }
	
	    return function ImagePreloader(){
	        this.loadAssets = loadAssets;
	        this.setAssetsPath = setAssetsPath;
	        this.setPath = setPath;
	        this.assetsPath = '';
	        this.path = '';
	        this.totalAssets = 0;
	        this.totalImages = 0;
	        this.loadedAssets = 0;
	    }
	}());
	var featureSupport = (function(){
		var ob = {
			maskType: true
		}
		if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
		   ob.maskType = false;
		}
		return ob;
	}());
	var filtersFactory = (function(){
		var ob = {};
		ob.createFilter = createFilter;
		ob.createAlphaToLuminanceFilter = createAlphaToLuminanceFilter;
	
		function createFilter(filId){
	        	var fil = document.createElementNS(svgNS,'filter');
	        	fil.setAttribute('id',filId);
	                fil.setAttribute('filterUnits','objectBoundingBox');
	                fil.setAttribute('x','0%');
	                fil.setAttribute('y','0%');
	                fil.setAttribute('width','100%');
	                fil.setAttribute('height','100%');
	                return fil;
		}
	
		function createAlphaToLuminanceFilter(){
	                var feColorMatrix = document.createElementNS(svgNS,'feColorMatrix');
	                feColorMatrix.setAttribute('type','matrix');
	                feColorMatrix.setAttribute('color-interpolation-filters','sRGB');
	                feColorMatrix.setAttribute('values','0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 0 1');
	                return feColorMatrix;
		}
	
		return ob;
	}())
	var pooling = (function(){
	
		function double(arr){
			return arr.concat(Array.apply(null,{length:arr.length}))
		}
	
		return {
			double: double
		}
	}());
	var point_pool = (function(){
		var ob = {
			newPoint: newPoint,
			release: release
			/*,getLength:function(){return _length}
			,getCont:function(){return cont}*/
		}
	
		var _length = 0;
		var _maxLength = 8;
		var pool = Array.apply(null,{length:_maxLength});
	
		//var cont = 0;
	
		function newPoint(){
			//window.bm_newPoint = window.bm_newPoint ? window.bm_newPoint + 1 : 1;
			var point;
			if(_length){
				_length -= 1;
				point = pool[_length];
				//window.bm_reuse = window.bm_reuse ? window.bm_reuse + 1 : 1;
			} else {
				point = [0.1,0.1];
				//cont++;
				//console.log('new');
				//window.bm_new = window.bm_new ? window.bm_new + 1 : 1;
				//point._tst = cont++;
			}
			return point;
		}
	
		function release(point) {
			if(_length === _maxLength) {
				pool = pooling.double(pool);
				_maxLength = _maxLength*2;
			}
			pool[_length] = point;
			_length += 1;
			//window.bm_release = window.bm_release ? window.bm_release + 1 : 1;
			//console.log('release');
		}
	
	
		return ob;
	}());
	var shape_pool = (function(){
		var ob = {
			clone: clone,
			newShape: newShape,
			release: release,
			releaseArray: releaseArray
		}
	
		var _length = 0;
		var _maxLength = 4;
		var pool = Array.apply(null,{length:_maxLength});
	
		function newShape(){
			var shapePath;
			if(_length){
				_length -= 1;
				shapePath = pool[_length];
			} else {
				shapePath = new ShapePath();
			}
			return shapePath;
		}
	
		function release(shapePath) {
			if(_length === _maxLength) {
				pool = pooling.double(pool);
				_maxLength = _maxLength*2;
			}
			var len = shapePath._length, i;
			for(i = 0; i < len; i += 1) {
				point_pool.release(shapePath.v[i]);
				point_pool.release(shapePath.i[i]);
				point_pool.release(shapePath.o[i]);
				shapePath.v[i] = null;
				shapePath.i[i] = null;
				shapePath.o[i] = null;
			}
			shapePath._length = 0;
			shapePath.c = false;
			pool[_length] = shapePath;
			_length += 1;
		}
	
		function releaseArray(shapePathsCollection, length) {
			while(length--) {
				release(shapePathsCollection[length]);
			}
		}
	
		function clone(shape, transform) {
			var i, len = shape._length;
			var cloned = newShape();
			cloned._length = shape._length;
			cloned.c = shape.c;
	
			var pt;
			
			for(i = 0; i < len; i += 1) {
				if(transform){
					pt = transform.applyToPointArray(shape.v[i][0],shape.v[i][1],0,2);
					cloned.setXYAt(pt[0],pt[1],'v',i);
					point_pool.release(pt);
					pt = transform.applyToPointArray(shape.o[i][0],shape.o[i][1],0,2);
					cloned.setXYAt(pt[0],pt[1],'o',i);
					point_pool.release(pt);
					pt = transform.applyToPointArray(shape.i[i][0],shape.i[i][1],0,2);
					cloned.setXYAt(pt[0],pt[1],'i',i);
					point_pool.release(pt);
				}else{
					cloned.setTripleAt(shape.v[i][0],shape.v[i][1],shape.o[i][0],shape.o[i][1],shape.i[i][0],shape.i[i][1], i);
				}
			}
			return cloned
		}
	
	
		return ob;
	}());
	var shapeCollection_pool = (function(){
		var ob = {
			newShapeCollection: newShapeCollection,
			release: release,
			clone: clone
		}
	
		var _length = 0;
		var _maxLength = 4;
		var pool = Array.apply(null,{length:_maxLength});
	
		var cont = 0;
	
		function newShapeCollection(){
			var shapeCollection;
			if(_length){
				_length -= 1;
				shapeCollection = pool[_length];
			} else {
				shapeCollection = new ShapeCollection();
			}
			return shapeCollection;
		}
	
		function release(shapeCollection) {
			var i, len = shapeCollection._length;
			for(i = 0; i < len; i += 1) {
				shape_pool.release(shapeCollection.shapes[i]);
			}
			shapeCollection._length = 0;
	
			if(_length === _maxLength) {
				pool = pooling.double(pool);
				_maxLength = _maxLength*2;
			}
			pool[_length] = shapeCollection;
			_length += 1;
		}
	
		function clone(shapeCollection, originCollection) {
			release(shapeCollection);
			if(_length === _maxLength) {
				pool = pooling.double(pool);
				_maxLength = _maxLength*2;
			}
			pool[_length] = shapeCollection;
			_length += 1;
		}
	
	
		return ob;
	}());
	function BaseRenderer(){}
	BaseRenderer.prototype.checkLayers = function(num){
	    var i, len = this.layers.length, data;
	    this.completeLayers = true;
	    for (i = len - 1; i >= 0; i--) {
	        if (!this.elements[i]) {
	            data = this.layers[i];
	            if(data.ip - data.st <= (num - this.layers[i].st) && data.op - data.st > (num - this.layers[i].st))
	            {
	                this.buildItem(i);
	            }
	        }
	        this.completeLayers = this.elements[i] ? this.completeLayers:false;
	    }
	    this.checkPendingElements();
	};
	
	BaseRenderer.prototype.createItem = function(layer){
	    switch(layer.ty){
	        case 2:
	            return this.createImage(layer);
	        case 0:
	            return this.createComp(layer);
	        case 1:
	            return this.createSolid(layer);
	        case 4:
	            return this.createShape(layer);
	        case 5:
	            return this.createText(layer);
	        case 13:
	            return this.createCamera(layer);
	        case 99:
	            return null;
	    }
	    return this.createBase(layer);
	};
	
	BaseRenderer.prototype.createCamera = function(){
	    throw new Error('You\'re using a 3d camera. Try the html renderer.');
	}
	
	BaseRenderer.prototype.buildAllItems = function(){
	    var i, len = this.layers.length;
	    for(i=0;i<len;i+=1){
	        this.buildItem(i);
	    }
	    this.checkPendingElements();
	};
	
	BaseRenderer.prototype.includeLayers = function(newLayers){
	    this.completeLayers = false;
	    var i, len = newLayers.length;
	    var j, jLen = this.layers.length;
	    for(i=0;i<len;i+=1){
	        j = 0;
	        while(j<jLen){
	            if(this.layers[j].id == newLayers[i].id){
	                this.layers[j] = newLayers[i];
	                break;
	            }
	            j += 1;
	        }
	    }
	};
	
	BaseRenderer.prototype.setProjectInterface = function(pInterface){
	    this.globalData.projectInterface = pInterface;
	};
	
	BaseRenderer.prototype.initItems = function(){
	    if(!this.globalData.progressiveLoad){
	        this.buildAllItems();
	    }
	};
	BaseRenderer.prototype.buildElementParenting = function(element, parentName, hierarchy){
	    hierarchy = hierarchy || [];
	    var elements = this.elements;
	    var layers = this.layers;
	    var i=0, len = layers.length;
	    while(i<len){
	        if(layers[i].ind == parentName){
	            if(!elements[i] || elements[i] === true){
	                this.buildItem(i);
	                this.addPendingElement(element);
	            } else if(layers[i].parent !== undefined){
	                hierarchy.push(elements[i]);
	                elements[i]._isParent = true;
	                this.buildElementParenting(element,layers[i].parent, hierarchy);
	            } else {
	                hierarchy.push(elements[i]);
	                elements[i]._isParent = true;
	                element.setHierarchy(hierarchy);
	            }
	
	
	        }
	        i += 1;
	    }
	};
	
	BaseRenderer.prototype.addPendingElement = function(element){
	    this.pendingElements.push(element);
	};
	function SVGRenderer(animationItem, config){
	    this.animationItem = animationItem;
	    this.layers = null;
	    this.renderedFrame = -1;
	    this.globalData = {
	        frameNum: -1
	    };
	    this.renderConfig = {
	        preserveAspectRatio: (config && config.preserveAspectRatio) || 'xMidYMid meet',
	        progressiveLoad: (config && config.progressiveLoad) || false
	    };
	    this.elements = [];
	    this.pendingElements = [];
	    this.destroyed = false;
	
	}
	
	extendPrototype(BaseRenderer,SVGRenderer);
	
	SVGRenderer.prototype.createBase = function (data) {
	    return new SVGBaseElement(data, this.layerElement,this.globalData,this);
	};
	
	SVGRenderer.prototype.createShape = function (data) {
	    return new IShapeElement(data, this.layerElement,this.globalData,this);
	};
	
	SVGRenderer.prototype.createText = function (data) {
	    return new SVGTextElement(data, this.layerElement,this.globalData,this);
	
	};
	
	SVGRenderer.prototype.createImage = function (data) {
	    return new IImageElement(data, this.layerElement,this.globalData,this);
	};
	
	SVGRenderer.prototype.createComp = function (data) {
	    return new ICompElement(data, this.layerElement,this.globalData,this);
	
	};
	
	SVGRenderer.prototype.createSolid = function (data) {
	    return new ISolidElement(data, this.layerElement,this.globalData,this);
	};
	
	SVGRenderer.prototype.configAnimation = function(animData){
	    this.layerElement = document.createElementNS(svgNS,'svg');
	    this.layerElement.setAttribute('xmlns','http://www.w3.org/2000/svg');
	    this.layerElement.setAttribute('width',animData.w);
	    this.layerElement.setAttribute('height',animData.h);
	    this.layerElement.setAttribute('viewBox','0 0 '+animData.w+' '+animData.h);
	    this.layerElement.setAttribute('preserveAspectRatio',this.renderConfig.preserveAspectRatio);
	    this.layerElement.style.width = '100%';
	    this.layerElement.style.height = '100%';
	    //this.layerElement.style.transform = 'translate3d(0,0,0)';
	    //this.layerElement.style.transformOrigin = this.layerElement.style.mozTransformOrigin = this.layerElement.style.webkitTransformOrigin = this.layerElement.style['-webkit-transform'] = "0px 0px 0px";
	    this.animationItem.wrapper.appendChild(this.layerElement);
	    //Mask animation
	    var defs = document.createElementNS(svgNS, 'defs');
	    this.globalData.defs = defs;
	    this.layerElement.appendChild(defs);
	    this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem);
	    this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem);
	    this.globalData.progressiveLoad = this.renderConfig.progressiveLoad;
	    this.globalData.frameId = 0;
	    this.globalData.nm = animData.nm;
	    this.globalData.compSize = {
	        w: animData.w,
	        h: animData.h
	    };
	    this.data = animData;
	    this.globalData.frameRate = animData.fr;
	    var maskElement = document.createElementNS(svgNS, 'clipPath');
	    var rect = document.createElementNS(svgNS,'rect');
	    rect.setAttribute('width',animData.w);
	    rect.setAttribute('height',animData.h);
	    rect.setAttribute('x',0);
	    rect.setAttribute('y',0);
	    var maskId = 'animationMask_'+randomString(10);
	    maskElement.setAttribute('id', maskId);
	    maskElement.appendChild(rect);
	    var maskedElement = document.createElementNS(svgNS,'g');
	    maskedElement.setAttribute("clip-path", "url(#"+maskId+")");
	    this.layerElement.appendChild(maskedElement);
	    defs.appendChild(maskElement);
	    this.layerElement = maskedElement;
	    this.layers = animData.layers;
	    this.globalData.fontManager = new FontManager();
	    this.globalData.fontManager.addChars(animData.chars);
	    this.globalData.fontManager.addFonts(animData.fonts,defs);
	    this.elements = Array.apply(null,{length:animData.layers.length});
	};
	
	
	SVGRenderer.prototype.destroy = function () {
	    this.animationItem.wrapper.innerHTML = '';
	    this.layerElement = null;
	    this.globalData.defs = null;
	    var i, len = this.layers ? this.layers.length : 0;
	    for (i = 0; i < len; i++) {
	        if(this.elements[i]){
	            this.elements[i].destroy();
	        }
	    }
	    this.elements.length = 0;
	    this.destroyed = true;
	    this.animationItem = null;
	};
	
	SVGRenderer.prototype.updateContainerSize = function () {
	};
	
	SVGRenderer.prototype.buildItem  = function(pos){
	    var elements = this.elements;
	    if(elements[pos] || this.layers[pos].ty == 99){
	        return;
	    }
	    elements[pos] = true;
	    var element = this.createItem(this.layers[pos]);
	
	    elements[pos] = element;
	    if(expressionsPlugin){
	        if(this.layers[pos].ty === 0){
	            this.globalData.projectInterface.registerComposition(element);
	        }
	        element.initExpressions();
	    }
	    this.appendElementInPos(element,pos);
	    if(this.layers[pos].tt){
	        if(!this.elements[pos - 1] || this.elements[pos - 1] === true){
	            this.buildItem(pos - 1);
	            this.addPendingElement(element);
	        } else {
	            element.setMatte(elements[pos - 1].layerId);
	        }
	    }
	};
	
	SVGRenderer.prototype.checkPendingElements  = function(){
	    while(this.pendingElements.length){
	        var element = this.pendingElements.pop();
	        element.checkParenting();
	        if(element.data.tt){
	            var i = 0, len = this.elements.length;
	            while(i<len){
	                if(this.elements[i] === element){
	                    element.setMatte(this.elements[i - 1].layerId);
	                    break;
	                }
	                i += 1;
	            }
	        }
	    }
	};
	
	SVGRenderer.prototype.renderFrame = function(num){
	    if(this.renderedFrame == num || this.destroyed){
	        return;
	    }
	    if(num === null){
	        num = this.renderedFrame;
	    }else{
	        this.renderedFrame = num;
	    }
	    //clearPoints();
	    /*console.log('-------');
	    console.log('FRAME ',num);*/
	    this.globalData.frameNum = num;
	    this.globalData.frameId += 1;
	    this.globalData.projectInterface.currentFrame = num;
	    var i, len = this.layers.length;
	    if(!this.completeLayers){
	        this.checkLayers(num);
	    }
	    for (i = len - 1; i >= 0; i--) {
	        if(this.completeLayers || this.elements[i]){
	            this.elements[i].prepareFrame(num - this.layers[i].st);
	        }
	    }
	    for (i = len - 1; i >= 0; i--) {
	        if(this.completeLayers || this.elements[i]){
	            this.elements[i].renderFrame();
	        }
	    }
	};
	
	SVGRenderer.prototype.appendElementInPos = function(element, pos){
	    var newElement = element.getBaseElement();
	    if(!newElement){
	        return;
	    }
	    var i = 0;
	    var nextElement;
	    while(i<pos){
	        if(this.elements[i] && this.elements[i]!== true && this.elements[i].getBaseElement()){
	            nextElement = this.elements[i].getBaseElement();
	        }
	        i += 1;
	    }
	    if(nextElement){
	        this.layerElement.insertBefore(newElement, nextElement);
	    } else {
	        this.layerElement.appendChild(newElement);
	    }
	};
	
	SVGRenderer.prototype.hide = function(){
	    this.layerElement.style.display = 'none';
	};
	
	SVGRenderer.prototype.show = function(){
	    this.layerElement.style.display = 'block';
	};
	
	SVGRenderer.prototype.searchExtraCompositions = function(assets){
	    var i, len = assets.length;
	    var floatingContainer = document.createElementNS(svgNS,'g');
	    for(i=0;i<len;i+=1){
	        if(assets[i].xt){
	            var comp = this.createComp(assets[i],floatingContainer,this.globalData.comp,null);
	            comp.initExpressions();
	            //comp.compInterface = CompExpressionInterface(comp);
	            //Expressions.addLayersInterface(comp.elements, this.globalData.projectInterface);
	            this.globalData.projectInterface.registerComposition(comp);
	        }
	    }
	};
	
	function MaskElement(data,element,globalData) {
	    this.dynamicProperties = [];
	    this.data = data;
	    this.element = element;
	    this.globalData = globalData;
	    this.paths = [];
	    this.storedData = [];
	    this.masksProperties = this.data.masksProperties;
	    this.viewData = new Array(this.masksProperties.length);
	    this.maskElement = null;
	    this.firstFrame = true;
	    var defs = this.globalData.defs;
	    var i, len = this.masksProperties.length;
	
	
	    var path, properties = this.masksProperties;
	    var count = 0;
	    var currentMasks = [];
	    var j, jLen;
	    var layerId = randomString(10);
	    var rect, expansor, feMorph,x;
	    var maskType = 'clipPath', maskRef = 'clip-path';
	    for (i = 0; i < len; i++) {
	
	        if((properties[i].mode !== 'a' && properties[i].mode !== 'n')|| properties[i].inv || properties[i].o.k !== 100){
	            maskType = 'mask';
	            maskRef = 'mask';
	        }
	
	        if((properties[i].mode == 's' || properties[i].mode == 'i') && count == 0){
	            rect = document.createElementNS(svgNS, 'rect');
	            rect.setAttribute('fill', '#ffffff');
	            rect.setAttribute('width', this.element.comp.data.w);
	            rect.setAttribute('height', this.element.comp.data.h);
	            currentMasks.push(rect);
	        } else {
	            rect = null;
	        }
	
	        path = document.createElementNS(svgNS, 'path');
	        if(properties[i].mode == 'n') {
	            this.viewData[i] = {
	                op: PropertyFactory.getProp(this.element,properties[i].o,0,0.01,this.dynamicProperties),
	                prop: ShapePropertyFactory.getShapeProp(this.element,properties[i],3,this.dynamicProperties,null),
	                elem: path
	            };
	            defs.appendChild(path);
	            continue;
	        }
	        count += 1;
	
	        if(properties[i].mode == 's'){
	            path.setAttribute('fill', '#000000');
	        }else{
	            path.setAttribute('fill', '#ffffff');
	        }
	        path.setAttribute('clip-rule','nonzero');
	
	        if(properties[i].x.k !== 0){
	            maskType = 'mask';
	            maskRef = 'mask';
	            x = PropertyFactory.getProp(this.element,properties[i].x,0,null,this.dynamicProperties);
	            var filterID = 'fi_'+randomString(10);
	            expansor = document.createElementNS(svgNS,'filter');
	            expansor.setAttribute('id',filterID);
	            feMorph = document.createElementNS(svgNS,'feMorphology');
	            feMorph.setAttribute('operator','dilate');
	            feMorph.setAttribute('in','SourceGraphic');
	            feMorph.setAttribute('radius','0');
	            expansor.appendChild(feMorph);
	            defs.appendChild(expansor);
	            if(properties[i].mode == 's'){
	                path.setAttribute('stroke', '#000000');
	            }else{
	                path.setAttribute('stroke', '#ffffff');
	            }
	        }else{
	            feMorph = null;
	            x = null;
	        }
	
	
	        this.storedData[i] = {
	             elem: path,
	             x: x,
	             expan: feMorph,
	            lastPath: '',
	            lastOperator:'',
	            filterId:filterID,
	            lastRadius:0
	        };
	        if(properties[i].mode == 'i'){
	            jLen = currentMasks.length;
	            var g = document.createElementNS(svgNS,'g');
	            for(j=0;j<jLen;j+=1){
	                g.appendChild(currentMasks[j]);
	            }
	            var mask = document.createElementNS(svgNS,'mask');
	            mask.setAttribute('mask-type','alpha');
	            mask.setAttribute('id',layerId+'_'+count);
	            mask.appendChild(path);
	            defs.appendChild(mask);
	            g.setAttribute('mask','url(#'+layerId+'_'+count+')');
	
	            currentMasks.length = 0;
	            currentMasks.push(g);
	        }else{
	            currentMasks.push(path);
	        }
	        if(properties[i].inv && !this.solidPath){
	            this.solidPath = this.createLayerSolidPath();
	        }
	        this.viewData[i] = {
	            elem: path,
	            lastPath: '',
	            op: PropertyFactory.getProp(this.element,properties[i].o,0,0.01,this.dynamicProperties),
	            prop:ShapePropertyFactory.getShapeProp(this.element,properties[i],3,this.dynamicProperties,null)
	        };
	        if(rect){
	            this.viewData[i].invRect = rect;
	        }
	        if(!this.viewData[i].prop.k){
	            this.drawPath(properties[i],this.viewData[i].prop.v,this.viewData[i]);
	        }
	    }
	
	    this.maskElement = document.createElementNS(svgNS, maskType);
	
	    len = currentMasks.length;
	    for(i=0;i<len;i+=1){
	        this.maskElement.appendChild(currentMasks[i]);
	    }
	
	    this.maskElement.setAttribute('id', layerId);
	    if(count > 0){
	        this.element.maskedElement.setAttribute(maskRef, "url(#" + layerId + ")");
	    }
	
	    defs.appendChild(this.maskElement);
	};
	
	MaskElement.prototype.getMaskProperty = function(pos){
	    return this.viewData[pos].prop;
	};
	
	MaskElement.prototype.prepareFrame = function(){
	    var i, len = this.dynamicProperties.length;
	    for(i=0;i<len;i+=1){
	        this.dynamicProperties[i].getValue();
	
	    }
	};
	
	MaskElement.prototype.renderFrame = function (finalMat) {
	    var i, len = this.masksProperties.length;
	    for (i = 0; i < len; i++) {
	        if(this.viewData[i].prop.mdf || this.firstFrame){
	            this.drawPath(this.masksProperties[i],this.viewData[i].prop.v,this.viewData[i]);
	        }
	        if(this.viewData[i].op.mdf || this.firstFrame){
	            this.viewData[i].elem.setAttribute('fill-opacity',this.viewData[i].op.v);
	        }
	        if(this.masksProperties[i].mode !== 'n'){
	            if(this.viewData[i].invRect && (this.element.finalTransform.mProp.mdf || this.firstFrame)){
	                this.viewData[i].invRect.setAttribute('x', -finalMat.props[12]);
	                this.viewData[i].invRect.setAttribute('y', -finalMat.props[13]);
	            }
	            if(this.storedData[i].x && (this.storedData[i].x.mdf || this.firstFrame)){
	                var feMorph = this.storedData[i].expan;
	                if(this.storedData[i].x.v < 0){
	                    if(this.storedData[i].lastOperator !== 'erode'){
	                        this.storedData[i].lastOperator = 'erode';
	                        this.storedData[i].elem.setAttribute('filter','url(#'+this.storedData[i].filterId+')');
	                    }
	                    feMorph.setAttribute('radius',-this.storedData[i].x.v);
	                }else{
	                    if(this.storedData[i].lastOperator !== 'dilate'){
	                        this.storedData[i].lastOperator = 'dilate';
	                        this.storedData[i].elem.setAttribute('filter',null);
	                    }
	                    this.storedData[i].elem.setAttribute('stroke-width', this.storedData[i].x.v*2);
	
	                }
	            }
	        }
	    }
	    this.firstFrame = false;
	};
	
	MaskElement.prototype.getMaskelement = function () {
	    return this.maskElement;
	};
	
	MaskElement.prototype.createLayerSolidPath = function(){
	    var path = 'M0,0 ';
	    path += ' h' + this.globalData.compSize.w ;
	    path += ' v' + this.globalData.compSize.h ;
	    path += ' h-' + this.globalData.compSize.w ;
	    path += ' v-' + this.globalData.compSize.h + ' ';
	    return path;
	};
	
	MaskElement.prototype.drawPath = function(pathData,pathNodes,viewData){
	    var pathString = " M"+pathNodes.v[0][0]+','+pathNodes.v[0][1];
	    var i, len;
	    len = pathNodes._length;
	    for(i=1;i<len;i+=1){
	        //pathString += " C"+pathNodes.o[i-1][0]+','+pathNodes.o[i-1][1] + " "+pathNodes.i[i][0]+','+pathNodes.i[i][1] + " "+pathNodes.v[i][0]+','+pathNodes.v[i][1];
	        pathString += " C"+bm_rnd(pathNodes.o[i-1][0])+','+bm_rnd(pathNodes.o[i-1][1]) + " "+bm_rnd(pathNodes.i[i][0])+','+bm_rnd(pathNodes.i[i][1]) + " "+bm_rnd(pathNodes.v[i][0])+','+bm_rnd(pathNodes.v[i][1]);
	    }
	        //pathString += " C"+pathNodes.o[i-1][0]+','+pathNodes.o[i-1][1] + " "+pathNodes.i[0][0]+','+pathNodes.i[0][1] + " "+pathNodes.v[0][0]+','+pathNodes.v[0][1];
	    if(pathNodes.c && len > 1){
	        pathString += " C"+bm_rnd(pathNodes.o[i-1][0])+','+bm_rnd(pathNodes.o[i-1][1]) + " "+bm_rnd(pathNodes.i[0][0])+','+bm_rnd(pathNodes.i[0][1]) + " "+bm_rnd(pathNodes.v[0][0])+','+bm_rnd(pathNodes.v[0][1]);
	    }
	    //pathNodes.__renderedString = pathString;
	
	
	    if(viewData.lastPath !== pathString){
	        if(viewData.elem){
	            if(!pathNodes.c){
	                viewData.elem.setAttribute('d','');
	            }else if(pathData.inv){
	                viewData.elem.setAttribute('d',this.solidPath + pathString);
	            }else{
	                viewData.elem.setAttribute('d',pathString);
	            }
	        }
	        viewData.lastPath = pathString;
	    }
	};
	
	MaskElement.prototype.getMask = function(nm){
	    var i = 0, len = this.masksProperties.length;
	    while(i<len){
	        if(this.masksProperties[i].nm === nm){
	            return {
	                maskPath: this.viewData[i].prop.pv
	            }
	        }
	        i += 1;
	    }
	};
	
	MaskElement.prototype.destroy = function(){
	    this.element = null;
	    this.globalData = null;
	    this.maskElement = null;
	    this.data = null;
	    this.paths = null;
	    this.masksProperties = null;
	};
	function BaseElement(){
	};
	BaseElement.prototype.checkMasks = function(){
	    if(!this.data.hasMask){
	        return false;
	    }
	    var i = 0, len = this.data.masksProperties.length;
	    while(i<len) {
	        if((this.data.masksProperties[i].mode !== 'n' && this.data.masksProperties[i].cl !== false)) {
	            return true;
	        }
	        i += 1;
	    }
	    return false;
	}
	
	BaseElement.prototype.checkParenting = function(){
	    if(this.data.parent !== undefined){
	        this.comp.buildElementParenting(this, this.data.parent);
	    }
	}
	
	BaseElement.prototype.prepareFrame = function(num){
	    if(this.data.ip - this.data.st <= num && this.data.op - this.data.st > num)
	    {
	        if(this.isVisible !== true){
	            this.elemMdf = true;
	            this.globalData.mdf = true;
	            this.isVisible = true;
	            this.firstFrame = true;
	            if(this.data.hasMask){
	                this.maskManager.firstFrame = true;
	            }
	        }
	    }else{
	        if(this.isVisible !== false){
	            this.elemMdf = true;
	            this.globalData.mdf = true;
	            this.isVisible = false;
	        }
	    }
	    var i, len = this.dynamicProperties.length;
	    for(i=0;i<len;i+=1){
	        if(this.isVisible || (this._isParent && this.dynamicProperties[i].type === 'transform')){
	            this.dynamicProperties[i].getValue();
	            if(this.dynamicProperties[i].mdf){
	                this.elemMdf = true;
	                this.globalData.mdf = true;
	            }
	        }
	    }
	    if(this.data.hasMask && this.isVisible){
	        this.maskManager.prepareFrame(num*this.data.sr);
	    }
	    
	    /* TODO check this
	    if(this.data.sy){
	        if(this.data.sy[0].renderedData[num]){
	            if(this.data.sy[0].renderedData[num].c){
	                this.feFlood.setAttribute('flood-color','rgb('+Math.round(this.data.sy[0].renderedData[num].c[0])+','+Math.round(this.data.sy[0].renderedData[num].c[1])+','+Math.round(this.data.sy[0].renderedData[num].c[2])+')');
	            }
	            if(this.data.sy[0].renderedData[num].s){
	                this.feMorph.setAttribute('radius',this.data.sy[0].renderedData[num].s);
	            }
	        }
	    }
	    */
	
	
	    this.currentFrameNum = num*this.data.sr;
	    return this.isVisible;
	};
	
	BaseElement.prototype.globalToLocal = function(pt){
	    var transforms = [];
	    transforms.push(this.finalTransform);
	    var flag = true;
	    var comp = this.comp;
	    while(flag){
	        if(comp.finalTransform){
	            if(comp.data.hasMask){
	                transforms.splice(0,0,comp.finalTransform);
	            }
	            comp = comp.comp;
	        } else {
	            flag = false;
	        }
	    }
	    var i, len = transforms.length,ptNew;
	    for(i=0;i<len;i+=1){
	        ptNew = transforms[i].mat.applyToPointArray(0,0,0);
	        //ptNew = transforms[i].mat.applyToPointArray(pt[0],pt[1],pt[2]);
	        pt = [pt[0] - ptNew[0],pt[1] - ptNew[1],0];
	    }
	    return pt;
	};
	
	BaseElement.prototype.initExpressions = function(){
	    this.layerInterface = LayerExpressionInterface(this);
	    //layers[i].layerInterface = LayerExpressionInterface(layers[i]);
	    //layers[i].layerInterface = LayerExpressionInterface(layers[i]);
	    if(this.data.hasMask){
	        this.layerInterface.registerMaskInterface(this.maskManager);
	    }
	    var effectsInterface = EffectsExpressionInterface.createEffectsInterface(this,this.layerInterface);
	    this.layerInterface.registerEffectsInterface(effectsInterface);
	
	    if(this.data.ty === 0 || this.data.xt){
	        this.compInterface = CompExpressionInterface(this);
	    } else if(this.data.ty === 4){
	        this.layerInterface.shapeInterface = ShapeExpressionInterface.createShapeInterface(this.shapesData,this.viewData,this.layerInterface);
	    } else if(this.data.ty === 5){
	        this.layerInterface.textInterface = TextExpressionInterface(this);
	    }
	}
	
	BaseElement.prototype.setBlendMode = function(){
	    var blendModeValue = '';
	    switch(this.data.bm){
	        case 1:
	            blendModeValue = 'multiply';
	            break;
	        case 2:
	            blendModeValue = 'screen';
	            break;
	        case 3:
	            blendModeValue = 'overlay';
	            break;
	        case 4:
	            blendModeValue = 'darken';
	            break;
	        case 5:
	            blendModeValue = 'lighten';
	            break;
	        case 6:
	            blendModeValue = 'color-dodge';
	            break;
	        case 7:
	            blendModeValue = 'color-burn';
	            break;
	        case 8:
	            blendModeValue = 'hard-light';
	            break;
	        case 9:
	            blendModeValue = 'soft-light';
	            break;
	        case 10:
	            blendModeValue = 'difference';
	            break;
	        case 11:
	            blendModeValue = 'exclusion';
	            break;
	        case 12:
	            blendModeValue = 'hue';
	            break;
	        case 13:
	            blendModeValue = 'saturation';
	            break;
	        case 14:
	            blendModeValue = 'color';
	            break;
	        case 15:
	            blendModeValue = 'luminosity';
	            break;
	    }
	    var elem = this.baseElement || this.layerElement;
	
	    elem.style['mix-blend-mode'] = blendModeValue;
	}
	
	BaseElement.prototype.init = function(){
	    if(!this.data.sr){
	        this.data.sr = 1;
	    }
	    this.dynamicProperties = [];
	    if(this.data.ef){
	        this.effects = new EffectsManager(this.data,this,this.dynamicProperties);
	        //this.effect = this.effectsManager.bind(this.effectsManager);
	    }
	    //this.elemInterface = buildLayerExpressionInterface(this);
	    this.hidden = false;
	    this.firstFrame = true;
	    this.isVisible = false;
	    this._isParent = false;
	    this.currentFrameNum = -99999;
	    this.lastNum = -99999;
	    if(this.data.ks){
	        this.finalTransform = {
	            mProp: PropertyFactory.getProp(this,this.data.ks,2,null,this.dynamicProperties),
	            matMdf: false,
	            opMdf: false,
	            mat: new Matrix(),
	            opacity: 1
	        };
	        if(this.data.ao){
	            this.finalTransform.mProp.autoOriented = true;
	        }
	        this.finalTransform.op = this.finalTransform.mProp.o;
	        this.transform = this.finalTransform.mProp;
	        if(this.data.ty !== 11){
	            this.createElements();
	        }
	        if(this.data.hasMask){
	            this.addMasks(this.data);
	        }
	    }
	    this.elemMdf = false;
	};
	BaseElement.prototype.getType = function(){
	    return this.type;
	};
	
	BaseElement.prototype.resetHierarchy = function(){
	    if(!this.hierarchy){
	        this.hierarchy = [];
	    }else{
	        this.hierarchy.length = 0;
	    }
	};
	
	BaseElement.prototype.getHierarchy = function(){
	    if(!this.hierarchy){
	        this.hierarchy = [];
	    }
	    return this.hierarchy;
	};
	
	BaseElement.prototype.setHierarchy = function(hierarchy){
	    this.hierarchy = hierarchy;
	};
	
	BaseElement.prototype.getLayerSize = function(){
	    if(this.data.ty === 5){
	        return {w:this.data.textData.width,h:this.data.textData.height};
	    }else{
	        return {w:this.data.width,h:this.data.height};
	    }
	};
	
	BaseElement.prototype.hide = function(){
	
	};
	
	BaseElement.prototype.mHelper = new Matrix();
	function SVGBaseElement(data,parentContainer,globalData,comp, placeholder){
	    this.globalData = globalData;
	    this.comp = comp;
	    this.data = data;
	    this.matteElement = null;
	    this.transformedElement = null;
	    this.parentContainer = parentContainer;
	    this.layerId = placeholder ? placeholder.layerId : 'ly_'+randomString(10);
	    this.placeholder = placeholder;
	    this.init();
	};
	
	createElement(BaseElement, SVGBaseElement);
	
	SVGBaseElement.prototype.createElements = function(){
	    this.layerElement = document.createElementNS(svgNS,'g');
	    this.transformedElement = this.layerElement;
	    if(this.data.hasMask){
	        this.maskedElement = this.layerElement;
	    }
	    var layerElementParent = null;
	    if(this.data.td){
	        if(this.data.td == 3 || this.data.td == 1){
	            var masker = document.createElementNS(svgNS,'mask');
	            masker.setAttribute('id',this.layerId);
	            masker.setAttribute('mask-type',this.data.td == 3 ? 'luminance':'alpha');
	            masker.appendChild(this.layerElement);
	            layerElementParent = masker;
	            this.globalData.defs.appendChild(masker);
	            ////// This is only for IE and Edge when mask if of type alpha
	            if(!featureSupport.maskType && this.data.td == 1){
	                masker.setAttribute('mask-type','luminance');
	                var filId = randomString(10);
	                var fil = filtersFactory.createFilter(filId);
	                this.globalData.defs.appendChild(fil);
	                fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
	                var gg = document.createElementNS(svgNS,'g');
	                gg.appendChild(this.layerElement);
	                layerElementParent = gg;
	                masker.appendChild(gg);
	                gg.setAttribute('filter','url(#'+filId+')');
	            }
	        }else if(this.data.td == 2){
	            var maskGroup = document.createElementNS(svgNS,'mask');
	            maskGroup.setAttribute('id',this.layerId);
	            maskGroup.setAttribute('mask-type','alpha');
	            var maskGrouper = document.createElementNS(svgNS,'g');
	            maskGroup.appendChild(maskGrouper);
	            var filId = randomString(10);
	            var fil = filtersFactory.createFilter(filId);
	            ////
	
	            var feColorMatrix = document.createElementNS(svgNS,'feColorMatrix');
	            feColorMatrix.setAttribute('type','matrix');
	            feColorMatrix.setAttribute('color-interpolation-filters','sRGB');
	            feColorMatrix.setAttribute('values','1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1');
	            fil.appendChild(feColorMatrix);
	
	            ////
	            /*var feCTr = document.createElementNS(svgNS,'feComponentTransfer');
	            feCTr.setAttribute('in','SourceGraphic');
	            fil.appendChild(feCTr);
	            var feFunc = document.createElementNS(svgNS,'feFuncA');
	            feFunc.setAttribute('type','table');
	            feFunc.setAttribute('tableValues','1.0 0.0');
	            feCTr.appendChild(feFunc);*/
	            this.globalData.defs.appendChild(fil);
	            var alphaRect = document.createElementNS(svgNS,'rect');
	            alphaRect.setAttribute('width',this.comp.data.w);
	            alphaRect.setAttribute('height',this.comp.data.h);
	            alphaRect.setAttribute('x','0');
	            alphaRect.setAttribute('y','0');
	            alphaRect.setAttribute('fill','#ffffff');
	            alphaRect.setAttribute('opacity','0');
	            maskGrouper.setAttribute('filter','url(#'+filId+')');
	            maskGrouper.appendChild(alphaRect);
	            maskGrouper.appendChild(this.layerElement);
	            layerElementParent = maskGrouper;
	            if(!featureSupport.maskType){
	                maskGroup.setAttribute('mask-type','luminance');
	                fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
	                var gg = document.createElementNS(svgNS,'g');
	                maskGrouper.appendChild(alphaRect);
	                gg.appendChild(this.layerElement);
	                layerElementParent = gg;
	                maskGrouper.appendChild(gg);
	            }
	            this.globalData.defs.appendChild(maskGroup);
	        }
	    }else if(this.data.hasMask || this.data.tt){
	        if(this.data.tt){
	            this.matteElement = document.createElementNS(svgNS,'g');
	            this.matteElement.appendChild(this.layerElement);
	            layerElementParent = this.matteElement;
	            this.baseElement = this.matteElement;
	        }else{
	            this.baseElement = this.layerElement;
	        }
	    }else{
	        this.baseElement = this.layerElement;
	    }
	    if((this.data.ln || this.data.cl) && (this.data.ty === 4 || this.data.ty === 0)){
	        if(this.data.ln){
	            this.layerElement.setAttribute('id',this.data.ln);
	        }
	        if(this.data.cl){
	            this.layerElement.setAttribute('class',this.data.cl);
	        }
	    }
	    if(this.data.ty === 0){
	            var cp = document.createElementNS(svgNS, 'clipPath');
	            var pt = document.createElementNS(svgNS,'path');
	            pt.setAttribute('d','M0,0 L'+this.data.w+',0'+' L'+this.data.w+','+this.data.h+' L0,'+this.data.h+'z');
	            var clipId = 'cp_'+randomString(8);
	            cp.setAttribute('id',clipId);
	            cp.appendChild(pt);
	            this.globalData.defs.appendChild(cp);
	        if(this.checkMasks()){
	            var cpGroup = document.createElementNS(svgNS,'g');
	            cpGroup.setAttribute('clip-path','url(#'+clipId+')');
	            cpGroup.appendChild(this.layerElement);
	            this.transformedElement = cpGroup;
	            if(layerElementParent){
	                layerElementParent.appendChild(this.transformedElement);
	            } else {
	                this.baseElement = this.transformedElement;
	            }
	        } else {
	            this.layerElement.setAttribute('clip-path','url(#'+clipId+')');
	        }
	        
	    }
	    if(this.data.bm !== 0){
	        this.setBlendMode();
	    }
	    if(this.layerElement !== this.parentContainer){
	        this.placeholder = null;
	    }
	    /* Todo performance killer
	    if(this.data.sy){
	        var filterID = 'st_'+randomString(10);
	        var c = this.data.sy[0].c.k;
	        var r = this.data.sy[0].s.k;
	        var expansor = document.createElementNS(svgNS,'filter');
	        expansor.setAttribute('id',filterID);
	        var feFlood = document.createElementNS(svgNS,'feFlood');
	        this.feFlood = feFlood;
	        if(!c[0].e){
	            feFlood.setAttribute('flood-color','rgb('+c[0]+','+c[1]+','+c[2]+')');
	        }
	        feFlood.setAttribute('result','base');
	        expansor.appendChild(feFlood);
	        var feMorph = document.createElementNS(svgNS,'feMorphology');
	        feMorph.setAttribute('operator','dilate');
	        feMorph.setAttribute('in','SourceGraphic');
	        feMorph.setAttribute('result','bigger');
	        this.feMorph = feMorph;
	        if(!r.length){
	            feMorph.setAttribute('radius',this.data.sy[0].s.k);
	        }
	        expansor.appendChild(feMorph);
	        var feColorMatrix = document.createElementNS(svgNS,'feColorMatrix');
	        feColorMatrix.setAttribute('result','mask');
	        feColorMatrix.setAttribute('in','bigger');
	        feColorMatrix.setAttribute('type','matrix');
	        feColorMatrix.setAttribute('values','0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0');
	        expansor.appendChild(feColorMatrix);
	        var feComposite = document.createElementNS(svgNS,'feComposite');
	        feComposite.setAttribute('result','drop');
	        feComposite.setAttribute('in','base');
	        feComposite.setAttribute('in2','mask');
	        feComposite.setAttribute('operator','in');
	        expansor.appendChild(feComposite);
	        var feBlend = document.createElementNS(svgNS,'feBlend');
	        feBlend.setAttribute('in','SourceGraphic');
	        feBlend.setAttribute('in2','drop');
	        feBlend.setAttribute('mode','normal');
	        expansor.appendChild(feBlend);
	        this.globalData.defs.appendChild(expansor);
	        var cont = document.createElementNS(svgNS,'g');
	        if(this.layerElement === this.parentContainer){
	            this.layerElement = cont;
	        }else{
	            cont.appendChild(this.layerElement);
	        }
	        cont.setAttribute('filter','url(#'+filterID+')');
	        if(this.data.td){
	            cont.setAttribute('data-td',this.data.td);
	        }
	        if(this.data.td == 3){
	            this.globalData.defs.appendChild(cont);
	        }else if(this.data.td == 2){
	            maskGrouper.appendChild(cont);
	        }else if(this.data.td == 1){
	            masker.appendChild(cont);
	        }else{
	            if(this.data.hasMask && this.data.tt){
	                this.matteElement.appendChild(cont);
	            }else{
	                this.appendNodeToParent(cont);
	            }
	        }
	    }*/
	    if(this.data.ef){
	        this.effectsManager = new SVGEffects(this);
	    }
	    this.checkParenting();
	};
	
	
	SVGBaseElement.prototype.setBlendMode = BaseElement.prototype.setBlendMode;
	
	SVGBaseElement.prototype.renderFrame = function(parentTransform){
	    if(this.data.ty === 3 || this.data.hd || !this.isVisible){
	        return false;
	    }
	
	    this.lastNum = this.currentFrameNum;
	    this.finalTransform.opMdf = this.firstFrame || this.finalTransform.op.mdf;
	    this.finalTransform.matMdf = this.firstFrame || this.finalTransform.mProp.mdf;
	    this.finalTransform.opacity = this.finalTransform.op.v;
	
	    var mat;
	    var finalMat = this.finalTransform.mat;
	
	    if(this.hierarchy){
	        var i = 0, len = this.hierarchy.length;
	        if(!this.finalTransform.matMdf) {
	            while(i < len) {
	                if(this.hierarchy[i].finalTransform.mProp.mdf) {
	                    this.finalTransform.matMdf = true;
	                    break;
	                }
	                i += 1;
	            }
	        }
	        
	        if(this.finalTransform.matMdf) {
	            mat = this.finalTransform.mProp.v.props;
	            finalMat.cloneFromProps(mat);
	            for(i=0;i<len;i+=1){
	                mat = this.hierarchy[i].finalTransform.mProp.v.props;
	                finalMat.transform(mat[0],mat[1],mat[2],mat[3],mat[4],mat[5],mat[6],mat[7],mat[8],mat[9],mat[10],mat[11],mat[12],mat[13],mat[14],mat[15]);
	            }
	        }
	        
	    }else if(this.isVisible){
	        finalMat = this.finalTransform.mProp.v;
	    }
	    if(this.finalTransform.matMdf && this.layerElement){
	        this.transformedElement.setAttribute('transform',finalMat.to2dCSS());
	    }
	    if(this.finalTransform.opMdf && this.layerElement){
	        this.transformedElement.setAttribute('opacity',this.finalTransform.op.v);
	    }
	
	    if(this.data.hasMask){
	        this.maskManager.renderFrame(finalMat);
	    }
	    if(this.effectsManager){
	        this.effectsManager.renderFrame(this.firstFrame);
	    }
	    return this.isVisible;
	};
	
	SVGBaseElement.prototype.destroy = function(){
	    this.layerElement = null;
	    this.parentContainer = null;
	    if(this.matteElement) {
	        this.matteElement = null;
	    }
	    if(this.maskManager) {
	        this.maskManager.destroy();
	    }
	};
	
	SVGBaseElement.prototype.getBaseElement = function(){
	    return this.baseElement;
	};
	SVGBaseElement.prototype.addMasks = function(data){
	    this.maskManager = new MaskElement(data,this,this.globalData);
	};
	
	SVGBaseElement.prototype.setMatte = function(id){
	    if(!this.matteElement){
	        return;
	    }
	    this.matteElement.setAttribute("mask", "url(#" + id + ")");
	};
	
	SVGBaseElement.prototype.setMatte = function(id){
	    if(!this.matteElement){
	        return;
	    }
	    this.matteElement.setAttribute("mask", "url(#" + id + ")");
	};
	
	SVGBaseElement.prototype.hide = function(){
	
	};
	
	function ITextElement(data, animationItem,parentContainer,globalData){
	}
	ITextElement.prototype.init = function(){
	    this._parent.init.call(this);
	
	    this.lettersChangedFlag = false;
	    this.currentTextDocumentData = {};
	    var data = this.data;
	    this.viewData = {
	        m:{
	            a: PropertyFactory.getProp(this,data.t.m.a,1,0,this.dynamicProperties)
	        }
	    };
	    var textData = this.data.t;
	    if(textData.a.length){
	        this.viewData.a = Array.apply(null,{length:textData.a.length});
	        var i, len = textData.a.length, animatorData, animatorProps;
	        for(i=0;i<len;i+=1){
	            animatorProps = textData.a[i];
	            animatorData = {
	                a: {},
	                s: {}
	            };
	            if('r' in animatorProps.a) {
	                animatorData.a.r = PropertyFactory.getProp(this,animatorProps.a.r,0,degToRads,this.dynamicProperties);
	            }
	            if('rx' in animatorProps.a) {
	                animatorData.a.rx = PropertyFactory.getProp(this,animatorProps.a.rx,0,degToRads,this.dynamicProperties);
	            }
	            if('ry' in animatorProps.a) {
	                animatorData.a.ry = PropertyFactory.getProp(this,animatorProps.a.ry,0,degToRads,this.dynamicProperties);
	            }
	            if('sk' in animatorProps.a) {
	                animatorData.a.sk = PropertyFactory.getProp(this,animatorProps.a.sk,0,degToRads,this.dynamicProperties);
	            }
	            if('sa' in animatorProps.a) {
	                animatorData.a.sa = PropertyFactory.getProp(this,animatorProps.a.sa,0,degToRads,this.dynamicProperties);
	            }
	            if('s' in animatorProps.a) {
	                animatorData.a.s = PropertyFactory.getProp(this,animatorProps.a.s,1,0.01,this.dynamicProperties);
	            }
	            if('a' in animatorProps.a) {
	                animatorData.a.a = PropertyFactory.getProp(this,animatorProps.a.a,1,0,this.dynamicProperties);
	            }
	            if('o' in animatorProps.a) {
	                animatorData.a.o = PropertyFactory.getProp(this,animatorProps.a.o,0,0.01,this.dynamicProperties);
	            }
	            if('p' in animatorProps.a) {
	                animatorData.a.p = PropertyFactory.getProp(this,animatorProps.a.p,1,0,this.dynamicProperties);
	            }
	            if('sw' in animatorProps.a) {
	                animatorData.a.sw = PropertyFactory.getProp(this,animatorProps.a.sw,0,0,this.dynamicProperties);
	            }
	            if('sc' in animatorProps.a) {
	                animatorData.a.sc = PropertyFactory.getProp(this,animatorProps.a.sc,1,0,this.dynamicProperties);
	            }
	            if('fc' in animatorProps.a) {
	                animatorData.a.fc = PropertyFactory.getProp(this,animatorProps.a.fc,1,0,this.dynamicProperties);
	            }
	            if('fh' in animatorProps.a) {
	                animatorData.a.fh = PropertyFactory.getProp(this,animatorProps.a.fh,0,0,this.dynamicProperties);
	            }
	            if('fs' in animatorProps.a) {
	                animatorData.a.fs = PropertyFactory.getProp(this,animatorProps.a.fs,0,0.01,this.dynamicProperties);
	            }
	            if('fb' in animatorProps.a) {
	                animatorData.a.fb = PropertyFactory.getProp(this,animatorProps.a.fb,0,0.01,this.dynamicProperties);
	            }
	            if('t' in animatorProps.a) {
	                animatorData.a.t = PropertyFactory.getProp(this,animatorProps.a.t,0,0,this.dynamicProperties);
	            }
	            animatorData.s = PropertyFactory.getTextSelectorProp(this,animatorProps.s,this.dynamicProperties);
	            animatorData.s.t = animatorProps.s.t;
	            this.viewData.a[i] = animatorData;
	        }
	    }else{
	        this.viewData.a = [];
	    }
	    if(textData.p && 'm' in textData.p){
	        this.viewData.p = {
	            f: PropertyFactory.getProp(this,textData.p.f,0,0,this.dynamicProperties),
	            l: PropertyFactory.getProp(this,textData.p.l,0,0,this.dynamicProperties),
	            r: textData.p.r,
	            m: this.maskManager.getMaskProperty(textData.p.m)
	        };
	        this.maskPath = true;
	    } else {
	        this.maskPath = false;
	    }
	};
	ITextElement.prototype.prepareFrame = function(num) {
	    var i = 0, len = this.data.t.d.k.length;
	    var textDocumentData = this.data.t.d.k[i].s;
	    i += 1;
	    while(i<len){
	        if(this.data.t.d.k[i].t > num){
	            break;
	        }
	        textDocumentData = this.data.t.d.k[i].s;
	        i += 1;
	    }
	    this.lettersChangedFlag = false;
	    if(textDocumentData !== this.currentTextDocumentData){
	        this.currentTextDocumentData = textDocumentData;
	        this.lettersChangedFlag = true;
	        this.buildNewText();
	    }
	    this._parent.prepareFrame.call(this, num);
	}
	
	ITextElement.prototype.createPathShape = function(matrixHelper, shapes) {
	    var j,jLen = shapes.length;
	    var k, kLen, pathNodes;
	    var shapeStr = '';
	    for(j=0;j<jLen;j+=1){
	        kLen = shapes[j].ks.k.i.length;
	        pathNodes = shapes[j].ks.k;
	        for(k=1;k<kLen;k+=1){
	            if(k==1){
	                shapeStr += " M"+matrixHelper.applyToPointStringified(pathNodes.v[0][0],pathNodes.v[0][1]);
	            }
	            shapeStr += " C"+matrixHelper.applyToPointStringified(pathNodes.o[k-1][0],pathNodes.o[k-1][1]) + " "+matrixHelper.applyToPointStringified(pathNodes.i[k][0],pathNodes.i[k][1]) + " "+matrixHelper.applyToPointStringified(pathNodes.v[k][0],pathNodes.v[k][1]);
	        }
	        shapeStr += " C"+matrixHelper.applyToPointStringified(pathNodes.o[k-1][0],pathNodes.o[k-1][1]) + " "+matrixHelper.applyToPointStringified(pathNodes.i[0][0],pathNodes.i[0][1]) + " "+matrixHelper.applyToPointStringified(pathNodes.v[0][0],pathNodes.v[0][1]);
	        shapeStr += 'z';
	    }
	    return shapeStr;
	};
	
	ITextElement.prototype.getMeasures = function(){
	
	    var matrixHelper = this.mHelper;
	    var renderType = this.renderType;
	    var data = this.data;
	    var xPos,yPos;
	    var i, len;
	    var documentData = this.currentTextDocumentData;
	    var letters = documentData.l;
	    if(this.maskPath) {
	        var mask = this.viewData.p.m;
	        if(!this.viewData.p.n || this.viewData.p.mdf){
	            var paths = mask.v;
	            if(this.viewData.p.r){
	                paths = reversePath(paths);
	            }
	            var pathInfo = {
	                tLength: 0,
	                segments: []
	            };
	            len = paths.v.length - 1;
	            var pathData;
	            var totalLength = 0;
	            for (i = 0; i < len; i += 1) {
	                pathData = {
	                    s: paths.v[i],
	                    e: paths.v[i + 1],
	                    to: [paths.o[i][0] - paths.v[i][0], paths.o[i][1] - paths.v[i][1]],
	                    ti: [paths.i[i + 1][0] - paths.v[i + 1][0], paths.i[i + 1][1] - paths.v[i + 1][1]]
	                };
	                bez.buildBezierData(pathData);
	                pathInfo.tLength += pathData.bezierData.segmentLength;
	                pathInfo.segments.push(pathData);
	                totalLength += pathData.bezierData.segmentLength;
	            }
	            i = len;
	            if (mask.v.c) {
	                pathData = {
	                    s: paths.v[i],
	                    e: paths.v[0],
	                    to: [paths.o[i][0] - paths.v[i][0], paths.o[i][1] - paths.v[i][1]],
	                    ti: [paths.i[0][0] - paths.v[0][0], paths.i[0][1] - paths.v[0][1]]
	                };
	                bez.buildBezierData(pathData);
	                pathInfo.tLength += pathData.bezierData.segmentLength;
	                pathInfo.segments.push(pathData);
	                totalLength += pathData.bezierData.segmentLength;
	            }
	            this.viewData.p.pi = pathInfo;
	        }
	        var pathInfo = this.viewData.p.pi;
	
	        var currentLength = this.viewData.p.f.v, segmentInd = 0, pointInd = 1, currentPoint, prevPoint, points;
	        var segmentLength = 0, flag = true;
	        var segments = pathInfo.segments;
	        if (currentLength < 0 && mask.v.c) {
	            if (pathInfo.tLength < Math.abs(currentLength)) {
	                currentLength = -Math.abs(currentLength) % pathInfo.tLength;
	            }
	            segmentInd = segments.length - 1;
	            points = segments[segmentInd].bezierData.points;
	            pointInd = points.length - 1;
	            while (currentLength < 0) {
	                currentLength += points[pointInd].partialLength;
	                pointInd -= 1;
	                if (pointInd < 0) {
	                    segmentInd -= 1;
	                    points = segments[segmentInd].bezierData.points;
	                    pointInd = points.length - 1;
	                }
	            }
	
	        }
	        points = segments[segmentInd].bezierData.points;
	        prevPoint = points[pointInd - 1];
	        currentPoint = points[pointInd];
	        var partialLength = currentPoint.partialLength;
	        var perc, tanAngle;
	    }
	
	
	    len = letters.length;
	    xPos = 0;
	    yPos = 0;
	    var yOff = documentData.s*1.2*.714;
	    var firstLine = true;
	    var renderedData = this.viewData, animatorProps, animatorSelector;
	    var j, jLen;
	    var lettersValue = Array.apply(null,{length:len}), letterValue;
	
	    jLen = renderedData.a.length;
	    var lastLetter;
	
	    var mult, ind = -1, offf, xPathPos, yPathPos;
	    var initPathPos = currentLength,initSegmentInd = segmentInd, initPointInd = pointInd, currentLine = -1;
	    var elemOpacity;
	    var sc,sw,fc,k;
	    var lineLength = 0;
	    var letterSw,letterSc,letterFc,letterM,letterP,letterO;
	    for( i = 0; i < len; i += 1) {
	        matrixHelper.reset();
	        elemOpacity = 1;
	        if(letters[i].n) {
	            xPos = 0;
	            yPos += documentData.yOffset;
	            yPos += firstLine ? 1 : 0;
	            currentLength = initPathPos ;
	            firstLine = false;
	            lineLength = 0;
	            if(this.maskPath) {
	                segmentInd = initSegmentInd;
	                pointInd = initPointInd;
	                points = segments[segmentInd].bezierData.points;
	                prevPoint = points[pointInd - 1];
	                currentPoint = points[pointInd];
	                partialLength = currentPoint.partialLength;
	                segmentLength = 0;
	            }
	            lettersValue[i] = this.emptyProp;
	        }else{
	            if(this.maskPath) {
	                if(currentLine !== letters[i].line){
	                    switch(documentData.j){
	                        case 1:
	                            currentLength += totalLength - documentData.lineWidths[letters[i].line];
	                            break;
	                        case 2:
	                            currentLength += (totalLength - documentData.lineWidths[letters[i].line])/2;
	                            break;
	                    }
	                    currentLine = letters[i].line;
	                }
	                if (ind !== letters[i].ind) {
	                    if (letters[ind]) {
	                        currentLength += letters[ind].extra;
	                    }
	                    currentLength += letters[i].an / 2;
	                    ind = letters[i].ind;
	                }
	                currentLength += renderedData.m.a.v[0] * letters[i].an / 200;
	                var animatorOffset = 0;
	                for (j = 0; j < jLen; j += 1) {
	                    animatorProps = renderedData.a[j].a;
	                    if ('p' in animatorProps) {
	                        animatorSelector = renderedData.a[j].s;
	                        mult = animatorSelector.getMult(letters[i].anIndexes[j],data.t.a[j].s.totalChars);
	                        if(mult.length){
	                            animatorOffset += animatorProps.p.v[0] * mult[0];
	                        } else{
	                            animatorOffset += animatorProps.p.v[0] * mult;
	                        }
	
	                    }
	                    if ('a' in animatorProps) {
	                        animatorSelector = renderedData.a[j].s;
	                        mult = animatorSelector.getMult(letters[i].anIndexes[j],data.t.a[j].s.totalChars);
	                        if(mult.length){
	                            animatorOffset += animatorProps.a.v[0] * mult[0];
	                        } else{
	                            animatorOffset += animatorProps.a.v[0] * mult;
	                        }
	
	                    }
	                }
	                flag = true;
	                while (flag) {
	                    if (segmentLength + partialLength >= currentLength + animatorOffset || !points) {
	                        perc = (currentLength + animatorOffset - segmentLength) / currentPoint.partialLength;
	                        xPathPos = prevPoint.point[0] + (currentPoint.point[0] - prevPoint.point[0]) * perc;
	                        yPathPos = prevPoint.point[1] + (currentPoint.point[1] - prevPoint.point[1]) * perc;
	                        matrixHelper.translate(-renderedData.m.a.v[0]*letters[i].an/200, -(renderedData.m.a.v[1] * yOff / 100));
	                        flag = false;
	                    } else if (points) {
	                        segmentLength += currentPoint.partialLength;
	                        pointInd += 1;
	                        if (pointInd >= points.length) {
	                            pointInd = 0;
	                            segmentInd += 1;
	                            if (!segments[segmentInd]) {
	                                if (mask.v.c) {
	                                    pointInd = 0;
	                                    segmentInd = 0;
	                                    points = segments[segmentInd].bezierData.points;
	                                } else {
	                                    segmentLength -= currentPoint.partialLength;
	                                    points = null;
	                                }
	                            } else {
	                                points = segments[segmentInd].bezierData.points;
	                            }
	                        }
	                        if (points) {
	                            prevPoint = currentPoint;
	                            currentPoint = points[pointInd];
	                            partialLength = currentPoint.partialLength;
	                        }
	                    }
	                }
	                offf = letters[i].an / 2 - letters[i].add;
	                matrixHelper.translate(-offf, 0, 0);
	            } else {
	                offf = letters[i].an/2 - letters[i].add;
	                matrixHelper.translate(-offf,0,0);
	
	                // Grouping alignment
	                matrixHelper.translate(-renderedData.m.a.v[0]*letters[i].an/200, -renderedData.m.a.v[1]*yOff/100, 0);
	            }
	
	            lineLength += letters[i].l/2;
	            for(j=0;j<jLen;j+=1){
	                animatorProps = renderedData.a[j].a;
	                if ('t' in animatorProps) {
	                    animatorSelector = renderedData.a[j].s;
	                    mult = animatorSelector.getMult(letters[i].anIndexes[j],data.t.a[j].s.totalChars);
	                    if(this.maskPath) {
	                        if(mult.length) {
	                            currentLength += animatorProps.t*mult[0];
	                        } else {
	                            currentLength += animatorProps.t*mult;
	                        }
	                    }else{
	                        if(mult.length) {
	                            xPos += animatorProps.t.v*mult[0];
	                        } else {
	                            xPos += animatorProps.t.v*mult;
	                        }
	                    }
	                }
	            }
	            lineLength += letters[i].l/2;
	            if(documentData.strokeWidthAnim) {
	                sw = documentData.sw || 0;
	            }
	            if(documentData.strokeColorAnim) {
	                if(documentData.sc){
	                    sc = [documentData.sc[0], documentData.sc[1], documentData.sc[2]];
	                }else{
	                    sc = [0,0,0];
	                }
	            }
	            if(documentData.fillColorAnim) {
	                fc = [documentData.fc[0], documentData.fc[1], documentData.fc[2]];
	            }
	            for(j=0;j<jLen;j+=1){
	                animatorProps = renderedData.a[j].a;
	                if ('a' in animatorProps) {
	                    animatorSelector = renderedData.a[j].s;
	                    mult = animatorSelector.getMult(letters[i].anIndexes[j],data.t.a[j].s.totalChars);
	
	                    if(mult.length){
	                        matrixHelper.translate(-animatorProps.a.v[0]*mult[0], -animatorProps.a.v[1]*mult[1], animatorProps.a.v[2]*mult[2]);
	                    } else {
	                        matrixHelper.translate(-animatorProps.a.v[0]*mult, -animatorProps.a.v[1]*mult, animatorProps.a.v[2]*mult);
	                    }
	                }
	            }
	            for(j=0;j<jLen;j+=1){
	                animatorProps = renderedData.a[j].a;
	                if ('s' in animatorProps) {
	                    animatorSelector = renderedData.a[j].s;
	                    mult = animatorSelector.getMult(letters[i].anIndexes[j],data.t.a[j].s.totalChars);
	                    if(mult.length){
	                        matrixHelper.scale(1+((animatorProps.s.v[0]-1)*mult[0]),1+((animatorProps.s.v[1]-1)*mult[1]),1);
	                    } else {
	                        matrixHelper.scale(1+((animatorProps.s.v[0]-1)*mult),1+((animatorProps.s.v[1]-1)*mult),1);
	                    }
	                }
	            }
	            for(j=0;j<jLen;j+=1) {
	                animatorProps = renderedData.a[j].a;
	                animatorSelector = renderedData.a[j].s;
	                mult = animatorSelector.getMult(letters[i].anIndexes[j],data.t.a[j].s.totalChars);
	                if ('sk' in animatorProps) {
	                    if(mult.length) {
	                        matrixHelper.skewFromAxis(-animatorProps.sk.v * mult[0], animatorProps.sa.v * mult[1]);
	                    } else {
	                        matrixHelper.skewFromAxis(-animatorProps.sk.v * mult, animatorProps.sa.v * mult);
	                    }
	                }
	                if ('r' in animatorProps) {
	                    if(mult.length) {
	                        matrixHelper.rotateZ(-animatorProps.r.v * mult[2]);
	                    } else {
	                        matrixHelper.rotateZ(-animatorProps.r.v * mult);
	                    }
	                }
	                if ('ry' in animatorProps) {
	
	                    if(mult.length) {
	                        matrixHelper.rotateY(animatorProps.ry.v*mult[1]);
	                    }else{
	                        matrixHelper.rotateY(animatorProps.ry.v*mult);
	                    }
	                }
	                if ('rx' in animatorProps) {
	                    if(mult.length) {
	                        matrixHelper.rotateX(animatorProps.rx.v*mult[0]);
	                    } else {
	                        matrixHelper.rotateX(animatorProps.rx.v*mult);
	                    }
	                }
	                if ('o' in animatorProps) {
	                    if(mult.length) {
	                        elemOpacity += ((animatorProps.o.v)*mult[0] - elemOpacity)*mult[0];
	                    } else {
	                        elemOpacity += ((animatorProps.o.v)*mult - elemOpacity)*mult;
	                    }
	                }
	                if (documentData.strokeWidthAnim && 'sw' in animatorProps) {
	                    if(mult.length) {
	                        sw += animatorProps.sw.v*mult[0];
	                    } else {
	                        sw += animatorProps.sw.v*mult;
	                    }
	                }
	                if (documentData.strokeColorAnim && 'sc' in animatorProps) {
	                    for(k=0;k<3;k+=1){
	                        if(mult.length) {
	                            sc[k] = Math.round(255*(sc[k] + (animatorProps.sc.v[k] - sc[k])*mult[0]));
	                        } else {
	                            sc[k] = Math.round(255*(sc[k] + (animatorProps.sc.v[k] - sc[k])*mult));
	                        }
	                    }
	                }
	                if (documentData.fillColorAnim) {
	                    if('fc' in animatorProps){
	                        for(k=0;k<3;k+=1){
	                            if(mult.length) {
	                                fc[k] = fc[k] + (animatorProps.fc.v[k] - fc[k])*mult[0];
	                            } else {
	                                fc[k] = fc[k] + (animatorProps.fc.v[k] - fc[k])*mult;
	                                //console.log('mult',mult);
	                                //console.log(Math.round(fc[k] + (animatorProps.fc.v[k] - fc[k])*mult));
	                            }
	                        }
	                    }
	                    if('fh' in animatorProps){
	                        if(mult.length) {
	                            fc = addHueToRGB(fc,animatorProps.fh.v*mult[0]);
	                        } else {
	                            fc = addHueToRGB(fc,animatorProps.fh.v*mult);
	                        }
	                    }
	                    if('fs' in animatorProps){
	                        if(mult.length) {
	                            fc = addSaturationToRGB(fc,animatorProps.fs.v*mult[0]);
	                        } else {
	                            fc = addSaturationToRGB(fc,animatorProps.fs.v*mult);
	                        }
	                    }
	                    if('fb' in animatorProps){
	                        if(mult.length) {
	                            fc = addBrightnessToRGB(fc,animatorProps.fb.v*mult[0]);
	                        } else {
	                            fc = addBrightnessToRGB(fc,animatorProps.fb.v*mult);
	                        }
	                    }
	                }
	            }
	
	            for(j=0;j<jLen;j+=1){
	                animatorProps = renderedData.a[j].a;
	
	                if ('p' in animatorProps) {
	                    animatorSelector = renderedData.a[j].s;
	                    mult = animatorSelector.getMult(letters[i].anIndexes[j],data.t.a[j].s.totalChars);
	                    if(this.maskPath) {
	                        if(mult.length) {
	                            matrixHelper.translate(0, animatorProps.p.v[1] * mult[0], -animatorProps.p.v[2] * mult[1]);
	                        } else {
	                            matrixHelper.translate(0, animatorProps.p.v[1] * mult, -animatorProps.p.v[2] * mult);
	                        }
	                    }else{
	                        if(mult.length) {
	                            matrixHelper.translate(animatorProps.p.v[0] * mult[0], animatorProps.p.v[1] * mult[1], -animatorProps.p.v[2] * mult[2]);
	                        } else {
	                            matrixHelper.translate(animatorProps.p.v[0] * mult, animatorProps.p.v[1] * mult, -animatorProps.p.v[2] * mult);
	                        }
	                    }
	                }
	            }
	            if(documentData.strokeWidthAnim){
	                letterSw = sw < 0 ? 0 : sw;
	            }
	            if(documentData.strokeColorAnim){
	                letterSc = 'rgb('+Math.round(sc[0]*255)+','+Math.round(sc[1]*255)+','+Math.round(sc[2]*255)+')';
	            }
	            if(documentData.fillColorAnim){
	                letterFc = 'rgb('+Math.round(fc[0]*255)+','+Math.round(fc[1]*255)+','+Math.round(fc[2]*255)+')';
	            }
	
	            if(this.maskPath) {
	                matrixHelper.translate(0,-documentData.ls);
	
	                matrixHelper.translate(0, renderedData.m.a.v[1]*yOff/100 + yPos,0);
	                if (data.t.p.p) {
	                    tanAngle = (currentPoint.point[1] - prevPoint.point[1]) / (currentPoint.point[0] - prevPoint.point[0]);
	                    var rot = Math.atan(tanAngle) * 180 / Math.PI;
	                    if (currentPoint.point[0] < prevPoint.point[0]) {
	                        rot += 180;
	                    }
	                    matrixHelper.rotate(-rot * Math.PI / 180);
	                }
	                matrixHelper.translate(xPathPos, yPathPos, 0);
	                currentLength -= renderedData.m.a.v[0]*letters[i].an/200;
	                if(letters[i+1] && ind !== letters[i+1].ind){
	                    currentLength += letters[i].an / 2;
	                    currentLength += documentData.tr/1000*documentData.s;
	                }
	            }else{
	
	                matrixHelper.translate(xPos,yPos,0);
	
	                if(documentData.ps){
	                    //matrixHelper.translate(documentData.ps[0],documentData.ps[1],0);
	                    matrixHelper.translate(documentData.ps[0],documentData.ps[1] + documentData.ascent,0);
	                }
	                switch(documentData.j){
	                    case 1:
	                        matrixHelper.translate(documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[letters[i].line]),0,0);
	                        break;
	                    case 2:
	                        matrixHelper.translate(documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[letters[i].line])/2,0,0);
	                        break;
	                }
	                matrixHelper.translate(0,-documentData.ls);
	                matrixHelper.translate(offf,0,0);
	                matrixHelper.translate(renderedData.m.a.v[0]*letters[i].an/200,renderedData.m.a.v[1]*yOff/100,0);
	                xPos += letters[i].l + documentData.tr/1000*documentData.s;
	            }
	            if(renderType === 'html'){
	                letterM = matrixHelper.toCSS();
	            }else if(renderType === 'svg'){
	                letterM = matrixHelper.to2dCSS();
	            }else{
	                letterP = [matrixHelper.props[0],matrixHelper.props[1],matrixHelper.props[2],matrixHelper.props[3],matrixHelper.props[4],matrixHelper.props[5],matrixHelper.props[6],matrixHelper.props[7],matrixHelper.props[8],matrixHelper.props[9],matrixHelper.props[10],matrixHelper.props[11],matrixHelper.props[12],matrixHelper.props[13],matrixHelper.props[14],matrixHelper.props[15]];
	            }
	            letterO = elemOpacity;
	
	            lastLetter = this.renderedLetters[i];
	            if(lastLetter && (lastLetter.o !== letterO || lastLetter.sw !== letterSw || lastLetter.sc !== letterSc || lastLetter.fc !== letterFc)){
	                this.lettersChangedFlag = true;
	                letterValue = new LetterProps(letterO,letterSw,letterSc,letterFc,letterM,letterP);
	            }else{
	                if((renderType === 'svg' || renderType === 'html') && (!lastLetter || lastLetter.m !== letterM)){
	                    this.lettersChangedFlag = true;
	                    letterValue = new LetterProps(letterO,letterSw,letterSc,letterFc,letterM);
	                }else if(renderType === 'canvas' && (!lastLetter || (lastLetter.props[0] !== letterP[0] || lastLetter.props[1] !== letterP[1] || lastLetter.props[4] !== letterP[4] || lastLetter.props[5] !== letterP[5] || lastLetter.props[12] !== letterP[12] || lastLetter.props[13] !== letterP[13]))){
	                    this.lettersChangedFlag = true;
	                    letterValue = new LetterProps(letterO,letterSw,letterSc,letterFc,null,letterP);
	                } else {
	                    letterValue = lastLetter;
	                }
	            }
	            this.renderedLetters[i] = letterValue;
	        }
	    }
	};
	
	ITextElement.prototype.emptyProp = new LetterProps();
	
	function SVGTextElement(data,parentContainer,globalData,comp, placeholder){
	    this.textSpans = [];
	    this.renderType = 'svg';
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	}
	createElement(SVGBaseElement, SVGTextElement);
	
	SVGTextElement.prototype.init = ITextElement.prototype.init;
	SVGTextElement.prototype.createPathShape = ITextElement.prototype.createPathShape;
	SVGTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures;
	SVGTextElement.prototype.prepareFrame = ITextElement.prototype.prepareFrame;
	
	SVGTextElement.prototype.createElements = function(){
	
	    this._parent.createElements.call(this);
	
	
	    if(this.data.ln){
	        this.layerElement.setAttribute('id',this.data.ln);
	    }
	    if(this.data.cl){
	        this.layerElement.setAttribute('class',this.data.cl);
	    }
	};
	
	SVGTextElement.prototype.buildNewText = function(){
	    var i, len;
	
	    var documentData = this.currentTextDocumentData;
	    this.renderedLetters = Array.apply(null,{length:this.currentTextDocumentData.l ? this.currentTextDocumentData.l.length : 0});
	    if(documentData.fc) {
	        this.layerElement.setAttribute('fill', 'rgb(' + Math.round(documentData.fc[0]*255) + ',' + Math.round(documentData.fc[1]*255) + ',' + Math.round(documentData.fc[2]*255) + ')');
	    }else{
	        this.layerElement.setAttribute('fill', 'rgba(0,0,0,0)');
	    }
	    if(documentData.sc){
	        this.layerElement.setAttribute('stroke', 'rgb(' + Math.round(documentData.sc[0]*255) + ',' + Math.round(documentData.sc[1]*255) + ',' + Math.round(documentData.sc[2]*255) + ')');
	        this.layerElement.setAttribute('stroke-width', documentData.sw);
	    }
	    this.layerElement.setAttribute('font-size', documentData.s);
	    var fontData = this.globalData.fontManager.getFontByName(documentData.f);
	    if(fontData.fClass){
	        this.layerElement.setAttribute('class',fontData.fClass);
	    } else {
	        this.layerElement.setAttribute('font-family', fontData.fFamily);
	        var fWeight = documentData.fWeight, fStyle = documentData.fStyle;
	        this.layerElement.setAttribute('font-style', fStyle);
	        this.layerElement.setAttribute('font-weight', fWeight);
	    }
	
	
	
	    var letters = documentData.l || [];
	    len = letters.length;
	    if(!len){
	        return;
	    }
	    var tSpan;
	    var matrixHelper = this.mHelper;
	    var shapes, shapeStr = '', singleShape = this.data.singleShape;
	    if (singleShape) {
	        var xPos = 0, yPos = 0, lineWidths = documentData.lineWidths, boxWidth = documentData.boxWidth, firstLine = true;
	    }
	    var cnt = 0;
	    for (i = 0;i < len ;i += 1) {
	        if(this.globalData.fontManager.chars){
	            if(!singleShape || i === 0){
	                tSpan = this.textSpans[cnt] ? this.textSpans[cnt] : document.createElementNS(svgNS,'path');
	            }
	        }else{
	            tSpan = this.textSpans[cnt] ? this.textSpans[cnt] : document.createElementNS(svgNS,'text');
	        }
	        tSpan.style.display = 'inherit';
	        tSpan.setAttribute('stroke-linecap', 'butt');
	        tSpan.setAttribute('stroke-linejoin','round');
	        tSpan.setAttribute('stroke-miterlimit','4');
	        //tSpan.setAttribute('visibility', 'hidden');
	        if(singleShape && letters[i].n) {
	            xPos = 0;
	            yPos += documentData.yOffset;
	            yPos += firstLine ? 1 : 0;
	            firstLine = false;
	        }
	        matrixHelper.reset();
	        if(this.globalData.fontManager.chars) {
	            matrixHelper.scale(documentData.s / 100, documentData.s / 100);
	        }
	        if (singleShape) {
	            if(documentData.ps){
	                matrixHelper.translate(documentData.ps[0],documentData.ps[1] + documentData.ascent,0);
	            }
	            matrixHelper.translate(0,-documentData.ls,0);
	            switch(documentData.j){
	                case 1:
	                    matrixHelper.translate(documentData.justifyOffset + (boxWidth - lineWidths[letters[i].line]),0,0);
	                    break;
	                case 2:
	                    matrixHelper.translate(documentData.justifyOffset + (boxWidth - lineWidths[letters[i].line])/2,0,0);
	                    break;
	            }
	            matrixHelper.translate(xPos, yPos, 0);
	        }
	        if(this.globalData.fontManager.chars){
	            var charData = this.globalData.fontManager.getCharData(documentData.t.charAt(i), fontData.fStyle, this.globalData.fontManager.getFontByName(documentData.f).fFamily);
	            var shapeData;
	            if(charData){
	                shapeData = charData.data;
	            } else {
	                shapeData = null;
	            }
	            if(shapeData && shapeData.shapes){
	                shapes = shapeData.shapes[0].it;
	                if(!singleShape){
	                    shapeStr = '';
	                }
	                shapeStr += this.createPathShape(matrixHelper,shapes);
	                if(!singleShape){
	
	                    tSpan.setAttribute('d',shapeStr);
	                }
	            }
	            if(!singleShape){
	                this.layerElement.appendChild(tSpan);
	            }
	        }else{
	            tSpan.textContent = letters[i].val;
	            tSpan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space","preserve");
	            this.layerElement.appendChild(tSpan);
	            if(singleShape){
	                tSpan.setAttribute('transform',matrixHelper.to2dCSS());
	            }
	        }
	        if(singleShape) {
	            xPos += letters[i].l;
	            xPos += documentData.tr/1000*documentData.s;
	        }
	        //
	        this.textSpans[cnt] = tSpan;
	        cnt += 1;
	    }
	    if(!singleShape){
	        while(cnt < this.textSpans.length){
	            this.textSpans[cnt].style.display = 'none';
	            cnt += 1;
	        }
	    }
	    if(singleShape && this.globalData.fontManager.chars){
	        tSpan.setAttribute('d',shapeStr);
	        this.layerElement.appendChild(tSpan);
	    }
	}
	
	SVGTextElement.prototype.hide = function(){
	    if(!this.hidden){
	        this.layerElement.style.display = 'none';
	        this.hidden = true;
	    }
	};
	
	SVGTextElement.prototype.renderFrame = function(parentMatrix){
	
	    var renderParent = this._parent.renderFrame.call(this,parentMatrix);
	    if(renderParent===false){
	        this.hide();
	        return;
	    }
	    if(this.hidden){
	        this.hidden = false;
	        this.layerElement.style.display = 'block';
	    }
	
	    if(this.data.singleShape){
	        return;
	    }
	    this.getMeasures();
	    if(!this.lettersChangedFlag){
	        return;
	    }
	    var  i,len;
	    var renderedLetters = this.renderedLetters;
	
	    var letters = this.currentTextDocumentData.l;
	
	    len = letters.length;
	    var renderedLetter;
	    for(i=0;i<len;i+=1){
	        if(letters[i].n){
	            continue;
	        }
	        renderedLetter = renderedLetters[i];
	        this.textSpans[i].setAttribute('transform',renderedLetter.m);
	        this.textSpans[i].setAttribute('opacity',renderedLetter.o);
	        if(renderedLetter.sw){
	            this.textSpans[i].setAttribute('stroke-width',renderedLetter.sw);
	        }
	        if(renderedLetter.sc){
	            this.textSpans[i].setAttribute('stroke',renderedLetter.sc);
	        }
	        if(renderedLetter.fc){
	            this.textSpans[i].setAttribute('fill',renderedLetter.fc);
	        }
	    }
	    if(this.firstFrame) {
	        this.firstFrame = false;
	    }
	}
	
	
	SVGTextElement.prototype.destroy = function(){
	    this._parent.destroy.call(this._parent);
	};
	function SVGTintFilter(filter, filterManager){
	    this.filterManager = filterManager;
	    var feColorMatrix = document.createElementNS(svgNS,'feColorMatrix');
	    feColorMatrix.setAttribute('type','matrix');
	    feColorMatrix.setAttribute('color-interpolation-filters','linearRGB');
	    feColorMatrix.setAttribute('values','0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0');
	    feColorMatrix.setAttribute('result','f1');
	    filter.appendChild(feColorMatrix);
	    feColorMatrix = document.createElementNS(svgNS,'feColorMatrix');
	    feColorMatrix.setAttribute('type','matrix');
	    feColorMatrix.setAttribute('color-interpolation-filters','sRGB');
	    feColorMatrix.setAttribute('values','1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0');
	    feColorMatrix.setAttribute('result','f2');
	    filter.appendChild(feColorMatrix);
	    this.matrixFilter = feColorMatrix;
	    if(filterManager.effectElements[2].p.v !== 100 || filterManager.effectElements[2].p.k){
	        var feMerge = document.createElementNS(svgNS,'feMerge');
	        filter.appendChild(feMerge);
	        var feMergeNode;
	        feMergeNode = document.createElementNS(svgNS,'feMergeNode');
	        feMergeNode.setAttribute('in','SourceGraphic');
	        feMerge.appendChild(feMergeNode);
	        feMergeNode = document.createElementNS(svgNS,'feMergeNode');
	        feMergeNode.setAttribute('in','f2');
	        feMerge.appendChild(feMergeNode);
	    }
	}
	
	SVGTintFilter.prototype.renderFrame = function(forceRender){
	    if(forceRender || this.filterManager.mdf){
	        var colorBlack = this.filterManager.effectElements[0].p.v;
	        var colorWhite = this.filterManager.effectElements[1].p.v;
	        var opacity = this.filterManager.effectElements[2].p.v/100;
	        this.matrixFilter.setAttribute('values',(colorWhite[0]- colorBlack[0])+' 0 0 0 '+ colorBlack[0] +' '+ (colorWhite[1]- colorBlack[1]) +' 0 0 0 '+ colorBlack[1] +' '+ (colorWhite[2]- colorBlack[2]) +' 0 0 0 '+ colorBlack[2] +' 0 0 0 ' + opacity + ' 0');
	    }
	};
	function SVGFillFilter(filter, filterManager){
	    this.filterManager = filterManager;
	    var feColorMatrix = document.createElementNS(svgNS,'feColorMatrix');
	    feColorMatrix.setAttribute('type','matrix');
	    feColorMatrix.setAttribute('color-interpolation-filters','sRGB');
	    feColorMatrix.setAttribute('values','1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0');
	    filter.appendChild(feColorMatrix);
	    this.matrixFilter = feColorMatrix;
	}
	SVGFillFilter.prototype.renderFrame = function(forceRender){
	    if(forceRender || this.filterManager.mdf){
	        var color = this.filterManager.effectElements[2].p.v;
	        var opacity = this.filterManager.effectElements[6].p.v;
	        this.matrixFilter.setAttribute('values','0 0 0 0 '+color[0]+' 0 0 0 0 '+color[1]+' 0 0 0 0 '+color[2]+' 0 0 0 '+opacity+' 0');
	    }
	};
	function SVGStrokeEffect(elem, filterManager){
	    this.initialized = false;
	    this.filterManager = filterManager;
	    this.elem = elem;
	    this.paths = [];
	}
	
	SVGStrokeEffect.prototype.initialize = function(){
	
	    var elemChildren = this.elem.layerElement.children || this.elem.layerElement.childNodes;
	    var path,groupPath, i, len;
	    if(this.filterManager.effectElements[1].p.v === 1){
	        len = this.elem.maskManager.masksProperties.length;
	        i = 0;
	    } else {
	        i = this.filterManager.effectElements[0].p.v - 1;
	        len = i + 1;
	    }
	    groupPath = document.createElementNS(svgNS,'g'); 
	    groupPath.setAttribute('fill','none');
	    groupPath.setAttribute('stroke-linecap','round');
	    groupPath.setAttribute('stroke-dashoffset',1);
	    for(i;i<len;i+=1){
	        path = document.createElementNS(svgNS,'path');
	        groupPath.appendChild(path);
	        this.paths.push({p:path,m:i});
	    }
	    if(this.filterManager.effectElements[10].p.v === 3){
	        var mask = document.createElementNS(svgNS,'mask');
	        var id = 'stms_' + randomString(10);
	        mask.setAttribute('id',id);
	        mask.setAttribute('mask-type','alpha');
	        mask.appendChild(groupPath);
	        this.elem.globalData.defs.appendChild(mask);
	        var g = document.createElementNS(svgNS,'g');
	        g.setAttribute('mask','url(#'+id+')');
	        if(elemChildren[0]){
	            g.appendChild(elemChildren[0]);
	        }
	        this.elem.layerElement.appendChild(g);
	        this.masker = mask;
	        groupPath.setAttribute('stroke','#fff');
	    } else if(this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2){
	        if(this.filterManager.effectElements[10].p.v === 2){
	            var elemChildren = this.elem.layerElement.children || this.elem.layerElement.childNodes;
	            while(elemChildren.length){
	                this.elem.layerElement.removeChild(elemChildren[0]);
	            }
	        }
	        this.elem.layerElement.appendChild(groupPath);
	        this.elem.layerElement.removeAttribute('mask');
	        groupPath.setAttribute('stroke','#fff');
	    }
	    this.initialized = true;
	    this.pathMasker = groupPath;
	}
	
	SVGStrokeEffect.prototype.renderFrame = function(forceRender){
	    if(!this.initialized){
	        this.initialize();
	    }
	    var i, len = this.paths.length;
	    var mask, path;
	    for(i=0;i<len;i+=1){
	        mask = this.elem.maskManager.viewData[this.paths[i].m];
	        path = this.paths[i].p;
	        if(forceRender || this.filterManager.mdf || mask.prop.mdf){
	            path.setAttribute('d',mask.lastPath);
	        }
	        if(forceRender || this.filterManager.effectElements[9].p.mdf || this.filterManager.effectElements[4].p.mdf || this.filterManager.effectElements[7].p.mdf || this.filterManager.effectElements[8].p.mdf || mask.prop.mdf){
	            var dasharrayValue;
	            if(this.filterManager.effectElements[7].p.v !== 0 || this.filterManager.effectElements[8].p.v !== 100){
	                var s = Math.min(this.filterManager.effectElements[7].p.v,this.filterManager.effectElements[8].p.v)/100;
	                var e = Math.max(this.filterManager.effectElements[7].p.v,this.filterManager.effectElements[8].p.v)/100;
	                var l = path.getTotalLength();
	                dasharrayValue = '0 0 0 ' + l*s + ' ';
	                var lineLength = l*(e-s);
	                var segment = 1+this.filterManager.effectElements[4].p.v*2*this.filterManager.effectElements[9].p.v/100;
	                var units = Math.floor(lineLength/segment);
	                var j;
	                for(j=0;j<units;j+=1){
	                    dasharrayValue += '1 ' + this.filterManager.effectElements[4].p.v*2*this.filterManager.effectElements[9].p.v/100 + ' ';
	                }
	                dasharrayValue += '0 ' + l*10 + ' 0 0';
	            } else {
	                dasharrayValue = '1 ' + this.filterManager.effectElements[4].p.v*2*this.filterManager.effectElements[9].p.v/100;
	            }
	            path.setAttribute('stroke-dasharray',dasharrayValue);
	        }
	    }
	    if(forceRender || this.filterManager.effectElements[4].p.mdf){
	        this.pathMasker.setAttribute('stroke-width',this.filterManager.effectElements[4].p.v*2);
	    }
	    
	    if(forceRender || this.filterManager.effectElements[6].p.mdf){
	        this.pathMasker.setAttribute('opacity',this.filterManager.effectElements[6].p.v);
	    }
	    if(this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2){
	        if(forceRender || this.filterManager.effectElements[3].p.mdf){
	            var color = this.filterManager.effectElements[3].p.v;
	            this.pathMasker.setAttribute('stroke','rgb('+bm_floor(color[0]*255)+','+bm_floor(color[1]*255)+','+bm_floor(color[2]*255)+')');
	        }
	    }
	};
	function SVGTritoneFilter(filter, filterManager){
	    this.filterManager = filterManager;
	    var feColorMatrix = document.createElementNS(svgNS,'feColorMatrix');
	    feColorMatrix.setAttribute('type','matrix');
	    feColorMatrix.setAttribute('color-interpolation-filters','linearRGB');
	    feColorMatrix.setAttribute('values','0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0');
	    feColorMatrix.setAttribute('result','f1');
	    filter.appendChild(feColorMatrix);
	    var feComponentTransfer = document.createElementNS(svgNS,'feComponentTransfer');
	    feComponentTransfer.setAttribute('color-interpolation-filters','sRGB');
	    filter.appendChild(feComponentTransfer);
	    this.matrixFilter = feComponentTransfer;
	    var feFuncR = document.createElementNS(svgNS,'feFuncR');
	    feFuncR.setAttribute('type','table');
	    feComponentTransfer.appendChild(feFuncR);
	    this.feFuncR = feFuncR;
	    var feFuncG = document.createElementNS(svgNS,'feFuncG');
	    feFuncG.setAttribute('type','table');
	    feComponentTransfer.appendChild(feFuncG);
	    this.feFuncG = feFuncG;
	    var feFuncB = document.createElementNS(svgNS,'feFuncB');
	    feFuncB.setAttribute('type','table');
	    feComponentTransfer.appendChild(feFuncB);
	    this.feFuncB = feFuncB;
	}
	
	SVGTritoneFilter.prototype.renderFrame = function(forceRender){
	    if(forceRender || this.filterManager.mdf){
	        var color1 = this.filterManager.effectElements[0].p.v;
	        var color2 = this.filterManager.effectElements[1].p.v;
	        var color3 = this.filterManager.effectElements[2].p.v;
	        var tableR = color3[0] + ' ' + color2[0] + ' ' + color1[0]
	        var tableG = color3[1] + ' ' + color2[1] + ' ' + color1[1]
	        var tableB = color3[2] + ' ' + color2[2] + ' ' + color1[2]
	        this.feFuncR.setAttribute('tableValues', tableR);
	        this.feFuncG.setAttribute('tableValues', tableG);
	        this.feFuncB.setAttribute('tableValues', tableB);
	        //var opacity = this.filterManager.effectElements[2].p.v/100;
	        //this.matrixFilter.setAttribute('values',(colorWhite[0]- colorBlack[0])+' 0 0 0 '+ colorBlack[0] +' '+ (colorWhite[1]- colorBlack[1]) +' 0 0 0 '+ colorBlack[1] +' '+ (colorWhite[2]- colorBlack[2]) +' 0 0 0 '+ colorBlack[2] +' 0 0 0 ' + opacity + ' 0');
	    }
	};
	function SVGProLevelsFilter(filter, filterManager){
	    this.filterManager = filterManager;
	    var effectElements = this.filterManager.effectElements;
	    var feComponentTransfer = document.createElementNS(svgNS,'feComponentTransfer');
	    var feFuncR, feFuncG, feFuncB;
	    
	    if(effectElements[9].p.k || effectElements[9].p.v !== 0 || effectElements[10].p.k || effectElements[10].p.v !== 1 || effectElements[11].p.k || effectElements[11].p.v !== 1 || effectElements[12].p.k || effectElements[12].p.v !== 0 || effectElements[13].p.k || effectElements[13].p.v !== 1){
	        this.feFuncR = this.createFeFunc('feFuncR', feComponentTransfer);
	    }
	    if(effectElements[16].p.k || effectElements[16].p.v !== 0 || effectElements[17].p.k || effectElements[17].p.v !== 1 || effectElements[18].p.k || effectElements[18].p.v !== 1 || effectElements[19].p.k || effectElements[19].p.v !== 0 || effectElements[20].p.k || effectElements[20].p.v !== 1){
	        this.feFuncG = this.createFeFunc('feFuncG', feComponentTransfer);
	    }
	    if(effectElements[23].p.k || effectElements[23].p.v !== 0 || effectElements[24].p.k || effectElements[24].p.v !== 1 || effectElements[25].p.k || effectElements[25].p.v !== 1 || effectElements[26].p.k || effectElements[26].p.v !== 0 || effectElements[27].p.k || effectElements[27].p.v !== 1){
	        this.feFuncB = this.createFeFunc('feFuncB', feComponentTransfer);
	    }
	    if(effectElements[30].p.k || effectElements[30].p.v !== 0 || effectElements[31].p.k || effectElements[31].p.v !== 1 || effectElements[32].p.k || effectElements[32].p.v !== 1 || effectElements[33].p.k || effectElements[33].p.v !== 0 || effectElements[34].p.k || effectElements[34].p.v !== 1){
	        this.feFuncA = this.createFeFunc('feFuncA', feComponentTransfer);
	    }
	    
	    if(this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA){
	        feComponentTransfer.setAttribute('color-interpolation-filters','sRGB');
	        filter.appendChild(feComponentTransfer);
	        feComponentTransfer = document.createElementNS(svgNS,'feComponentTransfer');
	    }
	
	    if(effectElements[2].p.k || effectElements[2].p.v !== 0 || effectElements[3].p.k || effectElements[3].p.v !== 1 || effectElements[4].p.k || effectElements[4].p.v !== 1 || effectElements[5].p.k || effectElements[5].p.v !== 0 || effectElements[6].p.k || effectElements[6].p.v !== 1){
	
	        feComponentTransfer.setAttribute('color-interpolation-filters','sRGB');
	        filter.appendChild(feComponentTransfer);
	        this.feFuncRComposed = this.createFeFunc('feFuncR', feComponentTransfer);
	        this.feFuncGComposed = this.createFeFunc('feFuncG', feComponentTransfer);
	        this.feFuncBComposed = this.createFeFunc('feFuncB', feComponentTransfer);
	    }
	}
	
	SVGProLevelsFilter.prototype.createFeFunc = function(type, feComponentTransfer) {
	    var feFunc = document.createElementNS(svgNS,type);
	    feFunc.setAttribute('type','table');
	    feComponentTransfer.appendChild(feFunc);
	    return feFunc;
	};
	
	SVGProLevelsFilter.prototype.getTableValue = function(inputBlack, inputWhite, gamma, outputBlack, outputWhite) {
	    var cnt = 0;
	    var segments = 256;
	    var perc;
	    var min = Math.min(inputBlack, inputWhite);
	    var max = Math.max(inputBlack, inputWhite);
	    var table = Array.call(null,{length:segments});
	    var colorValue;
	    var pos = 0;
	    var outputDelta = outputWhite - outputBlack; 
	    var inputDelta = inputWhite - inputBlack; 
	    while(cnt <= 256) {
	        perc = cnt/256;
	        if(perc <= min){
	            colorValue = inputDelta < 0 ? outputWhite : outputBlack;
	        } else if(perc >= max){
	            colorValue = inputDelta < 0 ? outputBlack : outputWhite;
	        } else {
	            colorValue = (outputBlack + outputDelta * Math.pow((perc - inputBlack) / inputDelta, 1 / gamma));
	        }
	        table[pos++] = colorValue;
	        cnt += 256/(segments-1);
	    }
	    return table.join(' ');
	};
	
	SVGProLevelsFilter.prototype.renderFrame = function(forceRender){
	    if(forceRender || this.filterManager.mdf){
	        var val, cnt, perc, bezier;
	        var effectElements = this.filterManager.effectElements;
	        if(this.feFuncRComposed && (forceRender || effectElements[2].p.mdf || effectElements[3].p.mdf || effectElements[4].p.mdf || effectElements[5].p.mdf || effectElements[6].p.mdf)){
	            val = this.getTableValue(effectElements[2].p.v,effectElements[3].p.v,effectElements[4].p.v,effectElements[5].p.v,effectElements[6].p.v);
	            this.feFuncRComposed.setAttribute('tableValues',val);
	            this.feFuncGComposed.setAttribute('tableValues',val);
	            this.feFuncBComposed.setAttribute('tableValues',val);
	        }
	
	        if(this.feFuncR && (forceRender || effectElements[9].p.mdf || effectElements[10].p.mdf || effectElements[11].p.mdf || effectElements[12].p.mdf || effectElements[13].p.mdf)){
	            val = this.getTableValue(effectElements[9].p.v,effectElements[10].p.v,effectElements[11].p.v,effectElements[12].p.v,effectElements[13].p.v);
	            this.feFuncR.setAttribute('tableValues',val);
	        }
	
	        if(this.feFuncG && (forceRender || effectElements[16].p.mdf || effectElements[17].p.mdf || effectElements[18].p.mdf || effectElements[19].p.mdf || effectElements[20].p.mdf)){
	            val = this.getTableValue(effectElements[16].p.v,effectElements[17].p.v,effectElements[18].p.v,effectElements[19].p.v,effectElements[20].p.v);
	            this.feFuncG.setAttribute('tableValues',val);
	        }
	
	        if(this.feFuncB && (forceRender || effectElements[23].p.mdf || effectElements[24].p.mdf || effectElements[25].p.mdf || effectElements[26].p.mdf || effectElements[27].p.mdf)){
	            val = this.getTableValue(effectElements[23].p.v,effectElements[24].p.v,effectElements[25].p.v,effectElements[26].p.v,effectElements[27].p.v);
	            this.feFuncB.setAttribute('tableValues',val);
	        }
	
	        if(this.feFuncA && (forceRender || effectElements[30].p.mdf || effectElements[31].p.mdf || effectElements[32].p.mdf || effectElements[33].p.mdf || effectElements[34].p.mdf)){
	            val = this.getTableValue(effectElements[30].p.v,effectElements[31].p.v,effectElements[32].p.v,effectElements[33].p.v,effectElements[34].p.v);
	            this.feFuncA.setAttribute('tableValues',val);
	        }
	        
	    }
	};
	function SVGDropShadowEffect(filter, filterManager){
	    /*<feGaussianBlur in="SourceAlpha" stdDeviation="3"/> <!-- stdDeviation is how much to blur -->
	  <feOffset dx="2" dy="2" result="offsetblur"/> <!-- how much to offset -->
	  <feMerge> 
	    <feMergeNode/> <!-- this contains the offset blurred image -->
	    <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
	  </feMerge>*/
	  /*<feFlood flood-color="#3D4574" flood-opacity="0.5" result="offsetColor"/>*/
	    filter.setAttribute('x','-100%');
	    filter.setAttribute('y','-100%');
	    filter.setAttribute('width','400%');
	    filter.setAttribute('height','400%');
	    this.filterManager = filterManager;
	
	    var feGaussianBlur = document.createElementNS(svgNS,'feGaussianBlur');
	    feGaussianBlur.setAttribute('in','SourceAlpha');
	    feGaussianBlur.setAttribute('result','drop_shadow_1');
	    feGaussianBlur.setAttribute('stdDeviation','0');
	    this.feGaussianBlur = feGaussianBlur;
	    filter.appendChild(feGaussianBlur);
	
	    var feOffset = document.createElementNS(svgNS,'feOffset');
	    feOffset.setAttribute('dx','25');
	    feOffset.setAttribute('dy','0');
	    feOffset.setAttribute('in','drop_shadow_1');
	    feOffset.setAttribute('result','drop_shadow_2');
	    this.feOffset = feOffset;
	    filter.appendChild(feOffset);
	    var feFlood = document.createElementNS(svgNS,'feFlood');
	    feFlood.setAttribute('flood-color','#00ff00');
	    feFlood.setAttribute('flood-opacity','1');
	    feFlood.setAttribute('result','drop_shadow_3');
	    this.feFlood = feFlood;
	    filter.appendChild(feFlood);
	
	    var feComposite = document.createElementNS(svgNS,'feComposite');
	    feComposite.setAttribute('in','drop_shadow_3');
	    feComposite.setAttribute('in2','drop_shadow_2');
	    feComposite.setAttribute('operator','in');
	    feComposite.setAttribute('result','drop_shadow_4');
	    filter.appendChild(feComposite);
	
	
	    var feMerge = document.createElementNS(svgNS,'feMerge');
	    filter.appendChild(feMerge);
	    var feMergeNode;
	    feMergeNode = document.createElementNS(svgNS,'feMergeNode');
	    feMerge.appendChild(feMergeNode);
	    feMergeNode = document.createElementNS(svgNS,'feMergeNode');
	    feMergeNode.setAttribute('in','SourceGraphic');
	    this.feMergeNode = feMergeNode;
	    this.feMerge = feMerge;
	    this.originalNodeAdded = false;
	    feMerge.appendChild(feMergeNode);
	}
	
	SVGDropShadowEffect.prototype.renderFrame = function(forceRender){
	    if(forceRender || this.filterManager.mdf){
	        if(forceRender || this.filterManager.effectElements[4].p.mdf){
	            this.feGaussianBlur.setAttribute('stdDeviation', this.filterManager.effectElements[4].p.v / 4);
	        }
	        if(forceRender || this.filterManager.effectElements[0].p.mdf){
	            var col = this.filterManager.effectElements[0].p.v;
	            this.feFlood.setAttribute('flood-color',rgbToHex(Math.round(col[0]*255),Math.round(col[1]*255),Math.round(col[2]*255)));
	        }
	        if(forceRender || this.filterManager.effectElements[1].p.mdf){
	            this.feFlood.setAttribute('flood-opacity',this.filterManager.effectElements[1].p.v/255);
	        }
	        if(forceRender || this.filterManager.effectElements[2].p.mdf || this.filterManager.effectElements[3].p.mdf){
	            var distance = this.filterManager.effectElements[3].p.v
	            var angle = (this.filterManager.effectElements[2].p.v - 90) * degToRads
	            var x = distance * Math.cos(angle)
	            var y = distance * Math.sin(angle)
	            this.feOffset.setAttribute('dx', x);
	            this.feOffset.setAttribute('dy', y);
	        }
	        /*if(forceRender || this.filterManager.effectElements[5].p.mdf){
	            if(this.filterManager.effectElements[5].p.v === 1 && this.originalNodeAdded) {
	                this.feMerge.removeChild(this.feMergeNode);
	                this.originalNodeAdded = false;
	            } else if(this.filterManager.effectElements[5].p.v === 0 && !this.originalNodeAdded) {
	                this.feMerge.appendChild(this.feMergeNode);
	                this.originalNodeAdded = true;
	            }
	        }*/
	    }
	};
	function SVGEffects(elem){
	    var i, len = elem.data.ef.length;
	    var filId = randomString(10);
	    var fil = filtersFactory.createFilter(filId);
	    var count = 0;
	    this.filters = [];
	    var filterManager;
	    for(i=0;i<len;i+=1){
	        if(elem.data.ef[i].ty === 20){
	            count += 1;
	            filterManager = new SVGTintFilter(fil, elem.effects.effectElements[i]);
	            this.filters.push(filterManager);
	        }else if(elem.data.ef[i].ty === 21){
	            count += 1;
	            filterManager = new SVGFillFilter(fil, elem.effects.effectElements[i]);
	            this.filters.push(filterManager);
	        }else if(elem.data.ef[i].ty === 22){
	            filterManager = new SVGStrokeEffect(elem, elem.effects.effectElements[i]);
	            this.filters.push(filterManager);
	        }else if(elem.data.ef[i].ty === 23){
	            count += 1;
	            filterManager = new SVGTritoneFilter(fil, elem.effects.effectElements[i]);
	            this.filters.push(filterManager);
	        }else if(elem.data.ef[i].ty === 24){
	            count += 1;
	            filterManager = new SVGProLevelsFilter(fil, elem.effects.effectElements[i]);
	            this.filters.push(filterManager);
	        }else if(elem.data.ef[i].ty === 25){
	            count += 1;
	            filterManager = new SVGDropShadowEffect(fil, elem.effects.effectElements[i]);
	            this.filters.push(filterManager);
	        }
	    }
	    if(count){
	        elem.globalData.defs.appendChild(fil);
	        elem.layerElement.setAttribute('filter','url(#'+filId+')');
	    }
	}
	
	SVGEffects.prototype.renderFrame = function(firstFrame){
	    var i, len = this.filters.length;
	    for(i=0;i<len;i+=1){
	        this.filters[i].renderFrame(firstFrame);
	    }
	};
	function ICompElement(data,parentContainer,globalData,comp, placeholder){
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	    this.layers = data.layers;
	    this.supports3d = true;
	    this.completeLayers = false;
	    this.pendingElements = [];
	    this.elements = this.layers ? Array.apply(null,{length:this.layers.length}) : [];
	    if(this.data.tm){
	        this.tm = PropertyFactory.getProp(this,this.data.tm,0,globalData.frameRate,this.dynamicProperties);
	    }
	    if(this.data.xt){
	        this.layerElement = document.createElementNS(svgNS,'g');
	        this.buildAllItems();
	    } else if(!globalData.progressiveLoad){
	        this.buildAllItems();
	    }
	}
	createElement(SVGBaseElement, ICompElement);
	
	ICompElement.prototype.hide = function(){
	    if(!this.hidden){
	        var i,len = this.elements.length;
	        for( i = 0; i < len; i+=1 ){
	            if(this.elements[i]){
	                this.elements[i].hide();
	            }
	        }
	        this.hidden = true;
	    }
	};
	
	ICompElement.prototype.prepareFrame = function(num){
	    this._parent.prepareFrame.call(this,num);
	    if(this.isVisible===false && !this.data.xt){
	        return;
	    }
	
	    if(this.tm){
	        var timeRemapped = this.tm.v;
	        if(timeRemapped === this.data.op){
	            timeRemapped = this.data.op - 1;
	        }
	        this.renderedFrame = timeRemapped;
	    } else {
	        this.renderedFrame = num/this.data.sr;
	    }
	    var i,len = this.elements.length;
	    if(!this.completeLayers){
	        this.checkLayers(this.renderedFrame);
	    }
	    for( i = 0; i < len; i+=1 ){
	        if(this.completeLayers || this.elements[i]){
	            this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st);
	        }
	    }
	};
	
	ICompElement.prototype.renderFrame = function(parentMatrix){
	    var renderParent = this._parent.renderFrame.call(this,parentMatrix);
	    var i,len = this.layers.length;
	    if(renderParent===false){
	        this.hide();
	        return;
	    }
	
	    this.hidden = false;
	    for( i = 0; i < len; i+=1 ){
	        if(this.completeLayers || this.elements[i]){
	            this.elements[i].renderFrame();
	        }
	    }
	    if(this.firstFrame){
	        this.firstFrame = false;
	    }
	};
	
	ICompElement.prototype.setElements = function(elems){
	    this.elements = elems;
	};
	
	ICompElement.prototype.getElements = function(){
	    return this.elements;
	};
	
	ICompElement.prototype.destroy = function(){
	    this._parent.destroy.call(this._parent);
	    var i,len = this.layers.length;
	    for( i = 0; i < len; i+=1 ){
	        if(this.elements[i]){
	            this.elements[i].destroy();
	        }
	    }
	};
	
	ICompElement.prototype.checkLayers = SVGRenderer.prototype.checkLayers;
	ICompElement.prototype.buildItem = SVGRenderer.prototype.buildItem;
	ICompElement.prototype.buildAllItems = SVGRenderer.prototype.buildAllItems;
	ICompElement.prototype.buildElementParenting = SVGRenderer.prototype.buildElementParenting;
	ICompElement.prototype.createItem = SVGRenderer.prototype.createItem;
	ICompElement.prototype.createImage = SVGRenderer.prototype.createImage;
	ICompElement.prototype.createComp = SVGRenderer.prototype.createComp;
	ICompElement.prototype.createSolid = SVGRenderer.prototype.createSolid;
	ICompElement.prototype.createShape = SVGRenderer.prototype.createShape;
	ICompElement.prototype.createText = SVGRenderer.prototype.createText;
	ICompElement.prototype.createBase = SVGRenderer.prototype.createBase;
	ICompElement.prototype.appendElementInPos = SVGRenderer.prototype.appendElementInPos;
	ICompElement.prototype.checkPendingElements = SVGRenderer.prototype.checkPendingElements;
	ICompElement.prototype.addPendingElement = SVGRenderer.prototype.addPendingElement;
	function IImageElement(data,parentContainer,globalData,comp,placeholder){
	    this.assetData = globalData.getAssetData(data.refId);
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp,placeholder);
	}
	createElement(SVGBaseElement, IImageElement);
	
	IImageElement.prototype.createElements = function(){
	
	    var assetPath = this.globalData.getAssetsPath(this.assetData);
	
	    this._parent.createElements.call(this);
	
	    this.innerElem = document.createElementNS(svgNS,'image');
	    this.innerElem.setAttribute('width',this.assetData.w+"px");
	    this.innerElem.setAttribute('height',this.assetData.h+"px");
	    this.innerElem.setAttribute('preserveAspectRatio','xMidYMid slice');
	    this.innerElem.setAttributeNS('http://www.w3.org/1999/xlink','href',assetPath);
	    this.maskedElement = this.innerElem;
	    this.layerElement.appendChild(this.innerElem);
	    if(this.data.ln){
	        this.layerElement.setAttribute('id',this.data.ln);
	    }
	    if(this.data.cl){
	        this.layerElement.setAttribute('class',this.data.cl);
	    }
	
	};
	
	IImageElement.prototype.hide = function(){
	    if(!this.hidden){
	        this.layerElement.style.display = 'none';
	        this.hidden = true;
	    }
	};
	
	IImageElement.prototype.renderFrame = function(parentMatrix){
	    var renderParent = this._parent.renderFrame.call(this,parentMatrix);
	    if(renderParent===false){
	        this.hide();
	        return;
	    }
	    if(this.hidden){
	        this.hidden = false;
	        this.layerElement.style.display = 'block';
	    }
	    if(this.firstFrame){
	        this.firstFrame = false;
	    }
	};
	
	IImageElement.prototype.destroy = function(){
	    this._parent.destroy.call(this._parent);
	    this.innerElem =  null;
	};
	function IShapeElement(data,parentContainer,globalData,comp, placeholder){
	    this.shapes = [];
	    this.shapesData = data.shapes;
	    this.stylesList = [];
	    this.viewData = [];
	    this.shapeModifiers = [];
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	}
	createElement(SVGBaseElement, IShapeElement);
	
	IShapeElement.prototype.lcEnum = {
	    '1': 'butt',
	    '2': 'round',
	    '3': 'butt'
	}
	
	IShapeElement.prototype.ljEnum = {
	    '1': 'miter',
	    '2': 'round',
	    '3': 'butt'
	}
	
	IShapeElement.prototype.buildExpressionInterface = function(){};
	
	IShapeElement.prototype.createElements = function(){
	    //TODO check if I can use symbol so i can set its viewBox
	    this._parent.createElements.call(this);
	    this.searchShapes(this.shapesData,this.viewData,this.layerElement,this.dynamicProperties, 0);
	    if(!this.data.hd || this.data.td){
	        styleUnselectableDiv(this.layerElement);
	    }
	    //this.elemInterface.registerShapeExpressionInterface(ShapeExpressionInterface.createShapeInterface(this.shapesData,this.viewData,this.elemInterface));
	};
	
	IShapeElement.prototype.setGradientData = function(pathElement,arr,data){
	
	    var gradientId = 'gr_'+randomString(10);
	    var gfill;
	    if(arr.t === 1){
	        gfill = document.createElementNS(svgNS,'linearGradient');
	    } else {
	        gfill = document.createElementNS(svgNS,'radialGradient');
	    }
	    gfill.setAttribute('id',gradientId);
	    gfill.setAttribute('spreadMethod','pad');
	    gfill.setAttribute('gradientUnits','userSpaceOnUse');
	    var stops = [];
	    var stop, j, jLen;
	    jLen = arr.g.p*4;
	    for(j=0;j<jLen;j+=4){
	        stop = document.createElementNS(svgNS,'stop');
	        gfill.appendChild(stop);
	        stops.push(stop);
	    }
	    pathElement.setAttribute( arr.ty === 'gf' ? 'fill':'stroke','url(#'+gradientId+')');
	    this.globalData.defs.appendChild(gfill);
	    data.gf = gfill;
	    data.cst = stops;
	}
	
	IShapeElement.prototype.setGradientOpacity = function(arr, data, styleOb){
	    if((arr.g.k.k[0].s && arr.g.k.k[0].s.length > arr.g.p*4) || arr.g.k.k.length > arr.g.p*4){
	        var opFill;
	        var stop, j, jLen;
	        var mask = document.createElementNS(svgNS,"mask");
	        var maskElement = document.createElementNS(svgNS, 'path');
	        mask.appendChild(maskElement);
	        var opacityId = 'op_'+randomString(10);
	        var maskId = 'mk_'+randomString(10);
	        mask.setAttribute('id',maskId);
	        if(arr.t === 1){
	            opFill = document.createElementNS(svgNS,'linearGradient');
	        } else {
	            opFill = document.createElementNS(svgNS,'radialGradient');
	        }
	        opFill.setAttribute('id',opacityId);
	        opFill.setAttribute('spreadMethod','pad');
	        opFill.setAttribute('gradientUnits','userSpaceOnUse');
	        jLen = arr.g.k.k[0].s ? arr.g.k.k[0].s.length : arr.g.k.k.length;
	        var stops = [];
	        for(j=arr.g.p*4;j<jLen;j+=2){
	            stop = document.createElementNS(svgNS,'stop');
	            stop.setAttribute('stop-color','rgb(255,255,255)');
	            //stop.setAttribute('offset',Math.round(arr.y[j][0]*100)+'%');
	            //stop.setAttribute('style','stop-color:rgb(255,255,255);stop-opacity:'+arr.y[j][1]);
	            opFill.appendChild(stop);
	            stops.push(stop);
	        }
	        maskElement.setAttribute( arr.ty === 'gf' ? 'fill':'stroke','url(#'+opacityId+')');
	        this.globalData.defs.appendChild(opFill);
	        this.globalData.defs.appendChild(mask);
	        data.of = opFill;
	        data.ost = stops;
	        styleOb.msElem = maskElement;
	        return maskId;
	    }
	};
	
	IShapeElement.prototype.searchShapes = function(arr,data,container,dynamicProperties, level, transformers){
	    transformers = transformers || [];
	    var ownTransformers = [].concat(transformers);
	    var i, len = arr.length - 1;
	    var j, jLen;
	    var ownArrays = [], ownModifiers = [], styleOb, currentTransform;
	    for(i=len;i>=0;i-=1){
	        if(arr[i].ty == 'fl' || arr[i].ty == 'st' || arr[i].ty == 'gf' || arr[i].ty == 'gs'){
	            data[i] = {};
	            styleOb = {
	                type: arr[i].ty,
	                d: '',
	                ld: '',
	                lvl: level,
	                mdf: false
	            };
	            var pathElement = document.createElementNS(svgNS, "path");
	            data[i].o = PropertyFactory.getProp(this,arr[i].o,0,0.01,dynamicProperties);
	            if(arr[i].ty == 'st' || arr[i].ty == 'gs') {
	                pathElement.setAttribute('stroke-linecap', this.lcEnum[arr[i].lc] || 'round');
	                ////pathElement.style.strokeLinecap = this.lcEnum[arr[i].lc] || 'round';
	                pathElement.setAttribute('stroke-linejoin',this.ljEnum[arr[i].lj] || 'round');
	                ////pathElement.style.strokeLinejoin = this.ljEnum[arr[i].lj] || 'round';
	                pathElement.setAttribute('fill-opacity','0');
	                ////pathElement.style.fillOpacity = 0;
	                if(arr[i].lj == 1) {
	                    pathElement.setAttribute('stroke-miterlimit',arr[i].ml);
	                    ////pathElement.style.strokeMiterlimit = arr[i].ml;
	                }
	
	                data[i].w = PropertyFactory.getProp(this,arr[i].w,0,null,dynamicProperties);
	                if(arr[i].d){
	                    var d = PropertyFactory.getDashProp(this,arr[i].d,'svg',dynamicProperties);
	                    if(!d.k){
	                        pathElement.setAttribute('stroke-dasharray', d.dasharray);
	                        ////pathElement.style.strokeDasharray = d.dasharray;
	                        pathElement.setAttribute('stroke-dashoffset', d.dashoffset);
	                        ////pathElement.style.strokeDashoffset = d.dashoffset;
	                    }
	                    data[i].d = d;
	                }
	
	            }
	            if(arr[i].ty == 'fl' || arr[i].ty == 'st'){
	                data[i].c = PropertyFactory.getProp(this,arr[i].c,1,255,dynamicProperties);
	                container.appendChild(pathElement);
	            } else {
	                data[i].g = PropertyFactory.getGradientProp(this,arr[i].g,dynamicProperties);
	                if(arr[i].t == 2){
	                    data[i].h = PropertyFactory.getProp(this,arr[i].h,1,0.01,dynamicProperties);
	                    data[i].a = PropertyFactory.getProp(this,arr[i].a,1,degToRads,dynamicProperties);
	                }
	                data[i].s = PropertyFactory.getProp(this,arr[i].s,1,null,dynamicProperties);
	                data[i].e = PropertyFactory.getProp(this,arr[i].e,1,null,dynamicProperties);
	                this.setGradientData(pathElement,arr[i],data[i], styleOb);
	                var maskId = this.setGradientOpacity(arr[i],data[i], styleOb);
	                if(maskId){
	                    pathElement.setAttribute('mask','url(#'+maskId+')');
	                }
	                data[i].elem = pathElement;
	                container.appendChild(pathElement);
	            }
	            if(arr[i].r === 2) {
	                pathElement.setAttribute('fill-rule', 'evenodd');
	            }
	
	            if(arr[i].ln){
	                pathElement.setAttribute('id',arr[i].ln);
	            }
	            if(arr[i].cl){
	                pathElement.setAttribute('class',arr[i].cl);
	            }
	            styleOb.pElem = pathElement;
	            this.stylesList.push(styleOb);
	            data[i].style = styleOb;
	            ownArrays.push(styleOb);
	        }else if(arr[i].ty == 'gr'){
	            data[i] = {
	                it: []
	            };
	            var g = document.createElementNS(svgNS,'g');
	            container.appendChild(g);
	            data[i].gr = g;
	            this.searchShapes(arr[i].it,data[i].it,g,dynamicProperties, level + 1, ownTransformers);
	        }else if(arr[i].ty == 'tr'){
	            data[i] = {
	                transform : {
	                    op: PropertyFactory.getProp(this,arr[i].o,0,0.01,dynamicProperties),
	                    mProps: PropertyFactory.getProp(this,arr[i],2,null,dynamicProperties)
	                },
	                elements: []
	            };
	            currentTransform = data[i].transform;
	            ownTransformers.push(currentTransform);
	        }else if(arr[i].ty == 'sh' || arr[i].ty == 'rc' || arr[i].ty == 'el' || arr[i].ty == 'sr'){
	            data[i] = {
	                elements : [],
	                caches:[],
	                styles : [],
	                transformers: ownTransformers,
	                lStr: ''
	            };
	            var ty = 4;
	            if(arr[i].ty == 'rc'){
	                ty = 5;
	            }else if(arr[i].ty == 'el'){
	                ty = 6;
	            }else if(arr[i].ty == 'sr'){
	                ty = 7;
	            }
	            data[i].sh = ShapePropertyFactory.getShapeProp(this,arr[i],ty,dynamicProperties);
	            data[i].lvl = level;
	            this.shapes.push(data[i].sh);
	            this.addShapeToModifiers(data[i]);
	            jLen = this.stylesList.length;
	            for(j=0;j<jLen;j+=1){
	                if(!this.stylesList[j].closed){
	                    data[i].elements.push({
	                        ty:this.stylesList[j].type,
	                        st: this.stylesList[j]
	                    });
	                }
	            }
	        }else if(arr[i].ty == 'tm' || arr[i].ty == 'rd' || arr[i].ty == 'ms' || arr[i].ty == 'rp'){
	            var modifier = ShapeModifiers.getModifier(arr[i].ty);
	            modifier.init(this,arr[i],dynamicProperties);
	            this.shapeModifiers.push(modifier);
	            ownModifiers.push(modifier);
	            data[i] = modifier;
	        }
	    }
	    len = ownArrays.length;
	    for(i=0;i<len;i+=1){
	        ownArrays[i].closed = true;
	    }
	    len = ownModifiers.length;
	    for(i=0;i<len;i+=1){
	        ownModifiers[i].closed = true;
	    }
	};
	
	IShapeElement.prototype.addShapeToModifiers = function(data) {
	    var i, len = this.shapeModifiers.length;
	    for(i=0;i<len;i+=1){
	        this.shapeModifiers[i].addShape(data);
	    }
	};
	
	IShapeElement.prototype.renderModifiers = function() {
	    if(!this.shapeModifiers.length){
	        return;
	    }
	    var i, len = this.shapes.length;
	    for(i=0;i<len;i+=1){
	        this.shapes[i].reset();
	    }
	
	
	    len = this.shapeModifiers.length;
	
	    for(i=len-1;i>=0;i-=1){
	        this.shapeModifiers[i].processShapes(this.firstFrame);
	    }
	};
	
	IShapeElement.prototype.renderFrame = function(parentMatrix){
	    var renderParent = this._parent.renderFrame.call(this,parentMatrix);
	    if(renderParent===false){
	        this.hide();
	        return;
	    }
	    this.globalToLocal([0,0,0]);
	    if(this.hidden){
	        this.layerElement.style.display = 'block';
	        this.hidden = false;
	    }
	    this.renderModifiers();
	    this.renderShape(null,null,true, null);
	};
	
	IShapeElement.prototype.hide = function(){
	    if(!this.hidden){
	        this.layerElement.style.display = 'none';
	        var i, len = this.stylesList.length;
	        for(i=len-1;i>=0;i-=1){
	            if(this.stylesList[i].ld !== '0'){
	                this.stylesList[i].ld = '0';
	                this.stylesList[i].pElem.style.display = 'none';
	                if(this.stylesList[i].pElem.parentNode){
	                    this.stylesList[i].parent = this.stylesList[i].pElem.parentNode;
	                    //this.stylesList[i].pElem.parentNode.removeChild(this.stylesList[i].pElem);
	                }
	            }
	        }
	        this.hidden = true;
	    }
	};
	
	IShapeElement.prototype.renderShape = function(items,data,isMain, container){
	    var i, len;
	    if(!items){
	        items = this.shapesData;
	        len = this.stylesList.length;
	        for(i=0;i<len;i+=1){
	            this.stylesList[i].d = '';
	            this.stylesList[i].mdf = false;
	        }
	    }
	    if(!data){
	        data = this.viewData;
	    }
	    ///
	    ///
	    len = items.length - 1;
	    var ty;
	    for(i=len;i>=0;i-=1){
	        ty = items[i].ty;
	        if(ty == 'tr'){
	            if(this.firstFrame || data[i].transform.op.mdf && container){
	                container.setAttribute('opacity',data[i].transform.op.v);
	            }
	            if(this.firstFrame || data[i].transform.mProps.mdf && container){
	                container.setAttribute('transform',data[i].transform.mProps.v.to2dCSS());
	            }
	        }else if(ty == 'sh' || ty == 'el' || ty == 'rc' || ty == 'sr'){
	            this.renderPath(items[i],data[i]);
	        }else if(ty == 'fl'){
	            this.renderFill(items[i],data[i]);
	        }else if(ty == 'gf'){
	            this.renderGradient(items[i],data[i]);
	        }else if(ty == 'gs'){
	            this.renderGradient(items[i],data[i]);
	            this.renderStroke(items[i],data[i]);
	        }else if(ty == 'st'){
	            this.renderStroke(items[i],data[i]);
	        }else if(ty == 'gr'){
	            this.renderShape(items[i].it,data[i].it,false, data[i].gr);
	        }else if(ty == 'tm'){
	            //
	        }
	    }
	    if(isMain) {
	        len = this.stylesList.length;
	        for (i = 0; i < len; i += 1) {
	            if (this.stylesList[i].ld === '0') {
	                this.stylesList[i].ld = '1';
	                this.stylesList[i].pElem.style.display = 'block';
	                //this.stylesList[i].parent.appendChild(this.stylesList[i].pElem);
	            }
	            if (this.stylesList[i].mdf || this.firstFrame) {
	                this.stylesList[i].pElem.setAttribute('d', this.stylesList[i].d);
	                if(this.stylesList[i].msElem){
	                    this.stylesList[i].msElem.setAttribute('d', this.stylesList[i].d);
	                }
	            }
	        }
	        if (this.firstFrame) {
	            this.firstFrame = false;
	        }
	    }
	
	};
	
	IShapeElement.prototype.renderPath = function(pathData,viewData){
	    var len, i, j, jLen,pathStringTransformed,redraw,pathNodes,l, lLen = viewData.elements.length;
	    var lvl = viewData.lvl;
	    for(l=0;l<lLen;l+=1){
	        redraw = viewData.sh.mdf || this.firstFrame;
	        pathStringTransformed = 'M0 0';
	        var paths = viewData.sh.paths;
	        jLen = paths._length;
	        if(viewData.elements[l].st.lvl < lvl){
	            var mat = this.mHelper.reset(), props;
	            var iterations = lvl - viewData.elements[l].st.lvl;
	            var k = viewData.transformers.length-1;
	            while(iterations > 0) {
	                redraw = viewData.transformers[k].mProps.mdf || redraw;
	                props = viewData.transformers[k].mProps.v.props;
	                mat.transform(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8],props[9],props[10],props[11],props[12],props[13],props[14],props[15]);
	                iterations --;
	                k --;
	            }
	            if(redraw){
	                for(j=0;j<jLen;j+=1){
	                    pathNodes = paths.shapes[j];
	                    if(pathNodes && pathNodes._length){
	                        len = pathNodes._length;
	                        for (i = 1; i < len; i += 1) {
	                            if (i == 1) {
	                                pathStringTransformed += " M" + mat.applyToPointStringified(pathNodes.v[0][0], pathNodes.v[0][1]);
	                            }
	                            pathStringTransformed += " C" + mat.applyToPointStringified(pathNodes.o[i - 1][0], pathNodes.o[i - 1][1]) + " " + mat.applyToPointStringified(pathNodes.i[i][0], pathNodes.i[i][1]) + " " + mat.applyToPointStringified(pathNodes.v[i][0], pathNodes.v[i][1]);
	                        }
	                        if (len == 1) {
	                            pathStringTransformed += " M" + mat.applyToPointStringified(pathNodes.v[0][0], pathNodes.v[0][1]);
	                        }
	                        if (pathNodes.c) {
	                            pathStringTransformed += " C" + mat.applyToPointStringified(pathNodes.o[i - 1][0], pathNodes.o[i - 1][1]) + " " + mat.applyToPointStringified(pathNodes.i[0][0], pathNodes.i[0][1]) + " " + mat.applyToPointStringified(pathNodes.v[0][0], pathNodes.v[0][1]);
	                            pathStringTransformed += 'z';
	                        }
	                    }
	                }
	                viewData.caches[l] = pathStringTransformed;
	            } else {
	                pathStringTransformed = viewData.caches[l];
	            }
	        } else {
	            if(redraw){
	                for(j=0;j<jLen;j+=1){
	                    pathNodes = paths.shapes[j];
	                    if(pathNodes && pathNodes._length){
	                        len = pathNodes._length;
	                        for (i = 1; i < len; i += 1) {
	                            if (i == 1) {
	                                //pathStringTransformed += " M" + groupTransform.mat.applyToPointStringified(pathNodes.v[0][0], pathNodes.v[0][1]);
	                                pathStringTransformed += " M" + pathNodes.v[0].join(',');
	                            }
	                            //pathStringTransformed += " C" + groupTransform.mat.applyToPointStringified(pathNodes.o[i - 1][0], pathNodes.o[i - 1][1]) + " " + groupTransform.mat.applyToPointStringified(pathNodes.i[i][0], pathNodes.i[i][1]) + " " + groupTransform.mat.applyToPointStringified(pathNodes.v[i][0], pathNodes.v[i][1]);
	                            pathStringTransformed += " C" + pathNodes.o[i - 1].join(',') + " " + pathNodes.i[i].join(',') + " " + pathNodes.v[i].join(',');
	                        }
	                        if (len == 1) {
	                            //pathStringTransformed += " M" + groupTransform.mat.applyToPointStringified(pathNodes.v[0][0], pathNodes.v[0][1]);
	                            pathStringTransformed += " M" + pathNodes.v[0].join(',');
	                        }
	                        if (pathNodes.c && len) {
	                            //pathStringTransformed += " C" + groupTransform.mat.applyToPointStringified(pathNodes.o[i - 1][0], pathNodes.o[i - 1][1]) + " " + groupTransform.mat.applyToPointStringified(pathNodes.i[0][0], pathNodes.i[0][1]) + " " + groupTransform.mat.applyToPointStringified(pathNodes.v[0][0], pathNodes.v[0][1]);
	                            pathStringTransformed += " C" + pathNodes.o[i - 1].join(',') + " " + pathNodes.i[0].join(',') + " " + pathNodes.v[0].join(',');
	                            pathStringTransformed += 'z';
	                        }
	                    }
	                }
	                viewData.caches[l] = pathStringTransformed;
	            } else {
	                pathStringTransformed = viewData.caches[l];
	            }
	        }
	        viewData.elements[l].st.d += pathStringTransformed;
	        viewData.elements[l].st.mdf = redraw || viewData.elements[l].st.mdf;
	    }
	
	};
	
	IShapeElement.prototype.renderFill = function(styleData,viewData){
	    var styleElem = viewData.style;
	
	    if(viewData.c.mdf || this.firstFrame){
	        styleElem.pElem.setAttribute('fill','rgb('+bm_floor(viewData.c.v[0])+','+bm_floor(viewData.c.v[1])+','+bm_floor(viewData.c.v[2])+')');
	        ////styleElem.pElem.style.fill = 'rgb('+bm_floor(viewData.c.v[0])+','+bm_floor(viewData.c.v[1])+','+bm_floor(viewData.c.v[2])+')';
	    }
	    if(viewData.o.mdf || this.firstFrame){
	        styleElem.pElem.setAttribute('fill-opacity',viewData.o.v);
	    }
	};
	
	IShapeElement.prototype.renderGradient = function(styleData,viewData){
	    var gfill = viewData.gf;
	    var opFill = viewData.of;
	    var pt1 = viewData.s.v,pt2 = viewData.e.v;
	
	    if(viewData.o.mdf || this.firstFrame){
	        var attr = styleData.ty === 'gf' ? 'fill-opacity':'stroke-opacity';
	        viewData.elem.setAttribute(attr,viewData.o.v);
	    }
	    //clippedElement.setAttribute('transform','matrix(1,0,0,1,-100,0)');
	    if(viewData.s.mdf || this.firstFrame){
	        var attr1 = styleData.t === 1 ? 'x1':'cx';
	        var attr2 = attr1 === 'x1' ? 'y1':'cy';
	        gfill.setAttribute(attr1,pt1[0]);
	        gfill.setAttribute(attr2,pt1[1]);
	        if(opFill){
	            opFill.setAttribute(attr1,pt1[0]);
	            opFill.setAttribute(attr2,pt1[1]);
	        }
	    }
	    var stops, i, len, stop;
	    if(viewData.g.cmdf || this.firstFrame){
	        stops = viewData.cst;
	        var cValues = viewData.g.c;
	        len = stops.length;
	        for(i=0;i<len;i+=1){
	            stop = stops[i];
	            stop.setAttribute('offset',cValues[i*4]+'%');
	            stop.setAttribute('stop-color','rgb('+cValues[i*4+1]+','+cValues[i*4+2]+','+cValues[i*4+3]+')');
	        }
	    }
	    if(opFill && (viewData.g.omdf || this.firstFrame)){
	        stops = viewData.ost;
	        var oValues = viewData.g.o;
	        len = stops.length;
	        for(i=0;i<len;i+=1){
	            stop = stops[i];
	            stop.setAttribute('offset',oValues[i*2]+'%');
	            stop.setAttribute('stop-opacity',oValues[i*2+1]);
	        }
	    }
	    if(styleData.t === 1){
	        if(viewData.e.mdf  || this.firstFrame){
	            gfill.setAttribute('x2',pt2[0]);
	            gfill.setAttribute('y2',pt2[1]);
	            if(opFill){
	                opFill.setAttribute('x2',pt2[0]);
	                opFill.setAttribute('y2',pt2[1]);
	            }
	        }
	    } else {
	        var rad;
	        if(viewData.s.mdf || viewData.e.mdf || this.firstFrame){
	            rad = Math.sqrt(Math.pow(pt1[0]-pt2[0],2)+Math.pow(pt1[1]-pt2[1],2));
	            gfill.setAttribute('r',rad);
	            if(opFill){
	                opFill.setAttribute('r',rad);
	            }
	        }
	        if(viewData.e.mdf || viewData.h.mdf || viewData.a.mdf || this.firstFrame){
	            if(!rad){
	                rad = Math.sqrt(Math.pow(pt1[0]-pt2[0],2)+Math.pow(pt1[1]-pt2[1],2));
	            }
	            var ang = Math.atan2(pt2[1]-pt1[1], pt2[0]-pt1[0]);
	
	            var percent = viewData.h.v >= 1 ? 0.99 : viewData.h.v <= -1 ? -0.99:viewData.h.v;
	            var dist = rad*percent;
	            var x = Math.cos(ang + viewData.a.v)*dist + pt1[0];
	            var y = Math.sin(ang + viewData.a.v)*dist + pt1[1];
	            gfill.setAttribute('fx',x);
	            gfill.setAttribute('fy',y);
	            if(opFill){
	                opFill.setAttribute('fx',x);
	                opFill.setAttribute('fy',y);
	            }
	        }
	        //gfill.setAttribute('fy','200');
	    }
	};
	
	IShapeElement.prototype.renderStroke = function(styleData,viewData){
	    var styleElem = viewData.style;
	    //TODO fix dashes
	    var d = viewData.d;
	    var dasharray,dashoffset;
	    if(d && d.k && (d.mdf || this.firstFrame)){
	        styleElem.pElem.setAttribute('stroke-dasharray', d.dasharray);
	        ////styleElem.pElem.style.strokeDasharray = d.dasharray;
	        styleElem.pElem.setAttribute('stroke-dashoffset', d.dashoffset);
	        ////styleElem.pElem.style.strokeDashoffset = d.dashoffset;
	    }
	    if(viewData.c && (viewData.c.mdf || this.firstFrame)){
	        styleElem.pElem.setAttribute('stroke','rgb('+bm_floor(viewData.c.v[0])+','+bm_floor(viewData.c.v[1])+','+bm_floor(viewData.c.v[2])+')');
	        ////styleElem.pElem.style.stroke = 'rgb('+bm_floor(viewData.c.v[0])+','+bm_floor(viewData.c.v[1])+','+bm_floor(viewData.c.v[2])+')';
	    }
	    if(viewData.o.mdf || this.firstFrame){
	        styleElem.pElem.setAttribute('stroke-opacity',viewData.o.v);
	    }
	    if(viewData.w.mdf || this.firstFrame){
	        styleElem.pElem.setAttribute('stroke-width',viewData.w.v);
	        if(styleElem.msElem){
	            styleElem.msElem.setAttribute('stroke-width',viewData.w.v);
	        }
	        ////styleElem.pElem.style.strokeWidth = viewData.w.v;
	    }
	};
	
	IShapeElement.prototype.destroy = function(){
	    this._parent.destroy.call(this._parent);
	    this.shapeData = null;
	    this.viewData = null;
	    this.parentContainer = null;
	    this.placeholder = null;
	};
	
	function ISolidElement(data,parentContainer,globalData,comp, placeholder){
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	}
	createElement(SVGBaseElement, ISolidElement);
	
	ISolidElement.prototype.createElements = function(){
	    this._parent.createElements.call(this);
	
	    var rect = document.createElementNS(svgNS,'rect');
	    ////rect.style.width = this.data.sw;
	    ////rect.style.height = this.data.sh;
	    ////rect.style.fill = this.data.sc;
	    rect.setAttribute('width',this.data.sw);
	    rect.setAttribute('height',this.data.sh);
	    rect.setAttribute('fill',this.data.sc);
	    this.layerElement.appendChild(rect);
	    this.innerElem = rect;
	    if(this.data.ln){
	        this.layerElement.setAttribute('id',this.data.ln);
	    }
	    if(this.data.cl){
	        this.layerElement.setAttribute('class',this.data.cl);
	    }
	};
	
	ISolidElement.prototype.hide = IImageElement.prototype.hide;
	ISolidElement.prototype.renderFrame = IImageElement.prototype.renderFrame;
	ISolidElement.prototype.destroy = IImageElement.prototype.destroy;
	
	var animationManager = (function(){
	    var moduleOb = {};
	    var registeredAnimations = [];
	    var initTime = 0;
	    var len = 0;
	    var idled = true;
	    var playingAnimationsNum = 0;
	
	    function removeElement(ev){
	        var i = 0;
	        var animItem = ev.target;
	        while(i<len) {
	            if (registeredAnimations[i].animation === animItem) {
	                registeredAnimations.splice(i, 1);
	                i -= 1;
	                len -= 1;
	                if(!animItem.isPaused){
	                    subtractPlayingCount();   
	                }
	            }
	            i += 1;
	        }
	    }
	
	    function registerAnimation(element, animationData){
	        if(!element){
	            return null;
	        }
	        var i=0;
	        while(i<len){
	            if(registeredAnimations[i].elem == element && registeredAnimations[i].elem !== null ){
	                return registeredAnimations[i].animation;
	            }
	            i+=1;
	        }
	        var animItem = new AnimationItem();
	        setupAnimation(animItem, element);
	        animItem.setData(element, animationData);
	        return animItem;
	    }
	
	    function addPlayingCount(){
	        playingAnimationsNum += 1;
	        activate();
	    }
	
	    function subtractPlayingCount(){
	        playingAnimationsNum -= 1;
	        if(playingAnimationsNum === 0){
	            idled = true;
	        }
	    }
	
	    function setupAnimation(animItem, element){
	        animItem.addEventListener('destroy',removeElement);
	        animItem.addEventListener('_active',addPlayingCount);
	        animItem.addEventListener('_idle',subtractPlayingCount);
	        registeredAnimations.push({elem: element,animation:animItem});
	        len += 1;
	    }
	
	    function loadAnimation(params){
	        var animItem = new AnimationItem();
	        setupAnimation(animItem, null);
	        animItem.setParams(params);
	        return animItem;
	    }
	
	
	    function setSpeed(val,animation){
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.setSpeed(val, animation);
	        }
	    }
	
	    function setDirection(val, animation){
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.setDirection(val, animation);
	        }
	    }
	
	    function play(animation){
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.play(animation);
	        }
	    }
	
	    function moveFrame (value, animation) {
	        initTime = Date.now();
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.moveFrame(value,animation);
	        }
	    }
	
	    function resume(nowTime) {
	
	        var elapsedTime = nowTime - initTime;
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.advanceTime(elapsedTime);
	        }
	        initTime = nowTime;
	        if(!idled) {
	            requestAnimationFrame(resume);
	        }
	    }
	
	    function first(nowTime){
	        initTime = nowTime;
	        requestAnimationFrame(resume);
	    }
	
	    function pause(animation) {
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.pause(animation);
	        }
	    }
	
	    function goToAndStop(value,isFrame,animation) {
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.goToAndStop(value,isFrame,animation);
	        }
	    }
	
	    function stop(animation) {
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.stop(animation);
	        }
	    }
	
	    function togglePause(animation) {
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.togglePause(animation);
	        }
	    }
	
	    function destroy(animation) {
	        var i;
	        for(i=(len-1);i>=0;i-=1){
	            registeredAnimations[i].animation.destroy(animation);
	        }
	    }
	
	    function searchAnimations(animationData, standalone, renderer){
	        var animElements = document.getElementsByClassName('bodymovin');
	        var i, len = animElements.length;
	        for(i=0;i<len;i+=1){
	            if(renderer){
	                animElements[i].setAttribute('data-bm-type',renderer);
	            }
	            registerAnimation(animElements[i], animationData);
	        }
	        if(standalone && len === 0){
	            if(!renderer){
	                renderer = 'svg';
	            }
	            var body = document.getElementsByTagName('body')[0];
	            body.innerHTML = '';
	            var div = document.createElement('div');
	            div.style.width = '100%';
	            div.style.height = '100%';
	            div.setAttribute('data-bm-type',renderer);
	            body.appendChild(div);
	            registerAnimation(div, animationData);
	        }
	    }
	
	    function resize(){
	        var i;
	        for(i=0;i<len;i+=1){
	            registeredAnimations[i].animation.resize();
	        }
	    }
	
	    function start(){
	        requestAnimationFrame(first);
	    }
	
	    function activate(){
	        if(idled){
	            idled = false;
	            requestAnimationFrame(first);
	        }
	    }
	
	    //start();
	
	    setTimeout(start,0);
	
	    moduleOb.registerAnimation = registerAnimation;
	    moduleOb.loadAnimation = loadAnimation;
	    moduleOb.setSpeed = setSpeed;
	    moduleOb.setDirection = setDirection;
	    moduleOb.play = play;
	    moduleOb.moveFrame = moveFrame;
	    moduleOb.pause = pause;
	    moduleOb.stop = stop;
	    moduleOb.togglePause = togglePause;
	    moduleOb.searchAnimations = searchAnimations;
	    moduleOb.resize = resize;
	    moduleOb.start = start;
	    moduleOb.goToAndStop = goToAndStop;
	    moduleOb.destroy = destroy;
	    return moduleOb;
	}());
	var AnimationItem = function () {
	    this._cbs = [];
	    this.name = '';
	    this.path = '';
	    this.isLoaded = false;
	    this.currentFrame = 0;
	    this.currentRawFrame = 0;
	    this.totalFrames = 0;
	    this.frameRate = 0;
	    this.frameMult = 0;
	    this.playSpeed = 1;
	    this.playDirection = 1;
	    this.pendingElements = 0;
	    this.playCount = 0;
	    this.prerenderFramesFlag = true;
	    this.animationData = {};
	    this.layers = [];
	    this.assets = [];
	    this.isPaused = true;
	    this.autoplay = false;
	    this.loop = true;
	    this.renderer = null;
	    this.animationID = randomString(10);
	    this.scaleMode = 'fit';
	    this.assetsPath = '';
	    this.timeCompleted = 0;
	    this.segmentPos = 0;
	    this.subframeEnabled = subframeEnabled;
	    this.segments = [];
	    this.pendingSegment = false;
	    this._idle = true;
	    this.projectInterface = ProjectInterface();
	};
	
	AnimationItem.prototype.setParams = function(params) {
	    var self = this;
	    if(params.context){
	        this.context = params.context;
	    }
	    if(params.wrapper || params.container){
	        this.wrapper = params.wrapper || params.container;
	    }
	    var animType = params.animType ? params.animType : params.renderer ? params.renderer : 'svg';
	    switch(animType){
	        case 'canvas':
	            this.renderer = new CanvasRenderer(this, params.rendererSettings);
	            break;
	        case 'svg':
	            this.renderer = new SVGRenderer(this, params.rendererSettings);
	            break;
	        case 'hybrid':
	        case 'html':
	        default:
	            this.renderer = new HybridRenderer(this, params.rendererSettings);
	            break;
	    }
	    this.renderer.setProjectInterface(this.projectInterface);
	    this.animType = animType;
	
	    if(params.loop === '' || params.loop === null){
	    }else if(params.loop === false){
	        this.loop = false;
	    }else if(params.loop === true){
	        this.loop = true;
	    }else{
	        this.loop = parseInt(params.loop);
	    }
	    this.autoplay = 'autoplay' in params ? params.autoplay : true;
	    this.name = params.name ? params.name :  '';
	    this.prerenderFramesFlag = 'prerender' in params ? params.prerender : true;
	    this.autoloadSegments = params.hasOwnProperty('autoloadSegments') ? params.autoloadSegments :  true;
	    if(params.animationData){
	        self.configAnimation(params.animationData);
	    }else if(params.path){
	        if(params.path.substr(-4) != 'json'){
	            if (params.path.substr(-1, 1) != '/') {
	                params.path += '/';
	            }
	            params.path += 'data.json';
	        }
	
	        var xhr = new XMLHttpRequest();
	        if(params.path.lastIndexOf('\\') != -1){
	            this.path = params.path.substr(0,params.path.lastIndexOf('\\')+1);
	        }else{
	            this.path = params.path.substr(0,params.path.lastIndexOf('/')+1);
	        }
	        this.assetsPath = params.assetsPath;
	        this.fileName = params.path.substr(params.path.lastIndexOf('/')+1);
	        this.fileName = this.fileName.substr(0,this.fileName.lastIndexOf('.json'));
	        xhr.open('GET', params.path, true);
	        xhr.send();
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState == 4) {
	                if(xhr.status == 200){
	                    self.configAnimation(JSON.parse(xhr.responseText));
	                }else{
	                    try{
	                        var response = JSON.parse(xhr.responseText);
	                        self.configAnimation(response);
	                    }catch(err){
	                    }
	                }
	            }
	        };
	    }
	};
	
	AnimationItem.prototype.setData = function (wrapper, animationData) {
	    var params = {
	        wrapper: wrapper,
	        animationData: animationData ? (typeof animationData  === "object") ? animationData : JSON.parse(animationData) : null
	    };
	    var wrapperAttributes = wrapper.attributes;
	
	    params.path = wrapperAttributes.getNamedItem('data-animation-path') ? wrapperAttributes.getNamedItem('data-animation-path').value : wrapperAttributes.getNamedItem('data-bm-path') ? wrapperAttributes.getNamedItem('data-bm-path').value :  wrapperAttributes.getNamedItem('bm-path') ? wrapperAttributes.getNamedItem('bm-path').value : '';
	    params.animType = wrapperAttributes.getNamedItem('data-anim-type') ? wrapperAttributes.getNamedItem('data-anim-type').value : wrapperAttributes.getNamedItem('data-bm-type') ? wrapperAttributes.getNamedItem('data-bm-type').value : wrapperAttributes.getNamedItem('bm-type') ? wrapperAttributes.getNamedItem('bm-type').value :  wrapperAttributes.getNamedItem('data-bm-renderer') ? wrapperAttributes.getNamedItem('data-bm-renderer').value : wrapperAttributes.getNamedItem('bm-renderer') ? wrapperAttributes.getNamedItem('bm-renderer').value : 'canvas';
	
	    var loop = wrapperAttributes.getNamedItem('data-anim-loop') ? wrapperAttributes.getNamedItem('data-anim-loop').value :  wrapperAttributes.getNamedItem('data-bm-loop') ? wrapperAttributes.getNamedItem('data-bm-loop').value :  wrapperAttributes.getNamedItem('bm-loop') ? wrapperAttributes.getNamedItem('bm-loop').value : '';
	    if(loop === ''){
	    }else if(loop === 'false'){
	        params.loop = false;
	    }else if(loop === 'true'){
	        params.loop = true;
	    }else{
	        params.loop = parseInt(loop);
	    }
	    var autoplay = wrapperAttributes.getNamedItem('data-anim-autoplay') ? wrapperAttributes.getNamedItem('data-anim-autoplay').value :  wrapperAttributes.getNamedItem('data-bm-autoplay') ? wrapperAttributes.getNamedItem('data-bm-autoplay').value :  wrapperAttributes.getNamedItem('bm-autoplay') ? wrapperAttributes.getNamedItem('bm-autoplay').value : true;
	    params.autoplay = autoplay !== "false";
	
	    params.name = wrapperAttributes.getNamedItem('data-name') ? wrapperAttributes.getNamedItem('data-name').value :  wrapperAttributes.getNamedItem('data-bm-name') ? wrapperAttributes.getNamedItem('data-bm-name').value : wrapperAttributes.getNamedItem('bm-name') ? wrapperAttributes.getNamedItem('bm-name').value :  '';
	    var prerender = wrapperAttributes.getNamedItem('data-anim-prerender') ? wrapperAttributes.getNamedItem('data-anim-prerender').value :  wrapperAttributes.getNamedItem('data-bm-prerender') ? wrapperAttributes.getNamedItem('data-bm-prerender').value :  wrapperAttributes.getNamedItem('bm-prerender') ? wrapperAttributes.getNamedItem('bm-prerender').value : '';
	
	    if(prerender === 'false'){
	        params.prerender = false;
	    }
	    this.setParams(params);
	};
	
	AnimationItem.prototype.includeLayers = function(data) {
	    if(data.op > this.animationData.op){
	        this.animationData.op = data.op;
	        this.totalFrames = Math.floor(data.op - this.animationData.ip);
	        this.animationData.tf = this.totalFrames;
	    }
	    var layers = this.animationData.layers;
	    var i, len = layers.length;
	    var newLayers = data.layers;
	    var j, jLen = newLayers.length;
	    for(j=0;j<jLen;j+=1){
	        i = 0;
	        while(i<len){
	            if(layers[i].id == newLayers[j].id){
	                layers[i] = newLayers[j];
	                break;
	            }
	            i += 1;
	        }
	    }
	    if(data.chars || data.fonts){
	        this.renderer.globalData.fontManager.addChars(data.chars);
	        this.renderer.globalData.fontManager.addFonts(data.fonts, this.renderer.globalData.defs);
	    }
	    if(data.assets){
	        len = data.assets.length;
	        for(i = 0; i < len; i += 1){
	            this.animationData.assets.push(data.assets[i]);
	        }
	    }
	    //this.totalFrames = 50;
	    //this.animationData.tf = 50;
	    this.animationData.__complete = false;
	    dataManager.completeData(this.animationData,this.renderer.globalData.fontManager);
	    this.renderer.includeLayers(data.layers);
	    if(expressionsPlugin){
	        expressionsPlugin.initExpressions(this);
	    }
	    this.renderer.renderFrame(null);
	    this.loadNextSegment();
	};
	
	AnimationItem.prototype.loadNextSegment = function() {
	    var segments = this.animationData.segments;
	    if(!segments || segments.length === 0 || !this.autoloadSegments){
	        this.trigger('data_ready');
	        this.timeCompleted = this.animationData.tf;
	        return;
	    }
	    var segment = segments.shift();
	    this.timeCompleted = segment.time * this.frameRate;
	    var xhr = new XMLHttpRequest();
	    var self = this;
	    var segmentPath = this.path+this.fileName+'_' + this.segmentPos + '.json';
	    this.segmentPos += 1;
	    xhr.open('GET', segmentPath, true);
	    xhr.send();
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	            if(xhr.status == 200){
	                self.includeLayers(JSON.parse(xhr.responseText));
	            }else{
	                try{
	                    var response = JSON.parse(xhr.responseText);
	                    self.includeLayers(response);
	                }catch(err){
	                }
	            }
	        }
	    };
	};
	
	AnimationItem.prototype.loadSegments = function() {
	    var segments = this.animationData.segments;
	    if(!segments) {
	        this.timeCompleted = this.animationData.tf;
	    }
	    this.loadNextSegment();
	};
	
	AnimationItem.prototype.configAnimation = function (animData) {
	    if(this.renderer && this.renderer.destroyed){
	        return;
	    }
	    //console.log(JSON.parse(JSON.stringify(animData)));
	    //animData.w = Math.round(animData.w/blitter);
	    //animData.h = Math.round(animData.h/blitter);
	    this.animationData = animData;
	    this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip);
	    this.animationData.tf = this.totalFrames;
	    this.renderer.configAnimation(animData);
	    if(!animData.assets){
	        animData.assets = [];
	    }
	    if(animData.comps) {
	        animData.assets = animData.assets.concat(animData.comps);
	        animData.comps = null;
	    }
	    this.renderer.searchExtraCompositions(animData.assets);
	
	    this.layers = this.animationData.layers;
	    this.assets = this.animationData.assets;
	    this.frameRate = this.animationData.fr;
	    this.firstFrame = Math.round(this.animationData.ip);
	    this.frameMult = this.animationData.fr / 1000;
	    this.trigger('config_ready');
	    this.imagePreloader = new ImagePreloader();
	    this.imagePreloader.setAssetsPath(this.assetsPath);
	    this.imagePreloader.setPath(this.path);
	    this.imagePreloader.loadAssets(animData.assets);
	    this.loadSegments();
	    this.updaFrameModifier();
	    if(this.renderer.globalData.fontManager){
	        this.waitForFontsLoaded();
	    }else{
	        dataManager.completeData(this.animationData,this.renderer.globalData.fontManager);
	        this.checkLoaded();
	    }
	};
	
	AnimationItem.prototype.waitForFontsLoaded = (function(){
	    function checkFontsLoaded(){
	        if(this.renderer.globalData.fontManager.loaded){
	            dataManager.completeData(this.animationData,this.renderer.globalData.fontManager);
	            //this.renderer.buildItems(this.animationData.layers);
	            this.checkLoaded();
	        }else{
	            setTimeout(checkFontsLoaded.bind(this),20);
	        }
	    }
	
	    return function(){
	        checkFontsLoaded.bind(this)();
	    }
	}());
	
	AnimationItem.prototype.addPendingElement = function () {
	    this.pendingElements += 1;
	}
	
	AnimationItem.prototype.elementLoaded = function () {
	    this.pendingElements--;
	    this.checkLoaded();
	};
	
	AnimationItem.prototype.checkLoaded = function () {
	    if (this.pendingElements === 0) {
	        if(expressionsPlugin){
	            expressionsPlugin.initExpressions(this);
	        }
	        this.renderer.initItems();
	        setTimeout(function(){
	            this.trigger('DOMLoaded');
	        }.bind(this),0);
	        this.isLoaded = true;
	        this.gotoFrame();
	        if(this.autoplay){
	            this.play();
	        }
	    }
	};
	
	AnimationItem.prototype.resize = function () {
	    this.renderer.updateContainerSize();
	};
	
	AnimationItem.prototype.setSubframe = function(flag){
	    this.subframeEnabled = flag ? true : false;
	}
	
	AnimationItem.prototype.gotoFrame = function () {
	    if(this.subframeEnabled){
	        this.currentFrame = this.currentRawFrame;
	    }else{
	        this.currentFrame = Math.floor(this.currentRawFrame);
	    }
	
	    if(this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted){
	        this.currentFrame = this.timeCompleted;
	    }
	    this.trigger('enterFrame');
	    this.renderFrame();
	};
	
	AnimationItem.prototype.renderFrame = function () {
	    if(this.isLoaded === false){
	        return;
	    }
	    //console.log('this.currentFrame:',this.currentFrame + this.firstFrame);
	    this.renderer.renderFrame(this.currentFrame + this.firstFrame);
	};
	
	AnimationItem.prototype.play = function (name) {
	    if(name && this.name != name){
	        return;
	    }
	    if(this.isPaused === true){
	        this.isPaused = false;
	        if(this._idle){
	            this._idle = false;
	            this.trigger('_active');
	        }
	    }
	};
	
	AnimationItem.prototype.pause = function (name) {
	    if(name && this.name != name){
	        return;
	    }
	    if(this.isPaused === false){
	        this.isPaused = true;
	        if(!this.pendingSegment){
	            this._idle = true;
	            this.trigger('_idle');
	        }
	    }
	};
	
	AnimationItem.prototype.togglePause = function (name) {
	    if(name && this.name != name){
	        return;
	    }
	    if(this.isPaused === true){
	        this.play();
	    }else{
	        this.pause();
	    }
	};
	
	AnimationItem.prototype.stop = function (name) {
	    if(name && this.name != name){
	        return;
	    }
	    this.pause();
	    this.currentFrame = this.currentRawFrame = 0;
	    this.playCount = 0;
	    this.gotoFrame();
	};
	
	AnimationItem.prototype.goToAndStop = function (value, isFrame, name) {
	    if(name && this.name != name){
	        return;
	    }
	    if(isFrame){
	        this.setCurrentRawFrameValue(value);
	    }else{
	        this.setCurrentRawFrameValue(value * this.frameModifier);
	    }
	    this.pause();
	};
	
	AnimationItem.prototype.goToAndPlay = function (value, isFrame, name) {
	    this.goToAndStop(value, isFrame, name);
	    this.play();
	};
	
	AnimationItem.prototype.advanceTime = function (value) {
	    if(this.pendingSegment){
	        this.pendingSegment = false;
	        this.adjustSegment(this.segments.shift());
	        if(this.isPaused){
	            this.play();
	        }
	        return;
	    }
	    if (this.isPaused === true || this.isLoaded === false) {
	        return;
	    }
	    this.setCurrentRawFrameValue(this.currentRawFrame + value * this.frameModifier);
	};
	
	AnimationItem.prototype.updateAnimation = function (perc) {
	    this.setCurrentRawFrameValue(this.totalFrames * perc);
	};
	
	AnimationItem.prototype.moveFrame = function (value, name) {
	    if(name && this.name != name){
	        return;
	    }
	    this.setCurrentRawFrameValue(this.currentRawFrame+value);
	};
	
	AnimationItem.prototype.adjustSegment = function(arr){
	    this.playCount = 0;
	    if(arr[1] < arr[0]){
	        if(this.frameModifier > 0){
	            if(this.playSpeed < 0){
	                this.setSpeed(-this.playSpeed);
	            } else {
	                this.setDirection(-1);
	            }
	        }
	        this.totalFrames = arr[0] - arr[1];
	        this.firstFrame = arr[1];
	        this.setCurrentRawFrameValue(this.totalFrames - 0.01);
	    } else if(arr[1] > arr[0]){
	        if(this.frameModifier < 0){
	            if(this.playSpeed < 0){
	                this.setSpeed(-this.playSpeed);
	            } else {
	                this.setDirection(1);
	            }
	        }
	        this.totalFrames = arr[1] - arr[0];
	        this.firstFrame = arr[0];
	        this.setCurrentRawFrameValue(0);
	    }
	    this.trigger('segmentStart');
	};
	AnimationItem.prototype.setSegment = function (init,end) {
	    var pendingFrame = -1;
	    if(this.isPaused) {
	        if (this.currentRawFrame + this.firstFrame < init) {
	            pendingFrame = init;
	        } else if (this.currentRawFrame + this.firstFrame > end) {
	            pendingFrame = end - init - 0.01;
	        }
	    }
	
	    this.firstFrame = init;
	    this.totalFrames = end - init;
	    if(pendingFrame !== -1) {
	        this.goToAndStop(pendingFrame,true);
	    }
	}
	
	AnimationItem.prototype.playSegments = function (arr,forceFlag) {
	    if(typeof arr[0] === 'object'){
	        var i, len = arr.length;
	        for(i=0;i<len;i+=1){
	            this.segments.push(arr[i]);
	        }
	    }else{
	        this.segments.push(arr);
	    }
	    if(forceFlag){
	        this.adjustSegment(this.segments.shift());
	    }
	    if(this.isPaused){
	        this.play();
	    }
	};
	
	AnimationItem.prototype.resetSegments = function (forceFlag) {
	    this.segments.length = 0;
	    this.segments.push([this.animationData.ip*this.frameRate,Math.floor(this.animationData.op - this.animationData.ip+this.animationData.ip*this.frameRate)]);
	    if(forceFlag){
	        this.adjustSegment(this.segments.shift());
	    }
	};
	AnimationItem.prototype.checkSegments = function(){
	    if(this.segments.length){
	        this.pendingSegment = true;
	    }
	}
	
	AnimationItem.prototype.remove = function (name) {
	    if(name && this.name != name){
	        return;
	    }
	    this.renderer.destroy();
	};
	
	AnimationItem.prototype.destroy = function (name) {
	    if((name && this.name != name) || (this.renderer && this.renderer.destroyed)){
	        return;
	    }
	    this.renderer.destroy();
	    this.trigger('destroy');
	    this._cbs = null;
	    this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null;
	};
	
	AnimationItem.prototype.setCurrentRawFrameValue = function(value){
	    this.currentRawFrame = value;
	    //console.log(this.totalFrames);
	    if (this.currentRawFrame >= this.totalFrames) {
	        this.checkSegments();
	        if(this.loop === false){
	            this.currentRawFrame = this.totalFrames - 0.01;
	            this.gotoFrame();
	            this.pause();
	            this.trigger('complete');
	            return;
	        }else{
	            this.trigger('loopComplete');
	            this.playCount += 1;
	            if((this.loop !== true && this.playCount == this.loop) || this.pendingSegment){
	                this.currentRawFrame = this.totalFrames - 0.01;
	                this.gotoFrame();
	                this.pause();
	                this.trigger('complete');
	                return;
	            } else {
	                this.currentRawFrame = this.currentRawFrame % this.totalFrames;
	            }
	        }
	    } else if (this.currentRawFrame < 0) {
	        this.checkSegments();
	        this.playCount -= 1;
	        if(this.playCount < 0){
	            this.playCount = 0;
	        }
	        if(this.loop === false  || this.pendingSegment){
	            this.currentRawFrame = 0;
	            this.gotoFrame();
	            this.pause();
	            this.trigger('complete');
	            return;
	        }else{
	            this.trigger('loopComplete');
	            this.currentRawFrame = (this.totalFrames + this.currentRawFrame) % this.totalFrames;
	            this.gotoFrame();
	            return;
	        }
	    }
	
	    this.gotoFrame();
	};
	
	AnimationItem.prototype.setSpeed = function (val) {
	    this.playSpeed = val;
	    this.updaFrameModifier();
	};
	
	AnimationItem.prototype.setDirection = function (val) {
	    this.playDirection = val < 0 ? -1 : 1;
	    this.updaFrameModifier();
	};
	
	AnimationItem.prototype.updaFrameModifier = function () {
	    this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
	};
	
	AnimationItem.prototype.getPath = function () {
	    return this.path;
	};
	
	AnimationItem.prototype.getAssetsPath = function (assetData) {
	    var path = '';
	    if(this.assetsPath){
	        var imagePath = assetData.p;
	        if(imagePath.indexOf('images/') !== -1){
	            imagePath = imagePath.split('/')[1];
	        }
	        path = this.assetsPath + imagePath;
	    } else {
	        path = this.path;
	        path += assetData.u ? assetData.u : '';
	        path += assetData.p;
	    }
	    return path;
	};
	
	AnimationItem.prototype.getAssetData = function (id) {
	    var i = 0, len = this.assets.length;
	    while (i < len) {
	        if(id == this.assets[i].id){
	            return this.assets[i];
	        }
	        i += 1;
	    }
	};
	
	AnimationItem.prototype.hide = function () {
	    this.renderer.hide();
	};
	
	AnimationItem.prototype.show = function () {
	    this.renderer.show();
	};
	
	AnimationItem.prototype.getAssets = function () {
	    return this.assets;
	};
	
	AnimationItem.prototype.trigger = function(name){
	    if(this._cbs && this._cbs[name]){
	        switch(name){
	            case 'enterFrame':
	                this.triggerEvent(name,new BMEnterFrameEvent(name,this.currentFrame,this.totalFrames,this.frameMult));
	                break;
	            case 'loopComplete':
	                this.triggerEvent(name,new BMCompleteLoopEvent(name,this.loop,this.playCount,this.frameMult));
	                break;
	            case 'complete':
	                this.triggerEvent(name,new BMCompleteEvent(name,this.frameMult));
	                break;
	            case 'segmentStart':
	                this.triggerEvent(name,new BMSegmentStartEvent(name,this.firstFrame,this.totalFrames));
	                break;
	            case 'destroy':
	                this.triggerEvent(name,new BMDestroyEvent(name,this));
	                break;
	            default:
	                this.triggerEvent(name);
	        }
	    }
	    if(name === 'enterFrame' && this.onEnterFrame){
	        this.onEnterFrame.call(this,new BMEnterFrameEvent(name,this.currentFrame,this.totalFrames,this.frameMult));
	    }
	    if(name === 'loopComplete' && this.onLoopComplete){
	        this.onLoopComplete.call(this,new BMCompleteLoopEvent(name,this.loop,this.playCount,this.frameMult));
	    }
	    if(name === 'complete' && this.onComplete){
	        this.onComplete.call(this,new BMCompleteEvent(name,this.frameMult));
	    }
	    if(name === 'segmentStart' && this.onSegmentStart){
	        this.onSegmentStart.call(this,new BMSegmentStartEvent(name,this.firstFrame,this.totalFrames));
	    }
	    if(name === 'destroy' && this.onDestroy){
	        this.onDestroy.call(this,new BMDestroyEvent(name,this));
	    }
	};
	
	AnimationItem.prototype.addEventListener = _addEventListener;
	AnimationItem.prototype.removeEventListener = _removeEventListener;
	AnimationItem.prototype.triggerEvent = _triggerEvent;
	
	function CanvasRenderer(animationItem, config){
	    this.animationItem = animationItem;
	    this.renderConfig = {
	        clearCanvas: (config && config.clearCanvas !== undefined) ? config.clearCanvas : true,
	        context: (config && config.context) || null,
	        progressiveLoad: (config && config.progressiveLoad) || false,
	        preserveAspectRatio: (config && config.preserveAspectRatio) || 'xMidYMid meet'
	    };
	    this.renderConfig.dpr = (config && config.dpr) || 1;
	    if (this.animationItem.wrapper) {
	        this.renderConfig.dpr = (config && config.dpr) || window.devicePixelRatio || 1;
	    }
	    this.renderedFrame = -1;
	    this.globalData = {
	        frameNum: -1
	    };
	    this.contextData = {
	        saved : Array.apply(null,{length:15}),
	        savedOp: Array.apply(null,{length:15}),
	        cArrPos : 0,
	        cTr : new Matrix(),
	        cO : 1
	    };
	    var i, len = 15;
	    for(i=0;i<len;i+=1){
	        this.contextData.saved[i] = Array.apply(null,{length:16});
	    }
	    this.elements = [];
	    this.pendingElements = [];
	    this.transformMat = new Matrix();
	    this.completeLayers = false;
	}
	extendPrototype(BaseRenderer,CanvasRenderer);
	
	CanvasRenderer.prototype.createBase = function (data) {
	    return new CVBaseElement(data, this, this.globalData);
	};
	
	CanvasRenderer.prototype.createShape = function (data) {
	    return new CVShapeElement(data, this, this.globalData);
	};
	
	CanvasRenderer.prototype.createText = function (data) {
	    return new CVTextElement(data, this, this.globalData);
	};
	
	CanvasRenderer.prototype.createImage = function (data) {
	    return new CVImageElement(data, this, this.globalData);
	};
	
	CanvasRenderer.prototype.createComp = function (data) {
	    return new CVCompElement(data, this, this.globalData);
	};
	
	CanvasRenderer.prototype.createSolid = function (data) {
	    return new CVSolidElement(data, this, this.globalData);
	};
	
	CanvasRenderer.prototype.ctxTransform = function(props){
	    if(props[0] === 1 && props[1] === 0 && props[4] === 0 && props[5] === 1 && props[12] === 0 && props[13] === 0){
	        return;
	    }
	    if(!this.renderConfig.clearCanvas){
	        this.canvasContext.transform(props[0],props[1],props[4],props[5],props[12],props[13]);
	        return;
	    }
	    this.transformMat.cloneFromProps(props);
	    this.transformMat.transform(this.contextData.cTr.props[0],this.contextData.cTr.props[1],this.contextData.cTr.props[2],this.contextData.cTr.props[3],this.contextData.cTr.props[4],this.contextData.cTr.props[5],this.contextData.cTr.props[6],this.contextData.cTr.props[7],this.contextData.cTr.props[8],this.contextData.cTr.props[9],this.contextData.cTr.props[10],this.contextData.cTr.props[11],this.contextData.cTr.props[12],this.contextData.cTr.props[13],this.contextData.cTr.props[14],this.contextData.cTr.props[15])
	    //this.contextData.cTr.transform(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8],props[9],props[10],props[11],props[12],props[13],props[14],props[15]);
	    this.contextData.cTr.cloneFromProps(this.transformMat.props);
	    var trProps = this.contextData.cTr.props;
	    this.canvasContext.setTransform(trProps[0],trProps[1],trProps[4],trProps[5],trProps[12],trProps[13]);
	};
	
	CanvasRenderer.prototype.ctxOpacity = function(op){
	    if(op === 1){
	        return;
	    }
	    if(!this.renderConfig.clearCanvas){
	        this.canvasContext.globalAlpha *= op < 0 ? 0 : op;
	        return;
	    }
	    this.contextData.cO *= op < 0 ? 0 : op;
	    this.canvasContext.globalAlpha = this.contextData.cO;
	};
	
	CanvasRenderer.prototype.reset = function(){
	    if(!this.renderConfig.clearCanvas){
	        this.canvasContext.restore();
	        return;
	    }
	    this.contextData.cArrPos = 0;
	    this.contextData.cTr.reset();
	    this.contextData.cO = 1;
	};
	
	CanvasRenderer.prototype.save = function(actionFlag){
	    if(!this.renderConfig.clearCanvas){
	        this.canvasContext.save();
	        return;
	    }
	    if(actionFlag){
	        this.canvasContext.save();
	    }
	    var props = this.contextData.cTr.props;
	    if(this.contextData.saved[this.contextData.cArrPos] === null || this.contextData.saved[this.contextData.cArrPos] === undefined){
	        this.contextData.saved[this.contextData.cArrPos] = new Array(16);
	    }
	    var i,arr = this.contextData.saved[this.contextData.cArrPos];
	    for(i=0;i<16;i+=1){
	        arr[i] = props[i];
	    }
	    this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO;
	    this.contextData.cArrPos += 1;
	};
	
	CanvasRenderer.prototype.restore = function(actionFlag){
	    if(!this.renderConfig.clearCanvas){
	        this.canvasContext.restore();
	        return;
	    }
	    if(actionFlag){
	        this.canvasContext.restore();
	    }
	    this.contextData.cArrPos -= 1;
	    var popped = this.contextData.saved[this.contextData.cArrPos];
	    var i,arr = this.contextData.cTr.props;
	    for(i=0;i<16;i+=1){
	        arr[i] = popped[i];
	    }
	    this.canvasContext.setTransform(popped[0],popped[1],popped[4],popped[5],popped[12],popped[13]);
	    popped = this.contextData.savedOp[this.contextData.cArrPos];
	    this.contextData.cO = popped;
	    this.canvasContext.globalAlpha = popped;
	};
	
	CanvasRenderer.prototype.configAnimation = function(animData){
	    if(this.animationItem.wrapper){
	        this.animationItem.container = document.createElement('canvas');
	        this.animationItem.container.style.width = '100%';
	        this.animationItem.container.style.height = '100%';
	        //this.animationItem.container.style.transform = 'translate3d(0,0,0)';
	        //this.animationItem.container.style.webkitTransform = 'translate3d(0,0,0)';
	        this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style['-webkit-transform'] = "0px 0px 0px";
	        this.animationItem.wrapper.appendChild(this.animationItem.container);
	        this.canvasContext = this.animationItem.container.getContext('2d');
	    }else{
	        this.canvasContext = this.renderConfig.context;
	    }
	    this.data = animData;
	    this.globalData.canvasContext = this.canvasContext;
	    this.globalData.renderer = this;
	    this.globalData.isDashed = false;
	    this.globalData.totalFrames = Math.floor(animData.tf);
	    this.globalData.compWidth = animData.w;
	    this.globalData.compHeight = animData.h;
	    this.globalData.frameRate = animData.fr;
	    this.globalData.frameId = 0;
	    this.globalData.compSize = {
	        w: animData.w,
	        h: animData.h
	    };
	    this.globalData.progressiveLoad = this.renderConfig.progressiveLoad;
	    this.layers = animData.layers;
	    this.transformCanvas = {};
	    this.transformCanvas.w = animData.w;
	    this.transformCanvas.h = animData.h;
	    this.globalData.fontManager = new FontManager();
	    this.globalData.fontManager.addChars(animData.chars);
	    this.globalData.fontManager.addFonts(animData.fonts,document.body);
	    this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem);
	    this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem);
	    this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem);
	    this.globalData.addPendingElement = this.animationItem.addPendingElement.bind(this.animationItem);
	    this.globalData.transformCanvas = this.transformCanvas;
	    this.elements = Array.apply(null,{length:animData.layers.length});
	
	    this.updateContainerSize();
	};
	
	CanvasRenderer.prototype.updateContainerSize = function () {
	    var elementWidth,elementHeight;
	    if(this.animationItem.wrapper && this.animationItem.container){
	        elementWidth = this.animationItem.wrapper.offsetWidth;
	        elementHeight = this.animationItem.wrapper.offsetHeight;
	        this.animationItem.container.setAttribute('width',elementWidth * this.renderConfig.dpr );
	        this.animationItem.container.setAttribute('height',elementHeight * this.renderConfig.dpr);
	    }else{
	        elementWidth = this.canvasContext.canvas.width * this.renderConfig.dpr;
	        elementHeight = this.canvasContext.canvas.height * this.renderConfig.dpr;
	    }
	    var elementRel,animationRel;
	    if(this.renderConfig.preserveAspectRatio.indexOf('meet') !== -1 || this.renderConfig.preserveAspectRatio.indexOf('slice') !== -1){
	        var par = this.renderConfig.preserveAspectRatio.split(' ');
	        var fillType = par[1] || 'meet';
	        var pos = par[0] || 'xMidYMid';
	        var xPos = pos.substr(0,4);
	        var yPos = pos.substr(4);
	        elementRel = elementWidth/elementHeight;
	        animationRel = this.transformCanvas.w/this.transformCanvas.h;
	        if(animationRel>elementRel && fillType === 'meet' || animationRel<elementRel && fillType === 'slice'){
	            this.transformCanvas.sx = elementWidth/(this.transformCanvas.w/this.renderConfig.dpr);
	            this.transformCanvas.sy = elementWidth/(this.transformCanvas.w/this.renderConfig.dpr);
	        }else{
	            this.transformCanvas.sx = elementHeight/(this.transformCanvas.h / this.renderConfig.dpr);
	            this.transformCanvas.sy = elementHeight/(this.transformCanvas.h / this.renderConfig.dpr);
	        }
	
	        if(xPos === 'xMid' && ((animationRel<elementRel && fillType==='meet') || (animationRel>elementRel && fillType === 'slice'))){
	            this.transformCanvas.tx = (elementWidth-this.transformCanvas.w*(elementHeight/this.transformCanvas.h))/2*this.renderConfig.dpr;
	        } else if(xPos === 'xMax' && ((animationRel<elementRel && fillType==='meet') || (animationRel>elementRel && fillType === 'slice'))){
	            this.transformCanvas.tx = (elementWidth-this.transformCanvas.w*(elementHeight/this.transformCanvas.h))*this.renderConfig.dpr;
	        } else {
	            this.transformCanvas.tx = 0;
	        }
	        if(yPos === 'YMid' && ((animationRel>elementRel && fillType==='meet') || (animationRel<elementRel && fillType === 'slice'))){
	            this.transformCanvas.ty = ((elementHeight-this.transformCanvas.h*(elementWidth/this.transformCanvas.w))/2)*this.renderConfig.dpr;
	        } else if(yPos === 'YMax' && ((animationRel>elementRel && fillType==='meet') || (animationRel<elementRel && fillType === 'slice'))){
	            this.transformCanvas.ty = ((elementHeight-this.transformCanvas.h*(elementWidth/this.transformCanvas.w)))*this.renderConfig.dpr;
	        } else {
	            this.transformCanvas.ty = 0;
	        }
	
	    }else if(this.renderConfig.preserveAspectRatio == 'none'){
	        this.transformCanvas.sx = elementWidth/(this.transformCanvas.w/this.renderConfig.dpr);
	        this.transformCanvas.sy = elementHeight/(this.transformCanvas.h/this.renderConfig.dpr);
	        this.transformCanvas.tx = 0;
	        this.transformCanvas.ty = 0;
	    }else{
	        this.transformCanvas.sx = this.renderConfig.dpr;
	        this.transformCanvas.sy = this.renderConfig.dpr;
	        this.transformCanvas.tx = 0;
	        this.transformCanvas.ty = 0;
	    }
	    this.transformCanvas.props = [this.transformCanvas.sx,0,0,0,0,this.transformCanvas.sy,0,0,0,0,1,0,this.transformCanvas.tx,this.transformCanvas.ty,0,1];
	    var i, len = this.elements.length;
	    for(i=0;i<len;i+=1){
	        if(this.elements[i] && this.elements[i].data.ty === 0){
	            this.elements[i].resize(this.globalData.transformCanvas);
	        }
	    }
	};
	
	CanvasRenderer.prototype.destroy = function () {
	    if(this.renderConfig.clearCanvas) {
	        this.animationItem.wrapper.innerHTML = '';
	    }
	    var i, len = this.layers ? this.layers.length : 0;
	    for (i = len - 1; i >= 0; i-=1) {
	        this.elements[i].destroy();
	    }
	    this.elements.length = 0;
	    this.globalData.canvasContext = null;
	    this.animationItem.container = null;
	    this.destroyed = true;
	};
	
	CanvasRenderer.prototype.renderFrame = function(num){
	    if((this.renderedFrame == num && this.renderConfig.clearCanvas === true) || this.destroyed || num === null){
	        return;
	    }
	    this.renderedFrame = num;
	    this.globalData.frameNum = num - this.animationItem.firstFrame;
	    this.globalData.frameId += 1;
	    this.globalData.projectInterface.currentFrame = num;
	    if(this.renderConfig.clearCanvas === true){
	        this.reset();
	        this.canvasContext.save();
	        //this.canvasContext.canvas.width = this.canvasContext.canvas.width;
	        this.canvasContext.clearRect(this.transformCanvas.tx, this.transformCanvas.ty, this.transformCanvas.w*this.transformCanvas.sx, this.transformCanvas.h*this.transformCanvas.sy);
	    }else{
	        this.save();
	    }
	    this.ctxTransform(this.transformCanvas.props);
	    this.canvasContext.beginPath();
	    this.canvasContext.rect(0,0,this.transformCanvas.w,this.transformCanvas.h);
	    this.canvasContext.closePath();
	    this.canvasContext.clip();
	
	    //console.log('--------');
	    //console.log('NEW: ',num);
	    var i, len = this.layers.length;
	    if(!this.completeLayers){
	        this.checkLayers(num);
	    }
	
	    for (i = 0; i < len; i++) {
	        if(this.completeLayers || this.elements[i]){
	            this.elements[i].prepareFrame(num - this.layers[i].st);
	        }
	    }
	    for (i = len - 1; i >= 0; i-=1) {
	        if(this.completeLayers || this.elements[i]){
	            this.elements[i].renderFrame();
	        }
	    }
	    if(this.renderConfig.clearCanvas !== true){
	        this.restore();
	    } else {
	        this.canvasContext.restore();
	    }
	};
	
	CanvasRenderer.prototype.buildItem = function(pos){
	    var elements = this.elements;
	    if(elements[pos] || this.layers[pos].ty == 99){
	        return;
	    }
	    var element = this.createItem(this.layers[pos], this,this.globalData);
	    elements[pos] = element;
	    element.initExpressions();
	    if(this.layers[pos].ty === 0){
	        element.resize(this.globalData.transformCanvas);
	    }
	};
	
	CanvasRenderer.prototype.checkPendingElements  = function(){
	    while(this.pendingElements.length){
	        var element = this.pendingElements.pop();
	        element.checkParenting();
	    }
	};
	
	CanvasRenderer.prototype.hide = function(){
	    this.animationItem.container.style.display = 'none';
	};
	
	CanvasRenderer.prototype.show = function(){
	    this.animationItem.container.style.display = 'block';
	};
	
	CanvasRenderer.prototype.searchExtraCompositions = function(assets){
	    var i, len = assets.length;
	    var floatingContainer = document.createElementNS(svgNS,'g');
	    for(i=0;i<len;i+=1){
	        if(assets[i].xt){
	            var comp = this.createComp(assets[i],this.globalData.comp,this.globalData);
	            comp.initExpressions();
	            //comp.compInterface = CompExpressionInterface(comp);
	            //Expressions.addLayersInterface(comp.elements, this.globalData.projectInterface);
	            this.globalData.projectInterface.registerComposition(comp);
	        }
	    }
	};
	function HybridRenderer(animationItem){
	    this.animationItem = animationItem;
	    this.layers = null;
	    this.renderedFrame = -1;
	    this.globalData = {
	        frameNum: -1
	    };
	    this.pendingElements = [];
	    this.elements = [];
	    this.threeDElements = [];
	    this.destroyed = false;
	    this.camera = null;
	    this.supports3d = true;
	
	}
	
	extendPrototype(BaseRenderer,HybridRenderer);
	
	HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem;
	
	HybridRenderer.prototype.checkPendingElements  = function(){
	    while(this.pendingElements.length){
	        var element = this.pendingElements.pop();
	        element.checkParenting();
	    }
	};
	
	HybridRenderer.prototype.appendElementInPos = function(element, pos){
	    var newElement = element.getBaseElement();
	    if(!newElement){
	        return;
	    }
	    var layer = this.layers[pos];
	    if(!layer.ddd || !this.supports3d){
	        var i = 0;
	        var nextElement;
	        while(i<pos){
	            if(this.elements[i] && this.elements[i]!== true && this.elements[i].getBaseElement){
	                nextElement = this.elements[i].getBaseElement();
	            }
	            i += 1;
	        }
	        if(nextElement){
	            if(!layer.ddd || !this.supports3d){
	                this.layerElement.insertBefore(newElement, nextElement);
	            }
	        } else {
	            if(!layer.ddd || !this.supports3d){
	                this.layerElement.appendChild(newElement);
	            }
	        }
	    } else {
	        this.addTo3dContainer(newElement,pos);
	    }
	};
	
	
	HybridRenderer.prototype.createBase = function (data) {
	    return new SVGBaseElement(data, this.layerElement,this.globalData,this);
	};
	
	HybridRenderer.prototype.createShape = function (data) {
	    if(!this.supports3d){
	        return new IShapeElement(data, this.layerElement,this.globalData,this);
	    }
	    return new HShapeElement(data, this.layerElement,this.globalData,this);
	};
	
	HybridRenderer.prototype.createText = function (data) {
	    if(!this.supports3d){
	        return new SVGTextElement(data, this.layerElement,this.globalData,this);
	    }
	    return new HTextElement(data, this.layerElement,this.globalData,this);
	};
	
	HybridRenderer.prototype.createCamera = function (data) {
	    this.camera = new HCameraElement(data, this.layerElement,this.globalData,this);
	    return this.camera;
	};
	
	HybridRenderer.prototype.createImage = function (data) {
	    if(!this.supports3d){
	        return new IImageElement(data, this.layerElement,this.globalData,this);
	    }
	    return new HImageElement(data, this.layerElement,this.globalData,this);
	};
	
	HybridRenderer.prototype.createComp = function (data) {
	    if(!this.supports3d){
	        return new ICompElement(data, this.layerElement,this.globalData,this);
	    }
	    return new HCompElement(data, this.layerElement,this.globalData,this);
	
	};
	
	HybridRenderer.prototype.createSolid = function (data) {
	    if(!this.supports3d){
	        return new ISolidElement(data, this.layerElement,this.globalData,this);
	    }
	    return new HSolidElement(data, this.layerElement,this.globalData,this);
	};
	
	HybridRenderer.prototype.getThreeDContainer = function(pos){
	    var perspectiveElem = document.createElement('div');
	    styleDiv(perspectiveElem);
	    perspectiveElem.style.width = this.globalData.compSize.w+'px';
	    perspectiveElem.style.height = this.globalData.compSize.h+'px';
	    perspectiveElem.style.transformOrigin = perspectiveElem.style.mozTransformOrigin = perspectiveElem.style.webkitTransformOrigin = "50% 50%";
	    var container = document.createElement('div');
	    styleDiv(container);
	    container.style.transform = container.style.webkitTransform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';
	    perspectiveElem.appendChild(container);
	    this.resizerElem.appendChild(perspectiveElem);
	    var threeDContainerData = {
	        container:container,
	        perspectiveElem:perspectiveElem,
	        startPos: pos,
	        endPos: pos
	    };
	    this.threeDElements.push(threeDContainerData);
	    return threeDContainerData;
	};
	
	HybridRenderer.prototype.build3dContainers = function(){
	    var i, len = this.layers.length;
	    var lastThreeDContainerData;
	    for(i=0;i<len;i+=1){
	        if(this.layers[i].ddd){
	            if(!lastThreeDContainerData){
	                lastThreeDContainerData = this.getThreeDContainer(i);
	            }
	            lastThreeDContainerData.endPos = Math.max(lastThreeDContainerData.endPos,i);
	        } else {
	            lastThreeDContainerData = null;
	        }
	    }
	};
	
	HybridRenderer.prototype.addTo3dContainer = function(elem,pos){
	    var i = 0, len = this.threeDElements.length;
	    while(i<len){
	        if(pos <= this.threeDElements[i].endPos){
	            var j = this.threeDElements[i].startPos;
	            var nextElement;
	            while(j<pos){
	                if(this.elements[j] && this.elements[j].getBaseElement){
	                    nextElement = this.elements[j].getBaseElement();
	                }
	                j += 1;
	            }
	            if(nextElement){
	                this.threeDElements[i].container.insertBefore(elem, nextElement);
	            } else {
	                this.threeDElements[i].container.appendChild(elem);
	            }
	            break;
	        }
	        i += 1;
	    }
	};
	
	HybridRenderer.prototype.configAnimation = function(animData){
	    var resizerElem = document.createElement('div');
	    var wrapper = this.animationItem.wrapper;
	    resizerElem.style.width = animData.w+'px';
	    resizerElem.style.height = animData.h+'px';
	    this.resizerElem = resizerElem;
	    styleDiv(resizerElem);
	    resizerElem.style.transformStyle = resizerElem.style.webkitTransformStyle = resizerElem.style.mozTransformStyle = "flat";
	    wrapper.appendChild(resizerElem);
	
	    resizerElem.style.overflow = 'hidden';
	    var svg = document.createElementNS(svgNS,'svg');
	    svg.setAttribute('width','1');
	    svg.setAttribute('height','1');
	    styleDiv(svg);
	    this.resizerElem.appendChild(svg);
	    var defs = document.createElementNS(svgNS,'defs');
	    svg.appendChild(defs);
	    this.globalData.defs = defs;
	    this.data = animData;
	    //Mask animation
	    this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem);
	    this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem);
	    this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem);
	    this.globalData.frameId = 0;
	    this.globalData.compSize = {
	        w: animData.w,
	        h: animData.h
	    };
	    this.globalData.frameRate = animData.fr;
	    this.layers = animData.layers;
	    this.globalData.fontManager = new FontManager();
	    this.globalData.fontManager.addChars(animData.chars);
	    this.globalData.fontManager.addFonts(animData.fonts,svg);
	    this.layerElement = this.resizerElem;
	    this.build3dContainers();
	    this.updateContainerSize();
	};
	
	HybridRenderer.prototype.destroy = function () {
	    this.animationItem.wrapper.innerHTML = '';
	    this.animationItem.container = null;
	    this.globalData.defs = null;
	    var i, len = this.layers ? this.layers.length : 0;
	    for (i = 0; i < len; i++) {
	        this.elements[i].destroy();
	    }
	    this.elements.length = 0;
	    this.destroyed = true;
	    this.animationItem = null;
	};
	
	HybridRenderer.prototype.updateContainerSize = function () {
	    var elementWidth = this.animationItem.wrapper.offsetWidth;
	    var elementHeight = this.animationItem.wrapper.offsetHeight;
	    var elementRel = elementWidth/elementHeight;
	    var animationRel = this.globalData.compSize.w/this.globalData.compSize.h;
	    var sx,sy,tx,ty;
	    if(animationRel>elementRel){
	        sx = elementWidth/(this.globalData.compSize.w);
	        sy = elementWidth/(this.globalData.compSize.w);
	        tx = 0;
	        ty = ((elementHeight-this.globalData.compSize.h*(elementWidth/this.globalData.compSize.w))/2);
	    }else{
	        sx = elementHeight/(this.globalData.compSize.h);
	        sy = elementHeight/(this.globalData.compSize.h);
	        tx = (elementWidth-this.globalData.compSize.w*(elementHeight/this.globalData.compSize.h))/2;
	        ty = 0;
	    }
	    this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = 'matrix3d(' + sx + ',0,0,0,0,'+sy+',0,0,0,0,1,0,'+tx+','+ty+',0,1)';
	};
	
	HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame;
	
	HybridRenderer.prototype.hide = function(){
	    this.resizerElem.style.display = 'none';
	};
	
	HybridRenderer.prototype.show = function(){
	    this.resizerElem.style.display = 'block';
	};
	
	HybridRenderer.prototype.initItems = function(){
	    this.buildAllItems();
	    if(this.camera){
	        this.camera.setup();
	    } else {
	        var cWidth = this.globalData.compSize.w;
	        var cHeight = this.globalData.compSize.h;
	        var i, len = this.threeDElements.length;
	        for(i=0;i<len;i+=1){
	            this.threeDElements[i].perspectiveElem.style.perspective = this.threeDElements[i].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(cWidth,2) + Math.pow(cHeight,2)) + 'px';
	        }
	    }
	};
	
	HybridRenderer.prototype.searchExtraCompositions = function(assets){
	    var i, len = assets.length;
	    var floatingContainer = document.createElement('div');
	    for(i=0;i<len;i+=1){
	        if(assets[i].xt){
	            var comp = this.createComp(assets[i],floatingContainer,this.globalData.comp,null);
	            comp.initExpressions();
	            this.globalData.projectInterface.registerComposition(comp);
	        }
	    }
	};
	function CVBaseElement(data, comp,globalData){
	    this.globalData = globalData;
	    this.data = data;
	    this.comp = comp;
	    this.canvasContext = globalData.canvasContext;
	    this.init();
	}
	
	createElement(BaseElement, CVBaseElement);
	
	CVBaseElement.prototype.createElements = function(){
	    this.checkParenting();
	};
	
	CVBaseElement.prototype.checkBlendMode = function(globalData){
	    if(globalData.blendMode !== this.data.bm) {
	        globalData.blendMode = this.data.bm;
	
	        var blendModeValue = '';
	        switch (this.data.bm) {
	            case 0:
	                blendModeValue = 'normal';
	                break;
	            case 1:
	                blendModeValue = 'multiply';
	                break;
	            case 2:
	                blendModeValue = 'screen';
	                break;
	            case 3:
	                blendModeValue = 'overlay';
	                break;
	            case 4:
	                blendModeValue = 'darken';
	                break;
	            case 5:
	                blendModeValue = 'lighten';
	                break;
	            case 6:
	                blendModeValue = 'color-dodge';
	                break;
	            case 7:
	                blendModeValue = 'color-burn';
	                break;
	            case 8:
	                blendModeValue = 'hard-light';
	                break;
	            case 9:
	                blendModeValue = 'soft-light';
	                break;
	            case 10:
	                blendModeValue = 'difference';
	                break;
	            case 11:
	                blendModeValue = 'exclusion';
	                break;
	            case 12:
	                blendModeValue = 'hue';
	                break;
	            case 13:
	                blendModeValue = 'saturation';
	                break;
	            case 14:
	                blendModeValue = 'color';
	                break;
	            case 15:
	                blendModeValue = 'luminosity';
	                break;
	        }
	        globalData.canvasContext.globalCompositeOperation = blendModeValue;
	    }
	};
	
	
	CVBaseElement.prototype.renderFrame = function(parentTransform){
	    if(this.data.ty === 3){
	        return false;
	    }
	        this.checkBlendMode(this.data.ty === 0?this.parentGlobalData:this.globalData);
	
	    if(!this.isVisible){
	        return this.isVisible;
	    }
	    this.finalTransform.opMdf = this.finalTransform.op.mdf;
	    this.finalTransform.matMdf = this.finalTransform.mProp.mdf;
	    this.finalTransform.opacity = this.finalTransform.op.v;
	
	    var mat;
	    var finalMat = this.finalTransform.mat;
	
	    if(this.hierarchy){
	        var i, len = this.hierarchy.length;
	        mat = this.finalTransform.mProp.v.props;
	        finalMat.cloneFromProps(mat);
	        for(i=0;i<len;i+=1){
	            this.finalTransform.matMdf = this.hierarchy[i].finalTransform.mProp.mdf ? true : this.finalTransform.matMdf;
	            mat = this.hierarchy[i].finalTransform.mProp.v.props;
	            finalMat.transform(mat[0],mat[1],mat[2],mat[3],mat[4],mat[5],mat[6],mat[7],mat[8],mat[9],mat[10],mat[11],mat[12],mat[13],mat[14],mat[15]);
	        }
	    }else{
	        if(!parentTransform){
	            finalMat.cloneFromProps(this.finalTransform.mProp.v.props);
	        }else{
	            mat = this.finalTransform.mProp.v.props;
	            finalMat.cloneFromProps(mat);
	        }
	    }
	
	    if(parentTransform){
	        mat = parentTransform.mat.props;
	        finalMat.transform(mat[0],mat[1],mat[2],mat[3],mat[4],mat[5],mat[6],mat[7],mat[8],mat[9],mat[10],mat[11],mat[12],mat[13],mat[14],mat[15]);
	        this.finalTransform.opacity *= parentTransform.opacity;
	        this.finalTransform.opMdf = parentTransform.opMdf ? true : this.finalTransform.opMdf;
	        this.finalTransform.matMdf = parentTransform.matMdf ? true : this.finalTransform.matMdf
	    }
	
	    if(this.data.hasMask){
	        this.globalData.renderer.save(true);
	        this.maskManager.renderFrame(this.data.ty === 0?null:finalMat);
	    }
	    if(this.data.hd){
	        this.isVisible = false;
	    }
	    return this.isVisible;
	
	};
	
	CVBaseElement.prototype.addMasks = function(data){
	    this.maskManager = new CVMaskElement(data,this,this.globalData);
	};
	
	
	CVBaseElement.prototype.destroy = function(){
	    this.canvasContext = null;
	    this.data = null;
	    this.globalData = null;
	    if(this.maskManager) {
	        this.maskManager.destroy();
	    }
	};
	
	CVBaseElement.prototype.mHelper = new Matrix();
	
	function CVCompElement(data, comp,globalData){
	    this._parent.constructor.call(this,data, comp,globalData);
	    var compGlobalData = {};
	    for(var s in globalData){
	        if(globalData.hasOwnProperty(s)){
	            compGlobalData[s] = globalData[s];
	        }
	    }
	    compGlobalData.renderer = this;
	    compGlobalData.compHeight = this.data.h;
	    compGlobalData.compWidth = this.data.w;
	    this.renderConfig = {
	        clearCanvas: true
	    };
	    this.contextData = {
	        saved : Array.apply(null,{length:15}),
	        savedOp: Array.apply(null,{length:15}),
	        cArrPos : 0,
	        cTr : new Matrix(),
	        cO : 1
	    };
	    this.completeLayers = false;
	    var i, len = 15;
	    for(i=0;i<len;i+=1){
	        this.contextData.saved[i] = Array.apply(null,{length:16});
	    }
	    this.transformMat = new Matrix();
	    this.parentGlobalData = this.globalData;
	    var cv = document.createElement('canvas');
	    //document.body.appendChild(cv);
	    compGlobalData.canvasContext = cv.getContext('2d');
	    this.canvasContext = compGlobalData.canvasContext;
	    cv.width = this.data.w;
	    cv.height = this.data.h;
	    this.canvas = cv;
	    this.globalData = compGlobalData;
	    this.layers = data.layers;
	    this.pendingElements = [];
	    this.elements = Array.apply(null,{length:this.layers.length});
	    if(this.data.tm){
	        this.tm = PropertyFactory.getProp(this,this.data.tm,0,globalData.frameRate,this.dynamicProperties);
	    }
	    if(this.data.xt || !globalData.progressiveLoad){
	        this.buildAllItems();
	    }
	}
	createElement(CVBaseElement, CVCompElement);
	
	CVCompElement.prototype.ctxTransform = CanvasRenderer.prototype.ctxTransform;
	CVCompElement.prototype.ctxOpacity = CanvasRenderer.prototype.ctxOpacity;
	CVCompElement.prototype.save = CanvasRenderer.prototype.save;
	CVCompElement.prototype.restore = CanvasRenderer.prototype.restore;
	CVCompElement.prototype.reset =  function(){
	    this.contextData.cArrPos = 0;
	    this.contextData.cTr.reset();
	    this.contextData.cO = 1;
	};
	CVCompElement.prototype.resize = function(transformCanvas){
	    var maxScale = Math.max(transformCanvas.sx,transformCanvas.sy);
	    this.canvas.width = this.data.w*maxScale;
	    this.canvas.height = this.data.h*maxScale;
	    this.transformCanvas = {
	        sc:maxScale,
	        w:this.data.w*maxScale,
	        h:this.data.h*maxScale,
	        props:[maxScale,0,0,0,0,maxScale,0,0,0,0,1,0,0,0,0,1]
	    }
	    var i,len = this.elements.length;
	    for( i = 0; i < len; i+=1 ){
	        if(this.elements[i] && this.elements[i].data.ty === 0){
	            this.elements[i].resize(transformCanvas);
	        }
	    }
	};
	
	CVCompElement.prototype.prepareFrame = function(num){
	    this.globalData.frameId = this.parentGlobalData.frameId;
	    this.globalData.mdf = false;
	    this._parent.prepareFrame.call(this,num);
	    if(this.isVisible===false && !this.data.xt){
	        return;
	    }
	    var timeRemapped = num;
	    if(this.tm){
	        timeRemapped = this.tm.v;
	        if(timeRemapped === this.data.op){
	            timeRemapped = this.data.op - 1;
	        }
	    }
	    this.renderedFrame = timeRemapped/this.data.sr;
	    var i,len = this.elements.length;
	
	    if(!this.completeLayers){
	        this.checkLayers(num);
	    }
	
	    for( i = 0; i < len; i+=1 ){
	        if(this.completeLayers || this.elements[i]){
	            this.elements[i].prepareFrame(timeRemapped/this.data.sr - this.layers[i].st);
	            if(this.elements[i].data.ty === 0 && this.elements[i].globalData.mdf){
	                this.globalData.mdf = true;
	            }
	        }
	    }
	    if(this.globalData.mdf && !this.data.xt){
	        this.canvasContext.clearRect(0, 0, this.data.w, this.data.h);
	        this.ctxTransform(this.transformCanvas.props);
	    }
	};
	
	CVCompElement.prototype.renderFrame = function(parentMatrix){
	    if(this._parent.renderFrame.call(this,parentMatrix)===false){
	        return;
	    }
	    if(this.globalData.mdf){
	        var i,len = this.layers.length;
	        for( i = len - 1; i >= 0; i -= 1 ){
	            if(this.completeLayers || this.elements[i]){
	                this.elements[i].renderFrame();
	            }
	        }
	    }
	    if(this.data.hasMask){
	        this.globalData.renderer.restore(true);
	    }
	    if(this.firstFrame){
	        this.firstFrame = false;
	    }
	    this.parentGlobalData.renderer.save();
	    this.parentGlobalData.renderer.ctxTransform(this.finalTransform.mat.props);
	    this.parentGlobalData.renderer.ctxOpacity(this.finalTransform.opacity);
	    this.parentGlobalData.renderer.canvasContext.drawImage(this.canvas,0,0,this.data.w,this.data.h);
	    this.parentGlobalData.renderer.restore();
	
	    if(this.globalData.mdf){
	        this.reset();
	    }
	};
	
	CVCompElement.prototype.setElements = function(elems){
	    this.elements = elems;
	};
	
	CVCompElement.prototype.getElements = function(){
	    return this.elements;
	};
	
	CVCompElement.prototype.destroy = function(){
	    var i,len = this.layers.length;
	    for( i = len - 1; i >= 0; i -= 1 ){
	        this.elements[i].destroy();
	    }
	    this.layers = null;
	    this.elements = null;
	    this._parent.destroy.call(this._parent);
	};
	CVCompElement.prototype.checkLayers = CanvasRenderer.prototype.checkLayers;
	CVCompElement.prototype.buildItem = CanvasRenderer.prototype.buildItem;
	CVCompElement.prototype.checkPendingElements = CanvasRenderer.prototype.checkPendingElements;
	CVCompElement.prototype.addPendingElement = CanvasRenderer.prototype.addPendingElement;
	CVCompElement.prototype.buildAllItems = CanvasRenderer.prototype.buildAllItems;
	CVCompElement.prototype.createItem = CanvasRenderer.prototype.createItem;
	CVCompElement.prototype.createImage = CanvasRenderer.prototype.createImage;
	CVCompElement.prototype.createComp = CanvasRenderer.prototype.createComp;
	CVCompElement.prototype.createSolid = CanvasRenderer.prototype.createSolid;
	CVCompElement.prototype.createShape = CanvasRenderer.prototype.createShape;
	CVCompElement.prototype.createText = CanvasRenderer.prototype.createText;
	CVCompElement.prototype.createBase = CanvasRenderer.prototype.createBase;
	CVCompElement.prototype.buildElementParenting = CanvasRenderer.prototype.buildElementParenting;
	function CVImageElement(data, comp,globalData){
	    this.assetData = globalData.getAssetData(data.refId);
	    this._parent.constructor.call(this,data, comp,globalData);
	    this.globalData.addPendingElement();
	}
	createElement(CVBaseElement, CVImageElement);
	
	CVImageElement.prototype.createElements = function(){
	    var imageLoaded = function(){
	        this.globalData.elementLoaded();
	        if(this.assetData.w !== this.img.width || this.assetData.h !== this.img.height){
	            var canvas = document.createElement('canvas');
	            canvas.width = this.assetData.w;
	            canvas.height = this.assetData.h;
	            var ctx = canvas.getContext('2d');
	
	            var imgW = this.img.width;
	            var imgH = this.img.height;
	            var imgRel = imgW / imgH;
	            var canvasRel = this.assetData.w/this.assetData.h;
	            var widthCrop, heightCrop;
	            if(imgRel>canvasRel){
	                heightCrop = imgH;
	                widthCrop = heightCrop*canvasRel;
	            } else {
	                widthCrop = imgW;
	                heightCrop = widthCrop/canvasRel;
	            }
	            ctx.drawImage(this.img,(imgW-widthCrop)/2,(imgH-heightCrop)/2,widthCrop,heightCrop,0,0,this.assetData.w,this.assetData.h);
	            this.img = canvas;
	        }
	    }.bind(this);
	    var imageFailed = function(){
	        this.failed = true;
	        this.globalData.elementLoaded();
	    }.bind(this);
	
	    this.img = new Image();
	    this.img.addEventListener('load', imageLoaded, false);
	    this.img.addEventListener('error', imageFailed, false);
	    var assetPath = this.globalData.getAssetsPath(this.assetData);
	    this.img.src = assetPath;
	
	    this._parent.createElements.call(this);
	
	};
	
	CVImageElement.prototype.renderFrame = function(parentMatrix){
	    if(this.failed){
	        return;
	    }
	    if(this._parent.renderFrame.call(this,parentMatrix)===false){
	        return;
	    }
	    var ctx = this.canvasContext;
	    this.globalData.renderer.save();
	    var finalMat = this.finalTransform.mat.props;
	    this.globalData.renderer.ctxTransform(finalMat);
	    this.globalData.renderer.ctxOpacity(this.finalTransform.opacity);
	    ctx.drawImage(this.img,0,0);
	    this.globalData.renderer.restore(this.data.hasMask);
	    if(this.firstFrame){
	        this.firstFrame = false;
	    }
	};
	
	CVImageElement.prototype.destroy = function(){
	    this.img = null;
	    this._parent.destroy.call(this._parent);
	};
	
	function CVMaskElement(data,element){
	    this.data = data;
	    this.element = element;
	    this.dynamicProperties = [];
	    this.masksProperties = this.data.masksProperties;
	    this.viewData = new Array(this.masksProperties.length);
	    var i, len = this.masksProperties.length;
	    for (i = 0; i < len; i++) {
	        this.viewData[i] = ShapePropertyFactory.getShapeProp(this.element,this.masksProperties[i],3,this.dynamicProperties,null);
	    }
	}
	
	CVMaskElement.prototype.getMaskProperty = function(pos){
	    return this.viewData[pos];
	};
	
	CVMaskElement.prototype.prepareFrame = function(num){
	    var i, len = this.dynamicProperties.length;
	    for(i=0;i<len;i+=1){
	        this.dynamicProperties[i].getValue(num);
	        if(this.dynamicProperties[i].mdf){
	            this.element.globalData.mdf = true;
	        }
	    }
	};
	
	CVMaskElement.prototype.renderFrame = function (transform) {
	    var ctx = this.element.canvasContext;
	    var i, len = this.data.masksProperties.length;
	    var pt,pt2,pt3,data, hasMasks = false;
	    for (i = 0; i < len; i++) {
	        if(this.masksProperties[i].mode === 'n'){
	            continue;
	        }
	        if(hasMasks === false){
	            ctx.beginPath();
	            hasMasks = true;
	        }
	        if (this.masksProperties[i].inv) {
	            ctx.moveTo(0, 0);
	            ctx.lineTo(this.element.globalData.compWidth, 0);
	            ctx.lineTo(this.element.globalData.compWidth, this.element.globalData.compHeight);
	            ctx.lineTo(0, this.element.globalData.compHeight);
	            ctx.lineTo(0, 0);
	        }
	        data = this.viewData[i].v;
	        pt = transform ? transform.applyToPointArray(data.v[0][0],data.v[0][1],0):data.v[0];
	        ctx.moveTo(pt[0], pt[1]);
	        var j, jLen = data._length;
	        for (j = 1; j < jLen; j++) {
	            pt = transform ? transform.applyToPointArray(data.o[j - 1][0],data.o[j - 1][1],0) : data.o[j - 1];
	            pt2 = transform ? transform.applyToPointArray(data.i[j][0],data.i[j][1],0) : data.i[j];
	            pt3 = transform ? transform.applyToPointArray(data.v[j][0],data.v[j][1],0) : data.v[j];
	            ctx.bezierCurveTo(pt[0], pt[1], pt2[0], pt2[1], pt3[0], pt3[1]);
	        }
	        pt = transform ? transform.applyToPointArray(data.o[j - 1][0],data.o[j - 1][1],0) : data.o[j - 1];
	        pt2 = transform ? transform.applyToPointArray(data.i[0][0],data.i[0][1],0) : data.i[0];
	        pt3 = transform ? transform.applyToPointArray(data.v[0][0],data.v[0][1],0) : data.v[0];
	        ctx.bezierCurveTo(pt[0], pt[1], pt2[0], pt2[1], pt3[0], pt3[1]);
	    }
	    if(hasMasks){
	        ctx.clip();
	    }
	};
	
	CVMaskElement.prototype.getMask = function(nm){
	    var i = 0, len = this.masksProperties.length;
	    while(i<len){
	        if(this.masksProperties[i].nm === nm){
	            return {
	                maskPath: this.viewData[i].pv
	            }
	        }
	        i += 1;
	    }
	};
	
	CVMaskElement.prototype.destroy = function(){
	    this.element = null;
	};
	function CVShapeElement(data, comp,globalData){
	    this.shapes = [];
	    this.stylesList = [];
	    this.viewData = [];
	    this.shapeModifiers = [];
	    this.shapesData = data.shapes;
	    this.firstFrame = true;
	    this._parent.constructor.call(this,data, comp,globalData);
	}
	createElement(CVBaseElement, CVShapeElement);
	
	CVShapeElement.prototype.lcEnum = {
	    '1': 'butt',
	    '2': 'round',
	    '3': 'butt'
	}
	
	CVShapeElement.prototype.ljEnum = {
	    '1': 'miter',
	    '2': 'round',
	    '3': 'butt'
	};
	CVShapeElement.prototype.transformHelper = {opacity:1,mat:new Matrix(),matMdf:false,opMdf:false};
	
	CVShapeElement.prototype.dashResetter = [];
	
	CVShapeElement.prototype.createElements = function(){
	
	    this._parent.createElements.call(this);
	    this.searchShapes(this.shapesData,this.viewData,this.dynamicProperties);
	};
	CVShapeElement.prototype.searchShapes = function(arr,data,dynamicProperties){
	    var i, len = arr.length - 1;
	    var j, jLen;
	    var ownArrays = [], ownModifiers = [], styleElem;
	    for(i=len;i>=0;i-=1){
	        if(arr[i].ty == 'fl' || arr[i].ty == 'st'){
	            styleElem = {
	                type: arr[i].ty,
	                elements: []
	            };
	            data[i] = {};
	            if(arr[i].ty == 'fl' || arr[i].ty == 'st'){
	                data[i].c = PropertyFactory.getProp(this,arr[i].c,1,255,dynamicProperties);
	                if(!data[i].c.k){
	                    styleElem.co = 'rgb('+bm_floor(data[i].c.v[0])+','+bm_floor(data[i].c.v[1])+','+bm_floor(data[i].c.v[2])+')';
	                }
	            }
	            data[i].o = PropertyFactory.getProp(this,arr[i].o,0,0.01,dynamicProperties);
	            if(arr[i].ty == 'st') {
	                styleElem.lc = this.lcEnum[arr[i].lc] || 'round';
	                styleElem.lj = this.ljEnum[arr[i].lj] || 'round';
	                if(arr[i].lj == 1) {
	                    styleElem.ml = arr[i].ml;
	                }
	                data[i].w = PropertyFactory.getProp(this,arr[i].w,0,null,dynamicProperties);
	                if(!data[i].w.k){
	                    styleElem.wi = data[i].w.v;
	                }
	                if(arr[i].d){
	                    var d = PropertyFactory.getDashProp(this,arr[i].d,'canvas',dynamicProperties);
	                    data[i].d = d;
	                    if(!data[i].d.k){
	                        styleElem.da = data[i].d.dasharray;
	                        styleElem.do = data[i].d.dashoffset;
	                    }
	                }
	
	            } else {
	
	                styleElem.r = arr[i].r === 2 ? 'evenodd' : 'nonzero';
	            }
	            this.stylesList.push(styleElem);
	            data[i].style = styleElem;
	            ownArrays.push(data[i].style);
	        }else if(arr[i].ty == 'gr'){
	            data[i] = {
	                it: []
	            };
	            this.searchShapes(arr[i].it,data[i].it,dynamicProperties);
	        }else if(arr[i].ty == 'tr'){
	            data[i] = {
	                transform : {
	                    mat: new Matrix(),
	                    opacity: 1,
	                    matMdf:false,
	                    opMdf:false,
	                    op: PropertyFactory.getProp(this,arr[i].o,0,0.01,dynamicProperties),
	                    mProps: PropertyFactory.getProp(this,arr[i],2,null,dynamicProperties)
	                },
	                elements: []
	            };
	        }else if(arr[i].ty == 'sh' || arr[i].ty == 'rc' || arr[i].ty == 'el' || arr[i].ty == 'sr'){
	            data[i] = {
	                nodes:[],
	                trNodes:[],
	                tr:[0,0,0,0,0,0]
	            };
	            var ty = 4;
	            if(arr[i].ty == 'rc'){
	                ty = 5;
	            }else if(arr[i].ty == 'el'){
	                ty = 6;
	            }else if(arr[i].ty == 'sr'){
	                ty = 7;
	            }
	            data[i].sh = ShapePropertyFactory.getShapeProp(this,arr[i],ty,dynamicProperties);
	            this.shapes.push(data[i].sh);
	            this.addShapeToModifiers(data[i]);
	            jLen = this.stylesList.length;
	            var hasStrokes = false, hasFills = false;
	            for(j=0;j<jLen;j+=1){
	                if(!this.stylesList[j].closed){
	                    this.stylesList[j].elements.push(data[i]);
	                    if(this.stylesList[j].type === 'st'){
	                        hasStrokes = true;
	                    }else{
	                        hasFills = true;
	                    }
	                }
	            }
	            data[i].st = hasStrokes;
	            data[i].fl = hasFills;
	        }else if(arr[i].ty == 'tm' || arr[i].ty == 'rd' || arr[i].ty == 'rp'){
	            var modifier = ShapeModifiers.getModifier(arr[i].ty);
	            modifier.init(this,arr[i],dynamicProperties);
	            this.shapeModifiers.push(modifier);
	            ownModifiers.push(modifier);
	            data[i] = modifier;
	        }
	    }
	    len = ownArrays.length;
	    for(i=0;i<len;i+=1){
	        ownArrays[i].closed = true;
	    }
	    len = ownModifiers.length;
	    for(i=0;i<len;i+=1){
	        ownModifiers[i].closed = true;
	    }
	};
	
	CVShapeElement.prototype.addShapeToModifiers = IShapeElement.prototype.addShapeToModifiers;
	CVShapeElement.prototype.renderModifiers = IShapeElement.prototype.renderModifiers;
	
	CVShapeElement.prototype.renderFrame = function(parentMatrix){
	    if(this._parent.renderFrame.call(this, parentMatrix)===false){
	        return;
	    }
	    this.transformHelper.mat.reset();
	    this.transformHelper.opacity = this.finalTransform.opacity;
	    this.transformHelper.matMdf = false;
	    this.transformHelper.opMdf = this.finalTransform.opMdf;
	    this.renderModifiers();
	    this.renderShape(this.transformHelper,null,null,true);
	    if(this.data.hasMask){
	        this.globalData.renderer.restore(true);
	    }
	};
	
	CVShapeElement.prototype.renderShape = function(parentTransform,items,data,isMain){
	    var i, len;
	    if(!items){
	        items = this.shapesData;
	        len = this.stylesList.length;
	        for(i=0;i<len;i+=1){
	            this.stylesList[i].d = '';
	            this.stylesList[i].mdf = false;
	        }
	    }
	    if(!data){
	        data = this.viewData;
	    }
	    ///
	    ///
	    len = items.length - 1;
	    var groupTransform,groupMatrix;
	    groupTransform = parentTransform;
	    for(i=len;i>=0;i-=1){
	        if(items[i].ty == 'tr'){
	            groupTransform = data[i].transform;
	            var mtArr = data[i].transform.mProps.v.props;
	            groupTransform.matMdf = groupTransform.mProps.mdf;
	            groupTransform.opMdf = groupTransform.op.mdf;
	            groupMatrix = groupTransform.mat;
	            groupMatrix.cloneFromProps(mtArr);
	            if(parentTransform){
	                var props = parentTransform.mat.props;
	                groupTransform.opacity = parentTransform.opacity;
	                groupTransform.opacity *= data[i].transform.op.v;
	                groupTransform.matMdf = parentTransform.matMdf ? true : groupTransform.matMdf;
	                groupTransform.opMdf = parentTransform.opMdf ? true : groupTransform.opMdf;
	                groupMatrix.transform(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8],props[9],props[10],props[11],props[12],props[13],props[14],props[15]);
	            }else{
	                groupTransform.opacity = groupTransform.op.o;
	            }
	        }else if(items[i].ty == 'sh' || items[i].ty == 'el' || items[i].ty == 'rc' || items[i].ty == 'sr'){
	            this.renderPath(items[i],data[i],groupTransform);
	        }else if(items[i].ty == 'fl'){
	            this.renderFill(items[i],data[i],groupTransform);
	        }else if(items[i].ty == 'st'){
	            this.renderStroke(items[i],data[i],groupTransform);
	        }else if(items[i].ty == 'gr'){
	            this.renderShape(groupTransform,items[i].it,data[i].it);
	        }else if(items[i].ty == 'tm'){
	            //
	        }
	    }
	    if(!isMain){
	        return;
	    }
	    len = this.stylesList.length;
	    var j, jLen, k, kLen,elems,nodes, renderer = this.globalData.renderer, ctx = this.globalData.canvasContext, type;
	    renderer.save();
	    renderer.ctxTransform(this.finalTransform.mat.props);
	    for(i=0;i<len;i+=1){
	        type = this.stylesList[i].type;
	        if(type === 'st' && this.stylesList[i].wi === 0){
	            continue;
	        }
	        renderer.save();
	        elems = this.stylesList[i].elements;
	        if(type === 'st'){
	            ctx.strokeStyle = this.stylesList[i].co;
	            ctx.lineWidth = this.stylesList[i].wi;
	            ctx.lineCap = this.stylesList[i].lc;
	            ctx.lineJoin = this.stylesList[i].lj;
	            ctx.miterLimit = this.stylesList[i].ml || 0;
	        }else{
	            ctx.fillStyle = this.stylesList[i].co;
	        }
	        renderer.ctxOpacity(this.stylesList[i].coOp);
	        if(type !== 'st'){
	            ctx.beginPath();
	        }
	        jLen = elems.length;
	        for(j=0;j<jLen;j+=1){
	            if(type === 'st'){
	                ctx.beginPath();
	                if(this.stylesList[i].da){
	                    ctx.setLineDash(this.stylesList[i].da);
	                    ctx.lineDashOffset = this.stylesList[i].do;
	                    this.globalData.isDashed = true;
	                }else if(this.globalData.isDashed){
	                    ctx.setLineDash(this.dashResetter);
	                    this.globalData.isDashed = false;
	                }
	            }
	            nodes = elems[j].trNodes;
	            kLen = nodes.length;
	
	            for(k=0;k<kLen;k+=1){
	                if(nodes[k].t == 'm'){
	                    ctx.moveTo(nodes[k].p[0],nodes[k].p[1]);
	                }else if(nodes[k].t == 'c'){
	                    ctx.bezierCurveTo(nodes[k].p1[0],nodes[k].p1[1],nodes[k].p2[0],nodes[k].p2[1],nodes[k].p3[0],nodes[k].p3[1]);
	                }else{
	                    ctx.closePath();
	                }
	            }
	            if(type === 'st'){
	                ctx.stroke();
	            }
	        }
	        if(type !== 'st'){
	            ctx.fill(this.stylesList[i].r);
	        }
	        renderer.restore();
	    }
	    renderer.restore();
	    if(this.firstFrame){
	        this.firstFrame = false;
	    }
	};
	CVShapeElement.prototype.renderPath = function(pathData,viewData,groupTransform){
	    var len, i, j,jLen;
	    var redraw = groupTransform.matMdf || viewData.sh.mdf || this.firstFrame;
	    if(redraw) {
	        var paths = viewData.sh.paths;
	        jLen = paths._length;
	        var pathStringTransformed = viewData.trNodes;
	        pathStringTransformed.length = 0;
	        for(j=0;j<jLen;j+=1){
	            var pathNodes = paths.shapes[j];
	            if(pathNodes && pathNodes.v){
	                len = pathNodes._length;
	                for (i = 1; i < len; i += 1) {
	                    if (i == 1) {
	                        pathStringTransformed.push({
	                            t: 'm',
	                            p: groupTransform.mat.applyToPointArray(pathNodes.v[0][0], pathNodes.v[0][1], 0)
	                        });
	                    }
	                    pathStringTransformed.push({
	                        t: 'c',
	                        p1: groupTransform.mat.applyToPointArray(pathNodes.o[i - 1][0], pathNodes.o[i - 1][1], 0),
	                        p2: groupTransform.mat.applyToPointArray(pathNodes.i[i][0], pathNodes.i[i][1], 0),
	                        p3: groupTransform.mat.applyToPointArray(pathNodes.v[i][0], pathNodes.v[i][1], 0)
	                    });
	                }
	                if (len == 1) {
	                    pathStringTransformed.push({
	                        t: 'm',
	                        p: groupTransform.mat.applyToPointArray(pathNodes.v[0][0], pathNodes.v[0][1], 0)
	                    });
	                }
	                if (pathNodes.c && len) {
	                    pathStringTransformed.push({
	                        t: 'c',
	                        p1: groupTransform.mat.applyToPointArray(pathNodes.o[i - 1][0], pathNodes.o[i - 1][1], 0),
	                        p2: groupTransform.mat.applyToPointArray(pathNodes.i[0][0], pathNodes.i[0][1], 0),
	                        p3: groupTransform.mat.applyToPointArray(pathNodes.v[0][0], pathNodes.v[0][1], 0)
	                    });
	                    pathStringTransformed.push({
	                        t: 'z'
	                    });
	                }
	                viewData.lStr = pathStringTransformed;
	            }
	
	        }
	
	        if (viewData.st) {
	            for (i = 0; i < 16; i += 1) {
	                viewData.tr[i] = groupTransform.mat.props[i];
	            }
	        }
	        viewData.trNodes = pathStringTransformed;
	
	    }
	};
	
	
	
	CVShapeElement.prototype.renderFill = function(styleData,viewData, groupTransform){
	    var styleElem = viewData.style;
	
	    if(viewData.c.mdf || this.firstFrame){
	        styleElem.co = 'rgb('+bm_floor(viewData.c.v[0])+','+bm_floor(viewData.c.v[1])+','+bm_floor(viewData.c.v[2])+')';
	    }
	    if(viewData.o.mdf || groupTransform.opMdf || this.firstFrame){
	        styleElem.coOp = viewData.o.v*groupTransform.opacity;
	    }
	};
	
	CVShapeElement.prototype.renderStroke = function(styleData,viewData, groupTransform){
	    var styleElem = viewData.style;
	    //TODO fix dashes
	    var d = viewData.d;
	    var dasharray,dashoffset;
	    if(d && (d.mdf  || this.firstFrame)){
	        styleElem.da = d.dasharray;
	        styleElem.do = d.dashoffset;
	    }
	    if(viewData.c.mdf || this.firstFrame){
	        styleElem.co = 'rgb('+bm_floor(viewData.c.v[0])+','+bm_floor(viewData.c.v[1])+','+bm_floor(viewData.c.v[2])+')';
	    }
	    if(viewData.o.mdf || groupTransform.opMdf || this.firstFrame){
	        styleElem.coOp = viewData.o.v*groupTransform.opacity;
	    }
	    if(viewData.w.mdf || this.firstFrame){
	        styleElem.wi = viewData.w.v;
	    }
	};
	
	
	CVShapeElement.prototype.destroy = function(){
	    this.shapesData = null;
	    this.globalData = null;
	    this.canvasContext = null;
	    this.stylesList.length = 0;
	    this.viewData.length = 0;
	    this._parent.destroy.call(this._parent);
	};
	
	
	function CVSolidElement(data, comp,globalData){
	    this._parent.constructor.call(this,data, comp,globalData);
	}
	createElement(CVBaseElement, CVSolidElement);
	
	CVSolidElement.prototype.renderFrame = function(parentMatrix){
	    if(this._parent.renderFrame.call(this, parentMatrix)===false){
	        return;
	    }
	    var ctx = this.canvasContext;
	    this.globalData.renderer.save();
	    this.globalData.renderer.ctxTransform(this.finalTransform.mat.props);
	    this.globalData.renderer.ctxOpacity(this.finalTransform.opacity);
	    ctx.fillStyle=this.data.sc;
	    ctx.fillRect(0,0,this.data.sw,this.data.sh);
	    this.globalData.renderer.restore(this.data.hasMask);
	    if(this.firstFrame){
	        this.firstFrame = false;
	    }
	};
	function CVTextElement(data, comp, globalData){
	    this.textSpans = [];
	    this.yOffset = 0;
	    this.fillColorAnim = false;
	    this.strokeColorAnim = false;
	    this.strokeWidthAnim = false;
	    this.stroke = false;
	    this.fill = false;
	    this.justifyOffset = 0;
	    this.currentRender = null;
	    this.renderType = 'canvas';
	    this.values = {
	        fill: 'rgba(0,0,0,0)',
	        stroke: 'rgba(0,0,0,0)',
	        sWidth: 0,
	        fValue: ''
	    }
	    this._parent.constructor.call(this,data,comp, globalData);
	}
	createElement(CVBaseElement, CVTextElement);
	
	CVTextElement.prototype.init = ITextElement.prototype.init;
	CVTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures;
	CVTextElement.prototype.getMult = ITextElement.prototype.getMult;
	CVTextElement.prototype.prepareFrame = ITextElement.prototype.prepareFrame;
	
	CVTextElement.prototype.tHelper = document.createElement('canvas').getContext('2d');
	
	CVTextElement.prototype.createElements = function(){
	
	    this._parent.createElements.call(this);
	    //console.log('this.data: ',this.data);
	
	};
	
	CVTextElement.prototype.buildNewText = function(){
	    var documentData = this.currentTextDocumentData;
	    this.renderedLetters = Array.apply(null,{length:this.currentTextDocumentData.l ? this.currentTextDocumentData.l.length : 0});
	
	    var hasFill = false;
	    if(documentData.fc) {
	        hasFill = true;
	        this.values.fill = 'rgb(' + Math.round(documentData.fc[0]*255) + ',' + Math.round(documentData.fc[1]*255) + ',' + Math.round(documentData.fc[2]*255) + ')';
	    }else{
	        this.values.fill = 'rgba(0,0,0,0)';
	    }
	    this.fill = hasFill;
	    var hasStroke = false;
	    if(documentData.sc){
	        hasStroke = true;
	        this.values.stroke = 'rgb(' + Math.round(documentData.sc[0]*255) + ',' + Math.round(documentData.sc[1]*255) + ',' + Math.round(documentData.sc[2]*255) + ')';
	        this.values.sWidth = documentData.sw;
	    }
	    var fontData = this.globalData.fontManager.getFontByName(documentData.f);
	    var i, len;
	    var letters = documentData.l;
	    var matrixHelper = this.mHelper;
	    this.stroke = hasStroke;
	    this.values.fValue = documentData.s + 'px '+ this.globalData.fontManager.getFontByName(documentData.f).fFamily;
	    len = documentData.t.length;
	    this.tHelper.font = this.values.fValue;
	    var charData, shapeData, k, kLen, shapes, j, jLen, pathNodes, commands, pathArr, singleShape = this.data.singleShape;
	    if (singleShape) {
	        var xPos = 0, yPos = 0, lineWidths = documentData.lineWidths, boxWidth = documentData.boxWidth, firstLine = true;
	    }
	    var cnt = 0;
	    for (i = 0;i < len ;i += 1) {
	        charData = this.globalData.fontManager.getCharData(documentData.t.charAt(i), fontData.fStyle, this.globalData.fontManager.getFontByName(documentData.f).fFamily);
	        var shapeData;
	        if(charData){
	            shapeData = charData.data;
	        } else {
	            shapeData = null;
	        }
	        matrixHelper.reset();
	        if(singleShape && letters[i].n) {
	            xPos = 0;
	            yPos += documentData.yOffset;
	            yPos += firstLine ? 1 : 0;
	            firstLine = false;
	        }
	
	        if(shapeData && shapeData.shapes){
	            shapes = shapeData.shapes[0].it;
	            jLen = shapes.length;
	            matrixHelper.scale(documentData.s/100,documentData.s/100);
	            if(singleShape){
	                if(documentData.ps){
	                    matrixHelper.translate(documentData.ps[0],documentData.ps[1] + documentData.ascent,0);
	                }
	                matrixHelper.translate(0,-documentData.ls,0);
	                switch(documentData.j){
	                    case 1:
	                        matrixHelper.translate(documentData.justifyOffset + (boxWidth - lineWidths[letters[i].line]),0,0);
	                        break;
	                    case 2:
	                        matrixHelper.translate(documentData.justifyOffset + (boxWidth - lineWidths[letters[i].line])/2,0,0);
	                        break;
	                }
	                matrixHelper.translate(xPos,yPos,0);
	            }
	            commands = new Array(jLen);
	            for(j=0;j<jLen;j+=1){
	                kLen = shapes[j].ks.k.i.length;
	                pathNodes = shapes[j].ks.k;
	                pathArr = [];
	                for(k=1;k<kLen;k+=1){
	                    if(k==1){
	                        pathArr.push(matrixHelper.applyToX(pathNodes.v[0][0],pathNodes.v[0][1],0),matrixHelper.applyToY(pathNodes.v[0][0],pathNodes.v[0][1],0));
	                    }
	                    pathArr.push(matrixHelper.applyToX(pathNodes.o[k-1][0],pathNodes.o[k-1][1],0),matrixHelper.applyToY(pathNodes.o[k-1][0],pathNodes.o[k-1][1],0),matrixHelper.applyToX(pathNodes.i[k][0],pathNodes.i[k][1],0),matrixHelper.applyToY(pathNodes.i[k][0],pathNodes.i[k][1],0),matrixHelper.applyToX(pathNodes.v[k][0],pathNodes.v[k][1],0),matrixHelper.applyToY(pathNodes.v[k][0],pathNodes.v[k][1],0));
	                }
	                pathArr.push(matrixHelper.applyToX(pathNodes.o[k-1][0],pathNodes.o[k-1][1],0),matrixHelper.applyToY(pathNodes.o[k-1][0],pathNodes.o[k-1][1],0),matrixHelper.applyToX(pathNodes.i[0][0],pathNodes.i[0][1],0),matrixHelper.applyToY(pathNodes.i[0][0],pathNodes.i[0][1],0),matrixHelper.applyToX(pathNodes.v[0][0],pathNodes.v[0][1],0),matrixHelper.applyToY(pathNodes.v[0][0],pathNodes.v[0][1],0));
	                commands[j] = pathArr;
	            }
	        }else{
	            commands = [];
	        }
	        if(singleShape){
	            xPos += letters[i].l;
	        }
	        if(this.textSpans[cnt]){
	            this.textSpans[cnt].elem = commands;
	        } else {
	            this.textSpans[cnt] = {elem: commands};
	        }
	        cnt +=1;
	    }
	}
	
	CVTextElement.prototype.renderFrame = function(parentMatrix){
	    if(this._parent.renderFrame.call(this, parentMatrix)===false){
	        return;
	    }
	    var ctx = this.canvasContext;
	    var finalMat = this.finalTransform.mat.props;
	    this.globalData.renderer.save();
	    this.globalData.renderer.ctxTransform(finalMat);
	    this.globalData.renderer.ctxOpacity(this.finalTransform.opacity);
	    ctx.font = this.values.fValue;
	    ctx.lineCap = 'butt';
	    ctx.lineJoin = 'miter';
	    ctx.miterLimit = 4;
	
	    if(!this.data.singleShape){
	        this.getMeasures();
	    }
	
	    var  i,len, j, jLen, k, kLen;
	    var renderedLetters = this.renderedLetters;
	
	    var letters = this.currentTextDocumentData.l;
	
	    len = letters.length;
	    var renderedLetter;
	    var lastFill = null, lastStroke = null, lastStrokeW = null, commands, pathArr;
	    for(i=0;i<len;i+=1){
	        if(letters[i].n){
	            continue;
	        }
	        renderedLetter = renderedLetters[i];
	        if(renderedLetter){
	            this.globalData.renderer.save();
	            this.globalData.renderer.ctxTransform(renderedLetter.props);
	            this.globalData.renderer.ctxOpacity(renderedLetter.o);
	        }
	        if(this.fill){
	            if(renderedLetter && renderedLetter.fc){
	                if(lastFill !== renderedLetter.fc){
	                    lastFill = renderedLetter.fc;
	                    ctx.fillStyle = renderedLetter.fc;
	                }
	            }else if(lastFill !== this.values.fill){
	                lastFill = this.values.fill;
	                ctx.fillStyle = this.values.fill;
	            }
	            commands = this.textSpans[i].elem;
	            jLen = commands.length;
	            this.globalData.canvasContext.beginPath();
	            for(j=0;j<jLen;j+=1) {
	                pathArr = commands[j];
	                kLen = pathArr.length;
	                this.globalData.canvasContext.moveTo(pathArr[0], pathArr[1]);
	                for (k = 2; k < kLen; k += 6) {
	                    this.globalData.canvasContext.bezierCurveTo(pathArr[k], pathArr[k + 1], pathArr[k + 2], pathArr[k + 3], pathArr[k + 4], pathArr[k + 5]);
	                }
	            }
	            this.globalData.canvasContext.closePath();
	            this.globalData.canvasContext.fill();
	            ///ctx.fillText(this.textSpans[i].val,0,0);
	        }
	        if(this.stroke){
	            if(renderedLetter && renderedLetter.sw){
	                if(lastStrokeW !== renderedLetter.sw){
	                    lastStrokeW = renderedLetter.sw;
	                    ctx.lineWidth = renderedLetter.sw;
	                }
	            }else if(lastStrokeW !== this.values.sWidth){
	                lastStrokeW = this.values.sWidth;
	                ctx.lineWidth = this.values.sWidth;
	            }
	            if(renderedLetter && renderedLetter.sc){
	                if(lastStroke !== renderedLetter.sc){
	                    lastStroke = renderedLetter.sc;
	                    ctx.strokeStyle = renderedLetter.sc;
	                }
	            }else if(lastStroke !== this.values.stroke){
	                lastStroke = this.values.stroke;
	                ctx.strokeStyle = this.values.stroke;
	            }
	            commands = this.textSpans[i].elem;
	            jLen = commands.length;
	            this.globalData.canvasContext.beginPath();
	            for(j=0;j<jLen;j+=1) {
	                pathArr = commands[j];
	                kLen = pathArr.length;
	                this.globalData.canvasContext.moveTo(pathArr[0], pathArr[1]);
	                for (k = 2; k < kLen; k += 6) {
	                    this.globalData.canvasContext.bezierCurveTo(pathArr[k], pathArr[k + 1], pathArr[k + 2], pathArr[k + 3], pathArr[k + 4], pathArr[k + 5]);
	                }
	            }
	            this.globalData.canvasContext.closePath();
	            this.globalData.canvasContext.stroke();
	            ///ctx.strokeText(letters[i].val,0,0);
	        }
	        if(renderedLetter) {
	            this.globalData.renderer.restore();
	        }
	    }
	    /*if(this.data.hasMask){
	     this.globalData.renderer.restore(true);
	     }*/
	    this.globalData.renderer.restore(this.data.hasMask);
	    if(this.firstFrame){
	        this.firstFrame = false;
	    }
	};
	function HBaseElement(data,parentContainer,globalData,comp, placeholder){
	    this.globalData = globalData;
	    this.comp = comp;
	    this.data = data;
	    this.matteElement = null;
	    this.parentContainer = parentContainer;
	    this.layerId = placeholder ? placeholder.layerId : 'ly_'+randomString(10);
	    this.placeholder = placeholder;
	    this.init();
	};
	
	createElement(BaseElement, HBaseElement);
	HBaseElement.prototype.checkBlendMode = function(){
	
	};
	HBaseElement.prototype.setBlendMode = BaseElement.prototype.setBlendMode;
	
	/*HBaseElement.prototype.appendNodeToParent = function(node) {
	    if(this.data.hd){
	        return;
	    }
	    if(this.placeholder){
	        var g = this.placeholder.phElement;
	        g.parentNode.insertBefore(node, g);
	        //g.parentNode.removeChild(g);
	    }else{
	        this.parentContainer.appendChild(node);
	    }
	};*/
	
	
	HBaseElement.prototype.getBaseElement = function(){
	    return this.baseElement;
	};
	
	HBaseElement.prototype.createElements = function(){
	    if(this.data.hasMask){
	        this.layerElement = document.createElementNS(svgNS,'svg');
	        styleDiv(this.layerElement);
	        //this.appendNodeToParent(this.layerElement);
	        this.baseElement = this.layerElement;
	        this.maskedElement = this.layerElement;
	    }else{
	        this.layerElement = this.parentContainer;
	    }
	    this.transformedElement = this.layerElement;
	    if(this.data.ln && (this.data.ty === 4 || this.data.ty === 0)){
	        if(this.layerElement === this.parentContainer){
	            this.layerElement = document.createElementNS(svgNS,'g');
	            //this.appendNodeToParent(this.layerElement);
	            this.baseElement = this.layerElement;
	        }
	        this.layerElement.setAttribute('id',this.data.ln);
	    }
	    this.setBlendMode();
	    if(this.layerElement !== this.parentContainer){
	        this.placeholder = null;
	    }
	    this.checkParenting();
	};
	
	HBaseElement.prototype.renderFrame = function(parentTransform){
	    if(this.data.ty === 3){
	        return false;
	    }
	
	    if(this.currentFrameNum === this.lastNum || !this.isVisible){
	        return this.isVisible;
	    }
	    this.lastNum = this.currentFrameNum;
	
	    this.finalTransform.opMdf = this.finalTransform.op.mdf;
	    this.finalTransform.matMdf = this.finalTransform.mProp.mdf;
	    this.finalTransform.opacity = this.finalTransform.op.v;
	    if(this.firstFrame){
	        this.finalTransform.opMdf = true;
	        this.finalTransform.matMdf = true;
	    }
	
	    var mat;
	    var finalMat = this.finalTransform.mat;
	
	    if(this.hierarchy){
	        var i, len = this.hierarchy.length;
	
	        mat = this.finalTransform.mProp.v.props;
	        finalMat.cloneFromProps(mat);
	        for(i=0;i<len;i+=1){
	            this.finalTransform.matMdf = this.hierarchy[i].finalTransform.mProp.mdf ? true : this.finalTransform.matMdf;
	            mat = this.hierarchy[i].finalTransform.mProp.v.props;
	            finalMat.transform(mat[0],mat[1],mat[2],mat[3],mat[4],mat[5],mat[6],mat[7],mat[8],mat[9],mat[10],mat[11],mat[12],mat[13],mat[14],mat[15]);
	        }
	    }else{
	        if(this.isVisible && this.finalTransform.matMdf){
	            if(!parentTransform){
	                finalMat.cloneFromProps(this.finalTransform.mProp.v.props);
	            }else{
	                mat = this.finalTransform.mProp.v.props;
	                finalMat.cloneFromProps(mat);
	            }
	        }
	    }
	    if(this.data.hasMask){
	        this.maskManager.renderFrame(finalMat);
	    }
	
	    if(parentTransform){
	        mat = parentTransform.mat.props;
	        finalMat.cloneFromProps(mat);
	        this.finalTransform.opacity *= parentTransform.opacity;
	        this.finalTransform.opMdf = parentTransform.opMdf ? true : this.finalTransform.opMdf;
	        this.finalTransform.matMdf = parentTransform.matMdf ? true : this.finalTransform.matMdf
	    }
	
	    if(this.finalTransform.matMdf){
	        this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = finalMat.toCSS();
	        this.finalMat = finalMat;
	    }
	    if(this.finalTransform.opMdf){
	        this.transformedElement.style.opacity = this.finalTransform.opacity;
	    }
	    return this.isVisible;
	};
	
	HBaseElement.prototype.destroy = function(){
	    this.layerElement = null;
	    this.transformedElement = null;
	    this.parentContainer = null;
	    if(this.matteElement) {
	        this.matteElement = null;
	    }
	    if(this.maskManager) {
	        this.maskManager.destroy();
	        this.maskManager = null;
	    }
	};
	
	HBaseElement.prototype.getDomElement = function(){
	    return this.layerElement;
	};
	HBaseElement.prototype.addMasks = function(data){
	    this.maskManager = new MaskElement(data,this,this.globalData);
	};
	
	HBaseElement.prototype.hide = function(){
	};
	
	HBaseElement.prototype.setMatte = function(){
	
	}
	
	HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting;
	function HSolidElement(data,parentContainer,globalData,comp, placeholder){
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	}
	createElement(HBaseElement, HSolidElement);
	
	HSolidElement.prototype.createElements = function(){
	    var parent = document.createElement('div');
	    styleDiv(parent);
	    var cont = document.createElementNS(svgNS,'svg');
	    styleDiv(cont);
	    cont.setAttribute('width',this.data.sw);
	    cont.setAttribute('height',this.data.sh);
	    parent.appendChild(cont);
	    this.layerElement = parent;
	    this.transformedElement = parent;
	    //this.appendNodeToParent(parent);
	    this.baseElement = parent;
	    this.innerElem = parent;
	    if(this.data.ln){
	        this.innerElem.setAttribute('id',this.data.ln);
	    }
	    if(this.data.bm !== 0){
	        this.setBlendMode();
	    }
	    var rect = document.createElementNS(svgNS,'rect');
	    rect.setAttribute('width',this.data.sw);
	    rect.setAttribute('height',this.data.sh);
	    rect.setAttribute('fill',this.data.sc);
	    cont.appendChild(rect);
	    if(this.data.hasMask){
	        this.maskedElement = rect;
	    }
	    this.checkParenting();
	};
	
	
	
	HSolidElement.prototype.hide = IImageElement.prototype.hide;
	HSolidElement.prototype.renderFrame = IImageElement.prototype.renderFrame;
	HSolidElement.prototype.destroy = IImageElement.prototype.destroy;
	function HCompElement(data,parentContainer,globalData,comp, placeholder){
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	    this.layers = data.layers;
	    this.supports3d = true;
	    this.completeLayers = false;
	    this.pendingElements = [];
	    this.elements = Array.apply(null,{length:this.layers.length});
	    if(this.data.tm){
	        this.tm = PropertyFactory.getProp(this,this.data.tm,0,globalData.frameRate,this.dynamicProperties);
	    }
	    if(this.data.hasMask) {
	        this.supports3d = false;
	    }
	    if(this.data.xt){
	        this.layerElement = document.createElement('div');
	    }
	    this.buildAllItems();
	
	}
	createElement(HBaseElement, HCompElement);
	
	HCompElement.prototype.createElements = function(){
	    var divElement = document.createElement('div');
	    styleDiv(divElement);
	    if(this.data.ln){
	        divElement.setAttribute('id',this.data.ln);
	    }
	    divElement.style.clip = 'rect(0px, '+this.data.w+'px, '+this.data.h+'px, 0px)';
	    if(this.data.hasMask){
	        var compSvg = document.createElementNS(svgNS,'svg');
	        styleDiv(compSvg);
	        compSvg.setAttribute('width',this.data.w);
	        compSvg.setAttribute('height',this.data.h);
	        var g = document.createElementNS(svgNS,'g');
	        compSvg.appendChild(g);
	        divElement.appendChild(compSvg);
	        this.maskedElement = g;
	        this.baseElement = divElement;
	        this.layerElement = g;
	        this.transformedElement = divElement;
	    }else{
	        this.layerElement = divElement;
	        this.baseElement = this.layerElement;
	        this.transformedElement = divElement;
	    }
	    //this.appendNodeToParent(this.layerElement);
	    this.checkParenting();
	};
	
	HCompElement.prototype.hide = ICompElement.prototype.hide;
	HCompElement.prototype.prepareFrame = ICompElement.prototype.prepareFrame;
	HCompElement.prototype.setElements = ICompElement.prototype.setElements;
	HCompElement.prototype.getElements = ICompElement.prototype.getElements;
	HCompElement.prototype.destroy = ICompElement.prototype.destroy;
	
	HCompElement.prototype.renderFrame = function(parentMatrix){
	    var renderParent = this._parent.renderFrame.call(this,parentMatrix);
	    var i,len = this.layers.length;
	    if(renderParent===false){
	        this.hide();
	        return;
	    }
	
	    this.hidden = false;
	
	    for( i = 0; i < len; i+=1 ){
	        if(this.completeLayers || this.elements[i]){
	            this.elements[i].renderFrame();
	        }
	    }
	    if(this.firstFrame){
	        this.firstFrame = false;
	    }
	};
	
	HCompElement.prototype.checkLayers = BaseRenderer.prototype.checkLayers;
	HCompElement.prototype.buildItem = HybridRenderer.prototype.buildItem;
	HCompElement.prototype.checkPendingElements = HybridRenderer.prototype.checkPendingElements;
	HCompElement.prototype.addPendingElement = HybridRenderer.prototype.addPendingElement;
	HCompElement.prototype.buildAllItems = BaseRenderer.prototype.buildAllItems;
	HCompElement.prototype.createItem = HybridRenderer.prototype.createItem;
	HCompElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting;
	HCompElement.prototype.createImage = HybridRenderer.prototype.createImage;
	HCompElement.prototype.createComp = HybridRenderer.prototype.createComp;
	HCompElement.prototype.createSolid = HybridRenderer.prototype.createSolid;
	HCompElement.prototype.createShape = HybridRenderer.prototype.createShape;
	HCompElement.prototype.createText = HybridRenderer.prototype.createText;
	HCompElement.prototype.createBase = HybridRenderer.prototype.createBase;
	HCompElement.prototype.appendElementInPos = HybridRenderer.prototype.appendElementInPos;
	function HShapeElement(data,parentContainer,globalData,comp, placeholder){
	    this.shapes = [];
	    this.shapeModifiers = [];
	    this.shapesData = data.shapes;
	    this.stylesList = [];
	    this.viewData = [];
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	    this.addedTransforms = {
	        mdf: false,
	        mats: [this.finalTransform.mat]
	    };
	    this.currentBBox = {
	        x:999999,
	        y: -999999,
	        h: 0,
	        w: 0
	    };
	}
	createElement(HBaseElement, HShapeElement);
	var parent = HShapeElement.prototype._parent;
	extendPrototype(IShapeElement, HShapeElement);
	HShapeElement.prototype._parent = parent;
	
	HShapeElement.prototype.createElements = function(){
	    var parent = document.createElement('div');
	    styleDiv(parent);
	    var cont = document.createElementNS(svgNS,'svg');
	    styleDiv(cont);
	    var size = this.comp.data ? this.comp.data : this.globalData.compSize;
	    cont.setAttribute('width',size.w);
	    cont.setAttribute('height',size.h);
	    if(this.data.hasMask){
	        var g = document.createElementNS(svgNS,'g');
	        parent.appendChild(cont);
	        cont.appendChild(g);
	        this.maskedElement = g;
	        this.layerElement = g;
	        this.shapesContainer = g;
	    }else{
	        parent.appendChild(cont);
	        this.layerElement = cont;
	        this.shapesContainer = document.createElementNS(svgNS,'g');
	        this.layerElement.appendChild(this.shapesContainer);
	    }
	    if(!this.data.hd){
	        //this.parentContainer.appendChild(parent);
	        this.baseElement = parent;
	    }
	    this.innerElem = parent;
	    if(this.data.ln){
	        this.innerElem.setAttribute('id',this.data.ln);
	    }
	    this.searchShapes(this.shapesData,this.viewData,this.layerElement,this.dynamicProperties,0);
	    this.buildExpressionInterface();
	    this.layerElement = parent;
	    this.transformedElement = parent;
	    this.shapeCont = cont;
	    if(this.data.bm !== 0){
	        this.setBlendMode();
	    }
	    this.checkParenting();
	};
	
	HShapeElement.prototype.renderFrame = function(parentMatrix){
	    var renderParent = this._parent.renderFrame.call(this,parentMatrix);
	    if(renderParent===false){
	        this.hide();
	        return;
	    }
	    if(this.hidden){
	        this.layerElement.style.display = 'block';
	        this.hidden = false;
	    }
	    this.renderModifiers();
	    this.addedTransforms.mdf = this.finalTransform.matMdf;
	    this.addedTransforms.mats.length = 1;
	    this.addedTransforms.mats[0] = this.finalTransform.mat;
	    this.renderShape(null,null,true, null);
	
	    if(this.isVisible && (this.elemMdf || this.firstFrame)){
	        var boundingBox = this.shapeCont.getBBox();
	        var changed = false;
	        if(this.currentBBox.w !== boundingBox.width){
	            this.currentBBox.w = boundingBox.width;
	            this.shapeCont.setAttribute('width',boundingBox.width);
	            changed = true;
	        }
	        if(this.currentBBox.h !== boundingBox.height){
	            this.currentBBox.h = boundingBox.height;
	            this.shapeCont.setAttribute('height',boundingBox.height);
	            changed = true;
	        }
	        if(changed  || this.currentBBox.x !== boundingBox.x  || this.currentBBox.y !== boundingBox.y){
	            this.currentBBox.w = boundingBox.width;
	            this.currentBBox.h = boundingBox.height;
	            this.currentBBox.x = boundingBox.x;
	            this.currentBBox.y = boundingBox.y;
	
	            this.shapeCont.setAttribute('viewBox',this.currentBBox.x+' '+this.currentBBox.y+' '+this.currentBBox.w+' '+this.currentBBox.h);
	            this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)';
	        }
	    }
	
	};
	function HTextElement(data,parentContainer,globalData,comp, placeholder){
	    this.textSpans = [];
	    this.textPaths = [];
	    this.currentBBox = {
	        x:999999,
	        y: -999999,
	        h: 0,
	        w: 0
	    }
	    this.renderType = 'svg';
	    this.isMasked = false;
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	
	}
	createElement(HBaseElement, HTextElement);
	
	HTextElement.prototype.init = ITextElement.prototype.init;
	HTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures;
	HTextElement.prototype.createPathShape = ITextElement.prototype.createPathShape;
	HTextElement.prototype.prepareFrame = ITextElement.prototype.prepareFrame;
	
	HTextElement.prototype.createElements = function(){
	    this.isMasked = this.checkMasks();
	    var parent = document.createElement('div');
	    styleDiv(parent);
	    this.layerElement = parent;
	    this.transformedElement = parent;
	    if(this.isMasked){
	        this.renderType = 'svg';
	        var cont = document.createElementNS(svgNS,'svg');
	        styleDiv(cont);
	        this.cont = cont;
	        this.compW = this.comp.data.w;
	        this.compH = this.comp.data.h;
	        cont.setAttribute('width',this.compW);
	        cont.setAttribute('height',this.compH);
	        var g = document.createElementNS(svgNS,'g');
	        cont.appendChild(g);
	        parent.appendChild(cont);
	        this.maskedElement = g;
	        this.innerElem = g;
	    } else {
	        this.renderType = 'html';
	        this.innerElem = parent;
	    }
	    this.baseElement = parent;
	
	    this.checkParenting();
	
	};
	
	HTextElement.prototype.buildNewText = function(){
	    var documentData = this.currentTextDocumentData;
	    this.renderedLetters = Array.apply(null,{length:this.currentTextDocumentData.l ? this.currentTextDocumentData.l.length : 0});
	    if(documentData.fc) {
	        this.innerElem.style.color = this.innerElem.style.fill = 'rgb(' + Math.round(documentData.fc[0]*255) + ',' + Math.round(documentData.fc[1]*255) + ',' + Math.round(documentData.fc[2]*255) + ')';
	        ////this.innerElem.setAttribute('fill', 'rgb(' + documentData.fc[0] + ',' + documentData.fc[1] + ',' + documentData.fc[2] + ')');
	    }else{
	        this.innerElem.style.color = this.innerElem.style.fill = 'rgba(0,0,0,0)';
	        ////this.innerElem.setAttribute('fill', 'rgba(0,0,0,0)');
	    }
	    if(documentData.sc){
	        ////this.innerElem.setAttribute('stroke', 'rgb(' + documentData.sc[0] + ',' + documentData.sc[1] + ',' + documentData.sc[2] + ')');
	        this.innerElem.style.stroke = 'rgb(' + Math.round(documentData.sc[0]*255) + ',' + Math.round(documentData.sc[1]*255) + ',' + Math.round(documentData.sc[2]*255) + ')';
	        ////this.innerElem.setAttribute('stroke-width', documentData.sw);
	        this.innerElem.style.strokeWidth = documentData.sw+'px';
	    }
	    ////this.innerElem.setAttribute('font-size', documentData.s);
	    var fontData = this.globalData.fontManager.getFontByName(documentData.f);
	    if(!this.globalData.fontManager.chars){
	        this.innerElem.style.fontSize = documentData.s+'px';
	        this.innerElem.style.lineHeight = documentData.s+'px';
	        if(fontData.fClass){
	            this.innerElem.className = fontData.fClass;
	        } else {
	            ////this.innerElem.setAttribute('font-family', fontData.fFamily);
	            this.innerElem.style.fontFamily = fontData.fFamily;
	            var fWeight = documentData.fWeight, fStyle = documentData.fStyle;
	            ////this.innerElem.setAttribute('font-style', fStyle);
	            this.innerElem.style.fontStyle = fStyle;
	            ////this.innerElem.setAttribute('font-weight', fWeight);
	            this.innerElem.style.fontWeight = fWeight;
	        }
	    }
	    var i, len;
	
	    var letters = documentData.l;
	    len = letters.length;
	    var tSpan,tParent,tCont;
	    var matrixHelper = this.mHelper;
	    var shapes, shapeStr = '';
	    var cnt = 0;
	    for (i = 0;i < len ;i += 1) {
	        if(this.globalData.fontManager.chars){
	            if(!this.textPaths[cnt]){
	                tSpan = document.createElementNS(svgNS,'path');
	                tSpan.setAttribute('stroke-linecap', 'butt');
	                tSpan.setAttribute('stroke-linejoin','round');
	                tSpan.setAttribute('stroke-miterlimit','4');
	            } else {
	                tSpan = this.textPaths[cnt];
	            }
	            if(!this.isMasked){
	                if(this.textSpans[cnt]){
	                    tParent = this.textSpans[cnt];
	                    tCont = tParent.children[0];
	                } else {
	
	                    tParent = document.createElement('div');
	                    tCont = document.createElementNS(svgNS,'svg');
	                    tCont.appendChild(tSpan);
	                    styleDiv(tParent);
	                }
	            }
	        }else{
	            if(!this.isMasked){
	                if(this.textSpans[cnt]){
	                    tParent = this.textSpans[cnt];
	                    tSpan = this.textPaths[cnt];
	                } else {
	                    tParent = document.createElement('span');
	                    styleDiv(tParent);
	                    tSpan = document.createElement('span');
	                    styleDiv(tSpan);
	                    tParent.appendChild(tSpan);
	                }
	            } else {
	                tSpan = this.textPaths[cnt] ? this.textPaths[cnt] : document.createElementNS(svgNS,'text');
	            }
	        }
	        //tSpan.setAttribute('visibility', 'hidden');
	        if(this.globalData.fontManager.chars){
	            var charData = this.globalData.fontManager.getCharData(documentData.t.charAt(i), fontData.fStyle, this.globalData.fontManager.getFontByName(documentData.f).fFamily);
	            var shapeData;
	            if(charData){
	                shapeData = charData.data;
	            } else {
	                shapeData = null;
	            }
	            matrixHelper.reset();
	            if(shapeData && shapeData.shapes){
	                shapes = shapeData.shapes[0].it;
	                matrixHelper.scale(documentData.s/100,documentData.s/100);
	                shapeStr = this.createPathShape(matrixHelper,shapes);
	                tSpan.setAttribute('d',shapeStr);
	            }
	            if(!this.isMasked){
	                this.innerElem.appendChild(tParent);
	                if(shapeData && shapeData.shapes){
	                    document.body.appendChild(tCont);
	
	                    var boundingBox = tCont.getBBox();
	                    tCont.setAttribute('width',boundingBox.width);
	                    tCont.setAttribute('height',boundingBox.height);
	                    tCont.setAttribute('viewBox',boundingBox.x+' '+ boundingBox.y+' '+ boundingBox.width+' '+ boundingBox.height);
	                    tCont.style.transform = tCont.style.webkitTransform = 'translate(' + boundingBox.x + 'px,' + boundingBox.y + 'px)';
	
	                    letters[i].yOffset = boundingBox.y;
	                    tParent.appendChild(tCont);
	
	                } else{
	                    tCont.setAttribute('width',1);
	                    tCont.setAttribute('height',1);
	                }
	            }else{
	                this.innerElem.appendChild(tSpan);
	            }
	        }else{
	            tSpan.textContent = letters[i].val;
	            tSpan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space","preserve");
	            if(!this.isMasked){
	                this.innerElem.appendChild(tParent);
	                //
	                tSpan.style.transform = tSpan.style.webkitTransform = 'translate3d(0,'+ -documentData.s/1.2+'px,0)';
	            } else {
	                this.innerElem.appendChild(tSpan);
	            }
	        }
	        //
	        if(!this.isMasked){
	            this.textSpans[cnt] = tParent;
	        }else{
	            this.textSpans[cnt] = tSpan;
	        }
	        this.textSpans[cnt].style.display = 'block';
	        this.textPaths[cnt] = tSpan;
	        cnt += 1;
	    }
	    while(cnt < this.textSpans.length){
	        this.textSpans[cnt].style.display = 'none';
	        cnt += 1;
	    }
	}
	
	HTextElement.prototype.hide = SVGTextElement.prototype.hide;
	
	HTextElement.prototype.renderFrame = function(parentMatrix){
	
	    var renderParent = this._parent.renderFrame.call(this,parentMatrix);
	    if(renderParent===false){
	        this.hide();
	        return;
	    }
	    if(this.hidden){
	        this.hidden = false;
	        this.innerElem.style.display = 'block';
	        this.layerElement.style.display = 'block';
	    }
	
	    if(this.data.singleShape){
	        if(!this.firstFrame && !this.lettersChangedFlag){
	            return;
	        } else {
	            // Todo Benchmark if using this is better than getBBox
	             if(this.isMasked && this.finalTransform.matMdf){
	                 this.cont.setAttribute('viewBox',-this.finalTransform.mProp.p.v[0]+' '+ -this.finalTransform.mProp.p.v[1]+' '+this.compW+' '+this.compH);
	                this.cont.style.transform = this.cont.style.webkitTransform = 'translate(' + -this.finalTransform.mProp.p.v[0] + 'px,' + -this.finalTransform.mProp.p.v[1] + 'px)';
	             }
	        }
	    }
	
	    this.getMeasures();
	    if(!this.lettersChangedFlag){
	        return;
	    }
	    var  i,len;
	    var renderedLetters = this.renderedLetters;
	
	    var letters = this.currentTextDocumentData.l;
	
	    len = letters.length;
	    var renderedLetter;
	    for(i=0;i<len;i+=1){
	        if(letters[i].n){
	            continue;
	        }
	        renderedLetter = renderedLetters[i];
	        if(!this.isMasked){
	            this.textSpans[i].style.transform = this.textSpans[i].style.webkitTransform = renderedLetter.m;
	        }else{
	            this.textSpans[i].setAttribute('transform',renderedLetter.m);
	        }
	        ////this.textSpans[i].setAttribute('opacity',renderedLetter.o);
	        this.textSpans[i].style.opacity = renderedLetter.o;
	        if(renderedLetter.sw){
	            this.textPaths[i].setAttribute('stroke-width',renderedLetter.sw);
	        }
	        if(renderedLetter.sc){
	            this.textPaths[i].setAttribute('stroke',renderedLetter.sc);
	        }
	        if(renderedLetter.fc){
	            this.textPaths[i].setAttribute('fill',renderedLetter.fc);
	            this.textPaths[i].style.color = renderedLetter.fc;
	        }
	    }
	    if(this.isVisible && (this.elemMdf || this.firstFrame)){
	        if(this.innerElem.getBBox){
	            var boundingBox = this.innerElem.getBBox();
	
	            if(this.currentBBox.w !== boundingBox.width){
	                this.currentBBox.w = boundingBox.width;
	                this.cont.setAttribute('width',boundingBox.width);
	            }
	            if(this.currentBBox.h !== boundingBox.height){
	                this.currentBBox.h = boundingBox.height;
	                this.cont.setAttribute('height',boundingBox.height);
	            }
	            if(this.currentBBox.w !== boundingBox.width || this.currentBBox.h !== boundingBox.height  || this.currentBBox.x !== boundingBox.x  || this.currentBBox.y !== boundingBox.y){
	                this.currentBBox.w = boundingBox.width;
	                this.currentBBox.h = boundingBox.height;
	                this.currentBBox.x = boundingBox.x;
	                this.currentBBox.y = boundingBox.y;
	
	                this.cont.setAttribute('viewBox',this.currentBBox.x+' '+this.currentBBox.y+' '+this.currentBBox.w+' '+this.currentBBox.h);
	                this.cont.style.transform = this.cont.style.webkitTransform = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)';
	            }
	        }
	    }
	    if(this.firstFrame){
	        this.firstFrame = false;
	    }
	}
	
	
	HTextElement.prototype.destroy = SVGTextElement.prototype.destroy;
	function HImageElement(data,parentContainer,globalData,comp, placeholder){
	    this.assetData = globalData.getAssetData(data.refId);
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	}
	createElement(HBaseElement, HImageElement);
	
	HImageElement.prototype.createElements = function(){
	
	    var assetPath = this.globalData.getAssetsPath(this.assetData);
	    var img = new Image();
	
	    if(this.data.hasMask){
	        var parent = document.createElement('div');
	        styleDiv(parent);
	        var cont = document.createElementNS(svgNS,'svg');
	        styleDiv(cont);
	        cont.setAttribute('width',this.assetData.w);
	        cont.setAttribute('height',this.assetData.h);
	        parent.appendChild(cont);
	        this.imageElem = document.createElementNS(svgNS,'image');
	        this.imageElem.setAttribute('width',this.assetData.w+"px");
	        this.imageElem.setAttribute('height',this.assetData.h+"px");
	        this.imageElem.setAttributeNS('http://www.w3.org/1999/xlink','href',assetPath);
	        cont.appendChild(this.imageElem);
	        this.layerElement = parent;
	        this.transformedElement = parent;
	        this.baseElement = parent;
	        this.innerElem = parent;
	        this.maskedElement = this.imageElem;
	    } else {
	        styleDiv(img);
	        this.layerElement = img;
	        this.baseElement = img;
	        this.innerElem = img;
	        this.transformedElement = img;
	    }
	    img.src = assetPath;
	    if(this.data.ln){
	        this.innerElem.setAttribute('id',this.data.ln);
	    }
	    this.checkParenting();
	};
	
	HImageElement.prototype.hide = HSolidElement.prototype.hide;
	HImageElement.prototype.renderFrame = HSolidElement.prototype.renderFrame;
	HImageElement.prototype.destroy = HSolidElement.prototype.destroy;
	function HCameraElement(data,parentContainer,globalData,comp, placeholder){
	    this._parent.constructor.call(this,data,parentContainer,globalData,comp, placeholder);
	    this.pe = PropertyFactory.getProp(this,data.pe,0,0,this.dynamicProperties);
	    if(data.ks.p.s){
	        this.px = PropertyFactory.getProp(this,data.ks.p.x,1,0,this.dynamicProperties);
	        this.py = PropertyFactory.getProp(this,data.ks.p.y,1,0,this.dynamicProperties);
	        this.pz = PropertyFactory.getProp(this,data.ks.p.z,1,0,this.dynamicProperties);
	    }else{
	        this.p = PropertyFactory.getProp(this,data.ks.p,1,0,this.dynamicProperties);
	    }
	    if(data.ks.a){
	        this.a = PropertyFactory.getProp(this,data.ks.a,1,0,this.dynamicProperties);
	    }
	    if(data.ks.or.k.length && data.ks.or.k[0].to){
	        var i,len = data.ks.or.k.length;
	        for(i=0;i<len;i+=1){
	            data.ks.or.k[i].to = null;
	            data.ks.or.k[i].ti = null;
	        }
	    }
	    this.or = PropertyFactory.getProp(this,data.ks.or,1,degToRads,this.dynamicProperties);
	    this.or.sh = true;
	    this.rx = PropertyFactory.getProp(this,data.ks.rx,0,degToRads,this.dynamicProperties);
	    this.ry = PropertyFactory.getProp(this,data.ks.ry,0,degToRads,this.dynamicProperties);
	    this.rz = PropertyFactory.getProp(this,data.ks.rz,0,degToRads,this.dynamicProperties);
	    this.mat = new Matrix();
	}
	createElement(HBaseElement, HCameraElement);
	
	HCameraElement.prototype.setup = function() {
	    var i, len = this.comp.threeDElements.length, comp;
	    for(i=0;i<len;i+=1){
	        //[perspectiveElem,container]
	        comp = this.comp.threeDElements[i];
	        comp.perspectiveElem.style.perspective = comp.perspectiveElem.style.webkitPerspective = this.pe.v+'px';
	        comp.container.style.transformOrigin = comp.container.style.mozTransformOrigin = comp.container.style.webkitTransformOrigin = "0px 0px 0px";
	        comp.perspectiveElem.style.transform = comp.perspectiveElem.style.webkitTransform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';
	    }
	};
	
	HCameraElement.prototype.createElements = function(){
	};
	
	HCameraElement.prototype.hide = function(){
	};
	
	HCameraElement.prototype.renderFrame = function(){
	    var mdf = this.firstFrame;
	    var i, len;
	    if(this.hierarchy){
	        len = this.hierarchy.length;
	        for(i=0;i<len;i+=1){
	            mdf = this.hierarchy[i].finalTransform.mProp.mdf ? true : mdf;
	        }
	    }
	    if(mdf || (this.p && this.p.mdf) || (this.px && (this.px.mdf || this.py.mdf || this.pz.mdf)) || this.rx.mdf || this.ry.mdf || this.rz.mdf || this.or.mdf || (this.a && this.a.mdf)) {
	        this.mat.reset();
	
	        if(this.p){
	            this.mat.translate(-this.p.v[0],-this.p.v[1],this.p.v[2]);
	        }else{
	            this.mat.translate(-this.px.v,-this.py.v,this.pz.v);
	        }
	        if(this.a){
	            var diffVector = [this.p.v[0]-this.a.v[0],this.p.v[1]-this.a.v[1],this.p.v[2]-this.a.v[2]];
	            var mag = Math.sqrt(Math.pow(diffVector[0],2)+Math.pow(diffVector[1],2)+Math.pow(diffVector[2],2));
	            //var lookDir = getNormalizedPoint(getDiffVector(this.a.v,this.p.v));
	            var lookDir = [diffVector[0]/mag,diffVector[1]/mag,diffVector[2]/mag];
	            var lookLengthOnXZ = Math.sqrt( lookDir[2]*lookDir[2] + lookDir[0]*lookDir[0] );
	            var m_rotationX = (Math.atan2( lookDir[1], lookLengthOnXZ ));
	            var m_rotationY = (Math.atan2( lookDir[0], -lookDir[2]));
	            this.mat.rotateY(m_rotationY).rotateX(-m_rotationX);
	
	        }
	        this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v);
	        this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]);
	        this.mat.translate(this.globalData.compSize.w/2,this.globalData.compSize.h/2,0);
	        this.mat.translate(0,0,this.pe.v);
	        if(this.hierarchy){
	            var mat;
	            len = this.hierarchy.length;
	            for(i=0;i<len;i+=1){
	                mat = this.hierarchy[i].finalTransform.mProp.iv.props;
	                this.mat.transform(mat[0],mat[1],mat[2],mat[3],mat[4],mat[5],mat[6],mat[7],mat[8],mat[9],mat[10],mat[11],-mat[12],-mat[13],mat[14],mat[15]);
	            }
	        }
	        len = this.comp.threeDElements.length;
	        var comp;
	        for(i=0;i<len;i+=1){
	            comp = this.comp.threeDElements[i];
	            comp.container.style.transform = comp.container.style.webkitTransform = this.mat.toCSS();
	        }
	    }
	    this.firstFrame = false;
	};
	
	HCameraElement.prototype.destroy = function(){
	};
	var Expressions = (function(){
	    var ob = {};
	    ob.initExpressions = initExpressions;
	
	
	    function initExpressions(animation){
	        animation.renderer.compInterface = CompExpressionInterface(animation.renderer);
	        animation.renderer.globalData.projectInterface.registerComposition(animation.renderer);
	    }
	   return ob;
	}());
	
	expressionsPlugin = Expressions;
	
	(function addPropertyDecorator() {
	
	    function getStaticValueAtTime() {
	        return this.pv;
	    }
	
	    function getValueAtTime(frameNum, offsetTime) {
	        frameNum *= this.elem.globalData.frameRate;
	        var i = 0,len = this.keyframes.length- 1,dir= 1,flag = true;
	        var keyData, nextKeyData;
	        offsetTime = offsetTime === undefined ? this.offsetTime : 0;
	        //console.log(this.offsetTime);
	        var retVal = typeof this.pv === 'object' ? [this.pv.length] : 0;
	
	        while(flag){
	            keyData = this.keyframes[i];
	            nextKeyData = this.keyframes[i+1];
	            if(i == len-1 && frameNum >= nextKeyData.t - offsetTime){
	                if(keyData.h){
	                    keyData = nextKeyData;
	                }
	                break;
	            }
	            if((nextKeyData.t - offsetTime) > frameNum){
	                break;
	            }
	            if(i < len - 1){
	                i += dir;
	            }else{
	                flag = false;
	            }
	        }
	
	        var k, kLen,perc,jLen, j = 0, fnc;
	        if (keyData.to) {
	
	            if (!keyData.bezierData) {
	                bez.buildBezierData(keyData);
	            }
	            var bezierData = keyData.bezierData;
	            if (frameNum >= nextKeyData.t-offsetTime || frameNum < keyData.t-offsetTime) {
	                var ind = frameNum >= nextKeyData.t-offsetTime ? bezierData.points.length - 1 : 0;
	                kLen = bezierData.points[ind].point.length;
	                for(k = 0; k < kLen; k += 1){
	                    retVal[k] = bezierData.points[ind].point[k];
	                }
	            } else {
	                if (keyData.__fnct) {
	                    fnc = keyData.__fnct;
	                } else {
	                    //fnc = bez.getEasingCurve(keyData.o.x,keyData.o.y,keyData.i.x,keyData.i.y,keyData.n);
	                    fnc = BezierFactory.getBezierEasing(keyData.o.x, keyData.o.y, keyData.i.x, keyData.i.y, keyData.n).get;
	                    keyData.__fnct = fnc;
	                }
	                perc = fnc((frameNum - (keyData.t - offsetTime)) / ((nextKeyData.t - offsetTime) - (keyData.t - offsetTime)));
	                var distanceInLine = bezierData.segmentLength * perc;
	
	                var segmentPerc;
	                var addedLength = 0;
	                dir = 1;
	                flag = true;
	                jLen = bezierData.points.length;
	                while(flag) {
	                    addedLength += bezierData.points[j].partialLength*dir;
	                    if (distanceInLine === 0 || perc === 0 || j == bezierData.points.length - 1) {
	                        kLen = bezierData.points[j].point.length;
	                        for (k = 0; k < kLen; k += 1) {
	                            retVal[k] = bezierData.points[j].point[k];
	                        }
	                        break;
	                    } else if (distanceInLine >= addedLength && distanceInLine < addedLength + bezierData.points[j+1].partialLength){
	                        segmentPerc = (distanceInLine - addedLength) / (bezierData.points[j + 1].partialLength);
	                        kLen = bezierData.points[j].point.length;
	                        for (k = 0; k < kLen; k += 1) {
	                            retVal[k] = bezierData.points[j].point[k] + (bezierData.points[j+1].point[k] - bezierData.points[j].point[k]) * segmentPerc;
	                        }
	                        break;
	                    }
	                    if (j < jLen - 1 && dir == 1 || j > 0 && dir == -1) {
	                        j += dir;
	                    } else {
	                        flag = false;
	                    }
	                }
	            }
	        } else {
	            var outX,outY,inX,inY, isArray = false, keyValue;
	            len = keyData.s.length;
	            for(i=0;i<len;i+=1){
	                if(keyData.h !== 1){
	                    if(keyData.o.x instanceof Array){
	                        isArray = true;
	                        if(!keyData.__fnct){
	                            keyData.__fnct = [];
	                        }
	                        if(!keyData.__fnct[i]){
	                            outX = keyData.o.x[i] || keyData.o.x[0];
	                            outY = keyData.o.y[i] || keyData.o.y[0];
	                            inX = keyData.i.x[i] || keyData.i.x[0];
	                            inY = keyData.i.y[i] || keyData.i.y[0];
	                        }
	                    }else{
	                        isArray = false;
	                        if(!keyData.__fnct) {
	                            outX = keyData.o.x;
	                            outY = keyData.o.y;
	                            inX = keyData.i.x;
	                            inY = keyData.i.y;
	                        }
	                    }
	                    if(isArray){
	                        if(keyData.__fnct[i]){
	                            fnc = keyData.__fnct[i];
	                        }else{
	                            //fnc = bez.getEasingCurve(outX,outY,inX,inY);
	                            fnc = BezierFactory.getBezierEasing(outX,outY,inX,inY).get;
	                            keyData.__fnct[i] = fnc;
	                        }
	                    }else{
	                        if(keyData.__fnct){
	                            fnc = keyData.__fnct;
	                        }else{
	                            //fnc = bez.getEasingCurve(outX,outY,inX,inY);
	                            fnc = BezierFactory.getBezierEasing(outX,outY,inX,inY).get;
	                            keyData.__fnct = fnc;
	                        }
	                    }
	                    if(frameNum >= nextKeyData.t-offsetTime){
	                        perc = 1;
	                    }else if(frameNum < keyData.t-offsetTime){
	                        perc = 0;
	                    }else{
	                        perc = fnc((frameNum-(keyData.t-offsetTime))/((nextKeyData.t-offsetTime)-(keyData.t-offsetTime)));
	                    }
	                }
	                if(this.sh && keyData.h !== 1){
	                    var initP = keyData.s[i];
	                    var endP = keyData.e[i];
	                    if(initP-endP < -180){
	                        initP += 360;
	                    } else if(initP-endP > 180){
	                        initP -= 360;
	                    }
	                    keyValue = initP+(endP-initP)*perc;
	                } else {
	                    keyValue = keyData.h === 1 ? keyData.s[i] : keyData.s[i]+(keyData.e[i]-keyData.s[i])*perc;
	                }
	                if(len === 1){
	                    retVal = keyValue;
	                }else{
	                    retVal[i] = keyValue;
	                }
	            }
	        }
	        return retVal;
	    }
	
	    function getVelocityAtTime(frameNum) {
	        if(this.vel !== undefined){
	            return this.vel;
	        }
	        var delta = -0.01;
	        //frameNum += this.elem.data.st;
	        var v1 = this.getValueAtTime(frameNum, 0);
	        var v2 = this.getValueAtTime(frameNum + delta, 0);
	        var velocity;
	        if(v1.length){
	            velocity = Array.apply(null,{length:v1.length});
	            var i;
	            for(i=0;i<v1.length;i+=1){
	                //removing frameRate
	                //if needed, don't add it here
	                //velocity[i] = this.elem.globalData.frameRate*((v2[i] - v1[i])/delta);
	                velocity[i] = (v2[i] - v1[i])/delta;
	            }
	        } else {
	            velocity = (v2 - v1)/delta;
	        }
	        return velocity;
	    };
	
	    function setGroupProperty(propertyGroup){
	        this.propertyGroup = propertyGroup;
	    }
	
	    function searchExpressions(elem,data,prop){
	        if(data.x){
	            prop.k = true;
	            prop.x = true;
	            if(prop.getValue) {
	                prop.getPreValue = prop.getValue;
	            }
	            prop.getValue = ExpressionManager.initiateExpression.bind(prop)(elem,data,prop);
	        }
	    }
	
	    var TextExpressionSelectorProp = (function(){
	
	        function getValueProxy(index,total){
	            this.textIndex = index+1;
	            this.textTotal = total;
	            this.getValue();
	            return this.v;
	        }
	
	        return function TextExpressionSelectorProp(elem,data){
	            this.pv = 1;
	            this.comp = elem.comp;
	            this.elem = elem;
	            this.mult = .01;
	            this.type = 'textSelector';
	            this.textTotal = data.totalChars;
	            this.selectorValue = 100;
	            this.lastValue = [1,1,1];
	            searchExpressions.bind(this)(elem,data,this);
	            this.getMult = getValueProxy;
	            this.getVelocityAtTime = getVelocityAtTime;
	            if(this.kf){
	                this.getValueAtTime = getValueAtTime.bind(this);
	            } else {
	                this.getValueAtTime = getStaticValueAtTime.bind(this);
	            }
	            this.setGroupProperty = setGroupProperty;
	        }
	    }());
	
	
	    var propertyGetProp = PropertyFactory.getProp;
	    PropertyFactory.getProp = function(elem,data,type, mult, arr){
	        var prop = propertyGetProp(elem,data,type, mult, arr);
	        prop.getVelocityAtTime = getVelocityAtTime;
	        if(prop.kf){
	            prop.getValueAtTime = getValueAtTime.bind(prop);
	        } else {
	            prop.getValueAtTime = getStaticValueAtTime.bind(prop);
	        }
	        prop.setGroupProperty = setGroupProperty;
	        var isAdded = prop.k;
	        if(data.ix !== undefined){
	            Object.defineProperty(prop,'propertyIndex',{
	                get: function(){
	                    return data.ix;
	                }
	            })
	        }
	        searchExpressions(elem,data,prop);
	        if(!isAdded && prop.x){
	            arr.push(prop);
	        }
	
	        return prop;
	    }
	
	    var propertyGetShapeProp = ShapePropertyFactory.getShapeProp;
	    ShapePropertyFactory.getShapeProp = function(elem,data,type, arr, trims){
	        var prop = propertyGetShapeProp(elem,data,type, arr, trims);
	        prop.setGroupProperty = setGroupProperty;
	        if(prop.kf){
	            prop.getValueAtTime = getValueAtTime;
	        } else {
	            prop.getValueAtTime = getStaticValueAtTime;
	        }
	        var isAdded = prop.k;
	        if(data.ix !== undefined){
	            Object.defineProperty(prop,'propertyIndex',{
	                get: function(){
	                    return data.ix;
	                }
	            })
	        }
	        if(type === 3){
	            searchExpressions(elem,data.pt,prop);
	        } else if(type === 4){
	            searchExpressions(elem,data.ks,prop);
	        }
	        if(!isAdded && prop.x){
	            arr.push(prop);
	        }
	        return prop;
	    }
	
	    var propertyGetTextProp = PropertyFactory.getTextSelectorProp;
	    PropertyFactory.getTextSelectorProp = function(elem, data,arr){
	        if(data.t === 1){
	            return new TextExpressionSelectorProp(elem, data,arr);
	        } else {
	            return propertyGetTextProp(elem,data,arr);
	        }
	    }
	}());
	var ExpressionManager = (function(){
	    var ob = {};
	    var Math = BMMath;
	
	    function duplicatePropertyValue(value, mult){
	        mult = mult || 1;
	
	        if(typeof value === 'number'  || value instanceof Number){
	            return value*mult;
	        }else if(value.i){
	            return JSON.parse(JSON.stringify(value));
	        }else{
	            var arr = Array.apply(null,{length:value.length});
	            var i, len = value.length;
	            for(i=0;i<len;i+=1){
	                arr[i]=value[i]*mult;
	            }
	            return arr;
	        }
	    }
	
	    function shapesEqual(shape1, shape2) {
	        if(shape1._length !== shape2._length || shape1.c !== shape2.c){
	            return false;
	        }
	        var i, len = shape1._length;
	        for(i = 0; i < len; i += 1) {
	            if(shape1.v[i][0] !== shape2.v[i][0] || shape1.v[i][1] !== shape2.v[i][1]
	                || shape1.o[i][0] !== shape2.o[i][0] || shape1.o[i][1] !== shape2.o[i][1]
	                || shape1.i[i][0] !== shape2.i[i][0] || shape1.i[i][1] !== shape2.i[i][1]){
	                return false;
	            }
	        }
	        return true;
	    }
	
	    function $bm_neg(a){
	        var tOfA = typeof a;
	        if(tOfA === 'number' || tOfA === 'boolean'  || a instanceof Number ){
	            return -a;
	        }
	        if(a.constructor === Array){
	            var i, lenA = a.length;
	            var retArr = [];
	            for(i=0;i<lenA;i+=1){
	                retArr[i] = -a[i];
	            }
	            return retArr;
	        }
	    }
	
	    function sum(a,b) {
	        var tOfA = typeof a;
	        var tOfB = typeof b;
	        if(tOfA === 'string' || tOfB === 'string'){
	            return a + b;
	        }
	        if((tOfA === 'number' || tOfA === 'boolean' || tOfA === 'string' || a instanceof Number) && (tOfB === 'number' || tOfB === 'boolean' || tOfB === 'string'  || b instanceof Number)) {
	            return a + b;
	        }
	        if(a.constructor === Array && (tOfB === 'number' || tOfB === 'boolean' || tOfB === 'string' || b instanceof Number )){
	            a[0] = a[0] + b;
	            return a;
	        }
	        if((tOfA === 'number' || tOfA === 'boolean' || tOfA === 'string' || a instanceof Number ) && b .constructor === Array){
	            b[0] = a + b[0];
	            return b;
	        }
	        if(a.constructor === Array && b.constructor === Array){
	            var i = 0, lenA = a.length, lenB = b.length;
	            var retArr = [];
	            while(i<lenA || i < lenB){
	                if(typeof a[i] === 'number' && typeof b[i] === 'number'){
	                    retArr[i] = a[i] + b[i];
	                }else{
	                    retArr[i] = b[i] == undefined ? a[i] : a[i] || b[i];
	                }
	                i += 1;
	            }
	            return retArr;
	        }
	        return 0;
	    }
	    var add = sum;
	
	    function sub(a,b) {
	        var tOfA = typeof a;
	        var tOfB = typeof b;
	        if((tOfA === 'number' || tOfA === 'boolean' || tOfA === 'string' || a instanceof Number ) && (tOfB === 'number' || tOfB === 'boolean' || tOfB === 'string' || b instanceof Number )) {
	            return a - b;
	        }
	        if( a.constructor === Array && (tOfB === 'number' || tOfB === 'boolean' || tOfB === 'string' || b instanceof Number )){
	            a[0] = a[0] - b;
	            return a;
	        }
	        if((tOfA === 'number' || tOfA === 'boolean' || tOfA === 'string' || a instanceof Number ) &&  b.constructor === Array){
	            b[0] = a - b[0];
	            return b;
	        }
	        if(a.constructor === Array && b.constructor === Array){
	            var i = 0, lenA = a.length, lenB = b.length;
	            var retArr = [];
	            while(i<lenA || i < lenB){
	                if(typeof a[i] === 'number' && typeof b[i] === 'number'){
	                    retArr[i] = a[i] - b[i];
	                }else{
	                    retArr[i] = b[i] == undefined ? a[i] : a[i] || b[i];
	                }
	                i += 1;
	            }
	            return retArr;
	        }
	        return 0;
	    }
	
	    function mul(a,b) {
	        var tOfA = typeof a;
	        var tOfB = typeof b;
	        var arr;
	        if((tOfA === 'number' || tOfA === 'boolean' || tOfA === 'string' || a instanceof Number ) && (tOfB === 'number' || tOfB === 'boolean' || tOfB === 'string' || b instanceof Number )) {
	            return a * b;
	        }
	
	        var i, len;
	        if(a.constructor === Array && (tOfB === 'number' || tOfB === 'boolean' || tOfB === 'string' || b instanceof Number )){
	            len = a.length;
	            arr = Array.apply(null,{length:len});
	            for(i=0;i<len;i+=1){
	                arr[i] = a[i] * b;
	            }
	            return arr;
	        }
	        if((tOfA === 'number' || tOfA === 'boolean' || tOfA === 'string' || a instanceof Number ) && b.constructor === Array){
	            len = b.length;
	            arr = Array.apply(null,{length:len});
	            for(i=0;i<len;i+=1){
	                arr[i] = a * b[i];
	            }
	            return arr;
	        }
	        return 0;
	    }
	
	    function div(a,b) {
	        var tOfA = typeof a;
	        var tOfB = typeof b;
	        var arr;
	        if((tOfA === 'number' || tOfA === 'boolean' || tOfA === 'string' || a instanceof Number ) && (tOfB === 'number' || tOfB === 'boolean' || tOfB === 'string' || b instanceof Number )) {
	            return a / b;
	        }
	        var i, len;
	        if(a.constructor === Array && (tOfB === 'number' || tOfB === 'boolean' || tOfB === 'string' || b instanceof Number  )){
	            len = a.length;
	            arr = Array.apply(null,{length:len});
	            for(i=0;i<len;i+=1){
	                arr[i] = a[i] / b;
	            }
	            return arr;
	        }
	        if((tOfA === 'number' || tOfA === 'boolean' || tOfA === 'string' || a instanceof Number ) && b.constructor === Array){
	            len = b.length;
	            arr = Array.apply(null,{length:len});
	            for(i=0;i<len;i+=1){
	                arr[i] = a / b[i];
	            }
	            return arr;
	        }
	        return 0;
	    }
	
	    function clamp(num, min, max) {
	        if(min > max){
	            var mm = max;
	            max = min;
	            min = mm;
	        }
	        return Math.min(Math.max(num, min), max);
	    }
	
	    function radiansToDegrees(val) {
	        return val/degToRads;
	    }
	    var radians_to_degrees = radiansToDegrees;
	
	    function degreesToRadians(val) {
	        return val*degToRads;
	    }
	    var degrees_to_radians = radiansToDegrees;
	
	    var helperLengthArray = [0,0,0,0,0,0];
	
	    function length(arr1,arr2){
	        if(typeof arr1 === "number"){
	            arr2 = arr2 || 0;
	            return Math.abs(arr1 - arr2);
	        }
	        if(!arr2){
	            arr2 = helperLengthArray;
	        }
	        var i,len = Math.min(arr1.length,arr2.length);
	        var addedLength = 0;
	        for(i=0;i<len;i+=1){
	            addedLength += Math.pow(arr2[i]-arr1[i],2);
	        }
	        return Math.sqrt(addedLength);
	    }
	
	    function normalize(vec){
	        return div(vec, length(vec));
	    }
	
	    function rgbToHsl(val){
	        var r = val[0]; var g = val[1]; var b = val[2];
	        var max = Math.max(r, g, b), min = Math.min(r, g, b);
	        var h, s, l = (max + min) / 2;
	
	        if(max == min){
	            h = s = 0; // achromatic
	        }else{
	            var d = max - min;
	            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	            switch(max){
	                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	                case g: h = (b - r) / d + 2; break;
	                case b: h = (r - g) / d + 4; break;
	            }
	            h /= 6;
	        }
	
	        return [h, s, l,val[3]];
	    }
	    function hslToRgb(val){
	        var h = val[0];
	        var s = val[1];
	        var l = val[2];
	
	        var r, g, b;
	
	        if(s == 0){
	            r = g = b = l; // achromatic
	        }else{
	            function hue2rgb(p, q, t){
	                if(t < 0) t += 1;
	                if(t > 1) t -= 1;
	                if(t < 1/6) return p + (q - p) * 6 * t;
	                if(t < 1/2) return q;
	                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	                return p;
	            }
	
	            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	            var p = 2 * l - q;
	            r = hue2rgb(p, q, h + 1/3);
	            g = hue2rgb(p, q, h);
	            b = hue2rgb(p, q, h - 1/3);
	        }
	
	        return [r, g , b, val[3]];
	    }
	
	    function linear(t, tMin, tMax, value1, value2){
	        if(value1 === undefined || value2 === undefined){
	            return linear(t,0,1,tMin,tMax);
	        }
	        if(t <= tMin) {
	            return value1;
	        }else if(t >= tMax){
	            return value2;
	        }
	        var perc = tMax === tMin ? 0 : (t-tMin)/(tMax-tMin);
	        if(!value1.length){
	            return value1 + (value2-value1)*perc;
	        }
	        var i, len = value1.length;
	        var arr = Array.apply( null, { length: len } );
	        for(i=0;i<len;i+=1){
	            arr[i] = value1[i] + (value2[i]-value1[i])*perc;
	        }
	        return arr;
	    }
	    function random(min,max){
	        if(max === undefined){
	            if(min === undefined){
	                min = 0;
	                max = 1;
	            } else {
	                max = min;
	                min = undefined;
	            }
	        }
	        if(max.length){
	            var i, len = max.length;
	            if(!min){
	                min = Array.apply(null,{length:len});
	            }
	            var arr = Array.apply(null,{length:len});
	            var rnd = BMMath.random();
	            for(i=0;i<len;i+=1){
	                arr[i] = min[i] + rnd*(max[i]-min[i])
	            }
	            return arr;
	        }
	        if(min === undefined){
	            min = 0;
	        }
	        var rndm = BMMath.random();
	        return min + rndm*(max-min);
	    }
	
	    function initiateExpression(elem,data,property){
	        var val = data.x;
	        var needsVelocity = /velocity(?![\w\d])/.test(val);
	        var _needsRandom = val.indexOf('random') !== -1;
	        var elemType = elem.data.ty;
	        var transform,content,effect;
	        var thisComp = elem.comp;
	        var thisProperty = property;
	        elem.comp.frameDuration = 1/elem.comp.globalData.frameRate;
	        var inPoint = elem.data.ip/elem.comp.globalData.frameRate;
	        var outPoint = elem.data.op/elem.comp.globalData.frameRate;
	        var thisLayer,thisComp;
	        var fn = new Function();
	        //var fnStr = 'var fn = function(){'+val+';this.v = $bm_rt;}';
	        //eval(fnStr);
	        var fn = eval('[function(){' + val+';this.v = $bm_rt;}' + ']')[0];
	        var bindedFn = fn.bind(this);
	        var numKeys = property.kf ? data.k.length : 0;
	
	        var wiggle = function wiggle(freq,amp){
	            var i,j, len = this.pv.length ? this.pv.length : 1;
	            var addedAmps = Array.apply(null,{len:len});
	            for(j=0;j<len;j+=1){
	                addedAmps[j] = 0;
	            }
	            freq = 5;
	            var iterations = Math.floor(time*freq);
	            i = 0;
	            j = 0;
	            while(i<iterations){
	                //var rnd = BMMath.random();
	                for(j=0;j<len;j+=1){
	                    addedAmps[j] += -amp + amp*2*BMMath.random();
	                    //addedAmps[j] += -amp + amp*2*rnd;
	                }
	                i += 1;
	            }
	            //var rnd2 = BMMath.random();
	            var periods = time*freq;
	            var perc = periods - Math.floor(periods);
	            var arr = Array.apply({length:len});
	            if(len>1){
	                for(j=0;j<len;j+=1){
	                    arr[j] = this.pv[j] + addedAmps[j] + (-amp + amp*2*BMMath.random())*perc;
	                    //arr[j] = this.pv[j] + addedAmps[j] + (-amp + amp*2*rnd)*perc;
	                    //arr[i] = this.pv[i] + addedAmp + amp1*perc + amp2*(1-perc);
	                }
	                return arr;
	            } else {
	                return this.pv + addedAmps[0] + (-amp + amp*2*BMMath.random())*perc;
	            }
	        }.bind(this);
	
	        var loopIn = function loopIn(type,duration, durationFlag) {
	            if(!this.k){
	                return this.pv;
	            }
	            var currentFrame = time*elem.comp.globalData.frameRate;
	            var keyframes = this.keyframes;
	            var firstKeyFrame = keyframes[0].t;
	            if(currentFrame>=firstKeyFrame){
	                return this.pv;
	            }else{
	                var cycleDuration, lastKeyFrame;
	                if(!durationFlag){
	                    if(!duration || duration > keyframes.length - 1){
	                        duration = keyframes.length - 1;
	                    }
	                    lastKeyFrame = keyframes[duration].t;
	                    cycleDuration = lastKeyFrame - firstKeyFrame;
	                } else {
	                    if(!duration){
	                        cycleDuration = Math.max(0,this.elem.data.op - firstKeyFrame);
	                    } else {
	                        cycleDuration = Math.abs(elem.comp.globalData.frameRate*duration);
	                    }
	                    lastKeyFrame = firstKeyFrame + cycleDuration;
	                }
	                var i, len, ret;
	                if(type === 'pingpong') {
	                    var iterations = Math.floor((firstKeyFrame - currentFrame)/cycleDuration);
	                    if(iterations % 2 === 0){
	                        return this.getValueAtTime(((firstKeyFrame - currentFrame)%cycleDuration +  firstKeyFrame) / this.comp.globalData.frameRate, 0);
	                    }
	                } else if(type === 'offset'){
	                    var initV = this.getValueAtTime(firstKeyFrame / this.comp.globalData.frameRate, 0);
	                    var endV = this.getValueAtTime(lastKeyFrame / this.comp.globalData.frameRate, 0);
	                    var current = this.getValueAtTime((cycleDuration - (firstKeyFrame - currentFrame)%cycleDuration +  firstKeyFrame) / this.comp.globalData.frameRate, 0);
	                    var repeats = Math.floor((firstKeyFrame - currentFrame)/cycleDuration)+1;
	                    if(this.pv.length){
	                        ret = new Array(initV.length);
	                        len = ret.length;
	                        for(i=0;i<len;i+=1){
	                            ret[i] = current[i]-(endV[i]-initV[i])*repeats;
	                        }
	                        return ret;
	                    }
	                    return current-(endV-initV)*repeats;
	                } else if(type === 'continue'){
	                    var firstValue = this.getValueAtTime(firstKeyFrame / this.comp.globalData.frameRate, 0);
	                    var nextFirstValue = this.getValueAtTime((firstKeyFrame + 0.001) / this.comp.globalData.frameRate, 0);
	                    if(this.pv.length){
	                        ret = new Array(firstValue.length);
	                        len = ret.length;
	                        for(i=0;i<len;i+=1){
	                            ret[i] = firstValue[i] + (firstValue[i]-nextFirstValue[i])*(firstKeyFrame - currentFrame)/0.001;
	                        }
	                        return ret;
	                    }
	                    return firstValue + (firstValue-nextFirstValue)*(firstKeyFrame - currentFrame)/0.001;
	                }
	                return this.getValueAtTime((cycleDuration - (firstKeyFrame - currentFrame) % cycleDuration +  firstKeyFrame) / this.comp.globalData.frameRate, 0);
	            }
	        }.bind(this);
	
	        var loopInDuration = function loopInDuration(type,duration){
	            return loopIn(type,duration,true);
	        }.bind(this);
	
	        var loopOut = function loopOut(type,duration,durationFlag){
	            if(!this.k || !this.keyframes){
	                return this.pv;
	            }
	            var currentFrame = time*elem.comp.globalData.frameRate;
	            var keyframes = this.keyframes;
	            var lastKeyFrame = keyframes[keyframes.length - 1].t;
	            if(currentFrame<=lastKeyFrame){
	                return this.pv;
	            }else{
	                var cycleDuration, firstKeyFrame;
	                if(!durationFlag){
	                    if(!duration || duration > keyframes.length - 1){
	                        duration = keyframes.length - 1;
	                    }
	                    firstKeyFrame = keyframes[keyframes.length - 1 - duration].t;
	                    cycleDuration = lastKeyFrame - firstKeyFrame;
	                } else {
	                    if(!duration){
	                        cycleDuration = Math.max(0,lastKeyFrame - this.elem.data.ip);
	                    } else {
	                        cycleDuration = Math.abs(lastKeyFrame - elem.comp.globalData.frameRate*duration);
	                    }
	                    firstKeyFrame = lastKeyFrame - cycleDuration;
	                }
	                var i, len, ret;
	                if(type === 'pingpong') {
	                    var iterations = Math.floor((currentFrame - firstKeyFrame)/cycleDuration);
	                    if(iterations % 2 !== 0){
	                        return this.getValueAtTime((cycleDuration - (currentFrame - firstKeyFrame) % cycleDuration +  firstKeyFrame) / this.comp.globalData.frameRate, 0);
	                    }
	                } else if(type === 'offset'){
	                    var initV = this.getValueAtTime(firstKeyFrame / this.comp.globalData.frameRate, 0);
	                    var endV = this.getValueAtTime(lastKeyFrame / this.comp.globalData.frameRate, 0);
	                    var current = this.getValueAtTime(((currentFrame - firstKeyFrame) % cycleDuration +  firstKeyFrame) / this.comp.globalData.frameRate, 0);
	                    var repeats = Math.floor((currentFrame - firstKeyFrame)/cycleDuration);
	                    if(this.pv.length){
	                        ret = new Array(initV.length);
	                        len = ret.length;
	                        for(i=0;i<len;i+=1){
	                            ret[i] = (endV[i]-initV[i])*repeats + current[i];
	                        }
	                        return ret;
	                    }
	                    return (endV-initV)*repeats + current;
	                } else if(type === 'continue'){
	                    var lastValue = this.getValueAtTime(lastKeyFrame / this.comp.globalData.frameRate, 0);
	                    var nextLastValue = this.getValueAtTime((lastKeyFrame - 0.001) / this.comp.globalData.frameRate, 0);
	                    if(this.pv.length){
	                        ret = new Array(lastValue.length);
	                        len = ret.length;
	                        for(i=0;i<len;i+=1){
	                            ret[i] = lastValue[i] + (lastValue[i]-nextLastValue[i])*((currentFrame - lastKeyFrame)/ this.comp.globalData.frameRate)/0.0005;
	                        }
	                        return ret;
	                    }
	                    return lastValue + (lastValue-nextLastValue)*(((currentFrame - lastKeyFrame))/0.001);
	                }
	                return this.getValueAtTime(((currentFrame - firstKeyFrame) % cycleDuration +  firstKeyFrame) / this.comp.globalData.frameRate, 0);
	            }
	        }.bind(this);
	        var loop_out = loopOut;
	
	        var loopOutDuration = function loopOutDuration(type,duration){
	            return loopOut(type,duration,true);
	        }.bind(this);
	
	        var valueAtTime = function valueAtTime(t) {
	            return this.getValueAtTime(t, 0);
	        }.bind(this);
	
	        var velocityAtTime = function velocityAtTime(t) {
	            return this.getVelocityAtTime(t);
	        }.bind(this);
	
	        var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);
	
	        function lookAt(elem1,elem2){
	            var fVec = [elem2[0]-elem1[0],elem2[1]-elem1[1],elem2[2]-elem1[2]];
	            var pitch = Math.atan2(fVec[0],Math.sqrt(fVec[1]*fVec[1]+fVec[2]*fVec[2]))/degToRads;
	            var yaw = -Math.atan2(fVec[1],fVec[2])/degToRads;
	            return [yaw,pitch,0];
	        }
	
	        function easeOut(t, val1, val2){
	            return -(val2-val1) * t*(t-2) + val1;
	        }
	
	        function nearestKey(time){
	            var i, len = data.k.length,index,keyTime;
	            if(!data.k.length || typeof(data.k[0]) === 'number'){
	                index = 0;
	                keyTime = 0;
	            } else {
	                index = -1;
	                time *= elem.comp.globalData.frameRate;
	                for(i=0;i<len-1;i+=1){
	                    if(time === data.k[i].t){
	                        index = i + 1;
	                        keyTime = data.k[i].t;
	                        break;
	                    }else if(time>data.k[i].t && time<data.k[i+1].t){
	                        if(time-data.k[i].t > data.k[i+1].t - time){
	                            index = i + 2;
	                            keyTime = data.k[i+1].t;
	                        } else {
	                            index = i + 1;
	                            keyTime = data.k[i].t;
	                        }
	                        break;
	                    }
	                }
	                if(index === -1){
	                    index = i + 1;
	                    keyTime = data.k[i].t;
	                }
	            }
	            var ob = {};
	            ob.index = index;
	            ob.time = keyTime/elem.comp.globalData.frameRate;
	            return ob;
	        }
	
	        function key(ind){
	            if(!data.k.length || typeof(data.k[0]) === 'number'){
	                return {time:0};
	            }
	            ind -= 1;
	            var ob = {
	                time: data.k[ind].t/elem.comp.globalData.frameRate
	            };
	            var arr;
	            if(ind === data.k.length - 1 && !data.k[ind].h){
	                arr = data.k[ind-1].e;
	            }else{
	                arr = data.k[ind].s;
	            }
	            var i, len = arr.length;
	            for(i=0;i<len;i+=1){
	                ob[i] = arr[i];
	            }
	            return ob;
	        }
	
	        function framesToTime(frames,fps){
	            if(!fps){
	                fps = elem.comp.globalData.frameRate;
	            }
	            return frames/fps;
	        }
	
	        function timeToFrames(t,fps){
	            if(!t){
	                t = time;
	            }
	            if(!fps){
	                fps = elem.comp.globalData.frameRate;
	            }
	            return t*fps;
	        }
	
	        var toworldMatrix = new Matrix();
	        function toWorld(arr){
	            toworldMatrix.reset();
	            elem.finalTransform.mProp.applyToMatrix(toworldMatrix);
	            if(elem.hierarchy && elem.hierarchy.length){
	                var i, len = elem.hierarchy.length;
	                for(i=0;i<len;i+=1){
	                    elem.hierarchy[i].finalTransform.mProp.applyToMatrix(toworldMatrix);
	                }
	                return toworldMatrix.applyToPointArray(arr[0],arr[1],arr[2]||0);
	            }
	            return toworldMatrix.applyToPointArray(arr[0],arr[1],arr[2]||0);
	        }
	
	        var fromworldMatrix = new Matrix();
	        function fromWorld(arr){
	            fromworldMatrix.reset();
	            var pts = [];
	            pts.push(arr);
	            elem.finalTransform.mProp.applyToMatrix(fromworldMatrix);
	            if(elem.hierarchy && elem.hierarchy.length){
	                var i, len = elem.hierarchy.length;
	                for(i=0;i<len;i+=1){
	                    elem.hierarchy[i].finalTransform.mProp.applyToMatrix(fromworldMatrix);
	                }
	                return fromworldMatrix.inversePoints(pts)[0];
	            }
	            return fromworldMatrix.inversePoints(pts)[0];
	        }
	
	        function seedRandom(seed){
	            BMMath.seedrandom(randSeed + seed);
	        };
	
	        var time,velocity, value,textIndex,textTotal,selectorValue;
	        var index = elem.data.ind;
	        var hasParent = !!(elem.hierarchy && elem.hierarchy.length);
	        var parent;
	        var randSeed = Math.floor(Math.random()*1000000);
	        function execute(){
	            if(_needsRandom){
	                seedRandom(randSeed);
	            }
	            if(this.frameExpressionId === elem.globalData.frameId && this.type !== 'textSelector'){
	                return;
	            }
	            if(this.lock){
	                this.v = duplicatePropertyValue(this.pv,this.mult);
	                return true;
	            }
	            if(this.type === 'textSelector'){
	                textIndex = this.textIndex;
	                textTotal = this.textTotal;
	                selectorValue = this.selectorValue;
	            }
	            if(!thisLayer){
	                thisLayer = elem.layerInterface;
	                thisComp = elem.comp.compInterface;
	            }
	            if(!transform){
	                transform = elem.layerInterface("ADBE Transform Group");
	            }
	            if(elemType === 4 && !content){
	                content = thisLayer("ADBE Root Vectors Group");
	            }
	            if(!effect){
	                effect = thisLayer(4);
	            }
	            hasParent = !!(elem.hierarchy && elem.hierarchy.length);
	            if(hasParent && !parent){
	                parent = elem.hierarchy[elem.hierarchy.length - 1].layerInterface;
	            }
	            this.lock = true;
	            if(this.getPreValue){
	                this.getPreValue();
	            }
	            value = this.pv;
	            time = this.comp.renderedFrame/this.comp.globalData.frameRate;
	            if(needsVelocity){
	                velocity = velocityAtTime(time);
	            }
	            bindedFn();
	            this.frameExpressionId = elem.globalData.frameId;
	            var i,len;
	            if(this.mult){
	                if(typeof this.v === 'number' || this.v instanceof Number || typeof this.v === 'string'){
	                    this.v *= this.mult;
	                }else if(this.v.length === 1){
	                    this.v = this.v[0] * this.mult;
	                }else{
	                    len = this.v.length;
	                    if(value === this.v){
	                        this.v = len === 2 ? [value[0],value[1]] : [value[0],value[1],value[2]];
	                    }
	                    for(i = 0; i < len; i += 1){
	                        this.v[i] *= this.mult;
	                    }
	                }
	            }
	
	            if(this.v.length === 1){
	                this.v = this.v[0];
	            }
	            if(typeof this.v === 'number' || this.v instanceof Number || typeof this.v === 'string'){
	                if(this.lastValue !== this.v){
	                    this.lastValue = this.v;
	                    this.mdf = true;
	                }
	            }else if(this.v._length){
	                if(!shapesEqual(this.v,this.localShapeCollection.shapes[0])){
	                    this.mdf = true;
	                    this.localShapeCollection.releaseShapes();
	                    this.localShapeCollection.addShape(shape_pool.clone(this.v));
	                }
	            }else{
	                len = this.v.length;
	                for(i = 0; i < len; i += 1){
	                    if(this.v[i] !== this.lastValue[i]){
	                        this.lastValue[i] = this.v[i];
	                        this.mdf = true;
	                    }
	                }
	            }
	            this.lock = false;
	        }
	        return execute;
	    }
	
	    ob.initiateExpression = initiateExpression;
	    return ob;
	}());
	var ShapeExpressionInterface = (function(){
	    var ob = {
	        createShapeInterface:createShapeInterface,
	        createGroupInterface:createGroupInterface,
	        createTrimInterface:createTrimInterface,
	        createStrokeInterface:createStrokeInterface,
	        createTransformInterface:createTransformInterface,
	        createEllipseInterface:createEllipseInterface,
	        createStarInterface:createStarInterface,
	        createRectInterface:createRectInterface,
	        createRoundedInterface:createRoundedInterface,
	        createRepatearInterface:createRepatearInterface,
	        createPathInterface:createPathInterface,
	        createFillInterface:createFillInterface
	    };
	    function createShapeInterface(shapes,view,propertyGroup){
	        return shapeInterfaceFactory(shapes,view,propertyGroup);
	    }
	    function createGroupInterface(shapes,view,propertyGroup){
	        return groupInterfaceFactory(shapes,view,propertyGroup);
	    }
	    function createFillInterface(shape,view,propertyGroup){
	        return fillInterfaceFactory(shape,view,propertyGroup);
	    }
	    function createStrokeInterface(shape,view,propertyGroup){
	        return strokeInterfaceFactory(shape,view,propertyGroup);
	    }
	    function createTrimInterface(shape,view,propertyGroup){
	        return trimInterfaceFactory(shape,view,propertyGroup);
	    }
	    function createTransformInterface(shape,view,propertyGroup){
	        return transformInterfaceFactory(shape,view,propertyGroup);
	    }
	    function createEllipseInterface(shape,view,propertyGroup){
	        return ellipseInterfaceFactory(shape,view,propertyGroup);
	    }
	    function createStarInterface(shape,view,propertyGroup){
	        return starInterfaceFactory(shape,view,propertyGroup);
	    }
	    function createRectInterface(shape,view,propertyGroup){
	        return rectInterfaceFactory(shape,view,propertyGroup);
	    }
	    function createRoundedInterface(shape,view,propertyGroup){
	        return roundedInterfaceFactory(shape,view,propertyGroup);
	    }
	    function createRepatearInterface(shape,view,propertyGroup){
	        return repeaterInterfaceFactory(shape,view,propertyGroup);
	    }
	    function createPathInterface(shape,view,propertyGroup){
	        return pathInterfaceFactory(shape,view,propertyGroup);
	    }
	
	    function iterateElements(shapes,view, propertyGroup){
	        var arr = [];
	        var i, len = shapes ? shapes.length : 0;
	        for(i=0;i<len;i+=1){
	            if(shapes[i].ty == 'gr'){
	                arr.push(ShapeExpressionInterface.createGroupInterface(shapes[i],view[i],propertyGroup));
	            }else if(shapes[i].ty == 'fl'){
	                arr.push(ShapeExpressionInterface.createFillInterface(shapes[i],view[i],propertyGroup));
	            }else if(shapes[i].ty == 'st'){
	                arr.push(ShapeExpressionInterface.createStrokeInterface(shapes[i],view[i],propertyGroup));
	            }else if(shapes[i].ty == 'tm'){
	                arr.push(ShapeExpressionInterface.createTrimInterface(shapes[i],view[i],propertyGroup));
	            }else if(shapes[i].ty == 'tr'){
	                //arr.push(ShapeExpressionInterface.createTransformInterface(shapes[i],view[i],propertyGroup));
	            }else if(shapes[i].ty == 'el'){
	                arr.push(ShapeExpressionInterface.createEllipseInterface(shapes[i],view[i],propertyGroup));
	            }else if(shapes[i].ty == 'sr'){
	                arr.push(ShapeExpressionInterface.createStarInterface(shapes[i],view[i],propertyGroup));
	            } else if(shapes[i].ty == 'sh'){
	                arr.push(ShapeExpressionInterface.createPathInterface(shapes[i],view[i],propertyGroup));
	            } else if(shapes[i].ty == 'rc'){
	                arr.push(ShapeExpressionInterface.createRectInterface(shapes[i],view[i],propertyGroup));
	            } else if(shapes[i].ty == 'rd'){
	                arr.push(ShapeExpressionInterface.createRoundedInterface(shapes[i],view[i],propertyGroup));
	            } else if(shapes[i].ty == 'rp'){
	                arr.push(ShapeExpressionInterface.createRepatearInterface(shapes[i],view[i],propertyGroup));
	            } else{
	                //console.log(shapes[i].ty);
	            }
	        }
	        return arr;
	    }
	
	    var shapeInterfaceFactory = (function(){
	        return function(shapes,view,propertyGroup){
	            var interfaces;
	            function _interfaceFunction(value){
	                if(typeof value === 'number'){
	                    return interfaces[value-1];
	                } else {
	                    var i = 0, len = interfaces.length;
	                    while(i<len){
	                        if(interfaces[i]._name === value){
	                            return interfaces[i];
	                        }
	                        i+=1;
	                    }
	                }
	            }
	            _interfaceFunction.propertyGroup = propertyGroup;
	            interfaces = iterateElements(shapes, view, _interfaceFunction);
	            return _interfaceFunction;
	        }
	    }());
	
	    var contentsInterfaceFactory = (function(){
	       return function(shape,view, propertyGroup){
	           var interfaces;
	           var interfaceFunction = function _interfaceFunction(value){
	               var i = 0, len = interfaces.length;
	                while(i<len){
	                    if(interfaces[i]._name === value || interfaces[i].mn === value || interfaces[i].propertyIndex === value || interfaces[i].ix === value || interfaces[i].ind === value){
	                       return interfaces[i];
	                    }
	                    i+=1;
	                }
	                if(typeof value === 'number'){
	                   return interfaces[value-1];
	                }
	           };
	           interfaceFunction.propertyGroup = function(val){
	               if(val === 1){
	                   return interfaceFunction;
	               } else{
	                   return propertyGroup(val-1);
	               }
	           };
	           interfaces = iterateElements(shape.it, view.it, interfaceFunction.propertyGroup);
	           interfaceFunction.numProperties = interfaces.length;
	           interfaceFunction.propertyIndex = shape.cix;
	
	           return interfaceFunction;
	       }
	    }());
	
	    var groupInterfaceFactory = (function(){
	        return function(shape,view, propertyGroup){
	            var interfaceFunction = function _interfaceFunction(value){
	                switch(value){
	                    case 'ADBE Vectors Group':
	                    case 'Contents':
	                    case 2:
	                        return interfaceFunction.content;
	                    case 'ADBE Vector Transform Group':
	                    case 3:
	                    default:
	                        return interfaceFunction.transform;
	                }
	                /*if(value === 'ADBE Vector Transform Group'){
	                    return interfaceFunction.transform;
	                    var i = 0, len = interfaces.length;
	                    while(i<len){
	                        if(interfaces[i].ty === 'tr'){
	                            return interfaces[i];
	                        }
	                        i+=1;
	                    }
	                    return null;
	                }
	                if(typeof value === 'number'){
	                    return interfaces[value-1];
	                } else {
	                    var i = 0, len = interfaces.length;
	                    while(i<len){
	                        if(interfaces[i]._name === value){
	                            return interfaces[i];
	                        }
	                        i+=1;
	                    }
	                }*/
	            }
	            interfaceFunction.propertyGroup = function(val){
	                if(val === 1){
	                    return interfaceFunction;
	                } else{
	                    return propertyGroup(val-1);
	                }
	            };
	            var content = contentsInterfaceFactory(shape,view,interfaceFunction.propertyGroup);
	            var transformInterface = ShapeExpressionInterface.createTransformInterface(shape.it[shape.it.length - 1],view.it[view.it.length - 1],interfaceFunction.propertyGroup);
	            interfaceFunction.content = content;
	            interfaceFunction.transform = transformInterface;
	            Object.defineProperty(interfaceFunction, '_name', {
	                get: function(){
	                    return shape.nm;
	                }
	            });
	            //interfaceFunction.content = interfaceFunction;
	            interfaceFunction.numProperties = shape.np;
	            interfaceFunction.propertyIndex = shape.ix;
	            interfaceFunction.nm = shape.nm;
	            interfaceFunction.mn = shape.mn;
	            return interfaceFunction;
	        }
	    }());
	
	    var fillInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	
	            function interfaceFunction(val){
	                if(val === 'Color' || val === 'color'){
	                    return interfaceFunction.color;
	                } else if(val === 'Opacity' || val === 'opacity'){
	                    return interfaceFunction.opacity;
	                }
	            }
	            Object.defineProperty(interfaceFunction, 'color', {
	                get: function(){
	                    return ExpressionValue(view.c, 1 / view.c.mult, 'color');
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'opacity', {
	                get: function(){
	                    return ExpressionValue(view.o, 100);
	                }
	            });
	            Object.defineProperty(interfaceFunction, '_name', { value: shape.nm });
	            Object.defineProperty(interfaceFunction, 'mn', { value: shape.mn });
	
	            view.c.setGroupProperty(propertyGroup);
	            view.o.setGroupProperty(propertyGroup);
	            return interfaceFunction;
	        }
	    }());
	
	    var strokeInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	            function _propertyGroup(val){
	                if(val === 1){
	                    return ob;
	                } else{
	                    return propertyGroup(val-1);
	                }
	            };
	            function _dashPropertyGroup(val){
	                if(val === 1){
	                    return dashOb;
	                } else{
	                    return _propertyGroup(val-1);
	                }
	            };
	            function addPropertyToDashOb(i) {
	                Object.defineProperty(dashOb, shape.d[i].nm, {
	                    get: function(){
	                        return ExpressionValue(view.d.dataProps[i].p)
	                    }
	                });
	            }
	            var i, len = shape.d ? shape.d.length : 0;
	            var dashOb = {}
	            for (i = 0; i < len; i += 1) {
	                addPropertyToDashOb(i);
	                view.d.dataProps[i].p.setGroupProperty(_dashPropertyGroup);
	            }
	
	            function interfaceFunction(val){
	                if(val === 'Color' || val === 'color'){
	                    return interfaceFunction.color;
	                } else if(val === 'Opacity' || val === 'opacity'){
	                    return interfaceFunction.opacity;
	                } else if(val === 'Stroke Width' || val === 'stroke width'){
	                    return interfaceFunction.strokeWidth;
	                }
	            }
	            Object.defineProperty(interfaceFunction, 'color', {
	                get: function(){
	                    return ExpressionValue(view.c, 1 / view.c.mult, 'color');
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'opacity', {
	                get: function(){
	                    return ExpressionValue(view.o, 100);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'strokeWidth', {
	                get: function(){
	                    return ExpressionValue(view.w);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'dash', {
	                get: function(){
	                    return dashOb;
	                }
	            });
	            Object.defineProperty(interfaceFunction, '_name', { value: shape.nm });
	            Object.defineProperty(interfaceFunction, 'mn', { value: shape.mn });
	
	            view.c.setGroupProperty(_propertyGroup);
	            view.o.setGroupProperty(_propertyGroup);
	            view.w.setGroupProperty(_propertyGroup);
	            return interfaceFunction;
	        }
	    }());
	
	    var trimInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	            function _propertyGroup(val){
	                if(val == 1){
	                    return interfaceFunction;
	                } else {
	                    return propertyGroup(--val);
	                }
	            }
	            interfaceFunction.propertyIndex = shape.ix;
	
	            view.s.setGroupProperty(_propertyGroup);
	            view.e.setGroupProperty(_propertyGroup);
	            view.o.setGroupProperty(_propertyGroup);
	
	            function interfaceFunction(val){
	                if(val === shape.e.ix || val === 'End' || val === 'end'){
	                    return interfaceFunction.end;
	                }
	                if(val === shape.s.ix){
	                    return interfaceFunction.start;
	                }
	                if(val === shape.o.ix){
	                    return interfaceFunction.offset;
	                }
	            }
	            interfaceFunction.propertyIndex = shape.ix;
	            Object.defineProperty(interfaceFunction, 'start', {
	                get: function(){
	                    return ExpressionValue(view.s, 1 / view.s.mult);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'end', {
	                get: function(){
	                    return ExpressionValue(view.e, 1 / view.e.mult);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'offset', {
	                get: function(){
	                    return ExpressionValue(view.o);
	                }
	            });
	            Object.defineProperty(interfaceFunction, '_name', {
	                get: function(){
	                    return shape.nm;
	                }
	            });
	            interfaceFunction.mn = shape.mn;
	            return interfaceFunction;
	        }
	    }());
	
	    var transformInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	            function _propertyGroup(val){
	                if(val == 1){
	                    return interfaceFunction;
	                } else {
	                    return propertyGroup(--val);
	                }
	            }
	            view.transform.mProps.o.setGroupProperty(_propertyGroup);
	            view.transform.mProps.p.setGroupProperty(_propertyGroup);
	            view.transform.mProps.a.setGroupProperty(_propertyGroup);
	            view.transform.mProps.s.setGroupProperty(_propertyGroup);
	            view.transform.mProps.r.setGroupProperty(_propertyGroup);
	            if(view.transform.mProps.sk){
	                view.transform.mProps.sk.setGroupProperty(_propertyGroup);
	                view.transform.mProps.sa.setGroupProperty(_propertyGroup);
	            }
	            view.transform.op.setGroupProperty(_propertyGroup);
	
	            function interfaceFunction(value){
	                if(shape.a.ix === value){
	                    return interfaceFunction.anchorPoint;
	                }
	                if(shape.o.ix === value){
	                    return interfaceFunction.opacity;
	                }
	                if(shape.p.ix === value){
	                    return interfaceFunction.position;
	                }
	                if(shape.r.ix === value){
	                    return interfaceFunction.rotation;
	                }
	                if(shape.s.ix === value){
	                    return interfaceFunction.scale;
	                }
	                if(shape.sk && shape.sk.ix === value){
	                    return interfaceFunction.skew;
	                }
	                if(shape.sa && shape.sa.ix === value){
	                    return interfaceFunction.skewAxis;
	                }
	                if(value === 'Opacity') {
	                    return interfaceFunction.opacity;
	                }
	                if(value === 'Position') {
	                    return interfaceFunction.position;
	                }
	                if(value === 'Anchor Point') {
	                    return interfaceFunction.anchorPoint;
	                }
	                if(value === 'Scale') {
	                    return interfaceFunction.scale;
	                }
	                if(value === 'Rotation' || value === 'ADBE Vector Rotation') {
	                    return interfaceFunction.rotation;
	                }
	                if(value === 'Skew') {
	                    return interfaceFunction.skew;
	                }
	                if(value === 'Skew Axis') {
	                    return interfaceFunction.skewAxis;
	                }
	
	            }
	            Object.defineProperty(interfaceFunction, 'opacity', {
	                get: function(){
	                    return ExpressionValue(view.transform.mProps.o, 1/view.transform.mProps.o.mult);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'position', {
	                get: function(){
	                    return ExpressionValue(view.transform.mProps.p);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'anchorPoint', {
	                get: function(){
	                    return ExpressionValue(view.transform.mProps.a);
	                }
	            });
	            var scaleArray = [];
	            Object.defineProperty(interfaceFunction, 'scale', {
	                get: function(){
	                    return ExpressionValue(view.transform.mProps.s, 1 / view.transform.mProps.s.mult);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'rotation', {
	                get: function(){
	                    return ExpressionValue(view.transform.mProps.r, 1 / view.transform.mProps.r.mult);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'skew', {
	                get: function(){
	                    return ExpressionValue(view.transform.mProps.sk);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'skewAxis', {
	                get: function(){
	                    return ExpressionValue(view.transform.mProps.sa);
	                }
	            });
	            Object.defineProperty(interfaceFunction, '_name', {
	                get: function(){
	                    return shape.nm;
	                }
	            });
	            interfaceFunction.ty = 'tr';
	            interfaceFunction.mn = shape.mn;
	            return interfaceFunction;
	        }
	    }());
	
	    var ellipseInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	            function _propertyGroup(val){
	                if(val == 1){
	                    return interfaceFunction;
	                } else {
	                    return propertyGroup(--val);
	                }
	            }
	            interfaceFunction.propertyIndex = shape.ix;
	            var prop = view.sh.ty === 'tm' ? view.sh.prop : view.sh;
	            prop.s.setGroupProperty(_propertyGroup);
	            prop.p.setGroupProperty(_propertyGroup);
	            function interfaceFunction(value){
	                if(shape.p.ix === value){
	                    return interfaceFunction.position;
	                }
	                if(shape.s.ix === value){
	                    return interfaceFunction.size;
	                }
	            }
	            Object.defineProperty(interfaceFunction, 'size', {
	                get: function(){
	                    return ExpressionValue(prop.s);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'position', {
	                get: function(){
	                    return ExpressionValue(prop.p);
	                }
	            });
	            Object.defineProperty(interfaceFunction, '_name', {
	                get: function(){
	                    return shape.nm;
	                }
	            });
	            interfaceFunction.mn = shape.mn;
	            return interfaceFunction;
	        }
	    }());
	
	    var starInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	            function _propertyGroup(val){
	                if(val == 1){
	                    return interfaceFunction;
	                } else {
	                    return propertyGroup(--val);
	                }
	            }
	            var prop = view.sh.ty === 'tm' ? view.sh.prop : view.sh;
	            interfaceFunction.propertyIndex = shape.ix;
	            prop.or.setGroupProperty(_propertyGroup);
	            prop.os.setGroupProperty(_propertyGroup);
	            prop.pt.setGroupProperty(_propertyGroup);
	            prop.p.setGroupProperty(_propertyGroup);
	            prop.r.setGroupProperty(_propertyGroup);
	            if(shape.ir){
	                prop.ir.setGroupProperty(_propertyGroup);
	                prop.is.setGroupProperty(_propertyGroup);
	            }
	
	            function interfaceFunction(value){
	                if(shape.p.ix === value){
	                    return interfaceFunction.position;
	                }
	                if(shape.r.ix === value){
	                    return interfaceFunction.rotation;
	                }
	                if(shape.pt.ix === value){
	                    return interfaceFunction.points;
	                }
	                if(shape.or.ix === value || 'ADBE Vector Star Outer Radius' === value){
	                    return interfaceFunction.outerRadius;
	                }
	                if(shape.os.ix === value){
	                    return interfaceFunction.outerRoundness;
	                }
	                if(shape.ir && (shape.ir.ix === value || 'ADBE Vector Star Inner Radius' === value)){
	                    return interfaceFunction.innerRadius;
	                }
	                if(shape.is && shape.is.ix === value){
	                    return interfaceFunction.innerRoundness;
	                }
	
	            }
	            Object.defineProperty(interfaceFunction, 'position', {
	                get: function(){
	                    return ExpressionValue(prop.p);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'rotation', {
	                get: function(){
	                    return ExpressionValue(prop.r, 1 / prop.r.mult);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'points', {
	                get: function(){
	                    return ExpressionValue(prop.pt);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'outerRadius', {
	                get: function(){
	                    return ExpressionValue(prop.or);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'outerRoundness', {
	                get: function(){
	                    return ExpressionValue(prop.os);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'innerRadius', {
	                get: function(){
	                    if(!prop.ir){
	                        return 0;
	                    }
	                    return ExpressionValue(prop.ir);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'innerRoundness', {
	                get: function(){
	                    if(!prop.is){
	                        return 0;
	                    }
	                    return ExpressionValue(prop.is, 1 / prop.is.mult);
	                }
	            });
	            Object.defineProperty(interfaceFunction, '_name', {
	                get: function(){
	                    return shape.nm;
	                }
	            });
	            interfaceFunction.mn = shape.mn;
	            return interfaceFunction;
	        }
	    }());
	
	    var rectInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	            function _propertyGroup(val){
	                if(val == 1){
	                    return interfaceFunction;
	                } else {
	                    return propertyGroup(--val);
	                }
	            }
	            var prop = view.sh.ty === 'tm' ? view.sh.prop : view.sh;
	            interfaceFunction.propertyIndex = shape.ix;
	            prop.p.setGroupProperty(_propertyGroup);
	            prop.s.setGroupProperty(_propertyGroup);
	            prop.r.setGroupProperty(_propertyGroup);
	
	            function interfaceFunction(value){
	                if(shape.p.ix === value){
	                    return interfaceFunction.position;
	                }
	                if(shape.r.ix === value){
	                    return interfaceFunction.rotation;
	                }
	                if(shape.pt.ix === value){
	                    return interfaceFunction.points;
	                }
	                if(shape.or.ix === value || 'ADBE Vector Star Outer Radius' === value){
	                    return interfaceFunction.outerRadius;
	                }
	                if(shape.os.ix === value){
	                    return interfaceFunction.outerRoundness;
	                }
	                if(shape.ir && (shape.ir.ix === value || 'ADBE Vector Star Inner Radius' === value)){
	                    return interfaceFunction.innerRadius;
	                }
	                if(shape.is && shape.is.ix === value){
	                    return interfaceFunction.innerRoundness;
	                }
	
	            }
	            Object.defineProperty(interfaceFunction, 'position', {
	                get: function(){
	                    return ExpressionValue(prop.p);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'roundness', {
	                get: function(){
	                    return ExpressionValue(prop.r);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'size', {
	                get: function(){
	                    return ExpressionValue(prop.s);
	                }
	            });
	
	            Object.defineProperty(interfaceFunction, '_name', {
	                get: function(){
	                    return shape.nm;
	                }
	            });
	            interfaceFunction.mn = shape.mn;
	            return interfaceFunction;
	        }
	    }());
	
	    var roundedInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	            function _propertyGroup(val){
	                if(val == 1){
	                    return interfaceFunction;
	                } else {
	                    return propertyGroup(--val);
	                }
	            }
	            var prop = view;
	            interfaceFunction.propertyIndex = shape.ix;
	            prop.rd.setGroupProperty(_propertyGroup);
	
	            function interfaceFunction(value){
	                if(shape.r.ix === value || 'Round Corners 1' === value){
	                    return interfaceFunction.radius;
	                }
	
	            }
	            Object.defineProperty(interfaceFunction, 'radius', {
	                get: function(){
	                    return ExpressionValue(prop.rd);
	                }
	            });
	
	            Object.defineProperty(interfaceFunction, '_name', {
	                get: function(){
	                    return shape.nm;
	                }
	            });
	            interfaceFunction.mn = shape.mn;
	            return interfaceFunction;
	        }
	    }());
	
	    var repeaterInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	            function _propertyGroup(val){
	                if(val == 1){
	                    return interfaceFunction;
	                } else {
	                    return propertyGroup(--val);
	                }
	            }
	            var prop = view;
	            interfaceFunction.propertyIndex = shape.ix;
	            prop.c.setGroupProperty(_propertyGroup);
	            prop.o.setGroupProperty(_propertyGroup);
	
	            function interfaceFunction(value){
	                if(shape.c.ix === value || 'Copies' === value){
	                    return interfaceFunction.copies;
	                } else if(shape.o.ix === value || 'Offset' === value){
	                    return interfaceFunction.offset;
	                }
	
	            }
	            Object.defineProperty(interfaceFunction, 'copies', {
	                get: function(){
	                    return ExpressionValue(prop.c);
	                }
	            });
	
	            Object.defineProperty(interfaceFunction, 'offset', {
	                get: function(){
	                    return ExpressionValue(prop.o);
	                }
	            });
	
	            Object.defineProperty(interfaceFunction, '_name', {
	                get: function(){
	                    return shape.nm;
	                }
	            });
	            interfaceFunction.mn = shape.mn;
	            return interfaceFunction;
	        }
	    }());
	
	    var pathInterfaceFactory = (function(){
	        return function(shape,view,propertyGroup){
	            var prop = view.sh.ty === 'tm' ? view.sh.prop : view.sh;
	            function _propertyGroup(val){
	                if(val == 1){
	                    return interfaceFunction;
	                } else {
	                    return propertyGroup(--val);
	                }
	            }
	            prop.setGroupProperty(_propertyGroup);
	
	            function interfaceFunction(val){
	                if(val === 'Shape' || val === 'shape' || val === 'Path' || val === 'path'){
	                    return interfaceFunction.path;
	                }
	            }
	            Object.defineProperty(interfaceFunction, 'path', {
	                get: function(){
	                    if(prop.k){
	                        prop.getValue();
	                    }
	                    return prop.v;
	                    //return shape_pool.clone(prop.v);
	                }
	            });
	            Object.defineProperty(interfaceFunction, 'shape', {
	                get: function(){
	                    if(prop.k){
	                        prop.getValue();
	                    }
	                    return prop.v;
	                    //return shape_pool.clone(prop.v);
	                }
	            });
	            Object.defineProperty(interfaceFunction, '_name', { value: shape.nm });
	            Object.defineProperty(interfaceFunction, 'ix', { value: shape.ix });
	            Object.defineProperty(interfaceFunction, 'mn', { value: shape.mn });
	            return interfaceFunction;
	        }
	    }());
	
	
	    return ob;
	}())
	
	var TextExpressionInterface = (function(){
		return function(elem){
	        function _thisLayerFunction(){
	        }
	        Object.defineProperty(_thisLayerFunction, "sourceText", {
	            get: function(){
	            	if(!elem.currentTextDocumentData.t) {
	            		return ''
	            	}
	                return elem.currentTextDocumentData.t;
	            }
	        });
	        return _thisLayerFunction;
	    }
	}())
	var LayerExpressionInterface = (function (){
	    function toWorld(arr){
	        var toWorldMat = new Matrix();
	        toWorldMat.reset();
	        this._elem.finalTransform.mProp.applyToMatrix(toWorldMat);
	        if(this._elem.hierarchy && this._elem.hierarchy.length){
	            var i, len = this._elem.hierarchy.length;
	            for(i=0;i<len;i+=1){
	                this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(toWorldMat);
	            }
	            return toWorldMat.applyToPointArray(arr[0],arr[1],arr[2]||0);
	        }
	        return toWorldMat.applyToPointArray(arr[0],arr[1],arr[2]||0);
	    }
	
	
	    return function(elem){
	
	        var transformInterface = TransformExpressionInterface(elem.transform);
	
	        function _registerMaskInterface(maskManager){
	            _thisLayerFunction.mask = maskManager.getMask.bind(maskManager);
	        }
	        function _registerEffectsInterface(effects){
	            _thisLayerFunction.effect = effects;
	        }
	
	        function _thisLayerFunction(name){
	            switch(name){
	                case "ADBE Root Vectors Group":
	                case "Contents":
	                case 2:
	                    return _thisLayerFunction.shapeInterface;
	                case 1:
	                case "Transform":
	                case "transform":
	                case "ADBE Transform Group":
	                    return transformInterface;
	                case 4:
	                case "ADBE Effect Parade":
	                    return _thisLayerFunction.effect;
	            }
	        }
	        _thisLayerFunction.toWorld = toWorld;
	        _thisLayerFunction.toComp = toWorld;
	        _thisLayerFunction._elem = elem;
	        Object.defineProperty(_thisLayerFunction, 'hasParent', {
	            get: function(){
	                return !!elem.hierarchy;
	            }
	        });
	        Object.defineProperty(_thisLayerFunction, 'parent', {
	            get: function(){
	                return elem.hierarchy[0].layerInterface;
	            }
	        });
	        Object.defineProperty(_thisLayerFunction, "rotation", {
	            get: function(){
	                return transformInterface.rotation;
	            }
	        });
	        Object.defineProperty(_thisLayerFunction, "scale", {
	            get: function () {
	                return transformInterface.scale;
	            }
	        });
	
	        Object.defineProperty(_thisLayerFunction, "position", {
	            get: function () {
	                return transformInterface.position;
	            }
	        });
	
	        Object.defineProperty(_thisLayerFunction, "anchorPoint", {
	            get: function () {
	                return transformInterface.anchorPoint;
	            }
	        });
	
	        Object.defineProperty(_thisLayerFunction, "transform", {
	            get: function () {
	                return transformInterface;
	            }
	        });
	
	        Object.defineProperty(_thisLayerFunction, "width", {
	            get: function () {
	                if(elem.data.ty === 0) {
	                    return elem.data.w
	                }
	                return 100;
	            }
	        });
	
	        Object.defineProperty(_thisLayerFunction, "height", {
	            get: function () {
	                if(elem.data.ty === 0) {
	                    return elem.data.h
	                }
	                return 100;
	            }
	        });
	
	        Object.defineProperty(_thisLayerFunction, "source", {
	            get: function () {
	                return elem.data.refId;
	            }
	        });
	
	        Object.defineProperty(_thisLayerFunction, "_name", { value:elem.data.nm });
	        Object.defineProperty(_thisLayerFunction, "content", {
	            get: function(){
	                return _thisLayerFunction.shapeInterface;
	            }
	        });
	
	        Object.defineProperty(_thisLayerFunction, "active", {
	            get: function(){
	                return elem.isVisible;
	            }
	        });
	
	        Object.defineProperty(_thisLayerFunction, "text", {
	            get: function(){
	                return _thisLayerFunction.textInterface;
	            }
	        });
	
	        _thisLayerFunction.registerMaskInterface = _registerMaskInterface;
	        _thisLayerFunction.registerEffectsInterface = _registerEffectsInterface;
	        return _thisLayerFunction;
	    }
	}());
	
	var CompExpressionInterface = (function (){
	    return function(comp){
	        function _thisLayerFunction(name){
	            var i=0, len = comp.layers.length;
	            while(i<len){
	                if(comp.layers[i].nm === name || comp.layers[i].ind === name){
	                    return comp.elements[i].layerInterface;
	                }
	                i += 1;
	            }
	            return {active:false}
	        }
	        Object.defineProperty(_thisLayerFunction, "_name", { value:comp.data.nm });
	        _thisLayerFunction.layer = _thisLayerFunction;
	        _thisLayerFunction.pixelAspect = 1;
	        _thisLayerFunction.height = comp.globalData.compSize.h;
	        _thisLayerFunction.width = comp.globalData.compSize.w;
	        _thisLayerFunction.pixelAspect = 1;
	        _thisLayerFunction.frameDuration = 1/comp.globalData.frameRate;
	        return _thisLayerFunction;
	    }
	}());
	var TransformExpressionInterface = (function (){
	    return function(transform){
	        function _thisFunction(name){
	            switch(name){
	                case "scale":
	                case "Scale":
	                case "ADBE Scale":
	                    return _thisFunction.scale;
	                case "rotation":
	                case "Rotation":
	                case "ADBE Rotation":
	                case "ADBE Rotate Z":
	                    return _thisFunction.rotation;
	                case "position":
	                case "Position":
	                case "ADBE Position":
	                    return transform.position;
	                case "anchorPoint":
	                case "AnchorPoint":
	                case "Anchor Point":
	                case "ADBE AnchorPoint":
	                    return _thisFunction.anchorPoint;
	                case "opacity":
	                case "Opacity":
	                    return _thisFunction.opacity;
	            }
	        }
	
	        Object.defineProperty(_thisFunction, "rotation", {
	            get: function(){
	                return transform.rotation;
	            }
	        });
	        Object.defineProperty(_thisFunction, "scale", {
	            get: function () {
	                return transform.scale;
	            }
	        });
	
	        Object.defineProperty(_thisFunction, "position", {
	            get: function () {
	                return transform.position;
	            }
	        });
	
	        Object.defineProperty(_thisFunction, "xPosition", {
	            get: function () {
	                return transform.xPosition;
	            }
	        });
	
	        Object.defineProperty(_thisFunction, "yPosition", {
	            get: function () {
	                return transform.yPosition;
	            }
	        });
	
	        Object.defineProperty(_thisFunction, "anchorPoint", {
	            get: function () {
	                return transform.anchorPoint;
	            }
	        });
	
	        Object.defineProperty(_thisFunction, "opacity", {
	            get: function () {
	                return transform.opacity;
	            }
	        });
	
	        Object.defineProperty(_thisFunction, "skew", {
	            get: function () {
	                return transform.skew;
	            }
	        });
	
	        Object.defineProperty(_thisFunction, "skewAxis", {
	            get: function () {
	                return transform.skewAxis;
	            }
	        });
	
	        return _thisFunction;
	    }
	}());
	var ProjectInterface = (function (){
	
	    function registerComposition(comp){
	        this.compositions.push(comp);
	    }
	
	    return function(){
	        function _thisProjectFunction(name){
	            var i = 0, len = this.compositions.length;
	            while(i<len){
	                if(this.compositions[i].data && this.compositions[i].data.nm === name){
	                    this.compositions[i].prepareFrame(this.currentFrame);
	                    return this.compositions[i].compInterface;
	                }
	                i+=1;
	            }
	        }
	
	        _thisProjectFunction.compositions = [];
	        _thisProjectFunction.currentFrame = 0;
	
	        _thisProjectFunction.registerComposition = registerComposition;
	
	
	
	        return _thisProjectFunction;
	    }
	}());
	var EffectsExpressionInterface = (function (){
	    var ob = {
	        createEffectsInterface: createEffectsInterface
	    };
	
	    function createEffectsInterface(elem, propertyGroup){
	        if(elem.effects){
	
	            var effectElements = [];
	            var effectsData = elem.data.ef;
	            var i, len = elem.effects.effectElements.length;
	            for(i=0;i<len;i+=1){
	                effectElements.push(createGroupInterface(effectsData[i],elem.effects.effectElements[i],propertyGroup,elem));
	            }
	
	            return function(name){
	                var effects = elem.data.ef, i = 0, len = effects.length;
	                while(i<len) {
	                    if(name === effects[i].nm || name === effects[i].mn || name === effects[i].ix){
	                        return effectElements[i];
	                    }
	                    i += 1;
	                }
	            }
	        }
	    }
	
	    function createGroupInterface(data,elements, propertyGroup, elem){
	        var effectElements = [];
	        var i, len = data.ef.length;
	        for(i=0;i<len;i+=1){
	            if(data.ef[i].ty === 5){
	                effectElements.push(createGroupInterface(data.ef[i],elements.effectElements[i],propertyGroup, elem));
	            } else {
	                effectElements.push(createValueInterface(elements.effectElements[i],data.ef[i].ty, elem));
	            }
	        }
	        var groupInterface = function(name){
	            var effects = data.ef, i = 0, len = effects.length;
	            while(i<len) {
	                if(name === effects[i].nm || name === effects[i].mn || name === effects[i].ix){
	                    if(effects[i].ty === 5){
	                        return effectElements[i];
	                    } else {
	                        return effectElements[i]();
	                    }
	                }
	                i += 1;
	            }
	            return effectElements[0]();
	        }
	        if(data.mn === 'ADBE Color Control'){
	            Object.defineProperty(groupInterface, 'color', {
	                get: function(){
	                    return effectElements[0]();
	                }
	            });
	        }
	        groupInterface.active = data.en !== 0;
	        return groupInterface
	    }
	
	    function createValueInterface(element, type, elem){
	        return function(){
	            if(type === 10){
	                return elem.comp.compInterface(element.p.v);
	            }
	            return ExpressionValue(element.p);
	        }
	    }
	
	    return ob;
	
	}());
	var ExpressionValue = (function() {
		return function(elementProp, mult, type) {
	        var expressionValue, arrayValue;
			if (elementProp.k) {
	            elementProp.getValue();
	        }
	        var i, len, arrValue;
	        if (type) {
	        	if(type === 'color') {
	        		len = 4;
			        expressionValue = Array.apply(null, {length: len});
			        arrValue = Array.apply(null, {length: len});
			        for (i = 0; i < len; i += 1) {
			            expressionValue[i] = arrValue[i] = (mult && i < 3) ? elementProp.v[i] * mult : 1;
			        }
		        	expressionValue.value = arrValue;
	        	}
	        } else if (typeof elementProp.v === 'number' || elementProp.v instanceof Number){
	            expressionValue = mult ? new Number(elementProp.v * mult) : new Number(elementProp.v);
	            expressionValue.value = mult ? elementProp.v * mult : elementProp.v;
	        } else {
	        	len = elementProp.v.length;
		        expressionValue = Array.apply(null, {length: len});
		        arrValue = Array.apply(null, {length: len});
		        for (i = 0; i < len; i += 1) {
		            expressionValue[i] = arrValue[i] = mult ? elementProp.v[i] * mult : elementProp.v[i];
		        }
		        expressionValue.value = arrValue;
	        }
	        
	        expressionValue.numKeys = elementProp.keyframes ? elementProp.keyframes.length : 0;
	        expressionValue.key = function(pos) {
	            if (!expressionValue.numKeys) {
	                return 0;
	            } else {
	                return elementProp.keyframes[pos-1].t;
	            }
	        };
	        expressionValue.valueAtTime = elementProp.getValueAtTime;
	        expressionValue.propertyGroup = elementProp.propertyGroup;
	        return expressionValue;
		}
	}())
	function SliderEffect(data,elem, dynamicProperties){
	    this.p = PropertyFactory.getProp(elem,data.v,0,0,dynamicProperties);
	}
	function AngleEffect(data,elem, dynamicProperties){
	    this.p = PropertyFactory.getProp(elem,data.v,0,0,dynamicProperties);
	}
	function ColorEffect(data,elem, dynamicProperties){
	    this.p = PropertyFactory.getProp(elem,data.v,1,0,dynamicProperties);
	}
	function PointEffect(data,elem, dynamicProperties){
	    this.p = PropertyFactory.getProp(elem,data.v,1,0,dynamicProperties);
	}
	function LayerIndexEffect(data,elem, dynamicProperties){
	    this.p = PropertyFactory.getProp(elem,data.v,0,0,dynamicProperties);
	}
	function MaskIndexEffect(data,elem, dynamicProperties){
	    this.p = PropertyFactory.getProp(elem,data.v,0,0,dynamicProperties);
	}
	function CheckboxEffect(data,elem, dynamicProperties){
	    this.p = PropertyFactory.getProp(elem,data.v,0,0,dynamicProperties);
	}
	function NoValueEffect(){
	    this.p = {};
	}
	function EffectsManager(data,element,dynamicProperties){
	    var effects = data.ef;
	    this.effectElements = [];
	    var i,len = effects.length;
	    var effectItem;
	    for(i=0;i<len;i++) {
	        effectItem = new GroupEffect(effects[i],element,dynamicProperties);
	        this.effectElements.push(effectItem);
	    }
	}
	
	function GroupEffect(data,element,dynamicProperties){
	    this.dynamicProperties = [];
	    this.init(data,element,this.dynamicProperties);
	    if(this.dynamicProperties.length){
	        dynamicProperties.push(this);
	    }
	}
	
	GroupEffect.prototype.getValue = function(){
	    this.mdf = false;
	    var i, len = this.dynamicProperties.length;
	    for(i=0;i<len;i+=1){
	        this.dynamicProperties[i].getValue();
	        this.mdf = this.dynamicProperties[i].mdf ? true : this.mdf;
	    }
	};
	
	GroupEffect.prototype.init = function(data,element,dynamicProperties){
	    this.data = data;
	    this.mdf = false;
	    this.effectElements = [];
	    var i, len = this.data.ef.length;
	    var eff, effects = this.data.ef;
	    for(i=0;i<len;i+=1){
	        switch(effects[i].ty){
	            case 0:
	                eff = new SliderEffect(effects[i],element,dynamicProperties);
	                this.effectElements.push(eff);
	                break;
	            case 1:
	                eff = new AngleEffect(effects[i],element,dynamicProperties);
	                this.effectElements.push(eff);
	                break;
	            case 2:
	                eff = new ColorEffect(effects[i],element,dynamicProperties);
	                this.effectElements.push(eff);
	                break;
	            case 3:
	                eff = new PointEffect(effects[i],element,dynamicProperties);
	                this.effectElements.push(eff);
	                break;
	            case 4:
	            case 7:
	                eff = new CheckboxEffect(effects[i],element,dynamicProperties);
	                this.effectElements.push(eff);
	                break;
	            case 10:
	                eff = new LayerIndexEffect(effects[i],element,dynamicProperties);
	                this.effectElements.push(eff);
	                break;
	            case 11:
	                eff = new MaskIndexEffect(effects[i],element,dynamicProperties);
	                this.effectElements.push(eff);
	                break;
	            case 5:
	                eff = new EffectsManager(effects[i],element,dynamicProperties);
	                this.effectElements.push(eff);
	                break;
	            case 6:
	                eff = new NoValueEffect(effects[i],element,dynamicProperties);
	                this.effectElements.push(eff);
	                break;
	        }
	    }
	};var bodymovinjs = {}; function play(animation){ animationManager.play(animation); } function pause(animation){ animationManager.pause(animation); } function togglePause(animation){ animationManager.togglePause(animation); } function setSpeed(value,animation){ animationManager.setSpeed(value, animation); } function setDirection(value,animation){ animationManager.setDirection(value, animation); } function stop(animation){ animationManager.stop(animation); } function moveFrame(value){ animationManager.moveFrame(value); } function searchAnimations(){ if(standalone === true){ animationManager.searchAnimations(animationData,standalone, renderer); }else{ animationManager.searchAnimations(); } } function registerAnimation(elem){ return animationManager.registerAnimation(elem); } function resize(){ animationManager.resize(); } function start(){ animationManager.start(); } function goToAndStop(val,isFrame, animation){ animationManager.goToAndStop(val,isFrame, animation); } function setSubframeRendering(flag){ subframeEnabled = flag; } function loadAnimation(params){ if(standalone === true){ params.animationData = JSON.parse(animationData); } return animationManager.loadAnimation(params); } function destroy(animation){ return animationManager.destroy(animation); } function setQuality(value){ if(typeof value === 'string'){ switch(value){ case 'high': defaultCurveSegments = 200; break; case 'medium': defaultCurveSegments = 50; break; case 'low': defaultCurveSegments = 10; break; } }else if(!isNaN(value) && value > 1){ defaultCurveSegments = value; } if(defaultCurveSegments >= 50){ roundValues(false); }else{ roundValues(true); } } function installPlugin(type,plugin){ if(type==='expressions'){ expressionsPlugin = plugin; } } function getFactory(name){ switch(name){ case "propertyFactory": return PropertyFactory;case "shapePropertyFactory": return ShapePropertyFactory; case "matrix": return Matrix; } } bodymovinjs.play = play; bodymovinjs.pause = pause; bodymovinjs.togglePause = togglePause; bodymovinjs.setSpeed = setSpeed; bodymovinjs.setDirection = setDirection; bodymovinjs.stop = stop; bodymovinjs.moveFrame = moveFrame; bodymovinjs.searchAnimations = searchAnimations; bodymovinjs.registerAnimation = registerAnimation; bodymovinjs.loadAnimation = loadAnimation; bodymovinjs.setSubframeRendering = setSubframeRendering; bodymovinjs.resize = resize; bodymovinjs.start = start; bodymovinjs.goToAndStop = goToAndStop; bodymovinjs.destroy = destroy; bodymovinjs.setQuality = setQuality; bodymovinjs.installPlugin = installPlugin; bodymovinjs.__getFactory = getFactory; bodymovinjs.version = '4.6.8'; function checkReady(){ if (document.readyState === "complete") { clearInterval(readyStateCheckInterval); searchAnimations(); } } function getQueryVariable(variable) { var vars = queryString.split('&'); for (var i = 0; i < vars.length; i++) { var pair = vars[i].split('='); if (decodeURIComponent(pair[0]) == variable) { return decodeURIComponent(pair[1]); } } } var standalone = '__[STANDALONE]__'; var animationData = '__[ANIMATIONDATA]__'; var renderer = ''; if(standalone) { var scripts = document.getElementsByTagName('script'); var index = scripts.length - 1; var myScript = scripts[index]; var queryString = myScript.src.replace(/^[^\?]+\??/,''); renderer = getQueryVariable('renderer'); } var readyStateCheckInterval = setInterval(checkReady, 100); return bodymovinjs; }));  

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var QueryHandler = __webpack_require__(7);
	var each = __webpack_require__(1).each;
	
	/**
	 * Represents a single media query, manages it's state and registered handlers for this query
	 *
	 * @constructor
	 * @param {string} query the media query string
	 * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
	 */
	function MediaQuery(query, isUnconditional) {
	    this.query = query;
	    this.isUnconditional = isUnconditional;
	    this.handlers = [];
	    this.mql = window.matchMedia(query);
	
	    var self = this;
	    this.listener = function(mql) {
	        // Chrome passes an MediaQueryListEvent object, while other browsers pass MediaQueryList directly
	        self.mql = mql.currentTarget || mql;
	        self.assess();
	    };
	    this.mql.addListener(this.listener);
	}
	
	MediaQuery.prototype = {
	
	    constuctor : MediaQuery,
	
	    /**
	     * add a handler for this query, triggering if already active
	     *
	     * @param {object} handler
	     * @param {function} handler.match callback for when query is activated
	     * @param {function} [handler.unmatch] callback for when query is deactivated
	     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
	     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
	     */
	    addHandler : function(handler) {
	        var qh = new QueryHandler(handler);
	        this.handlers.push(qh);
	
	        this.matches() && qh.on();
	    },
	
	    /**
	     * removes the given handler from the collection, and calls it's destroy methods
	     *
	     * @param {object || function} handler the handler to remove
	     */
	    removeHandler : function(handler) {
	        var handlers = this.handlers;
	        each(handlers, function(h, i) {
	            if(h.equals(handler)) {
	                h.destroy();
	                return !handlers.splice(i,1); //remove from array and exit each early
	            }
	        });
	    },
	
	    /**
	     * Determine whether the media query should be considered a match
	     *
	     * @return {Boolean} true if media query can be considered a match, false otherwise
	     */
	    matches : function() {
	        return this.mql.matches || this.isUnconditional;
	    },
	
	    /**
	     * Clears all handlers and unbinds events
	     */
	    clear : function() {
	        each(this.handlers, function(handler) {
	            handler.destroy();
	        });
	        this.mql.removeListener(this.listener);
	        this.handlers.length = 0; //clear array
	    },
	
	    /*
	        * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
	        */
	    assess : function() {
	        var action = this.matches() ? 'on' : 'off';
	
	        each(this.handlers, function(handler) {
	            handler[action]();
	        });
	    }
	};
	
	module.exports = MediaQuery;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var MediaQuery = __webpack_require__(5);
	var Util = __webpack_require__(1);
	var each = Util.each;
	var isFunction = Util.isFunction;
	var isArray = Util.isArray;
	
	/**
	 * Allows for registration of query handlers.
	 * Manages the query handler's state and is responsible for wiring up browser events
	 *
	 * @constructor
	 */
	function MediaQueryDispatch () {
	    if(!window.matchMedia) {
	        throw new Error('matchMedia not present, legacy browsers require a polyfill');
	    }
	
	    this.queries = {};
	    this.browserIsIncapable = !window.matchMedia('only all').matches;
	}
	
	MediaQueryDispatch.prototype = {
	
	    constructor : MediaQueryDispatch,
	
	    /**
	     * Registers a handler for the given media query
	     *
	     * @param {string} q the media query
	     * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
	     * @param {function} options.match fired when query matched
	     * @param {function} [options.unmatch] fired when a query is no longer matched
	     * @param {function} [options.setup] fired when handler first triggered
	     * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
	     * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
	     */
	    register : function(q, options, shouldDegrade) {
	        var queries         = this.queries,
	            isUnconditional = shouldDegrade && this.browserIsIncapable;
	
	        if(!queries[q]) {
	            queries[q] = new MediaQuery(q, isUnconditional);
	        }
	
	        //normalise to object in an array
	        if(isFunction(options)) {
	            options = { match : options };
	        }
	        if(!isArray(options)) {
	            options = [options];
	        }
	        each(options, function(handler) {
	            if (isFunction(handler)) {
	                handler = { match : handler };
	            }
	            queries[q].addHandler(handler);
	        });
	
	        return this;
	    },
	
	    /**
	     * unregisters a query and all it's handlers, or a specific handler for a query
	     *
	     * @param {string} q the media query to target
	     * @param {object || function} [handler] specific handler to unregister
	     */
	    unregister : function(q, handler) {
	        var query = this.queries[q];
	
	        if(query) {
	            if(handler) {
	                query.removeHandler(handler);
	            }
	            else {
	                query.clear();
	                delete this.queries[q];
	            }
	        }
	
	        return this;
	    }
	};
	
	module.exports = MediaQueryDispatch;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/**
	 * Delegate to handle a media query being matched and unmatched.
	 *
	 * @param {object} options
	 * @param {function} options.match callback for when the media query is matched
	 * @param {function} [options.unmatch] callback for when the media query is unmatched
	 * @param {function} [options.setup] one-time callback triggered the first time a query is matched
	 * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
	 * @constructor
	 */
	function QueryHandler(options) {
	    this.options = options;
	    !options.deferSetup && this.setup();
	}
	
	QueryHandler.prototype = {
	
	    constructor : QueryHandler,
	
	    /**
	     * coordinates setup of the handler
	     *
	     * @function
	     */
	    setup : function() {
	        if(this.options.setup) {
	            this.options.setup();
	        }
	        this.initialised = true;
	    },
	
	    /**
	     * coordinates setup and triggering of the handler
	     *
	     * @function
	     */
	    on : function() {
	        !this.initialised && this.setup();
	        this.options.match && this.options.match();
	    },
	
	    /**
	     * coordinates the unmatch event for the handler
	     *
	     * @function
	     */
	    off : function() {
	        this.options.unmatch && this.options.unmatch();
	    },
	
	    /**
	     * called when a handler is to be destroyed.
	     * delegates to the destroy or unmatch callbacks, depending on availability.
	     *
	     * @function
	     */
	    destroy : function() {
	        this.options.destroy ? this.options.destroy() : this.off();
	    },
	
	    /**
	     * determines equality by reference.
	     * if object is supplied compare options, if function, compare match callback
	     *
	     * @function
	     * @param {object || function} [target] the target for comparison
	     */
	    equals : function(target) {
	        return this.options === target || this.options.match === target;
	    }
	
	};
	
	module.exports = QueryHandler;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var MediaQueryDispatch = __webpack_require__(6);
	module.exports = new MediaQueryDispatch();


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
	 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
	 * License: MIT
	 */
	
	(function(root, factory) {
	  'use strict';
	
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  else if (typeof exports === 'object') {
	    // COMMONJS
	    module.exports = factory();
	  }
	  else {
	    // BROWSER
	    root.Headroom = factory();
	  }
	}(this, function() {
	  'use strict';
	
	  /* exported features */
	  
	  var features = {
	    bind : !!(function(){}.bind),
	    classList : 'classList' in document.documentElement,
	    rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
	  };
	  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
	  
	  /**
	   * Handles debouncing of events via requestAnimationFrame
	   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
	   * @param {Function} callback The callback to handle whichever event
	   */
	  function Debouncer (callback) {
	    this.callback = callback;
	    this.ticking = false;
	  }
	  Debouncer.prototype = {
	    constructor : Debouncer,
	  
	    /**
	     * dispatches the event to the supplied callback
	     * @private
	     */
	    update : function() {
	      this.callback && this.callback();
	      this.ticking = false;
	    },
	  
	    /**
	     * ensures events don't get stacked
	     * @private
	     */
	    requestTick : function() {
	      if(!this.ticking) {
	        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
	        this.ticking = true;
	      }
	    },
	  
	    /**
	     * Attach this as the event listeners
	     */
	    handleEvent : function() {
	      this.requestTick();
	    }
	  };
	  /**
	   * Check if object is part of the DOM
	   * @constructor
	   * @param {Object} obj element to check
	   */
	  function isDOMElement(obj) {
	    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
	  }
	  
	  /**
	   * Helper function for extending objects
	   */
	  function extend (object /*, objectN ... */) {
	    if(arguments.length <= 0) {
	      throw new Error('Missing arguments in extend function');
	    }
	  
	    var result = object || {},
	        key,
	        i;
	  
	    for (i = 1; i < arguments.length; i++) {
	      var replacement = arguments[i] || {};
	  
	      for (key in replacement) {
	        // Recurse into object except if the object is a DOM element
	        if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
	          result[key] = extend(result[key], replacement[key]);
	        }
	        else {
	          result[key] = result[key] || replacement[key];
	        }
	      }
	    }
	  
	    return result;
	  }
	  
	  /**
	   * Helper function for normalizing tolerance option to object format
	   */
	  function normalizeTolerance (t) {
	    return t === Object(t) ? t : { down : t, up : t };
	  }
	  
	  /**
	   * UI enhancement for fixed headers.
	   * Hides header when scrolling down
	   * Shows header when scrolling up
	   * @constructor
	   * @param {DOMElement} elem the header element
	   * @param {Object} options options for the widget
	   */
	  function Headroom (elem, options) {
	    options = extend(options, Headroom.options);
	  
	    this.lastKnownScrollY = 0;
	    this.elem             = elem;
	    this.tolerance        = normalizeTolerance(options.tolerance);
	    this.classes          = options.classes;
	    this.offset           = options.offset;
	    this.scroller         = options.scroller;
	    this.initialised      = false;
	    this.onPin            = options.onPin;
	    this.onUnpin          = options.onUnpin;
	    this.onTop            = options.onTop;
	    this.onNotTop         = options.onNotTop;
	    this.onBottom         = options.onBottom;
	    this.onNotBottom      = options.onNotBottom;
	  }
	  Headroom.prototype = {
	    constructor : Headroom,
	  
	    /**
	     * Initialises the widget
	     */
	    init : function() {
	      if(!Headroom.cutsTheMustard) {
	        return;
	      }
	  
	      this.debouncer = new Debouncer(this.update.bind(this));
	      this.elem.classList.add(this.classes.initial);
	  
	      // defer event registration to handle browser 
	      // potentially restoring previous scroll position
	      setTimeout(this.attachEvent.bind(this), 100);
	  
	      return this;
	    },
	  
	    /**
	     * Unattaches events and removes any classes that were added
	     */
	    destroy : function() {
	      var classes = this.classes;
	  
	      this.initialised = false;
	      this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.notTop, classes.initial);
	      this.scroller.removeEventListener('scroll', this.debouncer, false);
	    },
	  
	    /**
	     * Attaches the scroll event
	     * @private
	     */
	    attachEvent : function() {
	      if(!this.initialised){
	        this.lastKnownScrollY = this.getScrollY();
	        this.initialised = true;
	        this.scroller.addEventListener('scroll', this.debouncer, false);
	  
	        this.debouncer.handleEvent();
	      }
	    },
	    
	    /**
	     * Unpins the header if it's currently pinned
	     */
	    unpin : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
	        classList.add(classes.unpinned);
	        classList.remove(classes.pinned);
	        this.onUnpin && this.onUnpin.call(this);
	      }
	    },
	  
	    /**
	     * Pins the header if it's currently unpinned
	     */
	    pin : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(classList.contains(classes.unpinned)) {
	        classList.remove(classes.unpinned);
	        classList.add(classes.pinned);
	        this.onPin && this.onPin.call(this);
	      }
	    },
	  
	    /**
	     * Handles the top states
	     */
	    top : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.top)) {
	        classList.add(classes.top);
	        classList.remove(classes.notTop);
	        this.onTop && this.onTop.call(this);
	      }
	    },
	  
	    /**
	     * Handles the not top state
	     */
	    notTop : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.notTop)) {
	        classList.add(classes.notTop);
	        classList.remove(classes.top);
	        this.onNotTop && this.onNotTop.call(this);
	      }
	    },
	  
	    bottom : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.bottom)) {
	        classList.add(classes.bottom);
	        classList.remove(classes.notBottom);
	        this.onBottom && this.onBottom.call(this);
	      }
	    },
	  
	    /**
	     * Handles the not top state
	     */
	    notBottom : function() {
	      var classList = this.elem.classList,
	        classes = this.classes;
	      
	      if(!classList.contains(classes.notBottom)) {
	        classList.add(classes.notBottom);
	        classList.remove(classes.bottom);
	        this.onNotBottom && this.onNotBottom.call(this);
	      }
	    },
	  
	    /**
	     * Gets the Y scroll position
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
	     * @return {Number} pixels the page has scrolled along the Y-axis
	     */
	    getScrollY : function() {
	      return (this.scroller.pageYOffset !== undefined)
	        ? this.scroller.pageYOffset
	        : (this.scroller.scrollTop !== undefined)
	          ? this.scroller.scrollTop
	          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	    },
	  
	    /**
	     * Gets the height of the viewport
	     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
	     * @return {int} the height of the viewport in pixels
	     */
	    getViewportHeight : function () {
	      return window.innerHeight
	        || document.documentElement.clientHeight
	        || document.body.clientHeight;
	    },
	  
	    /**
	     * Gets the physical height of the DOM element
	     * @param  {Object}  elm the element to calculate the physical height of which
	     * @return {int}     the physical height of the element in pixels
	     */
	    getElementPhysicalHeight : function (elm) {
	      return Math.max(
	        elm.offsetHeight,
	        elm.clientHeight
	      );
	    },
	  
	    /**
	     * Gets the physical height of the scroller element
	     * @return {int} the physical height of the scroller element in pixels
	     */
	    getScrollerPhysicalHeight : function () {
	      return (this.scroller === window || this.scroller === document.body)
	        ? this.getViewportHeight()
	        : this.getElementPhysicalHeight(this.scroller);
	    },
	  
	    /**
	     * Gets the height of the document
	     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
	     * @return {int} the height of the document in pixels
	     */
	    getDocumentHeight : function () {
	      var body = document.body,
	        documentElement = document.documentElement;
	    
	      return Math.max(
	        body.scrollHeight, documentElement.scrollHeight,
	        body.offsetHeight, documentElement.offsetHeight,
	        body.clientHeight, documentElement.clientHeight
	      );
	    },
	  
	    /**
	     * Gets the height of the DOM element
	     * @param  {Object}  elm the element to calculate the height of which
	     * @return {int}     the height of the element in pixels
	     */
	    getElementHeight : function (elm) {
	      return Math.max(
	        elm.scrollHeight,
	        elm.offsetHeight,
	        elm.clientHeight
	      );
	    },
	  
	    /**
	     * Gets the height of the scroller element
	     * @return {int} the height of the scroller element in pixels
	     */
	    getScrollerHeight : function () {
	      return (this.scroller === window || this.scroller === document.body)
	        ? this.getDocumentHeight()
	        : this.getElementHeight(this.scroller);
	    },
	  
	    /**
	     * determines if the scroll position is outside of document boundaries
	     * @param  {int}  currentScrollY the current y scroll position
	     * @return {bool} true if out of bounds, false otherwise
	     */
	    isOutOfBounds : function (currentScrollY) {
	      var pastTop  = currentScrollY < 0,
	        pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
	      
	      return pastTop || pastBottom;
	    },
	  
	    /**
	     * determines if the tolerance has been exceeded
	     * @param  {int} currentScrollY the current scroll y position
	     * @return {bool} true if tolerance exceeded, false otherwise
	     */
	    toleranceExceeded : function (currentScrollY, direction) {
	      return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
	    },
	  
	    /**
	     * determine if it is appropriate to unpin
	     * @param  {int} currentScrollY the current y scroll position
	     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
	     * @return {bool} true if should unpin, false otherwise
	     */
	    shouldUnpin : function (currentScrollY, toleranceExceeded) {
	      var scrollingDown = currentScrollY > this.lastKnownScrollY,
	        pastOffset = currentScrollY >= this.offset;
	  
	      return scrollingDown && pastOffset && toleranceExceeded;
	    },
	  
	    /**
	     * determine if it is appropriate to pin
	     * @param  {int} currentScrollY the current y scroll position
	     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
	     * @return {bool} true if should pin, false otherwise
	     */
	    shouldPin : function (currentScrollY, toleranceExceeded) {
	      var scrollingUp  = currentScrollY < this.lastKnownScrollY,
	        pastOffset = currentScrollY <= this.offset;
	  
	      return (scrollingUp && toleranceExceeded) || pastOffset;
	    },
	  
	    /**
	     * Handles updating the state of the widget
	     */
	    update : function() {
	      var currentScrollY  = this.getScrollY(),
	        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
	        toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);
	  
	      if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
	        return;
	      }
	  
	      if (currentScrollY <= this.offset ) {
	        this.top();
	      } else {
	        this.notTop();
	      }
	  
	      if(currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
	        this.bottom();
	      }
	      else {
	        this.notBottom();
	      }
	  
	      if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
	        this.unpin();
	      }
	      else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
	        this.pin();
	      }
	  
	      this.lastKnownScrollY = currentScrollY;
	    }
	  };
	  /**
	   * Default options
	   * @type {Object}
	   */
	  Headroom.options = {
	    tolerance : {
	      up : 0,
	      down : 0
	    },
	    offset : 0,
	    scroller: window,
	    classes : {
	      pinned : 'headroom--pinned',
	      unpinned : 'headroom--unpinned',
	      top : 'headroom--top',
	      notTop : 'headroom--not-top',
	      bottom : 'headroom--bottom',
	      notBottom : 'headroom--not-bottom',
	      initial : 'headroom'
	    }
	  };
	  Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;
	
	  return Headroom;
	}));

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	/*!
	 * headroom.js v0.9.3 - Give your page some headroom. Hide your header until you need it
	 * Copyright (c) 2016 Nick Williams - http://wicky.nillia.ms/headroom.js
	 * License: MIT
	 */
	
	(function($) {
	
	  if(!$) {
	    return;
	  }
	
	  ////////////
	  // Plugin //
	  ////////////
	
	  $.fn.headroom = function(option) {
	    return this.each(function() {
	      var $this   = $(this),
	        data      = $this.data('headroom'),
	        options   = typeof option === 'object' && option;
	
	      options = $.extend(true, {}, Headroom.options, options);
	
	      if (!data) {
	        data = new Headroom(this, options);
	        data.init();
	        $this.data('headroom', data);
	      }
	      if (typeof option === 'string') {
	        data[option]();
	
	        if(option === 'destroy'){
	          $this.removeData('headroom');
	        }
	      }
	    });
	  };
	
	  //////////////
	  // Data API //
	  //////////////
	
	  $('[data-headroom]').each(function() {
	    var $this = $(this);
	    $this.headroom($this.data());
	  });
	
	}(window.Zepto || window.jQuery));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v3.2.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright JS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2017-03-20T18:59Z
	 */
	( function( global, factory ) {
	
		"use strict";
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
	
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";
	
	var arr = [];
	
	var document = window.document;
	
	var getProto = Object.getPrototypeOf;
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var fnToString = hasOwn.toString;
	
	var ObjectFunctionString = fnToString.call( Object );
	
	var support = {};
	
	
	
		function DOMEval( code, doc ) {
			doc = doc || document;
	
			var script = doc.createElement( "script" );
	
			script.text = code;
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module
	
	
	
	var
		version = "3.2.1",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
	
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
	
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
	
			// Return all the elements in a clean array
			if ( num == null ) {
				return slice.call( this );
			}
	
			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor();
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
	
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
	
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = Array.isArray( copy ) ) ) ) {
	
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && Array.isArray( src ) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend( {
	
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
	
			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type( obj );
			return ( type === "number" || type === "string" ) &&
	
				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN( obj - parseFloat( obj ) );
		},
	
		isPlainObject: function( obj ) {
			var proto, Ctor;
	
			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}
	
			proto = getProto( obj );
	
			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}
	
			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},
	
		isEmptyObject: function( obj ) {
	
			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;
	
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
	
			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			DOMEval( code );
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		each: function( obj, callback ) {
			var length, i = 0;
	
			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android <=4.0 only
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );
	
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );
	
	function isArrayLike( obj ) {
	
		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
	
		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
	
		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {
	
				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}
	
				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}
	
			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},
	
		disabledAncestor = addCombinator(
			function( elem ) {
				return elem.disabled === true && ("form" in elem || "label" in elem);
			},
			{ dir: "parentNode", next: "legend" }
		);
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,
	
			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;
	
		results = results || [];
	
		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
	
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;
	
			if ( documentIsHTML ) {
	
				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
	
					// ID selector
					if ( (m = match[1]) ) {
	
						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {
	
								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
	
						// Element context
						} else {
	
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {
	
								results.push( elem );
								return results;
							}
						}
	
					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
	
					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {
	
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
	
				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	
					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;
	
					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {
	
						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}
	
						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[i] = "#" + nid + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );
	
						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}
	
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement("fieldset");
	
		try {
			return !!fn( el );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}
			// release memory in IE
			el = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {
	
		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {
	
			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ( "form" in elem ) {
	
				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if ( elem.parentNode && elem.disabled === false ) {
	
					// Option elements defer to a parent optgroup if present
					if ( "label" in elem ) {
						if ( "label" in elem.parentNode ) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}
	
					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||
	
						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled &&
							disabledAncestor( elem ) === disabled;
				}
	
				return elem.disabled === disabled;
	
			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
			} else if ( "label" in elem ) {
				return elem.disabled === disabled;
			}
	
			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );
	
		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( preferredDoc !== document &&
			(subWindow = document.defaultView) && subWindow.top !== subWindow ) {
	
			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );
	
			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( el ) {
			el.className = "i";
			return !el.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( el ) {
			el.appendChild( document.createComment("") );
			return !el.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});
	
		// ID filter and find
		if ( support.getById ) {
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var elem = context.getElementById( id );
					return elem ? [ elem ] : [];
				}
			};
		} else {
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
	
			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var node, i, elems,
						elem = context.getElementById( id );
	
					if ( elem ) {
	
						// Verify the id attribute
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
	
						// Fall back on getElementsByName
						elems = context.getElementsByName( id );
						i = 0;
						while ( (elem = elems[i++]) ) {
							node = elem.getAttributeNode("id");
							if ( node && node.value === id ) {
								return [ elem ];
							}
						}
					}
	
					return [];
				}
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( el ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";
	
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll(":enabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll(":disabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( el ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return document;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.escape = function( sel ) {
		return (sel + "").replace( rcssescape, fcssescape );
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {
	
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
	
								// Seek `elem` from a previously-cached index
	
								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});
	
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
	
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});
	
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});
	
									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}
	
								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
	
										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {
	
											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});
	
												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});
	
												uniqueCache[ type ] = [ dirruns, diff ];
											}
	
											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
				return false;
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
	
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
	
							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( (oldCache = uniqueCache[ key ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}
	
				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;
	
				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {
	
			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( el ) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( el ) {
		return el.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	
	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;
	
	
	
	
	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;
	
		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};
	
	
	var siblings = function( n, elem ) {
		var matched = [];
	
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}
	
		return matched;
	};
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	
	
	function nodeName( elem, name ) {
	
	  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	
	};
	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
		}
	
		// Single element
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
		}
	
		// Arraylike of elements (jQuery, arguments, Array)
		if ( typeof qualifier !== "string" ) {
			return jQuery.grep( elements, function( elem ) {
				return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
			} );
		}
	
		// Simple selector that can be filtered directly, removing non-Elements
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}
	
		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter( qualifier, elements );
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
		} );
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		if ( elems.length === 1 && elem.nodeType === 1 ) {
			return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
		}
	
		return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
	};
	
	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}
	
			ret = this.pushStack( [] );
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	
		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {
	
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
	
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );
	
						if ( elem ) {
	
							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
	
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );
	
			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
	
						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :
	
							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {
	
							matched.push( cur );
							break;
						}
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );
	
	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
	        if ( nodeName( elem, "iframe" ) ) {
	            return elem.contentDocument;
	        }
	
	        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
	        // Treat the template element as a regular one in browsers that
	        // don't support it.
	        if ( nodeName( elem, "template" ) ) {
	            elem = elem.content || elem;
	        }
	
	        return jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
	
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	} );
	var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
	
	
	
	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );
	
		var // Flag to know if list is currently firing
			firing,
	
			// Last fire value for non-forgettable lists
			memory,
	
			// Flag to know if list was already fired
			fired,
	
			// Flag to prevent firing
			locked,
	
			// Actual callback list
			list = [],
	
			// Queue of execution data for repeatable lists
			queue = [],
	
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
	
			// Fire callbacks
			fire = function() {
	
				// Enforce single-firing
				locked = locked || options.once;
	
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {
	
						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {
	
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
	
				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}
	
				firing = false;
	
				// Clean up if we're done firing for good
				if ( locked ) {
	
					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];
	
					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
	
			// Actual Callbacks object
			self = {
	
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
	
						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}
	
						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {
	
									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );
	
						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
	
							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},
	
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},
	
				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},
	
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
	
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
	
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
	
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}
	
	function adoptValue( value, resolve, reject, noValue ) {
		var method;
	
		try {
	
			// Check for promise aspect first to privilege synchronous behavior
			if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );
	
			// Other thenables
			} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );
	
			// Other non-thenables
			} else {
	
				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply( undefined, [ value ].slice( noValue ) );
			}
	
		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {
	
			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply( undefined, [ value ] );
		}
	}
	
	jQuery.extend( {
	
		Deferred: function( func ) {
			var tuples = [
	
					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},
	
					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
	
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
	
								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];
	
								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;
	
										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}
	
										returned = handler.apply( that, args );
	
										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}
	
										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&
	
											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;
	
										// Handle a returned thenable
										if ( jQuery.isFunction( then ) ) {
	
											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);
	
											// Normal processors (resolve) also hook into progress
											} else {
	
												// ...and disregard older resolution values
												maxDepth++;
	
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}
	
										// Handle all other returned values
										} else {
	
											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}
	
											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},
	
									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {
	
												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}
	
												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {
	
													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}
	
													deferred.rejectWith( that, args );
												}
											}
										};
	
								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {
	
									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}
	
						return jQuery.Deferred( function( newDefer ) {
	
							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);
	
							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);
	
							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},
	
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];
	
				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add(
						function() {
	
							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},
	
						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,
	
						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock
					);
				}
	
				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );
	
				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};
	
				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( singleValue ) {
			var
	
				// count of uncompleted subordinates
				remaining = arguments.length,
	
				// count of unprocessed arguments
				i = remaining,
	
				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),
	
				// the master Deferred
				master = jQuery.Deferred(),
	
				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							master.resolveWith( resolveContexts, resolveValues );
						}
					};
				};
	
			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
					!remaining );
	
				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( master.state() === "pending" ||
					jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {
	
					return master.then();
				}
			}
	
			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
			}
	
			return master.promise();
		}
	} );
	
	
	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	
	jQuery.Deferred.exceptionHook = function( error, stack ) {
	
		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};
	
	
	
	
	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};
	
	
	
	
	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();
	
	jQuery.fn.ready = function( fn ) {
	
		readyList
			.then( fn )
	
			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );
	
		return this;
	};
	
	jQuery.extend( {
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );
	
	jQuery.ready.then = readyList.then;
	
	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}
	
	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	
		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );
	
	} else {
	
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );
	
		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
	
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}
	
		if ( chainable ) {
			return elems;
		}
	
		// Gets
		if ( bulk ) {
			return fn.call( elems );
		}
	
		return len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {
	
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	
	
	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	
	Data.prototype = {
	
		cache: function( owner ) {
	
			// Check if the owner object already has a cache
			var value = owner[ this.expando ];
	
			// If not, create one
			if ( !value ) {
				value = {};
	
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {
	
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;
	
					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}
	
			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );
	
			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ jQuery.camelCase( data ) ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
	
				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ jQuery.camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
	
				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
		},
		access: function( owner, key, value ) {
	
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {
	
				return this.get( owner, key );
			}
	
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];
	
			if ( cache === undefined ) {
				return;
			}
	
			if ( key !== undefined ) {
	
				// Support array or space separated string of keys
				if ( Array.isArray( key ) ) {
	
					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( jQuery.camelCase );
				} else {
					key = jQuery.camelCase( key );
	
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnothtmlwhite ) || [] );
				}
	
				i = key.length;
	
				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}
	
			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
	
				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();
	
	var dataUser = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;
	
	function getData( data ) {
		if ( data === "true" ) {
			return true;
		}
	
		if ( data === "false" ) {
			return false;
		}
	
		if ( data === "null" ) {
			return null;
		}
	
		// Only convert to a number if it doesn't change the string
		if ( data === +data + "" ) {
			return +data;
		}
	
		if ( rbrace.test( data ) ) {
			return JSON.parse( data );
		}
	
		return data;
	}
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = getData( data );
				} catch ( e ) {}
	
				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );
	
	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );
	
					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}
	
			return access( this, function( value ) {
				var data;
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
	
					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				this.each( function() {
	
					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );
	
	
	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || Array.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );
	
	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}
	
			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
	
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
	
	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
	
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHiddenWithinTree = function( elem, el ) {
	
			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
	
			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&
	
				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				jQuery.contains( elem.ownerDocument, elem ) &&
	
				jQuery.css( elem, "display" ) === "none";
		};
	
	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	
	
	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );
	
		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
	
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];
	
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
	
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
	
			do {
	
				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";
	
				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );
	
			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}
	
		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
	
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	
	
	var defaultDisplayMap = {};
	
	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];
	
		if ( display ) {
			return display;
		}
	
		temp = doc.body.appendChild( doc.createElement( nodeName ) );
		display = jQuery.css( temp, "display" );
	
		temp.parentNode.removeChild( temp );
	
		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;
	
		return display;
	}
	
	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;
	
		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			display = elem.style.display;
			if ( show ) {
	
				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";
	
					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}
	
		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}
	
		return elements;
	}
	
	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );
	
	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );
	
	var rscriptType = ( /^$|\/(?:java|ecma)script/i );
	
	
	
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
	
		// Support: IE <=9 only
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
		_default: [ 0, "", "" ]
	};
	
	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	
	function getAll( context, tag ) {
	
		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;
	
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			ret = context.getElementsByTagName( tag || "*" );
	
		} else if ( typeof context.querySelectorAll !== "undefined" ) {
			ret = context.querySelectorAll( tag || "*" );
	
		} else {
			ret = [];
		}
	
		if ( tag === undefined || tag && nodeName( context, tag ) ) {
			return jQuery.merge( [ context ], ret );
		}
	
		return ret;
	}
	
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	
	var rhtml = /<|&#?\w+;/;
	
	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			elem = elems[ i ];
	
			if ( elem || elem === 0 ) {
	
				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );
	
				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
	
					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
	
					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );
	
					// Remember the top-level container
					tmp = fragment.firstChild;
	
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
	
		// Remove wrapper from fragment
		fragment.textContent = "";
	
		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {
	
			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}
	
			contains = jQuery.contains( elem.ownerDocument, elem );
	
			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );
	
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}
	
			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}
	
		return fragment;
	}
	
	
	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	var documentElement = document.documentElement;
	
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;
	
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
	
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
	
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}
	
		if ( data == null && fn == null ) {
	
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
	
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
	
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}
	
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
	
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
	
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {
	
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
	
			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},
	
		dispatch: function( nativeEvent ) {
	
			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix( nativeEvent );
	
			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
	
			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}
	
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Find delegate handlers
			if ( delegateCount &&
	
				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&
	
				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!( event.type === "click" && event.button >= 1 ) ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
						matchedHandlers = [];
						matchedSelectors = {};
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matchedSelectors[ sel ] === undefined ) {
								matchedSelectors[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matchedSelectors[ sel ] ) {
								matchedHandlers.push( handleObj );
							}
						}
						if ( matchedHandlers.length ) {
							handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			cur = this;
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
			}
	
			return handlerQueue;
		},
	
		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,
	
				get: jQuery.isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
								return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
								return this.originalEvent[ name ];
						}
					},
	
				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},
	
		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},
	
		special: {
			load: {
	
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
	
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
	
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	
		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};
	
	jQuery.Event = function( src, props ) {
	
		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
	
					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;
	
			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,
	
		which: function( event ) {
			var button = event.button;
	
			// Add which for key events
			if ( event.which == null && rkeyEvent.test( event.type ) ) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}
	
			// Add which for click: 1 === left; 2 === middle; 3 === right
			if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
				if ( button & 1 ) {
					return 1;
				}
	
				if ( button & 2 ) {
					return 3;
				}
	
				if ( button & 4 ) {
					return 2;
				}
	
				return 0;
			}
	
			return event.which;
		}
	}, jQuery.event.addProp );
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );
	
	jQuery.fn.extend( {
	
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
	
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
	
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
	
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );
	
	
	var
	
		/* eslint-disable max-len */
	
		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
	
		/* eslint-enable */
	
		// Support: IE <=10 - 11, Edge 12 - 13
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
	
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	
	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget( elem, content ) {
		if ( nodeName( elem, "table" ) &&
			nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {
	
			return jQuery( ">tbody", elem )[ 0 ] || elem;
		}
	
		return elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}
	
		return elem;
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			dataUser.set( dest, udataCur );
		}
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	function domManip( collection, args, callback, ignored ) {
	
		// Flatten any nested arrays
		args = concat.apply( [], args );
	
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );
	
		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}
	
		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;
	
			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}
	
			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;
	
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;
	
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );
	
						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
	
							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}
	
					callback.call( collection[ i ], node, i );
				}
	
				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;
	
					// Reenable scripts
					jQuery.map( scripts, restoreScript );
	
					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {
	
							if ( node.src ) {
	
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
							}
						}
					}
				}
			}
		}
	
		return collection;
	}
	
	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;
	
		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}
	
			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}
	
		return elem;
	}
	
	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},
	
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );
	
	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},
	
		remove: function( selector ) {
			return remove( this, selector );
		},
	
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},
	
		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},
	
		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},
	
		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},
	
		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = jQuery.htmlPrefilter( value );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var ignored = [];
	
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;
	
				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}
	
			// Force callback invocation
			}, ignored );
		}
	} );
	
	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	} );
	var rmargin = ( /^margin/ );
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
	
			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;
	
			if ( !view || !view.opener ) {
				view = window;
			}
	
			return view.getComputedStyle( elem );
		};
	
	
	
	( function() {
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
	
			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}
	
			div.style.cssText =
				"box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );
	
			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
	
			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";
	
			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";
	
			documentElement.removeChild( container );
	
			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}
	
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}
	
		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );
	
		jQuery.extend( support, {
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		} );
	} )();
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
	
			// Support: Firefox 51+
			// Retrieving style before computed somehow
			// fixes an issue with getting wrong values
			// on detached elements
			style = elem.style;
	
		computed = computed || getStyles( elem );
	
		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
	
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}
	
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
	
			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
	
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
	
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}
	
	
	var
	
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rcustomProp = /^--/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}
	
	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName( name ) {
		var ret = jQuery.cssProps[ name ];
		if ( !ret ) {
			ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
		}
		return ret;
	}
	
	function setPositiveNumber( elem, value, subtract ) {
	
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?
	
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i,
			val = 0;
	
		// If we already have the right measurement, avoid augmentation
		if ( extra === ( isBorderBox ? "border" : "content" ) ) {
			i = 4;
	
		// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}
	
		for ( ; i < 4; i += 2 ) {
	
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
	
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
	
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with computed style
		var valueIsBorderBox,
			styles = getStyles( elem ),
			val = curCSS( elem, name, styles ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}
	
		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );
	
		// Fall back to offsetWidth/Height when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		if ( val === "auto" ) {
			val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
		}
	
		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	jQuery.extend( {
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				isCustomProp = rcustomProp.test( name ),
				style = elem.style;
	
			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );
	
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}
	
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {
	
					if ( isCustomProp ) {
						style.setProperty( name, value );
					} else {
						style[ name ] = value;
					}
				}
	
			} else {
	
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
	
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name ),
				isCustomProp = rcustomProp.test( name );
	
			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
	
			return val;
		}
	} );
	
	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
	
						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);
	
				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {
	
					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}
	
				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );
	
	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );
	
	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( Array.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
	
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
	
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, inProgress,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;
	
	function schedule() {
		if ( inProgress ) {
			if ( document.hidden === false && window.requestAnimationFrame ) {
				window.requestAnimationFrame( schedule );
			} else {
				window.setTimeout( schedule, jQuery.fx.interval );
			}
	
			jQuery.fx.tick();
		}
	}
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );
	
		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always( function() {
	
				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}
	
		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
	
					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}
	
		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}
	
		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {
	
			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {
	
					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}
	
			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {
	
					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	
		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {
	
			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}
	
				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}
	
				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}
	
				/* eslint-disable no-loop-func */
	
				anim.done( function() {
	
				/* eslint-enable no-loop-func */
	
					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}
	
			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( Array.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {
	
				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	
					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ] );
	
				// If there's more to do, yield
				if ( percent < 1 && length ) {
					return remaining;
				}
	
				// If this was an empty animation, synthesize a final progress notification
				if ( !length ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
				}
	
				// Resolve the animation and report its conclusion
				deferred.resolveWith( elem, [ animation ] );
				return false;
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
	
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		// Attach callbacks from options
		animation
			.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);
	
		return animation;
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
	
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnothtmlwhite );
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilters: [ defaultPrefilter ],
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		// Go to the end state if fx are off
		if ( jQuery.fx.off ) {
			opt.duration = 0;
	
		} else {
			if ( typeof opt.duration !== "number" ) {
				if ( opt.duration in jQuery.fx.speeds ) {
					opt.duration = jQuery.fx.speeds[ opt.duration ];
	
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
	
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {
	
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );
	
	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );
	
	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
	
			// Run the timer and safely remove it when done (allowing for external removal)
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		jQuery.fx.start();
	};
	
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( inProgress ) {
			return;
		}
	
		inProgress = true;
		schedule();
	};
	
	jQuery.fx.stop = function() {
		inProgress = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
	
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};
	
	
	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();
	
	
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );
	
	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}
	
			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}
	
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				elem.setAttribute( name, value + "" );
				return value;
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			ret = jQuery.find.attr( elem, name );
	
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
	
		removeAttr: function( elem, value ) {
			var name,
				i = 0,
	
				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match( rnothtmlwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
	
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();
	
			if ( !isXML ) {
	
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	
	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );
	
	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				return ( elem[ name ] = value );
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			return elem[ name ];
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
	
					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );
	
					if ( tabindex ) {
						return parseInt( tabindex, 10 );
					}
	
					if (
						rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) &&
						elem.href
					) {
						return 0;
					}
	
					return -1;
				}
			}
		},
	
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );
	
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
	
				/* eslint no-unused-expressions: "off" */
	
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
	
				/* eslint no-unused-expressions: "off" */
	
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	
	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );
	
	
	
	
		// Strip and collapse whitespace according to HTML spec
		// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
		function stripAndCollapse( value ) {
			var tokens = value.match( rnothtmlwhite ) || [];
			return tokens.join( " " );
		}
	
	
	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}
	
	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
	
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
	
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}
	
			return this.each( function() {
				var className, i, self, classNames;
	
				if ( type === "string" ) {
	
					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnothtmlwhite ) || [];
	
					while ( ( className = classNames[ i++ ] ) ) {
	
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {
	
						// Store className if set
						dataPriv.set( this, "__className__", className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},
	
		hasClass: function( selector ) {
			var className, elem,
				i = 0;
	
			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
						return true;
				}
			}
	
			return false;
		}
	} );
	
	
	
	
	var rreturn = /\r/g;
	
	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}
	
					ret = elem.value;
	
					// Handle most common string cases
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}
	
					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each( function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( Array.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );
	
	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {
	
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
	
						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;
	
					if ( index < 0 ) {
						i = max;
	
					} else {
						i = one ? index : 0;
					}
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
	
								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
	
						/* eslint-disable no-cond-assign */
	
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
	
						/* eslint-enable no-cond-assign */
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );
	
	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( Array.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
	
	jQuery.extend( jQuery.event, {
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "." ) > -1 ) {
	
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);
	
			jQuery.event.trigger( e, null, elem );
		}
	
	} );
	
	jQuery.fn.extend( {
	
		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );
	
	
	jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );
	
	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );
	
	
	
	
	support.focusin = "onfocusin" in window;
	
	
	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );
	
					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;
	
	var nonce = jQuery.now();
	
	var rquery = ( /\?/ );
	
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( Array.isArray( obj ) ) {
	
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
	
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
	
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
	
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
	
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {
	
				// If value is a function, invoke it and use its return value
				var value = jQuery.isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;
	
				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );
	
		} else {
	
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" );
	};
	
	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {
	
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();
	
				if ( val == null ) {
					return null;
				}
	
				if ( Array.isArray( val ) ) {
					return jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} );
				}
	
				return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );
	
	
	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
	
				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {
	
					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
	
					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
	
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
	
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
	
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
	
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend( {
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": JSON.parse,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
	
				// URL without anti-cache param
				cacheURL,
	
				// Response headers
				responseHeadersString,
				responseHeaders,
	
				// timeout handle
				timeoutTimer,
	
				// Url cleanup var
				urlAnchor,
	
				// Request state (becomes false upon send and true upon completion)
				completed,
	
				// To know if global events are to be dispatched
				fireGlobals,
	
				// Loop variable
				i,
	
				// uncached part of the url
				uncached,
	
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
	
				// Callbacks context
				callbackContext = s.context || s,
	
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,
	
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
	
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
	
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
	
				// Default abort message
				strAbort = "canceled",
	
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {
	
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {
	
								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR );
	
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];
	
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );
	
				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
	
					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
	
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;
	
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add or update anti-cache param if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}
	
				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;
	
			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {
	
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
	
				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}
	
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {
	
					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}
	
					// Propagate others as results
					done( -1, e );
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Ignore repeat invocations
				if ( completed ) {
					return;
				}
	
				completed = true;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
	
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
	
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,
	
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		} );
	};
	
	
	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;
	
			if ( this[ 0 ] ) {
				if ( jQuery.isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map( function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				} ).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}
	
			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			} );
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},
	
		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );
	
	
	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};
	
	
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};
	
	var xhrSuccessStatus = {
	
			// File protocol always yields status code 0, assume 200
			0: 200,
	
			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();
	
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
	
									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(
	
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
	
										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );
	
					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
	
							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {
	
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}
	
					// Create the abort callback
					callback = callback( "abort" );
	
					try {
	
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
	
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );
	
	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
	
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// Force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always( function() {
	
				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );
	
				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}
	
				// Save back as free
				if ( s[ callbackName ] ) {
	
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			} );
	
			// Delegate to script
			return "script";
		}
	} );
	
	
	
	
	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();
	
	
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
	
		var base, parsed, scripts;
	
		if ( !context ) {
	
			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );
	
				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}
	
		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}
	
		parsed = buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );
	
		if ( off > -1 ) {
			selector = stripAndCollapse( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,
	
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );
	
	
	
	
	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};
	
	
	
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
	
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend( {
		offset: function( options ) {
	
			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}
	
			var doc, docElem, rect, win,
				elem = this[ 0 ];
	
			if ( !elem ) {
				return;
			}
	
			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}
	
			rect = elem.getBoundingClientRect();
	
			doc = elem.ownerDocument;
			docElem = doc.documentElement;
			win = doc.defaultView;
	
			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
	
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
	
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
					left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
				};
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;
	
				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || documentElement;
			} );
		}
	} );
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
	
				// Coalesce documents and windows
				var win;
				if ( jQuery.isWindow( elem ) ) {
					win = elem;
				} else if ( elem.nodeType === 9 ) {
					win = elem.defaultView;
				}
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );
	
	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
	
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {
	
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
	
						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
	
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );
	
	
	jQuery.fn.extend( {
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
	
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		}
	} );
	
	jQuery.holdReady = function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	
	var
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	
	
	
	
	return jQuery;
	} );


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.7.0
	//     http://underscorejs.org
	//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    concat           = ArrayProto.concat,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind;
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.7.0';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var createCallback = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  _.iteratee = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return createCallback(value, context, argCount);
	    if (_.isObject(value)) return _.matches(value);
	    return _.property(value);
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    if (obj == null) return obj;
	    iteratee = createCallback(iteratee, context);
	    var i, length = obj.length;
	    if (length === +length) {
	      for (i = 0; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    if (obj == null) return [];
	    iteratee = _.iteratee(iteratee, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length),
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  var reduceError = 'Reduce of empty array with no initial value';
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index = 0, currentKey;
	    if (arguments.length < 3) {
	      if (!length) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[index++] : index++];
	    }
	    for (; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== + obj.length && _.keys(obj),
	        index = (keys || obj).length,
	        currentKey;
	    if (arguments.length < 3) {
	      if (!index) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[--index] : --index];
	    }
	    while (index--) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var result;
	    predicate = _.iteratee(predicate, context);
	    _.some(obj, function(value, index, list) {
	      if (predicate(value, index, list)) {
	        result = value;
	        return true;
	      }
	    });
	    return result;
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    if (obj == null) return results;
	    predicate = _.iteratee(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    if (obj == null) return true;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    if (obj == null) return false;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given value (using `===`).
	  // Aliased as `include`.
	  _.contains = _.include = function(obj, target) {
	    if (obj == null) return false;
	    if (obj.length !== +obj.length) obj = _.values(obj);
	    return _.indexOf(obj, target) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      return (isFunc ? method : value[method]).apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matches(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matches(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (obj.length !== +obj.length) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = array.length;
	    while (low < high) {
	      var mid = low + high >>> 1;
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (obj.length === +obj.length) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = _.iteratee(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    if (n < 0) return [];
	    return slice.call(array, 0, n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N. The **guard** check allows it to work with
	  // `_.map`.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array. The **guard** check allows it to work with `_.map`.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return slice.call(array, Math.max(array.length - n, 0));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array. The **guard**
	  // check allows it to work with `_.map`.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, output) {
	    if (shallow && _.every(input, _.isArray)) {
	      return concat.apply(output, input);
	    }
	    for (var i = 0, length = input.length; i < length; i++) {
	      var value = input[i];
	      if (!_.isArray(value) && !_.isArguments(value)) {
	        if (!strict) output.push(value);
	      } else if (shallow) {
	        push.apply(output, value);
	      } else {
	        flatten(value, shallow, strict, output);
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false, []);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (array == null) return [];
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = array.length; i < length; i++) {
	      var value = array[i];
	      if (isSorted) {
	        if (!i || seen !== value) result.push(value);
	        seen = value;
	      } else if (iteratee) {
	        var computed = iteratee(value, i, array);
	        if (_.indexOf(seen, computed) < 0) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (_.indexOf(result, value) < 0) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true, []));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    if (array == null) return [];
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = array.length; i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(slice.call(arguments, 1), true, true, []);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function(array) {
	    if (array == null) return [];
	    var length = _.max(arguments, 'length').length;
	    var results = Array(length);
	    for (var i = 0; i < length; i++) {
	      results[i] = _.pluck(arguments, i);
	    }
	    return results;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    if (list == null) return {};
	    var result = {};
	    for (var i = 0, length = list.length; i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = function(array, item, isSorted) {
	    if (array == null) return -1;
	    var i = 0, length = array.length;
	    if (isSorted) {
	      if (typeof isSorted == 'number') {
	        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
	      } else {
	        i = _.sortedIndex(array, item);
	        return array[i] === item ? i : -1;
	      }
	    }
	    for (; i < length; i++) if (array[i] === item) return i;
	    return -1;
	  };
	
	  _.lastIndexOf = function(array, item, from) {
	    if (array == null) return -1;
	    var idx = array.length;
	    if (typeof from == 'number') {
	      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
	    }
	    while (--idx >= 0) if (array[idx] === item) return idx;
	    return -1;
	  };
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (arguments.length <= 1) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Reusable constructor function for prototype setting.
	  var Ctor = function(){};
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    var args, bound;
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    args = slice.call(arguments, 2);
	    bound = function() {
	      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
	      Ctor.prototype = func.prototype;
	      var self = new Ctor;
	      Ctor.prototype = null;
	      var result = func.apply(self, args.concat(slice.call(arguments)));
	      if (_.isObject(result)) return result;
	      return self;
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    return function() {
	      var position = 0;
	      var args = boundArgs.slice();
	      for (var i = 0, length = args.length; i < length; i++) {
	        if (args[i] === _) args[i] = arguments[position++];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return func.apply(this, args);
	    };
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = hasher ? hasher.apply(this, arguments) : key;
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = function(func) {
	    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
	  };
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last > 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed after being called N times.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed before being called N times.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      } else {
	        func = null;
	      }
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Retrieve the names of an object's properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (hasOwnProperty.call(source, prop)) {
	            obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(obj, iteratee, context) {
	    var result = {}, key;
	    if (obj == null) return result;
	    if (_.isFunction(iteratee)) {
	      iteratee = createCallback(iteratee, context);
	      for (key in obj) {
	        var value = obj[key];
	        if (iteratee(value, key, obj)) result[key] = value;
	      }
	    } else {
	      var keys = concat.apply([], slice.call(arguments, 1));
	      obj = new Object(obj);
	      for (var i = 0, length = keys.length; i < length; i++) {
	        key = keys[i];
	        if (key in obj) result[key] = obj[key];
	      }
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      var source = arguments[i];
	      for (var prop in source) {
	        if (obj[prop] === void 0) obj[prop] = source[prop];
	      }
	    }
	    return obj;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (
	      aCtor !== bCtor &&
	      // Handle Object.create(x) cases
	      'constructor' in a && 'constructor' in b &&
	      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	        _.isFunction(bCtor) && bCtor instanceof bCtor)
	    ) {
	      return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size, result;
	    // Recursively compare objects and arrays.
	    if (className === '[object Array]') {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      size = a.length;
	      result = size === b.length;
	      if (result) {
	        // Deep compare the contents, ignoring non-numeric properties.
	        while (size--) {
	          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	        }
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      size = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      result = _.keys(b).length === size;
	      if (result) {
	        while (size--) {
	          // Deep compare each member
	          key = keys[size];
	          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	        }
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b, [], []);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
	    for (var key in obj) if (_.has(obj, key)) return false;
	    return true;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
	  if (true) {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = function(key) {
	    return function(obj) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
	  _.matches = function(attrs) {
	    var pairs = _.pairs(attrs), length = pairs.length;
	    return function(obj) {
	      if (obj == null) return !length;
	      obj = new Object(obj);
	      for (var i = 0; i < length; i++) {
	        var pair = pairs[i], key = pair[0];
	        if (pair[1] !== obj[key] || !(key in obj)) return false;
	      }
	      return true;
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = createCallback(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property) {
	    if (object == null) return void 0;
	    var value = object[property];
	    return _.isFunction(value) ? object[property]() : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(obj) {
	    return this._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result.call(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result.call(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result.call(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ })
/******/ ]);
//# sourceMappingURL=toolkit.js.map