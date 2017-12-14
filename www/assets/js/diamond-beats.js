$(document).ready(function(){
	$(".button-menu").sideNav();
});

$(window).scroll(function() {

	if( $('nav').hasClass('white') != true ) {
	    var scroll = $(window).scrollTop();

	    var headerHeight = $('header').height();

	    if (scroll > (headerHeight - 56)) {
	        $('nav').addClass('active');
	    }
	    else {
	        $('nav').removeClass('active');
	    }
	}
});