/*--DOM LOOKUPS--*/
let navAnimation = $('#nav-links'),
	headerBackground = $('#header-background'),
	logoBackground = $('#logo-backgrd'),
	logoImg = $('#logo-img'),
	topPolygon = $('#top-polygon'),
	logoLeftLines = [$('#line-two'),$('#line-one')],
	logoRightLines = $('#line-three, #line-four'),
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

//setting the initial animation css
$('').css('');

/*--define top polygon animation points--*/
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
/*--define logo line tweens--*/
let lineAnimation = new TimelineLite();
lineAnimation.add([
	TweenMax.to(logoRightLines, 0.8, {
		ease: Power0,
		height: 190,
	}, 0.8),
	TweenMax.to(logoLeftLines, 0.8, {
		ease: Power0,
		height: 190,
	}, 0.8),
	TweenMax.staggerTo(logoLeftLines, 0.8, {
		delay: 1.5,
		ease: Power1.easeInOut,
		opacity:0,
		left:-100,
	}, 0.8),
	TweenMax.staggerTo(logoRightLines, 0.8, {
		delay: 1.5,
		ease: Power1.easeInOut,
		opacity:0,
		left:100,
	}, 0.8)
]).pause();


$('document').ready(function(){
	$('.about-content').css('height', (windowHeight - 300));
	$('.general-content').css('height', (windowHeight - 300));
	/*--INIT--*/
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
	$('.first-carousel, .second-carousel, .third-carousel').slick({
		dots: true,
		arrrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	/*--LOADING ANIMATIONS--*/
	TweenMax.from(navAnimation, 0.8, {delay: 1, ease: Back.easeOut.config(1), top:-300, onComplete: function(){
		logoImg.css({
			'-webkit-transition': 'all 1s',
		    'transition': 'all 1s'
		});
		navAnimation.css({
			'-webkit-transition': 'all 1s',
		    'transition': 'all 1s'
		});
	}});
	TweenMax.staggerFrom(logoLeftLines, 0.8, {
		ease: Strong.easeOut,
		opacity:0,
		left:-100
	}, 1),
 	TweenMax.staggerFrom(logoRightLines, 0.8, {
		ease: Strong.easeOut, 
		opacity:0, 
		left:100
	}, 1);

	/*--WINDOW SCROLL--*/
	window.addEventListener('scroll', function(){
		y = window.pageYOffset;
		/*---------------------------
		----HEADER SCROLL IMPLIMENTS-
		----------------------------*/
		if(y > 200){
			/*all scroll events not related to the polygon*/
			if(scroll){
				logoImg.css({
					'height': '120px',
					'width': '120px',
					'top': '15px',
					'left': '-50px'
				});
				if(collapsed) navAnimation.css('top', '-100px');
				headerBackground.css({
					'height':'190px'
				});
				logoBackground.css({
					'height':'190px'
				});
				lineAnimation.play();
				scroll = false;
			}
			/*handle top polygon anmation*/
			if(polyTick <= 0){
				TweenMax.to(topPolygon, 0.5, {attr:{points: getPoints()}});
				polyTick = 10;
			} else polyTick --;

		} else {
			if(!scroll){
				TweenMax.to(topPolygon, 1, {attr:{points: "0,0 0,235 200,235 400,235 600,235 800,235 1000,235 1200,235 1400,235 1600,235 1800,235 2000,235 2200,235 2400,235 2600,235 2800,235 3000,235 3000,0"}});
				logoImg.css({
					'height': '200px',
					'width': '200px' ,
					'top': '0px',
					'left': '-85px'
				});
				if(collapsed) navAnimation.css('top', '0px');
				headerBackground.css({
					'height':'250px'
				});
				logoBackground.css({
					'height':'250px'
				});
				lineAnimation.reverse();
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

