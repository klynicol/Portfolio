/*--DOM LOOKUPS--*/
let navLinks = $('#nav-links'),
	headerBackground = $('#header-background'),
	logoBackground = $('#logo-backgrd'),
	logoImg = $('#logo-img'),
	topPolygon = $('#top-polygon'),
	leftLine1 = $('#line-one'),
	leftLine2 = $('#line-two'),
	rightLine1 = $('#line-three'),
	rightLine2 = $('#line-four'),
	logoShapes = $('#logo1, #logo2, #logo3, #logo4, #logo5, #logo6'),
	chronLogo = $('#pizzaChron-logo'),
	firstContent = $('.first-content'),
	secondContent = $('.second-content'),
	thirdContent = $('.third-content');


/*--OTHER VARIABLES--*/
let windowHeight = $(window).height(),
	collapsed = true, //bootstrap hidden switch
	polyTick = 0,
	y = window.pageYOffset,
	scroll = false,
	animateWorkOne = true,
	animateWorkTwo = true,
	animateBeen = true,
	animateGoing = true;

/*--define polygon animation points--*/
let getPoints = function(){
	let minY = 145,
		maxY = 180,
		minX = -30,
		maxX = 30;
	return "0,0 0," + getRand(minY, maxY) + " " + (200 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (400 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (600 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (800 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1000 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1200 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1400 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1600 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " " + (1800 + getRand(minX, maxX)) + "," + getRand(minY, maxY) + " 2000," + getRand(minY, maxY) + " 2200," + getRand(minY, maxY) + " 2400," + getRand(minY, maxY) + " 2600," + getRand(minY, maxY) + " 2800," + getRand(minY, maxY) + " 3000," + getRand(minY, maxY) + " 3000,0";
}
let getRand = function(min, max){
	minMath = Math.ceil(min);
	maxMath = Math.floor(max);
	return Math.floor(Math.random() * (maxMath - minMath + 1)) + minMath; 
}

/*--define header animation--*/
TweenLite.defaultEase = Linear.easeNone;
let headerAnimation = new TimelineLite(), headerAnimation2 = new TimelineLite();

headerAnimation.add([
	TweenMax.to([rightLine1, rightLine2], 0.7, {
		ease: Sine.easeInOut,
		height: 190
	}),
	TweenMax.to([leftLine1, leftLine2], 0.7, {
		ease: Sine.easeInOut,
		height: 190
	})
]).pause();
headerAnimation2.add([
	TweenMax.staggerTo([leftLine1, leftLine2], 0.6, {
		ease: Power1.easeInOut,
		//opacity:0,
		left:-100
	}, 0.8),
	TweenMax.staggerTo([rightLine2, rightLine1], 0.6, {
		ease: Power1.easeInOut,
		//opacity:0,
		left:100
	}, 0.8)
]).pause();

/*--handle scrolling--*/
let handleScrollDown = function(){
		headerAnimation.play();
		headerAnimation2.play();
		logoImg.css('opacity' , '0');
		if(collapsed) navLinks.css('top', '-100px');
		headerBackground.css({
			'height':'190px'
		});
		logoBackground.css({
			'height':'190px'
		});
	},
	handleScrollUp = function(){
		headerAnimation2.reverse();
		headerAnimation.reverse();
		TweenMax.to(topPolygon, 1, {attr:{points: "0,0 0,235 200,235 400,235 600,235 800,235 1000,235 1200,235 1400,235 1600,235 1800,235 2000,235 2200,235 2400,235 2600,235 2800,235 3000,235 3000,0"}});
		logoImg.css('opacity' , '1');
		if(collapsed) navLinks.css('top', '0px');
		headerBackground.css({
			'height':'250px'
		});
		logoBackground.css({
			'height':'250px'
		});
	},
	postAnimationCss = function(){
		logoImg.css({
			'-webkit-transition': 'all 0.5s',
		    'transition': 'all 0.5s',
		});
		navLinks.css({
			'-webkit-transition': 'all 1s',
		    'transition': 'all 1s'
		});
	}


$('document').ready(function(){
	/*--INIT--*/
	$('.about-content').css('height', (windowHeight - 300)); //first carousel
	$('.general-content').css('height', (windowHeight - 300)); //other carousels
	$.scrollify({
		section : ".scrollify",
	    sectionName : "section-name",
	    interstitialSection : "",
	    easing: "easeOutExpo",
	    scrollSpeed: 900,
	    offset : 0,
	    scrollbars: true,
	    standardScrollElements: "",
	    setHeights: true,
	    overflowScroll: false,
	    updateHash: true,
	    touchScroll:true,
	    before:function() {},
	    after:function() {},
	    afterResize:function() {},
	    afterRender:function() {}
	});
	$('.first-carousel, .second-carousel, .third-carousel').slick({ //carousel init
		dots: true,
		arrrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	/*--LOADING ANIMATIONS--*/
	if(y <= 200 && $.scrollify.current().attr('data-section-name') === "about"){
		TweenMax.from(navLinks, 0.8, {
			delay: 1, 
			ease: Back.easeOut.config(1), 
			top:-300, 
			onComplete: postAnimationCss()
		});
		TweenMax.staggerFrom([leftLine2, leftLine1], 0.8, {
			ease: Strong.easeOut,
			delay: 1.5,
			left:-100
		}, 0.7);
	 	TweenMax.staggerFrom([rightLine1, rightLine2], 0.8, {
			ease: Strong.easeOut, 
			delay: 1.5, 
			left:100
		}, 0.7);
		TweenMax.staggerFrom(logoShapes, 0.3, {
			ease: Back.easeOut.config(1),
			top: -400
		}, 0.2);
		TweenMax.from(logoImg, 0.7,{
			opacity: 0,
			delay: 1.4
		});
		console.log(y);
	} else {
		console.log("check1 " + y);
		handleScrollDown();
		TweenMax.to(topPolygon, 0.5, {attr:{points: getPoints()}});
		postAnimationCss();
	}


	/*--WINDOW SCROLL--*/
	window.addEventListener('scroll', function(){
		y = window.pageYOffset;
		/*---------------------------
		----HEADER SCROLL IMPLIMENTS-
		----------------------------*/
		if(y > 200){
			/*all scroll events not related to the polygon*/
			if(scroll){
				handleScrollDown();
				scroll = false;
			}
			/*handle top polygon anmation*/
			if(polyTick <= 0){
				TweenMax.to(topPolygon, 0.5, {attr:{points: getPoints()}});
				polyTick = 10;
			} else polyTick --;

		} else {
			if(!scroll){
				handleScrollUp();
				scroll = true;
			}
		}
		/*---------------------------
		----CAROUSEL SNAPPING--------
		----------------------------*/



		/*---------------------------
		----FIRST SLIDE ANIMATION----
		----------------------------*/
		if(y > 500 && animateWorkOne){
			TweenMax.from('#testing-animation', 0.8, {delay: 1, ease: Back.easeOut.config(1), top:-300, left:-300, onComplete: function(){
				$('#testing-animation').css({
				'position': 'static',
				'z-index': '',
				'top': '', 'left': '', 'right' : '', 'bottom': ''
				});
			}});
			animateWorkOne = false;
		}
	});

	//bootstrap collapse
	$('.collapse').on('hide.bs.collapse', function () { //large window
		let container = $('#nav-container');
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
	$('.collapse').on('show.bs.collapse', function () { //small window
		let container = $('#nav-container');
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

//method for scrolling to a certain part of the page window.scroll(x-coord, y-coord);
});

