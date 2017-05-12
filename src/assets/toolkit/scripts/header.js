const $ = require('jquery');
const _ = require('underscore');
const enquire = require('enquire.js');
const bodymovin = require('bodymovin');
const Headroom = require('headroom.js');
require('headroom.js/dist/jQuery.headroom.js');


const selectors = {
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
    mobileBackgroundContainerSelector: '.mobile-bg-container',
};

const HeaderApp = {
  init() {
    this.menuOpened = false;
    this.enquireInitializedMobile = false;

    this.animatedLogoSprite();

    enquire.register('screen and (max-width: 992px)', {
      match: _.bind(this.mobileEvent, this),
    });

    enquire.register('screen and (max-height: 700px)', {
      match: _.bind(this.showAndHideHeader, this),
    });

    enquire.register('screen and (min-width: 993px)', {
      match: _.bind(this.desktopDropdownEvent, this),
    });
  },
  toggleMobileMenu(event) {
    $(selectors.linksSelector).hide().removeClass(selectors.activeClass); // hide all submenus without animation
    $(event.currentTarget).toggleClass(selectors.activeClass);
    $(selectors.mobileBackgroundSelector).toggleClass(selectors.activeClass);
    $(selectors.sectionsSelector).toggleClass(selectors.activeClass);
    $(selectors.rightNavigationSelector).toggleClass(selectors.activeClass);
    $(selectors.logoSelector).toggleClass(selectors.mobileMenuClass);
    $(selectors.mobileBackgroundContainerSelector).toggleClass(selectors.backgroundAnimationClass);
  },

  resetMobile() {
    $(selectors.navigationId).removeClass(selectors.mobileClass);
    $(selectors.toggleSelector).off('click');
    $(selectors.sectionSelector).off('click');
    $(selectors.linksSelector).css('display', 'inherit').removeClass(selectors.activeClass);
  },

  resetDesktop() {
    $(selectors.sectionSelector).off('mouseover');
    $(selectors.sectionSelector).off('mouseleave');
    $(selectors.linksSelector).hide();
  },

  showSubMenu(event) {
    if ($(event.currentTarget).find(selectors.linksSelector).hasClass(selectors.activeClass)) {
      $(selectors.linksSelector).slideUp().removeClass(selectors.activeClass);

      return;
    }

    $(selectors.linksSelector).slideUp().removeClass(selectors.activeClass);
    $(event.currentTarget).find(selectors.linksSelector).slideToggle()
      .addClass(selectors.activeClass);
  },

  mobileBgAnimation() {
    var windowDiameter = ($(window).width() * 2) * $(window).height() * 2,
      returnBiggest = (Math.sqrt(windowDiameter)) * 1.5;

    $(selectors.mobileBackgroundSelector).css({
      'top': - returnBiggest / 2 + 'px',
      'right': - returnBiggest / 2 + 'px',
      'width': returnBiggest + 'px',
      'height': returnBiggest + 'px',
    });
  },

  showAndHideHeader() {

    var myElement = document.querySelector('.nav');

            // I should pass the variable object inside the headroom
    this.headroom = new Headroom(myElement, {
      offset: 510,
      tolerance: {
        up: 20,
        down: 20,
      },

      onTop() {
        $('#nav').removeClass('scrolled');
        $('.logo').removeClass('scrolled');
        $('.mobile-bg-container').addClass('visible');
      },

      onPin() {
        $('.menu').removeClass('hidedPrincipalNavigation');
        $('#nav').addClass('scrolled');
        $('.logo').addClass('scrolled');
      },

      onNotTop() {
        $('.mobile-bg-container').addClass('visible');
      },

      onUnpin() {
        $('.menu').addClass('hidedPrincipalNavigation');
        $('.mobile-bg-container').addClass('visible');
      },
    });
    this.headroom.init();
  },

  mobileEvent() {
    this.resetDesktop();
    if (!this.enquireInitializedMobile) {
      this.enquireInitializedMobile = true;
      this.createMenuButton();
    }
    $(window).on('resize', _.bind(this.mobileBgAnimation, this));
    this.mobileBgAnimation();
    $(selectors.navigationId).addClass(selectors.mobileClass);
    $(selectors.toggleSelector).click(_.bind(this.toggleMobileMenu, this));
    $(selectors.sectionSelector).click(_.bind(this.showSubMenu, this));
  },

  setBackgroundDropdown(bg) {
    bg.addClass(selectors.backgroundAnimationClass);
  },

  backgroundDropdown(event) {
    var cssPadding = 30,
      bg = $(selectors.navBackgroundSelector),
      bgWrapper = $(selectors.navBackgroundWrapper),
      selectedDropdown = $(event.currentTarget).find(selectors.linksSelector),
      height = selectedDropdown.innerHeight(),
      width = selectedDropdown.innerWidth(),
      windowWidth = $(selectors.navigationSelector).outerWidth(),
      navigationWidth = $('.nav .container').outerWidth(),
      marginNavigation = (windowWidth - navigationWidth) / 2,
      backgroundDropdownPosition = $(event.currentTarget).offset().left + cssPadding + ($(event.currentTarget).innerWidth() - cssPadding) / 2 - width / 2 - marginNavigation;

    setTimeout(_.bind(this.setBackgroundDropdown, this, bg));
    bgWrapper.addClass(selectors.linksVisibleClass);

    bg.css({
      '-moz-transform': 'translateX(' + backgroundDropdownPosition + 'px)',
      '-webkit-transform': 'translateX(' + backgroundDropdownPosition + 'px)',
      '-ms-transform': 'translateX(' + backgroundDropdownPosition + 'px)',
      '-o-transform': 'translateX(' + backgroundDropdownPosition + 'px)',
      'transform': 'translateX(' + backgroundDropdownPosition + 'px)',
      'width': width + 'px',
      'height': height + 'px',
    });
  },

  desktopDropdownEvent() {
    this.resetMobile();
    $(selectors.sectionSelector).on('mouseover', _.bind(this.backgroundDropdown, this));
    $(selectors.sectionSelector).on('mouseleave', _.bind(this.destroyDropdown, this));
    this.showAndHideHeader();
  },

        // Clear dropdowns in mouse leave
  destroyDropdown(event) {
    var bg = $(selectors.navBackgroundSelector),
      bgWrapper = $(selectors.navBackgroundWrapper);

    setTimeout(_.bind(function () {
      bg.removeClass(selectors.backgroundAnimationClass);
    }, this));

    var bgWrapper = $(selectors.navBackgroundWrapper);
    bgWrapper.removeClass(selectors.linksVisibleClass);
  },


        // Bodymovin menu Animation
  createMenuButton() {
    var menuAnimation,
      animContainer = document.querySelectorAll('.container button')[0],
      params = {
        container: animContainer,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        autoloadSegments: true,
        path: templateUrl + '/assets/img/menu/data.json',
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
  toggleScrolledClass() {
    var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;


    if (bodyScrollTop !== 0) {
      $(selectors.navigationId).addClass(selectors.scrolledClass);
      $(selectors.logoSelector).addClass(selectors.scrolledClass);
    }

    else {
      $(selectors.navigationId).removeClass(selectors.scrolledClass);
      $(selectors.logoSelector).removeClass(selectors.scrolledClass);
    }
  },

  checkScroll() {
    if ($(selectors.navigationId).length > 0) {
      $(window).on('scroll load resize', _.bind(this.toggleScrolledClass, this));
    }
  },

  animatedLogoSprite() {
    this.hoverLogo();
    $(selectors.logoSelector).on('mouseover', _.bind(this.hoverLogo, this));
  },

  hoverLogo() {
    $(selectors.logoSelector).removeClass(selectors.stopAnimationClass);
    $(selectors.logoSelector).addClass(selectors.playOnHoverClass);
    setTimeout(_.bind(this.stopLogoAnimation, this), 2000);
  },

  stopLogoAnimation() {
    $(selectors.logoSelector).removeClass(selectors.playOnHoverClass);
    $(selectors.logoSelector).addClass(selectors.stopAnimationClass);
  },
};

HeaderApp.init();
