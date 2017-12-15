// Open and Close Menu Function
	$("#search").click( function () {
		$('.search-bar').addClass('active');

		setTimeout(function(){
			$('.search-bar .input').focus();
		}, 100);
	});

	$("#close").click( function () {
		$('.search-bar').removeClass('active');
		$("#search-term").val("");
		$("#search-results").css("display", "none");
    	$(".after-menu").css("display", "block");
	});
// End

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