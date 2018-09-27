(function($){

    "use strict";

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */

    $(window).on('load', function() {

        if($('div').is('.page-loader')) {
            $('.page-loader').delay(500).fadeOut(800);
        }

    });

	$('document').ready(function(){

		const _S 			= 120, 		//short
			  _SS 			= _S - 25,
			  _T 			= 250, 		//tall
			  _POLYTICK 	= 35;

		var headerSvg 			= $('#header-svg'),
			navLinks 			= $('#nav-links'), 			//nav links wrapper
			headerBackground 	= $('#header-background'),
			logoBackground 		= $('#logo-backgrd'),
			logoImg 			= $('#logo-img'),
			logoMix 			= $('#logo-mix'),
			topPolygon 			= $('#top-polygon'),
			leftLine1 			= $('#line-one'),
			leftLine2 			= $('#line-two'),
			rightLine1 			= $('#line-three'),
			rightLine2 			= $('#line-four'),
			logoShapes 			= $('#logo1, #logo2, #logo3, #logo4, #logo5, #logo6'),
			carouselWrapper 	= $('.carousel-wrapper'),
			carousel 			= $('.carousel'), 			//slick carousel
			//bootstrap
			bootCollapse 		= $('.collapse'), 		
			//navbar buttons
			aboutButton 		= $('#about-button'),
			workButton 			= $('#work-button'),
			beenButton 			= $('#been-button'),
			goingButton 		= $('#going-button'),
			//up and down arrows
			upArrow 			= $('#arrow-up'),
			downArrow 			= $('#arrow-down'),
			//content and spacers
			aboutContent 		= $('.about-content'),		//first panel
			generalContent 		= $('.general-content'),	//all other panels
			firstOffset 		= $('#first-offset'),		//first offset (behind header)
			bodyOffset 			= $('.body-offset');		//all other offets
			


		/* ---------------------------------------------- /*
		 * Declare Variables
		/* ---------------------------------------------- */

		var headerAnimation = new TimelineLite();
		
		var windowHeight 			= $(window).height(),
			windowResize 			= true,
			collapsed 				= true, 				//bootstrap hidden switch
			polyTick 				= _POLYTICK, 			//sets interval for polygons to be generated
			y 						= window.pageYOffset,
			width 					= $(window).width(),
			scroll 					= false, 				//if y<250 scroll will be true
			introComplete 			= false, 				//intro animation complete
			firstScroll 			= true, 				//hides stuff after first scroll event
			smallScreen 			= false,
			deg 					= {value: -110}, 		//alternate between -70 and -110 via "positive = true"
			gradientColors = [ 								//colors for panel background
				'#eafcf3',
				'#d1e825',
				'#37f2e5',
				'#b9c3e5'
			],
			panelNames = [
				'about',
				'pizzachron',
				'maryann',
				'luis',
				'been',
				'going'
			],
			currentPage 			= null, 				//will hold panel snap current page
			lastPage 				= null,
			positive 				= true; 				//gradient positive or negative

		/* ---------------------------------------------- /*
         * Define Helper Functions
        /* ---------------------------------------------- */
		function checkNavLinks (){
			//console.log("introComplete: " + introComplete);
			if(introComplete && currentPage === "about"){
				width = $(window).width();
				if(collapsed || width > 767){
					navLinks.css('top', '-20px');
				} else {
					navLinks.css('top', '-100px');
				}
			} else if (introComplete) {
				navLinks.css('top', '-100px');
			}
		}
		function handleScrollDown(){
			if(firstScroll){ //handle only on the first down scroll
				logoMix.css('display', 'inline-block');
				logoShapes.css('display', 'none');
				firstScroll = false;
			}
			headerAnimation.play();
			checkNavLinks();
		}
		function handleScrollUp(){
			polyTick = _POLYTICK;
			headerSvg.css('height', '260px');
			logoImg.css('display', 'inline-block');
			headerAnimation.reverse();
			checkNavLinks();
		}
		function postAnimationCss(){
			navLinks.css({
				'-webkit-transition': 'all 1s',
			    'transition': 'all 1s'
			});
		}
		function changeGradient(){
			carouselWrapper.css('background-image' , '-webkit-linear-gradient(' + deg.value + 'deg, ' + gradientColors[0] + ' 0%, ' + gradientColors[1] + ' 50%, ' + gradientColors[2] + ' 50%, ' + gradientColors[3] + ' 100%)');
		}
		function snapToPanel(panelName){
			function checkName(name){
				return name === currentPage;
			}
			var getPanelName = panelName;
			if(panelName === "prev"){
				getPanelName = panelNames[panelNames.findIndex(checkName) - 1];
			}
			if(panelName === "next"){
				getPanelName = panelNames[panelNames.findIndex(checkName) + 1];
			}
			var panel = document.querySelector('section[data-panel="' + getPanelName + '"]');
			panelSnap.snapToPanel(panel);
		}
		function setContentHeight(){
			console.log("Setting a new page height!");
			if(windowHeight < 800 || smallScreen){
				$('#picture-profile').css('display', 'none');
				$('#profile-picture-column').removeClass('col-md-4');
				handleScrollDown();
				smallScreen = true;
				aboutContent.css('height', (windowHeight - _S) -30); //header will stay small
			} else {
				aboutContent.css('height', (windowHeight - _T) -40); //normal first panel size
			}
			generalContent.css('height', (windowHeight - _S) -30); 
			bodyOffset.css('height', (windowHeight - generalContent.height()) -40);//other carousels-40 to offset for padding
			firstOffset.css('height', (windowHeight - aboutContent.height()) - 40);//first carousel-40 to offset for padding
			downArrow.css('top', windowHeight - 70);
			//console.log("bodyOffest: " + bodyOffset.height() + " firstOffest: " + firstOffset.height() + " generalContent: " + generalContent.height());
		}
		setContentHeight();

		/* ---------------------------------------------- /*
         * Define "Random" Polygon Points
        /* ---------------------------------------------- */
		function getPoints(){
			var minY = (_S-40),
				maxY = (_S-10),
				minX = -30,
				maxX = 30;
			return "0,0 0," + getRand(minY, maxY) + " " + (200 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (400 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (600 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (800 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1000 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1200 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1400 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1600 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1800 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " 2000," + getRand(minY, maxY) + " 2200," + getRand(minY, maxY) + " 2400," + getRand(minY, maxY) + " 2600," + getRand(minY, maxY) + " 2800," + getRand(minY, maxY) + " 3000," + getRand(minY, maxY) + " 3000,0";
		}
		function getRand(min, max){
			var minMath = Math.ceil(min),
				maxMath = Math.floor(max);
			return Math.floor(Math.random() * (maxMath - minMath + 1)) + minMath; 
		}

		/* ---------------------------------------------- /*
         * Panel Snap Init (make sure panel height is set first)
        /* ---------------------------------------------- */
        var options = { //panel snap options
		    container: document.body,
		    panelSelector: '> section',
		    directionThreshold: 50,
		    delay: 0,
		    duration: 300,
		    easing: function(t) { return t },
		};
		var panelSnap = new PanelSnap(options);
				
		panelSnap.on('activatePanel', function(panel){	//get panel name
			currentPage = panel.getAttribute('data-panel');
			if(currentPage === "about"){
				upArrow.css('display', 'none');
			} else {
				if(introComplete){
					upArrow.css('display', 'inline-block');
				} else {
					setTimeout(function(){
						upArrow.css('display', 'inline-block');
					}, 1000);
				}
			}
			if(currentPage === "going"){
				downArrow.css('display', 'none');
			} else {
				downArrow.css('display', 'inline-block');
			}
		});

		/* ---------------------------------------------- /*
         * Slick Carousel Init
        /* ---------------------------------------------- */

		carousel.slick({ //carousel init
			mobileFirst: true,
			dots: true,
			arrrows: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: "<button type='button' class='slick-next pull-right'><img class='carousel-arrow next' src='assets/images/fullarrowright.png'/></button>",
			prevArrow: "<button type='button' class='slick-prev pull-left'><img class='carousel-arrow prev' src='assets/images/fullarrowleft.png'/></button>"
		});
		changeGradient(); //init for carousel gradients

		/* ---------------------------------------------- /*
         * Define Header Animation
        /* ---------------------------------------------- */

		TweenLite.defaultEase = Sine.easeInOut;
		
		headerAnimation.add([ //outer lines increase and decrease in height
			TweenMax.to(logoMix, 0.6, {
				height: 100,
				left: -60
			}),
			TweenMax.to(logoImg, 0.4,{
				opacity: 0
			}),
			TweenMax.to([rightLine1, rightLine2], 0.6, {
				height: _S
			}),
			TweenMax.to([leftLine1, leftLine2], 0.6, {
				height: _S
			}),
			TweenMax.to(logoBackground, 0.6, {
				height: _S
			}),
			TweenMax.to(headerBackground, 0.6, {
				height: _S
			}),
			TweenMax.to(topPolygon, 0.6, { 
				attr:{points: "0,0 0,"+_SS+" 200,"+_SS+" 400,"+_SS+" 600,"+_SS+" 800,"+_SS+" 1000,"+_SS+" 1200,"+_SS+" 1400,"+_SS+" 1600,"+_SS+" 1800,"+_SS+" 2000,"+_SS+" 2200,"+_SS+" 2400,"+_SS+" 2600,"+_SS+" 2800,"+_SS+" 3000,"+_SS+" 3000,0"}
			}),
			TweenMax.staggerTo([leftLine1, leftLine2], 0.6, {
				left:-100
			}, 0.3),
			TweenMax.staggerTo([rightLine2, rightLine1], 0.6, {
				left:100
			}, 0.3)
		], 0, "start", 0).pause();
		headerAnimation.eventCallback('onComplete', function(){
			logoImg.css('display', 'none');
			headerSvg.css('height', '120px');
		});



	    window.onload = function(){

	    	//slick slide instances
			var slickSlide 			= $('.slick-slide');

	    	/* ---------------------------------------------- /*
		     * Header Intro Animation
		    /* ---------------------------------------------- */

			if(y <= 100 && currentPage === "about"){
				scroll = false;
				if(!smallScreen){
					var introAnimation = new TimelineLite();
					introAnimation.add([
						TweenMax.from(navLinks, 0.8, {
							delay: 1, 
							ease: Back.easeOut.config(1), 
							top:-300
						}),
						TweenMax.staggerFrom([leftLine2, leftLine1], 0.8, {
							ease: Strong.easeOut,
							delay: 1.5,
							left:-100
						}, 0.7),
					 	TweenMax.staggerFrom([rightLine1, rightLine2], 0.8, {
							ease: Strong.easeOut, 
							delay: 1.5, 
							left:100
						}, 0.7),
						TweenMax.staggerFrom(logoShapes, 0.3, {
							ease: Back.easeOut.config(1),
							top: -400
						}, 0.2),
						TweenMax.from(logoImg, 0.7,{
							opacity: 0,
							delay: 1.4
						})
					]).eventCallback('onComplete', function(){
						if(y > 100){
							handleScrollDown();
							scroll = true;
						}
						postAnimationCss();
						introComplete = true;
					});
				} else { 		//screen is shorter than 800 px and will need extra room for content
					TweenMax.from(navLinks, 0.8, { 
						ease: Back.easeOut.config(1), 
						top:-300,
						onComplete: function(){
							postAnimationCss();
							introComplete = true;
						}
					});
					handleScrollDown();
				}
			} else {
				scroll = true;
				handleScrollDown();
				postAnimationCss();
				introComplete = true;
			}

			/* ---------------------------------------------- /*
		     * Window Initial Height and Resize
		    /* ---------------------------------------------- */

		
			window.addEventListener('resize', function(){
				if(windowResize){
					windowResize = false;
					setTimeout(function(){ //window can only be resized every half second
						windowResize = true;
					}, 500);
					windowHeight = $(window).height();
					setContentHeight();
				}
			});


			/* ---------------------------------------------- /*
		     * Window Scroll Event Listener
		    /* ---------------------------------------------- */
			window.addEventListener('scroll', function(){

				y = window.pageYOffset;

				if(lastPage !== currentPage){ 		//gradient change inpliments
					if(positive){
						TweenMax.to(deg, 1.1, {
							value:"-110",
							roundProps:"value",
							onUpdate: changeGradient,
							ease: Power2.easeInOut
						});
						positive = false;
					} else {
						TweenMax.to(deg, 1.1, {
							value:"-70",
							roundProps:"value",
							onUpdate: changeGradient,
							ease: Power2.easeInOut
						});
						positive = true;
					}
					lastPage = currentPage;
				}
				
				if(y > 100 && introComplete){		//header scroll implements
					scroll = true;
					handleScrollDown();
					/*handle top polygon anmation*/
					if(polyTick <= 0){
						TweenMax.to(topPolygon, 0.6, {ease: Power1.easeInOut, attr:{points: getPoints()}});
						polyTick = 10;
					} else polyTick --;
				} else if (introComplete) {
					if(!smallScreen){
						handleScrollUp();
					}
					checkNavLinks();
					scroll = false;
				} else {
					scroll = false;
				}

			}); //end of scroll event

			/* ---------------------------------------------- /*
			 * Navbar Hover Events
			/* ---------------------------------------------- */
			navLinks.mouseenter(function(){
				if(collapsed && introComplete && scroll) navLinks.css('top', '-20px');
			});
			navLinks.mouseleave(function(){
				if(collapsed && introComplete && scroll) navLinks.css('top', '-100px');
			});
			topPolygon.mouseenter(function(){
				//console.log("collapsed: " + collapsed + "introComplete: " + introComplete + "scroll: " + scroll );
				if(collapsed && introComplete && scroll) navLinks.css('top', '-20px');
			});
			topPolygon.mouseleave(function(){
				if(collapsed && introComplete && scroll) navLinks.css('top', '-100px');
			});

			/* ---------------------------------------------- /*
		     * Slick Slider Events to Handle Hiding Slides -- Optimization for Mobile
		    /* ---------------------------------------------- */
		    $('.slick-arrow').click(function(){
		    	slickSlide.each(function(e){
		    		var classes = $(e).attr('class');
		    		console.log(classes);
		    		if(!classes.contains('slick-active')){
		    			$(e).css('display', 'none'); 
		    		} else {
		    			$(e).css('display', 'block');
		    		}
		    	});
		    });


			/* ---------------------------------------------- /*
		     * Header Button Click Events
		    /* ---------------------------------------------- */
			aboutButton.click(function(){
				snapToPanel("about");
			});
			workButton.click(function(){
				snapToPanel("pizzachron");
			});	
			beenButton.click(function(){
				snapToPanel("been");
			});	
			goingButton.click(function(){
				snapToPanel("going");
			});	

			/* ---------------------------------------------- /*
		     * Up and Down Arrow Listeners
		    /* ---------------------------------------------- */
		    upArrow.click(function(){
		    	snapToPanel("prev");
		    });
		    downArrow.click(function(){
		    	snapToPanel("next");
		    });

			/* ---------------------------------------------- /*
		     * Bootstrap Collapese Events
		    /* ---------------------------------------------- */

			bootCollapse.on('hide.bs.collapse', function () { //links hidden
				var container = $('#nav-container');
				container.removeClass('flex-column');
				container.addClass('flex-row');
				container.css('backgroundColor','');
				$('a.nav-item').css({
					'margin': '10px 0',
					'marginLeft': '0'
				});
				$('#logo-spacer').css('display', 'block');
			  	collapsed = true;
			});

			bootCollapse.on('show.bs.collapse', function () { //links shown
				var container = $('#nav-container');
				container.removeClass('flex-row');
				container.addClass('flex-column');
				container.css({
					'backgroundColor':'#4286f4',
				});
				$('a.nav-item').css({
					'margin': '10px 0',
					'marginLeft': '48%'
				});
				$('#logo-spacer').css('display', 'none');
			  	collapsed = false;
			});

		} //end of window.onload
  
	}); //end of document ready

})(jQuery);