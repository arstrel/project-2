(function($){
  $(function(){

    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });

    $('.sidenav').sidenav();

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    
  }); // end of document ready
})(jQuery); // end of jQuery name space