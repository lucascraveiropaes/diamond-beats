$('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true //, // Choose whether you can drag to open on touch screens,
        //onOpen: function(el) { /* Do Stuff */ }, 
        //onClose: function(el) { /* Do Stuff */ },
  	}
);

$(document).ready(function(){
  	$('#play').click( function(){
  		$('#play').toggle(".hide");
  	});

  	$('#pause').click( function(){
  		$('#play').toggle(".show");
  	});

  	$('.button-search').click( function(){
  		$('#search-bar').addClass("search-show");
  		$('.button-search').toggle(".hide");
  		$('.button-collapse').toggle(".hide");

  		setTimeout(function(){
  			$('#search-input').focus();
  		}, 100);
		
  	});

  	$('#search-input').focusout( function() {
		$('#search-bar').removeClass("search-show");
  		$('.button-search').toggle(".hide");
  		$('.button-collapse').toggle(".hide");
  	});

	$('.carousel').carousel();
});

/* Transição Entre Páginas */
$(document).ready(function() { 
    $("body").fadeIn(500);
 
    $("a.transition").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(500, redirectPage);      
    });
         
    function redirectPage() {
        window.location = linkLocation;
    }
});